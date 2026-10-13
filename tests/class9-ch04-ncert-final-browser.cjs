/* Chapter 4 NCERT factorisation final audit in the real StudyAI reader. */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch04-')),port=process.env.TEST_CH04_PORT||'5162',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,SECRET_KEY:'ch04-final-ci',FLASK_DEBUG:'0',
 COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},stdio:['ignore','ignore','pipe']});
let browser,stderr='';server.stderr.on('data',d=>stderr=(stderr+String(d)).slice(-9000));
const check=(v,s)=>{assert.ok(v,s);console.log('PASS',s)};
(async()=>{
 let ready=false;for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
 await new Promise(r=>setTimeout(r,100))}
 check(ready,'isolated StudyAI starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Exploring Algebraic Identities']?._studyaiCompleteDepth&&
 !!window.StudyAIProgress?.outline&&!!window.StudyAILessonReader?.goToLeaf);
 const state=await page.evaluate(()=>{
  const title='Exploring Algebraic Identities',ch=CBSE_CLASS9_MATH_FULL_NOTES[title],
   entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('Chapter 4 entry missing');
  const topics=ch.sections.flatMap(s=>s.subtopics||[]),
   pattern=topics.find(t=>t.title==='Patterns as conjectures and proofs'),
   groups=StudyAIProgress.outline(entry.id),leaves=groups.flatMap(g=>g.leaves);
  return {id:entry.id,title,groupCount:groups.length,leafCount:leaves.length,
   summary:StudyAIProgress.summary(entry.id),unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
   core:['Square of a difference','Factorise by splitting the middle term',
     'Cubes as products of three factors','Simplification and restrictions'].every(t=>topics.some(p=>p.title===t)),
   overlay:topics.some(t=>t.title==='Square of a trinomial') &&
     topics.some(t=>t.title==='Sum, difference, and three-variable cubic identities'),
   newProof:pattern?.paragraphs?.some(p=>p.includes('x⁵−y⁵')&&p.includes('xⁿ−yⁿ')),
   example:pattern?.examples?.some(e=>e.title==='Prove x−y is a factor of the fifth-power difference'&&
     e.answer.includes('x⁵−y⁵=(x−y)')),
   ch03:CBSE_CLASS9_MATH_FULL_NOTES['The World of Numbers']?.sections
     .find(s=>s.title==='Irrational numbers')?.subtopics
     .find(s=>s.title==='Another irrational number: π')?.examples
     ?.some(e=>e.answer.includes('52/15'))
  };
 });
 check(state.core&&state.overlay,'existing algebra proofs and three-variable cube overlay remain');
 check(state.newProof&&state.example,'difference-of-powers identity and worked telescoping proof added');
 check(state.ch03,'merged Chapter 3 Madhava series retained');
 check(state.leafCount>state.groupCount&&state.unique&&state.leafCount===state.summary.total,
  'all focused pages have valid unique progress keys');
 for(const [x,y] of [[5,3],[2,-1],[0,7],[3,3]]){
   const left=x**5-y**5,right=(x-y)*(x**4+x**3*y+x*x*y*y+x*y**3+y**4);
   check(left===right,'difference-of-fifths checks at ('+x+','+y+')');
 }
 const opened=await page.evaluate(id=>{
  const e=STUDY_DATA.find(x=>x.id===id);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};
  renderFilters();openTopic(e.title,e.id);
  const l=StudyAIProgress.outline(id).flatMap(g=>g.leaves)
    .find(x=>x.title==='Patterns as conjectures and proofs');
  return {key:l?.key,ok:l?StudyAILessonReader.goToLeaf(l.key):false,
    active:StudyAILessonReader.activeLeafKey()};
 },state.id);
 check(opened.ok&&opened.key===opened.active,'existing proof lesson opens in focused StudyAI reader');
 const visible=await page.evaluate(()=>document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('x⁵')&&visible.includes('interior term'),'full proof visible on reader page');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),state.id);
 check(after.total===state.leafCount&&after.done===state.summary.done,'reader preserves progress totals');
 check(errors.length===0,'no JS page errors: '+errors.join('; '));
 console.log('CHAPTER 4 FINAL NCERT AUDIT PASS');
})().catch(e=>{console.error(e,stderr);process.exitCode=1})
.finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
