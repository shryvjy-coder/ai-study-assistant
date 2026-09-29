/* Focused regression tests for StudyAI Today / guided sessions.
 * Run after installing Playwright: node tests/product-experience.cjs */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-product-test-'));
const port=process.env.TEST_PRODUCT_PORT||'5101';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,FLASK_DEBUG:'1',DATABASE_PATH:path.join(dir,'test.sqlite')},
  stdio:['ignore','ignore','pipe']
});
let browser,checks=0,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-10000)});
const check=(value,message)=>{assert.ok(value,message);checks++;console.log('PASS',message)};

(async()=>{
  for(let i=0;i<80;i++){
    try{if((await fetch(url+'/api/health')).ok)break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  await page.waitForSelector('#today-dashboard');
  if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();

  check(await page.locator('#main-nav a[href="#today"]').count()===1,'Today is in primary navigation');
  check(await page.locator('#today-dashboard').count()===1,'Today dashboard renders');
  check(await page.evaluate(()=>StudyAIProduct.confidence(2).label==='Limited evidence'&&StudyAIProduct.confidence(10).label==='Developing evidence'&&StudyAIProduct.confidence(25).label==='Strong evidence'),'evidence confidence bands are stable');

  await page.evaluate(()=>{
    state.mastery={};state.masteryHistory=[];state.mistakes=[];state.review=[];
    state.flashcardSchedule={};state.reviewCardCatalog={};state.learningGoals=[];
    state.smartPlannerPlan=null;state.satPlannerPlan=null;
    StudyAIProduct.savePrefs({pathway:'CBSE',grade:'Class 9',subject:'Mathematics',dailyMinutes:35,onboardingComplete:true,createdAt:Date.now()});
  });
  check(await page.evaluate(()=>{
    const steps=StudyAIProduct.buildSession(35);
    return steps.length>0&&steps[0].type==='curriculum-start'&&!steps.some(x=>x.type==='adaptive');
  }),'school pathway never falls back to SAT practice');

  await page.evaluate(()=>StudyAIProduct.startSession(35));
  check(await page.evaluate(()=>StudyAIProduct.getActiveSession()?.minutes===35),'custom guided-session length is preserved');
  check(await page.evaluate(()=>StudyAIPracticeBridge.getBetaMetrics()?.sessionsStarted>=1),'session start records privacy-light beta signal');

  await page.evaluate(()=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Mathematics');
    StudyAIPracticeBridge.recordAttempt({id:'product-regression',entry:e,stem:'Regression evidence',options:['A','B'],answer:0},0,true,'product-regression');
    StudyAIProduct.reconcileSession();
  });
  check(await page.evaluate(()=>{
    const step=StudyAIProduct.getActiveSession()?.steps?.[0];
    return step?.done===true&&step?.verified===true;
  }),'real answered practice verifies the corresponding school session step');

  await page.evaluate(()=>{
    state.mastery={};state.masteryHistory=[];state.mistakes=[];state.review=[];
    state.flashcardSchedule={};state.reviewCardCatalog={};state.learningGoals=[];
    state.smartPlannerPlan=null;state.satPlannerPlan=null;
    StudyAIPracticeBridge.saveActiveStudySession(null);
    localStorage.removeItem('studyai-active-session-v1');
    StudyAIProduct.savePrefs({pathway:'SAT',grade:'',subject:'',dailyMinutes:40,onboardingComplete:true,createdAt:Date.now()});
  });
  check(await page.evaluate(()=>{
    const steps=StudyAIProduct.buildSession(20);
    return steps.length>0&&steps[0].type==='adaptive';
  }),'SAT pathway gets adaptive SAT fallback when there is no evidence');

  await page.evaluate(()=>StudyAIProduct.startSession(55));
  check(await page.evaluate(()=>StudyAIProduct.getActiveSession()?.minutes===55),'55-minute custom SAT session works');
  await page.reload();await page.waitForSelector('#today-dashboard');
  check(await page.evaluate(()=>StudyAIProduct.prefs().pathway==='SAT'&&StudyAIProduct.getActiveSession()?.minutes===55),'product preferences and active session survive browser restart');
  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('TOTAL',checks,'product-experience checks passed');
})().catch(error=>{
  console.error(error);
  console.error(serverErrors);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close();
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
