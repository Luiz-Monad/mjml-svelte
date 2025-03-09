declare module 'vite-plugin-copy' {
  import { Plugin } from 'vite';

  interface CopyOptions {
    hook?: string;
  }

  interface CopyItem {
    src: string | string[];
    dest: string | string[];
  }

  export function copy(copyList: CopyItem[], options?: CopyOptions): Plugin;
}
