import { mjmlServerPageLoad } from 'mjml-svelte/svelte';

// disables rendering the mail to the client-side in production.
export const _noCsr = !import.meta.env.DEV;
// export const _raw = true; //for debug

export const load = mjmlServerPageLoad(
  (event) => ({ title: 'mail-test' }),
  () => ['/'],
  (event, data) => '/'
);
