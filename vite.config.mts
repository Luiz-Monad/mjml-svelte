import path from 'node:path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dts from 'vite-plugin-dts';
import { packagePlugin } from './vite-package.mts';
import autoExternal from 'rollup-plugin-auto-external';
import glob from 'fast-glob';

const src_components = path
  .resolve(import.meta.dirname, './src/components')
  .replaceAll(path.sep, path.posix.sep);
const tgt_components = path.resolve(import.meta.dirname, './dist/components');

const paths = (source: string) =>
  source.endsWith('.svelte') ? source.replace('$components', './components') : source;

const external = (await glob('*', { cwd: src_components })).map(id => `$components/${id}`);

export default defineConfig({
  plugins: [
    svelte(),
    packagePlugin(src_components, tgt_components),
    dts({
      include: ['./src/**/*.ts', './src/**/*.svelte'],
      insertTypesEntry: true,
      rollupTypes: true,
    })
  ],
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        plugin_vite: './src/plugin_vite.ts',
        plugin_svelte: './src/plugin_svelte.ts'
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`
    },
    target: 'node18',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      plugins: [
        autoExternal()
      ],
      output: {
        chunkFileNames: 'library.js',
        paths
      },
      external,
      treeshake: {
        moduleSideEffects: 'no-external'
      }
    }
  },
  resolve: {
    alias: {
      $components: src_components
    }
  },
});
