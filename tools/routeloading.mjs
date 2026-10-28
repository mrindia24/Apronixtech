import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();

// Delay the RSC payload so the Suspense fallback is visible long enough to capture.
await p.route('**/*_rsc=*', async (route) => {
  await new Promise((r) => setTimeout(r, 5000));
  await route.continue();
});

await p.goto('http://127.0.0.1:3000/services', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(3500);
await p.evaluate(() => {
  const a = [...document.querySelectorAll('a')].find(x => x.getAttribute('href') === '/work');
  a.click();
});
await p.waitForTimeout(1200);
await p.screenshot({ path:'/tmp/shots/route-loading2.png' });
const statusText = await p.locator('[role=status]').first().textContent().catch(()=>'none');
console.log('status region text while loading:', JSON.stringify(statusText?.trim()));
const hasMark = await p.locator('img[src="/brand/apronix-mark.png"]').count();
console.log('brand mark instances:', hasMark);
await b.close();
