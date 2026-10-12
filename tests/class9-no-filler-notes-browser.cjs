/* Regression: no repetitive chapter-wide filler on Class 9 Maths learning pages. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-no-filler-'));
const port=process.env.TEST_NO_FILLER_PORT||'5153';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'class9-no-filler-test',
    FLASK_DEBUG:'0',COOKIE_SECURE:'0',
    DATABASE_PATH:path.join(dir,'studyai.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let stderr='',browser;
server.stderr.on('data',part=>{stderr=(stderr+String(part)).slice(-9000)});
const check=(condition,description)=>{
  assert.ok(condition,description);
  console.log('PASS',description);
};

(async()=>{
  let ready=false;
  for(let i=0;i<120;i++){
    try{if((await fetch(base+'/api/health')).ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  check(ready,'isolated StudyAI server starts');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1400,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>!!window.StudyAIProgress?.outline &&
    !!window.StudyAILessonReader?.goToLeaf &&
    !!window.STUDYAI_LONG_NOTES_APPLIED);
  const results=await page.evaluate(()=>{
    const unwanted=new Set([
      'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
    ]);
    const entries=STUDY_DATA.filter(e=>e.board==='CBSE'&&
      e.grade==='Class 9'&&e.subject==='Mathematics'&&
      CBSE_CLASS9_MATH_FULL_NOTES?.[e.title]);
    return entries.map(entry=>{
      const outline=StudyAIProgress.outline(entry.id);
      const originalKeys=outline.flatMap(g=>g.leaves.map(l=>l.key));
      const originalTotal=StudyAIProgress.summary(entry.id).total;
      current={board:entry.board,grade:entry.grade,subject:entry.subject,
        topic:entry.title,topicId:entry.id,component:'All components'};
      renderFilters();
      openTopic(entry.title,entry.id);
      const notes=document.querySelector('#detailed-notes');
      const headings=[...notes.querySelectorAll('.note-section.actual-note-topic > h3')]
        .map(node=>node.textContent.trim());
      const raw=CBSE_CLASS9_MATH_FULL_NOTES[entry.title].sections;
      const persisted=outline.flatMap(g=>g.leaves.map(l=>l.key));
      const leaf=outline.flatMap(g=>g.leaves).find(l=>l.kind==='subtopic');
      const opened=leaf?StudyAILessonReader.goToLeaf(leaf.key):false;
      const visible=notes.querySelectorAll('.note-section.actual-note-topic:not([hidden])');
      return {
        chapter:entry.title,
        originalTotal,
        count:headings.length,
        authorSections:raw?.length||0,
        noGeneratedFiller:raw.every(s=>!unwanted.has(s.title)),
        noRenderedFiller:headings.every(title=>!unwanted.has(title)),
        noFillerInOutline:outline.every(g=>!unwanted.has(g.title)),
        keysStable:JSON.stringify(originalKeys)===JSON.stringify(persisted) &&
          originalTotal===StudyAIProgress.summary(entry.id).total,
        focused:opened&&visible.length===1 &&
          visible[0].querySelectorAll('.studyai-current-subtopic:not([hidden])').length===1,
        renderedTeaching:notes.textContent.includes(leaf?.title||'~') &&
          headings.length>0
      };
    });
  });
  check(results.length===14,'all fourteen Class 9 Maths chapters checked');
  for(const result of results){
    check(result.noGeneratedFiller&&result.noRenderedFiller&&result.noFillerInOutline,
      result.chapter+': no generic chapter coverage, exam application, traps, or mastery sections');
    check(result.keysStable&&result.originalTotal>0,
      result.chapter+': existing completion keys and progress count remain intact');
    check(result.focused&&result.renderedTeaching,
      result.chapter+': real authored subtopic still opens in focused reading mode');
  }
  check(errors.length===0,'no uncaught reader errors: '+errors.join('; '));
  console.log('CLASS 9 NO-FILLER NOTES BROWSER REGRESSION PASS');
})().catch(error=>{
  console.error(error);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
