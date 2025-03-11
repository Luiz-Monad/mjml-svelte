import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { mjmlHandler } from 'mjml-svelte/svelte';

// user's request handler
const requestHandler: Handle = async ({ event, resolve }) => {
  return await resolve(event);
};

export const handle = sequence(requestHandler, mjmlHandler);

export const handleError: HandleServerError = async ({ event, error }) => {
  console.log(error);
};
