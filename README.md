# MJML-Svelte for Vite and Svelte

This project allows using [MJML](https://mjml.io/) with [SvelteKit](https://kit.svelte.dev/) to create responsive email templates. It allows to integrate MJML elements with Svelte components and render them on the server.

Principle of operation:

```
┌─────────────────────────┐
│  MJML Svelte Template   │  Preprocess CSS
│  (+page.mjml.svelte)    │  Preprocess includes
└───────────┬─────────────┘
            │
            │ Render to MJML XML
            ▼
┌─────────────────────────┐
│      MJML XML Output    │
│        (.mjml)          │
└───────────┬─────────────┘
            │
            │ Process with MJML Engine
            ▼
┌─────────────────────────┐
│      HTML Output        │  Minified HTML/CSS
│        (.html)          │
└───────────┬─────────────┘
            │
            │ Embed in Svelte Page
            │ using @html clause
            ▼
┌─────────────────────────┐
│  Svelte Rendered Page   │  Only this code is
│     (+page.svelte)      │  include in the final app
└─────────────────────────┘
            │
            │ Strips the outside 'app.html'
            │ template, leaving the content
            | in %sveltekit.body% only
            ▼
┌─────────────────────────┐
│     Request Handler     │
│    (hooks.server.ts)    │
└─────────────────────────┘
```

## Features

- **MJML Integration**: Use MJML components within Svelte to design responsive emails.
- **SvelteKit**: Leverage the power of SvelteKit for server-side rendering and routing.
- **Vite**: Fast build tool and development server.

## Prerequisites

- Node.js version 18 or higher
- PNPM (or npm/yarn if you prefer)

## Installation

Install with your favorite NodeJS package manager:

```bash
$ pnpm install mjml-svelte
```

## Configuration

1. **Vite config:**

   Update your `vite.config.ts` to include the MJML plugin:

   ```ts
   // vite.config.ts
   import { defineConfig } from 'vite';
   import { sveltekit } from '@sveltejs/kit/vite';
   import { mjmlPlugin } from 'mjml-svelte/vite';

   export default defineConfig({
     server: {
       port: 5080
     },
     plugins: [sveltekit(), mjmlPlugin()]
   });
   ```

2. **Server Hook:**

   Create a `hooks.server.ts` file to handle requests for MJML pages outside the Kit, otherwise the Kit will embed the HTML output inside its _app.html_ template.

   ```typescript
   // hooks.server.ts
   import { sequence } from '@sveltejs/kit/hooks';
   import { mjmlHandler } from 'mjml-svelte/svelte';

   const requestHandler: Handle = async ({ event, resolve }) => {
     return await resolve(event);
   };

   export const handle = sequence(requestHandler, mjmlHandler);
   ```

3. **Svelte config:**

   Add the supported svelte extensions to `svelte.config.js` to use the MJML files, otherwise SvelteKit will complain about invalid file name in the project.

   ```js
   // svelte.config.js
   import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
   import { mjmlPreprocess } from 'mjml-svelte/config';

   /** @type {import('@sveltejs/kit').Config} */
   const config = {
     //if you need to preprocess using vitePreprocess then you wrap vitePreprocess.
     preprocess: mjmlPreprocess(vitePreprocess()),
     extensions: ['.mjml.svelte', '.svelte'],
     kit: {
       // your config
     }
   };
   export default config;
   ```

   If you need to preprocess CSS in your application before compiling Svelte pages (for ex, _tailwindcss_), then you need to add mjmlPreprocess before vitePreprocess, otherwise the rendered HTML inside the @html clause might be preprocessed again wrongly, which causes errors.

4. **MJML Svelte Page:**

   Create a file named `+page.mjml.svelte` to use the MJML renderer:

   ```html
   <!-- +page.mjml.svelte -->
   <script lang="ts">
     import { Mjml, MjBody, MjHead, MjTitle, MjText } from 'mjml-svelte';
   </script>

   <Mjml>
     <MjHead>
       <MjTitle>Example Email</MjTitle>
     </MjHead>
     <MjBody>
       <MjText>Welcome to our service!</MjText>
     </MjBody>
   </Mjml>
   ```

5. **Server-Side Rendering:**

   Configure server-side rendering in `+page.server.ts`. This allows you to provide data at runtime (when processing request) to the template engine before the MJML in actually rendered. I'll be available in `page.data` in the `+page.mjml.svelte` template. You can also selectively output different templates based on data in a store, for ex, locale set in the **requestHandler**.

   ```typescript
   // +page.server.ts
   import { mjmlServerPageLoad } from 'mjml-svelte/svelte';

   // disables rendering the mail to the client-side in production, bundle size.
   export const _noCsr = !import.meta.env.DEV;
   // export const _raw = true; //for debug

   export const load = mjmlServerPageLoad(
     (event) => ({ title: 'mail-test' }),
     () => ['/', '/en'],
     (event, data) => event.locals.locale
   );
   ```

6. **Client-Side Rendering:**

   You usually don't need SvelteKit client-side code on the mail body itself, remove CSR in `+page.ts`:

   ```typescript
   // +page.ts
   export const csr = false;
   ```

## Usage

Start Vite in development mode with `vite dev` and load your project in the browser. You can now create and render MJML emails using Svelte components.

To get the result of the rendered mail, you can use a server-side load function similar to the one in `+page.server.ts`. This function fetches the rendered email content from a specified endpoint, on this example we're sending it back to the frontend for display but you can pass it to any mail library or API of your choosing.

Alternatively, you can use an **action** to handle server-side logic, such as form submissions or other interactions:

```typescript
// +page.server.ts
import type { PageServerLoad, Actions } from './$types';

// Example retrieve the raw HTML for the mail.
export const load: PageServerLoad = async ({ fetch }) => {
  let rawMailHtml = '';
  try {
    const response = await fetch('/mail');
    if (response.ok) {
      rawMailHtml = await response.text();
    } else {
      console.error('Failed to fetch raw mail');
    }
  } catch (error) {
    console.error('Error fetching raw mail:', error);
  }

  return {
    rawMailHtml
  };
};

// Example action to handle form submission.
export const actions: Actions = {
  sendEmail: async ({ request }) => {
    try {
      const response = await fetch('/mail');
      const emailContent = await response.text();

      // Logic to send email using the emailContent
      // Assume sendMail is a function that sends an email
      await sendMail(emailContent);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }
};
```

This setup allows you to handle form submissions or other actions on the server side, providing flexibility in how you manage server-side logic in your SvelteKit application.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full list of changes between versions.

## Contributing

Thank you for checking out my project. Feedback and suggestions are welcome, please use GitHub issues appropriately.

If you are suggesting any major changes please make sure it is well reasoned and in line with the core principles of this project. Please understand I am one busy person and require a description of the problem and a compelling argument for the proposed solution in order to consider it properly.

## License

MJML-Svelte [MIT](LICENSE) licensed.
