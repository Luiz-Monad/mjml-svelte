import { mjmlServerPageLoad } from 'mjml-svelte/svelte';

export const load = mjmlServerPageLoad(
  () => ({ title: 'mail-test' }),
  () => ['/'],
  (data) => '/'
);
