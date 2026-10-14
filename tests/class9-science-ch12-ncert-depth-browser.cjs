/* StudyAI CBSE Class 9 Science Chapter 12 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, biodiversity, five kingdoms, plant and animal identification, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch12-'));
const port=process.env.TEST_SCIENCE_CH12_PORT||'5167';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch12-ci-test',
 FLASK_DEBUG:'0',COOKIE_SECURE:'0',GEMINI_API_KEY:'',
 DATABASE_PATH:path.join(temp,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',x=>{stderr=(stderr+String(x)).slice(-15000)});
const check=(condition,message)=>{assert.ok(condition,message);console.log('PASS',message)};
(async()=>{
 let healthy=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){healthy=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(healthy,'isolated StudyAI reader server starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const jsErrors=[];
 page.on('pageerror',error=>jsErrors.push(error.message));
 // Optional first-run onboarding may appear after load and intercept browser clicks.
 // Close the dialog during tests; production onboarding remains untouched.
 await page.addLocatorHandler(page.locator('#studyai-onboarding[open]'),async()=>{
  await page.evaluate(()=>{const dialog=document.querySelector('#studyai-onboarding');if(dialog?.open)dialog.close();});
 });
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
   !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const result=await page.evaluate(()=>{
  const title='Patterns in Life: Diversity and Classification';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completeBefore=JSON.stringify(state.completed||[]);
  const bookmarksBefore=JSON.stringify(state.bookmarks||[]);
  const reviewBefore=JSON.stringify(state.review||[]);
  current={board:'CBSE',grade:'Class 9',subject:'Science',topic:title,topicId:entry?.id,component:'All components'};
  renderFilters();if(entry)openTopic(title,entry.id);
  const notes=document.querySelector('#detailed-notes');
  const blocks=[...(notes?.querySelectorAll('.actual-note-topic')||[])];
  return {
    found:!!entry?.id,original:science.length===13&&science.every(e=>!!e.deepNotes?.overview),
    sourceSame:entry?.sourceBook===bank[title]?.sourceBook,
    bankCount:Object.keys(bank).length,
    earlier:['Exploration: Entering the World of Secondary Science','Cell: The Building Block of Life',
      'Tissues in Action','Describing Motion Around Us','Exploring Mixtures and their Separation',
      'How Forces Affect Motion','Work, Energy, and Simple Machines','Journey Inside the Atom',
      'Atomic Foundations of Matter','Sound Waves: Characteristics and Applications',
      'Reproduction: How Life Continues'].every(t=>!!bank[t]),
    pdf:bank[title]?.sourcePdf||'',pages:bank[title]?.printedPages||'',
    review:bank[title]?.reviewStatus||'',
    headings:blocks.map(el=>el.querySelector('h3')?.textContent.trim()),
    paragraphs:notes?.querySelectorAll('.actual-note-topic > p').length||0,
    worked:notes?.querySelectorAll('.worked-box').length||0,
    tips:notes?.querySelectorAll('.exam-box').length||0,
    curated:notes?.querySelectorAll('.science-full-notes').length||0,
    text:notes?.textContent||'',
    progressSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
      completeBefore===JSON.stringify(state.completed||[])&&
      bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
      reviewBefore===JSON.stringify(state.review||[])
  };
 });
 check(result.found&&result.original&&result.sourceSame,
   'existing identifiers, source metadata and 13 original Science records remain intact');
 check(result.bankCount===13&&result.earlier,
   '12 full depth Science chapters including 11 previously upgraded ones');
 check(result.pdf==='iesc112.pdf'&&result.pages==='228–251'&&result.review.includes('outstanding'),
   'correct 2026 NCERT Chapter 12 identity and honest review status');
 check(result.curated===1&&result.headings.length===15&&new Set(result.headings).size===15,
   'all 15 comprehensive self-contained classification lessons appear exactly once');
 check(result.paragraphs>=123&&result.worked===129&&result.tips===15,
   '123 rich paragraphs, 129 independently worked examples and 15 exam tips display');
 const terms=['Activity 12.1','Activity 12.2','Activity 12.3','Activity 12.4','Activity 12.5',
   'Activity 12.6','Activity 12.7','Activity 12.8','Activity 12.9',
   'Table 12.1','Table 12.2','Table 12.3','Fig. 12.16','Fig. 12.17',
   'endemic','hotspot','Nilgiri tahr','Sangai','phumdis','Purple Frog','Pakke Tiger Reserve',
   'Aristotle','Linnaeus','Haeckel','Copeland','Whittaker','Woese',
   'Monera','Protista','Fungi','Plantae','Animalia','Bacteria','Archaea','Eukarya',
   'Rhizobium','Lactobacillus','Ram Bux Singh','cyanobacteria','stromatolites',
   'Amoeba','Paramecium','Euglena','Chlamydomonas','yeast','chitin','lichen',
   'Thallophyta','Bryophyta','Pteridophyta','Gymnosperms','Angiosperms',
   'Spirogyra','Marchantia','fern','xylem','phloem','rhizoids','cones','seed',
   'Porifera','Cnidaria','Platyhelminthes','Nematoda','Annelida','Arthropoda',
   'Mollusca','Echinodermata','Amphioxus','Protochordata','Vertebrata',
   'Fish','Amphibians','Reptiles','Birds','Mammals','notochord','exoskeleton',
   'Kingdom → Phylum','Carnivora','Felidae','Panthera tigris','Pisum sativum',
   'Mangifera indica','binomial','italics','underlining','Birbal Sahni','fossils','viruses',
   'P Monera','Q Fungi','R Protista','S Amphibia','T virus','Q15(vii)'];
 const missing=terms.filter(x=>!result.text.toLowerCase().includes(x.toLowerCase()));
 check(missing.length===0,'all nine activities, key tables and Q15 P–T classification competencies: '+missing.join(', '));
 check(result.progressSafe,'maths outlines and user bookmarks/completion/review remain untouched');
 const diagrams=page.locator('#detailed-notes .science-ch12-figure');
 const questions=page.locator('#detailed-notes .science-ch12-question details');
 check(await diagrams.count()===15,'all fifteen independent SVG classification figures appear');
 const ids=['biodiversity','criteria','history','fivekingdoms','monera','protista','fungi',
   'plantlow','planthigh','invertebrates1','invertebrates2','chordates','taxonomy','namesfossils','cases'];
 check(JSON.stringify(await diagrams.evaluateAll(xs=>xs.map(n=>n.dataset.scienceVisual)))===JSON.stringify(ids),
   'diagram order precisely matches the associated fifteen lesson sections');
 check(await diagrams.locator('svg[role="img"] title').count()===15&&
   await diagrams.locator('svg[role="img"] desc').count()===15&&
   await diagrams.locator('figcaption').count()===15,'accessible SVG titles, descriptions and captions');
 check(await diagrams.nth(14).textContent().then(x=>x.includes('Monera')&&x.includes('Protista')&&x.includes('Amphibia')&&x.includes('Virus')),
   'Q15 graphic compares P, Q, R, S, T using correct NCERT diagnoses');
 check(await page.locator('#detailed-notes .science-ch12-binomial').count()>=8,
   'scientific names are rendered in italic HTML not only named as formatting instructions');
 check(await questions.count()===74&&await questions.evaluateAll(ns=>ns.every(x=>!x.open)),
   '74 practice answers initially concealed');
 await questions.first().locator('summary').click();
 check(await questions.first().evaluate(x=>x.open),'practice answer expands on click');
 await questions.first().locator('summary').click();
 check(!await questions.first().evaluate(x=>x.open),'practice answer closes on second click');
 await page.setViewportSize({width:390,height:844});
 const mobile=await diagrams.evaluateAll(ns=>ns.map(x=>({outer:x.getBoundingClientRect().width,svg:x.querySelector('svg').getBoundingClientRect().width})));
 check(mobile.length===15&&mobile.every(x=>x.outer<=391&&x.svg<=x.outer+1),
   'all classification diagrams fit 390px mobile viewport');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Patterns in Life: Diversity and Classification');
  renderReaderContent(e);
 });
 check(await diagrams.count()===15&&await questions.count()===74,
   're-render does not duplicate visuals or practice questions');
 for(const [title,figCount,questionCount,cls] of [
   ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
   ['Cell: The Building Block of Life',3,11,'science-ch02'],
   ['Tissues in Action',6,13,'science-ch03'],
   ['Describing Motion Around Us',6,15,'science-ch04'],
   ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
   ['How Forces Affect Motion',8,25,'science-ch06'],
   ['Work, Energy, and Simple Machines',10,31,'science-ch07'],
   ['Journey Inside the Atom',10,36,'science-ch08'],
   ['Atomic Foundations of Matter',11,44,'science-ch09'],
   ['Sound Waves: Characteristics and Applications',12,49,'science-ch10'],
   ['Reproduction: How Life Continues',15,62,'science-ch11']
 ]){
  await page.evaluate(name=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
   current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
   renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===figCount&&
     await page.locator('#detailed-notes .'+cls+'-question').count()===questionCount&&await diagrams.count()===0,
     'prior Chapter 1–11 content and checks unaffected: '+title);
 }
 await page.evaluate(()=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Earth as a System: Energy, Matter, and Life');
   current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
   renderFilters();openTopic(e.title,e.id);
 });
 check(await diagrams.count()===0,'new Chapter 12 elements do not leak into legacy Chapter 13');
 check(jsErrors.length===0,'no uncaught JavaScript runtime errors: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH12 NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
