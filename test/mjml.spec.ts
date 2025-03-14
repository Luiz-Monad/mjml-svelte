import { test, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { page } from './setup';

test('renders the +page.mjml.svelte and checks HTML output', async () => {
  // Navigate to the page where the Svelte component is rendered
  await page.goto('http://localhost:5080/'); // Adjust the URL as necessary

  // Wait for the component to be rendered
  await page.waitForLoadState('domcontentloaded');

  // Get the HTML content of the rendered component
  const htmlContent = await page.content();

  // Read the expected HTML content from the file
  const expectedHtmlPath = join(__dirname, 'expected.html');
  const expectedHtml = readFileSync(expectedHtmlPath, 'utf-8').trim();
  // writeFileSync(expectedHtmlPath, htmlContent);

  // Compare the actual HTML content with the expected HTML content
  expect(htmlContent.replaceAll('>', '>\n')).toContain(expectedHtml.replaceAll('>', '>\n'));
});

