import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport:{width:1440,height:900} })).newPage();
for (const p of ['/','/about','/services/shopify-development']) {
  await page.goto(B+p, { waitUntil:'networkidle', timeout:60000 });
  await page.waitForTimeout(1500);
  const res = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']).analyze();
  console.log('=====', p);
  for (const v of res.violations) {
    if (v.id !== 'color-contrast' && v.id !== 'list') continue;
    console.log(`- ${v.id}`);
    for (const n of v.nodes.slice(0,10)) console.log('   ', n.target.join(' ').slice(0,80), '|', (n.failureSummary||'').replace(/\n/g,' ').slice(0,150));
  }
}
await browser.close();
