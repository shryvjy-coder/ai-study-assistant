/* NCERT Ganita Manjari 2026-27: Chapter 1 final focused audit regression.
 * Uses the real StudyAI reader and local isolated database, never paid APIs.
 */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch01-'));
const port=process.env.TEST_CH01_PORT||'5159',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'chapter-one-local-ci',
  FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),
  GEMINI_API_KEY:''},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',p=>{stderr=(stderr+String(p)).slice(-9000)});
const check=(value,label)=>{assert.ok(value,label);console.log('PASS',label)};
(async()=>{
 let ready=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(ready,'isolated local StudyAI server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
  !!window.StudyAILessonReader?.goToLeaf &&
  !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Orienting Yourself: The Use of Coordinates']?._studyaiCh01FinalAuditV1,
  {timeout:12000});
 const initial=await page.evaluate(()=>{
  const title='Orienting Yourself: The Use of Coordinates';
  const ch=CBSE_CLASS9_MATH_FULL_NOTES[title];
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
    e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('Chapter 1 curriculum entry missing');
  const groups=StudyAIProgress.outline(entry.id);
  const leaves=groups.flatMap(g=>g.leaves);
  const topics=ch.sections.flatMap(s=>s.subtopics||[]);
  const lesson=t=>topics.find(s=>s.title===t);
  const rectangle=lesson('Drawing shapes from vertices')?.examples||[];
  const street=lesson('Historical ideas and the modern Cartesian grid');
  const circle=lesson('When two circular regions touch or overlap');
  return {
   id:entry.id,total:leaves.length,groups:groups.length,
   signature:JSON.stringify(ch.sections.map(s=>({
    name:s.title,topics:(s.subtopics||[]).map(t=>({
     title:t.title,examples:(t.examples||[]).map(e=>e.title),
     paragraphs:t.paragraphs?.length||0
    }))
   }))),
   unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
   progress:StudyAIProgress.summary(entry.id),
   existing:['Deriving the distance formula','Reflection and sign changes',
    'Trisection and the one-third displacement method',
    'Collinearity: three points on one straight line',
    'Inside, on or outside a circle'].every(t=>!!lesson(t)),
   rectangle:rectangle.some(e=>e.title.includes('fourth corner')&&
    e.answer.includes('6 ft by 4 ft')&&e.answer.includes('undetermined')),
   street:street?.examples?.some(e=>e.title==='Street labels need directions'&&
    e.answer.includes('(−800,−600)')),
   circle:circle?.paragraphs?.some(p=>p.includes('internally')&&p.includes('|r₁−r₂|'))&&
    circle.examples.some(e=>e.title.includes('Internal tangency')&&e.answer.includes('(5,0)')),
   numSections:ch.sections.length,
   originalAudit:!!STUDYAI_CLASS9_DEPTH_AUDIT[title]
  };
 });
 check(initial.existing,'prior distance, reflection, midpoint and circle teaching remains');
 check(initial.rectangle&&initial.street&&initial.circle,
  'NCERT floor plan, four-direction streets and circle tangency gaps patched');
 check(initial.total>initial.groups && initial.unique &&
  initial.total===initial.progress.total,'existing outline and progress counts agree');
 check(initial.originalAudit,'chapter depth audit metrics remain registered');
 const same=await page.evaluate(async()=>{
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src='/cbse-class9-maths-depth-ch01.js';
   script.onload=resolve;script.onerror=()=>reject(Error('Chapter 1 reload failed'));
   document.body.append(script);
  });
  const ch=CBSE_CLASS9_MATH_FULL_NOTES['Orienting Yourself: The Use of Coordinates'];
  return JSON.stringify(ch.sections.map(s=>({
   name:s.title,topics:(s.subtopics||[]).map(t=>({
    title:t.title,examples:(t.examples||[]).map(e=>e.title),
    paragraphs:t.paragraphs?.length||0
   }))
  })));
 });
 check(same===initial.signature,'reloading Chapter 1 cannot duplicate notes or progress keys');
 const navigated=await page.evaluate(id=>{
  const entry=STUDY_DATA.find(e=>e.id===id);
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   topic:entry.title,topicId:entry.id,component:'All components'};
  renderFilters();openTopic(entry.title,entry.id);
  const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves)
   .find(l=>l.title==='Drawing shapes from vertices');
  if(!leaf)throw Error('The original rectangle lesson is not navigable');
  return {ok:StudyAILessonReader.goToLeaf(leaf.key),
   active:StudyAILessonReader.activeLeafKey(),key:leaf.key};
 },initial.id);
 check(navigated.ok&&navigated.active===navigated.key,
  'existing focused lesson opens through the real reader');
 const visible=await page.evaluate(()=>document.querySelector(
  '#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('Complete the fourth corner')&&visible.includes('height'),
  'focused page renders the complete NCERT-style worked example');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),initial.id);
 check(after.total===initial.total&&after.done===initial.progress.done,
  'reading lesson preserves progress totals and completion');
 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CHAPTER 1 NCERT FINAL RECONCILIATION PASS');
})().catch(e=>{console.error(e);console.error(stderr);process.exitCode=1})
.finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(dir,{recursive:true,force:true});
});
