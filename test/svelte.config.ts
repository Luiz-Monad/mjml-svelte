import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mjmlPreprocess } from '../src/plugin_config.ts';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [mjmlPreprocess(vitePreprocess())],
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
