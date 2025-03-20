import {
  createServer,
  isCSSRequest,
  isRunnableDevEnvironment,
  runnerImport,
  type Plugin,
  type ResolvedConfig,
  type ViteDevServer
} from 'vite';
import mjml2html from 'mjml';
import { minify } from 'html-minifier';
import MagicString from 'magic-string';

import { mjmlProcessInclude, mjmlTransformToSvelte, requestContextSvelte } from './plugin_base';

async function renderMjmlBody(mjmlSvelte: string, isRaw: boolean) {
  const mjmlTerse = minify(mjmlSvelte, { removeComments: true, collapseWhitespace: true });
  if (isRaw) return mjmlTerse;
  const mjmlMail = mjml2html(mjmlTerse, {
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

export function mjmlPlugin(): Plugin[] {
  const serverId = (id: string) => id.replace('.mjml.svelte', '.server.ts');

  const buildIdParser = () => {
    const filter = (id: string) => {
      return id.endsWith('.mjml.svelte');
    };
    const splitId = (id: string) => {
      const [filename, rawQuery] = id.split('?', 2);
      return { filename, rawQuery: rawQuery || '' };
    };
    return (id: string) => {
      const { filename, rawQuery } = splitId(id);
      if (filter(filename)) {
        return { id, filename, rawQuery };
      }
    };
  };

  const base = 'http://host';

  const appendQueryParam = (url: string, param: string, value: string) => {
    const parsedUrl = new URL(url, base);
    parsedUrl.searchParams.set(param, value);
    return parsedUrl.toString().replace(base, '');
  };

  const getQueryParam = (query: string, param: string) => {
    const urlParams = new URLSearchParams(query);
    return urlParams.has(param) ? urlParams.get(param) : null;
  };

  const normalizeId = (baseId: string, id: string) => {
    const normalizedPath = new URL(id, new URL(baseId, base)).href;
    return normalizedPath.replace(base, '');
  };

  const createLoader = (dependencies: string[]) => async (id: string) => {
    // experimental API
    // const imported = await runnerImport(id, {
    //   plugins: Array.from(
    //     viteConfig.plugins.filter(
    //       (p) =>
    //         !(
    //           p.name.startsWith('vitest:') ||
    //           p.name === 'vitest' ||
    //           p.name.startsWith('vite:') ||
    //           p.name === 'alias'
    //         )
    //     )
    //   ),
    //   resolve: viteConfig.environments.ssr.resolve,
    //   server: {
    //     // https://github.com/vitejs/vite/issues/19606
    //     perEnvironmentStartEndDuringDev: true
    //   }
    // });
    // dependencies.push(...imported.dependencies);
    // return imported.module;

    // if (!viteDevServer) {
    //   viteDevServer = await createServer();
    //   viteDevServerClose = true;
    // }
    // const ssr = viteDevServer.environments.ssr;
    // if (!isRunnableDevEnvironment(ssr)) {
    //   throw new Error(`invalid environment ${ssr.name}`)
    // }
    // ssr.runner.evaluatedModules.clear();
    // const module = await ssr.runner.import(id);
    // const depMap = ssr.runner.evaluatedModules.urlToIdModuleMap;
    // dependencies.push(...depMap.values().map(m => m.file));
    // return module;

    if (!viteDevServer) {
      viteDevServer = await createServer();
      viteDevServerClose = true;
    }
    const loaded = Array.from(viteDevServer.moduleGraph.urlToModuleMap.keys());
    const module = viteDevServer.ssrLoadModule(id);
    const depMap = Array.from(viteDevServer.moduleGraph.urlToModuleMap.values());
    dependencies.push(
      ...depMap
        .map((m) => m.url)
        .filter(m => !!m)
        .filter(m => !loaded.includes(m))
        .filter(m => !dependencies.includes(m))
    );
    return module;
  };

  let requestParser: ReturnType<typeof buildIdParser>;
  let viteConfig: ResolvedConfig;
  let viteDevServer: ViteDevServer;
  let viteDevServerClose = false;
  return [
    {
      name: 'vite-plugin-mjml-transform-pre',
      enforce: 'pre',

      async config(config) {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          extensions: ['.mjml.svelte', ...(config.optimizeDeps?.extensions ?? [])]
        };
      }
    },
    {
      name: 'vite-plugin-mjml-transform-post',
      enforce: 'post',

      async configResolved(config) {
        requestParser = buildIdParser();
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
        if (!req) return;
        if (getQueryParam(req.rawQuery, 'mjml')) return;
        const isSSR = !!options?.ssr;
        const dependencies: string[] = [];
        const loader = createLoader(dependencies);
        const pageLoader = async (pageId: string) => {
          return await loader(normalizeId(id, pageId));
        };
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idServer = serverId(idPage);
        const sveltePage = (await mjmlProcessInclude(pageLoader as any, idPage)) as any;
        const svelteServer = (await loader(idServer)) as any;
        const svelteContext = (await loader(requestContextSvelte.id)) as any;
          const svelteComponent = await mjmlTransformToSvelte(
            svelteContext,
            sveltePage,
            svelteServer,
            renderMjmlBody,
            isSSR
          );
          return {
            code: svelteComponent
          };
      },

      async buildEnd() {
        if (viteDevServerClose) {
          await viteDevServer.close();
        }
      }
    }
  ];
}
