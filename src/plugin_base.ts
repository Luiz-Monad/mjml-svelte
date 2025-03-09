import { type Handle, type Load as LoadFn } from '@sveltejs/kit';
import mjml2html from 'mjml';
import { minify } from 'html-minifier';

const tag_start = '%%MJML_START%%';
const tag_end = '%%MJML_END%%';

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

export const mjmlTransformCode = async (sveltePage: any, svelteLayout: any, ssr: boolean) => {
  if (!ssr) {
    return 'export default (payload) => {}';
  }
  let processedCode = '';
  processedCode += `import { page } from '$app/state';`;
  processedCode += `export default (payload, props) => {`;
  processedCode += `  const route = page.data.route;`;
  for (const route of svelteLayout.load.routes) {
    const url = new URL(route, 'http://host/');
    const data = await svelteLayout.load({ url });
    const html = { out: '' };
    sveltePage.default(html, data);
    const raw = await renderMjmlBody(html.out ?? '');
    processedCode += `  if (route === '${route}') {`;
    processedCode += `    payload.out += '${tag_start}';`;
    processedCode += `    payload.out += ${JSON.stringify(raw)};`;
    processedCode += `    payload.out += '${tag_end}';`;
    processedCode += `  }`;
  }
  processedCode += `}`;
  return processedCode;
};

export const mjmlServerPageLoad = <
  Params extends Partial<Record<string, string>>,
  InputData extends Record<string, unknown> | null,
  ParentData extends Record<string, unknown>,
  OutputData extends Record<string, unknown> | void,
  RouteId extends string | null
>(
  loadBase: LoadFn<Params, InputData, ParentData, OutputData, RouteId>,
  prerenderRoutes: () => string[],
  getRoute: (data: OutputData) => string
) => {
  const load: LoadFn<Params, InputData, ParentData, OutputData, RouteId> = async (args) => {
    const data = await loadBase(args);
    return { ...data, route: getRoute(data) };
  };
  Object.assign(load, { routes: prerenderRoutes() });
  return load;
};

export const mjmlHandler: Handle = async ({ event, resolve }) => {
  return await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.indexOf(tag_start) < 0 && html.indexOf(tag_end) < 0
        ? html
        : html.split(tag_start)[1].split(tag_end)[0]
  });
};
