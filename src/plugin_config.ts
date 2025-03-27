import type { Preprocessor, PreprocessorGroup, Processed } from 'svelte/compiler';

import { extension, mjmlFormatStyles, mjmlParseStyles } from './plugin_base';

export function mjmlPreprocess(wrap?: PreprocessorGroup): PreprocessorGroup {
  const preTransform = (opt: Parameters<Preprocessor>[0]) => {
    if (!opt.filename || !opt.filename.endsWith(extension)) return;
    return mjmlParseStyles(opt.content);
  };
  const pass: Preprocessor = (opt) => ({ code: opt.content });
  const transform: Preprocessor = wrap?.style ?? pass;
  const postTransform = (input: Processed): Processed => {
    return {
      ...input,
      code: mjmlFormatStyles(input.code)
    };
  };
  return {
    ...wrap,
    name: 'mjml-preprocess',
    style: async (opt) => {
      const preContent = preTransform(opt);
      if (!preContent) return pass(opt);
      const content = await transform({
        ...opt,
        content: preContent
      });
      if (!content) return pass(opt);
      return postTransform(content);
    }
  };
}
