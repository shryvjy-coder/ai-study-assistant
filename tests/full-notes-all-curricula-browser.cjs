const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-full-notes-audit-'));
const port=process.env.TEST_FULL_NOTES_PORT||'5112';
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
 await page.waitForSelector('#chapter-list');
 await page.waitForTimeout(1100);
 await dismiss(page);

 const audit=await page.evaluate(()=>{
  const active=(window.STUDYAI_CURRICULUM||[]).filter(e=>!e.curriculumHidden);
  const failures=[];
  const groupMap=new Map();
  let formulaTopics=0;
  for(const e of active){
   const sourceDetails=Array.isArray(e.deepNotes?.concepts)&&e.deepNotes.concepts.length?e.deepNotes.concepts:(Array.isArray(e.keyPoints)?e.keyPoints:[]);
   const formulas=Array.isArray(e.deepNotes?.formulas)&&e.deepNotes.formulas.length?e.deepNotes.formulas:(Array.isArray(e.formulas)?e.formulas:[]);
   const host=document.createElement('div');
   host.innerHTML=window.deepSections(e);
   const detailCount=host.querySelectorAll('.detailed-note-block').length;
   const detailText=(host.querySelector('.full-notes-section')?.textContent||'').trim();
   const formulaCount=host.querySelectorAll('.formula-sheet .formula-row').length;
   if(sourceDetails.length<3||detailCount<3||detailText.length<120){
    failures.push({id:e.id,board:e.board,grade:e.grade,subject:e.subject,title:e.title,sourceDetails:sourceDetails.length,detailCount,detailText:detailText.length});
   }
   if(formulas.length){
    formulaTopics++;
    if(formulaCount!==formulas.length)failures.push({id:e.id,title:e.title,formulaExpected:formulas.length,formulaRendered:formulaCount});
   }
   const key=e.board+'|'+e.grade;
   if(!groupMap.has(key))groupMap.set(key,{board:e.board,grade:e.grade,subjects:new Set(),topics:0});
   const g=groupMap.get(key);g.subjects.add(e.subject);g.topics++;
  }
  return {
   active:active.length,
   formulaTopics,
   failures,
   groups:[...groupMap.values()].map(g=>({board:g.board,grade:g.grade,subjects:[...g.subjects].sort(),topics:g.topics}))
  };
 });

 check(audit.active>0,'runtime curriculum contains active topics');
 check(audit.failures.length===0,'every active topic renders at least three detailed-note blocks and complete formula rows; failures: '+JSON.stringify(audit.failures.slice(0,12)));
 check(audit.formulaTopics>0,'formula audit covers quantitative topics');

 for(const group of audit.groups){
  await page.selectOption('#board-filter',group.board);
  await page.selectOption('#grade-filter',group.grade);
  await page.waitForTimeout(90);
  const subject=group.subjects[0];
  await page.selectOption('#subject-filter',subject);
  await page.waitForTimeout(100);
  const first=page.locator('.chapter-item').first();
  check(await first.count()===1,group.board+' / '+group.grade+' / '+subject+' exposes at least one topic');
  await first.click();
  check(await page.locator('#detailed-notes .full-notes-section').count()===1,group.board+' / '+group.grade+' opens a full detailed-notes section');
  check(await page.locator('#detailed-notes .detailed-note-block').count()>=3,group.board+' / '+group.grade+' renders multiple detailed explanations');
 }

 check(errors.length===0,'no browser JavaScript errors during all-curriculum note audit: '+errors.join('; '));
 console.log('FULL NOTES AUDIT OK',audit.active,'topics across',audit.groups.length,'curriculum/stage groups');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();server.kill();rmSync(dir,{recursive:true,force:true});
});
