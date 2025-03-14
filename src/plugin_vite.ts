import { createServer, type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite';
import mjml2html from 'mjml';
import { minify } from 'html-minifier';

import { mjmlTransformToSvelte, requestContextSvelte } from './plugin_base';

async function renderMjmlBody(mjmlSvelte: string) {
  const mjmlTerse = minify(mjmlSvelte, { removeComments: true, collapseWhitespace: true });
  const mailHtml = mjml2html(mjmlTerse).html;
  const minifiedHtml = minify(mailHtml, {
    collapseWhitespace: true,
    removeComments: false,
    removeRedundantAttributes: false,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true
  });
  return minifiedHtml;
}

export const mjmlPlugin: () => Plugin[] = () => {
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

  const appendQueryParam = (
    url: string,
    param: string,
    value: string,
    base: string = 'http://dummy-base'
  ) => {
    const parsedUrl = new URL(url, base);
    parsedUrl.searchParams.set(param, value);
    return parsedUrl.toString().replace(base, '');
  };

  const getQueryParam = (query: string, param: string) => {
    const urlParams = new URLSearchParams(query);
    return urlParams.has(param) ? urlParams.get(param) : null;
  };

  const serverId = (id: string) => id.replace('.mjml.svelte', '.server.ts');

  let requestParser: ReturnType<typeof buildIdParser>;
  let viteConfig: ResolvedConfig;
  let viteDevServer: ViteDevServer;
  return [
    {
      name: 'svelte-mjml-transform-pre',
      enforce: 'pre',

      async config(config) {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          extensions: ['.mjml.svelte', ...(config.optimizeDeps?.extensions ?? [])]
        };
      }
    },
    {
      name: 'svelte-mjml-transform-post',
      enforce: 'post',

      async configResolved(config) {
        requestParser = buildIdParser();
        viteConfig = config;
      },

      configureServer(server) {
        viteDevServer = server;
      },

      resolveId(id, importer) {
        if (id === requestContextSvelte.id) {
          return id;
        }
      },

      async load(id) {
        if (id === requestContextSvelte.id) {
          return requestContextSvelte.code;
        }
        const req = requestParser(id);
        if (!req) return;
        if (getQueryParam(req.rawQuery, 'mjml')) return;
        const server = viteDevServer ?? (await createServer());
        try {
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idServer = serverId(idPage);
          const sveltePage = (await server.ssrLoadModule(idPage)) as any;
          const svelteServer = (await server.ssrLoadModule(idServer)) as any;
          const svelteContext = (await server.ssrLoadModule(requestContextSvelte.id)) as any;
          const svelteComponent = await mjmlTransformToSvelte(
            renderMjmlBody,
            svelteContext,
            sveltePage,
            svelteServer
          );
          return {
            code: svelteComponent
          };
        } finally {
          if (!viteDevServer) {
            await server.close();
          }
        }
      }
    }
  ];
};
