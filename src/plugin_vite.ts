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

import { mjmlProcessInclude, mjmlTransformToSvelte, requestContextSvelte } from './plugin_base';
import {
  createChildTag,
  createChildText,
  getOrCreateChildTag,
  isElement,
  stringToXml,
  xmlToString,
  type XmlDocument
} from './utils/mjml';
import {
  appendQueryParam,
  buildIdParser,
  getQueryParam,
  getVirtualRawQuery,
  normalizeId,
  removeQueryParams
} from './utils/request_id';

function injectStyles(mjmlXml: XmlDocument, cssStyles: string[]): XmlDocument {
  const mjml = mjmlXml.firstChild;
  if (!mjml || !isElement(mjml) || mjml.tagName !== 'mjml') return mjmlXml ?? undefined;
  const mjHead = getOrCreateChildTag(mjml, 'mj-head');
  for (const style of cssStyles) {
    const mjStyle = createChildTag(mjHead, 'mj-style');
    createChildText(mjStyle, style);
  }
  return mjmlXml;
}

async function renderMjmlBody(mjmlSvelte: string, cssStyles: string[], isRaw: boolean) {
  const mjmlTerse = minify(mjmlSvelte, { removeComments: true, collapseWhitespace: true });
  const mjmlJson = xmlToString(injectStyles(stringToXml(mjmlTerse), cssStyles));
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
      const depMap = ssr.runner.evaluatedModules.urlToIdModuleMap;
      const loaded = Array.from(depMap.keys());
      const module = await ssr.runner.import(id);
      dependencies.push(
        ...Array.from(depMap.keys())
          .filter((m) => !loaded.includes(m))
          .map((m) => depMap.get(m))
          .filter((m) => !!m)
          .map((m) => m.id)
          .filter((m) => !dependencies.includes(m))
      );
      return module;
    },
    closeLoader: async () => {
      if (needClose && vite) {
        await vite.close();
      }
    }
  };
}

export function mjmlPlugin(): Plugin[] {
  const serverId = (id: string) => id.replace('.mjml.svelte', '.server.ts');
  const cssRequestId = 'virtual:__mjml_svelte_style';

  const filterId = (id) => {
    return id.endsWith('.mjml.svelte');
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
          extensions: ['.mjml.svelte', ...(config.optimizeDeps?.extensions ?? [])]
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
      },

      async load(id, options) {
        if (id === requestContextSvelte.id) {
          return renderSourceMap(id, requestContextSvelte.code);
        }
        const req = requestParser(id);
        if (!req || getQueryParam(req.rawQuery, 'mjml')) return;
        const isSSR = !!options?.ssr;
        const { loader, closeLoader, dependencies } = createLoader({ vite: viteDevServer });
        try {
          const pageLoader = async (pageId: string) =>
            await loader(appendQueryParam(normalizeId(id, pageId), 'mjml', '1'));
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idServer = serverId(idPage);
          const sveltePage = (await mjmlProcessInclude(pageLoader as any, idPage)) as any;
          const svelteServer = (await loader(idServer)) as any;
          const svelteContext = (await loader(requestContextSvelte.id)) as any;
          const svelteStyles = await Promise.all(dependencies.filter(isCSSRequest).map(pageLoader));
          const svelteComponent = await mjmlTransformToSvelte(
            svelteContext,
            sveltePage,
            svelteServer,
            svelteStyles,
            renderMjmlBody,
            isSSR
          );
          return {
            code: svelteComponent
          };
        } finally {
          await closeLoader();
        }
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
