/* Ganita Manjari Chapter 5 theorem audit: provisional secondary source, real reader test. */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch05-')),port=process.env.TEST_CH05_PORT||'5163';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'ch05-provisional-audit',FLASK_DEBUG:'0',
 COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},
 stdio:['ignore','ignore','pipe']});
let browser,stderr='';server.stderr.on('data',p=>stderr=(stderr+String(p)).slice(-9000));
const check=(ok,label)=>{assert.ok(ok,label);console.log('PASS',label)};
(async()=>{
 let ready=false;for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
 check(ready,'isolated StudyAI starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.StudyAIProgress?.outline&&!!window.StudyAILessonReader?.goToLeaf&&
 !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['I’m Up and Down, and Round and Round']?._studyaiCompleteDepth);
 const state=await page.evaluate(()=>{
 const title='I’m Up and Down, and Round and Round',ch=CBSE_CLASS9_MATH_FULL_NOTES[title];
 const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title===title);
 if(!e)throw Error('Current Chapter 5 entry missing');
 const groups=StudyAIProgress.outline(e.id),leaves=groups.flatMap(g=>g.leaves),topics=ch.sections.flatMap(s=>s.subtopics||[]);
 const lesson=t=>topics.find(p=>p.title===t);
 return {id:e.id,total:leaves.length,groups:groups.length,
 summary:StudyAIProgress.summary(e.id),unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
 orig:['A circle is a locus, not a filled disc','Locating the centre from chords',
 'Chord length and distance from the centre','Angles in the same segment',
 'Opposite angles of a cyclic quadrilateral'].every(t=>!!lesson(t)),
 proof:lesson('Equal chords stand at equal central distances')?.paragraphs
   .some(p=>p.includes('SSS')&&p.includes('SAS')&&p.includes('∠AOB')),
 proofExample:lesson('Equal chords stand at equal central distances')?.examples
   .some(e=>e.title.includes('Equal chords and central angles')&&e.answer.includes('74°')),
 circumcentre:lesson('Locating the centre from chords')?.paragraphs
   .some(p=>p.includes('acute triangle')&&p.includes('obtuse triangle')&&p.includes('hypotenuse')),
 circumExample:lesson('Locating the centre from chords')?.examples
   .some(e=>e.title==='Circumcentre of a right-angled triangle'&&e.answer.includes('(3,4)')),
 ch03:CBSE_CLASS9_MATH_FULL_NOTES['The World of Numbers']?.sections.find(s=>s.title==='Irrational numbers')
   ?.subtopics.find(s=>s.title==='Another irrational number: π')?.examples?.some(e=>e.answer.includes('52/15')),
 ch04:CBSE_CLASS9_MATH_FULL_NOTES['Exploring Algebraic Identities']?.sections
   .flatMap(s=>s.subtopics||[]).find(s=>s.title==='Patterns as conjectures and proofs')
   ?.examples.some(e=>e.title.includes('fifth-power difference'))
 };
 });
 check(state.orig,'original circle, angle and cyclic quadrilateral lessons preserved');
 check(state.proof&&state.proofExample,'equal-chord central-angle proof in both directions and example');
 check(state.circumcentre&&state.circumExample,'circumcentre proof and 6-8-10 example');
 check(state.ch03&&state.ch04,'previously audited Chapters 3 and 4 remain');
 check(state.total>state.groups&&state.unique&&state.total===state.summary.total,
  'chapter progress and unique leaf count retained');
 check(Math.hypot(3,4)===5&&Math.hypot(3-6,4)===5&&Math.hypot(3,4-8)===5,
  'independently verify proposed circumcentre distances');
 const view=await page.evaluate(id=>{
 const e=STUDY_DATA.find(x=>x.id===id);
 current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};
 renderFilters();openTopic(e.title,e.id);
 const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves)
  .find(l=>l.title==='Equal chords stand at equal central distances');
 return {ok:leaf?StudyAILessonReader.goToLeaf(leaf.key):false,
 key:leaf?.key,active:StudyAILessonReader.activeLeafKey()};
 },state.id);
 check(view.ok&&view.key===view.active,'proven circle theorem opens in focused reader');
 const visible=await page.evaluate(()=>document.querySelector(
  '#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('SSS')&&visible.includes('SAS')&&visible.includes('74°'),
  'theorem and worked example visible to students');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),state.id);
 check(after.total===state.total&&after.done===state.summary.done,'reader leaves completion unchanged');
 check(!errors.length,'no browser page JS errors: '+errors.join('; '));
 console.log('CHAPTER 5 CIRCLE THEOREMS READER REGRESSION PASS');
})().catch(e=>{console.error(e,stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
