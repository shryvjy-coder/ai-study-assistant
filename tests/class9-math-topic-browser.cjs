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
  check(status.lessonCount===15,'World of Numbers contains 15 lessons including concept-based real number magnification and labelled optional algebra');
  check(status.workedExamples>=15,'World of Numbers includes 15 or more original examples');
  check(status.optionalExtensions===1,'unprescribed algebra topics are explicitly marked as enrichment, not core syllabus');
  const syllabusCheck=await page.evaluate(()=>{
    const bank=window.CBSE_CLASS9_MATH_FULL_NOTES['The World of Numbers'];
    return {
      proof:bank.sections.find(s=>s.title==='Why √2 is irrational').subtopics.some(s=>s.title.includes('√3')),
      periodic:bank.sections.find(s=>s.title==='Decimal expansions of real numbers').subtopics.some(s=>s.title.includes('repeating decimal period')),
      hard:bank.sections.find(s=>s.title==='Mixed exam applications and full solutions').subtopics.some(s=>s.examples?.some(e=>e.answer.includes('34'))),
      extension:bank.sections.find(s=>s.extension===true)?.title,
      warning:bank.sections.find(s=>s.title==='Simplifying radicals and operations involving irrational numbers').exam_warning?.includes('√(9+16)'),
    };
  });
  check(syllabusCheck.proof&&syllabusCheck.periodic&&syllabusCheck.hard&&syllabusCheck.warning,
    'independent review fixes add √3 proof, period limits, 4-mark worked algebra and misconception warning');
  check(syllabusCheck.extension?.startsWith('Additional algebra practice'),'additional rational exponents/conjugates clearly marked as additional, not prescribed');

  const quality=await page.evaluate(()=>window.STUDYAI_CONCEPT_FIRST_STATUS);
  check(quality.taughtSections>=12,'12 chapter topics have authored concept-first subsections');
  check(quality.teachingSubsections>=20,'chapter contains at least 20 focused explanatory subtopics');
  check(quality.conceptFigures===5,'original core teaching diagrams remain linked to five lessons');

  await page.evaluate(()=>{
    const entry=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics'&&x.title==='The World of Numbers');
    if(!entry)throw Error('World of Numbers missing');
    current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    location.hash='#study';
  });

  check(await page.locator('.studyai-topic-select option').count()===15,
    'World of Numbers is split into only 15 substantial lesson pages');
  check(await page.locator('.studyai-subtopic-select').count()===0,
    'the chapter no longer makes students click through 62 separate subtopic pages');
  check(await page.locator('#detailed-notes.studyai-compact-chapter').count()===1,
    'compact lesson reading mode is activated');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1,
    'exactly one substantial topic lesson displays at a time');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-lesson-subtopic:not([hidden])').count()>=4,
    'related teaching subsections remain visible together inside their lesson');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-concept-figure').count()===1,
    'the accurate number-line diagram stays with the lesson');
  check(await page.locator('#detailed-notes .studyai-diagram').count()===0,
    'no generic filler diagram is added');
  check(await page.locator('#detailed-notes .studyai-topic-pagination').count()===1,
    'Previous and Next lesson controls remain available');
  check(await page.locator('#next-chapter-button').count()===1,
    'the existing Next Chapter control is preserved');
  check(await page.locator('.studyai-prev-topic').first().isDisabled(),
    'first lesson disables previous navigation');
  const teaching=await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText();
  check(teaching.length>=1500,
    'the complete original lesson is preserved rather than reduced to a summary');
  check(teaching.includes('absolute value')&&teaching.includes('counterexample'),
    'original detailed subtopics on distance and closure remain readable');
  check(teaching.includes('Worked example')&&teaching.includes('formula') ||
    (await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .worked-box').count())>=2,
    'in-lesson worked examples and mathematical teaching remain available');

  await page.locator('.studyai-next-page').dispatchEvent('click');
  check(await page.locator('.studyai-topic-select').inputValue()==='1',
    'Next moves exactly one substantial lesson, not one tiny subsection');
  // The independent first-visit onboarding flow can open after page load.
  // Close it before testing lesson navigation, just as a student would.
  await page.evaluate(()=>{
    const onboarding=document.getElementById('studyai-onboarding');
    if(onboarding?.open)onboarding.close();
  });
  // The onboarding and fixed top bar can overlay the bottom control in CI.
  // Dispatch the button's click event to test its handler independently.
  await page.locator('.studyai-prev-page').dispatchEvent('click');
  check(await page.locator('.studyai-topic-select').inputValue()==='0',
    'Previous returns to the beginning without losing content');

  const initial=await page.locator('#note-title').innerText();
  await page.evaluate(()=>window.StudyAILessonReader.goTo(5));
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden]) h3').innerText())==='Why √2 is irrational',
    'selecting a lesson displays the complete irrationality proof topic');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('lowest terms'),
    'the proof is intact rather than a short summary');
  check(await page.locator('#note-title').innerText()===initial,
    'switching lessons stays within the chapter');

  await page.evaluate(()=>window.StudyAILessonReader.goTo(4));
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-concept-figure svg').count()===1,
    'irrational-number topic preserves its original visual');
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('π'),
    'irrational-number teaching includes pi without another click');

  await page.evaluate(()=>window.StudyAILessonReader.goTo(7));
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('142857'),
    'one-seventh repeating decimal enrichment stays visible on its lesson');

  const allLessonTitles=await page.locator('.studyai-topic-select option').allTextContents();
  const magnificationIndex=allLessonTitles.findIndex(x=>x.includes('successive magnification'));
  check(magnificationIndex>=0,'magnification topic remains among the chapter lessons');
  await page.evaluate(i=>window.StudyAILessonReader.goTo(i),magnificationIndex);
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').innerText()).includes('Zoom 1'),
    'all three decimal magnification stages appear as in-page subheadings');

  await page.evaluate(()=>window.StudyAILessonReader.goTo(14));
  check(await page.locator('.studyai-next-topic').first().isDisabled(),
    'last chapter lesson disables Next lesson');
  const optionalIndex=allLessonTitles.findIndex(x=>x.includes('Additional algebra practice'));
  check(optionalIndex>=0,'the optional algebra lesson is identified in the topic menu');
  await page.evaluate(i=>window.StudyAILessonReader.goTo(i),optionalIndex);
  check((await page.locator('#detailed-notes .actual-note-topic:not([hidden])').textContent()).includes('not prescribed'),
    'optional algebra content is clearly labelled as additional study');

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