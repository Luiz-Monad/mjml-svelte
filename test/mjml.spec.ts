import { test, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { page } from './setup';

async function render(route: string) {
  await page.goto(`http://localhost:5080/${route}`);
  await page.waitForLoadState('domcontentloaded');
  return await page.content();
}

async function expected(file: string, htmlContent?: string) {
  const expectedHtmlPath = join(__dirname, file);
  const expectedHtml = readFileSync(expectedHtmlPath, 'utf-8').trim();
  // writeFileSync(expectedHtmlPath, htmlContent!);
  return expectedHtml;
}

test('check if rendering works', async () => {
  const htmlContent = await render('mail');
  const expectedHtml = await expected('mjml.mail.expected.html', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if including mjml works', async () => {
  const htmlContent = await render('include');
  const expectedHtml = await expected('mjml.mail.expected.html', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});

test('check if raw debugger works', async () => {
  const htmlContent = await render('raw');
  const expectedHtml = await expected('mjml.raw.expected.html', htmlContent);
  expect(htmlContent).toContain(expectedHtml);
});
