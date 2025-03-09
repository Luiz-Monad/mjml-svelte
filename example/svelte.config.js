import path from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.mjml.svelte', '.svelte'],
  kit: {
    alias: {
      $components: path.resolve(import.meta.dirname, '../src/components'),
      $lib: path.resolve(import.meta.dirname,'../src')
    }
  }
};

export default config;
