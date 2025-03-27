import type { Page } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import { render } from 'svelte/server';
import { URL } from 'url';
import { createChildText, getText, stringToHtml, htmlToString } from './utils/dom';

export const extension = '.mjml.svelte';

const tag_start = '%%MJML_START%%';
const tag_end = '%%MJML_END%%';

interface PageEvent {
  url: URL;
}

type Loader = (url: string) => Promise<PageComponent>;
type Renderer = (
  mjmlSvelte: string,
  styles: string[],
  scripts: string[],
  isRaw: boolean
) => Promise<string>;
type PageData = Record<string, any>;
type PageStyles = { default: string }[];
type PageScripts = { default: string }[];
type PageLoadFn = (event: PageEvent) => Promise<PageData>;
type PageComponent = { default: typeof SvelteComponent };
type PageServerComponent = {
  load: PageLoadFn & { _routes: string[] };
  _raw?: boolean;
  _noCsr?: boolean;
};

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

export const mjmlProcessInclude = async (loader: Loader, url: string): Promise<PageComponent> => {
  let page = await loader(url);
  let str: string;
  while ((str = page.default.toString()).includes('__mjml_include')) {
    const includeMatch = str.match(/__mjml_include.*?=.*?['"]([^'"]+)['"]/);
    if (!includeMatch || !includeMatch[1]) break;
    page = await loader(includeMatch[1]);
  }
  return page;
};

export const mjmlTransformToSvelte = async (
  requestContext: PageComponent,
  sveltePage: PageComponent,
  svelteServer: PageServerComponent,
  svelteStyles: PageStyles,
  svelteScripts: PageScripts,
  renderMjmlBody: Renderer,
  isSSR: boolean
) => {
  const isRaw = !!svelteServer._raw;
  const isNoCsr = !!svelteServer._noCsr;
  if (isNoCsr && !isSSR) return '';
  const entries = await Promise.all(
    svelteServer.load._routes.map(async (route) => {
      const url = new URL(route, 'http://host/');
      const data = await svelteServer.load({ url });
      const page = createPage(url, data);
      const html = render(requestContext.default, {
        props: { page, children: sveltePage.default }
      });
      const styles = Array.from(svelteStyles.map((s) => s.default));
      const scripts = Array.from(svelteScripts.map((s) => s.default));
      return {
        route,
        raw: await renderMjmlBody(html.body, styles, scripts, isRaw)
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
      {@html ${quoteJsonString(tag_start)}}
      {@html ${quoteJsonString(raw)}}
      {@html ${quoteJsonString(tag_end)}}
    {/if}
    `
    )}
  `.replaceAll('    ', '');
};

const quoteJsonString = (html: string) => `String.raw\`${html}\``;

export const mjmlParseStyles = (style: string): string => {
  try {
    const html = stringToHtml(style);
    const raw = getText(html) ?? style;
    return raw;
  } catch (error) {
    console.warn('Error parsing styles:', error);
    return style;
  }
};

export const mjmlFormatStyles = (raw: string): string => {
  try {
    const doc = stringToHtml('');
    createChildText(doc, raw);
    const html = htmlToString(doc);
    return html;
  } catch (error) {
    console.warn('Error formatting styles:', error);
    return raw;
  }
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
