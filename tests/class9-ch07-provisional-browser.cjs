/* Provisional Chapter 7 math, real reader and progress regression.
 * The authoritative NCERT PDF URL presently resolves to an older textbook.
 */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path'),{chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'ncert-ch7-')),port=process.env.TEST_CH07_PORT||'5177',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'db.sqlite'),SECRET_KEY:'ch07-ci',GEMINI_API_KEY:''},stdio:['ignore','ignore','pipe']});
let browser,stderr='';server.stderr.on('data',s=>{stderr=(stderr+String(s)).slice(-9000)});
const check=(v,s)=>{assert.ok(v,s);console.log('PASS',s)};
(async()=>{
 let ready=false;for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
 check(ready,'isolated StudyAI starts');
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>window.StudyAIProgress?.outline&&window.StudyAILessonReader?.goToLeaf&&window.CBSE_CLASS9_MATH_FULL_NOTES?.['The Mathematics of Maybe: Introduction to Probability']?._studyaiCompleteDepth);
 const s=await page.evaluate(()=>{
  const title='The Mathematics of Maybe: Introduction to Probability',ch=CBSE_CLASS9_MATH_FULL_NOTES[title],e=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title===title);
  if(!e)throw Error('Chapter 7 course record missing');
  const topics=ch.sections.flatMap(s=>s.subtopics||[]),names=new Set(topics.map(t=>t.title)),groups=StudyAIProgress.outline(e.id),leaves=groups.flatMap(g=>g.leaves);
  return {id:e.id,total:leaves.length,groups:groups.length,progress:StudyAIProgress.summary(e.id),unique:new Set(leaves.map(l=>l.key)).size===leaves.length,
  prior:['Valid sample spaces can have unequal probabilities','Estimating whole populations from representative surveys','Streaks, independence and the gambler\'s fallacy','Probability from the areas of uniform target regions'].every(x=>names.has(x)),
  elementary:['Uncertainty can be measured','Relative frequency from observations','Equally likely outcomes','Systematic lists and tables','Without replacement changes branch probabilities'].every(x=>names.has(x))};
 });
 check(s.prior&&s.elementary,'existing substantive probability chapters remain');
 check(s.total>s.groups&&s.total===s.progress.total&&s.unique,'unique progress keys and chapter totals');
 check(3/8!==1/4&&2/8===1/4&&3/8+3/8+1/8+1/8===1,'independent grouped fair-coin event probabilities');
 const next=await page.evaluate(id=>{
  const e=STUDY_DATA.find(e=>e.id===id);current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};
  renderFilters();openTopic(e.title,e.id);
  const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves).find(l=>l.title==='Valid sample spaces can have unequal probabilities');
  return {ok:StudyAILessonReader.goToLeaf(leaf.key),key:leaf.key,active:StudyAILessonReader.activeLeafKey()};
 },s.id);
 check(next.ok&&next.key===next.active,'real StudyAI reader opens selected probability lesson');
 const visible=await page.evaluate(()=>document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('3/8')&&visible.includes('1/4'),'full probability lesson renders');
 const p=await page.evaluate(id=>StudyAIProgress.summary(id),s.id);
 check(p.total===s.total&&p.done===s.progress.done,'reading preserves completion');
 check(errors.length===0,'no browser JS errors: '+errors.join('; '));
 console.log('CH07 PROVISIONAL READER REGRESSION PASS; NCERT PDF STILL REQUIRES VERIFICATION');
})().catch(e=>{console.error(e,stderr);process.exitCode=1}).finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
