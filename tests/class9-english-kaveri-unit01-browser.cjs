/* Grade 9 NCERT Kaveri Unit 1 authored lesson and Maths-parity browser regression. */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-kaveri-english-'));
const port=process.env.TEST_KAVERI_ENGLISH_PORT||'5172';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'kaveri-unit1-ci',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(dir,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',x=>{stderr=(stderr+String(x)).slice(-10000)});
const check=(ok,msg)=>{assert.ok(ok,msg);console.log('PASS',msg)};
(async()=>{
 let healthy=false;
 for(let i=0;i<120;i++){
   try{if((await fetch(base+'/api/health')).ok){healthy=true;break}}catch{}
   await new Promise(resolve=>setTimeout(resolve,110));
 }
 check(healthy,'StudyAI isolated test server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.addLocatorHandler(page.locator('#studyai-onboarding[open]'),async()=>{
  await page.evaluate(()=>{const d=document.querySelector('#studyai-onboarding');if(d?.open)d.close();});
 });
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.StudyAILessonReader&&!!window.CBSE_CLASS9_ENGLISH_FULL_NOTES);
 const baseline=await page.evaluate(()=>{
  const english=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='English');
  const bank=CBSE_CLASS9_ENGLISH_FULL_NOTES;
  const e=english.find(x=>x.title==='How I Taught My Grandmother to Read · Bharat Our Land');
  const math=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
  const science=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
  const snapshot={englishCount:english.length,names:english.map(x=>x.title),
   ids:english.map(x=>x.id),fullKeys:Object.keys(bank),id:e.id,
   pdf:e.noteSourceFile,originalBook:e.sourceBook,
   count:bank[e.title].sections.length,
   worked:bank[e.title].sections.reduce((a,s)=>a+s.examples.length,0),
   paragraphs:bank[e.title].sections.reduce((a,s)=>a+s.paragraphs.length,0),
   mathsBefore:StudyAIProgress.summary(math.id),scienceBefore:StudyAIProgress.summary(science.id),
   checkedBefore:JSON.stringify(state.studyaiLessonProgress||{})};
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};
  renderFilters();openTopic(e.title,e.id);
  return snapshot;
 });
 check(baseline.englishCount===8&&new Set(baseline.ids).size===8&&
  baseline.fullKeys.length===1&&baseline.pdf==='iebe101.pdf',
  'all eight original Kaveri unit identifiers remain; only unit 1 upgraded');
 check(baseline.count===11&&baseline.paragraphs===82&&baseline.worked===72,
  '11 long-form teaching lessons, 82 paragraphs and 72 independent worked models');
 check(await page.locator('#study.studyai-progress-active').count()===1&&
  await page.locator('.studyai-lesson-rail .studyai-lesson-row').count()===11,
  'Maths/Science-style progress reader activates for new detailed English unit');
 const summary=await page.evaluate(id=>StudyAIProgress.summary(id),baseline.id);
 check(summary.lessonCount===11&&summary.total===83&&summary.done===0,
  'English unit exposes 11 core lessons and 72 actual worked-example subtopics');
 check(await page.locator('#detailed-notes .english-full-notes').count()===1&&
  await page.locator('#detailed-notes .actual-note-topic').count()===11&&
  await page.locator('#detailed-notes .worked-box').count()===72,
  'detailed English content and solved models remain fully mounted in document');
 check(await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1,
  'one complete lesson page visible at a time instead of one huge English scroll');
 const terms=['Krishtakka','Karmaveera','Kashi Yatre','Triveni','Sudha Murty',
  'Saraswati Puja','literacy','intergenerational','Subramania Bharati',
  'Himavant','Ganga','Upanishads','rhetorical','personification',
  'hyperbole','allusion','binomial','prefix','past perfect',
  'letter to the editor','turncoat','digital literacy'];
 const whole=await page.locator('#detailed-notes').textContent();
 check(terms.every(x=>whole.toLowerCase().includes(x.toLowerCase())),
  'text-specific prose, poem, grammar, speaking, listening and writing depth preserved');

 const activeNotes=await page.evaluate(()=>{
   const c=window.CBSE_CLASS9_ENGLISH_FULL_NOTES['How I Taught My Grandmother to Read · Bharat Our Land'];
   const titles=c.sections.flatMap(s=>s.examples.map(e=>e.title));
   return {paragraph:c.sections[4].paragraphs.join(' '),
     titles, letter:c.sections[6].examples.find(e=>e.title==='Original full model letter: student literacy volunteers')?.answer||''};
 });
 check(activeNotes.paragraph.includes('3) TRUE')&&
   !activeNotes.paragraph.includes('grandmother was the narrator\'s teacher is FALSE'),
   'NCERT Part II statement 3 correctly recognises the narrator as grandmother\'s first teacher');
 const auditedTitles=['NCERT Part II true-or-false with evidence',
   'NCERT prose Extract 1: five answers (pp. 10–11)',
   'NCERT prose Extract 2: five answers (pp. 11–12)',
   'NCERT Simple Past / Past Perfect V(ii): A–J',
   'NCERT poem cloze and four poetic features (p. 25)',
   'NCERT poem extract: five questions (pp. 28–29)',
   'NCERT writing model: a memorable journey (p. 32)'];
 check(auditedTitles.every(t=>activeNotes.titles.includes(t)),
   'curriculum audit corrections and full NCERT exercise models are present');
 check(activeNotes.letter.includes('Subject: Student Volunteers for Adult Literacy')&&
   activeNotes.letter.includes('Yours truly,')&&
   activeNotes.letter.split('\\n').length>10,
   'complete multi-paragraph model letter is stored with readable line breaks');

 const first=await page.evaluate(id=>StudyAIProgress.outline(id)[0],baseline.id);
 const example=first.leaves.find(l=>l.kind==='example');
 check(!!example,'first English lesson has independent worked model');
 await page.evaluate(key=>StudyAILessonReader.goToLeaf(key),example.key);
 check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) > .worked-box:not([hidden])').count()===1,
  'individual English model answer opens as a focused page');
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,baseline.id))===0,
  'opening material alone never marks progress completed');
 await page.evaluate(key=>{
  const row=[...document.querySelectorAll('.studyai-sublesson-row')].find(e=>e.dataset.leafKey===key);
  row.querySelector('.studyai-sublesson-toggle').click();
 },example.key);
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,baseline.id))===1,
  'English individual subtopic checklist saves completion');
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress);
 check((await page.evaluate(id=>StudyAIProgress.completedKeys(id),baseline.id)).includes(example.key),
  'English completion persists across page refresh');
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(e=>e.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 },baseline.id);
 await page.evaluate(key=>{
  const r=[...document.querySelectorAll('.studyai-sublesson-row')].find(e=>e.dataset.leafKey===key);
  r.querySelector('.studyai-sublesson-toggle').click();
 },example.key);
 check((await page.evaluate(id=>StudyAIProgress.summary(id).done,baseline.id))===0,
  'English saved checkbox can be unchecked');
 const oldUnit=await page.evaluate(()=>{
  const e=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='English'&&
    e.title.startsWith('The Pot Maker'));
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);return e.id;
 });
 check(!!oldUnit&&await page.locator('#study.studyai-progress-active').count()===0&&
  await page.locator('#detailed-notes .english-full-notes').count()===0,
  'other seven existing English units retain traditional notes until separately upgraded');
 const restored=await page.evaluate(()=>{
  const math=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
  const science=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
  return {math:StudyAIProgress.summary(math.id),science:StudyAIProgress.summary(science.id)};
 });
 check(JSON.stringify(restored.math)===JSON.stringify(baseline.mathsBefore)&&
   JSON.stringify(restored.science)===JSON.stringify(baseline.scienceBefore),
   'existing Maths and Science notes and progress totals remain unchanged');
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(id=>{
  const e=STUDY_DATA.find(e=>e.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 },baseline.id);
 const geometry=await page.evaluate(()=>{
  const outer=document.querySelector('#study .studyai-notes-nav').getBoundingClientRect().width;
  const prose=document.querySelector('#detailed-notes .note-prose').getBoundingClientRect().width;
  return {outer,prose};
 });
 check(geometry.outer>0&&geometry.outer<=391&&geometry.prose>0&&geometry.prose<=391,
  'English reader and contents fit a 390px mobile screen');
 check(errors.length===0,'no uncaught browser JavaScript errors: '+errors.join('; '));
 console.log('KAVERI UNIT 1 AUTHORED DEPTH AND MATHS-PARITY CHECKLIST PASS');
})().catch(e=>{console.error(e);console.error(stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
