/* StudyAI CBSE Class 9 Science Chapter 11 – NCERT Exploration (2026–27)
 * Full real-browser check for chapter content, reproduction, pollination and biology data, visual
 * accessibility, self-checks and prior chapters' persistent progress.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-science-ch11-'));
const port=process.env.TEST_SCIENCE_CH11_PORT||'5166';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'science-ch11-ci-test',
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
  const title='Reproduction: How Life Continues';
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
      'Atomic Foundations of Matter','Sound Waves: Characteristics and Applications'].every(t=>!!bank[t]),
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
   'original lesson ID, source and all thirteen Science records remain unchanged');
 check(result.bankCount===12&&result.earlier,
   'Chapter 11 coexists with earlier ten full-depth Science chapters');
 check(result.pdf==='iesc111.pdf'&&result.pages==='208–227'&&result.review.includes('outstanding'),
   'NCERT 2026 curriculum ID and pending external editorial review are disclosed');
 check(result.curated===1&&result.headings.length===15&&new Set(result.headings).size===15,
   '15 independent full-depth biology teaching sections render once');
 check(result.paragraphs>=122&&result.worked===118&&result.tips===15,
   '122 teaching paragraphs, 118 stepwise examples and 15 tips render');
 const required=['Activity 11.1','Activity 11.2','Activity 11.3','Activity 11.4',
   'Activity 11.5','Activity 11.6','Activity 11.7',
   'Table 11.2','Table 11.3','Table 11.4','Table 11.5',
   'cutting','grafting','scion','stock','layering','tissue culture',
   'Bryophyllum','potato','ginger','yeast','Hydra','Rhizopus','Aspergillus','Pasteur',
   'mitosis','meiosis','2³','8,388,608','23','46','pollen tube',
   'stigma','style','ovary','ovule','seed','fruit','pollination','fertilisation',
   'P. Maheshwari','fruit set','fruit drop','26%','40%','35%','8%',
   'Sperm','egg','testes','scrotum','vas deferens','ovaries','oviduct',
   'uterus','cervix','IVF','Subhash Mukhopadhyay','zygote','implantation',
   'menstruation','cycle','ovulation','21–35','ASHA','CDRI',
   'STI','IUD','condom','both false','no matching printed'];
 const missing=required.filter(word=>!result.text.toLowerCase().includes(word.toLowerCase()));
 check(missing.length===0,
   'chapter covers all seven activities, tables, corrected data and reproductive-health concepts: '+missing.join(', '));
 check(result.progressSafe,'old Maths progress, bookmarks, checkmarks and review state preserved');
 const figures=page.locator('#detailed-notes .science-ch11-figure');
 const checks=page.locator('#detailed-notes .science-ch11-question details');
 check(await figures.count()===15,'15 original schematics display in the reader');
 const ids=['overview','vegetative','budding','meiosis','flower','pollination','pollinationdata',
   'seed','animals','humanorgans','implantation','cycle','pregnancy','health','revision'];
 check(JSON.stringify(await figures.evaluateAll(ns=>ns.map(n=>n.dataset.scienceVisual)))===JSON.stringify(ids),
   'all diagrams map one-to-one to the intended fifteen sections');
 check(await figures.locator('svg[role="img"] title').count()===15&&
   await figures.locator('svg[role="img"] desc').count()===15&&
   await figures.locator('figcaption').count()===15,
   'every original diagram has title, accessible description and caption');
 const originalGraph=await figures.nth(6).textContent();
 check(originalGraph.includes('26%')&&originalGraph.includes('40%')&&
   originalGraph.includes('35%')&&originalGraph.includes('8%'),
   'original apple orchard graphic uses actual NCERT 26 to 40 fruit set / 35 to 8 drop');
 const questionErratum=await figures.nth(10).textContent();
 check(questionErratum.includes('both-false'),
   'NCERT end exercise Q3 MCQ option omission is highlighted, never answered incorrectly');
 check(await checks.count()===62&&await checks.evaluateAll(ns=>ns.every(n=>!n.open)),
   '62 independent practice answers begin hidden');
 await checks.first().locator('summary').click();
 check(await checks.first().evaluate(n=>n.open),'students can reveal independent answer');
 await checks.first().locator('summary').click();
 check(!await checks.first().evaluate(n=>n.open),'students can conceal answer again');
 await page.setViewportSize({width:390,height:844});
 const mobile=await figures.evaluateAll(ns=>ns.map(n=>({
   outer:n.getBoundingClientRect().width,inner:n.querySelector('svg').getBoundingClientRect().width
 })));
 check(mobile.length===15&&mobile.every(n=>n.outer<=391&&n.inner<=n.outer+1),
   'fifteen complex biology diagrams fit 390-pixel mobile screens');
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>{
  const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Reproduction: How Life Continues');
  renderReaderContent(e);
 });
 check(await figures.count()===15&&await checks.count()===62,
   'repeated render never duplicates diagrams or quiz controls');
 for(const [title,count,quiz,cls] of [
   ['Exploration: Entering the World of Secondary Science',2,5,'science-ch01'],
   ['Cell: The Building Block of Life',3,11,'science-ch02'],
   ['Tissues in Action',6,13,'science-ch03'],
   ['Describing Motion Around Us',6,15,'science-ch04'],
   ['Exploring Mixtures and their Separation',7,17,'science-ch05'],
   ['How Forces Affect Motion',8,25,'science-ch06'],
   ['Work, Energy, and Simple Machines',10,31,'science-ch07'],
   ['Journey Inside the Atom',10,36,'science-ch08'],
   ['Atomic Foundations of Matter',11,44,'science-ch09'],
   ['Sound Waves: Characteristics and Applications',12,49,'science-ch10']
 ]){
  await page.evaluate(name=>{
    const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title===name);
    current={board:e.board,grade:e.grade,subject:e.subject,topic:name,topicId:e.id};
    renderFilters();openTopic(name,e.id);
  },title);
  check(await page.locator('#detailed-notes .'+cls+'-figure').count()===count&&
    await page.locator('#detailed-notes .'+cls+'-question').count()===quiz&&await figures.count()===0,
    'all previous chapters retain drawings and practice: '+title);
 }
 await page.evaluate(()=>{
   const e=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&x.subject==='Science'&&x.title==='Patterns in Life: Diversity and Classification');
   current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title,topicId:e.id};
   renderFilters();openTopic(e.title,e.id);
 });
 check(await figures.count()===0,'Chapter 11 diagrams never leak into untouched Chapter 12');
 check(jsErrors.length===0,'no uncaught browser JS exceptions: '+jsErrors.join('; '));
 console.log('CLASS 9 SCIENCE CH11 NCERT BROWSER REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
