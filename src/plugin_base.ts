import type { Page } from '@sveltejs/kit';
import { SvelteComponent } from 'svelte';
import { render } from 'svelte/server';
import { URL } from 'url';

const tag_start = '%%MJML_START%%';
const tag_end = '%%MJML_END%%';

interface PageEvent {
  url: URL;
}

type Renderer = (mjmlSvelte: string) => Promise<string>;
type PageData = Record<string, any>;
type PageLoadFn = (event: PageEvent) => Promise<PageData>;
type PageComponent = { default: typeof SvelteComponent };
type PageServerComponent = { load: PageLoadFn & { _routes: string[] } };

const createPage = (url: URL, data: PageData): Page => ({
  error: null,
  params: {},
  route: { id: null },
  status: 200,
  url: url,
  data: data,
  form: null,
  state: {}
});

export const requestContextSvelte = {
  id: '__mjml_svelte/requestContext.svelte',
  code: `
    <script lang="ts">
      import { setContext } from 'svelte';
      let { page, children } = $props();
      setContext('__request__', { page });
    </script>
    {@render children(page.data)}
  `.replaceAll('    ', '')
};

export const mjmlTransformToSvelte = async (
  renderMjmlBody: Renderer,
  requestContext: PageComponent,
  sveltePage: PageComponent,
  svelteServer: PageServerComponent
) => {
  const entries = await Promise.all(
    svelteServer.load._routes.map(async (route) => {
      const url = new URL(route, 'http://host/');
      const data = await svelteServer.load({ url });
      const page = createPage(url, data);
      const html = render(requestContext.default, {
        props: { page, children: sveltePage.default }
      });
      return {
        route,
        raw: await renderMjmlBody(html.body)
      };
    })
  );

  return `
    <script lang="ts">
      import { page } from '$app/state';
      const _route = page.data._route;
    </script>
    ${entries.map(
      ({ route, raw }) => `
    {#if _route === '${route}'}
      {@html ${JSON.stringify(tag_start)}}
      {@html ${JSON.stringify(raw)}}
      {@html ${JSON.stringify(tag_end)}}
    {/if}
    `
    )}
  `.replaceAll('    ', '');
};

export const loadRoutes = <PageLoadFn extends Function>(
  prerenderRoutes: () => string[],
  loadFn: PageLoadFn
) => {
  return Object.assign(loadFn, { _routes: prerenderRoutes() });
};

export const loadRoute = <PageData>(getRoute: () => string, data: PageData) => {
  return { ...data, _route: getRoute() };
};

export const mjmlFilterHtml = (html: string) =>
  html.indexOf(tag_start) < 0 && html.indexOf(tag_end) < 0
    ? html
    : html.split(tag_start)[1].split(tag_end)[0];
