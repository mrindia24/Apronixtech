import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport:{width:1440,height:900} });
const page = await ctx.newPage();
const pages = ['/','/services','/services/shopify-development','/work','/blog','/blog/shopify-product-page-checklist','/contact','/about','/privacy-policy'];
for (const p of pages) {
  await page.goto(B+p, { waitUntil:'networkidle', timeout:60000 });
  await page.waitForTimeout(1200);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']).analyze();
  const v = results.violations.map(x => `${x.impact}: ${x.id} (${x.nodes.length})`);
  console.log(p, v.length ? JSON.stringify(v) : 'OK');
}
// login page
await page.goto(B+'/admin/login', { waitUntil:'networkidle' });
await page.waitForTimeout(800);
const r2 = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
console.log('/admin/login', r2.violations.length ? JSON.stringify(r2.violations.map(x=>`${x.impact}: ${x.id} (${x.nodes.length})`)) : 'OK');
// keyboard: tab to skip link
await page.goto(B+'/', { waitUntil:'networkidle' });
await page.keyboard.press('Tab');
console.log('first tab focus:', await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0,40)));
await browser.close();
