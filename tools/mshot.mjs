import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true })).newPage();
for (const [r,name,y] of [['/','home',400],['/','projects',7850],['/work','work',1400],['/services','services',900]]) {
  await p.goto('http://127.0.0.1:3000'+r, { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2200);
  await p.evaluate(async(y)=>{ for(let i=0;i<y;i+=500){window.scrollTo(0,i); await new Promise(r=>setTimeout(r,50));} window.scrollTo(0,y); }, y);
  await p.waitForTimeout(1500);
  await p.screenshot({ path:`/tmp/shots/mob-${name}.png` });
}
await b.close();
