import { chromium } from 'playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
const dctx = await browser.newContext({ viewport:{width:1440,height:900} });
const page = await dctx.newPage();
await page.goto(B+'/', { waitUntil:'networkidle' });
await page.waitForTimeout(3000);
await page.screenshot({ path:'/tmp/shots/f-home-hero.png' });
await page.evaluate(()=>window.scrollTo(0,1600)); await page.waitForTimeout(1500);
await page.screenshot({ path:'/tmp/shots/f-home-services.png' });
// mobile
const mctx = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
const m = await mctx.newPage();
await m.goto(B+'/', { waitUntil:'networkidle' });
await m.waitForTimeout(2500);
await m.screenshot({ path:'/tmp/shots/f-mobile-hero.png' });
// mobile menu open
await m.click('[aria-controls="mobile-menu"]');
await m.waitForTimeout(700);
await m.screenshot({ path:'/tmp/shots/f-mobile-menu.png' });
// mobile contact form
await m.goto(B+'/contact', { waitUntil:'networkidle' });
await m.waitForTimeout(2000);
await m.evaluate(()=>window.scrollTo(0,500)); await m.waitForTimeout(800);
await m.screenshot({ path:'/tmp/shots/f-mobile-contact.png' });
// reduced motion check
const rctx = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
const r = await rctx.newPage();
await r.goto(B+'/', { waitUntil:'networkidle' });
await r.waitForTimeout(1200);
const visible = await r.evaluate(()=>{
  const el = document.querySelector('footer');
  const r2 = el.getBoundingClientRect();
  const els = [...document.querySelectorAll('[data-reveal]')];
  const hidden = els.filter(e => getComputedStyle(e).opacity === '0').length;
  return { revealElements: els.length, hiddenWithReducedMotion: hidden };
});
console.log('reduced motion:', JSON.stringify(visible));
// keyboard: services dropdown
const k = await dctx.newPage();
await k.goto(B+'/', { waitUntil:'networkidle' }); await k.waitForTimeout(1200);
await k.focus('button[aria-controls="services-menu"]');
await k.keyboard.press('Enter');
await k.waitForTimeout(400);
console.log('dropdown expanded:', await k.getAttribute('button[aria-controls="services-menu"]','aria-expanded'));
await k.keyboard.press('Escape');
await k.waitForTimeout(300);
console.log('after escape:', await k.getAttribute('button[aria-controls="services-menu"]','aria-expanded'));
// accordion keyboard
await k.goto(B+'/contact', { waitUntil:'networkidle' }); await k.waitForTimeout(1200);
const firstTrigger = k.locator('[id^="trigger-"]').first();
await firstTrigger.focus(); await k.keyboard.press('Enter');
await k.waitForTimeout(300);
console.log('accordion expanded:', await firstTrigger.getAttribute('aria-expanded'));
await browser.close();
