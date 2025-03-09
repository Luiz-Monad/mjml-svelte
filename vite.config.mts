import path from 'node:path';
import type { UserConfigFn } from 'vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { copy } from 'vite-plugin-copy';

const src_components = path
  .resolve(import.meta.dirname, './src/components')
  .replaceAll(path.sep, path.posix.sep);
const tgt_components = path.resolve(import.meta.dirname, './dist/components');

const paths = (source: string) =>
  source.endsWith('.svelte') ? source.replace('$components', './components') : source;

const external = (source: string) => source.endsWith('.svelte');

export default defineConfig((config) => ({
  plugins: [
    svelte(),
    copy(
      [
        {
          src: `${src_components}/**/*.svelte`,
          dest: tgt_components
        }
      ],
      { hook: 'closeBundle' }
    )
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'mjmlSvelte'
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: './dist',
          entryFileNames: 'index.mjs',
          paths
        },
        {
          format: 'cjs',
          dir: './dist',
          entryFileNames: 'index.js',
          paths
        }
      ],
      external
    }
  },
  resolve: {
    alias: {
      $components: src_components
    }
  }
})) satisfies UserConfigFn;
