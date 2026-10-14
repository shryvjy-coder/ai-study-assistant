/* StudyAI CBSE Class 9 Science Chapter 7 – NCERT Exploration (2026–27)
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
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch07-'));
const port=process.env.TEST_SCIENCE_CH07_PORT||'5162';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch07-ci-test',
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
  const title='Work, Energy, and Simple Machines';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&
   e.title==='Math of Space: Surface Area and Volume');
  const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const beforeCompleted=JSON.stringify(state.completed||[]);
  const beforeBookmarks=JSON.stringify(state.bookmarks||[]);
  const beforeReview=JSON.stringify(state.review||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();if(entry)openTopic(title,entry.id);
  const notes=document.querySelector('#detailed-notes');
  const blocks=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return {
    found:!!entry?.id,scienceCount:science.length,
    original:science.every(e=>!!e.deepNotes?.overview),
    correctBook:entry?.sourceBook===bank[title]?.sourceBook,
    bankCount:Object.keys(bank).length,
    previous:['Exploration: Entering the World of Secondary Science',
      'Cell: The Building Block of Life','Tissues in Action',
      'Describing Motion Around Us','Exploring Mixtures and their Separation',
      'How Forces Affect Motion'].every(name=>!!bank[name]),
    printedPages:bank[title]?.printedPages||'',reviewStatus:bank[title]?.reviewStatus||'',
    headings:blocks.map(el=>el.querySelector('h3')?.textContent.trim()),
    pCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
    exampleCount:notes?.querySelectorAll('.worked-box').length||0,
    tipCount:notes?.querySelectorAll('.exam-box').length||0,
    notesCount:notes?.querySelectorAll('.science-full-notes').length||0,
    text:notes?.textContent||'',
    stateSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
      beforeCompleted===JSON.stringify(state.completed||[])&&
      beforeBookmarks===JSON.stringify(state.bookmarks||[])&&
      beforeReview===JSON.stringify(state.review||[])
  };
 });
 check(content.found&&content.scienceCount===13&&content.original,
  'all 13 original Class 9 Science records and Chapter 7 identity intact');
 check(content.correctBook&&content.bankCount===9&&content.previous,
  'Chapter 7 correct book and six previous detailed Science chapters coexist');
 check(content.printedPages==='116–139'&&content.reviewStatus.includes('outstanding'),
  'page references correct and editorial approval is not overstated');
 check(content.notesCount===1&&content.headings.length===10&&new Set(content.headings).size===10,
  'ten complete authored lesson sections render without duplication');
 check(content.pCount>=50&&content.exampleCount===50&&content.tipCount===10,
  '50 teaching paragraphs, 50 worked examples and all ten exam tips render');
 const required=['Activity 7.1','Activity 7.2','Activity 7.3','Activity 7.4','Activity 7.5',
  'Example 7.1','Example 7.2','Example 7.3','Example 7.4','Example 7.5',
  'Example 7.6','Example 7.7','Example 7.8','Example 7.9','Example 7.10',
  'Example 7.11','Example 7.12','Example 7.13',
  'joule','kg·m²/s²','perpendicular','−30 J','force–displacement',
  '150 J','√66','work–kinetic energy','ΔK','184.9 J','70 m/s',
  'ΔU = mg','potential energy','pendulum','√(2gh)','20 m',
  '300 W','20,000 W','horsepower','fixed pulley','movable pulley',
  'MA = Load/Effort','L/h','seesaw','n₁L₁','Class III','gharat',
  'air resistance','5 cm','5.025 cm'];
 const missing=required.filter(term=>!content.text.toLowerCase().includes(term.toLowerCase()));
 check(missing.length===0,'NCERT methods, graphs, worked numericals and machines covered: '+missing.join(', '));
 check(content.stateSafe,'no changes to Maths progress or saved completion, bookmarks and review state');

 const figures=page.locator('#detailed-notes .science-ch07-figure');
 const answers=page.locator('#detailed-notes .science-ch07-question details');
 check(await figures.count()===10,'ten original curriculum-specific SVG figures show');
 const expected=['work','forcegraph','transfers','kinetic','potential','conservation',
  'power','pulley','incline','lever'];
 const actual=await figures.evaluateAll(nodes=>nodes.map(n=>n.dataset.scienceVisual));
 check(JSON.stringify(actual)===JSON.stringify(expected),'illustrations attach to correct topic');
 check(await figures.locator('svg[role="img"] title').count()===10&&
  await figures.locator('svg[role="img"] desc').count()===10&&
  await figures.locator('figcaption').count()===10,
  'all SVGs have accessible title, description and caption');
 check(await answers.count()===31&&await answers.evaluateAll(nodes=>nodes.every(n=>!n.open)),
  '31 practice answers initially remain hidden');
 await answers.first().locator('summary').click();
 check(await answers.first().evaluate(n=>n.open),'students can reveal practice answers');
 await answers.first().locator('summary').click();
 check(!await answers.first().evaluate(n=>n.open),'practice answers can be concealed again');
 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(nodes=>nodes.map(el=>({
  width:el.getBoundingClientRect().width,
  svg:el.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===10&&mobile.every(m=>m.width<=391&&m.svg<=m.width+1),
  'all 10 diagrams fit narrow mobile viewport');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&
    x.title==='Work, Energy, and Simple Machines');
  renderReaderContent(e);
 });
 check(await figures.count()===10&&await answers.count()===31,
  're-rendering Chapter 7 does not double its figures or question controls');
 for(const [title,fCount,qCount,cls] of [
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03'],
  ['Describing Motion Around Us',6,15,'science-ch04'],
  ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
  ['How Forces Affect Motion',8,25,'science-ch06']
 ]){
  await page.evaluate(name=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
    renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===fCount&&
    await page.locator('#detailed-notes .'+cls+'-question').count()===qCount&&
    await page.locator('#detailed-notes .science-ch07-figure').count()===0,
    'previous Science chapter unaffected: '+title);
 }
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Journey Inside the Atom');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 });
 check(await page.locator('#detailed-notes .science-ch07-figure').count()===0,
  'Chapter 7 diagrams never leak into Chapter 8');
 check(jsErrors.length===0,'no uncaught JS errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH07 NCERT BROWSER REGRESSION PASS');
})().catch(error=>{console.error(error);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
