import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:3000/blog', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2000);
// scroll to the post cards
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/shots/blog-cards.png' });
const imgs = await page.$$eval('img', els => els.map(e => ({src: e.currentSrc || e.src, w: e.naturalWidth, h: e.naturalHeight, complete: e.complete})));
console.log(JSON.stringify(imgs, null, 1));
await browser.close();
