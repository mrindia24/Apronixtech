import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3500);
await page.screenshot({ path: '/tmp/shots/home-full.png', fullPage: true });
await browser.close();
