import { chromium } from 'playwright';
const B='http://127.0.0.1:3000';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const d = await ctx.newPage();
for (const slug of ['social-media-management','shopify-development','wordpress-development']) {
  await d.goto(`${B}/services/${slug}`, { waitUntil:'domcontentloaded' });
  await d.waitForTimeout(2600);
  await d.screenshot({ path:`/tmp/shots/screen-${slug}.png` });
  console.log('shot', slug);
}
// work index + a project page + blog index, for gallery screens
for (const [path,name] of [['/work','screen-work'],['/blog','screen-blog'],['/contact','screen-contact']]) {
  await d.goto(B+path, { waitUntil:'domcontentloaded' }); await d.waitForTimeout(2200);
  await d.screenshot({ path:`/tmp/shots/${name}.png` });
}
console.log('done');
await browser.close();
