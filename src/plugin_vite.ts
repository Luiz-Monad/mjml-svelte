import { createServer, type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite';
import mjml2html from 'mjml';
import { minify } from 'html-minifier';
import MagicString from 'magic-string';

import { mjmlTransformToSvelte, requestContextSvelte } from './plugin_base';

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

  const serverId = (id: string) => id.replace('.mjml.svelte', '.server.ts');

  const isRawQuery = (id: string) => {
    const url = new URL(id, base);
    return url.searchParams.get('raw');
  };

  const removeRawQuery = (id: string) => {
    const parsedUrl = new URL(id, base);
    parsedUrl.searchParams.delete('raw');
    return parsedUrl.toString().replace(base, '');
  };

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

      resolveId(id, importer, options) {
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
        try {
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idServer = serverId(idPage);
          const sveltePage = (await server.ssrLoadModule(idPage)) as any;
          const svelteServer = (await server.ssrLoadModule(idServer)) as any;
          const svelteContext = (await server.ssrLoadModule(requestContextSvelte.id)) as any;
          const svelteComponent = await mjmlTransformToSvelte(
            svelteContext,
            sveltePage,
            svelteServer,
            (data) => renderMjmlBody(data, !!viteConfig.inlineConfig.mjmlPluginRaw)
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
    },
    {
      name: 'svelte-mjml-transform-dev',
      enforce: 'pre',

      configureServer(server) {
        server.middlewares.use(async function mjmlTransformMiddleware(req, res, next) {
          try {
            if (!req.url || !isRawQuery(req.url)) {
              return next();
            }
            req.url = removeRawQuery(req.url);
            const server = await createServer({
              mjmlPluginRaw: true,
              server: {
                middlewareMode: true,
                watch: null
              }
            });
            remove_vite_middlewares(server.middlewares);
            try {
              await new Promise((done) => {
                server.middlewares.handle(req, res, done);
              });
            } catch (err) {
              const e = err as Error;
              res.statusCode = 500;
              res.statusMessage = e.message;
              res.end(e.stack);
            } finally {
              await server.close();
            }
          } catch {
            return next();
          }
        });
      }
    }
  ];
}

function remove_vite_middlewares(server: ViteDevServer['middlewares']) {
  for (let i = server.stack.length - 1; i > 0; i--) {
    const handle = server.stack[i].handle;
    if ('name' in handle && handle.name.startsWith('vite')) {
      server.stack.splice(i, 1);
    }
  }
}
