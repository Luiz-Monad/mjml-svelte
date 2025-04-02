import { type Browser, type BrowserContext, type Page, chromium } from '@playwright/test';
import { afterAll, beforeAll } from 'vitest';

let browser: Browser;
let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

export { page };

// TODO : vitest running in test mode needs to start the vite dev server
