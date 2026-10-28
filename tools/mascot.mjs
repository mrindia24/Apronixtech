import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto('http://127.0.0.1:3000/', { waitUntil:'domcontentloaded' });

const launcher = p.locator('button[aria-controls="apronix-chat-panel"]');
// frames of the entrance / greeting / hop
for (const [ms, name] of [[250,'01-before'],[900,'02-arrive'],[1600,'03-hii'],[2150,'04-jump'],[2400,'05-air'],[2600,'06-land']]) {
  await p.waitForTimeout(ms === 250 ? 250 : 350);
  const box = await launcher.boundingBox().catch(()=>null);
  const bubble = await p.locator('text=hii').first().isVisible().catch(()=>false);
  const cls = await launcher.getAttribute('class').catch(()=>'');
  console.log(`${name.padEnd(10)} y=${box?Math.round(box.y):'-'} bubbleVisible=${bubble} hop=${cls?.includes('mascot-hop')} located=${cls?.includes('mascot-arrive')}`);
  await p.screenshot({ path:`/tmp/shots/mascot-${name}.png`, clip:{x:1150,y:620,width:290,height:280} });
}
await p.waitForTimeout(4500);
const bubbleGone = !(await p.locator('text=hii').first().isVisible().catch(()=>false));
console.log('bubble retires after greeting:', bubbleGone);
// mascot opens the panel
await launcher.click();
await p.waitForTimeout(700);
console.log('panel opens from mascot:', await p.locator('#apronix-chat-panel').isVisible());
await p.screenshot({ path:'/tmp/shots/mascot-open.png' });
await b.close();
