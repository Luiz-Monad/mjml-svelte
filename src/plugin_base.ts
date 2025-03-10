const tag_start = '%%MJML_START%%';
const tag_end = '%%MJML_END%%';

type Renderer = (mjmlSvelte: string) => Promise<string>;

export const mjmlTransformCode = async (
  renderMjmlBody: Renderer,
  sveltePage: any,
  svelteLayout: any,
  ssr: boolean
) => {
  if (!ssr) {
    return 'export default (payload) => {}';
  }
  let processedCode = '';
  processedCode += `import { page } from '$app/state';`;
  processedCode += `export default (payload, props) => {`;
  processedCode += `  const _route = page.data._route;`;
  for (const route of svelteLayout.load._routes) {
    const url = new URL(route, 'http://host/');
    const data = await svelteLayout.load({ url });
    const html = { out: '' };
    sveltePage.default(html, data);
    const raw = await renderMjmlBody(html.out ?? '');
    processedCode += `  if (_route === '${route}') {`;
    processedCode += `    payload.out += '${tag_start}';`;
    processedCode += `    payload.out += ${JSON.stringify(raw)};`;
    processedCode += `    payload.out += '${tag_end}';`;
    processedCode += `  }`;
  }
  processedCode += `}`;
  return processedCode;
};

export const loadRoutes = (prerenderRoutes: () => string[], loadFn: Function) => {
  return Object.assign(loadFn, { _routes: prerenderRoutes() });
};

export const loadRoute = <O>(getRoute: () => string, data: O) => {
  return { ...data, _route: getRoute() };
};

export const mjmlFilterHtml = (html: string) =>
  html.indexOf(tag_start) < 0 && html.indexOf(tag_end) < 0
    ? html
    : html.split(tag_start)[1].split(tag_end)[0];
