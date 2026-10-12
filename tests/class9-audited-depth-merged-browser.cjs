const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-audited-depth-'));
const port=process.env.TEST_AUDITED_DEPTH_PORT||'5149';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'audited-depth-ci',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'studyai.sqlite'),
    GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',part=>{stderr=(stderr+String(part)).slice(-7000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};
const titles=[
  'I’m Up and Down, and Round and Round',
  'Measuring Space: Perimeter and Area',
  'The Mathematics of Maybe: Introduction to Probability',
  'Predicting What Comes Next: Exploring Sequences and Progressions',
  'Propositions and their Converses',
  'How Quantities Combine: Understanding Data',
  'The World of Algorithms'
];
(async()=>{
  let ready=false;
  for(let i=0;i<100;i++){
    try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,120));
  }
  check(ready,'local StudyAI server starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf);
  const chapters=await page.evaluate(titles=>{
    const matching=STUDY_DATA.filter(e=>e.board==='CBSE'&&
      e.grade==='Class 9'&&e.subject==='Mathematics');
    return titles.map(title=>{
      const entry=matching.find(e=>e.title===title);
      const ch=window.CBSE_CLASS9_MATH_FULL_NOTES?.[title];
      const groups=entry?window.StudyAIProgress.outline(entry.id):[];
      const leaves=groups.flatMap(g=>g.leaves);
      const subtopics=ch?.sections?.flatMap(s=>s.subtopics||[])||[];
      return {
        title,present:!!entry&&!!ch,
        depthApplied:ch?._studyaiCompleteDepth===true,
        audit:window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title],
        subtopicCount:subtopics.length,
        multiParagraph:subtopics.filter(s=>s.paragraphs?.length>=2).length,
        workedExamples:subtopics.filter(s=>s.examples?.length).length,
        leafCount:leaves.length,
        unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
        progress:entry?StudyAIProgress.summary(entry.id):null,
        id:entry?.id
      };
    });
  },titles);
  for(const chapter of chapters){
    check(chapter.present,'Chapter exists: '+chapter.title);
    check(chapter.depthApplied,'manually audited depth applied: '+chapter.title);
    check(chapter.audit?.words>850 && chapter.subtopicCount>=10,
      'substantial audited pedagogical depth retained: '+chapter.title+' '+JSON.stringify(chapter.audit));
    check(chapter.multiParagraph>=10 && chapter.workedExamples>=8,
      'authored explanations and worked examples retained: '+chapter.title);
    check(chapter.leafCount>20&&chapter.unique&&chapter.progress.total===chapter.leafCount,
      'per-leaf navigation and progress totals match: '+chapter.title);
  }
  const selection=await page.evaluate(id=>{
    const entry=STUDY_DATA.find(e=>e.id===id);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,
      topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    const groups=StudyAIProgress.outline(id);
    const leaf=groups.flatMap(g=>g.leaves).find(item=>item.kind==='subtopic');
    const opened=StudyAILessonReader.goToLeaf(leaf.key);
    return {key:leaf.key,opened,activeKey:StudyAILessonReader.activeLeafKey(),
      total:StudyAIProgress.summary(id).total};
  },chapters[3].id);
  check(await page.locator('.studyai-sublesson-row').count()===selection.total,
    'audited Chapter 8 focused lessons appear as separate navigation items');
  check(selection.opened&&selection.activeKey===selection.key,
    'focused audited lesson selection succeeds and stays active');
  const focus=await page.evaluate(()=>({
    selected:document.querySelectorAll(
      '#detailed-notes .studyai-current-subtopic:not([hidden])').length,
    heading:document.querySelector(
      '#detailed-notes .studyai-current-subtopic:not([hidden]) h4')?.textContent||'',
    notesVisible:document.querySelector('#detailed-notes')?.getBoundingClientRect().width>0
  }));
  check(focus.selected===1&&focus.notesVisible,
    'exactly one focused audited subtopic renders in the visible notes: '+JSON.stringify(focus));
  check(errors.length===0,'no JavaScript exceptions after integrating audited chapters: '+errors.join('; '));
  console.log('AUDITED CLASS 9 MATH CHAPTERS 5–11 INTEGRATION PASS');
})().catch(error=>{
  console.error(error);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
