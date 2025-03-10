/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.mjml.svelte', '.svelte'],
  kit: {
    alias: {
      $components: './src/components',
      $lib: './src/lib'
    }
  }
};

export default config;
