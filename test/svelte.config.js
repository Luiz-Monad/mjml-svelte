/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.mjml.svelte', '.svelte'],
  kit: {
    alias: {
      $components: '../src/components',
      $library: '../src/index.ts',
      $plugin: '../src/plugin_svelte.ts'
    }
  }
};

export default config;
