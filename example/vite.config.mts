import { type PluginOption } from 'vite';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { mjmlPlugin } from 'mjml-svelte/vite';

export default defineConfig({
  server: {
    port: 5080
  },
  preview: {
    port: 5080
  },
  plugins: [sveltekit() as PluginOption, mjmlPlugin() as PluginOption]
});
