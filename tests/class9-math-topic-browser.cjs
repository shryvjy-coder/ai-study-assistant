const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-topic-lessons-'));
const port=process.env.TEST_TOPIC_LESSONS_PORT||'5122';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'topic-lessons-local-ci',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'studyai.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',part=>{stderr=(stderr+String(part)).slice(-9000)});
const check=(cond,msg)=>{assert.ok(cond,msg);console.log('PASS',msg)};

(async()=>{
  let running=false;
  for(let i=0;i<100;i++){
    try{if((await fetch(base+'/api/health')).ok){running=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,120));
  }
  check(running,'local application starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1400,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>window.STUDYAI_WORLD_OF_NUMBERS_STATUS?.lessonCount>=13);
  const status=await page.evaluate(()=>window.STUDYAI_WORLD_OF_NUMBERS_STATUS);
  check(status.lessonCount===13,'World of Numbers contains 13 independent substantive lessons');
  check(status.workedExamples>=15,'World of Numbers includes 15 or more original examples');
  const quality=await page.evaluate(()=>window.STUDYAI_CONCEPT_FIRST_STATUS);
  check(quality.taughtSections>=12,'12 chapter topics have authored concept-first subsections');
  check(quality.teachingSubsections>=20,'chapter contains at least 20 focused explanatory subtopics');
  check(quality.conceptFigures===5,'four unique accurate diagrams are used in five relevant lessons');

  await page.evaluate(()=>{
    const entry=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
    if(!entry)throw Error('World of Numbers missing');
    current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    location.hash='#study';
  });

  check(await page.locator('.studyai-topic-select option').count()===13,'13 topics are selectable within the chapter');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-concept-figure').count()===1,'initial teaching lesson displays a correctly labelled integer line');
  check(await page.locator('#detailed-notes .studyai-lesson-subtopic h4').count()>=3,'initial lesson has explanatory subtopics, not just a syllabus checklist');
  check(await page.locator('#detailed-notes .studyai-diagram').count()===0,'no meaningless generic graph at the start of the chapter');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1,'only one academic topic shows at a time');
  check(await page.locator('#detailed-notes .studyai-topic-pagination').count()===1,'topic Previous/Next is available');
  check(await page.locator('#next-chapter-button').count()===1,'existing Next Chapter button remains available');
  const teaching=await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText();
  check(teaching.length>=1500,'initial number-systems topic gives substantial genuine explanation');
  check(teaching.includes('absolute value')&&teaching.includes('counterexample'),
    'opening topic explains important mathematical concepts rather than generic exam advice');
  check(await page.locator('.studyai-prev-topic').first().isDisabled(),'first topic disables Previous topic');
  const initial=await page.locator('#note-title').innerText();
  await page.locator('.studyai-topic-select').selectOption('5');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden]) h3').innerText())==='Why √2 is irrational',
    'selecting a topic opens that lesson only');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('lowest terms'),
    'irrationality lesson contains the proof rather than a short summary');
  check(await page.locator('#note-title').innerText()===initial,'switching topic stays in the same chapter');

  await page.locator('.studyai-topic-select').selectOption('4');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-concept-figure svg').count()===1,'irrational-number explanation has a real unit-square visual');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('π'),
    'irrational-number lesson explains the meaning of pi');
  await page.locator('.studyai-topic-select').selectOption('7');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('142857'),
    'decimal-expansion lesson demonstrates the one-seventh remainder cycle');
  await page.locator('.studyai-topic-select').selectOption('12');
  check(await page.locator('.studyai-next-topic').first().isDisabled(),'last topic disables Next topic');

  await page.evaluate(()=>{
    const other=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='Exploring Algebraic Identities');
    openTopic(other.title,other.id);
  });
  check(await page.locator('.studyai-topic-select option').count()>=4,
    'other Grade 9 maths chapters also offer individual topics');

  await page.evaluate(()=>{
    const other=STUDY_DATA.find(x=>x.board==='Cambridge IGCSE'&&x.subject==='Mathematics');
    current={board:other.board,grade:other.grade,subject:other.subject,topic:other.title,topicId:other.id,component:'All components'};
    renderFilters();
    openTopic(other.title,other.id);
  });
  check(await page.locator('.studyai-lesson-reader').count()===0,
    'pilot does not unintentionally change Cambridge topic rendering');
  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('CLASS 9 TOPIC LESSON PILOT PASS');
})().catch(error=>{
  console.error(error);
  console.error(stderr);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});