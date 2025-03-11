import { type PluginOption } from 'vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { mjmlPlugin } from '../src/plugin_vite';

const default_extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];

export default defineConfig({
  plugins: [sveltekit() as PluginOption, mjmlPlugin()],
  resolve: {
    extensions: ['.mjml.svelte', '.svelte', ...default_extensions],
    alias: {
      $components: '../src/components',
      $library: '../src/index.ts',
      $plugin: '../src/plugin_svelte.ts'
    }
  },
  test: {
    api: {
      port: 5080
    },
    globals: true,
    setupFiles: './setup.ts',
    include: ['./**/*.spec.{js,ts,svelte}'],
    allowOnly: !process.env.CI
  }
});
