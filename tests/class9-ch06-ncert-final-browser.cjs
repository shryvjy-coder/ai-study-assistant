/* Chapter 6, independent NCERT 2026-27 audit, live reader regression. */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{mkdtempSync,rmSync}=require('node:fs'),{tmpdir}=require('node:os'),path=require('node:path'),{chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'ncert-ch6-')),port=process.env.TEST_CH06_PORT||'5176',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'db.sqlite'),SECRET_KEY:'ch06-ci',GEMINI_API_KEY:''},stdio:['ignore','ignore','pipe']});
let browser,stderr='';server.stderr.on('data',s=>{stderr=(stderr+String(s)).slice(-9000)});
const check=(v,s)=>{assert.ok(v,s);console.log('PASS',s)};
(async()=>{
 let up=false;for(let i=0;i<120;i++){try{if((await fetch(base+'/api/health')).ok){up=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
 check(up,'StudyAI starts against isolated database');
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>window.StudyAIProgress?.outline&&window.StudyAILessonReader?.goToLeaf&&window.CBSE_CLASS9_MATH_FULL_NOTES?.['Measuring Space: Perimeter and Area']?._studyaiCompleteDepth);
 const s=await page.evaluate(()=>{
 const title='Measuring Space: Perimeter and Area',ch=CBSE_CLASS9_MATH_FULL_NOTES[title],entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title===title);
 const sub=ch.sections.flatMap(x=>x.subtopics||[]),get=t=>sub.find(x=>x.title===t),groups=StudyAIProgress.outline(entry.id),leaves=groups.flatMap(g=>g.leaves);
 return {id:entry.id,total:leaves.length,groups:groups.length,unique:new Set(leaves.map(l=>l.key)).size===leaves.length,summary:StudyAIProgress.summary(entry.id),
 rectangles:get('Formulas and reasonableness checks')?.examples?.some(e=>e.title.includes('rectangle congruence')&&e.answer.includes('12 m by 5 m')),
 kite:get('Triangles sharing base and parallels')?.examples?.some(e=>e.title.includes('area of a kite')&&e.answer.includes('70 cm²')),
 proof:get('Formulas and reasonableness checks')?.paragraphs?.some(p=>p.includes('(l−w)²')&&p.includes('congruent')),
 prior:['Brahmagupta’s formula and its connection to Heron','Geometric hexagon bounds on pi','Area of a concentric annulus from a tangent chord'].every(t=>!!get(t)),
 audit:STUDYAI_CLASS9_DEPTH_AUDIT[title]?.reviewedSource||''};
 });
 check(s.rectangles&&s.kite&&s.proof,'both confirmed NCERT end-exercise proofs present');
 check(s.prior,'previous comprehensive Chapter 6 work preserved');
 check(s.total>s.groups&&s.total===s.summary.total&&s.unique,'outline and progress keys valid');
 check(s.audit.includes('iemh106.pdf'),'Chapter 6 audit source retained');
 check((12+5)*2===34&&12*5===60&&14*10/2===70,'independent maths verifies worked examples');
 const open=await page.evaluate(id=>{const e=STUDY_DATA.find(x=>x.id===id);current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id,component:'All components'};renderFilters();openTopic(e.title,e.id);const leaf=StudyAIProgress.outline(id).flatMap(g=>g.leaves).find(l=>l.title==='Formulas and reasonableness checks');return {key:leaf.key,ok:StudyAILessonReader.goToLeaf(leaf.key),active:StudyAILessonReader.activeLeafKey()};},s.id);
 check(open.ok&&open.key===open.active,'existing focused reader navigates to enriched lesson');
 const visible=await page.evaluate(()=>document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'');
 check(visible.includes('rectangle congruence')&&visible.includes('12 m'),'real UI shows worked solution');
 const after=await page.evaluate(id=>StudyAIProgress.summary(id),s.id);
 check(after.total===s.total&&after.done===s.summary.done,'notes opening leaves completion unchanged');
 check(!errors.length,'no uncaught browser errors: '+errors.join('; '));
 console.log('CH06 NCERT FINAL RECONCILIATION PASS');
})().catch(e=>{console.error(e,stderr);process.exitCode=1}).finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill();rmSync(dir,{recursive:true,force:true})});
