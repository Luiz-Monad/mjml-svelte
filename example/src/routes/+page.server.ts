import { mjmlServerPageLoad } from '$lib/plugin_svelte';

export const load = mjmlServerPageLoad(
  () => ({ title: 'mail-test' }),
  () => ['/'],
  (data) => '/'
);
