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

 // NCERT Ganita Manjari Chapter 6 independent textbook regression coverage.
 const verifiedCh06=await page.evaluate(()=>{
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;
  const ch=bank['Measuring Space: Perimeter and Area'];
  const titles=ch.sections.map(s=>s.title);
  const generic=new Set(['Chapter coverage','Exam application',
   'Common traps and final checks','Mastery check']);
  const navigableTitles=titles.filter(title=>!generic.has(title));
  const added=[
   'Pi, track staggers and perimeter puzzles',
   'Heron’s formula and triangle-side applications',
   'Circle-based triangle areas and Brahmagupta’s formula',
   'Equal-area proofs and quadrilateral applications',
   'Squaring a rectangle by construction',
   'Circular segments, sector applications and scaling'
  ];
  const parts=ch.sections.flatMap(s=>s.subtopics||[]);
  const examples=parts.flatMap(p=>p.examples||[]);
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Mathematics'&&e.title==='Measuring Space: Perimeter and Area');
  if(!entry)throw Error('Chapter 6 missing from navigation');
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   component:'All components',topic:entry.title,topicId:entry.id};
  renderFilters();
  openTopic(entry.title,entry.id);
  const openLesson=title=>{
   const index=ch.sections.findIndex(s=>s.title===title);
   if(index<0)throw Error('Missing Chapter 6 lesson: '+title);
   window.StudyAILessonReader.goTo(index);
   const visible=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(section=>!section.hidden);
   return {visible:visible.length,title:visible[0]?.querySelector(':scope > h3')?.textContent.trim(),
    examples:visible[0]?.querySelectorAll('.worked-box').length||0,
    words:visible[0]?.textContent?.length||0,
    progress:window.StudyAIProgress?.summary(entry.id)?.total||0};
  };
  const browser=added.map(openLesson);
  return {
   added,titles,navigableTitles,concepts:parts.map(part=>part.title),
   exampleNames:examples.map(ex=>ex.title),browser,
   audit:window.STUDYAI_CLASS9_DEPTH_AUDIT['Measuring Space: Perimeter and Area'],
   readerOptions:document.querySelectorAll('#detailed-notes .studyai-topic-select option').length,
   progressCount:window.StudyAIProgress?.summary(entry.id)?.total||0
  };
 });
 check(verifiedCh06.added.every(t=>verifiedCh06.titles.filter(title=>title===t).length===1),
  'Chapter 6: six distinct textbook lessons are present without duplicates');
 check([
  'Estimating the circumference-to-diameter ratio',
  'Why pi is irrational and why fractions are approximations',
  'Track-lane stagger and wheel revolutions',
  'Why surprising semicircle paths can be equally long',
  'Apply Heron’s formula carefully',
  'Brahmagupta’s formula and its connection to Heron',
  'Triangle area from the inradius or circumradius',
  'Equal areas from the same base and parallel lines',
  'Baudhāyana’s compass-and-straightedge construction',
  'Minor and major sectors, segments and triangle subtraction',
  'Inscribed polygons as fractions of circle area'
 ].every(t=>verifiedCh06.concepts.includes(t)),
  'Chapter 6: NCERT perimeter, area, construction and circle concepts covered');
 check([
  'Estimate pi with thread',
  'Three small semicircles or one large?',
  'Triangle with two sides and perimeter',
  'Verify Brahmagupta on a rectangle',
  'Incircle and circumcircle for a 3–4–5 triangle',
  'Find the height of a trapezium',
  'Explain why the compass construction works',
  'A sixty-degree circular segment',
  'Two nonoverlapping wipers'
 ].every(t=>verifiedCh06.exampleNames.includes(t)),
  'Chapter 6: NCERT-specific solved examples are reachable');

 const followupConcepts=[
  'Geometric hexagon bounds on pi',
  'Thin parallelograms and area-preserving shear',
  'Archimedes’ perimeter-times-radius area argument',
  'Ninety-degree circular segments',
  'Area of a concentric annulus from a tangent chord',
  'Semicircle areas and right-triangle geometry',
  'Circle grids and the four-petal exercise'
 ];
 check(followupConcepts.every(title=>verifiedCh06.concepts.filter(t=>t===title).length===1),
  'Chapter 6 follow-up: seven verified concepts appear exactly once');
 const followupExamples=[
  'Hexagons bounding pi',
  'Outside-base altitude',
  'Circular area from circumference',
  'Quarter-circle segment',
  'Tangent chord determines ring area',
  'Semicircles of a right triangle',
  'Twenty circles in a rectangular grid'
 ];
 check(followupExamples.every(title=>verifiedCh06.exampleNames.filter(t=>t===title).length===1),
  'Chapter 6 follow-up: worked proofs and area applications are present exactly once');
 check(verifiedCh06.browser.every((item,i)=>item.visible===1&&
   item.title===verifiedCh06.added[i]&&item.examples>=2&&item.words>600&&item.progress>0),
  'Chapter 6: all six new lessons render with worked examples and progress tracking');
 check(verifiedCh06.readerOptions===verifiedCh06.progressCount&&
   verifiedCh06.readerOptions===verifiedCh06.navigableTitles.length&&
   verifiedCh06.audit.sections===verifiedCh06.navigableTitles.length,
  'Chapter 6: lesson navigation, completion rings and content inventory agree');


 // NCERT 2026–27 Chapter 7: real browser checks on integrated notes and navigation.
 const verifiedCh07=await page.evaluate(()=>{
  const title='The Mathematics of Maybe: Introduction to Probability';
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES[title];
  if(!ch)throw Error('Chapter 7 note bank missing');
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('Chapter 7 navigation entry missing');
  const sections=ch.sections.filter(s=>!new Set([
   'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]).has(s.title));
  const subtopics=sections.flatMap(s=>s.subtopics||[]);
  const examples=sections.flatMap(s=>s.examples||[]).concat(subtopics.flatMap(s=>s.examples||[]));
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   component:'All components',topic:entry.title,topicId:entry.id};
  renderFilters();openTopic(entry.title,entry.id);
  const pages=sections.map((s,index)=>{
   window.StudyAILessonReader.goTo(index);
   const visible=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(el=>!el.hidden);
   return {section:s.title,visible:visible.length,
    heading:visible[0]?.querySelector(':scope > h3')?.textContent?.trim(),
    text:visible[0]?.textContent||''};
  });
  // Leave Chapter 7 at its first lesson so subsequent all-chapter smoke checks
  // do not inherit the final lesson selected by this targeted test.
  window.StudyAILessonReader.goTo(0);
  return {
   titles:subtopics.map(s=>s.title),examples:examples.map(e=>e.title),
   counts:examples.filter(e=>!e||typeof e.question!=='string'||
    !Array.isArray(e.steps)||!e.steps.length||typeof e.answer!=='string').length,
   pages:pages.map(p=>({section:p.section,visible:p.visible,heading:p.heading,
    textLength:p.text.length,
    hasSampling:p.text.includes('Forecast library preferences from a sample'),
    hasGeometric:p.text.includes('Circular target within a rectangular field'),
    hasThreeStage:p.text.includes('Three-question guessing tree')})),
   lessonCount:document.querySelectorAll('#detailed-notes .studyai-topic-select option').length,
   progressCount:window.StudyAIProgress?.summary(entry.id)?.total,
   audit:window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title],
   fullSectionCount:ch.sections.length
  };
 });
 const ch07Topics=[
  'Interpreting the qualitative probability scale',
  'Estimating whole populations from representative surveys',
  "Streaks, independence and the gambler's fallacy",
  'Irregular experiments and frequency-table predictions',
  'Repeated letters are separate equally likely cards',
  'Valid sample spaces can have unequal probabilities',
  'Product tables, ordered choices and digit arrangements',
  'Probability from the areas of uniform target regions',
  'Different-colour draws through the same-colour complement',
  'Trees with replacement and unequal branch weights',
  'Exactly two correct answers and three-stage trees'
 ];
 check(ch07Topics.every(t=>verifiedCh07.titles.filter(name=>name===t).length===1),
  'Chapter 7: eleven distinct NCERT corrections are present once each');
 const ch07Ex=[
  'Forecast library preferences from a sample',
  'Does a streak change the next die roll?',
  'Paper cup with unequal observed outcomes',
  'Letter-card selections with repeated symbols',
  'Count grouped outcomes rather than labels',
  'Even four-digit numbers without repetition',
  'Circular target within a rectangular field',
  'Three-colour complement without replacement',
  'Matching two pen colours with replacement',
  'Three-question guessing tree'
 ];
 check(ch07Ex.every(t=>verifiedCh07.examples.filter(name=>name===t).length===1),
  'Chapter 7: original worked examples appear once and have accessible answers');
 check(verifiedCh07.counts===0,'Chapter 7: all worked examples have complete step-by-step solutions');
 check(verifiedCh07.pages.every(p=>p.visible===1&&p.heading===p.section&&p.textLength>400),
  'Chapter 7: each lesson renders as a single full-content page');
 check(verifiedCh07.pages.some(p=>p.hasSampling)&&
   verifiedCh07.pages.some(p=>p.hasGeometric)&&
   verifiedCh07.pages.some(p=>p.hasThreeStage),
  'Chapter 7: surveys, geometric probability and three-stage trees render in browser');
 check(verifiedCh07.lessonCount===verifiedCh07.progressCount&&
   verifiedCh07.lessonCount===verifiedCh07.pages.length&&
   verifiedCh07.audit.sections===verifiedCh07.pages.length&&
   verifiedCh07.audit.subtopics===verifiedCh07.titles.length,
  'Chapter 7: reader navigation, completion tracking and depth audit remain in sync');


 // Reloading Chapter 7's audited depth patch must not duplicate any topics.
 const ch07Replay=await page.evaluate(async()=>{
  const title='The Mathematics of Maybe: Introduction to Probability';
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES[title];
  const before={
   sections:ch.sections.length,
   topics:ch.sections.flatMap(s=>s.subtopics||[]).length,
   examples:ch.sections.flatMap(s=>s.examples||[]).length+
    ch.sections.flatMap(s=>(s.subtopics||[]).flatMap(u=>u.examples||[])).length
  };
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src='/cbse-class9-maths-depth-ch07.js?duplicate-check=1';
   script.onload=resolve;
   script.onerror=()=>reject(Error('Chapter 7 patch reload failed'));
   document.head.append(script);
  });
  const after={
   sections:ch.sections.length,
   topics:ch.sections.flatMap(s=>s.subtopics||[]).length,
   examples:ch.sections.flatMap(s=>s.examples||[]).length+
    ch.sections.flatMap(s=>(s.subtopics||[]).flatMap(u=>u.examples||[])).length
  };
  return {before,after};
 });
 check(JSON.stringify(ch07Replay.before)===JSON.stringify(ch07Replay.after),
  'Chapter 7: running the expanded depth file twice is idempotent');

 
 // NCERT 2026–27 Ganita Manjari Chapter 8: verified textbook depth and real browser.
 const verifiedCh08=await page.evaluate(()=>{
  const title='Predicting What Comes Next: Exploring Sequences and Progressions';
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES?.[title];
  if(!ch)throw Error('Chapter 8 notes are missing');
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('Chapter 8 missing from Class 9 navigation');
  const excluded=new Set(['Chapter coverage','Exam application',
   'Common traps and final checks','Mastery check']);
  const sections=ch.sections.filter(s=>!excluded.has(s.title));
  const parts=sections.flatMap(s=>s.subtopics||[]);
  const works=sections.flatMap(s=>s.examples||[]).concat(parts.flatMap(p=>p.examples||[]));
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   component:'All components',topic:entry.title,topicId:entry.id};
  renderFilters();
  openTopic(entry.title,entry.id);
  const visiblePages=sections.map((s,i)=>{
   window.StudyAILessonReader.goTo(i);
   const visible=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(el=>!el.hidden);
   return {title:s.title,number:visible.length,
    heading:visible[0]?.querySelector(':scope > h3')?.textContent?.trim(),
    length:visible[0]?.textContent?.length||0,
    examples:visible[0]?.querySelectorAll('.worked-box').length||0};
  });
  window.StudyAILessonReader.goTo(0);
  return {concepts:parts.map(p=>p.title),examples:works.map(w=>w.title),
   invalid:works.filter(w=>!w||typeof w.question!=='string'||
    !Array.isArray(w.steps)||w.steps.length===0||typeof w.answer!=='string').length,
   original:parts.length,visiblePages,
   audit:window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title],
   options:document.querySelectorAll('#detailed-notes .studyai-topic-select option').length,
   completedTotal:window.StudyAIProgress?.summary(entry.id)?.total||0};
 });
 const ch08Expected=[
  'Finite sequences, triangular dots and square gnomons',
  'Checking whether a value is truly a term',
  'Virahānka–Fibonacci patterns from poetic rhythms',
  'Recurrences using three earlier terms',
  'Coordinate graphs and linear taxi fares',
  'Recovering an AP and counting multiples in an interval',
  'Āryabhaṭa, rectangular dot arrays and interval sums',
  'Expressing 100 as consecutive natural-number sums',
  'Graphing geometric change and modelling a bouncing ball',
  'Sierpiński triangle: exact count and shaded-area rules',
  'Sierpiński square carpet: counting retained squares and area',
  'Symmetric terms for three-term APs and GPs',
  'Prefix-sum recurrences and why doubling or Fibonacci returns'
 ];
 check(ch08Expected.every(x=>verifiedCh08.concepts.filter(t=>t===x).length===1),
  'Chapter 8: 13 source-verified substantial learning subtopics each appear once');
 const ch08ExpectedExamples=[
  'Term membership must have an integer index',
  'Count eight-beat poetic rhythms',
  'Evaluate a three-step recurrence',
  'Graph a fare progression',
  'Recover two AP parameters',
  'Find the sum of a consecutive interval',
  'All consecutive natural partitions of 100',
  'Five rebounds and the sixth ground impact',
  'Stage four of a Sierpiński triangle',
  'Third-stage square carpet',
  'Solve a three-term GP from sum and product',
  'Reduce a cumulative Virahānka recurrence'
 ];
 check(ch08ExpectedExamples.every(x=>verifiedCh08.examples.filter(t=>t===x).length===1),
  'Chapter 8: numerical proofs and solved exercise models are present without duplication');
 check(verifiedCh08.invalid===0,'Chapter 8: every solved example has valid working and answer');
 check(verifiedCh08.visiblePages.every(p=>p.number===1&&p.title===p.heading&&
   p.length>450&&p.examples>=1),
  'Chapter 8: full notes render one complete lesson per page with examples');
 check(verifiedCh08.options===verifiedCh08.completedTotal&&
   verifiedCh08.options===verifiedCh08.visiblePages.length&&
   verifiedCh08.audit?.sections===verifiedCh08.visiblePages.length&&
   verifiedCh08.audit?.subtopics===verifiedCh08.original&&verifiedCh08.audit?.words>2000,
  'Chapter 8: lesson navigation, completion progress and depth inventory stay synchronised');
 const ch08Numbers=(()=>{
  let ways=[];
  for(let k=2;k*(k+1)/2<=100;k++){
   const a=(200/k-k+1)/2;
   if(Number.isInteger(a)&&a>=1)ways.push({length:k,start:a});
  }
  return ways;
 })();
 assert.deepEqual(ch08Numbers,[{length:5,start:18},{length:8,start:9}],
  'All consecutive-positive partitions of 100');
 check(Math.abs(80+2*[1,2,3,4,5].reduce((sum,k)=>sum+80*.6**k,0)-301.3376)<1e-8&&
   3**4===81&&8**3===512&&9**3===729,
  'Chapter 8: bounce-distance and fractal-stage numeric reference calculations agree');
 const ch08Replay=await page.evaluate(async()=>{
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES[
   'Predicting What Comes Next: Exploring Sequences and Progressions'];
  const inventory=()=>({sections:ch.sections.length,
   units:ch.sections.flatMap(s=>s.subtopics||[]).length,
   examples:ch.sections.flatMap(s=>s.examples||[]).length+
    ch.sections.flatMap(s=>(s.subtopics||[]).flatMap(p=>p.examples||[])).length});
  const before=inventory();
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src='/cbse-class9-maths-depth-ch08.js?studyai-reload-test=1';
   script.onload=resolve;
   script.onerror=()=>reject(Error('Chapter 8 script reload failed'));
   document.head.appendChild(script);
  });
  return {before,after:inventory()};
 });
 check(JSON.stringify(ch08Replay.before)===JSON.stringify(ch08Replay.after),
  'Chapter 8: reloading the note script does not duplicate sections or examples');


 // NCERT Ganita Manjari Part II (iemh201.pdf), Chapter 9: independent content & UI audit.
 const verifiedCh09=await page.evaluate(()=>{
  const title='Propositions and their Converses';
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES, ch=bank?.[title];
  if(!ch)throw Error('NCERT Chapter 9 note bank entry is absent');
  const entry=STUDY_DATA.find(e=>e.board==='CBSE'&&e.grade==='Class 9'&&
   e.subject==='Mathematics'&&e.title===title);
  if(!entry)throw Error('NCERT Chapter 9 navigation entry is absent');
  const excluded=new Set(['Chapter coverage','Exam application',
   'Common traps and final checks','Mastery check']);
  const sections=ch.sections.filter(s=>!excluded.has(s.title));
  const parts=sections.flatMap(s=>s.subtopics||[]);
  const examples=sections.flatMap(s=>s.examples||[]).concat(parts.flatMap(u=>u.examples||[]));
  current={board:entry.board,grade:entry.grade,subject:entry.subject,
   component:'All components',topic:entry.title,topicId:entry.id};
  renderFilters();openTopic(entry.title,entry.id);
  const rendered=sections.map((s,index)=>{
   window.StudyAILessonReader.goTo(index);
   const visible=[...document.querySelectorAll('#detailed-notes .note-section.actual-note-topic')]
    .filter(el=>!el.hidden);
   return {title:s.title,visible:visible.length,
    heading:visible[0]?.querySelector(':scope > h3')?.textContent.trim(),
    length:visible[0]?.textContent?.length||0,
    worked:visible[0]?.querySelectorAll('.worked-box').length||0};
  });
  window.StudyAILessonReader.goTo(0);
  return {sectionTitles:sections.map(s=>s.title),
   titles:parts.map(p=>p.title),examples:examples.map(e=>e.title),rendered,
   invalid:examples.filter(ex=>!ex||typeof ex.question!=='string'||
    !Array.isArray(ex.steps)||!ex.steps.length||
    typeof ex.answer!=='string'||!ex.answer.trim()).length,
   badParagraphs:parts.filter(p=>!Array.isArray(p.paragraphs)||p.paragraphs.length<2).length,
   lessonOptions:document.querySelectorAll('#detailed-notes .studyai-topic-select option').length,
   progressCount:window.StudyAIProgress?.summary(entry.id)?.total||0,
   audit:window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title]};
 });
 const ch09Topics=[
  'Four ways a statement and its converse can behave',
  'Reversible algebraic operations: addition, even powers and odd powers',
  'Why perfect squares have exactly an odd number of positive divisors',
  'Exactly three or four divisors: prime squares, cubes and products',
  'Products of squares, equal areas and prime-looking formulas',
  'Converse of Baudhāyana–Pythagoras using an SSS construction',
  'Coprime factors, LCM and why divisibility converses fail',
  'Offset coprimality and the digit-sum biconditional',
  'Equal-length diagonal sticks and the meaning of necessary',
  'Incentre and angle-bisector lengths: a starred geometric proposition'
 ];
 check(ch09Topics.every(t=>verifiedCh09.titles.filter(x=>x===t).length===1),
  'Chapter 9: 10 original, source-verified theorem and converse subtopics appear once');
 const ch09Examples=[
  'Both directions can be false',
  'A square loses sign information',
  'Divisor partners for squares and non-squares',
  'A prime cube refutes the four-divisor converse',
  'A false product-of-squares converse',
  'Prove the Pythagorean converse by construction',
  'Compare 24 with 60',
  'Prove the three-step gcd equivalence',
  'Build a quadrilateral from two sticks',
  'Symmetry proves the incentre proposition',
  'A counterexample to a tempting incentre converse (optional)'
 ];
 check(ch09Examples.every(t=>verifiedCh09.examples.filter(x=>x===t).length===1),
  'Chapter 9: carefully justified worked proofs and counterexamples appear once');
 check(verifiedCh09.invalid===0&&verifiedCh09.badParagraphs===0,
  'Chapter 9: every worked solution and explanatory subtopic has a valid structure');
 check(verifiedCh09.rendered.every(p=>p.visible===1&&p.heading===p.title&&
   p.length>400&&p.worked>=1),
  'Chapter 9: each substantial lesson renders separately with worked problems');
 check(verifiedCh09.lessonOptions===verifiedCh09.progressCount&&
   verifiedCh09.lessonOptions===verifiedCh09.rendered.length&&
   verifiedCh09.audit?.sections===verifiedCh09.rendered.length&&
   verifiedCh09.audit?.subtopics===verifiedCh09.titles.length&&
   verifiedCh09.audit?.words>1900,
  'Chapter 9: navigation, completion and final depth metrics agree');
 check(verifiedCh09.audit?.reviewedSource?.includes('iemh201.pdf'),
  'Chapter 9: verified source is NCERT Part II iemh201.pdf, not iemh109.pdf');
 // Gemini's suggested iff converse is false: exact numeric coordinate counterexample.
 const r=(Math.sqrt(3)-1)/2,e=2*Math.sqrt(3)-3,q=Math.sqrt(3)/(1+Math.sqrt(3));
 const ie2=(r-e)**2+r**2,if2=2*(q-r)**2;
 check(Math.abs(ie2-if2)<1e-11&&Math.abs(ie2-(14-8*Math.sqrt(3)))<1e-11,
  'Chapter 9: exact 30–60–90 incentre counterexample refutes Gemini’s iff claim');
 const ch09Replay=await page.evaluate(async()=>{
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES['Propositions and their Converses'];
  const snapshot=()=>({sections:ch.sections.length,
   topics:ch.sections.flatMap(s=>s.subtopics||[]).length,
   examples:ch.sections.flatMap(s=>s.examples||[]).length+
    ch.sections.flatMap(s=>(s.subtopics||[]).flatMap(p=>p.examples||[])).length});
  const before=snapshot();
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src='/cbse-class9-maths-depth-ch09.js?studyai-reload-test=1';
   script.onload=resolve;
   script.onerror=()=>reject(Error('Chapter 9 script reload failed'));
   document.head.append(script);
  });
  return {before,after:snapshot()};
 });
 check(JSON.stringify(ch09Replay.before)===JSON.stringify(ch09Replay.after),
  'Chapter 9: second depth-script evaluation never duplicates subtopics or examples');

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
