import { spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { Plugin } from 'vite';

export function packagePlugin(input: string, output?: string): Plugin {
  return {
    name: 'copy',
    apply: 'build',
    closeBundle: async function () {
      const exec = promisify(spawn);
      try {
        await exec(
          'npx',
          ['svelte-package', '--input', input, ...(output ? ['--output', output] : [])],
          {
            stdio: 'inherit',
            shell: true
          }
        );
      } catch (err) {
        this.error(`Failed to run svelte-package: ${err}`);
      }
    }
  };
}
