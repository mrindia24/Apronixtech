import { chromium } from 'playwright';
const ROUTES = ['/', '/services', '/services/shopify-development', '/work', '/work/sample-shopify-storefront', '/blog', '/blog/shopify-product-page-checklist', '/contact', '/about'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const p = await ctx.newPage();

for (const r of ROUTES) {
  await p.goto('http://127.0.0.1:3000' + r, { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(1800);
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,60)); }
    window.scrollTo(0,0);
  });
  await p.waitForTimeout(700);

  const m = await p.evaluate(() => {
    const de = document.documentElement;
    const overflowX = de.scrollWidth - de.clientWidth;
    // elements wider than the viewport
    const wide = [...document.querySelectorAll('body *')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > de.clientWidth + 2 && r.height > 0 && getComputedStyle(el).position !== 'fixed';
    }).slice(0,5).map(el => `${el.tagName.toLowerCase()}.${(el.className||'').toString().slice(0,40)} w=${Math.round(el.getBoundingClientRect().width)}`);
    // small tap targets among links/buttons
    const small = [...document.querySelectorAll('a,button,[role=button]')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40) && getComputedStyle(el).visibility !== 'hidden';
    }).slice(0,6).map(el => `${el.tagName.toLowerCase()}[${(el.textContent||'').trim().slice(0,18)}] ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
    // images and their rendered boxes
    const imgs = [...document.querySelectorAll('img')].slice(0,8).map(i => {
      const r = i.getBoundingClientRect();
      return `${i.src.split('/').pop().slice(0,28)} box=${Math.round(r.width)}x${Math.round(r.height)} natural=${i.naturalWidth}x${i.naturalHeight}`;
    });
    return { overflowX, wide, small, imgs };
  });
  console.log('\n=== ' + r + ' ===');
  console.log('horizontal overflow:', m.overflowX + 'px');
  if (m.wide.length) console.log('wide els:', m.wide);
  if (m.small.length) console.log('small targets:', m.small);
  console.log('imgs:', m.imgs);
  await p.screenshot({ path: `/tmp/shots/m-full${r.replace(/\//g,'_')}.png`, fullPage: true });
}
await b.close();
