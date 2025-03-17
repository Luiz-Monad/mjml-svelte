/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.mjml.svelte', '.svelte'],
  kit: {
    alias: {
      $components: './src/components',
      $library: './src/library'
    }
  }
};

export default config;
