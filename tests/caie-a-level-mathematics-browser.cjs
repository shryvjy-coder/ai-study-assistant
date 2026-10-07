const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-caie-a2-maths-browser-'));
const port=process.env.TEST_CAIE_A2_MATHS_PORT||'5110';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,FLASK_DEBUG:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),COOKIE_SECURE:'0'},
 stdio:['ignore','ignore','pipe']
});
let browser,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check=(v,m)=>{assert.ok(v,m);console.log('PASS',m)};

async function dismiss(page){
 if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();
 await page.waitForSelector('#help-guided-tour:not(.hidden)',{timeout:3000}).catch(()=>{});
 if(await page.locator('#help-guided-tour:not(.hidden)').count()){
  await page.locator('[data-tour-skip]').click();
  await page.locator('[data-tour-skip-confirm]').click();
  await page.waitForFunction(()=>document.querySelector('#help-guided-tour')?.classList.contains('hidden'));
 }
}

(async()=>{
 for(let i=0;i<100;i++){try{if((await fetch(url+'/api/health')).ok)break}catch{} await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#chapter-list');await page.waitForTimeout(800);await dismiss(page);

 await page.selectOption('#board-filter','Cambridge International AS & A Level');
 await page.selectOption('#grade-filter','A Level (12)');
 await page.selectOption('#subject-filter','Mathematics');
 await page.waitForTimeout(250);

 check(!(await page.locator('#math-component-wrap').evaluate(el=>el.classList.contains('hidden'))),'A Level Maths route selector is shown');
 check((await page.locator('#math-component-label').textContent())==='A Level Maths route','route label switches to A Level');
 check((await page.locator('#chapter-count').textContent())==='24','all Year 2 options show P3 + P4 + P5 + P6 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Motion in a Circle'}).count()===0,'obsolete circular-motion mechanics topic hidden');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Equilibrium of a Rigid Body'}).count()===0,'obsolete rigid-body mechanics topic hidden');

 const status=await page.evaluate(()=>window.STUDYAI_CAIE_A_LEVEL_MATHEMATICS_DEEP_NOTES_STATUS);
 check(status?.matched===14&&status?.hiddenLegacyTopics?.length===2,'14 A2-native notes attach and two obsolete records stay hidden');

 await page.selectOption('#math-component-filter','Year 2: Paper 3 + Paper 5 (after AS Mechanics)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='14','P3 + P5 staged route shows 14 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Statistics: Normal Distribution'}).count()===1,'P5 topic reused in Class 12 route');
 check(await page.locator('.chapter-item').filter({hasText:'Statistics: Poisson Distribution'}).count()===0,'P6 excluded from P3 + P5 route');

 await page.locator('.chapter-item').filter({hasText:'Statistics: Normal Distribution'}).click();
 let text=await page.locator('#detailed-notes').textContent();
 check(text.includes('Continuity correction'),'reused P5 note opens correctly from A Level route');

 await page.selectOption('#math-component-filter','Year 2: Paper 3 + Paper 4 (after AS Statistics 1)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='14','P3 + P4 staged route shows 14 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Energy, Work and Power'}).count()===1,'P4 topic reused in Class 12 route');
 check(await page.locator('.chapter-item').filter({hasText:'Statistics: Normal Distribution'}).count()===0,'P5 excluded from P3 + P4 Year 2 route');

 await page.locator('.chapter-item').filter({hasText:'Mechanics: Energy, Work and Power'}).click();
 text=await page.locator('#detailed-notes').textContent();
 check(text.includes('Instantaneous power'),'reused P4 deep note opens correctly from A Level route');

 await page.selectOption('#math-component-filter','Year 2: Paper 3 + Paper 6 (after AS Statistics 1)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='14','P3 + P6 staged route shows 14 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Statistics: Hypothesis Tests'}).count()===1,'P6 topic appears');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Momentum'}).count()===0,'P4 excluded from P3 + P6 route');

 await page.locator('.chapter-item').filter({hasText:'Complex Numbers'}).click();
 text=await page.locator('#detailed-notes').textContent();
 check(text.includes('Argand diagram')&&text.includes('Loci'),'P3 complex-number deep note renders');

 await page.locator('.chapter-item').filter({hasText:'Statistics: Hypothesis Tests'}).click();
 text=await page.locator('#detailed-notes').textContent();
 check(text.includes('Type I error')&&text.includes('Type II error'),'P6 hypothesis-test deep note renders');

 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CAIE A LEVEL MATHEMATICS BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();server.kill();rmSync(dir,{recursive:true,force:true});
});
