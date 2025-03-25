import { mjmlServerPageLoad } from '$plugin';

export const _raw = true;

export const load = mjmlServerPageLoad(
  () => ({ title: 'mail-test' }),
  () => ['/'],
  () => '/'
);
