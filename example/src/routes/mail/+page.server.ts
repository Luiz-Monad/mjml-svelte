import { mjmlServerPageLoad } from 'mjml-svelte/svelte';

export const load = mjmlServerPageLoad(
  (event) => ({ title: 'mail-test' }),
  () => ['/'],
  (event, data) => '/'
);
