/* StudyAI CBSE Class 9 Science Chapter 9 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, formula and bonding, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch09-'));
const port=process.env.TEST_SCIENCE_CH09_PORT||'5164';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch09-ci-test',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(temp,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',x=>{stderr=(stderr+String(x)).slice(-15000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};
(async()=>{
 let healthy=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){healthy=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(healthy,'isolated StudyAI reader server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const jsErrors=[];
 page.on('pageerror',error=>jsErrors.push(error.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
   !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const result=await page.evaluate(()=>{
  const title='Atomic Foundations of Matter';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completedBefore=JSON.stringify(state.completed||[]);
  const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
  const reviewBefore=JSON.stringify(state.review||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();if(entry)openTopic(title,entry.id);
  const notes=document.querySelector('#detailed-notes');
  const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return{
   found:!!entry?.id,original:science.length===13&&science.every(e=>!!e.deepNotes?.overview),
   sourceSame:entry?.sourceBook===bank[title]?.sourceBook,
   bankCount:Object.keys(bank).length,
   earlier:['Exploration: Entering the World of Secondary Science','Cell: The Building Block of Life',
    'Tissues in Action','Describing Motion Around Us','Exploring Mixtures and their Separation',
    'How Forces Affect Motion','Work, Energy, and Simple Machines','Journey Inside the Atom'].every(t=>!!bank[t]),
   pdf:bank[title]?.sourcePdf||'',pages:bank[title]?.printedPages||'',review:bank[title]?.reviewStatus||'',
   headings:sections.map(el=>el.querySelector('h3')?.textContent.trim()),
   pCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
   examples:notes?.querySelectorAll('.worked-box').length||0,
   tips:notes?.querySelectorAll('.exam-box').length||0,
   curated:notes?.querySelectorAll('.science-full-notes').length||0,
   text:notes?.textContent||'',
   safeState:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
    completedBefore===JSON.stringify(state.completed||[])&&
    bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
    reviewBefore===JSON.stringify(state.review||[])
  };
 });
 check(result.found&&result.original&&result.sourceSame,
  'all 13 original Science IDs/entry overviews remain intact and Chapter 9 resolves');
 check(result.bankCount===12&&result.earlier,'Chapter 9 coexists with the eight prior curated chapters');
 check(result.pdf==='iesc109.pdf'&&result.pages==='162–183'&&result.review.includes('outstanding'),
  'NCERT textbook reference and human-editorial-review status preserved');
 check(result.curated===1&&result.headings.length===11&&new Set(result.headings).size===11,
  'eleven original substantial lesson sections render once');
 check(result.pCount>=83&&result.examples===91&&result.tips===11,
  '83 explanatory paragraphs, 91 worked examples and 11 lesson-specific exam tips render');
 const req=['Activity 9.1','Activity 9.2','Activity 9.3','Activity 9.4',
   'Example 9.1','Example 9.2','Example 9.3','Example 9.4','Example 9.5','Example 9.6','Example 9.7',
   'Pause and Ponder','Fig. 9.18','Table 9.1','Table 9.3','Lavoisier','Proust','Dalton',
   '2H₂ + O₂','1:8','23:35.5','O=O','N≡N','HCl','NH₃','PCl₃','SF₆',
   'Na⁺','Cl⁻','NaCl','MgCl₂','Cu²⁺','Fe³⁺','NH₄⁺','SO₄²⁻','OH⁻','NO₃⁻',
   'Al₂(SO₄)₃','Ca(NO₃)₂','criss-cross','covalent','ionic','crystal lattice',
   'sugar','conduct','solid','molten','formula unit mass','molecular mass',
   '164 u','63 u','80 u','98 u','84 u','11.3 g','Br⁻','Hg²⁺'];
 const missing=req.filter(q=>!result.text.toLowerCase().includes(q.toLowerCase()));
 check(missing.length===0,'NCERT four Activities, seven Examples, worked exercise competencies: '+missing.join(', '));
 check(result.safeState,'Maths outlines, bookmarks, completion and review state unchanged');
 const figures=page.locator('#detailed-notes .science-ch09-figure');
 const answers=page.locator('#detailed-notes .science-ch09-question details');
 check(await figures.count()===11,'all eleven original chemistry illustrations appear');
 const ids=['mass','proportions','dalton','covalent','names','ionic','ions','formulas','properties','masses','review'];
 check(JSON.stringify(await figures.evaluateAll(nodes=>nodes.map(n=>n.dataset.scienceVisual)))===JSON.stringify(ids),
  'figures map to their corresponding lessons in order');
 check(await figures.locator('svg[role="img"] title').count()===11&&
  await figures.locator('svg[role="img"] desc').count()===11&&
  await figures.locator('figcaption').count()===11,'eleven original SVGs have accessible titles, descriptions and captions');
 check(await answers.count()===44&&await answers.evaluateAll(nodes=>nodes.every(n=>!n.open)),
  '44 student quiz answers initially hidden');
 await answers.first().locator('summary').click();
 check(await answers.first().evaluate(node=>node.open),'student can reveal an answer');
 await answers.first().locator('summary').click();
 check(!await answers.first().evaluate(node=>node.open),'student can close the answer again');
 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(nodes=>nodes.map(n=>({w:n.getBoundingClientRect().width,svg:n.querySelector('svg').getBoundingClientRect().width})));
 check(mobile.length===11&&mobile.every(x=>x.w<=391&&x.svg<=x.w+1),
  'all 11 chemistry figures fit narrow mobile reader');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Atomic Foundations of Matter');
  renderReaderContent(e);
 });
 check(await figures.count()===11&&await answers.count()===44,'rerender does not duplicate figures or questions');
 for(const [title,nFigures,nQuestions,cls] of [
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03'],
  ['Describing Motion Around Us',6,15,'science-ch04'],
  ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
  ['How Forces Affect Motion',8,25,'science-ch06'],
  ['Work, Energy, and Simple Machines',10,31,'science-ch07'],
  ['Journey Inside the Atom',10,36,'science-ch08']
 ]){
  await page.evaluate(name=>{
   const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science'&&e.title===name);
   current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:name,topicId:entry.id};
   renderFilters();openTopic(name,entry.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===nFigures&&
   await page.locator('#detailed-notes .'+cls+'-question').count()===nQuestions&&await figures.count()===0,
   'Chapter 9 upgrade does not affect curated prior lesson: '+title);
 }
 await page.evaluate(()=>{
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science'&&e.title==='Sound Waves: Characteristics and Applications');
  current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:entry.title,topicId:entry.id};
  renderFilters();openTopic(entry.title,entry.id);
 });
 check(await figures.count()===0,'new Chapter 9 SVGs do not leak into untouched Chapter 10');
 check(jsErrors.length===0,'no uncaught JS errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH09 NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
