import { chromium } from 'playwright';
const b = await chromium.launch();

// 1. Boot overlay: capture immediately after first paint
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:3000/', { waitUntil:'commit' });
await p.waitForTimeout(120);
await p.screenshot({ path:'/tmp/shots/boot.png' });
const bootVisible = await p.locator('#apronix-boot').count();
console.log('boot overlay in DOM at first paint:', bootVisible > 0);

// 2. After load it must remove itself
await p.waitForTimeout(4000);
const stillThere = await p.locator('#apronix-boot').count();
console.log('boot overlay removed after load:', stillThere === 0);
const h1 = await p.locator('h1').first().textContent();
console.log('home h1 reachable:', h1?.trim().slice(0,40));

// 3. Route-transition fallback screenshot (force a slow route via CDP throttle)
const p2 = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p2.goto('http://127.0.0.1:3000/services', { waitUntil:'domcontentloaded' });
await p2.waitForTimeout(4000);
const cdp = await p2.context().newCDPSession(p2);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline:false, latency:900, downloadThroughput:40000, uploadThroughput:40000 });
await p2.evaluate(() => { const a=[...document.querySelectorAll('a')].find(x=>x.getAttribute('href')==='/work'); a.click(); });
await p2.waitForTimeout(700);
await p2.screenshot({ path:'/tmp/shots/route-loading.png' });
console.log('captured route transition');

// 4. Reduced motion: overlay must not appear at all
const ctx3 = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
const p3 = await ctx3.newPage();
await p3.goto('http://127.0.0.1:3000/', { waitUntil:'commit' });
await p3.waitForTimeout(400);
const rmBox = await p3.locator('#apronix-boot').boundingBox().catch(()=>null);
console.log('reduced-motion boot hidden:', rmBox === null);
await b.close();
