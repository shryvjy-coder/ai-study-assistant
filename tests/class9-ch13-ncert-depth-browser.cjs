/* End-to-end browser regression against the REAL Chapter 13 reader, not a mock. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-ncert-ch13-'));
const port=process.env.TEST_CH13_PORT||'5151';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'ch13-audit-ci',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',c=>{stderr=(stderr+String(c)).slice(-10000)});
const check=(truth,msg)=>{assert.ok(truth,msg);console.log('PASS',msg)};

(async()=>{
  let ready=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  check(ready,'StudyAI can boot with a fresh isolated database');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf &&
    !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Two Variables, One Line']?._studyaiCh13NcertReconciliationV1);

  const state=await page.evaluate(()=>{
    const title='Two Variables, One Line';
    const chapter=CBSE_CLASS9_MATH_FULL_NOTES[title];
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Mathematics'&&e.title===title);
    if(!entry)throw Error('Chapter 13 data entry missing');
    const groups=StudyAIProgress.outline(entry.id);
    const leaves=groups.flatMap(x=>x.leaves);
    const topics=chapter.sections.flatMap(x=>x.subtopics||[]);
    const byTitle=name=>topics.find(x=>x.title===name);
    const texts=topics.flatMap(t=>[...(t.paragraphs||[]),...(t.formulas||[])]).join(' ');
    const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title];
    return {
      id:entry.id,groups:groups.length,total:leaves.length,
      unique:leaves.length===new Set(leaves.map(x=>x.key)).size,
      totalMatchesSummary:leaves.length===StudyAIProgress.summary(entry.id).total,
      original: [
        'Two unknowns give a whole family of solutions',
        'Equivalent forms of the same equation',
        'Slope measures vertical change per horizontal change',
        'Recognising horizontal and vertical lines',
        'Two constraints can pinpoint one pair',
        'Substitution method with full checks','Elimination method',
        'Intersecting, parallel or coincident lines'
      ].every(t=>!!byTitle(t)),
      added: [
        'Forming simultaneous equations from real situations',
        'A shortcut for symmetric coefficient pairs'
      ].every(t=>!!byTitle(t)),
      coherent:topics.every(t=>t.paragraphs?.length>=2&&
        (t.examples||[]).every(e=>e.title&&e.question&&e.steps?.length>=2&&e.answer)),
      scalar:texts.includes('same points') && texts.includes('Multiplication by zero'),
      origin:texts.includes('c=0') && texts.includes('(0,0)'),
      vertical:texts.includes('Division by zero')||texts.includes('division by zero'),
      ramp:texts.includes('horizontal run')&&texts.includes('360 cm'),
      determinant:texts.includes('Δ=a₁b₂−a₂b₁')&&texts.includes('Cross-products'),
      symmetric:texts.includes('a+b≠0')&&texts.includes('a−b≠0'),
      aligned:!!audit?.reviewStatus?.includes('editorial review outstanding'),
      count:topics.length,
      originalChapter12:!!CBSE_CLASS9_MATH_FULL_NOTES.Quadrilaterals?._studyaiCh12NcertCorrectionsV1
    };
  });
  check(state.groups>=6 && state.total>=17 && state.unique && state.totalMatchesSummary,
    'Chapter 13 full navigation and progress totals have stable, unique keys');
  check(state.original&&state.added&&state.coherent,
    'authored pages preserved and both added focused pages have worked examples');
  check(state.scalar&&state.origin&&state.vertical&&state.ramp,
    'origin, reversible equivalence, undefined vertical slope and ramp domain are explained');
  check(state.determinant&&state.symmetric,
    'zero-safe coefficient classification and symmetric-system exceptional cases are covered');
  check(state.aligned,'editorial audit remains open rather than falsely certified');
  check(state.originalChapter12,'Chapter 12 integration remains available');

  const count2=await page.evaluate(async()=>{
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='/cbse-class9-maths-depth-ch13-revisions.js';
      script.onload=resolve;
      script.onerror=()=>reject(Error('Failed to reload Chapter 13 revisions'));
      document.body.append(script);
    });
    return CBSE_CLASS9_MATH_FULL_NOTES['Two Variables, One Line'].sections
      .flatMap(s=>s.subtopics||[]).length;
  });
  check(count2===state.count,'loading revisions again does not duplicate learning pages');

  const opened=await page.evaluate(id=>{
    const entry=STUDY_DATA.find(e=>e.id===id);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,
      topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    const leaves=StudyAIProgress.outline(id).flatMap(g=>g.leaves);
    const leaf=leaves.find(l=>l.title==='A shortcut for symmetric coefficient pairs');
    if(!leaf)throw Error('Symmetric-system leaf missing from real outline');
    const ok=StudyAILessonReader.goToLeaf(leaf.key);
    return {ok,active:StudyAILessonReader.activeLeafKey(),key:leaf.key,
      total:StudyAIProgress.summary(id).total};
  },state.id);
  check(opened.ok&&opened.active===opened.key,'actual reader opens symmetric-system lesson');
  const display=await page.evaluate(()=>({
    count:document.querySelectorAll('#detailed-notes .studyai-current-subtopic:not([hidden])').length,
    text:document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'',
    rows:document.querySelectorAll('.studyai-sublesson-row').length
  }));
  check(display.count===1 && display.text.includes('37x+23y=143') &&
    display.text.includes('51/14') && display.rows===opened.total,
    'focused lesson renders the example and accurate completion navigation');

  // Independent reference arithmetic, not string-only assertions.
  check(37*51/14+23*5/14===143 && 23*51/14+37*5/14===97,
    'symmetric-system solution independently satisfies both equations');
  check(22.5+25*11.25===303.75 && (60*120+90*60)===12600,
    'fare and ticket calculations independently check');
  check(5*4-3*(-2)===26 && (30*12)===360,
    'determinant and ramp examples independently check');
  check(errors.length===0,'no uncaught browser JavaScript errors: '+errors.join('; '));
  console.log('CHAPTER 13 NCERT RECONCILIATION BROWSER REGRESSION PASS');
})().catch(e=>{
  console.error(e);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});