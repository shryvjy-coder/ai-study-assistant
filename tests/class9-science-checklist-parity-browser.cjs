/* Full browser regression: Class 9 Science reuses Maths lesson pages, checklists,
 * completion rings and persisted progress. Original curriculum and notes untouched. */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-science-checklist-'));
const port=process.env.TEST_SCIENCE_CHECKLIST_PORT||'5170';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'class9-science-checklist-ci',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(dir,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',x=>{stderr=(stderr+String(x)).slice(-14000)});
const check=(ok,msg)=>{assert.ok(ok,msg);console.log('PASS',msg)};
(async()=>{
 let ready=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,120));
 }
 check(ready,'local StudyAI server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.addLocatorHandler(page.locator('#studyai-onboarding[open]'),async()=>{
   await page.evaluate(()=>{const dialog=document.querySelector('#studyai-onboarding');if(dialog?.open)dialog.close()});
 });
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.StudyAILessonReader&&
  !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.CBSE_CLASS9_MATH_FULL_NOTES);
 const inventory=await page.evaluate(()=>{
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const chapters=science.map(e=>{
   const bank=CBSE_CLASS9_SCIENCE_FULL_NOTES[e.title];
   const groups=StudyAIProgress.outline(e.id);
   const summary=StudyAIProgress.summary(e.id);
   const sectionCount=bank?.sections?.length||0;
   const worked=bank?.sections?.reduce((n,s)=>n+(s.examples||[]).length,0)||0;
   return {title:e.title,id:e.id,hasBank:!!bank,sections:sectionCount,
    groups:groups.length,leaves:summary?.total,
    counted:groups.reduce((n,g)=>n+g.leaves.length,0),
    core:groups.every(g=>g.leaves.some(l=>l.kind==='core')),
    examples:groups.flatMap(g=>g.leaves).filter(l=>l.kind==='example').length,
    worked};
  });
  return {chapters,math:StudyAIProgress.courseTotals(),
    science:StudyAIProgress.courseTotals('Science'),initialCompleted:[...state.completed]};
 });
 check(inventory.chapters.length===13&&inventory.chapters.every(e=>
  e.hasBank&&e.id&&e.sections>=2&&e.groups===e.sections&&e.leaves===e.counted&&
  e.leaves>=e.sections&&e.examples===e.worked&&e.core),
  'all thirteen Science chapters expose real lesson headings and authored worked-example subtopics');
 check(inventory.science.chapters===13&&inventory.science.subtopics===
   inventory.chapters.reduce((n,e)=>n+e.leaves,0),
   'Science course progress totals include every selectable genuine topic');
 check(inventory.math.chapters===14&&inventory.math.subtopics>30,
   'original fourteen Maths chapters and default Maths totals stay intact');
 const selected=await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&
    x.title==='Earth as a System: Energy, Matter, and Life');
  current={board:e.board,grade:e.grade,subject:e.subject,
    topic:e.title,topicId:e.id,component:'All components'};
  renderFilters();openTopic(e.title,e.id);
  return {id:e.id,expected:StudyAIProgress.summary(e.id).total,
   groups:StudyAIProgress.outline(e.id).length,originalState:[...state.completed]};
 });
 check(await page.locator('#study.studyai-progress-active').count()===1,
  'Science gets exactly the same progress-aware layout as Maths');
 check(await page.locator('#study .studyai-notes-nav .studyai-lesson-rail').count()===1 &&
  await page.locator('#study .studyai-notes-nav .chapter-rail').count()===1,
  'chapter and subtopic columns appear in the existing Contents dock');
 check(await page.locator('#study #chapter-list .studyai-progress-ring').count()===13,
  'all 13 Science chapter cards have live completion rings');
 check(await page.locator('.studyai-lesson-rail .studyai-lesson-row').count()===15 &&
  await page.locator('.studyai-lesson-rail .studyai-sublesson-row').count()===selected.expected,
  'Chapter 13 displays its 15 lessons and all authored checkable subtopic pages');
 check(await page.locator('#detailed-notes.studyai-compact-chapter').count()===1 &&
  await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1,
  'long Chapter 13 notes display one complete lesson per page, not infinite scrolling');
 check(await page.locator('#detailed-notes .science-ch13-figure').count()===15 &&
  await page.locator('#detailed-notes .science-ch13-question').count()===72,
  'original fifteen Science diagrams and 72 practice controls remain in the DOM');
 check(await page.locator('#study #complete-btn').isHidden(),
  'old single chapter-complete button replaced by per-subtopic tracking');
 const firstGroup=await page.evaluate(id=>StudyAIProgress.outline(id)[0],selected.id);
 check(firstGroup.leaves.length>2&&firstGroup.leaves.some(x=>x.kind==='example'),
  'first Science lesson contains an independent concept page and worked-example pages');
 check((await page.locator('#study .studyai-rail-count').innerText()).includes('0 of '+selected.expected),
  'new Science chapter starts with zero selected subtopics');
 const leaf=firstGroup.leaves.find(x=>x.kind==='example');
 await page.evaluate(key=>StudyAILessonReader.goToLeaf(key),leaf.key);
 check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) > .worked-box:not([hidden])').count()===1 &&
  await page.locator('#detailed-notes .actual-note-topic:not([hidden]) > p:not([hidden])').count()===0,
  'opening a worked-example subtopic displays only the focused solution, not other lessons');
 check(await page.locator('.studyai-sublesson-row.is-active').count()===1,
  'navigation highlights the selected example page');
 const before=await page.evaluate(id=>StudyAIProgress.summary(id),selected.id);
 check(before.done===0,'opening a subtopic never falsely completes it');
 await page.evaluate(key=>{
  const row=[...document.querySelectorAll('.studyai-sublesson-row')].find(r=>r.dataset.leafKey===key);
  row.querySelector('.studyai-sublesson-toggle').click();
 },leaf.key);
 const after=await page.evaluate(id=>({
  summary:StudyAIProgress.summary(id),
  keys:StudyAIProgress.completedKeys(id),
  record:state.studyaiLessonProgress?.[id]
 }),selected.id);
 check(after.summary.done===1&&after.keys.includes(leaf.key)&&after.record.includes(leaf.key),
  'individual Science checkbox saves an exact stable subtopic key');
 check(await page.locator('#study .studyai-progress-ring').first().count()===1 &&
  (await page.locator('#study .studyai-rail-count').innerText()).includes('1 of '+selected.expected),
  'chapter ring and lesson progress bar update immediately');
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.CBSE_CLASS9_SCIENCE_FULL_NOTES);
 const saved=await page.evaluate(id=>StudyAIProgress.completedKeys(id),selected.id);
 check(saved.includes(leaf.key),'science subtopic completion persists after reload');
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(e=>e.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,
    topic:e.title,topicId:e.id,component:'All components'};
  renderFilters();openTopic(e.title,e.id);
 },selected.id);
 const toggled=await page.evaluate(key=>{
  const row=[...document.querySelectorAll('.studyai-sublesson-row')].find(r=>r.dataset.leafKey===key);
  const input=row.querySelector('.studyai-sublesson-toggle');
  const before=input.getAttribute('aria-checked');
  input.click();
  return {before,after:input.getAttribute('aria-checked')};
 },leaf.key);
 check(toggled.before==='true'&&toggled.after==='false'&&
  (await page.evaluate(id=>StudyAIProgress.summary(id).done,selected.id))===0,
  'student can uncheck saved Science progress after a page reload');
 await page.evaluate(()=>{
  const first=document.querySelector('.studyai-outline-group .studyai-lesson-toggle');
  first.click();
 });
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,selected.id))===firstGroup.leaves.length,
  'parent lesson checkbox completes exactly its child subtopics');
 const inline=page.locator('#detailed-notes .actual-note-topic:not([hidden]) > .studyai-inline-completion .studyai-inline-complete');
 check(await inline.count()>=1,'Science lesson has inline progress action in the reading pane');
 const originalMath=await page.evaluate(()=>{
  const e=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='The World of Numbers');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
  return {count:StudyAIProgress.summary(e.id).total,reader:StudyAILessonReader.currentEntryId(),id:e.id};
 });
 check(originalMath.count>30&&originalMath.reader===originalMath.id&&
  await page.locator('#study.studyai-progress-active').count()===1,
  'switching back to Maths preserves the same focused lesson/checklist experience');
 const other=await page.evaluate(()=>{
  const e=STUDY_DATA.find(e=>e.board==='Cambridge IGCSE'&&e.subject==='Mathematics');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
  return e.id;
 });
 check(!!other&&await page.locator('#study.studyai-progress-active').count()===0 &&
  await page.locator('#study .studyai-lesson-rail').count()===0,
  'other curricula retain their independent unmodified reader layout');
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(e=>e.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 },selected.id);
 const mobile=await page.evaluate(()=>{
  const nav=document.querySelector('.studyai-notes-nav');
  const prose=document.querySelector('#detailed-notes .note-prose');
  return {nav:nav?.getBoundingClientRect().width,prose:prose?.getBoundingClientRect().width};
 });
 check(mobile.nav>0&&mobile.nav<=391&&mobile.prose>0&&mobile.prose<=391,
  'Science contents and full notes fit a 390px phone screen');
 check(errors.length===0,'no uncaught Javascript error while navigating Science/Maths: '+errors.join('; '));
 console.log('CLASS 9 SCIENCE MATHS-PARITY SUBTOPIC CHECKLIST BROWSER PASS');
})().catch(e=>{console.error(e);console.error(stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
