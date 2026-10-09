const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-maths-allchapters-'));
const port=process.env.TEST_MATH_DEPTH_PORT||'5148';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'class9-complete-depth-browser',
  FLASK_DEBUG:'0',COOKIE_SECURE:'0',DATABASE_PATH:path.join(dir,'studyai.sqlite'),GEMINI_API_KEY:''},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',part=>{stderr=(stderr+String(part)).slice(-9000)});
const check=(value,message)=>{assert.ok(value,message);console.log('PASS',message)};
const titles=[
'Orienting Yourself: The Use of Coordinates',
'Introduction to Linear Polynomials',
'The World of Numbers',
'Exploring Algebraic Identities',
'I’m Up and Down, and Round and Round',
'Measuring Space: Perimeter and Area',
'The Mathematics of Maybe: Introduction to Probability',
'Predicting What Comes Next: Exploring Sequences and Progressions',
'Propositions and their Converses',
'How Quantities Combine: Understanding Data',
'The World of Algorithms',
'Quadrilaterals',
'Two Variables, One Line',
'Math of Space: Surface Area and Volume'
];
(async()=>{
 let live=false;
 for(let i=0;i<120;i++){
  try{if((await fetch(base+'/api/health')).ok){live=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(live,'local StudyAI application starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1500,height:900},reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base+'#study',{waitUntil:'load'});
 await page.waitForFunction(()=>Object.keys(window.STUDYAI_CLASS9_DEPTH_AUDIT||{}).length===13,
  null,{timeout:20000});

 const report=await page.evaluate(titles=>{
  const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT||{};
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
  return titles.map((title,index)=>{
   const chapter=bank[title];
   const sections=chapter?.sections||[];
   const parts=sections.flatMap(s=>Array.isArray(s.subtopics)?s.subtopics:[]);
   const works=sections.flatMap(s=>s.examples||[]).concat(parts.flatMap(s=>s.examples||[]));
   const invalid=works.filter(ex=>!ex||typeof ex.question!=='string'||
     !Array.isArray(ex.steps)||!ex.steps.length||typeof ex.answer!=='string');
   const units=parts.filter(part=>typeof part.title==='string'&&part.paragraphs?.length>=2);
   return {chapter:index+1,title,
    present:!!chapter,depth:index===2?null:audit[title],
    sectionCount:sections.length,subtopicCount:parts.length,
    completeSubtopics:units.length,workedExamples:works.length,invalidExamples:invalid.length,
    leadLength:String(chapter?.lead||'').length};
  });
 },titles);
 console.log('ALL CHAPTER AUDIT',JSON.stringify(report,null,2));
 check(report.length===14&&report.every(r=>r.present),'all fourteen Ganita Manjari chapters have full-note entries');
 check(report.filter(r=>r.depth).length===13,'all thirteen remaining chapters received enhanced teaching notes');
 for(const item of report.filter(r=>r.depth)){
  check(item.depth.sections>=6 && item.depth.subtopics>=12 &&
   item.depth.examples>=12 && item.depth.paragraphs>=24 &&
   item.depth.words>=850,
   'Chapter '+item.chapter+': '+item.title+' has multiple deep concept lessons, examples and paragraphs');
  check(item.invalidExamples===0,
   'Chapter '+item.chapter+' has structured worked problems with full steps and answers');
  check(item.completeSubtopics>=12,
   'Chapter '+item.chapter+' explanatory subtopics contain multi-paragraph reasoning');
 }
 check(report[2].sectionCount>=15&&report[2].subtopicCount>=20,
  'World of Numbers teaching remains unchanged and sufficiently detailed');

 // Regression coverage: independent NCERT Ch. 1 review revealed exercise-level gaps
 // not captured by the general "12+ subtopics" measure.
 const verifiedCh01=await page.evaluate(()=>{
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;
  const ch=bank?.['Orienting Yourself: The Use of Coordinates'];
  const named=ch?.sections?.map(section=>section.title)||[];
  const allParts=ch?.sections?.flatMap(section=>section.subtopics||[])||[];
  const allExamples=[
    ...(ch?.sections?.flatMap(section=>section.examples||[])||[]),
    ...allParts.flatMap(part=>part.examples||[])
  ];
  return {
    lessonTitles:named,
    concepts:allParts.map(part=>part.title),
    examples:allExamples.map(ex=>ex.title),
    audited:window.STUDYAI_CLASS9_DEPTH_AUDIT?.['Orienting Yourself: The Use of Coordinates'],
    reflections:allParts.filter(part=>part.title==='Reflection and sign changes').length
  };
 });
 const chapterOneRequired=[
  'From ancient navigation to accurate room maps',
  'Midpoints, missing endpoints and dividing a segment',
  'Coordinate tests for lines, triangles and squares',
  'Circles, screens and applications of coordinates'
 ];
 check(chapterOneRequired.every(name=>verifiedCh01.lessonTitles.includes(name)),
  'Chapter 1: original NCERT history, midpoint, collinearity and geometry lessons are present');
 check(verifiedCh01.reflections===1&&verifiedCh01.examples.includes('Two successive axis reflections'),
  'Chapter 1: original reflection topic retained and strengthened, not duplicated');
 check([
  'Trisection and the one-third displacement method',
  'Area and perimeter of a plotted right triangle',
  'Identify a square using distances and right angles',
  'Inside, on or outside a circle',
  'Circular icons inside a rectangular screen',
  'When two circular regions touch or overlap'
 ].every(name=>verifiedCh01.concepts.includes(name)),
  'Chapter 1: textbook exercise skills include trisection, shapes and circle/screen checks');
 check(verifiedCh01.audited.sections>=10&&verifiedCh01.audited.examples>=30,
  'Chapter 1 audit inventory updates after new lessons and examples');



 // Regression checks for independent NCERT Ganita Manjari reviews (Ch 2, 4, 5).
 const review=await page.evaluate(()=>{
  const notes=window.CBSE_CLASS9_MATH_FULL_NOTES;
  const parts=title=>notes[title].sections.flatMap(s=>s.subtopics||[]);
  const ch2=parts('Introduction to Linear Polynomials');
  const ch4=parts('Exploring Algebraic Identities');
  const ch5=parts('I’m Up and Down, and Round and Round');
  const selectPart=(arr,title)=>arr.filter(p=>p.title===title);
  const degree=selectPart(ch2,'Degree, coefficients and missing terms in polynomials');
  const squares=selectPart(ch4,'Discovering an identity from consecutive squares');
  const locus=selectPart(ch5,'A circle is a locus, not a filled disc');
  const centres=selectPart(ch5,'Locating the centre from chords');
  const openLesson=(title,lesson)=>{
   const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
    e.subject==='Mathematics'&&e.title===title);
   if(!entry)throw Error('No curriculum entry: '+title);
   current={board:entry.board,grade:entry.grade,subject:entry.subject,
    component:'All components',topic:entry.title,topicId:entry.id};
   renderFilters();
   openTopic(entry.title,entry.id);
   const index=notes[title].sections.findIndex(s=>s.title===lesson);
   if(index<0)throw Error('No lesson '+lesson);
   window.StudyAILessonReader.goTo(index);
   const opened=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(s=>!s.hidden);
   return {count:opened.length,title:opened[0]?.querySelector(':scope > h3')?.textContent.trim(),
    text:opened[0]?.textContent||'',examples:opened[0]?.querySelectorAll('.worked-box').length||0,
    progress:window.StudyAIProgress?.summary(entry.id)?.total||0};
  };
  return {
   ch2:degree.length===1&&degree[0].examples.length===3&&
     degree[0].paragraphs.some(p=>p.includes('0x²'))&&
     selectPart(ch2,'Intercepts and the zero of a polynomial').length===1,
   ch4:squares.length===1&&squares[0].examples[0].steps.length>=4&&
     squares[0].paragraphs.some(p=>p.includes('(n−1)²')),
   ch5:locus.length===1&&centres.length===1&&
     locus[0].paragraphs.some(p=>p.includes('A locus is'))&&
     centres[0].examples.some(e=>e.answer.includes('5 cm')),
   rendered:[
    openLesson('Introduction to Linear Polynomials','Polynomial language'),
    openLesson('Exploring Algebraic Identities','Identity versus equation'),
    openLesson('I’m Up and Down, and Round and Round','Circle vocabulary'),
    openLesson('I’m Up and Down, and Round and Round','Symmetry and determining a circle')
   ]
  };
 });
 check(review.ch2&&review.ch4&&review.ch5,
  'NCERT Ch 2, 4, 5 additions present without duplicating prior lessons');
 const [deg,squares,locus,centres]=review.rendered;
 check(deg.count===1&&deg.title==='Polynomial language'&&deg.text.includes('0x²')&&deg.examples>=4,
  'Chapter 2: signed and absent polynomial coefficients render with worked examples');
 check(squares.count===1&&squares.title==='Identity versus equation'&&
  squares.text.includes('consecutive')&&squares.examples>=3,
  'Chapter 4: consecutive-square identity proof renders with worked examples');
 check(locus.count===1&&locus.text.includes('A locus is')&&
  centres.count===1&&centres.text.includes('Infinitely many circles')&&centres.examples>=3,
  'Chapter 5: locus and infinitely many two-point circles render as separate lessons');

 // Check live integration, not only source data. Each chapter must open.
 const rendered=await page.evaluate(names=>{
  const entries=STUDY_DATA.filter(e=>e.board==='CBSE'&&
    e.grade==='Class 9'&&e.subject==='Mathematics');
  return names.map(title=>{
   const entry=entries.find(e=>e.title===title);
   if(!entry)return {title,missingEntry:true};
   current={board:entry.board,grade:entry.grade,subject:entry.subject,
    component:'All components',topic:entry.title,topicId:entry.id};
   renderFilters();
   openTopic(entry.title,entry.id);
   const root=document.getElementById('detailed-notes');
   const all=root.querySelectorAll('.note-section.actual-note-topic');
   const open=root.querySelectorAll('.note-section.actual-note-topic:not([hidden])');
   return {title,id:entry.id,
    openTopics:open.length,sections:all.length,
    displayedSubtopics:open[0]?.querySelectorAll('.studyai-lesson-subtopic:not([hidden])').length||0,
    navCount:root.querySelectorAll('.studyai-topic-select option').length,
    progressCount:window.StudyAIProgress?.summary(entry.id)?.total||0,
    bodyLength:open[0]?.textContent?.length||0,
    completionRail:document.querySelectorAll('.studyai-lesson-rail .studyai-lesson-row').length,
    noteTitle:document.getElementById('note-title')?.textContent
   };
  });
 },titles);
 console.log('RENDERED CHAPTER AUDIT',JSON.stringify(rendered,null,2));
 for(const ch of rendered){
  check(!ch.missingEntry&&ch.openTopics===1&&ch.noteTitle===ch.title,
   'chapter opens with exactly one visible substantive lesson: '+ch.title);
  check(ch.sections>=ch.navCount&&ch.navCount>0&&
   ch.progressCount===ch.navCount&&ch.completionRail===ch.navCount,
   'navigation, progress and notes use same substantive lesson count: '+ch.title);
  check(ch.displayedSubtopics>=2&&ch.bodyLength>550,
   'first lesson renders detailed original text and multiple concept sections: '+ch.title);
 }

 // Verify a newly added page actually opens via the SAME lesson navigation
 // and contains more than a source-code heading.
 const ch01Browser=await page.evaluate(()=>{
  const first=STUDY_DATA.find(entry=>entry.board==='CBSE'&&entry.grade==='Class 9'&&
    entry.subject==='Mathematics'&&entry.title==='Orienting Yourself: The Use of Coordinates');
  if(!first)throw Error('Class 9 Maths Chapter 1 entry missing');
  current={board:first.board,grade:first.grade,subject:first.subject,
    component:'All components',topic:first.title,topicId:first.id};
  renderFilters();
  openTopic(first.title,first.id);
  const sectionTitles=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .map(section=>section.querySelector(':scope > h3')?.textContent.trim());
  const target=sectionTitles.indexOf('Midpoints, missing endpoints and dividing a segment');
  if(target<0)throw Error('New midpoint lesson missing from rendered pages');
  window.StudyAILessonReader.goTo(target);
  const opened=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(section=>!section.hidden);
  return {
    target,visible:opened.length,
    title:opened[0]?.querySelector(':scope > h3')?.textContent.trim(),
    examples:opened[0]?.querySelectorAll('.worked-box').length,
    paragraphs:opened[0]?.querySelectorAll('.studyai-lesson-subtopic p').length,
    hasProgress:window.StudyAIProgress?.summary(first.id)?.total>0
  };
 });
 check(ch01Browser.visible===1&&ch01Browser.title==='Midpoints, missing endpoints and dividing a segment'&&
  ch01Browser.examples>=3&&ch01Browser.paragraphs>=6&&ch01Browser.hasProgress,
  'Chapter 1: newly added midpoint lesson renders with full examples and progress tracking');

 // Verify the last chapter's non-summary worked solutions are reachable.
 await page.evaluate(()=>{
  const select=document.querySelector('#detailed-notes .studyai-topic-select');
  if(!select)throw Error('Maths lesson reader missing');
  select.value=String(select.options.length-1);
  select.dispatchEvent(new Event('change',{bubbles:true}));
 });
 check(await page.locator('#detailed-notes .note-section.actual-note-topic:not([hidden]) .worked-box').count()>=2,
  'final mixed-examination applications include at least two fully worked questions');
 check(errors.length===0,'no browser JavaScript exceptions: '+errors.join('; '));
 console.log('ALL 14 CLASS 9 MATHEMATICS CHAPTERS PASS');
})().catch(error=>{
 console.error(error);
 console.error(stderr);
 process.exitCode=1;
}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();
 rmSync(dir,{recursive:true,force:true});
});
