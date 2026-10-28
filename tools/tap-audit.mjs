import { chromium } from 'playwright';
const b = await chromium.launch();
for (const vp of [{width:320,height:640,name:'320'},{width:360,height:800,name:'360'},{width:390,height:844,name:'390'}]) {
  const ctx = await b.newContext({ viewport:{width:vp.width,height:vp.height}, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  for (const r of ['/','/contact','/blog/shopify-product-page-checklist']) {
    await p.goto('http://127.0.0.1:3000'+r, { waitUntil:'domcontentloaded' });
    await p.waitForTimeout(1200);
    const res = await p.evaluate(() => {
      const de = document.documentElement;
      const bad = [...document.querySelectorAll('a,button')].filter(el=>{
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        if (r.width===0||r.height===0||s.visibility==='hidden'||s.display==='none') return false;
        if (el.closest('.skip-link') || el.className.toString().includes('skip-link')) return false;
        if (el.getAttribute('aria-hidden')==='true') return false;
        return r.height < 44 || r.width < 24;
      }).map(el=>`${el.tagName.toLowerCase()}["${(el.textContent||'').trim().slice(0,22)}"] ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
      return { overflow: de.scrollWidth - de.clientWidth, bad: bad.slice(0,10), count: bad.length, docH: de.scrollHeight };
    });
    console.log(`${vp.name}px ${r.padEnd(34)} overflow=${res.overflow} pageH=${res.docH} smallTargets=${res.count}`);
    if (vp.name==='390') res.bad.forEach(x=>console.log('    ', x));
  }
  await ctx.close();
}
await b.close();
