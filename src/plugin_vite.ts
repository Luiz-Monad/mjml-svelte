import {
  createServer,
  isCSSRequest,
  isRunnableDevEnvironment,
  type InlineConfig,
  type Plugin,
  type ResolvedConfig,
  type ViteDevServer
} from 'vite';
import mjml2html from 'mjml';
import { minify } from 'html-minifier';
import MagicString from 'magic-string';

//register mjml components
import './mjml';

import {
  extension,
  renderRaw,
  renderSveltePage,
  renderSveltePageComponent,
  requestContextSvelte
} from './plugin_base';
import {
  createChildTag,
  createChildText,
  findChildByTagName,
  findOneByTagName,
  getAttribute,
  getOrCreateChildTag,
  htmlToString,
  isElement,
  moveAllChild,
  removeChild,
  stringToHtml,
  type HtmlDocument
} from './utils/dom';
import {
  appendQueryParam,
  buildIdParser,
  getQueryParam,
  getVirtualRawQuery,
  normalizeId,
  removeQueryParams
} from './utils/request_id';

function injectStylesScripts(
  mjmlXml: HtmlDocument,
  options: {
    styles: string[];
    scripts: string[];
  }
): HtmlDocument {
  const mjml = mjmlXml.firstChild;
  if (!mjml || !isElement(mjml) || mjml.tagName !== 'mjml') return mjmlXml ?? undefined;
  const mjStyles = findChildByTagName(mjml, 'mj-style');
  for (const style of mjStyles) {
    const subStyle = findOneByTagName(style, 'style');
    if (subStyle) {
      moveAllChild(subStyle, style);
      removeChild(style, subStyle);
    }
  }
  const mjHead = getOrCreateChildTag(mjml, 'mj-head');
  for (const style of options.styles) {
    const mjStyle = createChildTag(mjHead, 'mj-style', 'style');
    createChildText(mjStyle, style.replaceAll('\r\n', '\n'));
  }
  for (const script of options.scripts) {
    const mjRaw = createChildTag(mjHead, 'mj-raw', 'script');
    const scriptTag = createChildTag(mjRaw, 'script', 'script');
    createChildText(scriptTag, script.replaceAll('\r\n', '\n'));
  }
  return mjmlXml;
}

async function injectIncludes(
  mjmlXml: HtmlDocument,
  options: {
    rawPageLoader: (pageId: string) => Promise<string>;
  }
): Promise<HtmlDocument> {
  const mjml = mjmlXml;
  if (!mjml) return mjmlXml ?? undefined;
  const mjIncludes = findChildByTagName(mjml, 'mj-include');
  for (const include of mjIncludes) {
    const parent = include.parent;
    if (!parent) continue;
    const path = getAttribute(include, 'path');
    if (!path) continue;
    const mjmlSvelte = await options.rawPageLoader(path);
    const mjmlTerse = minify(mjmlSvelte, { removeComments: true, collapseWhitespace: true });
    const xml = stringToHtml(mjmlTerse);
    removeChild(parent, include);
    moveAllChild(xml, parent);
  }
  return mjmlXml;
}

async function renderMjmlBody(
  mjmlSvelte: string,
  isRaw: boolean,
  options: {
    styles: string[];
    scripts: string[];
    rawPageLoader: (pageId: string) => Promise<any>;
    logWarn: (warn: string) => void;
  }
) {
  const mjmlTerse = minify(mjmlSvelte, { removeComments: true, collapseWhitespace: true });
  const mjmlJson = htmlToString(
    injectStylesScripts(await injectIncludes(stringToHtml(mjmlTerse), options), options)
  );
  if (isRaw) return mjmlJson;
  const mjmlMail = mjml2html(mjmlJson, {
    fonts: {}
  });
  const minifiedHtml = minify(mjmlMail.html, {
    collapseWhitespace: true,
    removeComments: false,
    removeRedundantAttributes: false,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true
  });
  if (mjmlMail.errors && mjmlMail.errors.length > 0) {
    Array.from(mjmlMail.errors).forEach((e) => options.logWarn(e.formattedMessage));
  }
  return minifiedHtml;
}

function renderSourceMap(file: string, code: string) {
  const magicString = new MagicString(code);
  const map = magicString.generateMap({
    source: file,
    file: file,
    includeContent: true,
    hires: true
  });
  return {
    code: magicString.toString(),
    map
  };
}

function createLoader({ vite, config }: { vite?: ViteDevServer; config?: InlineConfig }) {
  let server = vite;
  let needClose = false;
  const dependencies: string[] = [];
  return {
    dependencies,
    loader: async (id: string) => {
      if (!server) {
        server = await createServer({
          configLoader: 'runner',
          server: {
            // https://github.com/vitejs/vite/issues/19606
            perEnvironmentStartEndDuringDev: true,
            middlewareMode: true,
            ws: false
          },
          ...config
        });
        needClose = true;
      }
      const ssr = server.environments.ssr;
      if (!isRunnableDevEnvironment(ssr)) {
        throw new Error(`no runnable dev env was found`);
      }
      const module = await ssr.runner.import(id);
      const [_, nId] = await ssr.moduleGraph.resolveUrl(id);
      const nodeModule = ssr.runner.evaluatedModules.getModuleById(nId)!;
      const depMap = nodeModule.imports ?? new Set();
      dependencies.push(...Array.from(depMap.keys()).filter((m) => !dependencies.includes(m)));
      return module;
    },
    closeLoader: async () => {
      if (needClose && server) {
        await server.close();
      }
    }
  };
}

export function mjmlPlugin(): Plugin[] {
  const filterId = (id: string) => id.endsWith(extension);
  const serverId = (id: string) => id.replace(extension, '.server.ts');
  const cssRequestId = 'virtual:__mjml_svelte_style';

  const viteHotReload = {
    id: '__mjml_svelte/hotReload.ts',
    code: `
      if (import.meta.hot) {
        import.meta.hot.on('mjml', (data) => {
          window.location.reload();
        });
      }
    `.replaceAll('    ', ''),
    client: `
      import('/@id/__mjml_svelte/hotReload.ts');
    `.replaceAll('    ', '')
  };

  let requestParser: ReturnType<typeof buildIdParser>;
  let requestParserCss: ReturnType<typeof buildIdParser>;
  let viteConfig: ResolvedConfig;
  let viteDevServer: ViteDevServer;
  return [
    {
      name: 'vite-plugin-mjml-config',
      enforce: 'pre',

      async config(config) {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          extensions: [extension, ...(config.optimizeDeps?.extensions ?? [])]
        };
      }
    },
    {
      name: 'vite-plugin-mjml-transform',
      enforce: 'post',
      sharedDuringBuild: true,

      async configResolved(config) {
        requestParser = buildIdParser(filterId);
        requestParserCss = buildIdParser(isCSSRequest);
        viteConfig = config;
      },

      configureServer(server) {
        viteDevServer = server;
      },

      resolveId(id, importer, options) {
        if (id === requestContextSvelte.id) {
          return id;
        }
        if (id === viteHotReload.id) {
          return id;
        }
      },

      async load(id, options) {
        if (id === requestContextSvelte.id) {
          return renderSourceMap(id, requestContextSvelte.code);
        }
        if (id === viteHotReload.id) {
          return renderSourceMap(id, viteHotReload.code);
        }
        const req = requestParser(id);
        if (!req || getQueryParam(req.rawQuery, 'mjml')) return;
        const isSSR = !!options?.ssr;
        const isDEV = viteConfig.command === 'serve';
        const { loader, closeLoader, dependencies } = createLoader({ vite: viteDevServer });
        try {
          const logWarn = (s: string) => this.warn(s);
          const render = async (id: string, renderer: typeof renderMjmlBody) => {
            const pageLoader = async (pageId: string) =>
              await loader(appendQueryParam(normalizeId(id, pageId), 'mjml', '1'));

            const styleLoader = async (styleId: string) =>
              (await pageLoader(styleId)).default as string;

            const rawPageLoader = async (pageId: string) =>
              renderRaw(await render(normalizeId(id, pageId), (pass) => Promise.resolve(pass)));

            const idPage = appendQueryParam(id, 'mjml', '1');
            const idServer = serverId(idPage);
            const sveltePage = await pageLoader(idPage);
            const svelteServer = await loader(idServer);
            const svelteContext = await loader(requestContextSvelte.id);
            const styles = await Promise.all(dependencies.filter(isCSSRequest).map(styleLoader));
            const scripts = isDEV ? [viteHotReload.client] : [];

            const renderedPage = await renderSveltePage(
              svelteContext,
              sveltePage,
              svelteServer,
              renderer,
              {
                isSSR,
                styles,
                scripts,
                logWarn,
                rawPageLoader
              }
            );

            this.addWatchFile(idServer);
            dependencies.filter(isCSSRequest).forEach((id) => this.addWatchFile(id));
            return renderedPage;
          };
          return {
            code: renderSveltePageComponent(await render(id, renderMjmlBody))
          };
        } finally {
          await closeLoader();
        }
      },

      handleHotUpdate({ file, server, modules }) {
        const req = requestParser(file);
        if (!req) return modules;
        server.ws.send({ type: 'custom', event: 'mjml', data: {} });
        return [];
      }
    },
    {
      name: 'vite-plugin-mjml-style',
      enforce: 'pre',

      resolveId(id, importer, options) {
        const req = requestParserCss(id);
        if (!req || !getQueryParam(req.rawQuery, 'mjml')) return;
        const idCss = Buffer.from(removeQueryParams(id)).toString('base64');
        return appendQueryParam(cssRequestId, 'idCss', idCss);
      },

      async load(id, options) {
        if (!id.startsWith(cssRequestId)) return;
        const idCssB64 = getQueryParam(getVirtualRawQuery(id), 'idCss');
        if (!idCssB64) return;
        const idCss = Buffer.from(idCssB64, 'base64').toString();
        const { loader, closeLoader } = createLoader({});
        try {
          this.addWatchFile(idCss);
          const css = await loader(appendQueryParam(idCss, 'inline', ''));
          return {
            code: `export default ${JSON.stringify(css.default)}`
          };
        } finally {
          await closeLoader();
        }
      }
    }
  ];
}
