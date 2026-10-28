import { chromium } from 'playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const shots = [['/','home'],['/services/shopify-development','service'],['/about','about'],['/work','work'],['/blog','blog']];
for (const [path,name] of shots) {
  await p.goto(B+path, { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(2600);
  await p.screenshot({ path:`/tmp/shots/final-${name}.png`, fullPage:false });
}
// mobile hero
const m = await (await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, deviceScaleFactor:2 })).newPage();
await m.goto(B+'/', { waitUntil:'domcontentloaded' }); await m.waitForTimeout(2600);
await m.screenshot({ path:'/tmp/shots/final-mobile.png' });
console.log('ok');
await browser.close();
