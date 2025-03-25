import { mjmlServerPageLoad } from '$plugin';

export const load = mjmlServerPageLoad(
  () => ({ title: 'mail-test' }),
  () => ['/'],
  () => '/'
);
