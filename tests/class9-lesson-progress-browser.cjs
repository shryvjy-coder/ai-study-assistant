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
  check(await page.locator('#study .studyai-notes-nav .chapter-rail').count()===1 &&
      await page.locator('#study .studyai-notes-nav .studyai-lesson-rail').count()===1,
    'chapter list and lesson checklist share a single notes contents panel');
  check((await page.evaluate(()=>getComputedStyle(document.querySelector(
    '#study .reader-layout')).gridTemplateColumns.split(' ').length))===2,
    'desktop uses a contents panel and a wide notes column');

  // A 2400px monitor used to leave blank right-hand space because the Study
  // shell was capped at 1620px, the article at 1160px and note text at 92ch.
  await page.setViewportSize({width:2400,height:1000});
  const wide=await page.evaluate(()=>{
    const shell=document.querySelector('#study>.shell').getBoundingClientRect();
    const reader=document.querySelector('#study .reader').getBoundingClientRect();
    const article=document.querySelector('#study #reader-view').getBoundingClientRect();
    const prose=document.querySelector('#study #detailed-notes .note-prose');
    const text=prose?.getBoundingClientRect();
    return {
      shellWidth:shell.width,
      shellRight:window.innerWidth-shell.right,
      readerRight:window.innerWidth-reader.right,
      readerWidth:reader.width,
      articleWidth:article.width,
      textWidth:text?.width||0,
      viewport:window.innerWidth
    };
  });
  check(wide.shellWidth>2300 && wide.shellRight>=0 && wide.shellRight<=16,
    'wide monitors use the Study section nearly edge-to-edge: '+JSON.stringify(wide));
  check(wide.readerRight>=0 && wide.readerRight<=18 &&
        wide.readerWidth>1700 && wide.articleWidth>1700,
    'notes card extends all the way to the right gutter without its old 1160px cap');
  check(wide.textWidth>1200,
    'full notes prose can expand beyond the old 92-character text limit');
  await page.setViewportSize({width:1600,height:900});

  const toggle=page.locator('#toggle-notes-nav');
  const widthBefore=await page.evaluate(()=>getComputedStyle(document.querySelector(
    '#study .reader-layout')).gridTemplateColumns.split(' ').map(Number.parseFloat)[1]);
  await toggle.click();
  check(await toggle.getAttribute('aria-expanded')==='false' &&
      await page.locator('#studyai-notes-nav-content').isHidden(),
    'minimize hides chapter and lesson lists with an accessible toggle');
  const widthAfter=await page.evaluate(()=>getComputedStyle(document.querySelector(
    '#study .reader-layout')).gridTemplateColumns.split(' ').map(Number.parseFloat)[1]);
  check(widthAfter>widthBefore+150,
    'minimizing returns the contents column width to the lesson');
  check(await page.evaluate(()=>localStorage.getItem('studyai-notes-contents-minimized-v1'))==='1',
    'minimized preference is saved locally');
  await toggle.click();
  check(await toggle.getAttribute('aria-expanded')==='true' &&
      await page.locator('#studyai-notes-nav-content').isVisible(),
    'contents panel reopens without losing chapters or lessons');
  const chapterToggle=page.locator('#collapse-chapters');
  const subtopicToggle=page.locator('#collapse-subtopics');
  const chapterBody=page.locator('#chapter-list');
  const subtopicBody=page.locator('#studyai-subtopics-content');
  check(await chapterToggle.count()===1 && await subtopicToggle.count()===1,
    'chapters and subtopics have distinct minimize controls');
  const sectionLayout=await page.evaluate(()=>{
    const chapters=document.querySelector('#study .chapter-rail').getBoundingClientRect();
    const subtopics=document.querySelector('#study .studyai-subtopics-group').getBoundingClientRect();
    const reader=document.querySelector('#study .reader').getBoundingClientRect();
    return {
      adjacent:subtopics.left>=chapters.right-2 && reader.left>=subtopics.right-2,
      aligned:Math.abs(chapters.top-subtopics.top)<3,
      chapterWidth:chapters.width,subtopicWidth:subtopics.width
    };
  });
  check(sectionLayout.adjacent && sectionLayout.aligned &&
      sectionLayout.chapterWidth>175 && sectionLayout.subtopicWidth>175,
    'desktop places Chapters and Subtopics side by side, with full notes on the right');
  const dockWidth=()=>page.evaluate(()=>parseFloat(getComputedStyle(
    document.querySelector('#study .reader-layout')).gridTemplateColumns));
  const expandedDock=await dockWidth();
  await chapterToggle.dispatchEvent('click');
  check(await chapterToggle.getAttribute('aria-expanded')==='false' &&
      await chapterBody.isHidden() && await subtopicBody.isVisible(),
    'minimizing chapters leaves subtopics expanded and visible');
  const chaptersMinWidth=await dockWidth();
  check(chaptersMinWidth<expandedDock-100 &&
      chaptersMinWidth>200 &&
      await page.locator('#study.studyai-chapters-minimized').count()===1,
    'minimizing only Chapters shrinks its own column and enlarges the reader');
  check(await rows.count()===15,
    'minimizing chapters preserves every lesson checkbox');
  await subtopicToggle.dispatchEvent('click');
  check(await subtopicToggle.getAttribute('aria-expanded')==='false' &&
      await subtopicBody.isHidden() && await chapterBody.isHidden(),
    'subtopics can minimize independently of chapters');
  const bothMinWidth=await dockWidth();
  check(bothMinWidth<chaptersMinWidth-100 &&
      await page.locator('#study.studyai-chapters-minimized.studyai-subtopics-minimized').count()===1,
    'minimizing both columns leaves two compact tabs and maximal reading space');
  await chapterToggle.dispatchEvent('click');
  check(await chapterBody.isVisible() && await subtopicBody.isHidden() &&
      Math.abs((await dockWidth())-chaptersMinWidth)<3,
    'expanding Chapters restores its column without unexpectedly expanding Subtopics');
  await subtopicToggle.dispatchEvent('click');
  check(await chapterBody.isVisible() && await subtopicBody.isVisible() &&
      Math.abs((await dockWidth())-expandedDock)<3,
    'expanding both restores parallel columns without losing lesson controls');
  check(await page.evaluate(()=>localStorage.getItem(
      'studyai-notes-chapters-minimized-v1')==='0' &&
      localStorage.getItem('studyai-notes-subtopics-minimized-v1')==='0'),
    'each row saves its independent state');
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

  await chapterToggle.dispatchEvent('click');
  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>window.StudyAIProgress&&
    document.querySelectorAll('.studyai-lesson-rail .studyai-lesson-row').length===15);
  check(await chapterToggle.getAttribute('aria-expanded')==='false' &&
      await chapterBody.isHidden() && await subtopicBody.isVisible(),
    'independent chapter collapse persists across a full browser reload');
  await chapterToggle.dispatchEvent('click');
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
    '#study .reader-layout')).display))==='block',
    'small screens stack the combined contents panel above the notes');
  const mobileColumns=await page.evaluate(()=>{
    const chapters=document.querySelector('#study .chapter-rail').getBoundingClientRect();
    const subtopics=document.querySelector('#study .studyai-subtopics-group').getBoundingClientRect();
    return {
      stacked:subtopics.top>=chapters.bottom-2,
      // Scope this check to study navigation itself: the app's other
      // sections may independently overflow the page at small widths.
      fit:chapters.left>=-2 && subtopics.left>=-2 &&
        chapters.right<=window.innerWidth+4 &&
        subtopics.right<=window.innerWidth+4,
      chapterWidth:chapters.width,
      chaptersRight:chapters.right,subtopicsRight:subtopics.right,
      viewport:window.innerWidth
    };
  });
  check(mobileColumns.stacked && mobileColumns.fit && mobileColumns.chapterWidth>250,
    'mobile stacks both study navigation sections without overflow: '+JSON.stringify(mobileColumns));
  await toggle.click();
  check(await page.locator('#studyai-notes-nav-content').isHidden() &&
      await page.locator('#study .reader').isVisible(),
    'mobile readers can minimize the contents while keeping the note visible');
  await toggle.click();
  await page.setViewportSize({width:1600,height:900});

  // The normal-motion experience is slower by 250ms; reduced-motion checks
  // above still confirm immediate accessibility-friendly state changes.
  await page.emulateMedia({reducedMotion:'no-preference'});
  const durations=await page.evaluate(()=>{
    const layout=document.querySelector('#study .reader-layout');
    const navButton=document.getElementById('collapse-chapters');
    const row=document.querySelector('#study .studyai-lesson-row');
    const bar=document.querySelector('#study .studyai-rail-progress-fill');
    return {
      layout:getComputedStyle(layout).transitionDuration,
      button:getComputedStyle(navButton).transitionDuration,
      row:getComputedStyle(row).transitionDuration,
      progress:getComputedStyle(bar).transitionDuration
    };
  });
  check(durations.layout.includes('0.55s') &&
      durations.button.includes('0.75s') &&
      durations.row.includes('0.41s') &&
      durations.progress.includes('0.45s'),
    'existing notes transitions remain lengthened; dock resize lasts 550 ms');

  // Assert MOVEMENT at intermediate frames, not merely an animation property
  // being defined. The earlier test passed despite the panel visually snapping.
  const measureTrack=()=>page.evaluate(()=>parseFloat(getComputedStyle(
    document.querySelector('#study .reader-layout')).gridTemplateColumns));
  const expandedTrack=await measureTrack();
  check(expandedTrack>450,'expanded parallel columns occupy a readable width');
  await page.evaluate(()=>document.getElementById('toggle-notes-nav').click());
  await page.waitForFunction(()=>{
    const track=parseFloat(getComputedStyle(document.querySelector(
      '#study .reader-layout')).gridTemplateColumns);
    return track>90&&track<440;
  },null,{timeout:1500});
  const midwayTrack=await measureTrack();
  check(midwayTrack>90&&midwayTrack<440 &&
      !(await page.locator('#studyai-notes-nav-content').getAttribute('hidden')),
    'actual dock width moves through intermediate frames with content still rendered');
  await page.waitForFunction(()=>document.getElementById(
    'studyai-notes-nav-content').hidden,null,{timeout:2000});
  await page.waitForFunction(()=>parseFloat(getComputedStyle(
    document.querySelector('#study .reader-layout')).gridTemplateColumns)<54,
    null,{timeout:2000});
  await page.evaluate(()=>document.getElementById('toggle-notes-nav').click());
  await page.waitForFunction(()=>{
    const track=parseFloat(getComputedStyle(document.querySelector(
      '#study .reader-layout')).gridTemplateColumns);
    return track>90&&track<440;
  },null,{timeout:1500});
  check(await page.locator('#studyai-notes-nav-content').isVisible(),
    'opening dock animates through intermediate widths rather than snapping');
  await page.waitForFunction(()=>parseFloat(getComputedStyle(
    document.querySelector('#study .reader-layout')).gridTemplateColumns)>540,
    null,{timeout:2000});
  await page.waitForFunction(()=>document.querySelector('#studyai-notes-nav-content')
    .getAnimations().length===0,null,{timeout:2000});

  const expandedChapterHeight=await page.locator('#chapter-list').evaluate(
    element=>element.getBoundingClientRect().height);
  await page.evaluate(()=>document.getElementById('collapse-chapters').click());
  await page.waitForFunction(fullHeight=>{
    const element=document.getElementById('chapter-list');
    const height=element.getBoundingClientRect().height;
    return height>5&&height<fullHeight-5;
  },expandedChapterHeight,{timeout:1500});
  check(!(await page.locator('#chapter-list').getAttribute('hidden')),
    'chapter row remains rendered and visibly shrinks mid-animation');
  const chapterMotion=await page.evaluate(()=>document.getElementById('chapter-list')
    .getAnimations().some(animation=>animation.effect?.getTiming().duration===500));
  check(chapterMotion,'chapters minimize with a 500 ms height-and-opacity animation');
  await page.waitForFunction(()=>document.getElementById('chapter-list').hidden);
  await page.evaluate(()=>document.getElementById('collapse-chapters').click());
  await page.waitForFunction(()=>{
    const element=document.getElementById('chapter-list');
    return !element.hidden && element.getAnimations().length===0;
  });
  await page.evaluate(()=>document.getElementById('collapse-subtopics').click());
  const subtopicMotion=await page.evaluate(()=>document.getElementById('studyai-subtopics-content')
    .getAnimations().some(animation=>animation.effect?.getTiming().duration===500));
  check(subtopicMotion,'subtopics independently minimize with a 500 ms animation');
  await page.waitForFunction(()=>document.getElementById('studyai-subtopics-content').hidden);
  await page.evaluate(()=>document.getElementById('collapse-subtopics').click());
  await page.waitForFunction(()=>{
    const element=document.getElementById('studyai-subtopics-content');
    return !element.hidden && element.getAnimations().length===0;
  });
  await page.emulateMedia({reducedMotion:'reduce'});

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
