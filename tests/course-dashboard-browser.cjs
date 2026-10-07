const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-course-dashboard-'));
const port=process.env.TEST_COURSE_DASHBOARD_PORT||'5110';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,SECRET_KEY:'course-dashboard-ci-placeholder-key',FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser,checks=0,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-10000)});
const check=(value,message)=>{assert.ok(value,message);checks++;console.log('PASS',message)};

async function dismissFirstRun(page){
  await page.waitForTimeout(700);
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
  await page.evaluate(()=>location.hash='#today');
  await page.waitForSelector('#today:not([hidden])');
}

(async()=>{
  for(let i=0;i<100;i++){
    try{if((await fetch(url+'/api/health')).ok)break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }

  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));

  await page.goto(url+'#today',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#today-dashboard');
  await dismissFirstRun(page);

  check((await page.locator('#main-nav a[href="#today"]').textContent()).trim()==='Dashboard','primary navigation labels Today route as Dashboard');
  check(await page.locator('#today:not([hidden])').count()===1&&await page.locator('#study[hidden]').count()===1,'Dashboard is a separate routed page');
  check(await page.locator('#course-empty-state:not(.hidden)').count()===1,'new dashboard starts with an Add Course empty state');

  await page.locator('#open-add-course').click();
  check(await page.locator('#add-course-dialog[open]').count()===1,'Add Course opens as a focused dialog');
  await page.locator('#course-board').selectOption({label:'CBSE'});
  await page.locator('#course-grade').selectOption({label:'Class 9'});
  await page.locator('#course-subject').selectOption({label:'Mathematics'});
  check((await page.locator('#course-dialog-meta').textContent()).includes('14 StudyAI topics'),'Add Course uses real curriculum topic counts');
  await page.locator('#add-course-confirm').click();
  await page.waitForFunction(()=>document.querySelectorAll('#my-course-grid .course-card').length===1);
  check((await page.locator('#my-course-grid').textContent()).includes('Mathematics'),'selected course appears in My Courses');
  check(await page.evaluate(()=>Array.isArray(state.selectedCourses)&&state.selectedCourses.length===1),'selected course persists in StudyAI state');

  await page.locator('#dashboard-add-another').click();
  await page.locator('#course-board').selectOption({label:'CBSE'});
  await page.locator('#course-grade').selectOption({label:'Class 9'});
  await page.locator('#course-subject').selectOption({label:'Science'});
  await page.locator('#add-course-confirm').click();
  await page.waitForFunction(()=>document.querySelectorAll('#my-course-grid .course-card').length===2);
  check((await page.locator('#dashboard-course-count').textContent()).trim()==='2','dashboard counts selected courses');

  await page.evaluate(()=>{
    const topic=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics');
    state.completed=[topic.id];
    save();
  });
  await page.waitForFunction(()=>document.querySelector('#dashboard-topic-progress')?.textContent.trim()==='1 / 27');
  check((await page.locator('#dashboard-topic-progress').textContent()).trim()==='1 / 27','dashboard completion is scoped to selected courses');
  check((await page.locator('#dashboard-mastery').textContent()).trim()==='—','marking a note complete does not create mastery');

  await page.locator('#my-course-grid .course-card').first().locator('[data-open-course]').click();
  await page.waitForSelector('#study:not([hidden])');
  const locationHash=await page.evaluate(()=>location.hash);\n  check(locationHash==='#study','course card routes into the Study page');
  check((await page.locator('#board-filter').inputValue())==='CBSE'&&(await page.locator('#grade-filter').inputValue())==='Class 9','course card opens the correct curriculum in Study');

  await page.evaluate(()=>location.hash='#today');
  await page.waitForSelector('#today:not([hidden])');
  await page.locator('#my-course-grid .course-card').first().locator('[data-remove-course]').click();
  await page.waitForFunction(()=>document.querySelectorAll('#my-course-grid .course-card').length===1);
  check(await page.evaluate(()=>state.selectedCourses.length===1),'courses can be removed from My Courses');

  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForSelector('#today-dashboard');
  await dismissFirstRun(page);
  check(await page.locator('#my-course-grid .course-card').count()===1,'selected courses survive reload');
  check(errors.length===0,'dashboard and Add Course produce no browser JavaScript errors: '+errors.join(' | '));

  console.log('TOTAL',checks,'course-dashboard checks passed');
})().catch(err=>{console.error(err);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill('SIGTERM');
  rmSync(dir,{recursive:true,force:true});
});