/* NCERT Chapter 14 regression: genuine application data and focused reader, not a mocked notes bank. */
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
  env:{...process.env,PORT:port,SECRET_KEY:'ch14-audit-ci',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),
    GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',c=>{stderr=(stderr+String(c)).slice(-9000)});
const pass=(v,message)=>{assert.ok(v,message);console.log('PASS',message)};
(async()=>{
  let alive=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){alive=true;break}}catch{}
    await new Promise(r=>setTimeout(r,100));
  }
  pass(alive,'StudyAI can boot against an isolated test database');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf &&
    !!window.CBSE_CLASS9_MATH_FULL_NOTES?.['Math of Space: Surface Area and Volume']
       ?._studyaiCh14NcertReconciliationV1,{timeout:12000});
  const state=await page.evaluate(()=>{
    const title='Math of Space: Surface Area and Volume',ch=CBSE_CLASS9_MATH_FULL_NOTES[title];
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
      e.subject==='Mathematics'&&e.title===title);
    if(!entry)throw Error('StudyAI Chapter 14 curriculum entry not found');
    const groups=StudyAIProgress.outline(entry.id);
    const leaves=groups.flatMap(g=>g.leaves);
    const topics=ch.sections.flatMap(s=>s.subtopics||[]);
    const get=t=>topics.find(x=>x.title===t);
    const txt=topics.map(x=>x.paragraphs.join(' ')).join(' ');
    return {
      id:entry.id,total:leaves.length,groups:groups.length,
      original: [
        'Derive cuboid volume by unit cubes','Special case: a cube',
        'A circle extended through height','Material, labels and open cylinders',
        'Vertical height and slant height are different','Cone volume and the one-third factor',
        'Pyramid geometry and bases','A sphere is determined by its radius',
        'Half a sphere: curved and total surface','Add volumes but remove hidden surface faces',
        'Guesstimation with simple geometric models'
      ].every(t=>!!get(t)),
      added:[
        'Cuboids from three face areas and integer dimensions',
        'Painted cube counting and surface-to-volume scaling',
        'Inscribed cylinders and volume-preserving percentage changes',
        'Displacement when spheres fill a container'
      ].every(t=>!!get(t)),
      schema:topics.every(t=>t.title&&t.paragraphs?.length>=2&&
        (t.examples||[]).every(e=>e.title&&e.question&&e.steps?.length>=2&&
          e.steps.every(s=>typeof s==='string'&&s.trim())&&e.answer)),
      unique:leaves.length===new Set(leaves.map(l=>l.key)).size,
      summary:StudyAIProgress.summary(entry.id).total,
      painted:txt.includes('12(n−2)')&&txt.includes('6(n−2)²')&&txt.includes('(n−2)³'),
      archimedes:txt.includes('Archimedes')&&txt.includes('1:2:3')&&txt.includes('4πr²'),
      cone:txt.includes('2πl')&&txt.includes('1/8'),
      conservation:txt.includes('100/121')&&txt.includes('512π/3'),
      review:window.STUDYAI_CLASS9_DEPTH_AUDIT[title]?.reviewStatus||'',
      count:topics.length,
      ch12:!!CBSE_CLASS9_MATH_FULL_NOTES.Quadrilaterals?._studyaiCh12NcertCorrectionsV1,
      ch13:!!CBSE_CLASS9_MATH_FULL_NOTES['Two Variables, One Line']?._studyaiCh13NcertReconciliationV1
    };
  });
  pass(state.original&&state.added,'all existing solids and four added focused NCERT exercise pages present');
  pass(state.schema,'every lesson includes actual explanations and valid worked examples');
  pass(state.groups>=9&&state.total>24&&state.total===state.summary&&state.unique,
    'real outline has complete count, unique progress keys and no missing groups');
  pass(state.painted&&state.archimedes&&state.cone&&state.conservation,
    'painted cubes, sphere ratio, cone geometry and volume-preserving calculations');
  pass(state.review.includes('human editorial review outstanding'),
    'review status remains honest rather than falsely certified');
  pass(state.ch12&&state.ch13,'Chapters 12 and 13 stay loaded with their own audits');

  const afterReload=await page.evaluate(async()=>{
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='/cbse-class9-maths-depth-ch14-revisions.js';
      script.onload=resolve;
      script.onerror=()=>reject(Error('Chapter 14 revisions failed to reload'));
      document.body.append(script);
    });
    return CBSE_CLASS9_MATH_FULL_NOTES['Math of Space: Surface Area and Volume'].sections
      .flatMap(s=>s.subtopics||[]).length;
  });
  pass(afterReload===state.count,'idempotent reload cannot duplicate learning pages');

  const opened=await page.evaluate(id=>{
    const entry=STUDY_DATA.find(e=>e.id===id);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,
      topic:entry.title,topicId:entry.id,component:'All components'};
    renderFilters();
    openTopic(entry.title,entry.id);
    const leaves=StudyAIProgress.outline(id).flatMap(g=>g.leaves);
    const leaf=leaves.find(l=>l.title==='Painted cube counting and surface-to-volume scaling');
    if(!leaf)throw Error('Painted cubes page not found');
    const ok=StudyAILessonReader.goToLeaf(leaf.key);
    return {ok,key:leaf.key,active:StudyAILessonReader.activeLeafKey(),
      total:StudyAIProgress.summary(id).total};
  },state.id);
  pass(opened.ok&&opened.key===opened.active,'painted-cube lesson opens via real reader');
  const visible=await page.evaluate(()=>({
    count:document.querySelectorAll('#detailed-notes .studyai-current-subtopic:not([hidden])').length,
    text:document.querySelector('#detailed-notes .studyai-current-subtopic:not([hidden])')?.innerText||'',
    rows:document.querySelectorAll('.studyai-sublesson-row').length
  }));
  pass(visible.count===1&&visible.text.includes('125')&&visible.text.includes('36')&&
    visible.text.includes('27')&&visible.rows===opened.total,
    'one authored leaf displays complete worked calculations and accurate navigation');
  pass(8+12*(5-2)+6*(5-2)**2+(5-2)**3===125,
    'independent painted cube arithmetic');
  pass(2*(1*2+2*16+1*16)===100&&2*(2*4+4*7+2*7)===100,
    'both integer cuboids independently satisfy surface area');
  pass(Math.abs(1024-512*Math.PI/3-487.8348)<0.001 &&
    Math.abs((2100/121)-17.35537)<0.001,'oil volume and 10 percent radius adjustment recompute');
  pass(5*5+12*12===13*13 &&
    65*Math.PI>200,'cone example independent geometric check');
  pass(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('NCERT CLASS 9 MATH CH14 REAL READER AND DEPTH PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1})
.finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();rmSync(dir,{recursive:true,force:true});
});
