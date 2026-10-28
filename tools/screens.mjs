import { chromium } from 'playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
// desktop screen capture, exactly viewport-sized, no browser chrome
const d = await (await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 })).newPage();
await d.goto(B+'/', { waitUntil:'domcontentloaded' });
await d.waitForTimeout(3000);
await d.screenshot({ path:'/tmp/shots/screen-desktop.png' });
// a second one scrolled to the services section (for the phone/second device)
await d.goto(B+'/services/shopify-development', { waitUntil:'domcontentloaded' });
await d.waitForTimeout(2500);
await d.screenshot({ path:'/tmp/shots/screen-service.png' });
// mobile screen capture
const m = await (await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true })).newPage();
await m.goto(B+'/', { waitUntil:'domcontentloaded' });
await m.waitForTimeout(3000);
await m.screenshot({ path:'/tmp/shots/screen-mobile.png' });
console.log('captured');
await browser.close();
