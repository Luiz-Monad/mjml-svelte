import { test, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { page } from './setup';

async function render(route: string) {
  await page.goto(`http://localhost:5080/${route}`);
  await page.waitForLoadState('domcontentloaded');
  return await page.content();
}

async function expected(route: string, htmlContent?: string) {
  const expectedHtmlPath = join(__dirname, `/src/routes/${route}/expected.html`);
  const expectedHtml = readFileSync(expectedHtmlPath, 'utf-8').trim();
  // writeFileSync(expectedHtmlPath, htmlContent!);
  return expectedHtml;
}

test('check if rendering works', async () => {
  const htmlContent = await render('mail');
  const expectedHtml = await expected('mail', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if including mjml works', async () => {
  const htmlContent = await render('include');
  const expectedHtml = await expected('include', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if raw debugger works', async () => {
  const htmlContent = await render('raw');
  const expectedHtml = await expected('raw', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if imported css on script rendering works', async () => {
  const htmlContent = await render('css');
  const expectedHtml = await expected('css', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if imported css on style rendering works', async () => {
  const htmlContent = await render('css_import');
  const expectedHtml = await expected('css_import', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});
