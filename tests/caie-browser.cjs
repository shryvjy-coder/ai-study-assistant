const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-caie-browser-'));
const port=process.env.TEST_CAIE_PORT||'5105';
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

async function choosePhysics(page){
  await page.selectOption('#board-filter','Cambridge International AS & A Level');
  await page.selectOption('#grade-filter','AS Level (11)');
  await page.selectOption('#subject-filter','Physics');
  await page.waitForTimeout(200);
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
  await choosePhysics(page);

  check(await page.locator('#chapter-count').textContent()==='12','AS Physics exposes exactly 12 syllabus topics including practical skills');
  check(await page.locator('.chapter-book-label').filter({hasText:'Physics 9702'}).count()===1,'AS Physics is grouped under Physics 9702');

  const status=await page.evaluate(()=>window.STUDYAI_CAIE_AS_PHYSICS_DEEP_NOTES_STATUS);
  check(status?.total===12&&status?.matched===12&&status?.unmatched?.length===0,'all 12 CAIE AS Physics deep notes attach at runtime');

  const coverage=await page.evaluate(()=>{
    const rows=(window.STUDYAI_CURRICULUM||[]).filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Physics');
    return {
      total:rows.length,
      verified:rows.filter(e=>e.notesVerified===true&&e.deepNotes?.overview&&e.deepNotes?.concepts?.length>=7&&e.deepNotes?.selfCheck?.length>=5).length,
      ids:rows.map(e=>e.id)
    };
  });
  check(coverage.total===12&&coverage.verified===12,'every AS Physics topic has verified deep-note structure');
  check(new Set(coverage.ids).size===12,'AS Physics mastery IDs remain unique');

  await page.locator('.chapter-item').filter({hasText:'Physical Quantities and Units'}).click();
  let text=await page.locator('#detailed-notes').textContent();
  check(text.includes('Random and systematic error')&&text.includes('Dimensional homogeneity'),'measurement chapter renders syllabus-specific uncertainty and dimension content');
  check(text.includes('Accuracy is closeness')&&text.includes('percentage uncertainty'),'measurement chapter renders key distinctions and calculation guidance');

  await page.locator('.chapter-item').filter({hasText:'Waves'}).click();
  text=await page.locator('#detailed-notes').textContent();
  check(text.includes('Doppler effect')&&text.includes('Malus'),'Waves renders Doppler and polarisation coverage');

  await page.locator('.chapter-item').filter({hasText:'D.C. Circuits'}).click();
  text=await page.locator('#detailed-notes').textContent();
  check(text.includes('Kirchhoff first law')&&text.includes('Potentiometer and null method'),'D.C. Circuits renders conservation laws and null-method content');

  await page.locator('.chapter-item').filter({hasText:'Particle Physics'}).click();
  text=await page.locator('#detailed-notes').textContent();
  check(text.includes('Quarks')&&text.includes('Leptons')&&text.includes('proton = uud'),'Particle Physics renders quark and lepton structure');

  await page.locator('.chapter-item').filter({hasText:'AS Practical Skills'}).click();
  text=await page.locator('#detailed-notes').textContent();
  check(text.includes('Graph layout')&&text.includes('best-fit line')&&text.includes('Uncertainty'),'AS Practical Skills renders graph, uncertainty and evaluation guidance');

  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('CAIE AS PHYSICS BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close();
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
