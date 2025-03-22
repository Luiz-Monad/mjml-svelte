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

function createLoader({ vite, config }: { vite?: ViteDevServer, config?: InlineConfig }) {
  let server = vite;
  let needClose = false;
  let dependencies: string[] = [];
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
};

export function mjmlPlugin(): Plugin[] {
  const serverId = (id: string) => id.replace('.mjml.svelte', '.server.ts');

  const filterId = (id) => {
      return id.endsWith('.mjml.svelte');
  };

  let requestParser: ReturnType<typeof buildIdParser>;
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
        } finally {
          await closeLoader();
        }
      }
    }
  ];
}
