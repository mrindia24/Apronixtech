import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto('http://127.0.0.1:3000/admin/login', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(1200);
await p.fill('#email','admin@apronixtech.com');
await p.fill('#password','Apronix!Admin#2026');
await p.click('button[type=submit]');
await p.waitForTimeout(4000);
console.log('on admin:', p.url());

// Now throttle the RSC fetch for a nested admin route
await p.route('**/*_rsc=*', async (route) => { await new Promise(r=>setTimeout(r,6000)); await route.continue(); });
await p.evaluate(() => { const a=[...document.querySelectorAll('a[href="/admin/leads"]')][0]; if(a) a.click(); });
await p.waitForTimeout(1500);
const status = await p.locator('[role=status]').first().textContent().catch(()=>null);
console.log('fallback status text:', JSON.stringify(status?.trim().slice(0,40)));
const hasBar = await p.locator('.loading-bar').count();
const hasRing = await p.locator('.loading-ring').count();
console.log('loading bar:', hasBar, 'loading ring:', hasRing);
await p.screenshot({ path:'/tmp/shots/admin-loading.png' });
await b.close();
