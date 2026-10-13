/* 2026-27 official NCERT Chapter 8, real StudyAI reader and exact arithmetic regression. */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path'),{chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'ncert-ch8-')),port=process.env.TEST_CH08_PORT||'5178',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'db.sqlite'),SECRET_KEY:'ch08-ci',GEMINI_API_KEY:''},stdio:['ignore','ignore','pipe']});
let browser,stderr='';server.stderr.on('data',s=>{stderr=(stderr+String(s)).slice(-9000)});
const check=(v,s)=>{assert.ok(v,s);console.log('PASS',s)};
(async()=>{
 let ready=false;for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
 check(ready,'isolated StudyAI server starts');
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>window.StudyAIProgress?.outline&&window.StudyAILessonReader?.goToLeaf&&window.CBSE_CLASS9_MATH_FULL_NOTES?.['Predicting What Comes Next: Exploring Sequences and Progressions']?._studyaiCh08FinalRecurrenceV1);
 const s=await page.evaluate(()=>{
  const title='Predicting What Comes Next: Exploring Sequences and Progressions',ch=CBSE_CLASS9_MATH_FULL_NOTES[title],e=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title===title);
  const topics=ch.sections.flatMap(s=>s.subtopics||[]),get=t=>topics.find(x=>x.title===t),groups=StudyAIProgress.outline(e.id),leaves=groups.flatMap(g=>g.leaves);
  return {id:e.id,groups:groups.length,total:leaves.length,unique:new Set(leaves.map(l=>l.key)).size===leaves.length,progress:StudyAIProgress.summary(e.id),
  original:['Definition and the nth-term relationship','Pairing from opposite ends','Sierpiński triangle: exact count and shaded-area rules','Sierpiński square carpet: counting retained squares and area','Prefix-sum recurrences and why doubling or Fibonacci returns'].every(t=>!!get(t)),
  recurrence:get('Explicit versus recursive descriptions')?.examples?.some(ex=>ex.title==='Find the position of a term in a shifted geometric recurrence'&&ex.answer==='The seventh term is 730.'),
  derivation:get('Explicit versus recursive descriptions')?.paragraphs?.some(p=>p.includes('tₙ₊₁=3tₙ−2')&&p.includes('1+3ⁿ⁻¹')),
  source:STUDYAI_CLASS9_DEPTH_AUDIT[title]?.reviewedSource||'',
  sig:JSON.stringify(ch.sections.map(s=>({title:s.title,parts:(s.subtopics||[]).map(p=>({title:p.title,n:p.paragraphs?.length,e:p.examples?.length}))})))};
 });
 check(s.original,'existing complete AP/GP, fractal and recurrence lessons preserved');
 check(s.recurrence&&s.derivation,'NCERT affine recurrence example and proof in existing lesson');
 check(s.total>s.groups&&s.unique&&s.total===s.progress.total,'progress counts and unique navigation keys valid');
 check(s.source.includes('iemh108.pdf'),'official chapter source recorded');
 let a=2;const values=[a];for(let i=1;i<7;i++){a=3*a-2;values.push(a)}
 check(values.join(',')==='2,4,10,28,82,244,730','recurrence independently computed to term seven');
 const same=await page.evaluate(async()=>{
  await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/cbse-class9-maths-depth-ch08.js';s.onload=resolve;s.onerror=()=>reject(Error('reload failed'));document.body.append(s)});
  const ch=CBSE_CLASS9_MATH_FULL_NOTES['Predicting What Comes Next: Exploring Sequences and Progressions'];
  return JSON.stringify(ch.sections.map(s=>({title:s.title,parts:(s.subtopics||[]).map(p=>({title:p.title,n:p.paragraphs?.length,e:p.examples?.length}))})));
 });
 check(same===s.sig,'reloading chapter script does not duplicate pages or text');
 const open=await page.evaluate(id=>{const e=STUDY_DATA.find(x=>x.id===id);current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};renderFilters();openTopic(e.title,e.id);
 const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves).find(l=>l.title==='Explicit versus recursive descriptions');
 return {ok:StudyAILessonReader.goToLeaf(leaf.key),key:leaf.key,active:StudyAILessonReader.activeLeafKey()};},s.id);
 check(open.ok&&open.key===open.active,'real reader opens the existing recurrence lesson');
 const visible=await page.evaluate(()=>document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('730')&&visible.includes('fixed value'),'worked recurrence is visible in StudyAI UI');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),s.id);
 check(after.total===s.total&&after.done===s.progress.done,'reading leaves student progress untouched');
 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CHAPTER 8 OFFICIAL NCERT FINAL AUDIT PASS');
})().catch(e=>{console.error(e,stderr);process.exitCode=1}).finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
