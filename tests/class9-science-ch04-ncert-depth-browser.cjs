/* StudyAI Class 9 Science Chapter 4: original NCERT motion lesson browser regression.
 * Real Flask app; verify physics numericals, SVG educational content, earlier
 * chapters and account progress persistence at desktop and narrow mobile widths.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch04-'));
const port=process.env.TEST_SCIENCE_CH04_PORT||'5159';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch04-ci-test',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(temp,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',data=>{stderr=(stderr+String(data)).slice(-14000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};
(async()=>{
 let online=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){online=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(online,'isolated StudyAI test server launches');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
  !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const result=await page.evaluate(()=>{
  const title='Describing Motion Around Us';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const mathOutlineBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completedBefore=JSON.stringify(state.completed||[]);
  const bookmarkBefore=JSON.stringify(state.bookmarks||[]);
  const reviewBefore=JSON.stringify(state.review||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();
  if(entry)openTopic(title,entry.id);
  const notes=document.querySelector('#detailed-notes');
  const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return {
   scienceCount:science.length,
   allLegacyExist:science.every(e=>!!e.deepNotes?.overview),
   exists:!!entry,
   matchingBook:entry?.sourceBook===bank[title]?.sourceBook,
   bankCount:Object.keys(bank).length,
   previouslyAudited:['Exploration: Entering the World of Secondary Science',
    'Cell: The Building Block of Life','Tissues in Action'].every(t=>!!bank[t]),
   sourcePages:bank[title]?.printedPages,
   editorialReview:bank[title]?.reviewStatus,
   headings:sections.map(x=>x.querySelector('h3')?.textContent.trim()),
   paragraphCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
   exampleCount:notes?.querySelectorAll('.worked-box').length||0,
   tipCount:notes?.querySelectorAll('.exam-box').length||0,
   richCount:notes?.querySelectorAll('.science-full-notes').length||0,
   text:notes?.textContent||'',
   mathStable:mathOutlineBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):''),
   completionStable:completedBefore===JSON.stringify(state.completed||[]),
   bookmarksStable:bookmarkBefore===JSON.stringify(state.bookmarks||[]),
   reviewStable:reviewBefore===JSON.stringify(state.review||[])
  };
 });
 check(result.scienceCount===13&&result.exists&&result.allLegacyExist,
  'the original thirteen Science chapter records and Chapter 4 identity are preserved');
 check(result.matchingBook&&result.bankCount===5&&result.previouslyAudited,
  'four curated Science chapters coexist with their original course keys');
 check(result.sourcePages==='48–71'&&result.editorialReview.includes('outstanding'),
  'source pages are correct and editorial certification remains pending');
 check(result.richCount===1&&result.headings.length===7&&new Set(result.headings).size===7,
  'new Chapter 4 displays seven coherent teaching topics exactly once');
 check(result.paragraphCount>=32&&result.exampleCount===29&&result.tipCount===7,
  'detailed instruction, twenty-nine solved numericals and exam tips are present');
 const needleList=[
  'displacement','160 m','Ganitakaumudi','Aryabhatiya','postmen',
  'average speed','average velocity','average acceleration','−12',
  '9.8 m/s²','Activity 4.1','Activity 4.3','Activity 4.4',
  'position–time','velocity–time','Δposition','slope','trapezium',
  'rectangle','triangle','100 m','0.5 m/s²','310 m',
  'v = u + at','s = ut + ½at²','v² = u² + 2as',
  '28.125','112.5','reaction distance','25 m','2πR/T',
  'tangent','marble','one-dimensional'
 ];
 const missing=needleList.filter(word=>!result.text.toLowerCase().includes(word.toLowerCase()));
 check(missing.length===0,'chapter-specific textbook physics and solved steps are rendered: '+missing.join(', '));
 check(result.mathStable&&result.completionStable&&result.bookmarksStable&&result.reviewStable,
  'Maths outline and persistent user completion/bookmark/review data remain unchanged');

 const figures=page.locator('#detailed-notes .science-ch04-figure');
 const selfChecks=page.locator('#detailed-notes .science-ch04-question details');
 check(await figures.count()===6,'six original motion-and-graph diagrams render');
 const expected=['position','rates','position-graph','velocity-area','equations','circle'];
 const actual=await figures.evaluateAll(items=>items.map(e=>e.dataset.scienceVisual));
 check(JSON.stringify(actual)===JSON.stringify(expected),
  'instructional SVGs appear beside the correct motion concepts');
 check(await figures.locator('svg[role="img"] title').count()===6&&
  await figures.locator('svg[role="img"] desc').count()===6&&
  await figures.locator('figcaption').count()===6,
  'every math diagram has a programmatic title, description and explanatory caption');
 check(await selfChecks.count()===15&&
  await selfChecks.evaluateAll(items=>items.every(el=>!el.open)),
  'all fifteen optional self-check answers start hidden');
 await selfChecks.first().locator('summary').click();
 check(await selfChecks.first().evaluate(el=>el.open)&&
  (await selfChecks.first().locator('p').innerText()).includes('No'),
  'self-check answer opens on student request');
 await selfChecks.first().locator('summary').click();
 check(!await selfChecks.first().evaluate(el=>el.open),
  'answer reveal can be closed again');

 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(items=>items.map(el=>({
  figureWidth:el.getBoundingClientRect().width,
  svgWidth:el.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===6&&mobile.every(item=>item.figureWidth<=391&&item.svgWidth<=item.figureWidth+1),
  'all SVG diagrams fit 390px mobile viewport');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Science'&&e.title==='Describing Motion Around Us');
  renderReaderContent(entry);
 });
 check(await figures.count()===6&&await selfChecks.count()===15,
  're-rendering neither duplicates nor drops diagrams/practice');

 const earlier=[
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03']
 ];
 for(const [title,expectedFigures,expectedQuestions,cssClass] of earlier){
  await page.evaluate(name=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
   current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
   renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cssClass+'-figure').count()===expectedFigures&&
   await page.locator('#detailed-notes .'+cssClass+'-question').count()===expectedQuestions&&
   await page.locator('#detailed-notes .science-ch04-figure').count()===0,
   'previous Science chapter remains fully readable and independent: '+title);
 }
 await page.evaluate(()=>{
  const title='Exploring Mixtures and their Separation';
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===title);
  current={board:e.board,grade:e.grade,subject:e.subject,topic:title,topicId:e.id};
  renderFilters();openTopic(title,e.id);
 });
 check(await page.locator('#detailed-notes .science-ch04-figure').count()===0&&
  await page.locator('#detailed-notes .science-ch04-question').count()===0,
  'Chapter 4 enhancements cannot leak into Chapter 5');
 check(errors.length===0,'no uncaught JavaScript errors: '+errors.join('; '));
 console.log('CLASS 9 SCIENCE CH04 EXPLORATION BROWSER REGRESSION PASS');
})().catch(error=>{
 console.error(error);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
