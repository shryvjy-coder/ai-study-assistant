/* StudyAI CBSE Class 9 Science Chapter 8 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, concentration reasoning, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch08-'));
const port=process.env.TEST_SCIENCE_CH08_PORT||'5163';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch08-ci-test',
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
 const content=await page.evaluate(()=>{
   const title='Journey Inside the Atom';
   const science=STUDY_DATA.filter(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science');
   const entry=science.find(x=>x.title===title);
   const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
   const math=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='Math of Space: Surface Area and Volume');
   const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
   const progressBefore=JSON.stringify(state.completed||[]);
   const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
   const reviewBefore=JSON.stringify(state.review||[]);
   current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
   renderFilters();if(entry)openTopic(title,entry.id);
   const notes=document.querySelector('#detailed-notes');
   const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
   return{
     found:!!entry?.id,sourceSame:entry?.sourceBook===bank[title]?.sourceBook,
     original:science.length===13&&science.every(e=>!!e.deepNotes?.overview),
     bankCount:Object.keys(bank).length,
     previous:['Exploration: Entering the World of Secondary Science',
       'Cell: The Building Block of Life','Tissues in Action',
       'Describing Motion Around Us','Exploring Mixtures and their Separation',
       'How Forces Affect Motion','Work, Energy, and Simple Machines'].every(name=>!!bank[name]),
     pdf:bank[title]?.sourcePdf||'',pages:bank[title]?.printedPages||'',review:bank[title]?.reviewStatus||'',
     headings:sections.map(n=>n.querySelector('h3')?.textContent.trim()),
     pCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
     exCount:notes?.querySelectorAll('.worked-box').length||0,
     tipCount:notes?.querySelectorAll('.exam-box').length||0,
     curatedCount:notes?.querySelectorAll('.science-full-notes').length||0,
     text:notes?.textContent||'',
     progressSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
       progressBefore===JSON.stringify(state.completed||[])&&
       bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
       reviewBefore===JSON.stringify(state.review||[])
   };
 });
 check(content.found&&content.original&&content.sourceSame,'original chapter identity, 13 Science records and textbook metadata intact');
 check(content.bankCount===8&&content.previous,'Chapter 8 coexists with 7 previously upgraded chapters');
 check(content.pdf==='iesc108.pdf'&&content.pages==='140–161'&&content.review.includes('outstanding'),
  'official NCERT citation and pending teacher editorial review are correctly disclosed');
 check(content.curatedCount===1&&content.headings.length===10&&new Set(content.headings).size===10,
  '10 independent full-depth chapter sections render once');
 check(content.pCount>=62&&content.exCount===60&&content.tipCount===10,
  '62 teaching paragraphs, 60 worked examples and 10 tips render');
 const required=['Kanada','Democritus','Dalton','Thomson','Rutherford','Bohr','Chadwick',
  '1897','1911','1913','1932','cathode','plum-pudding','gold foil',
  'most alpha','10⁻¹⁰','10⁻¹⁵','one million','stationary','electron clouds',
  'nuclear force','neutron','BARC','Co','CO','Fe','Na','IUPAC',
  'A − Z','mass number','protons','20 protons','hypothetical heavy-electron',
  '2n²','outermost','K','L','M','N','2,8,8','2,8,7',
  'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen',
  'Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus',
  'Sulfur','Chlorine','Argon',
  'valence electrons','valency','H₂O','NH₃','MgCl₂','octet','duplet',
  'protium','deuterium','tritium','²³⁵U','⁶⁰Co','¹³¹I','¹⁴C',
  'isotopes','isobars','weighted average','35.5 u','80.006 u','X:18p','heavy electrons'];
 const missing=required.filter(x=>!content.text.toLowerCase().includes(x.toLowerCase()));
 check(missing.length===0,'textbook concepts, all first-18 elements, masses and exam reasoning: '+missing.join(', '));
 check(content.progressSafe,'no changes to previous Maths outline, marks, bookmarks or review state');
 const figures=page.locator('#detailed-notes .science-ch08-figure');
 const answers=page.locator('#detailed-notes .science-ch08-question details');
 check(await figures.count()===10,'ten independently authored atom diagrams display');
 const expectIds=['history','thomson','rutherford','bohr','particles','symbols','nuclide','config','valency','isotopes'];
 const actual=await figures.evaluateAll(nodes=>nodes.map(n=>n.dataset.scienceVisual));
 check(JSON.stringify(actual)===JSON.stringify(expectIds),'diagrams appear inside corresponding sections in order');
 check(await figures.locator('svg[role="img"] title').count()===10&&
  await figures.locator('svg[role="img"] desc').count()===10&&
  await figures.locator('figcaption').count()===10,'every atomic illustration has accessible SVG title, description and figcaption');
 check(await answers.count()===36&&await answers.evaluateAll(nodes=>nodes.every(n=>!n.open)),
  '36 new independent practice questions start with answers concealed');
 await answers.first().locator('summary').click();
 check(await answers.first().evaluate(n=>n.open),'practice answer reveal works');
 await answers.first().locator('summary').click();
 check(!await answers.first().evaluate(n=>n.open),'practice answer can be concealed');
 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(nodes=>nodes.map(el=>({
   box:el.getBoundingClientRect().width,svg:el.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===10&&mobile.every(m=>m.box<=391&&m.svg<=m.box+1),
  'diagrams are bounded at 390px mobile viewport');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Journey Inside the Atom');
   renderReaderContent(e);
 });
 check(await figures.count()===10&&await answers.count()===36,
  're-rendering Chapter 8 does not duplicate SVG figures or practice questions');
 for(const [title,figCount,questionCount,cls] of [
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03'],
  ['Describing Motion Around Us',6,15,'science-ch04'],
  ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
  ['How Forces Affect Motion',8,25,'science-ch06'],
  ['Work, Energy, and Simple Machines',10,31,'science-ch07']
 ]){
  await page.evaluate(name=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
   current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
   renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===figCount&&
   await page.locator('#detailed-notes .'+cls+'-question').count()===questionCount&&
   await figures.count()===0,'existing full-depth chapter protected: '+title);
 }
 await page.evaluate(()=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Atomic Foundations of Matter');
   current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
   renderFilters();openTopic(e.title,e.id);
 });
 check(await figures.count()===0,'new atom chapter figures do not leak into Chapter 9 comparison');
 check(jsErrors.length===0,'no uncaught script errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH08 NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
