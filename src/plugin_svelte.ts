import type { Handle, LoadEvent, Load } from '@sveltejs/kit';

import { loadRoute, loadRoutes, mjmlFilterHtml } from './plugin_base';

export const mjmlServerPageLoad = <
  Params extends Partial<Record<string, string>>,
  InputData extends Record<string, unknown> | null,
  ParentData extends Record<string, unknown>,
  OutputData extends Record<string, unknown> | void,
  RouteId extends string | null,
  Event extends LoadEvent<Params, InputData, ParentData, RouteId>
>(
  loadBase: Load<Params, InputData, ParentData, OutputData, RouteId>,
  prerenderRoutes: () => string[],
  getRoute: (event: Event, data: OutputData) => string
) => {
  const load = async (event: Event) => {
    const data = await loadBase(event);
    return loadRoute(() => getRoute(event, data), data);
  };
  return loadRoutes(prerenderRoutes, load);
};

export const mjmlHandler: Handle = async ({ event, resolve }) => {
  return await resolve(event, {
    transformPageChunk: ({ html }) => mjmlFilterHtml(html)
  });
};
