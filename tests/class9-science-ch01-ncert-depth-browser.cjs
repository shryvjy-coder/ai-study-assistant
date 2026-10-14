/* CBSE Class 9 Science Chapter 1: NCERT Exploration full-note browser regression.
 * Uses an isolated real Flask server, browser, curriculum entry and full notes.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-science-ch01-'));
const port=process.env.TEST_SCIENCE_CH01_PORT||'5156';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'science-ch01-ci-test',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
    DATABASE_PATH:path.join(dir,'studyai.sqlite')},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',chunk=>{stderr=(stderr+String(chunk)).slice(-12000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};

(async()=>{
  let up=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){up=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  check(up,'StudyAI isolated science reader server starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
    !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&
    !!window.STUDYAI_LONG_NOTES_APPLIED);
  const result=await page.evaluate(()=>{
    const topic='Exploration: Entering the World of Secondary Science';
    const science=STUDY_DATA.filter(entry=>entry.board==='CBSE'&&entry.grade==='Class 9'&&entry.subject==='Science');
    const chapter=science.find(entry=>entry.title===topic);
    const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
    const maths=STUDY_DATA.find(entry=>entry.board==='CBSE'&&entry.grade==='Class 9'&&entry.subject==='Mathematics'&&entry.title==='Math of Space: Surface Area and Volume');
    const before=maths?JSON.stringify(window.StudyAIProgress?.outline(maths.id)||[]):'';
    current={board:'CBSE',grade:'Class 9',subject:'Science',topic,topicId:chapter?.id,component:'All components'};
    renderFilters();
    if(chapter)openTopic(topic,chapter.id);
    const notes=document.querySelector('#detailed-notes');
    const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
    const headings=sections.map(section=>section.querySelector('h3')?.textContent.trim());
    const text=notes?.textContent||'';
    return {
      scienceCount:science.length,
      matchesKey:!!chapter?.deepNotes?.overview&&chapter.sourceBook===bank[topic]?.sourceBook,
      bankCount:Object.keys(bank).length,
      titles:headings,
      textLength:text.trim().length,
      paragraphCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
      workedExamples:notes?.querySelectorAll('.worked-box').length||0,
      tips:notes?.querySelectorAll('.exam-box').length||0,
      proseClass:notes?.querySelectorAll('.science-full-notes').length||0,
      noTemplates:!/Chapter overview|Key concepts and explanations|How to reason through this chapter|Quick revision|Self-check/.test(text),
      coverage:['Meghnad Saha','cricket','bicycle','kilograms','pounds','law','theory','humidity','eclipse','10,000','mask'].every(needle=>text.toLowerCase().includes(needle.toLowerCase())),
      scienceOtherUntouched:science.every(entry=>!!entry.deepNotes?.overview),
      mathStillStable:before===JSON.stringify(window.StudyAIProgress?.outline(maths.id)||[]),
      reviewStatus:bank[topic]?.reviewStatus||''
    };
  });
  check(result.scienceCount===13&&result.scienceOtherUntouched,'all 13 original Class 9 Science chapter records remain present');
  check(result.matchesKey&&result.bankCount===8,'Chapter 1 notes remain mapped correctly alongside the new Chapter 2 entry');
  check(result.proseClass===1,'Science Chapter 1 uses real chapter notes rather than generic template');
  check(result.titles.length===5&&new Set(result.titles).size===5,'five cohesive and distinct authored science teaching sections');
  check(result.paragraphCount>=14&&result.textLength>9500,'substantial detailed explanatory text is visible in the actual reader');
  check(result.workedExamples>=7&&result.tips===5,'worked examples and focused exam guidance appear in the reader');
  check(result.noTemplates&&result.coverage,'textbook-specific models, SI units, laws, predictions, estimation and interdisciplinary science are covered');
  check(result.mathStillStable,'Class 9 Maths completion outline remains unchanged');
  check(result.reviewStatus.includes('outstanding'),'full-note source does not falsely claim human editorial certification');
  // Focused audit corrections: only Chapter 1 receives the two authored
  // figures and student-controlled answer reveals. Existing notes stay intact.
  const figures=page.locator('#detailed-notes .science-ch01-figure');
  const questions=page.locator('#detailed-notes .science-ch01-question details');
  check(await figures.count()===2,
    'Chapter 1 includes two authored scientific-model and interdisciplinary diagrams');
  check(await figures.nth(0).getAttribute('data-science-visual')==='model-cycle'&&
      await figures.nth(1).getAttribute('data-science-visual')==='mask-map',
    'diagram types match the accompanying models and interdisciplinary notes');
  check(await figures.locator('svg[role="img"] title').count()===2&&
      await figures.locator('svg[role="img"] desc').count()===2&&
      await figures.locator('figcaption').count()===2,
    'all science illustrations have accessible titles, descriptions and captions');
  check(await questions.count()===5,
    'chapter provides five original self-check questions without extra lesson pages');
  check(await questions.evaluateAll(items=>items.every(item=>!item.open)),
    'self-check answers remain hidden until the student chooses to reveal them');
  await questions.first().locator('summary').click();
  check(await questions.first().evaluate(item=>item.open)&&
      (await questions.first().locator('p').innerText()).includes('air resistance'),
    'self-check answer can be revealed with the native accessible disclosure');
  await questions.first().locator('summary').click();
  check(!await questions.first().evaluate(item=>item.open),
    'students can close the answer again without changing progress');
  const specificText=(await page.locator('#detailed-notes').innerText());
  check(specificText.includes('299,792,458')&&
      specificText.includes('celeritas')&&
      specificText.includes('69 kg')&&
      specificText.includes('pressure and how atoms form ions')&&
      specificText.includes('same initial speed and direction'),
    'historical symbol, completed rice estimation, Saha and model assumptions are taught');
  const scienceFiguresBefore=await figures.count();
  await page.setViewportSize({width:390,height:844});
  const figureGeometry=await figures.evaluateAll(items=>items.map(item=>{
    const rect=item.getBoundingClientRect();
    return {width:rect.width,svgWidth:item.querySelector('svg').getBoundingClientRect().width};
  }));
  check(figureGeometry.length===2&&
      figureGeometry.every(item=>item.width<=391&&item.svgWidth<=item.width+1),
    'science diagrams fit mobile viewport and remain within their figure cards');
  await page.setViewportSize({width:1365,height:900});
  await page.evaluate(()=>{
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Science'&&e.title==='Exploration: Entering the World of Secondary Science');
    renderReaderContent(entry);
  });
  check(await figures.count()===scienceFiguresBefore&&await questions.count()===5,
    're-rendering does not duplicate original diagrams or practice questions');
  check(errors.length===0,'no uncaught JavaScript errors: '+errors.join('; '));
  console.log('CLASS 9 SCIENCE CH01 EXPLORATION REAL-BROWSER REGRESSION PASS');
})().catch(error=>{
  console.error(error);
  console.error(stderr);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
