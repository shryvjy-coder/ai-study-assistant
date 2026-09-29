/* Pre-beta browser smoke tests for mobile UX, accessibility, SAT mocks, Desmos,
 * Personal AI failure states, reporting, navigation, and console stability. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-prebeta-browser-'));
const port=process.env.TEST_PREBETA_PORT||'5102';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{
    ...process.env,
    PORT:port,
    SECRET_KEY:'prebeta-browser-local-secret-key-0123456789',
    FLASK_DEBUG:'0',
    COOKIE_SECURE:'0',
    DATABASE_PATH:path.join(dir,'test.sqlite'),
    BETA_ACCESS_CODE:'beta-browser-code',
    GEMINI_API_KEY:''
  },
  stdio:['ignore','ignore','pipe']
});
let browser,checks=0,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check=(value,message)=>{assert.ok(value,message);checks++;console.log('PASS',message)};

(async()=>{
  for(let i=0;i<100;i++){
    try{if((await fetch(url+'/api/health')).ok)break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }

  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('dialog',dialog=>dialog.accept());
  await page.route('https://www.desmos.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Desmos test fixture</title>'}));

  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#today-dashboard');
  if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();

  check(await page.locator('html[lang="en"]').count()===1,'document language is declared');
  check(await page.locator('#main-content').count()===1,'main content has a keyboard skip target');
  check(await page.locator('.skip-link[href="#main-content"]').count()===1,'skip-to-content link is present');
  check(await page.locator('#main-nav[aria-label="Primary navigation"]').count()===1,'primary navigation is labelled');

  await page.locator('#account-button').click();
  await page.locator('#auth-register-tab').click();
  check(await page.locator('#auth-beta-field:not(.hidden)').count()===1&&await page.locator('#auth-beta-code').getAttribute('required')!==null,
    'invite-only registration UI requires a private beta access code');
  await page.locator('#auth-close').click();

  const duplicateIds=await page.evaluate(()=>{
    const counts={};
    document.querySelectorAll('[id]').forEach(el=>counts[el.id]=(counts[el.id]||0)+1);
    return Object.entries(counts).filter(([,count])=>count>1).map(([id])=>id);
  });
  check(duplicateIds.length===0,'rendered page has no duplicate element IDs: '+duplicateIds.join(', '));

  const deadNav=await page.evaluate(()=>[...document.querySelectorAll('#main-nav a[href^="#"]')]
    .map(a=>a.getAttribute('href')).filter(hash=>hash&&hash!=='#'&&!document.querySelector(hash)));
  check(deadNav.length===0,'primary navigation has no dead hash targets: '+deadNav.join(', '));

  await page.setViewportSize({width:390,height:844});
  const menu=page.locator('#mobile-nav-btn');
  await menu.click();
  check(await menu.getAttribute('aria-expanded')==='true','mobile menu exposes expanded state');
  await page.locator('#main-nav a[href="#today"]').click();
  check(await menu.getAttribute('aria-expanded')==='false','mobile menu closes after navigation');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),
    '390px main experience has no page-level horizontal overflow');

  await page.locator('.skip-link').focus();
  check(await page.evaluate(()=>document.activeElement?.classList.contains('skip-link')),
    'skip link is keyboard focusable');

  await page.setViewportSize({width:1280,height:900});
  await page.evaluate(async()=>{await StudyAIPerformance.loadFeature('practice')});
  await page.waitForSelector('#sat-exam-lab');
  check(await page.locator('#mock-test-grid [data-start-mock]').count()===4,'four SAT mock tests render');

  await page.locator('#open-desmos').click();
  await page.waitForSelector('#desmos-panel:not(.hidden)');
  check((await page.locator('#desmos-testing-frame').getAttribute('src'))==='https://www.desmos.com/testing/collegeboard/graphing',
    'SAT calculator opens College Board Desmos graphing version');
  await page.locator('[data-desmos-mode="scientific"]').click();
  check((await page.locator('#desmos-testing-frame').getAttribute('src'))==='https://www.desmos.com/testing/collegeboard/scientific',
    'SAT calculator switches to College Board Desmos scientific version');
  await page.locator('#desmos-close').click();

  await page.locator('[data-start-mock="1"]').click();
  await page.waitForSelector('#mock-setup-dialog[open]');
  await page.locator('input[name="mock-section"][value="math"] + span').click();
  await page.locator('#mock-setup-begin').click();
  await page.waitForSelector('#mock-exam-shell:not(.hidden)');
  check((await page.locator('#mock-section-label').textContent()).includes('Math'),'Math-only SAT mock starts in Math');
  check(await page.locator('#mock-question-pane h3').count()===1,'SAT mock renders an active question');
  check(await page.locator('#mock-formula-btn:not(.hidden)').count()===1,'Math mock exposes the formula sheet');
  await page.locator('#mock-formula-btn').click();
  check(await page.locator('#mock-formula-overlay:not(.hidden)').count()===1,'Math formula sheet opens');
  await page.locator('#mock-formula-close').click();

  let strikeoutFound=false;
  for(let i=0;i<22&&!strikeoutFound;i++){
    if(await page.locator('[data-eliminate]').count()){
      strikeoutFound=true;
      const eliminate=page.locator('[data-eliminate]').first();
      await eliminate.click();
      check(await eliminate.getAttribute('aria-pressed')==='true','SAT mock strikeout marks an option eliminated');
      const struck=page.locator('.mock-option.struck').first();
      check(await struck.getAttribute('aria-disabled')==='true','struck SAT option is exposed as unavailable');
      await page.locator('[data-eliminate].active').first().click();
    }else if(i<21){
      await page.locator('#mock-next').click();
    }
  }
  check(strikeoutFound,'Math mock contains a multiple-choice question with strikeout controls');

  await page.waitForSelector('#mock-question-pane [data-report-question="mock"]');
  await page.locator('#mock-question-pane [data-report-question="mock"]').click();
  await page.waitForSelector('#question-report-dialog[open]');
  await page.locator('#question-report-form textarea').fill('Pre-beta browser smoke report.');
  await page.locator('#question-report-form [type="submit"]').click();
  await page.waitForFunction(()=>document.querySelector('#question-report-status')?.textContent.includes('Thanks'));
  check(true,'question-reporting UI submits from a live SAT mock');
  await page.waitForFunction(()=>!document.querySelector('#question-report-dialog')?.open);

  await page.locator('#question-review-page').click();
  await page.waitForSelector('#review-submit');
  await page.locator('#review-submit').click();
  await page.waitForSelector('.module-transition');
  await page.locator('#continue-mock').click();
  await page.waitForFunction(()=>document.querySelector('#mock-module-label')?.textContent.includes('Module 2'));
  check((await page.locator('#mock-module-label').textContent()).includes('22 questions'),
    'adaptive Math Module 2 loads with the expected question count');

  await page.locator('#mock-exit').click();
  await page.waitForFunction(()=>document.querySelector('#mock-exam-shell')?.classList.contains('hidden'));

  await page.locator('[data-start-mock="2"]').click();
  await page.waitForSelector('#mock-setup-dialog[open]');
  await page.locator('input[name="mock-section"][value="both"] + span').click();
  await page.locator('#mock-setup-begin').click();
  await page.waitForSelector('#mock-exam-shell:not(.hidden)');
  check((await page.locator('#mock-section-label').textContent()).includes('Reading & Writing'),
    'full SAT mock starts with Reading & Writing Module 1');
  await page.locator('#mock-exit').click();
  await page.waitForFunction(()=>document.querySelector('#mock-exam-shell')?.classList.contains('hidden'));

  await page.route('**/api/personal-ai/status',route=>route.fulfill({json:{
    ok:true,configured:false,daily_limits:{text:60,audio:10},daily_remaining:null
  }}));
  await page.evaluate(async()=>{await StudyAIPerformance.loadFeature('personalAI')});
  await page.waitForSelector('#personal-ai');
  await page.waitForFunction(()=>document.querySelector('#pai-provider-status')?.textContent.includes('Gemini key not configured'));
  check(true,'Personal AI clearly reports an unconfigured Gemini provider');

  await page.locator('#pai-paste summary').click();
  await page.locator('#pai-paste-title').fill('Smoke source');
  await page.locator('#pai-paste-text').fill('A short source used to verify the Personal AI error state.');
  await page.locator('#pai-add-paste').click();
  await page.locator('[data-pai-mode="summary"]').click();
  await page.waitForFunction(()=>/Gemini API key/i.test(document.querySelector('#pai-message')?.textContent||''));
  check(true,'Personal AI generation fails safely with a useful setup message');

  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('TOTAL',checks,'pre-beta browser checks passed');
})().catch(error=>{
  console.error(error);
  console.error(serverErrors);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close();
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
