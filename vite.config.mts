import path from 'node:path';
import { type PluginOption } from 'vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dts from 'vite-plugin-dts';
import { packagePlugin } from './vite-package.mts';
import nodeExternals from 'rollup-plugin-node-externals';
import glob from 'fast-glob';

const src_components = path
  .resolve(import.meta.dirname, './src/components')
  .replaceAll(path.sep, path.posix.sep);

const tgt_components = path.resolve(import.meta.dirname, './dist/components');

const paths = (source: string) =>
  source.endsWith('.svelte') ? source.replace('$components', './components') : source;

const components = (await glob('*', { cwd: src_components })).map((id) => `$components/${id}`);

export default defineConfig({
  plugins: [
    svelte() as PluginOption,
    packagePlugin(src_components, tgt_components),
    dts({
      include: ['./src/**/*.ts', './src/**/*.svelte'],
      insertTypesEntry: true,
      rollupTypes: true
    }),
    nodeExternals({
      include: ['fsevents', 'vite']
    })
  ],
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        plugin_config: './src/plugin_config.ts',
        plugin_vite: './src/plugin_vite.ts',
        plugin_svelte: './src/plugin_svelte.ts'
      }
    },
    target: 'node18',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => `${name}.mjs`,
          chunkFileNames: ({ name }) => `lib_${name}.mjs`,
          paths
        },
        {
          format: 'cjs',
          entryFileNames: ({ name }) => `${name}.js`,
          chunkFileNames: ({ name }) => `lib_${name}.js`,
          paths
        }
      ],
      external: components
    }
  },
  resolve: {
    alias: {
      $components: src_components
    }
  }
});
