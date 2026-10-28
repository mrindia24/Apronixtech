import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });

async function shoot(path, name, scroll=0) {
  await page.goto('http://127.0.0.1:3000' + path, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1500);
  if (scroll) { await page.evaluate(y => window.scrollTo(0, y), scroll); await page.waitForTimeout(1800); }
  await page.screenshot({ path: `/tmp/shots/${name}.png` });
}
await shoot('/services/shopify-development', 'svc-hero', 0);
await shoot('/services/shopify-development', 'svc-mid', 2200);
await shoot('/work', 'work-hero', 0);
await shoot('/contact', 'contact', 300);
await shoot('/blog/shopify-product-page-checklist', 'article', 700);
await shoot('/admin/login', 'admin-login', 0);
await shoot('/about', 'about', 0);
await shoot('/privacy-policy', 'privacy', 0);
console.log('errors:', errs.slice(0,10));
await browser.close();
