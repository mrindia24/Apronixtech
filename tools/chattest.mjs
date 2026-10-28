import { chromium } from 'playwright';
const b = await chromium.launch();

// ---------- desktop ----------
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
const errs = [];
p.on('console', m => { if (m.type()==='error') errs.push(m.text().slice(0,120)); });
await p.goto('http://127.0.0.1:3000/', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(2000);

const fab = p.locator('button[aria-controls="apronix-chat-panel"]');
console.log('launcher present:', await fab.count());
console.log('panel hidden initially:', !(await p.locator('#apronix-chat-panel').isVisible()));

await fab.click();
await p.waitForTimeout(500);
console.log('panel visible after click:', await p.locator('#apronix-chat-panel').isVisible());
console.log('focus moved to input:', await p.evaluate(() => document.activeElement?.id));

// ask via a suggestion chip
await p.getByRole('button', { name: 'What services do you offer?' }).first().click();
await p.waitForTimeout(1200);
let bubbles = await p.locator('#apronix-chat-panel [role=log] > div').count();
console.log('messages after chip click:', bubbles);

// type a question
await p.fill('#chat-input', 'How much does it cost?');
await p.press('#chat-input', 'Enter');
await p.waitForTimeout(1400);
const txt = await p.locator('#apronix-chat-panel [role=log]').textContent();
console.log('pricing answer contains scoping:', txt.includes('scoping'));
await p.screenshot({ path:'/tmp/shots/chat-desktop.png' });

// escape closes + focus returns to launcher
await p.keyboard.press('Escape');
await p.waitForTimeout(400);
console.log('panel closed by Escape:', !(await p.locator('#apronix-chat-panel').isVisible()));
console.log('focus restored to launcher:', await p.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'apronix-chat-panel'));
console.log('console errors:', errs.length ? errs : 'none');

// ---------- mobile ----------
const mp = await (await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2 })).newPage();
await mp.goto('http://127.0.0.1:3000/services', { waitUntil:'domcontentloaded' });
await mp.waitForTimeout(1800);
await mp.locator('button[aria-controls="apronix-chat-panel"]').tap();
await mp.waitForTimeout(600);
const box = await mp.locator('#apronix-chat-panel').boundingBox();
console.log('mobile panel box:', box && `w=${Math.round(box.width)} h=${Math.round(box.height)} x=${Math.round(box.x)}`);
const ov = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('mobile horizontal overflow with chat open:', ov);
await mp.getByRole('button', { name: 'Show me your work' }).first().tap();
await mp.waitForTimeout(1200);
await mp.screenshot({ path:'/tmp/shots/chat-mobile.png' });
await b.close();
