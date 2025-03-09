import { createServer, type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite';
import { mjmlTransformCode } from './plugin_base';

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
      name: 'sveltekit-mjml-transform-pre',
      enforce: 'pre',

      async config(config) {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          extensions: ['.mjml.svelte', ...(config.optimizeDeps?.extensions ?? [])]
        };
      }
    },
    {
      name: 'sveltekit-mjml-transform-post',
      enforce: 'post',

      async configResolved(config) {
        requestParser = buildIdParser();
        viteConfig = config;
      },

      configureServer(server) {
        viteDevServer = server;
      },

      async transform(code, id, opts) {
        const req = requestParser(id);
        if (!req) return;
        if (getQueryParam(req.rawQuery, 'mjml')) return;
        const server = viteDevServer ?? (await createServer());
        try {
          const idPage = appendQueryParam(id, 'mjml', '1');
          const idLayout = serverId(idPage);
          const sveltePage = await server.ssrLoadModule(idPage);
          const svelteLayout = await server.ssrLoadModule(idLayout);
          return {
            code: await mjmlTransformCode(sveltePage, svelteLayout, opts?.ssr ?? false),
            map: null
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
