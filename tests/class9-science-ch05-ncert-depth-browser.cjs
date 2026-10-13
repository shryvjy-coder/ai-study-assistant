/* StudyAI CBSE Class 9 Science Chapter 5 – NCERT Exploration (2026–27)
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
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch05-'));
const port=process.env.TEST_SCIENCE_CH05_PORT||'5160';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch05-ci-test',
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
  const title='Exploring Mixtures and their Separation';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const chapter=science.find(e=>e.title===title);
  const curated=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
    e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const beforeMath=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const beforeCompleted=JSON.stringify(state.completed||[]);
  const beforeBookmarks=JSON.stringify(state.bookmarks||[]);
  const beforeReview=JSON.stringify(state.review||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',
    topic:title,topicId:chapter?.id,component:'All components'};
  renderFilters();if(chapter)openTopic(title,chapter.id);
  const notes=document.querySelector('#detailed-notes');
  const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return {
   chapterFound:!!chapter?.id,scienceCount:science.length,
   allOriginal:science.every(e=>!!e.deepNotes?.overview),
   bookMatches:chapter?.sourceBook===curated[title]?.sourceBook,
   bankCount:Object.keys(curated).length,
   previousTitles:['Exploration: Entering the World of Secondary Science','Cell: The Building Block of Life',
     'Tissues in Action','Describing Motion Around Us'].every(title=>!!curated[title]),
   printedPages:curated[title]?.printedPages||'',
   reviewStatus:curated[title]?.reviewStatus||'',
   headings:sections.map(e=>e.querySelector('h3')?.textContent.trim()),
   paragraphCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
   exampleCount:notes?.querySelectorAll('.worked-box').length||0,
   tipCount:notes?.querySelectorAll('.exam-box').length||0,
   curatedCount:notes?.querySelectorAll('.science-full-notes').length||0,
   text:notes?.textContent||'',
   mathUnchanged:beforeMath===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):''),
   completionUnchanged:beforeCompleted===JSON.stringify(state.completed||[]),
   bookmarksUnchanged:beforeBookmarks===JSON.stringify(state.bookmarks||[]),
   reviewUnchanged:beforeReview===JSON.stringify(state.review||[])
  };
 });
 check(content.chapterFound&&content.scienceCount===13&&content.allOriginal,
  'all 13 original Class 9 Science records and stable Chapter 5 ID remain');
 check(content.bookMatches&&content.bankCount===5&&content.previousTitles,
  'curated Chapter 5 coexists with the four previously upgraded chapters');
 check(content.printedPages==='72–93'&&content.reviewStatus.includes('outstanding'),
  'textbook pages are correct and notes do not falsely claim teacher certification');
 check(content.curatedCount===1&&content.headings.length===8&&new Set(content.headings).size===8,
  'eight cohesive curated teaching sections display once');
 check(content.paragraphCount>=30&&content.exampleCount===34&&content.tipCount===8,
  'complete teaching prose, 34 worked examples and exam guidance are visible');

 const terms=['Activity 5.1','Activity 5.2','Activity 5.3','Activity 5.4','Activity 5.5',
  'Activity 5.6','Activity 5.7','Activity 5.8','Activity 5.9',
  '% m/m','% m/v','% v/v','10% m/m','5% m/v','20% v/v','15% sugar','84% flour',
  '287','241','46 g','40°C','60°C','solubility','crystallisation',
  'fractional distillation','25°C','chromatography','capillary',
  'sublimation','deposition','separating funnel','paperfuge','coagulation',
  'Tyndall','emulsion','dispersed phase','dispersion medium',
  'Dilip Mahalanabis','Kannauj','panga','karkatch','colloid'];
 const missing=terms.filter(t=>!content.text.toLowerCase().includes(t.toLowerCase()));
 check(missing.length===0,'all major NCERT competencies and worked results appear: '+missing.join(', '));
 check(content.mathUnchanged&&content.completionUnchanged&&
   content.bookmarksUnchanged&&content.reviewUnchanged,
  'Maths outline and stored completion, bookmarks and reviews were not changed');

 const figures=page.locator('#detailed-notes .science-ch05-figure');
 const selfChecks=page.locator('#detailed-notes .science-ch05-question details');
 check(await figures.count()===7,'seven original curriculum-specific SVG figures render');
 const expected=['mixtures','concentration','solubility','distillation','chromatography','separations','colloid'];
 const actual=await figures.evaluateAll(nodes=>nodes.map(x=>x.dataset.scienceVisual));
 check(JSON.stringify(actual)===JSON.stringify(expected),'each science figure is in the correct topic');
 check(await figures.locator('svg[role="img"] title').count()===7&&
  await figures.locator('svg[role="img"] desc').count()===7&&
  await figures.locator('figcaption').count()===7,
  'each instructional diagram has accessible title, description and caption');
 check(await selfChecks.count()===17&&
  await selfChecks.evaluateAll(nodes=>nodes.every(x=>!x.open)),
  'seventeen practice answers start concealed');
 await selfChecks.first().locator('summary').click();
 check(await selfChecks.first().evaluate(node=>node.open)&&
   (await selfChecks.first().locator('p').innerText()).includes('No'),
  'student can open an answer by clicking native disclosure');
 await selfChecks.first().locator('summary').click();
 check(!await selfChecks.first().evaluate(node=>node.open),'answer can be closed again');

 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(nodes=>nodes.map(n=>({
  fig:n.getBoundingClientRect().width,
  svg:n.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===7&&mobile.every(x=>x.fig<=391&&x.svg<=x.fig+1),
  'all seven diagrams fit a 390px mobile reader');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
   x.subject==='Science'&&x.title==='Exploring Mixtures and their Separation');
  renderReaderContent(e);
 });
 check(await figures.count()===7&&await selfChecks.count()===17,
  're-rendering does not duplicate diagrams or independent practice');

 for(const [title,figCount,qCount,css] of [
  ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
  ['Cell: The Building Block of Life',3,11,'science-ch02'],
  ['Tissues in Action',6,13,'science-ch03'],
  ['Describing Motion Around Us',6,15,'science-ch04']
 ]){
  await page.evaluate(name=>{
   const chapter=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
     e.subject==='Science'&&e.title===name);
   current={board:chapter.board,grade:chapter.grade,subject:chapter.subject,
     topic:name,topicId:chapter.id};
   renderFilters();openTopic(name,chapter.id);
  },title);
  check(await page.locator('#detailed-notes .'+css+'-figure').count()===figCount&&
    await page.locator('#detailed-notes .'+css+'-question').count()===qCount&&
    await page.locator('#detailed-notes .science-ch05-figure').count()===0,
    'prior chapter visuals and checks survive without leakage: '+title);
 }
 await page.evaluate(()=>{
  const title='How Forces Affect Motion';
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Science'&&e.title===title);
  current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:title,topicId:entry.id};
  renderFilters();openTopic(title,entry.id);
 });
 check(await page.locator('#detailed-notes .science-ch05-figure').count()===0&&
  await page.locator('#detailed-notes .science-ch05-question').count()===0,
  'Chapter 5 enhancements do not leak into Chapter 6');
 check(jsErrors.length===0,'no uncaught JavaScript errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH05 EXPLORATION BROWSER REGRESSION PASS');
})().catch(error=>{console.error(error);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
