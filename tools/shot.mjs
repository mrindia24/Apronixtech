import { chromium } from 'playwright';
const targets = [
  ['/', 'home', 1440, 900, true],
  ['/', 'home-mobile', 390, 844, true],
  ['/services/shopify-development', 'service', 1440, 900, false],
  ['/work', 'work', 1440, 900, false],
  ['/blog', 'blog', 1440, 900, false],
  ['/contact', 'contact', 1440, 900, false],
];
const browser = await chromium.launch();
for (const [path, name, w, h, full] of targets) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR ' + e.message));
  await page.goto('http://127.0.0.1:3000' + path, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: full });
  console.log(name, 'errors:', errors.slice(0,5));
  await ctx.close();
}
await browser.close();
