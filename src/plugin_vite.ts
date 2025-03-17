import { createServer, type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite';
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

export function mjmlPlugin(): Plugin[] {
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

      resolveId(id) {
        if (id === requestContextSvelte.id) {
          return id;
        }
      },

      async load(id) {
        if (id === requestContextSvelte.id) {
          const magicString = new MagicString(requestContextSvelte.code);
          const map = magicString.generateMap({
            source: id,
            file: id,
            includeContent: true,
            hires: true
          });
          return {
            code: magicString.toString(),
            map
          };
        }
        const req = requestParser(id);
        if (!req) return;
        if (getQueryParam(req.rawQuery, 'mjml')) return;
        const server = viteDevServer ?? (await createServer());
        const loader = (subId: string) =>
          server.ssrLoadModule(appendQueryParam(normalizeId(id, subId), 'mjml', '1'));
        try {
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idServer = serverId(idPage);
          const sveltePage = (await mjmlProcessInclude(loader as any, idPage)) as any;
          const svelteServer = (await server.ssrLoadModule(idServer)) as any;
          const svelteContext = (await server.ssrLoadModule(requestContextSvelte.id)) as any;
          const svelteComponent = await mjmlTransformToSvelte(
            svelteContext,
            sveltePage,
            svelteServer,
            renderMjmlBody
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
}
