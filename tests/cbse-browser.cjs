const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-cbse-browser-'));
const port=process.env.TEST_CBSE_PORT||'5104';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
  cwd:path.join(__dirname,'..'),
  env:{...process.env,PORT:port,FLASK_DEBUG:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),COOKIE_SECURE:'0'},
  stdio:['ignore','ignore','pipe']
});
let browser,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check=(value,message)=>{assert.ok(value,message);console.log('PASS',message)};

async function dismiss(page){
  if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();
  await page.waitForSelector('#help-guided-tour:not(.hidden)',{timeout:3000}).catch(()=>{});
  if(await page.locator('#help-guided-tour:not(.hidden)').count()){
    await page.locator('[data-tour-skip]').click();
    await page.locator('[data-tour-skip-confirm]').click();
    await page.waitForFunction(()=>document.querySelector('#help-guided-tour')?.classList.contains('hidden'));
  }
}

async function choose(page,grade,subject){
  await page.selectOption('#board-filter','CBSE');
  await page.selectOption('#grade-filter',grade);
  await page.selectOption('#subject-filter',subject);
  await page.waitForTimeout(150);
}

(async()=>{
  for(let i=0;i<100;i++){
    try{if((await fetch(url+'/api/health')).ok)break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#chapter-list');
  await page.waitForTimeout(800);
  await dismiss(page);

  await choose(page,'Class 9','English');
  check(await page.locator('#chapter-count').textContent()==='8','Class 9 Kaveri is represented as 8 NCERT units');
  check(await page.locator('.chapter-book-label').filter({hasText:'Kaveri'}).count()===1,'Class 9 English shows Kaveri source grouping');
  check(await page.locator('.chapter-item').first().textContent().then(x=>x.includes('How I Taught My Grandmother to Read')),'first Kaveri unit matches NCERT order');

  await choose(page,'Class 9','Social Science');
  check(await page.locator('#chapter-count').textContent()==='9','Class 9 Understanding Society Part 1 has 9 chapters');
  check(await page.locator('.chapter-item').last().textContent().then(x=>x.includes('The Price Puzzle')),'Class 9 Social Science final chapter matches supplied book');

  await choose(page,'Class 9','Hindi');
  check(await page.locator('#chapter-count').textContent()==='12','Class 9 Ganga has 12 main chapters');

  await choose(page,'Class 10','Hindi Course A');
  check(await page.locator('#chapter-count').textContent()==='15','Class 10 Hindi Course A exposes Kshitij and Kritika chapters');
  check(await page.locator('.chapter-book-label').count()===2,'Hindi Course A is grouped by both NCERT books');

  await choose(page,'Class 10','Hindi Course B');
  check(await page.locator('#chapter-count').textContent()==='17','Class 10 Hindi Course B exposes Sparsh and Sanchayan chapters');
  check(await page.locator('.chapter-book-label').count()===2,'Hindi Course B is grouped by both NCERT books');

  await choose(page,'Class 12','Biology');
  check(await page.locator('#chapter-count').textContent()==='13','Class 12 Biology includes all 13 current NCERT chapters');
  check(await page.locator('.chapter-item').filter({hasText:'Biodiversity and Conservation'}).count()===1,'Class 12 Biology includes Biodiversity and Conservation');

  await choose(page,'Class 12','Geography');
  check(await page.locator('#chapter-count').textContent()==='21','Class 12 Geography includes 21 chapters across three books');
  check(await page.locator('.chapter-item').filter({hasText:'International Trade'}).count()===2,'duplicate chapter titles from different Geography books coexist');
  const ids=await page.locator('.chapter-item').filter({hasText:'International Trade'}).evaluateAll(nodes=>nodes.map(n=>n.dataset.id));
  check(ids.length===2&&ids[0]!==ids[1],'duplicate Geography titles use distinct curriculum IDs');

  const target=page.locator('.chapter-item').filter({hasText:'International Trade'}).last();
  await target.click();
  check((await page.locator('#note-breadcrumb').textContent()).includes('India: People and Economy'),'opening duplicate title resolves the correct source book');
  check((await page.locator('#detailed-notes').textContent()).includes('Evidence, comparison and interpretation'),'humanities notes use subject-aware study guidance');

  await choose(page,'Class 11','English Elective');
  check(await page.locator('#chapter-count').textContent()==='27','Class 11 English Elective loads Woven Words');
  await page.locator('.chapter-item').first().click();
  check((await page.locator('#detailed-notes').textContent()).includes('Language, structure and evidence'),'literature notes use language-analysis guidance');

  const subjects=await page.evaluate(()=>[...document.querySelectorAll('#subject-filter option')].map(o=>o.value));
  check(subjects.includes('English Elective'),'curriculum filters remain operational after repeated subject changes');
  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('CBSE BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close();
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});