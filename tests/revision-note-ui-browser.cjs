const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-revision-note-ui-'));
const port=process.env.TEST_NOTE_UI_PORT||'5111';
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
 const page=await browser.newPage({viewport:{width:1440,height:950},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));

 await page.goto(url,{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#chapter-list');await page.waitForTimeout(800);await dismiss(page);
 await page.selectOption('#board-filter','Cambridge International AS & A Level');
 await page.selectOption('#grade-filter','A Level (12)');
 await page.selectOption('#subject-filter','Physics');
 await page.waitForTimeout(200);
 await page.locator('.chapter-item').filter({hasText:'Motion in a Circle'}).click();

 check(await page.locator('#note-alignment-chip').textContent()==='Syllabus-aligned','verified note shows syllabus-aligned badge');
 check(/\d+ min read/.test(await page.locator('#note-reading-time').textContent()),'reading-time estimate is shown');
 check(await page.locator('#note-section-nav').count()===1,'section navigation exists');
 check(await page.locator('#note-section-nav button').count()>=6,'section navigation exposes granular revision sections');
 check(await page.locator('.note-concept-grid .concept-card').count()>=6,'key concepts render as bite-sized subtopic cards');
 check(await page.locator('.formula-bank .formula-card').count()>=4,'formula bank is rendered separately');
 check(await page.locator('.exam-box').count()>=1,'examiner-focus callout renders');
 check(await page.locator('.mistake-box').count()>=1,'common-mistake callout renders');
 check(await page.locator('.revision-checklist li').count()>=5,'syllabus/revision checklist renders');
 check(await page.locator('.self-check-box li').count()>=5,'active-recall self-check renders');
 check((await page.locator('#chapter-quiz').textContent())==='Practice this topic','practice CTA is clearer');
 check((await page.locator('#make-flashcards').textContent())==='Recall with flashcards','recall CTA is clearer');

 const navLabels=await page.locator('#note-section-nav button').allTextContents();
 check(navLabels.includes('Concepts')&&navLabels.includes('Formula bank')&&navLabels.includes('Exam focus'),'jump navigation names major revision blocks');

 await page.locator('.article-tabs button[data-tab="quick"]').click();
 check(await page.locator('#note-section-nav').evaluate(el=>el.classList.contains('hidden')),'section nav hides outside revision-notes tab');
 await page.locator('.article-tabs button[data-tab="notes"]').click();
 check(!(await page.locator('#note-section-nav').evaluate(el=>el.classList.contains('hidden'))),'section nav returns for revision-notes tab');

 const before=await page.locator('#note-reading-progress').getAttribute('style');
 await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
 await page.waitForTimeout(120);
 const after=await page.locator('#note-reading-progress').getAttribute('style');
 check(before!==after,'reading progress updates as the page is read');

 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('REVISION NOTE UI BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();server.kill();rmSync(dir,{recursive:true,force:true});
});
