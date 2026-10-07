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
  await page.evaluate(()=>location.hash='#study');
  await page.waitForSelector('#study:not([hidden])');
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
  await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
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
  const fullMathCount=await page.evaluate(()=>Object.keys(window.CBSE_CLASS9_MATH_FULL_NOTES||{}).length);
  check(fullMathCount===14,'all 14 Class 9 Mathematics chapters have exam-ready full-note data');
  await page.locator('.chapter-item').filter({hasText:'The World of Numbers'}).click();
  const numberNotes=page.locator('#detailed-notes');
  const numberText=await numberNotes.textContent();
  const numberHeadings=await numberNotes.locator('h3').allTextContents();
  check(numberHeadings.includes('Rational numbers')&&numberHeadings.includes('Irrational numbers')&&numberHeadings.includes('Density of rational numbers')&&numberHeadings.includes('Decimal expansions of real numbers'),'Class 9 Mathematics renders detailed chapter-specific subtopics');
  check(!/Chapter overview|Key concepts and explanations|How to reason through this chapter|Exam focus and common mistakes|Quick revision|Self-check/.test(numberText),'Class 9 Mathematics Full notes removes generic study-template sections');
  check(numberText.length>3500,'The World of Numbers contains exam-ready detailed notes ('+numberText.length+' chars)');
  check(await numberNotes.locator('.worked-box').count()>=3,'The World of Numbers includes multiple worked examples');
  check(await numberNotes.locator('.exam-box').count()>=2,'The World of Numbers includes targeted exam tips inside relevant subtopics');
  check(numberText.includes('p/q')&&numberText.includes('non-terminating and non-repeating')&&numberText.includes('contradiction'),'Class 9 Mathematics Full notes contains definitions, classification and proof reasoning');
  const mathButtons=page.locator('.chapter-item');
  const mathChapterCount=await mathButtons.count();
  let detailedChapters=0;
  for(let i=0;i<mathChapterCount;i++){
    await mathButtons.nth(i).click();
    const txt=(await page.locator('#detailed-notes').textContent()||'').trim();
    if(txt.length>1200&&await page.locator('#detailed-notes .note-section').count()>=4)detailedChapters++;
  }
  check(detailedChapters===14,'all 14 Class 9 Mathematics chapters render substantial multi-section notes');
  await page.locator('.chapter-item').filter({hasText:'The World of Algorithms'}).click();
  const mathDeep=await page.locator('#detailed-notes').textContent();
  check(mathDeep.includes('Euclid')&&mathDeep.includes('gcd')&&mathDeep.includes('Data structures and tracing'),'Class 9 Mathematics renders detailed algorithm notes');

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

  const grade11Status=await page.evaluate(()=>window.STUDYAI_GRADE11_DEEP_NOTES_STATUS);
  check(grade11Status?.total===286,'Class 11 deep-note layer contains exactly 286 runtime topics');
  check(grade11Status?.matched===286&&grade11Status?.unmatched?.length===0,'all 286 Class 11 deep notes attach to the final runtime curriculum');
  const grade11Coverage=await page.evaluate(()=>{
    const rows=(window.STUDYAI_CURRICULUM||[]).filter(e=>e.board==='CBSE'&&e.grade==='Class 11');
    return {
      total:rows.length,
      verified:rows.filter(e=>e.notesVerified===true&&e.deepNotes?.overview&&e.deepNotes?.concepts?.length>=3&&e.deepNotes?.reasoning?.length>=3&&e.deepNotes?.examTips?.length>=2&&e.deepNotes?.selfCheck?.length>=3).length,
      ids:rows.map(e=>e.id)
    };
  });
  check(grade11Coverage.total===286&&grade11Coverage.verified===286,'every Class 11 runtime topic has a verified structured deep note');
  check(new Set(grade11Coverage.ids).size===286,'Class 11 topic IDs remain unique for mastery keys');

  await choose(page,'Class 11','Physics');
  await page.locator('.chapter-item').filter({hasText:'Laws of Motion'}).click();
  const physics11Deep=await page.locator('#detailed-notes').textContent();
  check(physics11Deep.includes('Momentum and impulse')&&physics11Deep.includes('F = ma'),'Class 11 Physics renders chapter-specific laws-of-motion notes and formulas');

  await choose(page,'Class 11','Chemistry');
  await page.locator('.chapter-item').filter({hasText:'Equilibrium'}).click();
  const chemistry11Deep=await page.locator('#detailed-notes').textContent();
  check(chemistry11Deep.includes('Dynamic chemical equilibrium')&&chemistry11Deep.includes('pH = -log'),'Class 11 Chemistry renders equilibrium-specific concepts and formulas');

  await choose(page,'Class 11','Mathematics');
  await page.locator('.chapter-item').filter({hasText:'Limits and Derivatives'}).click();
  const maths11Deep=await page.locator('#detailed-notes').textContent();
  check(maths11Deep.includes('Derivative as rate of change')&&maths11Deep.includes('f′(x)'),'Class 11 Mathematics renders limits-and-derivatives concepts and formula');

  await choose(page,'Class 11','Biology');
  await page.locator('.chapter-item').filter({hasText:'Biomolecules'}).click();
  const biology11Deep=await page.locator('#detailed-notes').textContent();
  check(biology11Deep.includes('Carbohydrates proteins lipids')&&biology11Deep.includes('Nucleic acids'),'Class 11 Biology renders Biomolecules-specific structure');

  await choose(page,'Class 11','Accountancy');
  await page.locator('.chapter-item').filter({hasText:'Bank Reconciliation Statement'}).click();
  const accounts11Deep=await page.locator('#detailed-notes').textContent();
  check(accounts11Deep.includes('Timing differences')&&accounts11Deep.includes('Reconciliation procedure'),'Class 11 Accountancy renders reconciliation-specific notes');

  await choose(page,'Class 11','Business Studies');
  await page.locator('.chapter-item').filter({hasText:'Formation of a Company'}).click();
  const business11Deep=await page.locator('#detailed-notes').textContent();
  check(business11Deep.includes('Promotion')&&business11Deep.includes('Incorporation'),'Class 11 Business Studies renders company-formation concepts');

  await choose(page,'Class 11','Geography');
  await page.locator('.chapter-item[data-topic="Climate"]').click();
  const geography11Deep=await page.locator('#detailed-notes').textContent();
  check(geography11Deep.includes('Monsoon mechanism')&&geography11Deep.includes('Rainfall distribution'),'Class 11 Geography renders India-climate concepts');

  await choose(page,'Class 11','History');
  await page.locator('.chapter-item').filter({hasText:'Writing and City Life'}).click();
  const history11Deep=await page.locator('#detailed-notes').textContent();
  check(history11Deep.includes('Mesopotamia')&&history11Deep.includes('Urbanisation'),'Class 11 History renders theme-specific evidence prompts');

  await choose(page,'Class 11','Psychology');
  await page.locator('.chapter-item').filter({hasText:'Human Memory'}).click();
  const psychology11Deep=await page.locator('#detailed-notes').textContent();
  check(psychology11Deep.includes('Encoding storage retrieval')&&psychology11Deep.includes('Forgetting'),'Class 11 Psychology renders memory-specific concepts');

  await choose(page,'Class 11','Computer Science');
  await page.locator('.chapter-item').filter({hasText:'Flow of Control'}).click();
  const cs11Deep=await page.locator('#detailed-notes').textContent();
  check(cs11Deep.includes('Conditions')&&cs11Deep.includes('Loops'),'Class 11 Computer Science renders official-source programming concepts');

  await choose(page,'Class 11','Economics');
  check(await page.locator('#chapter-count').textContent()==='13','Class 11 Economics includes all 13 chapters across Statistics and Microeconomics');
  check(await page.locator('.chapter-book-label').count()===2,'Class 11 Economics is grouped by both prescribed NCERT books');
  check(await page.locator('.chapter-item').filter({hasText:'Introduction'}).count()===2,'both Class 11 Economics Introduction chapters coexist');
  const economicsIds=await page.locator('.chapter-item').filter({hasText:'Introduction'}).evaluateAll(nodes=>nodes.map(n=>n.dataset.id));
  check(new Set(economicsIds).size===2,'book-specific Economics Introduction chapters use distinct IDs');

  const grade12Status=await page.evaluate(()=>window.STUDYAI_GRADE12_DEEP_NOTES_STATUS);
  check(grade12Status?.total===281,'Class 12 deep-note layer contains exactly 281 runtime topics');
  check(grade12Status?.matched===281&&grade12Status?.unmatched?.length===0,'all 281 Class 12 deep notes attach to the final runtime curriculum');
  const grade12Coverage=await page.evaluate(()=>{
    const rows=(window.STUDYAI_CURRICULUM||[]).filter(e=>e.board==='CBSE'&&e.grade==='Class 12');
    return {
      total:rows.length,
      verified:rows.filter(e=>e.notesVerified===true&&e.deepNotes?.overview&&e.deepNotes?.concepts?.length>=3&&e.deepNotes?.reasoning?.length>=3&&e.deepNotes?.examTips?.length>=2&&e.deepNotes?.selfCheck?.length>=3).length,
      ids:rows.map(e=>e.id)
    };
  });
  check(grade12Coverage.total===281&&grade12Coverage.verified===281,'every Class 12 runtime topic has a verified structured deep note');
  check(new Set(grade12Coverage.ids).size===281,'Class 12 topic IDs remain unique for mastery keys');

  await choose(page,'Class 12','Physics');
  await page.locator('.chapter-item[data-topic="Current Electricity"]').click();
  const physics12Deep=await page.locator('#detailed-notes').textContent();
  check(physics12Deep.includes('Drift velocity')&&physics12Deep.includes('V = IR'),'Class 12 Physics renders current-electricity concepts and formulas');

  await choose(page,'Class 12','Chemistry');
  await page.locator('.chapter-item[data-topic="Electrochemistry"]').click();
  const chemistry12Deep=await page.locator('#detailed-notes').textContent();
  check(chemistry12Deep.includes('Nernst equation')&&chemistry12Deep.includes('ΔG = -nFE'),'Class 12 Chemistry renders electrochemistry-specific concepts and formulas');

  await choose(page,'Class 12','Mathematics');
  await page.locator('.chapter-item[data-topic="Integrals"]').click();
  const maths12Deep=await page.locator('#detailed-notes').textContent();
  check(maths12Deep.includes('Integration by substitution')&&maths12Deep.includes('Partial fractions'),'Class 12 Mathematics renders integration-specific methods');

  await choose(page,'Class 12','Biology');
  await page.locator('.chapter-item[data-topic="Molecular Basis of Inheritance"]').click();
  const biology12Deep=await page.locator('#detailed-notes').textContent();
  check(biology12Deep.includes('DNA/RNA structure')&&biology12Deep.includes('Genetic code and translation'),'Class 12 Biology renders molecular-genetics concepts');

  await choose(page,'Class 12','Business Studies');
  await page.locator('.chapter-item[data-topic="Marketing"]').click();
  const business12Deep=await page.locator('#detailed-notes').textContent();
  check(business12Deep.includes('Marketing mix')&&business12Deep.includes('Branding, packaging'),'Class 12 Business Studies renders marketing-specific notes');

  await choose(page,'Class 12','Geography');
  await page.locator('.chapter-item[data-topic="Spatial Information Technology"]').click();
  const geoPractical12Deep=await page.locator('#detailed-notes').textContent();
  check(geoPractical12Deep.includes('GIS concepts')&&geoPractical12Deep.includes('Layers and overlay'),'Class 12 Geography renders practical GIS-specific notes');

  await choose(page,'Class 12','Sociology');
  await page.locator('.chapter-item[data-topic="Mass Media and Communications"]').click();
  const sociology12Deep=await page.locator('#detailed-notes').textContent();
  check(sociology12Deep.includes('Print, radio and television')&&sociology12Deep.includes('Public sphere'),'Class 12 Sociology renders mass-media-specific notes');

  await choose(page,'Class 12','Computer Science');
  check(await page.locator('#chapter-count').textContent()==='13','Class 12 Computer Science exposes all 13 current NCERT textbook chapters');
  await page.locator('.chapter-item[data-topic="Exception Handling in Python"]').click();
  const cs12Deep=await page.locator('#detailed-notes').textContent();
  check(cs12Deep.includes('Built-in exceptions')&&cs12Deep.includes('try-except-else-finally'),'Class 12 Computer Science renders official NCERT exception-handling notes');

  await choose(page,'Class 12','Informatics Practices');
  check(await page.locator('#chapter-count').textContent()==='7','Class 12 Informatics Practices uses the current 7-chapter NCERT structure');
  await page.locator('.chapter-item[data-topic="Societal Impacts"]').click();
  const ip12Deep=await page.locator('#detailed-notes').textContent();
  check(ip12Deep.includes('Digital footprints')&&ip12Deep.includes('Data privacy and protection'),'Class 12 Informatics Practices renders current societal-impact notes');

  await choose(page,'Class 12','English Elective');
  await page.locator('.chapter-item[data-topic="Chandalika"]').click();
  const elective12Deep=await page.locator('#detailed-notes').textContent();
  check(elective12Deep.includes('Caste, dignity and selfhood')&&elective12Deep.includes('Vocabulary to know'),'Class 12 English Elective renders text-specific literary analysis');

  await choose(page,'Class 12','Hindi Core');
  await page.locator('.chapter-item[data-topic="बाज़ार दर्शन"]').click();
  const hindi12Deep=await page.locator('#detailed-notes').textContent();
  check(hindi12Deep.includes('उपभोक्तावाद और बाजार')&&hindi12Deep.includes('पाठ-साक्ष्य'),'Class 12 Hindi Core renders पाठ-specific literary analysis');

  await choose(page,'Class 12','Sanskrit Core');
  await page.locator('.chapter-item[data-topic="हल्दीघाटी"]').click();
  const sanskrit12Deep=await page.locator('#detailed-notes').textContent();
  check(sanskrit12Deep.includes('वीरता और देशभक्ति')&&sanskrit12Deep.includes('पदच्छेद'),'Class 12 Sanskrit Core renders पाठ-specific concept and grammar guidance');

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
  const indiaTradeDeep=await page.locator('#detailed-notes').textContent();
  check(indiaTradeDeep.includes('India’s changing trade composition')&&indiaTradeDeep.includes('Major seaports and gateways'),'duplicate Geography title resolves source-book-specific deep notes');

  await choose(page,'Class 11','English Elective');
  check(await page.locator('#chapter-count').textContent()==='27','Class 11 English Elective loads Woven Words');
  await page.locator('.chapter-item').filter({hasText:'The Lament'}).click();
  const elective11Deep=await page.locator('#detailed-notes').textContent();
  check(elective11Deep.includes('Grief and the need to be heard')&&elective11Deep.includes('Vocabulary to know'),'Class 11 English Elective renders text-specific literary analysis');

  await choose(page,'Class 11','Hindi Core');
  await page.locator('.chapter-item').filter({hasText:'नमक का दारोगा'}).click();
  const hindi11Deep=await page.locator('#detailed-notes').textContent();
  check(hindi11Deep.includes('ईमानदारी और भ्रष्ट व्यवस्था')&&hindi11Deep.includes('पाठ-साक्ष्य'),'Class 11 Hindi Core renders पाठ-specific literary analysis');

  await choose(page,'Class 11','Sanskrit Core');
  await page.locator('.chapter-item').filter({hasText:'कुशलप्रशासनम्'}).click();
  const sanskrit11Deep=await page.locator('#detailed-notes').textContent();
  check(sanskrit11Deep.includes('सुशासनम् तथा लोकहितम्')&&sanskrit11Deep.includes('पदच्छेद'),'Class 11 Sanskrit Core renders पाठ-specific concept and grammar guidance');

  const subjects=await page.evaluate(()=>[...document.querySelectorAll('#subject-filter option')].map(o=>o.value));
  check(subjects.includes('English Elective'),'curriculum filters remain operational after repeated subject changes');
  check(subjects.includes('Computer Science')&&subjects.includes('Informatics Practices'),'corrected Class 12 computing subjects remain available in filters');
  check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
  console.log('CBSE BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close();
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
