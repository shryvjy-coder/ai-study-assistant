/* CBSE Class 9 Science Chapter 2 — textbook-specific browser regression.
 * An isolated local StudyAI Flask server checks the actual notes reader,
 * chapter preservation, diagrams, self-check interactivity and mobile layout.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-science-ch02-'));
const port=process.env.TEST_SCIENCE_CH02_PORT||'5157';
const base='http://127.0.0.1:'+port;
const {chromium}=require('playwright');
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'science-ch02-ci-test',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
    DATABASE_PATH:path.join(dir,'studyai.sqlite')},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',chunk=>{stderr=(stderr+String(chunk)).slice(-14000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};

(async()=>{
  let up=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){up=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  check(up,'isolated StudyAI reader server starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
  const jsErrors=[];
  page.on('pageerror',error=>jsErrors.push(error.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
    !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&
    !!window.STUDYAI_LONG_NOTES_APPLIED);

  const result=await page.evaluate(()=>{
    const title='Cell: The Building Block of Life';
    const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&
      e.grade==='Class 9'&&e.subject==='Science');
    const entry=science.find(e=>e.title===title);
    const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
    const mathOutlineBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
    const progressBefore=JSON.stringify(state.studyaiLessonProgress||{});
    const completedBefore=JSON.stringify(state.completed);
    current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,
      topicId:entry?.id,component:'All components'};
    renderFilters();
    if(entry)openTopic(title,entry.id);
    const notes=document.querySelector('#detailed-notes');
    const sections=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
    const headings=sections.map(s=>s.querySelector('h3')?.textContent.trim());
    const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES;
    const authored=bank?.[title];
    return {
      count:science.length, chapterFound:!!entry,
      bookMapped:entry?.sourceBook===authored?.sourceBook,
      originalPreserved:science.every(e=>!!e.deepNotes?.overview),
      bankCount:Object.keys(bank||{}).length,
      hasChapter1:!!bank?.['Exploration: Entering the World of Secondary Science'],
      pageRange:authored?.printedPages,
      reviewStatus:authored?.reviewStatus,
      headings,
      paragraphs:notes?.querySelectorAll('.actual-note-topic > p').length||0,
      examples:notes?.querySelectorAll('.worked-box').length||0,
      tips:notes?.querySelectorAll('.exam-box').length||0,
      fullNotes:notes?.querySelectorAll('.science-full-notes').length||0,
      renderedText:notes?.textContent||'',
      mathOutlineUnchanged:mathOutlineBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):''),
      progressUnchanged:progressBefore===JSON.stringify(state.studyaiLessonProgress||{}),
      completedUnchanged:completedBefore===JSON.stringify(state.completed)
    };
  });
  check(result.chapterFound&&result.count===13&&result.originalPreserved,
    'all 13 Class 9 Science chapter IDs and legacy records remain present');
  check(result.bookMapped&&result.bankCount===3&&result.hasChapter1,
    'Chapter 2 authored notes are selected without replacing Chapter 1');
  check(result.pageRange==='8–27'&&result.reviewStatus.includes('outstanding'),
    'chapter source cites correct printed pages without editorial certification claim');
  check(result.fullNotes===1&&result.headings.length===8&&
      new Set(result.headings).size===8,'eight coherent teaching sections render once');
  check(result.paragraphs>=35&&result.examples>=18&&result.tips===8,
    'substantial teaching text, worked examples and practical exam tips appear');
  const needles=[
    'Puga Valley','0.1 mm','5000','200 µm','400×',
    'fluid-mosaic','hypotonic','hypertonic','isotonic',
    'plasmolysis','cellulose','chitin','peptidoglycan',
    'nucleoid','nucleolus','Virchow','Haberlandt','Venter',
    'rough ER','Golgi','lysosomes','mitochondria','chromoplasts','leucoplasts',
    'vacuole','mitosis','meiosis','polar bodies','contact inhibition',
    'programmed cell death','sugar','potato'
  ];
  const missing=needles.filter(word=>!result.renderedText.toLowerCase().includes(word.toLowerCase()));
  check(missing.length===0,'all NCERT core topics and corrected details are visible: '+missing.join(', '));
  check(result.mathOutlineUnchanged&&result.progressUnchanged&&result.completedUnchanged,
    'reading Chapter 2 leaves Maths outline and saved completion unchanged');

  const diagrams=page.locator('#detailed-notes .science-ch02-figure');
  const checks=page.locator('#detailed-notes .science-ch02-question details');
  check(await diagrams.count()===3,
    'authored osmosis, protein-processing and division diagrams appear');
  check(JSON.stringify(await diagrams.evaluateAll(items=>items.map(x=>x.dataset.scienceVisual)))===
     JSON.stringify(['osmosis-plant','protein-path','division']),
    'each diagram is placed in its teaching section');
  check(await diagrams.locator('svg[role="img"] title').count()===3&&
      await diagrams.locator('svg[role="img"] desc').count()===3&&
      await diagrams.locator('figcaption').count()===3,
    'diagrams contain accessible labels, long descriptions and explanatory captions');
  check(await checks.count()===11&&
      await checks.evaluateAll(items=>items.every(x=>!x.open)),
    'eleven optional self-check answers start closed');
  await checks.first().locator('summary').click();
  check(await checks.first().evaluate(x=>x.open)&&
      (await checks.first().locator('p').innerText()).includes('Resolution'),
    'student can reveal a worked self-check explanation');
  await checks.first().locator('summary').click();
  check(!await checks.first().evaluate(x=>x.open),
    'student can conceal an answer again');

  await page.setViewportSize({width:390,height:844});
  const mobile=await diagrams.evaluateAll(items=>items.map(el=>{
    const a=el.getBoundingClientRect();
    const b=el.querySelector('svg').getBoundingClientRect();
    return {width:a.width,svgWidth:b.width};
  }));
  check(mobile.length===3&&mobile.every(v=>v.width<=391&&v.svgWidth<=v.width+1),
    'all three explanatory diagrams fit a 390px mobile viewport');
  await page.setViewportSize({width:1365,height:900});

  await page.evaluate(()=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
      x.subject==='Science'&&x.title==='Cell: The Building Block of Life');
    renderReaderContent(e);
  });
  check(await diagrams.count()===3&&await checks.count()===11,
    'rerendering the reader does not duplicate figures or questions');

  const chapter1=await page.evaluate(()=>{
    const title='Exploration: Entering the World of Secondary Science';
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
      x.subject==='Science'&&x.title===title);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:title,topicId:e.id};
    renderFilters();
    openTopic(title,e.id);
    return {text:document.querySelector('#detailed-notes')?.innerText||''};
  });
  check((await page.locator('#detailed-notes .science-ch01-figure').count())===2&&
      await page.locator('#detailed-notes .science-ch01-question').count()===5&&
      chapter1.text.includes('Meghnad Saha')&&
      await page.locator('#detailed-notes .science-ch02-figure').count()===0,
    'original Chapter 1 visuals and practice remain unchanged');
  await page.evaluate(()=>{
    const title='Tissues in Action';
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
      x.subject==='Science'&&x.title===title);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:title,topicId:e.id};
    renderFilters();
    openTopic(title,e.id);
  });
  check(await page.locator('#detailed-notes .science-ch02-figure').count()===0&&
      await page.locator('#detailed-notes .science-ch02-question').count()===0,
    'the Chapter 2 extension cannot leak into Chapter 3');
  check(jsErrors.length===0,'no uncaught JavaScript errors: '+jsErrors.join('; '));
  console.log('CLASS 9 SCIENCE CH02 EXPLORATION BROWSER REGRESSION PASS');
})().catch(error=>{
  console.error(error);
  console.error(stderr);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
