import module from 'node:module';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';
import { commonjs } from '@hyrious/esbuild-plugin-commonjs';

const base: Options = {
  dts: true,
  splitting: true,
  sourcemap: true,
  minify: false,
  cjsInterop: true,
  treeshake: {
    moduleSideEffects: 'no-external'
  },
  format: ['cjs', 'esm'],
  entryPoints: [],
  noExternal: [],
  esbuildPlugins: [
    commonjs({
      ignore: (path) => !(module.builtinModules.includes(path) || path.startsWith('node:'))
    })
  ],
  esbuildOptions: (options) => {
    options.chunkNames = 'library';
  }
};

const tsup: Options[] = [
  {
    ...base,
    entryPoints: ['src/plugin_vite.ts']
  },
  {
    ...base,
    entryPoints: ['src/plugin_svelte.ts']
  }
];

export default defineConfig(tsup);
