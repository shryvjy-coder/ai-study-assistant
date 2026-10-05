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

  const deepStatus=await page.evaluate(()=>window.STUDYAI_GRADE9_DEEP_NOTES_STATUS);
  check(deepStatus?.total===56,'Class 9 deep-note source contains exactly 56 runtime topics');
  check(deepStatus?.matched===56&&deepStatus?.unmatched?.length===0,'all 56 Class 9 deep notes attach to exact runtime chapter/book keys');
  const grade9Coverage=await page.evaluate(()=>{
    const rows=(window.STUDYAI_CURRICULUM||[]).filter(e=>e.board==='CBSE'&&e.grade==='Class 9');
    return {
      total:rows.length,
      verified:rows.filter(e=>e.notesVerified===true&&e.deepNotes?.overview&&e.deepNotes?.concepts?.length>=3&&e.deepNotes?.selfCheck?.length>=3).length
    };
  });
  check(grade9Coverage.total===56&&grade9Coverage.verified===56,'every Class 9 topic has a verified chapter-specific deep-note structure');

  await choose(page,'Class 9','Mathematics');
  await page.locator('.chapter-item').filter({hasText:'The World of Algorithms'}).click();
  const mathDeep=await page.locator('#detailed-notes').textContent();
  check(mathDeep.includes('How to reason through this chapter')&&mathDeep.includes('Euclidean idea'),'Class 9 Mathematics renders chapter-specific algorithm reasoning');

  await choose(page,'Class 9','Science');
  await page.locator('.chapter-item').filter({hasText:'Earth as a System'}).click();
  const scienceDeep=await page.locator('#detailed-notes').textContent();
  check(scienceDeep.includes('Earth spheres')&&scienceDeep.includes('Energy flows through the system'),'Class 9 Science renders textbook-grounded Earth-system distinctions');

  await choose(page,'Class 9','English');
  await page.locator('.chapter-item').first().click();
  const englishDeep=await page.locator('#detailed-notes').textContent();
  check(englishDeep.includes('Literacy and agency')&&englishDeep.includes('Vocabulary to know'),'Class 9 Kaveri renders unit-specific literature notes and vocabulary');

  await choose(page,'Class 9','Hindi');
  await page.locator('.chapter-item').filter({hasText:'रीढ़ की हड्डी'}).click();
  const hindiDeep=await page.locator('#detailed-notes').textContent();
  check(hindiDeep.includes('स्त्री-शिक्षा')&&hindiDeep.includes('उमा का चरित्र'),'Class 9 Ganga renders पाठ-specific Hindi analysis');

  await choose(page,'Class 9','Social Science');
  await page.locator('.chapter-item').filter({hasText:'The Price Puzzle'}).click();
  const sstDeep=await page.locator('#detailed-notes').textContent();
  check(sstDeep.includes('Movement along versus shift')&&sstDeep.includes('Government intervention'),'Class 9 Social Science renders chapter-specific economics distinctions');

  const grade10Status=await page.evaluate(()=>window.STUDYAI_GRADE10_DEEP_NOTES_STATUS);
  check(grade10Status?.total===109,'Class 10 deep-note source contains exactly 109 runtime topics');
  check(grade10Status?.matched===109&&grade10Status?.unmatched?.length===0,'all 109 Class 10 deep notes attach to exact runtime chapter/book keys');
  const grade10Coverage=await page.evaluate(()=>{
    const rows=(window.STUDYAI_CURRICULUM||[]).filter(e=>e.board==='CBSE'&&e.grade==='Class 10');
    return {
      total:rows.length,
      verified:rows.filter(e=>e.notesVerified===true&&e.deepNotes?.overview&&e.deepNotes?.concepts?.length>=3&&e.deepNotes?.selfCheck?.length>=3).length,
      ids:rows.map(e=>e.id)
    };
  });
  check(grade10Coverage.total===109&&grade10Coverage.verified===109,'every Class 10 topic has a verified chapter-specific deep-note structure');
  check(new Set(grade10Coverage.ids).size===109,'Class 10 topic IDs remain unique for mastery keys');

  await choose(page,'Class 10','Mathematics');
  await page.locator('.chapter-item').filter({hasText:'Real Numbers'}).click();
  const math10Deep=await page.locator('#detailed-notes').textContent();
  check(math10Deep.includes('Fundamental Theorem of Arithmetic')&&math10Deep.includes('proof by contradiction'),'Class 10 Mathematics renders textbook-grounded Real Numbers reasoning');

  await choose(page,'Class 10','Science');
  await page.locator('.chapter-item').filter({hasText:'Electricity'}).click();
  const science10Deep=await page.locator('#detailed-notes').textContent();
  check(science10Deep.includes('resistivity')&&science10Deep.includes('kWh'),'Class 10 Science renders chapter-specific Electricity distinctions');

  await choose(page,'Class 10','English');
  await page.locator('.chapter-item').filter({hasText:'Madam Rides the Bus'}).click();
  const english10Deep=await page.locator('#detailed-notes').textContent();
  check(english10Deep.includes('Valli')&&english10Deep.includes('dead cow'),'Class 10 English renders text-specific literary analysis');

  await choose(page,'Class 10','Social Science');
  await page.locator('.chapter-item').filter({hasText:'Power Sharing'}).click();
  const sst10Deep=await page.locator('#detailed-notes').textContent();
  check(sst10Deep.includes('Belgium')&&sst10Deep.includes('Sri Lanka'),'Class 10 Social Science renders case-grounded democratic analysis');

  await choose(page,'Class 10','Hindi Course A');
  check(await page.locator('#chapter-count').textContent()==='15','Class 10 Hindi Course A exposes Kshitij and Kritika chapters');
  check(await page.locator('.chapter-book-label').count()===2,'Hindi Course A is grouped by both NCERT books');
  await page.locator('.chapter-item').filter({hasText:'नौबतखाने में इबादत'}).click();
  const hindiADeep=await page.locator('#detailed-notes').textContent();
  check(hindiADeep.includes('बिस्मिल्ला खाँ')&&hindiADeep.includes('शहनाई'),'Class 10 Hindi Course A renders पाठ-specific analysis');

  await choose(page,'Class 10','Hindi Course B');
  check(await page.locator('#chapter-count').textContent()==='17','Class 10 Hindi Course B exposes Sparsh and Sanchayan chapters');
  check(await page.locator('.chapter-book-label').count()===2,'Hindi Course B is grouped by both NCERT books');
  await page.locator('.chapter-item').filter({hasText:'हरिहर काका'}).click();
  const hindiBDeep=await page.locator('#detailed-notes').textContent();
  check(hindiBDeep.includes('जमीन')&&hindiBDeep.includes('व्यक्ति-अधिकार'),'Class 10 Hindi Course B renders पाठ-specific analysis');

  await choose(page,'Class 11','Economics');
  check(await page.locator('#chapter-count').textContent()==='13','Class 11 Economics includes all 13 chapters across Statistics and Microeconomics');
  check(await page.locator('.chapter-book-label').count()===2,'Class 11 Economics is grouped by both prescribed NCERT books');
  check(await page.locator('.chapter-item').filter({hasText:'Introduction'}).count()===2,'both Class 11 Economics Introduction chapters coexist');
  const economicsIds=await page.locator('.chapter-item').filter({hasText:'Introduction'}).evaluateAll(nodes=>nodes.map(n=>n.dataset.id));
  check(new Set(economicsIds).size===2,'book-specific Economics Introduction chapters use distinct IDs');

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
