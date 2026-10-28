import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.route('**/*_rsc=*', async (route) => { await new Promise(r=>setTimeout(r,5000)); await route.continue(); });
await p.goto('http://127.0.0.1:3000/services', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(3500);
console.log('before click url:', p.url());
await p.evaluate(() => { const a=[...document.querySelectorAll('a')].find(x=>x.getAttribute('href')==='/work'); a.click(); });
for (const t of [300, 800, 1500, 2500, 4000, 6000]) {
  await p.waitForTimeout(t === 300 ? 300 : 700);
  const status = await p.locator('[role=status]').count();
  console.log(`t≈${t}ms url=${p.url().replace('http://127.0.0.1:3000','')} statusRegions=${status}`);
}
await b.close();
