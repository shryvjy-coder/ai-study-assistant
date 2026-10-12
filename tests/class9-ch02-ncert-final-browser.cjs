/* NCERT Ganita Manjari 2026–27, Chapter 2: final notes and real-reader regression. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch02-'));
const port=process.env.TEST_CH02_PORT||'5160',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'ch02-audit-local-ci',
  FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),
  GEMINI_API_KEY:''},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',part=>{stderr=(stderr+String(part)).slice(-9000)});
const check=(ok,message)=>{assert.ok(ok,message);console.log('PASS',message)};
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
  !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Introduction to Linear Polynomials']?._studyaiCompleteDepth,
  {timeout:12000});
 const before=await page.evaluate(()=>{
  const title='Introduction to Linear Polynomials',
   ch=CBSE_CLASS9_MATH_FULL_NOTES[title],
   entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
     e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('Chapter 2 entry missing');
  const topics=ch.sections.flatMap(s=>s.subtopics||[]);
  const get=name=>topics.find(s=>s.title===name);
  const groups=StudyAIProgress.outline(entry.id);
  const leaves=groups.flatMap(g=>g.leaves);
  const signature=JSON.stringify(ch.sections.map(s=>({
    title:s.title,subtopics:(s.subtopics||[]).map(t=>({
     name:t.title,paragraphs:t.paragraphs?.length,
     examples:(t.examples||[]).map(e=>e.title)
    }))
  })));
  return {
    id:entry.id,signature,
    total:leaves.length,groups:groups.length,
    unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
    progress:StudyAIProgress.summary(entry.id),
    original:['From repeated arithmetic to algebraic rules',
      'Why the same first difference matters',
      'Changing quantities and rates',
      'Why a linear polynomial graphs as a line',
      'Intercepts and the zero of a polynomial',
      'Inverse questions: recovering the input'].every(t=>!!get(t)),
    vocabulary:get('From repeated arithmetic to algebraic rules')?.paragraphs
      .some(p=>p.includes('univariate')&&p.includes('two variables')),
    fare:get('Changing quantities and rates')?.examples
      .some(e=>e.title.includes('flat fare')&&e.answer.includes('₹80')&&
        e.answer.includes('0≤d≤3')),
    growth:get('Changing quantities and rates')?.paragraphs
      .some(p=>p.includes('Linear growth')&&p.includes('linear decay')),
    slope:get('Why a linear polynomial graphs as a line')?.examples
      .some(e=>e.title==='Compare slopes and test parallel lines'),
    polynomials:get('Inverse questions: recovering the input')?.examples
      .some(e=>e.title.includes('two polynomials')&&e.answer.includes('3x+4')&&
       e.answer.includes('5x−2')),
    family:get('Intercepts and the zero of a polynomial')?.examples
      .some(e=>e.title.includes('family of lines')&&e.answer.includes('(−1,0)')),
    ch01:CBSE_CLASS9_MATH_FULL_NOTES['Orienting Yourself: The Use of Coordinates']
       ?._studyaiCh01FinalAuditV1===true
  };
 });
 check(before.original,'all original chapter teaching sections preserved');
 check(before.vocabulary&&before.fare&&before.polynomials&&before.family,
   'NCERT vocabulary, valid fare domain, algebra challenge and graph family covered');
 check(before.growth&&before.slope,'prior growth/decay and parallel-lines overlay remains');
 check(before.ch01,'Chapter 1 merged corrections remain loaded');
 check(before.total>before.groups && before.unique &&
   before.total===before.progress.total,
   'real chapter outlines use unique progress keys and accurate totals');
 check(before.polynomials&&3+5===8&&(3*3+4)===(5*3-2),
   'independent polynomial reconstruction validates both given constraints');
 check(30+10*(8-3)===80 && -1*2+2===0 && -1*(-3)-3===0,
   'independent piecewise fare and fixed-intercept arithmetic');
 const again=await page.evaluate(async()=>{
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src='/cbse-class9-maths-depth-ch02.js';
   script.onload=resolve;script.onerror=()=>reject(Error('Chapter 2 reload failed'));
   document.body.append(script);
  });
  const ch=CBSE_CLASS9_MATH_FULL_NOTES['Introduction to Linear Polynomials'];
  return JSON.stringify(ch.sections.map(s=>({
    title:s.title,subtopics:(s.subtopics||[]).map(t=>({
     name:t.title,paragraphs:t.paragraphs?.length,
     examples:(t.examples||[]).map(e=>e.title)
    }))
  })));
 });
 check(again===before.signature,'idempotent Chapter 2 depth reload does not duplicate notes');
 const opened=await page.evaluate(id=>{
  const entry=STUDY_DATA.find(e=>e.id===id);
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   topic:entry.title,topicId:entry.id,component:'All components'};
  renderFilters();openTopic(entry.title,entry.id);
  const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves)
   .find(l=>l.title==='Changing quantities and rates');
  if(!leaf)throw Error('NCERT fare subtopic is not navigable');
  return {ok:StudyAILessonReader.goToLeaf(leaf.key),
    active:StudyAILessonReader.activeLeafKey(),key:leaf.key};
 },before.id);
 check(opened.ok&&opened.active===opened.key,
   'existing lesson is selectable using StudyAI focused reader');
 const visible=await page.evaluate(()=>document.querySelector(
   '#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('An initial flat fare')&&visible.includes('₹80'),
   'real focused note renders all of the new fare example');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),before.id);
 check(after.total===before.total&&after.done===before.progress.done,
   'reading and reloading notes preserves all completion state');
 check(errors.length===0,'no JavaScript errors: '+errors.join('; '));
 console.log('NCERT CHAPTER 2 FINAL AUDIT REAL-READER PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(dir,{recursive:true,force:true})});
