// default used by svelte-kit sync
/** @type {import('@sveltejs/kit').Config} */
const defaultConfig = {
  extensions: ['.mjml.svelte', '.svelte'],
  kit: {
    alias: {
      $components: '../src/components',
      $library: '../src/index.ts',
      $plugin: '../src/plugin_svelte.ts'
    }
  }
};
export default globalThis.svelteConfig ?? defaultConfig;
