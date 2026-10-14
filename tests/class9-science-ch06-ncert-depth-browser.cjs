/* StudyAI CBSE Class 9 Science Chapter 6 – NCERT Exploration (2026–27)
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
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch06-'));
const port=process.env.TEST_SCIENCE_CH06_PORT||'5161';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch06-ci-test',
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
   const title='How Forces Affect Motion';
   const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
   const chapter=science.find(e=>e.title===title);
   const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
   const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
     e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
   const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
   const completedBefore=JSON.stringify(state.completed||[]);
   const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
   const reviewBefore=JSON.stringify(state.review||[]);
   current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:chapter?.id,component:'All components'};
   renderFilters();if(chapter)openTopic(title,chapter.id);
   const notes=document.querySelector('#detailed-notes');
   const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
   return {
     found:!!chapter?.id,
     count:science.length,
     original:science.every(e=>!!e.deepNotes?.overview),
     book:chapter?.sourceBook===bank[title]?.sourceBook,
     bankCount:Object.keys(bank).length,
     earlier:['Exploration: Entering the World of Secondary Science','Cell: The Building Block of Life','Tissues in Action','Describing Motion Around Us','Exploring Mixtures and their Separation'].every(t=>!!bank[t]),
     pages:bank[title]?.printedPages,
     status:bank[title]?.reviewStatus,
     headings:sections.map(e=>e.querySelector('h3')?.textContent.trim()),
     pCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
     examples:notes?.querySelectorAll('.worked-box').length||0,
     tips:notes?.querySelectorAll('.exam-box').length||0,
     curatedCount:notes?.querySelectorAll('.science-full-notes').length||0,
     text:notes?.textContent||'',
     stateSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
       completedBefore===JSON.stringify(state.completed||[])&&
       bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
       reviewBefore===JSON.stringify(state.review||[])
   };
 });
 check(content.found&&content.count===13&&content.original,'all thirteen original Science chapter records and ID survive');
 check(content.book&&content.bankCount===12&&content.earlier,'Chapter 6 coexists with five previous curated chapters');
 check(content.pages==='94–115'&&content.status.includes('outstanding'),'NCERT page range and editorial status are honest');
 check(content.curatedCount===1&&content.headings.length===8&&new Set(content.headings).size===8,'eight substantive sections render once');
 check(content.pCount>=40&&content.examples===33&&content.tips===8,'all teaching paragraphs, worked examples and exam tips render');
 const required=['Activity 6.1','Activity 6.2','Activity 6.3','Activity 6.4','Activity 6.5','Activity 6.6','Activity 6.7',
 'net force','normal force','friction','Galileo','inertia','1 newton','1 kg·m/s²',
 'F_net = ma','9.8 m/s²','cricket','airbag','25 kg','50 N','55 N','0.4 m',
 '1500 kg','3000 N','velocity-time','spring balance','third law','different objects',
 'internal tension','m₁ + m₂','momentum','free-body diagram','tractor'];
 const missing=required.filter(x=>!content.text.toLowerCase().includes(x.toLowerCase()));
 check(missing.length===0,'all core textbook competencies appear: '+missing.join(', '));
 check(content.stateSafe,'Maths outline, saved completion, bookmarks and review data untouched');

 const figs=page.locator('#detailed-notes .science-ch06-figure');
 const questions=page.locator('#detailed-notes .science-ch06-question details');
 check(await figs.count()===8,'eight original diagrams render');
 const actual=await figs.evaluateAll(nodes=>nodes.map(n=>n.dataset.scienceVisual));
 check(JSON.stringify(actual)===JSON.stringify(['forces','friction','inertia','second','weight','graph','third','system']),
  'diagrams are inserted in correct sections');
 check(await figs.locator('svg[role="img"] title').count()===8&&
  await figs.locator('svg[role="img"] desc').count()===8&&
  await figs.locator('figcaption').count()===8,'all figures have accessible title, description and caption');
 check(await questions.count()===25&&await questions.evaluateAll(nodes=>nodes.every(n=>!n.open)),
  'all 25 answer disclosures initially closed');
 await questions.first().locator('summary').click();
 check(await questions.first().evaluate(n=>n.open),'practice answer opens when selected');
 await questions.first().locator('summary').click();
 check(!await questions.first().evaluate(n=>n.open),'practice answer closes when selected');
 await page.setViewportSize({width:390,height:844});
 const widths=await figs.evaluateAll(nodes=>nodes.map(n=>({fig:n.getBoundingClientRect().width,svg:n.querySelector('svg').getBoundingClientRect().width})));
 check(widths.length===8&&widths.every(n=>n.fig<=391&&n.svg<=n.fig+1),'all figures fit 390px mobile viewport');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='How Forces Affect Motion');
  renderReaderContent(e);
 });
 check(await figs.count()===8&&await questions.count()===25,'rendering again does not duplicate diagrams or questions');
 for(const [title,figCount,qCount,css] of [
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03'],
  ['Describing Motion Around Us',6,15,'science-ch04'],
  ['Exploring Mixtures and their Separation',7,17,'science-ch05']
 ]) {
  await page.evaluate(name=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
    renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+css+'-figure').count()===figCount&&
        await page.locator('#detailed-notes .'+css+'-question').count()===qCount&&
        await page.locator('#detailed-notes .science-ch06-figure').count()===0,
        'older chapters and visuals intact: '+title);
 }
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Work, Energy, and Simple Machines');
  current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
  renderFilters();openTopic(e.title,e.id);
 });
 check(await page.locator('#detailed-notes .science-ch06-figure').count()===0&&
 await page.locator('#detailed-notes .science-ch06-question').count()===0,'Chapter 6 enhancements do not leak into Chapter 7');
 check(jsErrors.length===0,'no unexpected browser JavaScript errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH06 NCERT BROWSER REGRESSION PASS');
})().catch(error=>{console.error(error);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
