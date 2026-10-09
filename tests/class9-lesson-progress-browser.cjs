const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-checkable-lessons-'));
const port=process.env.TEST_LESSON_PROGRESS_PORT||'5137';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'local-checkable-lessons',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',
    DATABASE_PATH:path.join(dir,'studyai.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',data=>{stderr=(stderr+String(data)).slice(-6000)});
const check=(ok,message)=>{assert.ok(ok,message);console.log('PASS',message)};

(async()=>{
  let running=false;
  for(let i=0;i<100;i++){
    try{if((await fetch(base+'/api/health')).ok){running=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,120));
  }
  check(running,'local server starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({
    viewport:{width:1600,height:900},reducedMotion:'reduce'
  });
  const errors=[];
  page.on('pageerror',error=>errors.push(String(error.message)));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress&&!!window.StudyAILessonReader);
  const entryId=await page.evaluate(()=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&
      x.grade==='Class 9'&&x.subject==='Mathematics'&&
      x.title==='The World of Numbers');
    if(!e)throw Error('World of Numbers chapter unavailable');
    current={board:e.board,grade:e.grade,subject:e.subject,
      topic:e.title,topicId:e.id,component:'All components'};
    renderFilters();
    openTopic(e.title,e.id);
    const intro=document.getElementById('studyai-onboarding');
    if(intro?.open)intro.close();
    return e.id;
  });
  const chapter=page.locator('#chapter-list .chapter-item[data-id="'+entryId+'"]');
  const rows=page.locator('.studyai-lesson-rail .studyai-lesson-row');
  const progress=()=>page.evaluate(id=>StudyAIProgress.summary(id),entryId);

  check(await page.locator('#study.studyai-progress-active').count()===1,
    'chapter checklist layout activates only for CBSE Class 9 Maths');
  check(await page.locator('#study .chapter-rail').count()===1 &&
      await page.locator('#study .studyai-lesson-rail').count()===1,
    'left-side chapter list and adjacent subtopic list exist');
  check((await page.evaluate(()=>getComputedStyle(document.querySelector(
    '#study .reader-layout')).gridTemplateColumns.split(' ').length))===3,
    'desktop presents three separate columns');
  check((await page.evaluate(()=>document.querySelector('#study>.shell').getBoundingClientRect().width))>1400,
    'notes use almost the full desktop width rather than the old narrow centered shell');
  check(await rows.count()===15,'World of Numbers has 15 selectable main subtopics, not 62');
  check(await page.locator('.studyai-subtopic-select').count()===0,
    'there is no duplicate 62-page subtopic menu');
  check((await progress()).total===15&&(await progress()).done===0,
    'new reader starts at zero of fifteen completed');
  check((await chapter.locator('.studyai-progress-ring').getAttribute('aria-label')).includes(
    '0 of 15 lessons complete'),'chapter ring describes its starting progress');
  check(await page.locator('#study #complete-btn').isHidden(),
    'old chapter-wide completion button is hidden to avoid ambiguous status');

  // The checkbox belongs to the lesson, not to the surrounding chapter link.
  await rows.nth(0).locator('.studyai-lesson-toggle').dispatchEvent('click');
  check((await progress()).done===1,'first lesson checkbox marks exactly one completed');
  check(await rows.nth(0).locator('.studyai-lesson-toggle').getAttribute('aria-checked')==='true',
    'checkbox reports completion accessibly');
  check((await chapter.locator('.studyai-progress-ring').getAttribute('aria-label')).includes(
    '1 of 15 lessons complete'),'chapter ring updates to one out of fifteen');

  await rows.nth(1).locator('.studyai-lesson-toggle').dispatchEvent('click');
  check((await progress()).done===2,'second lesson checkbox updates completion independently');
  await rows.nth(0).locator('.studyai-lesson-toggle').dispatchEvent('click');
  check((await progress()).done===1,'checking again reverses completion without affecting the other lesson');

  // The inline completion action is linked to the same underlying lesson.
  await page.evaluate(()=>window.StudyAILessonReader.goTo(0));
  const inline=page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-inline-complete');
  check(await inline.count()===1,'visible note contains an inline Mark as complete action');
  await inline.dispatchEvent('click');
  check((await progress()).done===2,'inline action and sidebar checkbox share the same saved state');
  check(await rows.nth(0).locator('.studyai-lesson-toggle').getAttribute('aria-checked')==='true',
    'inline completion immediately checks its matching sidebar entry');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden])').count()===1,
    'all notes remain one complete lesson at a time');

  await rows.nth(4).locator('.studyai-lesson-link').dispatchEvent('click');
  check(await page.locator('.studyai-topic-select').inputValue()==='4',
    'clicking lesson title opens the correct lesson');
  check(await rows.nth(4).locator('.studyai-lesson-link').getAttribute('aria-current')==='page',
    'selected lesson receives accessible current-page state');

  // Test 100%, then reversibility of the derived chapter completion state.
  for(let i=0;i<15;i++){
    if(await rows.nth(i).locator('.studyai-lesson-toggle').getAttribute('aria-checked')!=='true'){
      await rows.nth(i).locator('.studyai-lesson-toggle').dispatchEvent('click');
    }
  }
  check((await progress()).done===15,'completing every lesson fills the chapter');
  check((await chapter.locator('.studyai-progress-ring').getAttribute('aria-label')).includes(
    '100 percent'),'ring reaches 100 percent');
  check(await page.evaluate(id=>state.completed.includes(id),entryId),
    'complete chapter also updates the existing StudyAI dashboard state');
  await rows.nth(4).locator('.studyai-lesson-toggle').dispatchEvent('click');
  check((await progress()).done===14,'unchecking a lesson lowers the chapter progress');
  check(!await page.evaluate(id=>state.completed.includes(id),entryId),
    'partially completed chapters are no longer shown as entirely complete');
  check(await page.evaluate(id=>{
    const saved=JSON.parse(localStorage.getItem('studyai-multicurriculum-v1'));
    return saved.studyaiLessonProgress[id]?.length===14;
  },entryId),'per-lesson checks persist in existing StudyAI local state');

  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>window.StudyAIProgress&&
    document.querySelectorAll('.studyai-lesson-rail .studyai-lesson-row').length===15);
  check((await progress()).done===14,'completion survives a full browser reload');
  check((await page.locator('#chapter-list .chapter-item[data-id="'+entryId+'"] .studyai-progress-ring')
    .getAttribute('aria-label')).includes('14 of 15'),
    'the circle restores the correct saved percentage');

  const another=await page.evaluate(()=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
      x.subject==='Mathematics'&&x.title==='Exploring Algebraic Identities');
    return e?.id||null;
  });
  check(!!another,'a separate Class 9 Maths chapter exists');
  await page.locator('#chapter-list .chapter-item[data-id="'+another+'"]').dispatchEvent('click');
  const otherInfo=await page.evaluate(id=>StudyAIProgress.summary(id),another);
  check(otherInfo.total>=4,'a different Maths chapter also has selectable topic lessons');
  check(await page.locator('.studyai-lesson-rail .studyai-lesson-row').count()===otherInfo.total,
    'lesson checklist updates when a different chapter is selected');
  await page.locator('.studyai-lesson-rail .studyai-lesson-row').first()
    .locator('.studyai-lesson-toggle').dispatchEvent('click');
  check((await page.evaluate(id=>StudyAIProgress.summary(id),another)).done===1,
    'second chapter maintains its own independent checkbox progress');
  check((await progress()).done===14,
    'checking another chapter does not overwrite the first chapter progress');

  await page.setViewportSize({width:570,height:840});
  check((await page.evaluate(()=>getComputedStyle(document.querySelector(
    '#study .reader-layout')).gridTemplateColumns.split(' ').length))===1,
    'small screens stack the chapter list, lessons and notes in reading order');
  await page.setViewportSize({width:1600,height:900});

  await page.evaluate(()=>{
    const e=STUDY_DATA.find(x=>x.board==='Cambridge IGCSE'&&
      x.subject==='Mathematics');
    current={board:e.board,grade:e.grade,subject:e.subject,
      topic:e.title,topicId:e.id,component:'All components'};
    renderFilters();
    openTopic(e.title,e.id);
  });
  check(await page.locator('#study.studyai-progress-active').count()===0,
    'Cambridge does not accidentally inherit the Class 9 layout');
  check(await page.locator('#study .studyai-lesson-rail').count()===0,
    'lesson progress rail disappears outside the enabled course');
  check(await page.locator('.studyai-lesson-reader').count()===0,
    'other curricula retain their original note renderer');
  check(errors.length===0,'no JavaScript runtime errors: '+errors.join('; '));
  console.log('CLASS 9 LESSON COMPLETION / PROGRESS RINGS PASS');
})().catch(error=>{
  console.error(error);
  console.error(stderr);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
