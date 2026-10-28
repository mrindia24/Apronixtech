import { chromium } from 'playwright';
const b = await chromium.launch();

// 1. reduced motion: no entrance, no hop, no bubble
{
  const p = await (await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' })).newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2500);
  const cls = await p.locator('button[aria-controls="apronix-chat-panel"]').getAttribute('class');
  const bubble = await p.locator('text=hii').first().isVisible().catch(()=>false);
  console.log('reduced-motion: hop=', cls?.includes('mascot-hop'), 'bubble=', bubble, 'visible=', cls?.includes('mascot-arrive'));
}

// 2. greeting only once per session
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900} });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2600);
  const first = await p.locator('text=hii').first().isVisible().catch(()=>false);
  await p.goto('http://127.0.0.1:3000/services', { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2600);
  const second = await p.locator('text=hii').first().isVisible().catch(()=>false);
  console.log('greeting: first page =', first, '| second page =', second, '(should be true/false)');
  await ctx.close();
}

// 3. mobile: mascot + back-to-top do not collide
{
  const p = await (await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true })).newPage();
  await p.goto('http://127.0.0.1:3000/', { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2000);
  await p.evaluate(() => window.scrollTo(0, 2000));
  await p.waitForTimeout(900);
  const boxes = await p.evaluate(() => {
    const fab = document.querySelector('button[aria-controls="apronix-chat-panel"]').getBoundingClientRect();
    const top = document.querySelector('button[aria-label="Back to top"]').getBoundingClientRect();
    const overlap = !(fab.top > top.bottom || fab.bottom < top.top || fab.left > top.right || fab.right < top.left);
    return { fab:{t:Math.round(fab.top),b:Math.round(fab.bottom),l:Math.round(fab.left)}, top:{t:Math.round(top.top),b:Math.round(top.bottom),l:Math.round(top.left)}, overlap };
  });
  console.log('mobile stacking:', JSON.stringify(boxes));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log('mobile horizontal overflow:', ov);
  await p.screenshot({ path:'/tmp/shots/mascot-mobile.png' });
  await p.locator('button[aria-controls="apronix-chat-panel"]').tap();
  await p.waitForTimeout(700);
  console.log('mobile panel opens:', await p.locator('#apronix-chat-panel').isVisible());
}
await b.close();
