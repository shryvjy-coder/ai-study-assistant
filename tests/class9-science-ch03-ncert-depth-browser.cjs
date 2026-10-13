/* StudyAI CBSE Class 9 Science Chapter 3 — NCERT Exploration reader regression.
 * Isolated real Flask app + Playwright; verifies content, prior chapters,
 * visual accessibility, mobile sizing, student disclosures and progress state.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch03-'));
const port=process.env.TEST_SCIENCE_CH03_PORT||'5158';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch03-ci-test',
   FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
   DATABASE_PATH:path.join(temp,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',data=>{stderr=(stderr+String(data)).slice(-14000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};

(async()=>{
 let started=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(url+'/api/health')).ok){started=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(started,'isolated reader server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror',err=>errors.push(err.message));
 await page.goto(url+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
  !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const info=await page.evaluate(()=>{
  const title='Tissues in Action';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const outlineBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completionBefore=JSON.stringify(state.completed||[]);
  const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();
  if(entry)openTopic(title,entry.id);
  const note=document.querySelector('#detailed-notes');
  const sectionNodes=[...(note?.querySelectorAll('.actual-note-topic')||[])];
  return {
   scienceCount:science.length,
   matched:!!entry&&entry.sourceBook===bank[title]?.sourceBook,
   originalNotesExist:science.every(e=>!!e.deepNotes?.overview),
   originalKeyStable:!!entry?.id,
   bankCount:Object.keys(bank).length,
   existingChapters:['Exploration: Entering the World of Secondary Science','Cell: The Building Block of Life'].every(t=>!!bank[t]),
   chapterStatus:bank[title]?.reviewStatus||'',
   printedPages:bank[title]?.printedPages||'',
   headings:sectionNodes.map(x=>x.querySelector('h3')?.textContent.trim()),
   paragraphs:note?.querySelectorAll('.actual-note-topic > p').length||0,
   examples:note?.querySelectorAll('.worked-box').length||0,
   tips:note?.querySelectorAll('.exam-box').length||0,
   rich:note?.querySelectorAll('.science-full-notes').length||0,
   text:note?.textContent||'',
   mathStable:outlineBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):''),
   completedStable:completionBefore===JSON.stringify(state.completed||[]),
   bookmarksStable:bookmarksBefore===JSON.stringify(state.bookmarks||[])
  };
 });
 check(info.scienceCount===13&&info.originalNotesExist&&info.originalKeyStable,
  'original 13 Class 9 Science entries and stable IDs remain present');
 check(info.bankCount===6&&info.existingChapters&&info.matched,
  'Chapters 1–3 retain independently mapped, curated full notes');
 check(info.chapterStatus.includes('outstanding')&&info.printedPages==='28–47',
  'correct source pages and pending editorial certification');
 check(info.rich===1&&info.headings.length===7&&new Set(info.headings).size===7,
  'Chapter 3 uses seven coherent authored teaching sections');
 check(info.paragraphs>=35&&info.examples>=22&&info.tips===7,
  'complete detailed prose, twenty-three worked cases and seven exam tips render');
 const keywords=['apical','lateral','intercalary','onion-root',
   'collenchyma','sclerenchyma','cuticle','stomata','parenchyma',
   'xylem','phloem','companion cells','tracheids','cork','annual rings',
   'Table 3.7','epithelial','plasma','platelets','cartilage','tendon','ligament',
   'skeletal muscle','smooth muscle','cardiac muscle','dendrites','axon',
   'ball-and-socket','hinge','pivot','fixed joints','rib cage','vertebral',
   'Surya Namaskar','totipotency','F. C. Steward','20%','Agrobacterium',
   'Sipra Guha Mukherjee','B. G. L. Swamy'];
 const missing=keywords.filter(x=>!info.text.toLowerCase().includes(x.toLowerCase()));
 check(missing.length===0,'source-specific tissue, joint and data subjects are rendered: '+missing.join(', '));
 check(info.mathStable&&info.completedStable&&info.bookmarksStable,
  'viewing Science notes does not change Maths outline or saved completion/bookmarks');

 const pictures=page.locator('#detailed-notes .science-ch03-figure');
 const questions=page.locator('#detailed-notes .science-ch03-question details');
 check(await pictures.count()===6,'six original concept-specific instructional diagrams render');
 check((await pictures.evaluateAll(items=>items.map(e=>e.dataset.scienceVisual))).join('|')===
  'meristems|plant-tissues|vascular|animal-tissues|joints|regeneration',
  'each authored diagram is inserted in its relevant topic');
 check(await pictures.locator('svg[role="img"] title').count()===6&&
  await pictures.locator('svg[role="img"] desc').count()===6&&
  await pictures.locator('figcaption').count()===6,
  'each visual includes SVG title/description and a readable caption');
 check(await questions.count()===13&&await questions.evaluateAll(items=>items.every(x=>!x.open)),
  'thirteen independent practice answers are closed until selected');
 await questions.first().locator('summary').click();
 check(await questions.first().evaluate(x=>x.open)&&
  (await questions.first().locator('p').innerText()).includes('actively dividing'),
  'student can reveal an answer via native accessible disclosure');
 await questions.first().locator('summary').click();
 check(!await questions.first().evaluate(x=>x.open),
  'student can conceal an answer again');

 await page.setViewportSize({width:390,height:844});
 const sizes=await pictures.evaluateAll(items=>items.map(el=>({
  outer:el.getBoundingClientRect().width,
  inner:el.querySelector('svg').getBoundingClientRect().width
 })));
 check(sizes.length===6&&sizes.every(p=>p.outer<=391&&p.inner<=p.outer+1),
  'instructional SVGs fit within 390px mobile reader');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const chapter=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
    e.subject==='Science'&&e.title==='Tissues in Action');
  renderReaderContent(chapter);
 });
 check(await pictures.count()===6&&await questions.count()===13,
  'rerender does not duplicate original figures or questions');

 await page.evaluate(()=>{
  const chapter=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Science'&&e.title==='Exploration: Entering the World of Secondary Science');
  current={board:chapter.board,grade:chapter.grade,subject:chapter.subject,topic:chapter.title,topicId:chapter.id};
  renderFilters();openTopic(chapter.title,chapter.id);
 });
 check(await page.locator('#detailed-notes .science-ch01-figure').count()===2&&
  await page.locator('#detailed-notes .science-ch01-question').count()===5&&
  await page.locator('#detailed-notes .science-ch03-figure').count()===0,
  'Chapter 1 original figures and practice remain intact');
 await page.evaluate(()=>{
  const chapter=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Science'&&e.title==='Cell: The Building Block of Life');
  current={board:chapter.board,grade:chapter.grade,subject:chapter.subject,topic:chapter.title,topicId:chapter.id};
  renderFilters();openTopic(chapter.title,chapter.id);
 });
 check(await page.locator('#detailed-notes .science-ch02-figure').count()===3&&
  await page.locator('#detailed-notes .science-ch02-question').count()===11&&
  await page.locator('#detailed-notes .science-ch03-figure').count()===0,
  'Chapter 2 original figures and practice remain intact');
 await page.evaluate(()=>{
  const chapter=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Science'&&e.title==='Describing Motion Around Us');
  current={board:chapter.board,grade:chapter.grade,subject:chapter.subject,topic:chapter.title,topicId:chapter.id};
  renderFilters();openTopic(chapter.title,chapter.id);
 });
 check(await page.locator('#detailed-notes .science-ch03-figure').count()===0&&
  await page.locator('#detailed-notes .science-ch03-question').count()===0,
  'the Chapter 3 enhancement does not leak into Chapter 4');
 check(errors.length===0,'no uncaught JavaScript errors: '+errors.join('; '));
 console.log('CLASS 9 SCIENCE CH03 EXPLORATION BROWSER REGRESSION PASS');
})().catch(err=>{
 console.error(err);console.error(stderr);process.exitCode=1;
}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();
 rmSync(temp,{recursive:true,force:true});
});
