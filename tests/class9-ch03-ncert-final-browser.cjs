/* NCERT Chapter 3 source-grounded, real StudyAI chapter/progress browser regression. */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ch03-')),port=process.env.TEST_CH03_PORT||'5161';
const root='http://127.0.0.1:'+port;
const srv=spawn(process.env.PYTHON||'python',['launcher.py'],{cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'ch03-final-ci',FLASK_DEBUG:'0',
 COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},stdio:['ignore','ignore','pipe']});
let stderr='',browser;
srv.stderr.on('data',x=>stderr=(stderr+String(x)).slice(-9000));
const ok=(c,s)=>{assert.ok(c,s);console.log('PASS',s)};
(async()=>{
 let alive=false;
 for(let i=0;i<120;i++){try{if((await fetch(root+'/api/health')).ok){alive=true;break}}catch{}
 await new Promise(r=>setTimeout(r,100))}
 ok(alive,'isolated StudyAI starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(root+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>window.CBSE_CLASS9_MATH_FULL_NOTES?.['The World of Numbers']?._studyaiVerifiedRevision &&
 !!window.StudyAIProgress?.outline&&!!window.StudyAILessonReader?.goToLeaf);
 const before=await page.evaluate(()=>{
 const ch=CBSE_CLASS9_MATH_FULL_NOTES['The World of Numbers'],pi=ch.sections.find(s=>s.title==='Irrational numbers')
 ?.subtopics.find(s=>s.title==='Another irrational number: π');
 const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'
 &&x.title==='The World of Numbers');
 const groups=StudyAIProgress.outline(e.id),leaves=groups.flatMap(g=>g.leaves);
 return {id:e.id,pi,groups:groups.length,total:leaves.length,keys:leaves.map(l=>l.key),
 summary:StudyAIProgress.summary(e.id),
 existing:ch.sections.some(s=>s.title==='Why √2 is irrational')&&
 ch.sections.some(s=>s.title==='Decimal expansions of real numbers')&&
 ch.sections.some(s=>s.title==='Density of rational numbers'),
 sectionNames:ch.sections.map(s=>s.title)};
 });
 ok(before.existing,'previous proofs and decimal/density lessons preserved');
 ok(before.pi?.paragraphs?.some(x=>x.includes('Mādhava')&&x.includes('52/15')===false&&x.includes('4(1 − 1/3')) &&
 before.pi?.examples?.some(x=>x.answer.includes('52/15')&&x.steps?.length===4),
 'π series and original exact three-term worked calculation included');
 ok(4*(1-1/3+1/5)===52/15&&Math.abs(52/15-3.4666666667)<1e-9,
 'independent Madhava partial-sum arithmetic');
 ok(before.keys.length===new Set(before.keys).size&&before.total===before.summary.total&&before.total>30,
 'chapter progress uses unchanged valid unique leaf IDs');
 const opened=await page.evaluate(id=>{
 const e=STUDY_DATA.find(x=>x.id===id);
 current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};
 renderFilters();openTopic(e.title,e.id);
 const l=StudyAIProgress.outline(id).flatMap(g=>g.leaves).find(x=>x.title==='Another irrational number: π');
 return {key:l?.key,ok:l?StudyAILessonReader.goToLeaf(l.key):false,
 active:StudyAILessonReader.activeLeafKey()};
 },before.id);
 ok(opened.ok&&opened.key===opened.active,'π lesson opens through real focused reader');
 const visible=await page.evaluate(()=>document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 ok(visible.includes('Mādhava')&&visible.includes('52/15'),'real chapter renders finite-series example');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),before.id);
 ok(after.total===before.total&&after.done===before.summary.done,'reading does not change completion');
 ok(errors.length===0,'no JavaScript errors: '+errors.join('; '));
 console.log('CHAPTER 3 FINAL NCERT AUDIT PASSED');
})().catch(e=>{console.error(e,stderr);process.exitCode=1}).finally(async()=>{if(browser)await browser.close().catch(()=>{});srv.kill();rmSync(dir,{recursive:true,force:true})});
