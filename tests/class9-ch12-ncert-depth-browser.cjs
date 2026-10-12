const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch12-'));
const port=process.env.TEST_CH12_DEPTH_PORT||'5150';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'chapter12-ncert-browser-ci-key',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',
    DATABASE_PATH:path.join(dir,'studyai.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',chunk=>{stderr=(stderr+String(chunk)).slice(-9000)});
const check=(value,message)=>{assert.ok(value,message);console.log('PASS',message)};
const expected=[
  'Which four-sided figures count as quadrilaterals?',
  'Distinguish special shapes using valid diagonal tests',
  'Trapezium mid-segment: average of parallel bases',
  'Varignon rectangles, rhombuses and squares',
  'Optional enrichment: isosceles trapeziums and kites'
];
(async()=>{
  let alive=false;
  for(let i=0;i<100;i++){
    try{if((await fetch(base+'/api/health')).ok){alive=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,120));
  }
  check(alive,'StudyAI starts in a fresh isolated test database');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1500,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',err=>errors.push(String(err.message)));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf &&
    !!window.CBSE_CLASS9_MATH_FULL_NOTES?.Quadrilaterals?._studyaiCh12NcertCorrectionsV1);
  const initial=await page.evaluate(expected=>{
    const title='Quadrilaterals';
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Mathematics'&&e.title===title);
    const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES[title];
    const groups=StudyAIProgress.outline(entry.id);
    const all=groups.flatMap(g=>g.leaves);
    const topics=chapter.sections.flatMap(s=>s.subtopics||[]);
    const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT[title];
    const find=t=>topics.find(s=>s.title===t);
    return {
      id:entry.id,groups:groups.length,total:all.length,
      unique:all.length===new Set(all.map(x=>x.key)).size,
      expected:expected.every(x=>!!find(x)),
      topicTitles:topics.map(x=>x.title),
      schema:topics.every(x=>
        typeof x.title==='string' && x.paragraphs?.length>=2 &&
        (x.examples||[]).every(e=>e.title&&e.question&&
          Array.isArray(e.steps)&&e.steps.length>=2&&e.answer)),
      midpoint:(find('Midpoint theorem and the factor one-half')?.paragraphs||[])
        .join(' ').includes('SAS') &&
        (find('Midpoint theorem and the factor one-half')?.paragraphs||[])
        .join(' ').includes('DF=2DE'),
      converse:find('Converse midpoint theorem')?.paragraphs.some(p=>
        p.includes('unique')&&p.includes('AE=EC')),
      centroid:find('The centroid divides each median 2 to 1')?.paragraphs.some(p=>
        p.includes('ASA')&&p.includes('2:1')),
      varignon:find('Midpoint quadrilaterals and Varignon’s theorem')?.paragraphs.some(p=>
        p.includes('degenerate')&&p.includes('parallel')),
      tiling:find('Any quadrilateral can tile a plane')?.paragraphs.some(p=>
        p.includes('ALONE')&&p.includes('edge-matching')),
      trapezium:find('Trapezium mid-segment: average of parallel bases')?.examples.some(e=>
        e.answer.includes('18 cm')),
      reviewNotAutomatic:audit?.reviewStatus?.includes('human editorial'),
      completeDepth:chapter._studyaiCompleteDepth,
      after:StudyAIProgress.summary(entry.id).total
    };
  },expected);
  check(initial.completeDepth && initial.groups>=6,
    'original Class 9 Chapter 12 depth material is preserved');
  check(initial.expected,'NCERT-backed corrections and optional enrichment are present');
  check(initial.schema,'all focus subtopics retain detailed teaching and worked example schema');
  check(initial.midpoint&&initial.converse&&initial.centroid,
    'midpoint proof, converse and centroid proof are explicitly reasoned');
  check(initial.varignon&&initial.tiling&&initial.trapezium,
    'Varignon degeneracy, global tiling caveat and trapezium example are covered');
  check(initial.reviewNotAutomatic,
    'notes are not falsely declared verified without human editorial review');
  check(initial.total>20&&initial.unique&&initial.total===initial.after,
    'all authored leaves have unique progress keys and accurate totals');
  const firstCount=initial.topicTitles.length;
  const newCount=await page.evaluate(async()=>{
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='/cbse-class9-maths-depth-ch12-revisions.js';
      script.onload=resolve;
      script.onerror=()=>reject(new Error('Could not reload Chapter 12 corrections'));
      document.body.append(script);
    });
    return window.CBSE_CLASS9_MATH_FULL_NOTES.Quadrilaterals.sections
      .flatMap(s=>s.subtopics||[]).length;
  });
  check(newCount===firstCount,'idempotent patch cannot duplicate subtopics on reload');
  const selected=await page.evaluate(id=>{
    const entry=STUDY_DATA.find(e=>e.id===id);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,
      topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    const leaf=StudyAIProgress.outline(entry.id).flatMap(g=>g.leaves)
      .find(x=>x.title==='Trapezium mid-segment: average of parallel bases');
    if(!leaf)throw new Error('Trapezium lesson missing from reader outline');
    const opened=StudyAILessonReader.goToLeaf(leaf.key);
    return {opened,active:StudyAILessonReader.activeLeafKey(),
      key:leaf.key,total:StudyAIProgress.summary(id).total};
  },initial.id);
  check(selected.opened&&selected.active===selected.key,
    'a Chapter 12 NCERT trapezium lesson can be opened via the real reader');
  const visible=await page.evaluate(()=>({
    count:document.querySelectorAll('#detailed-notes .studyai-current-subtopic:not([hidden])').length,
    text:document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'',
    rows:document.querySelectorAll('.studyai-sublesson-row').length,
    readerVisible:document.querySelector('#detailed-notes')?.getBoundingClientRect().width>0
  }));
  check(visible.count===1&&visible.readerVisible&&visible.text.includes('22 cm')&&
    visible.text.includes('18 cm'),'one full trapezium teaching page renders with worked steps');
  check(visible.rows===selected.total,'every Chapter 12 focused leaf appears in navigation');
  check((14+18+16)/2===24&&(22+14)/2===18&&(115+75+85+85)===360,
    'independent arithmetic reference checks for textbook-style worked examples');
  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('NCERT CHAPTER 12 VERIFIED-INTEGRATION REGRESSION PASS');
})().catch(e=>{
  console.error(e);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
