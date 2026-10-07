const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-caie-maths-browser-'));
const port=process.env.TEST_CAIE_MATHS_PORT||'5107';
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
  await page.evaluate(()=>location.hash='#study');
  await page.waitForSelector('#study:not([hidden])');
}

(async()=>{
 for(let i=0;i<100;i++){try{if((await fetch(url+'/api/health')).ok)break}catch{} await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#chapter-list'); await page.waitForTimeout(800); await dismiss(page);

 await page.selectOption('#board-filter','Cambridge International AS & A Level');
 await page.selectOption('#grade-filter','AS Level (11)');
 await page.selectOption('#subject-filter','Mathematics');
 await page.waitForTimeout(250);

 check(!(await page.locator('#math-component-wrap').evaluate(el=>el.classList.contains('hidden'))),'AS Maths route selector is shown');
 check((await page.locator('#chapter-count').textContent())==='24','All AS components expose exactly 24 topics');

 const status=await page.evaluate(()=>window.STUDYAI_CAIE_AS_MATHEMATICS_DEEP_NOTES_STATUS);
 check(status?.matched===24&&status?.unmatched?.length===0,'all 24 Maths deep notes attach at runtime');
 check(status?.componentCounts?.['Paper 1']===8&&status?.componentCounts?.['Paper 2']===6&&status?.componentCounts?.['Paper 4']===5&&status?.componentCounts?.['Paper 5']===5,'component counts match official route structure');

 await page.selectOption('#math-component-filter','Paper 1 + Paper 2 (Pure Mathematics)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='14','P1 + P2 route shows 14 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Pure Mathematics 2: Numerical Solution of Equations'}).count()===1,'P2 numerical methods appears in pure route');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Momentum'}).count()===0,'Mechanics excluded from pure route');

 await page.selectOption('#math-component-filter','Paper 1 + Paper 4 (Mechanics)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='13','P1 + P4 route shows 13 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Newton’s Laws of Motion'}).count()===1,'Newton laws topic appears in Mechanics route');
 check(await page.locator('.chapter-item').filter({hasText:'Mechanics: Energy, Work and Power'}).count()===1,'Energy/work/power topic appears in Mechanics route');

 await page.selectOption('#math-component-filter','Paper 1 + Paper 5 (Statistics 1)');
 await page.waitForTimeout(100);
 check((await page.locator('#chapter-count').textContent())==='13','P1 + P5 route shows 13 topics');
 check(await page.locator('.chapter-item').filter({hasText:'Statistics: Normal Distribution'}).count()===1,'Normal distribution appears in Statistics route');
 check(await page.locator('.chapter-item').filter({hasText:'Pure Mathematics 2: Algebra'}).count()===0,'P2 topics excluded from Statistics route');

 await page.locator('.chapter-item').filter({hasText:'Statistics: Normal Distribution'}).click();
 const text=await page.locator('#detailed-notes').textContent();
 check(text.includes('Continuity correction'),'normal note renders syllabus-specific continuity correction');
 check(text.includes('Practice plan'),'Maths note renders practice plan');
 check(text.includes('exam-mate'),'full-paper practice guidance renders');

 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CAIE AS MATHEMATICS BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close(); server.kill(); rmSync(dir,{recursive:true,force:true});
});
