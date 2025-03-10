import { type Handle, type Load as LoadFn } from '@sveltejs/kit';

import { loadRoute, loadRoutes, mjmlFilterHtml } from './plugin_base';

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
    return loadRoute(() => getRoute(data), data);
  };
  return loadRoutes(prerenderRoutes, load);
};

export const mjmlHandler: Handle = async ({ event, resolve }) => {
  return await resolve(event, {
    transformPageChunk: ({ html }) => mjmlFilterHtml(html)
  });
};
