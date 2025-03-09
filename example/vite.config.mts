import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { mjmlPlugin } from '../src/plugin_vite';

export default defineConfig({
  server: {
    port: 5080
  },
  plugins: [sveltekit(), mjmlPlugin()]
});
