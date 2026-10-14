/* StudyAI CBSE Class 9 Science Chapter 10 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, wave graphs, numericals and sonar, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch10-'));
const port=process.env.TEST_SCIENCE_CH10_PORT||'5165';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch10-ci-test',
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
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>!!window.STUDYAI_GRADE9_DEEP_NOTES_STATUS&&
   !!window.CBSE_CLASS9_SCIENCE_FULL_NOTES&&!!window.STUDYAI_LONG_NOTES_APPLIED);
 const result=await page.evaluate(()=>{
  const title='Sound Waves: Characteristics and Applications';
  const science=STUDY_DATA.filter(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science');
  const entry=science.find(e=>e.title===title);
  const bank=window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{};
  const math=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'&&e.title==='Math of Space: Surface Area and Volume');
  const mathBefore=math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'';
  const completedBefore=JSON.stringify(state.completed||[]);
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
     'Atomic Foundations of Matter'].every(t=>!!bank[t]),
   pdf:bank[title]?.sourcePdf||'',pages:bank[title]?.printedPages||'',
   review:bank[title]?.reviewStatus||'',
   headings:blocks.map(el=>el.querySelector('h3')?.textContent.trim()),
   pCount:notes?.querySelectorAll('.actual-note-topic > p').length||0,
   worked:notes?.querySelectorAll('.worked-box').length||0,
   tips:notes?.querySelectorAll('.exam-box').length||0,
   curated:notes?.querySelectorAll('.science-full-notes').length||0,
   text:notes?.textContent||'',
   progressSafe:mathBefore===(math?JSON.stringify(window.StudyAIProgress?.outline(math.id)||[]):'')&&
      completedBefore===JSON.stringify(state.completed||[])&&
      bookmarksBefore===JSON.stringify(state.bookmarks||[])&&
      reviewBefore===JSON.stringify(state.review||[])
  };
 });
 check(result.found&&result.original&&result.sourceSame,
   'the original chapter identity and all 13 Science records are unchanged');
 check(result.bankCount===11&&result.earlier,
   'Chapter 10 coexists with all 9 earlier upgraded chapters');
 check(result.pdf==='iesc110.pdf'&&result.pages==='184–207'&&result.review.includes('outstanding'),
   'official NCERT reference and outstanding editorial review clearly disclosed');
 check(result.curated===1&&result.headings.length===12&&new Set(result.headings).size===12,
   '12 standalone sound-wave lessons render in the actual reader');
 check(result.pCount>=94&&result.worked===91&&result.tips===12,
   '94 teaching paragraphs, 91 distinct worked examples, and 12 exam tips render');
 const required=['Activity 10.1','Activity 10.2','Activity 10.3','Activity 10.4','Activity 10.5','Activity 10.6',
   'Activity 10.7','Activity 10.8','Example 10.1','Example 10.2','Example 10.3',
   'Example 10.4','Example 10.5','Example 10.6',
   'Jingrwai Iawbei','Gol Gumbaz','Raman','syaahi','bell jar',
   'compression','rarefaction','longitudinal','transverse','microphone','speaker',
   'crest','trough','wavelength','λ/2','ν=1/T','v=λν','Hz','dB','intensity','W/m²',
   '20 kHz','infrasound','ultrasound','SONAR','echolocation','5000 m/s','1500 m/s',
   '331 m/s','344 m/s','17 m','34.3 m','688.5 m','3812.5 m','6.96 ms','0.05 s','0.1 s',
   'λ_A=2.5 cm','λ_B=5.0 cm','13,800 Hz','6,900 Hz','2:9'];
 const missing=required.filter(q=>!result.text.toLowerCase().includes(q.toLowerCase()));
 check(missing.length===0,'NCERT graph and wave competence with genuine corrected numericals: '+missing.join(', '));
 check(result.progressSafe,'earlier bookmarks, checkmarks, review lists and Maths outline unchanged');
 const figures=page.locator('#detailed-notes .science-ch10-figure');
 const answers=page.locator('#detailed-notes .science-ch10-question details');
 check(await figures.count()===12,'twelve distinct figures display');
 const ids=['sources','media','longitudinal','energy','graphs','quantities',
   'speed','hearing','music','reflection','ultrasound','review'];
 check(JSON.stringify(await figures.evaluateAll(els=>els.map(n=>n.dataset.scienceVisual)))===JSON.stringify(ids),
   'figures inserted only in their named teaching sections');
 check(await figures.locator('svg[role="img"] title').count()===12&&
   await figures.locator('svg[role="img"] desc').count()===12&&
   await figures.locator('figcaption').count()===12,'all twelve custom SVGs have captions, title and description');
 check(await figures.nth(11).textContent().then(t=>t.includes('Wave A')&&t.includes('Wave B')),
   'original Q14 graph explains which curve is labelled A versus B');
 check(await answers.count()===49&&await answers.evaluateAll(ns=>ns.every(x=>!x.open)),
   '49 independently authored answer-reveal questions initially hide answers');
 await answers.first().locator('summary').click();
 check(await answers.first().evaluate(x=>x.open),'a student can reveal the correct answer');
 await answers.first().locator('summary').click();
 check(!await answers.first().evaluate(x=>x.open),'a student can collapse the answer again');
 await page.setViewportSize({width:390,height:844});
 const widths=await figures.evaluateAll(ns=>ns.map(n=>({outer:n.getBoundingClientRect().width,svg:n.querySelector('svg').getBoundingClientRect().width})));
 check(widths.length===12&&widths.every(x=>x.outer<=391&&x.svg<=x.outer+1),
   'all twelve sound-wave graphics stay bounded on a 390px mobile screen');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Sound Waves: Characteristics and Applications');
  renderReaderContent(e);
 });
 check(await figures.count()===12&&await answers.count()===49,
   'reopening reader never doubles sound-wave figures or questions');
 for(const [title,nFigures,nQuestions,cls] of [
   ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
   ['Cell: The Building Block of Life',3,11,'science-ch02'],
   ['Tissues in Action',6,13,'science-ch03'],
   ['Describing Motion Around Us',6,15,'science-ch04'],
   ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
   ['How Forces Affect Motion',8,25,'science-ch06'],
   ['Work, Energy, and Simple Machines',10,31,'science-ch07'],
   ['Journey Inside the Atom',10,36,'science-ch08'],
   ['Atomic Foundations of Matter',11,44,'science-ch09']
 ]){
  await page.evaluate(name=>{
    const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Science'&&e.title===name);
    current={board:entry.board,grade:entry.grade,subject:entry.subject,topic:name,topicId:entry.id};
    renderFilters();openTopic(name,entry.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===nFigures&&
     await page.locator('#detailed-notes .'+cls+'-question').count()===nQuestions&&await figures.count()===0,
     'earlier authoring and independent practice preserved: '+title);
 }
 await page.evaluate(()=>{
   const next=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Reproduction: How Life Continues');
   current={board:next.board,grade:next.grade,subject:next.subject,topic:next.title,topicId:next.id};
   renderFilters();openTopic(next.title,next.id);
 });
 check(await figures.count()===0,'Chapter 10 diagrams cannot leak into untouched Chapter 11');
 check(jsErrors.length===0,'no uncaught page script exceptions: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH10 NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
