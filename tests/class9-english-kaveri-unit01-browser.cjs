/* StudyAI original 2026-27 Kaveri Unit 1 literature + checkable subtopic
 * browser regression. Checks actual reader DOM, persistence and Maths/Science.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-english-unit01-'));
const port=process.env.TEST_ENGLISH_UNIT01_PORT||'5171';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,SECRET_KEY:'english-unit-01-ci',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(temp,'studyai.sqlite')},stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',x=>{stderr=(stderr+String(x)).slice(-18000)});
const check=(c,m)=>{assert.ok(c,m);console.log('PASS',m)};
(async()=>{
 let ready=false;
 for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
 await new Promise(done=>setTimeout(done,120))}
 check(ready,'isolated reader is running');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1410,height:900},reducedMotion:'reduce'});
 const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
 await page.addLocatorHandler(page.locator('#studyai-onboarding[open]'),async()=>{
  await page.evaluate(()=>{const dialog=document.querySelector('#studyai-onboarding');if(dialog?.open)dialog.close()});
 });
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.StudyAILessonReader&&
  !!window.CBSE_CLASS9_ENGLISH_FULL_NOTES);
 const info=await page.evaluate(()=>{
  const units=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='English');
  const e=units.find(x=>x.title==='How I Taught My Grandmother to Read · Bharat Our Land');
  const bank=CBSE_CLASS9_ENGLISH_FULL_NOTES[e.title];
  const groups=StudyAIProgress.outline(e.id),sum=StudyAIProgress.summary(e.id);
  const all=groups.flatMap(g=>g.leaves);
  const math=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
  const science=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
  return {id:e.id,allEnglish:units.length,source:e.noteSourceFile,
   bankFile:bank.sourcePdf,headings:bank.sections.map(s=>s.title),
   groups:groups.length,leaves:all.length,core:all.filter(x=>x.kind==='core').length,
   subtopics:all.filter(x=>x.kind==='subtopic').length,
   worked:all.filter(x=>x.kind==='example').length,
   paragraphs:bank.sections.reduce((n,s)=>n+s.paragraphs.length+s.subtopics.reduce((a,p)=>a+p.paragraphs.length,0),0),
   answers:bank.sections.reduce((n,s)=>n+s.checkQuestions.length,0),
   total:sum.total,completed:sum.done,review:bank.reviewStatus,
   otherMath:StudyAIProgress.summary(math.id)?.total||0,
   otherScience:StudyAIProgress.summary(science.id)?.total||0,
   course:StudyAIProgress.courseTotals('English'),
   mathTotals:StudyAIProgress.courseTotals(),scienceTotals:StudyAIProgress.courseTotals('Science'),
   originalIds:units.map(x=>x.id)};
 });
 check(info.allEnglish===8&&new Set(info.originalIds).size===8&&info.source===info.bankFile&&
  info.bankFile==='iebe101.pdf','all eight original Kaveri units and their unchanged NCERT source identity remain');
 check(info.groups===17&&new Set(info.headings).size===17&&
  info.core===17&&info.subtopics===34&&info.worked===79&&
  info.total===130&&info.leaves===130&&info.paragraphs===141&&info.answers===74,
  'Unit 1 has 17 genuine lessons, 34 explanatory subtopics, 79 worked answers and 74 checks');
 check(info.review.includes('outstanding')&&info.course.chapters===1&&info.course.subtopics===130,
  'teacher review still disclosed; remaining seven units are not mislabelled as fully audited');
 check(info.mathTotals.chapters===14&&info.scienceTotals.chapters===13&&
  info.otherMath>30&&info.otherScience>40,
  'Maths and Science original progress outlines unaffected');
 await page.evaluate(id=>{
  const entry=STUDY_DATA.find(e=>e.id===id);
  current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:entry.title,topicId:entry.id};
  renderFilters();openTopic(entry.title,entry.id);
 },info.id);
 check(await page.locator('#study.studyai-progress-active').count()===1&&
  await page.locator('.studyai-lesson-rail .studyai-outline-group').count()===17&&
  await page.locator('.studyai-lesson-rail .studyai-sublesson-row').count()===130,
  'same 2-column contents checklist and 1-column notes layout as Maths/Science');
 check(await page.locator('#chapter-list .studyai-progress-ring').count()===1,
  'only textbook-upgraded English unit gets a completion ring');
 check(await page.locator('#detailed-notes .actual-note-topic').count()===17&&
  await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1&&
  await page.locator('#detailed-notes .studyai-topic-pagination').count()===1,
  'real English reader paginates lessons without discarding content');
 check(await page.locator('#detailed-notes .studyai-english-question details').count()===74&&
  await page.locator('#detailed-notes .studyai-english-worked').count()===79,
  'all model answers and seventy-four student-controlled practice disclosures retained');
 check(await page.locator('#detailed-notes .studyai-english-question details').evaluateAll(
  d=>d.every(x=>!x.open)),'practice answers are hidden until explicitly revealed');
 await page.locator('#detailed-notes .studyai-english-question details').first().locator('summary').click();
 check(await page.locator('#detailed-notes .studyai-english-question details').first().evaluate(x=>x.open),
  'practice question opens interactively');
 const allText=await page.locator('#detailed-notes').textContent();
 const expected=['Sudha Murty','Triveni','Karmaveera','Kashi Yatre','north Karnataka','Krishtakka',
  'Dassara','Saraswati Puja','Subramania Bharati','Himavant','Ganga','Upanishads',
  'Brahma-knowledge','Buddha','personification','allusion','refrain','hyperbole','ode',
  'binomials','prefix','past perfect','letter to the editor','digital literacy',
  '120–150','R1','R2','80 marks','reading'];
 const missing=expected.filter(t=>!allText.toLowerCase().includes(t.toLowerCase()));
 check(missing.length===0,'verified NCERT 2026-27 English content and exam skills included: '+missing.join(','));
 const leaf=await page.evaluate(id=>{
  const groups=StudyAIProgress.outline(id);
  return groups[0].leaves.find(x=>x.kind==='subtopic');
 },info.id);
 check(!!leaf,'first lesson has an independently authored teaching subtopic');
 await page.evaluate(key=>StudyAILessonReader.goToLeaf(key),leaf.key);
 check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-lesson-subtopic:not([hidden])').count()===1,
  'opening a subtopic shows its explanatory paragraphs as a focused page');
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,info.id))===0,
  'merely navigating does not mark a subtopic complete');
 await page.evaluate(key=>{
  const row=[...document.querySelectorAll('.studyai-sublesson-row')].find(x=>x.dataset.leafKey===key);
  row?.querySelector('.studyai-sublesson-toggle')?.click();
 },leaf.key);
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,info.id))===1,
  'checkbox completes exactly one English subtopic');
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.CBSE_CLASS9_ENGLISH_FULL_NOTES);
 check((await page.evaluate(id=>StudyAIProgress.completedKeys(id),info.id)).includes(leaf.key),
  'English progress survives a reload');
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(x=>x.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 },info.id);
 await page.evaluate(key=>{
  const row=[...document.querySelectorAll('.studyai-sublesson-row')].find(x=>x.dataset.leafKey===key);
  row?.querySelector('.studyai-sublesson-toggle')?.click();
 },leaf.key);
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,info.id))===0,
  'completed English subtopic may be unchecked manually');
 const first=await page.evaluate(id=>StudyAIProgress.outline(id)[0].leaves.length,info.id);
 await page.locator('.studyai-lesson-rail .studyai-lesson-toggle').first().evaluate(node=>node.click());
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,info.id))===first,
  'parent lesson checkbox completes only its own subtopics');
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='English'&&x.title.startsWith('The Pot Maker'));
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 });
 check(await page.locator('#detailed-notes .studyai-english-full-notes').count()===0&&
  (await page.locator('#detailed-notes').textContent()).includes('Sentila')&&
  await page.locator('.studyai-lesson-rail .studyai-sublesson-row').count()===0,
  'Unit 2 preserves legacy notes and does not show Unit 1 subtopic checkboxes');
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 });
 check(await page.locator('.science-ch13-figure').count()===15&&
  await page.locator('#study .studyai-lesson-rail .studyai-sublesson-row').count()>30,
  'Science retains all fifteen original diagrams and its established checklist');
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 });
 check(await page.locator('#study.studyai-progress-active').count()===1&&
  await page.locator('.studyai-lesson-rail .studyai-sublesson-row').count()>30,
  'Maths reader remains unchanged');
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(x=>x.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 },info.id);
 const widths=await page.evaluate(()=>{
  const view=document.querySelector('#detailed-notes .studyai-english-full-notes');
  const rail=document.querySelector('#study .studyai-notes-nav');
  return {reader:view?.getBoundingClientRect().width,nav:rail?.getBoundingClientRect().width};
 });
 check(widths.reader>0&&widths.reader<=391&&widths.nav>0&&widths.nav<=391,
  'English notes and contents fit 390px viewport');
 check(jsErrors.length===0,'no JavaScript runtime errors: '+jsErrors.join('; '));
 console.log('KAVERI CLASS 9 ENGLISH UNIT 1 READER + PROGRESS PASS');
})().catch(error=>{console.error(error);console.error(stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(temp,{recursive:true,force:true})});
