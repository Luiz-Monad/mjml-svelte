import { spawn } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Plugin } from 'vite';
import glob from 'fast-glob';

export function packagePlugin(input: string, output: string, root: string = '.'): Plugin[] {
  return [
    {
      name: 'package-plugin-pre',
      apply: 'build',
      enforce: 'pre',
      buildStart: async function () {
        try {
          const files = await glob('**/*', { cwd: input });
          const packageJsonPath = path.resolve(path.join(root, 'package.json'));
          const packageJsonFile = await fs.readFile(packageJsonPath, 'utf-8');
          const packageJson = JSON.parse(packageJsonFile);
          const dist = path.relative(root, output).replaceAll(path.sep, path.posix.sep);
          packageJson.exports = packageJson.exports || {};
          for (const file of files) {
            const exportPath = `./${file}`;
            const distPath = `./${path.posix.join(dist, file)}`;
            packageJson.exports[exportPath] = {
              svelte: {
                types: `${distPath}.d.ts`,
                import: distPath
              }
            };
          }
          const packageJsonOut = JSON.stringify(packageJson, null, 2);
          if (packageJsonOut != packageJsonFile) {
            await fs.writeFile(packageJsonPath, packageJsonOut);
            this.info('Updated package.json exports with Svelte components');
          }
        } catch (err) {
          this.error(`Failed to update package.json: ${err}`);
        }
      }
    },
    {
      name: 'package-plugin',
      apply: 'build',
      closeBundle: async function () {
        const exec = promisify(spawn);
        try {
          this.info('Copying Svelte components');
          await exec('svelte-package', ['--input', input, '--output', output], {
            stdio: 'inherit',
            shell: true
          });
        } catch (err) {
          this.error(`Failed to run svelte-package: ${err}`);
        }
      }
    }
  ];
}
