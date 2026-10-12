/* Real browser regression for original Chapter 14 and NCERT-grounded corrections. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch14-'));
const port=process.env.TEST_CH14_PORT||'5152',base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'ch14-ncert-browser-ci-key',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
    DATABASE_PATH:path.join(dir,'studyai.sqlite')},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',chunk=>{stderr=(stderr+String(chunk)).slice(-9000)});
const check=(v,message)=>{assert.ok(v,message);console.log('PASS',message)};
(async()=>{
  let ready=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  check(ready,'StudyAI boots with an isolated fresh test database');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',err=>errors.push(String(err.message)));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf &&
    !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Math of Space: Surface Area and Volume']?._studyaiCh14NcertReconciliationV1);
  const info=await page.evaluate(()=>{
    const title='Math of Space: Surface Area and Volume';
    const chapter=CBSE_CLASS9_MATH_FULL_NOTES[title];
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Mathematics'&&e.title===title);
    if(!entry)throw Error('Chapter 14 curriculum ID missing');
    const groups=StudyAIProgress.outline(entry.id),leaves=groups.flatMap(g=>g.leaves);
    const topics=chapter.sections.flatMap(s=>s.subtopics||[]);
    const get=x=>topics.find(t=>t.title===x);
    const text=topics.flatMap(t=>[...(t.paragraphs||[]),...(t.formulas||[]) ]).join(' ');
    const audit=STUDYAI_CLASS9_DEPTH_AUDIT?.[title];
    return {
      id:entry.id,total:leaves.length,groups:groups.length,
      unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
      summary:StudyAIProgress.summary(entry.id).total,
      original:[
        'Why area and volume measure different things',
        'Derive cuboid volume by unit cubes','Special case: a cube',
        'A circle extended through height','Material, labels and open cylinders',
        'Vertical height and slant height are different',
        'Cone volume and the one-third factor','Pyramid geometry and bases',
        'A sphere is determined by its radius','Half a sphere: curved and total surface',
        'Add volumes but remove hidden surface faces',
        'Guesstimation with simple geometric models'
      ].every(x=>!!get(x)),
      newTopics:[
        'Painted cubes: count corners, edges, faces and core',
        'Integer-edged cuboids: prove you found every solution',
        'Packed spheres: calculate the liquid in the gaps'
      ].every(x=>!!get(x)),
      schema:topics.every(t=>t.paragraphs?.length>=2 &&
        (t.examples||[]).length>0 && (t.examples||[]).every(e=>
          typeof e.title==='string'&&typeof e.question==='string'&&
          Array.isArray(e.steps)&&e.steps.length>=2&&typeof e.answer==='string')),
      source:text.includes('Baudhāyana') && text.includes('fraction r/l') &&
        text.includes('1:2:3') && text.includes('n≥2'),
      skills:text.includes('59') && text.includes('2100/121') &&
        text.includes('1024−512π/3') && text.includes('packing'),
      status:audit?.reviewStatus?.includes('human mathematical'),
      sourceRef:audit?.reviewedSource?.includes('iemh206.pdf'),
      topics:topics.length,
      chapter13:!!CBSE_CLASS9_MATH_FULL_NOTES?.['Two Variables, One Line']?._studyaiCh13NcertReconciliationV1
    };
  });
  check(info.original && info.groups>=8,
    'original cuboid, cylinder, cone, pyramid, sphere and application lessons remain');
  check(info.newTopics && info.schema,
    'three focused NCERT skills and non-empty worked examples are present');
  check(info.source && info.skills,
    'key mathematical derivations, cases and textbook applications appear');
  check(info.status && info.sourceRef,
    'source recorded and automated report never claims completed human editorial review');
  check(info.chapter13,'Chapter 13 integration remains available');
  check(info.unique && info.total===info.summary && info.topics>=23,
    'navigation completion keys are unique and counts agree with progress summary');
  const reloaded=await page.evaluate(async()=>{
    await new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='/cbse-class9-maths-depth-ch14-revisions.js';
      s.onload=resolve;s.onerror=()=>reject(Error('Failed reloading Chapter 14 revisions'));
      document.body.append(s);
    });
    return CBSE_CLASS9_MATH_FULL_NOTES['Math of Space: Surface Area and Volume'].sections
      .flatMap(s=>s.subtopics||[]).length;
  });
  check(reloaded===info.topics,'loading the corrections twice adds no duplicate pages');
  const opened=await page.evaluate(id=>{
    const entry=STUDY_DATA.find(e=>e.id===id);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,
      topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    const leaf=StudyAIProgress.outline(entry.id).flatMap(g=>g.leaves)
      .find(t=>t.title==='Integer-edged cuboids: prove you found every solution');
    if(!leaf)throw Error('Integer-cuboid lesson missing from outline');
    const ok=StudyAILessonReader.goToLeaf(leaf.key);
    return {ok,key:leaf.key,active:StudyAILessonReader.activeLeafKey(),
      summary:StudyAIProgress.summary(id).total};
  },info.id);
  check(opened.ok&&opened.key===opened.active,
    'real topic reader navigates to new exhaustive integer-cuboid lesson');
  const display=await page.evaluate(()=>({
    count:document.querySelectorAll('#detailed-notes .studyai-current-subtopic:not([hidden])').length,
    text:document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'',
    rows:document.querySelectorAll('.studyai-sublesson-row').length
  }));
  check(display.count===1 && display.text.includes('59') &&
    display.text.includes('66') && display.rows===opened.summary,
    'single detailed teaching page renders with correct progress navigation');
  check(2*(1*2+2*16+1*16)===100 &&
    2*(2*4+4*7+2*7)===100 &&
    8+12*(5-2)+6*(5-2)**2+(5-2)**3===125,
    'integer-cuboid and painted-cube arithmetic independently verified');
  check(Math.abs((1-1/1.1**2)*100-2100/121)<1e-10 &&
    Math.round(1024-512*Math.PI/3)===488 &&
    37*0+23*0===0,
    'reciprocal percentage and sphere displacement independently verified');
  check(errors.length===0,'no browser JS exceptions: '+errors.join('; '));
  console.log('CHAPTER 14 NCERT RECONCILIATION BROWSER REGRESSION PASS');
})().catch(error=>{console.error(error);console.error(stderr);process.exitCode=1;})
  .finally(async()=>{if(browser)await browser.close().catch(()=>{});
    server.kill();rmSync(dir,{recursive:true,force:true});});
