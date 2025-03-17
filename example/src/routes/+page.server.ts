import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const format = (s: string) => s.replaceAll('>', '>\n').replaceAll('\n\n', '\n');
  let rawMailHtml = '';
  try {
    const response = await fetch('/mail');
    if (response.ok) {
      rawMailHtml = format(await response.text());
    } else {
      console.error('Failed to fetch raw mail');
    }
  } catch (error) {
    console.error('Error fetching raw mail:', error);
  }
  let sourceMjml = '';
  try {
    const response = await fetch('/mail/raw');
    if (response.ok) {
      sourceMjml = format(await response.text());
    } else {
      console.error('Failed to fetch source mjml');
    }
  } catch (error) {
    console.error('Error fetching raw mail:', error);
  }
  return {
    rawMailHtml,
    sourceMjml
  };
};
