const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-cambridge-full-notes-'));
const port=process.env.TEST_CAMBRIDGE_NOTES_PORT||'5114';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'cambridge-notes-ci-placeholder-key',FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,checks=0,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check=(value,message)=>{assert.ok(value,message);checks++;console.log('PASS',message)};

async function dismissFirstRun(page){
  await page.waitForTimeout(800);
  if(await page.locator('#studyai-onboarding[open]').count()){
    await page.evaluate(()=>document.querySelector('[data-onboarding-skip]')?.click());
    await page.waitForFunction(()=>!document.querySelector('#studyai-onboarding')?.open);
  }
  await page.waitForSelector('#help-guided-tour',{timeout:3000}).catch(()=>{});
  if(await page.locator('#help-guided-tour:not(.hidden)').count()){
    await page.locator('[data-tour-skip]').click();
    await page.locator('[data-tour-skip-confirm]').click();
    await page.waitForFunction(()=>document.querySelector('#help-guided-tour')?.classList.contains('hidden'));
  }
}

async function openEntry(page,board,grade,subject,title){
  await page.evaluate(({board,grade,subject,title})=>{
    const entry=STUDY_DATA.find(e=>e.board===board&&e.grade===grade&&e.subject===subject&&e.title===title);
    if(!entry)throw new Error('Missing curriculum entry: '+[board,grade,subject,title].join(' | '));
    current={board,grade,subject,component:'All components',topic:title,topicId:entry.id};
    renderFilters();
    openTopic(title,entry.id);
    location.hash='#study';
  },{board,grade,subject,title});
  await page.waitForSelector('#study:not([hidden])');
  // AS/A Physics, Chemistry and Maths use the deep-note renderer, not the
  // IGCSE/Biology-specific cambridge-full-notes class. Both share the content-first reader.
  await page.waitForSelector('#reader-view:not(.hidden) .content-first-long-notes');
}

(async()=>{
  for(let i=0;i<100;i++){
    try{if((await fetch(url+'/api/health')).ok)break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1360,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));

  await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#study');
  await dismissFirstRun(page);

  await page.waitForFunction(()=>window.STUDYAI_CAMBRIDGE_IGCSE_FULL_NOTES_STATUS?.matched===50,{timeout:8000});
  await page.waitForFunction(()=>window.STUDYAI_CAMBRIDGE_BIOLOGY_FULL_NOTES_STATUS?.matched===21,{timeout:8000});
  await page.waitForFunction(()=>window.STUDYAI_LONG_NOTES_STATUS?.cambridgeFull>=71,{timeout:8000});
  check(await page.evaluate(()=>window.STUDYAI_CAMBRIDGE_IGCSE_FULL_NOTES_STATUS.expected===50),'all 50 Cambridge IGCSE topics have detailed full-note overlays');
  check(await page.evaluate(()=>window.STUDYAI_CAMBRIDGE_BIOLOGY_FULL_NOTES_STATUS.expected===21),'all 21 AS/A Biology topics have detailed full-note overlays');

  const weakCoverage=await page.evaluate(()=>{
    const weak=STUDY_DATA.filter(e=>e.board==='Cambridge IGCSE'||(e.board==='Cambridge International AS & A Level'&&e.subject==='Biology'));
    return {total:weak.length,full:weak.filter(e=>e.cambridgeFullNotes?.sections?.length>=8).length,minSections:Math.min(...weak.map(e=>e.cambridgeFullNotes?.sections?.length||0))};
  });
  check(weakCoverage.total===71&&weakCoverage.full===71&&weakCoverage.minSections>=8,'every previously-summary Cambridge IGCSE/Biology topic now has expanded long-form full notes');

  const samples=[
    ['Cambridge IGCSE','IGCSE 9–10','Mathematics','Number'],
    ['Cambridge IGCSE','IGCSE 9–10','Physics','Waves'],
    ['Cambridge IGCSE','IGCSE 9–10','Chemistry','Stoichiometry'],
    ['Cambridge IGCSE','IGCSE 9–10','Biology','Enzymes'],
    ['Cambridge International AS & A Level','AS Level (11)','Physics','Waves'],
    ['Cambridge International AS & A Level','AS Level (11)','Chemistry','Atomic Structure'],
    ['Cambridge International AS & A Level','AS Level (11)','Mathematics','Pure Mathematics: Quadratics'],
    ['Cambridge International AS & A Level','AS Level (11)','Biology','Cell Structure'],
    ['Cambridge International AS & A Level','A Level (12)','Physics','Gravitational Fields'],
    ['Cambridge International AS & A Level','A Level (12)','Chemistry','Advanced Energetics and Lattice Energy'],
    ['Cambridge International AS & A Level','A Level (12)','Mathematics','Complex Numbers'],
    ['Cambridge International AS & A Level','A Level (12)','Biology','Photosynthesis']
  ];

  for(const [board,grade,subject,title] of samples){
    await openEntry(page,board,grade,subject,title);
    // Notes live inside a content-visibility:auto section. Bring it into view
    // before reading innerText, which reports empty for skipped offscreen layout.
    await page.locator('#detailed-notes').scrollIntoViewIfNeeded();
    const text=(await page.locator('#detailed-notes').innerText()).replace(/\s+/g,' ');
    const headings=await page.locator('#detailed-notes .actual-note-topic h3').count();
    check(headings>=8,title+' renders as a long-form multi-section note page');
    check(text.length>=2500,title+' contains substantial exam-ready note depth ('+text.length+' chars)');
    check(!/Chapter overview|Key concepts and explanations|How to reason through this chapter|Quick revision/.test(text),title+' does not use the old generic summary headings');
    check(await page.locator('#detailed-notes .content-first-long-notes').count()===1,title+' uses the content-first long-note renderer');
    check(await page.locator('#detailed-notes .studyai-diagram svg').count()===0,title+' does not show unrelated generic diagrams');
  }

  const placeholderCount=await page.evaluate(()=>STUDY_DATA.filter(e=>window.StudyAIDiagrams?.render?.(e)).length);
  check(placeholderCount===0,'generic, subject-guessed diagrams are disabled until authored replacements exist');

  await page.evaluate(()=>{
    const cbse=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='The World of Numbers');
    current={board:cbse.board,grade:cbse.grade,subject:cbse.subject,component:'All components',topic:cbse.title,topicId:cbse.id};
    renderFilters();openTopic(cbse.title,cbse.id);location.hash='#study';
  });
  await page.waitForSelector('#study:not([hidden])');
  check(await page.locator('#detailed-notes .actual-note-topic:not([hidden]) .studyai-concept-figure svg').count()===1,'CBSE Class 9 opens with an authored signed-integers number line');
  check(await page.locator('#detailed-notes .studyai-diagram svg').count()===0,'original accurate figure replaces the old arbitrary graph');

  check(errors.length===0,'Cambridge full-note and diagram rendering has no browser JavaScript errors: '+errors.join(' | '));
  console.log('TOTAL',checks,'Cambridge full-note/diagram checks passed');
})().catch(err=>{console.error(err);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill('SIGTERM');
  rmSync(dir,{recursive:true,force:true});
});