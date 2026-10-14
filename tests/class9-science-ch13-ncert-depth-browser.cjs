/* StudyAI CBSE Class 9 Science Chapter 13 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, earth spheres, radiative heating, circulation and nutrient cycling, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch13-'));
const port=process.env.TEST_SCIENCE_CH13_PORT||'5168';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch13-ci-test',
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
 // Optional first-run onboarding may appear after load and intercept browser clicks.
 // Close the dialog during tests; production onboarding remains untouched.
 await page.addLocatorHandler(page.locator('#studyai-onboarding[open]'),async()=>{
  await page.evaluate(()=>{const dialog=document.querySelector('#studyai-onboarding');if(dialog?.open)dialog.close();});
 });
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
   !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const result=await page.evaluate(()=>{
  const title='Earth as a System: Energy, Matter, and Life';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completeBefore=JSON.stringify(state.completed||[]);
  const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
  const reviewBefore=JSON.stringify(state.review||[]);
  const scienceIdsBefore=JSON.stringify(science.map(e=>e.id));
  const otherRecordsBefore=STUDY_DATA.filter(e=>!(e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science')).length;
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();if(entry)openTopic(title,entry.id);
  const notes=document.querySelector('#detailed-notes');
  const blocks=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return {
    found:!!entry?.id,
    original:science.length===13&&science.every(e=>!!e.deepNotes?.overview),
    all13:science.every(e=>!!bank[e.title]&&bank[e.title].sourcePdf===e.noteSourceFile),
    all13Names:science.map(e=>e.title),
    allUniqueIds:new Set(science.map(e=>e.id)).size===13,
    sourceSame:entry?.sourceBook===bank[title]?.sourceBook,
    bankCount:Object.keys(bank).length,
    pdf:bank[title]?.sourcePdf||'',pages:bank[title]?.printedPages||'',
    review:bank[title]?.reviewStatus||'',
    headings:blocks.map(el=>el.querySelector('h3')?.textContent.trim()),
    paragraphs:notes?.querySelectorAll('.actual-note-topic > p').length||0,
    worked:notes?.querySelectorAll('.worked-box').length||0,
    tips:notes?.querySelectorAll('.exam-box').length||0,
    curated:notes?.querySelectorAll('.science-full-notes').length||0,
    text:notes?.textContent||'',
    progressSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
      completeBefore===JSON.stringify(state.completed||[])&&
      bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
      reviewBefore===JSON.stringify(state.review||[])&&
      scienceIdsBefore===JSON.stringify(science.map(e=>e.id))&&
      otherRecordsBefore===STUDY_DATA.filter(e=>!(e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science')).length
  };
 });
 check(result.found&&result.original&&result.sourceSame&&result.allUniqueIds,
   'all 13 original CBSE Grade 9 Science chapter IDs and source metadata remain unchanged');
 check(result.bankCount===13&&result.all13,
   'ALL 13 Science textbook chapters now have loaded full-depth curated notes');
 check(result.pdf==='iesc113.pdf'&&result.pages==='252–268'&&result.review.includes('outstanding'),
   'NCERT Grade 9 2026 chapter source and outstanding editorial review disclosed');
 check(result.curated===1&&result.headings.length===15&&new Set(result.headings).size===15,
   '15 standalone Earth systems sections displayed once in the real reader');
 check(result.paragraphs>=129&&result.worked===134&&result.tips===15,
   '129 explanatory paragraphs, 134 worked examples and 15 exam tips appear');
 const terms=['Activity 13.1','Activity 13.2','Table 13.1','Table 13.2','Example 13.1',
  'Pause and Ponder 1','Pause and Ponder 2','Pause and Ponder 3',
  'Pause and Ponder 4','Pause and Ponder 5','Pause and Ponder 6',
  'Geosphere','Hydrosphere','Cryosphere','Atmosphere','Biosphere','Arabian Sea',
  'Solar constant','1.4 kW','1 kW','3.6 × 10⁶','Anna Mani','1981','c =','3 × 10⁸',
  'snow albedo','0.80','0.50','0.25','urban heat island','Q12',
  'Troposphere','Stratosphere','6.5 °C','Ramanathan','Montreal Protocol',
  'greenhouse','CO₂','CH₄','ozone','infrared','CFC',
  'valley breeze','mountain breeze','0°','30°','60°','90°',
  'Coriolis','right','left','gyres','Gulf Stream','North Atlantic Drift','IITM',
  'evaporation','condensation','precipitation','infiltration','groundwater',
  'Keeling Curve','315 ppm','420 ppm','sawtooth','33.3%',
  'Rhizobium','Azotobacter','Nitrosomonas','Nitrobacter','Pseudomonas',
  'NH₃','NO₂⁻','NO₃⁻','Haber–Bosch','assimilation','ammonification','denitrification',
  'oxygen cycle','photosynthesis','respiration','eutrophication','algal bloom','Mission LiFE',
  'NCERT Q1','NCERT Q2','NCERT Q3','NCERT Q4','NCERT Q5','NCERT Q6',
  'NCERT Q7','NCERT Q8','NCERT Q9','NCERT Q10','NCERT Q11','NCERT Q12',
  'NCERT Q13','NCERT Q14','NCERT Q15'];
 const missing=terms.filter(x=>!result.text.toLowerCase().includes(x.toLowerCase()));
 check(missing.length===0,
   'full NCERT Chapter 13 coverage including every exercise, six pauses, units and chemical ions: '+missing.join(', '));
 check(result.progressSafe,'existing Science IDs, Maths outlines, saved progress and non-Science record counts preserved');
 const diagrams=page.locator('#detailed-notes .science-ch13-figure');
 const questions=page.locator('#detailed-notes .science-ch13-question details');
 check(await diagrams.count()===15,'15 original science diagrams displayed');
 const ids=['spheres','solar','albedo','latitude','layers','greenhouse','breezes','winds',
  'currents','water','carbon','nitrogen','oxygen','impacts','exercises'];
 check(JSON.stringify(await diagrams.evaluateAll(ns=>ns.map(n=>n.dataset.scienceVisual)))===JSON.stringify(ids),
   '15 figures correctly placed in corresponding teaching sections');
 check(await diagrams.locator('svg[role="img"] title').count()===15&&
  await diagrams.locator('svg[role="img"] desc').count()===15&&
  await diagrams.locator('figcaption').count()===15,
  'each accessible original figure has a title, desc and explanatory caption');
 check(await diagrams.nth(1).textContent().then(t=>t.includes('3.6 × 10⁶')&&t.includes('1 kWh')),
  'NCERT Example 13.1 numerical answer appears on original solar-energy illustration');
 check(await diagrams.nth(10).textContent().then(t=>t.includes('315 ppm')&&t.includes('420 ppm')),
  'Keeling graph has labelled historical textbook endpoints');
 check(await diagrams.nth(11).textContent().then(t=>t.includes('Rhizobium')&&t.includes('Nitrosomonas')&&t.includes('Nitrobacter')),
  'nitrogen-cycle drawing identifies key bacterial transformations');
 check(await questions.count()===72&&await questions.evaluateAll(ns=>ns.every(n=>!n.open)),
  '72 independent self-check answers start hidden');
 await questions.first().locator('summary').click();
 check(await questions.first().evaluate(n=>n.open),'self-check question reveals answer on click');
 await questions.first().locator('summary').click();
 check(!await questions.first().evaluate(n=>n.open),'self-check answer collapses again');
 await page.setViewportSize({width:390,height:844});
 const mobile=await diagrams.evaluateAll(ns=>ns.map(n=>({
   outer:n.getBoundingClientRect().width,svg:n.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===15&&mobile.every(n=>n.outer<=391&&n.svg<=n.outer+1),
  'all 15 SVGs remain within a 390px mobile screen');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
  renderReaderContent(e);
 });
 check(await diagrams.count()===15&&await questions.count()===72,
   'repeated render produces no duplicate SVGs or answer-reveal items');
 for(const [title,figCount,questionCount,cls] of [
   ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
   ['Cell: The Building Block of Life',3,11,'science-ch02'],
   ['Tissues in Action',6,13,'science-ch03'],
   ['Describing Motion Around Us',6,15,'science-ch04'],
   ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
   ['How Forces Affect Motion',8,25,'science-ch06'],
   ['Work, Energy, and Simple Machines',10,31,'science-ch07'],
   ['Journey Inside the Atom',10,36,'science-ch08'],
   ['Atomic Foundations of Matter',11,44,'science-ch09'],
   ['Sound Waves: Characteristics and Applications',12,49,'science-ch10'],
   ['Reproduction: How Life Continues',15,62,'science-ch11'],
   ['Patterns in Life: Diversity and Classification',15,74,'science-ch12']
 ]){
  await page.evaluate(name=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
    renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===figCount&&
    await page.locator('#detailed-notes .'+cls+'-question').count()===questionCount&&
    await diagrams.count()===0,
    'previous full-depth Science chapter preserved in browser: '+title);
 }
 await page.evaluate(()=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='Math of Space: Surface Area and Volume');
   current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
   renderFilters();openTopic(e.title,e.id);
 });
 check(await diagrams.count()===0,'Chapter 13 diagrams cannot leak into unrelated Mathematics topics');
 check(jsErrors.length===0,'no JavaScript browser runtime errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH13 ALL-CHAPTER NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
