const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-content-notes-'));
const port=process.env.TEST_CONTENT_NOTES_PORT||'5113';
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
 const page=await browser.newPage({viewport:{width:1440,height:950},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#chapter-list');
 await page.waitForTimeout(900);
 await dismiss(page);

 const groups=[
  ['CBSE','Class 9'],
  ['CBSE','Class 10'],
  ['CBSE','Class 11'],
  ['CBSE','Class 12'],
  ['Cambridge IGCSE','IGCSE 9–10'],
  ['Cambridge International AS & A Level','AS Level (11)'],
  ['Cambridge International AS & A Level','A Level (12)']
 ];

 for(const [board,grade] of groups){
  await page.selectOption('#board-filter',board);
  await page.selectOption('#grade-filter',grade);
  await page.waitForTimeout(80);
  const subjects=await page.locator('#subject-filter option').allTextContents();
  check(subjects.length>0,board+' / '+grade+' has subjects');
  await page.selectOption('#subject-filter',{label:subjects[0]});
  await page.waitForTimeout(120);
  const first=page.locator('.chapter-item').first();
  check(await first.count()===1,board+' / '+grade+' has chapters');
  await first.click();
  const notes=page.locator('#detailed-notes');
  check(await notes.isVisible(),board+' / '+grade+' detailed notes area is visible');
  const text=(await notes.textContent()||'').trim();
  check(text.length>1800,board+' / '+grade+' shows long-form actual note text ('+text.length+' chars)');
  check(await notes.locator('.note-section').count()>=7,board+' / '+grade+' shows a full multi-section note page');
  const box=await notes.boundingBox();
  check(!!box&&box.height>650,board+' / '+grade+' notes occupy long-form page height');
 }

 // Regression: a saved deep-note topic can auto-open before deferred note overlays attach.
 // Once the overlay attaches, the visible reader must refresh from fallback content to verified deep notes.
 await page.selectOption('#board-filter','CBSE');
 await page.selectOption('#grade-filter','Class 12');
 await page.selectOption('#subject-filter','Physics');
 await page.waitForTimeout(120);
 const savedTopic=page.locator('.chapter-item').filter({hasText:'Electric Charges and Fields'}).first();
 check(await savedTopic.count()===1,'Class 12 Physics saved-topic regression chapter exists');
 const savedId=await savedTopic.getAttribute('data-id');
 await page.evaluate(id=>{
  const key='studyai-multicurriculum-v1';
  const state=JSON.parse(localStorage.getItem(key)||'{}');
  state.lastTopic=id;
  localStorage.setItem(key,JSON.stringify(state));
 },savedId);
 await page.reload({waitUntil:'load'});
 await page.waitForSelector('#reader-view:not(.hidden)');
 const restoredNotes=page.locator('#detailed-notes');
 check(await restoredNotes.locator('.content-first-long-notes').count()===1,'saved chapter refreshes to long-form content-first notes after deferred overlays attach');
 check((await restoredNotes.textContent()||'').trim().length>1800,'saved chapter contains substantial refreshed long-form content');

 // Regression: opening a chapter must always reveal Full notes, even if another reader tab was active.
 await page.locator('.article-tabs button[data-tab="quick"]').click();
 check(await page.locator('#tab-notes').isHidden(),'quick-review tab hides Full notes before chapter change');
 const nextPhysics=page.locator('.chapter-item').nth(1);
 await nextPhysics.click();
 check(await page.locator('#tab-notes').isVisible(),'opening a chapter forces Full notes visible');
 check(await page.locator('.article-tabs button[data-tab="notes"]').evaluate(el=>el.classList.contains('active')),'Full notes tab becomes active on chapter open');

 // Quantitative formula rendering: individual formula lines, no redesign formula cards/badges.
 await page.selectOption('#board-filter','Cambridge International AS & A Level');
 await page.selectOption('#grade-filter','A Level (12)');
 await page.selectOption('#subject-filter','Physics');
 await page.waitForTimeout(100);
 await page.locator('.chapter-item').filter({hasText:'Motion in a Circle'}).click();
 const physicsNotes=page.locator('#detailed-notes');
 check((await physicsNotes.textContent()).includes('centripetal'),'A Level Physics note contains real syllabus explanation');
 const formulaLines=physicsNotes.locator('.formula');
 check(await formulaLines.count()>=1,'formulas render as individual formula lines');
 check(await page.locator('.note-study-bar').count()===0,'SaveMyExams-inspired study bar is removed');
 check(await page.locator('.note-section-nav').count()===0,'SaveMyExams-inspired sticky section navigation is removed');
 check(await page.locator('.note-chip').count()===0,'SaveMyExams-inspired note badges are removed');
 check(await page.locator('.formula-card').count()===0,'SaveMyExams-inspired formula cards are removed');

 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CONTENT FIRST NOTES OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();server.kill();rmSync(dir,{recursive:true,force:true});
});
