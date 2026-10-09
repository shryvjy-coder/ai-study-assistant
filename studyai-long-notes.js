/* StudyAI long-form notes layer.
 * Keeps the note reader content-first and expands existing verified curriculum material
 * into longer exam-ready pages without copying third-party revision-note wording.
 */
(function(){
'use strict';

if(window.STUDYAI_LONG_NOTES_APPLIED)return;
window.STUDYAI_LONG_NOTES_APPLIED=true;

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const asArray=value=>Array.isArray(value)?value:[];
const clean=value=>String(value==null?'':value).trim();
const unique=items=>{
  const out=[],seen=new Set();
  for(const item of asArray(items)){
    const text=clean(item);
    if(!text)continue;
    const key=text.toLowerCase().replace(/\s+/g,' ');
    if(seen.has(key))continue;
    seen.add(key);out.push(text);
  }
  return out;
};
const escapeHtml=value=>String(value==null?'':value)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;').replace(/'/g,'&#39;');

function guideParagraph(entry,section,index){
  const topic=clean(entry.title)||'this topic';
  const heading=clean(section.title)||'this part of the topic';
  const subject=clean(entry.subject);
  const banks={
    Mathematics:[
      'Treat '+heading+' as a method you should be able to explain, not a rule to copy. Identify the quantities involved, state the relationship clearly, then show the algebra or geometry that justifies each step. Keep exact values until the final line whenever possible.',
      'Questions on '+heading+' often combine more than one skill. Translate the wording into symbols, a diagram, a table or a graph before calculating. Check restrictions, signs, scale and whether the final value is sensible in the context of '+topic+'.',
      'A complete mathematical answer shows enough working for another student to follow the reasoning. If several methods are possible, choose the one that exposes the structure of '+heading+' most clearly and verify the result by substitution, estimation or a second representation.',
      'When '+heading+' is represented graphically, connect every feature of the graph to the algebra or geometry behind it. Gradients, intercepts, turning points, lengths and areas have meaning only when the axes, scale, domain and units are interpreted correctly.',
      'For unfamiliar problems involving '+heading+', separate the information you know from the quantity you need. Build the solution in small justified steps, preserve units and exact values, and use the final line to answer the question rather than stopping at an intermediate expression.'
    ],
    Physics:[
      'For '+heading+', connect the definition to measurable quantities, units and direction where relevant. Physics marks are usually earned by showing the physical relationship as well as the calculation, so state what changes, what causes the change and what remains constant.',
      'Use '+heading+' through equations only after identifying the quantities and converting to consistent units. Write the relationship first, substitute values with units, keep enough significant figures during working, and check whether the magnitude and direction of the result are physically reasonable.',
      'Graphs and experiments are another way to test '+heading+'. Read gradients and areas only when they have a defined physical meaning, distinguish random scatter from a systematic effect, and connect an observed trend to the particle, force, energy or field model that explains it.',
      'In explanation questions on '+heading+', build a cause-and-effect chain. Name the relevant object or system, identify the interaction or transfer, describe the resulting change and finish with the observable consequence. Avoid replacing an explanation with a formula alone.',
      'Multi-step questions on '+topic+' often link '+heading+' to earlier ideas. Track energy, momentum, charge or other conserved quantities carefully, state assumptions and use the data given in the question rather than introducing unsupported values.'
    ],
    Chemistry:[
      'Understand '+heading+' at both the visible and particle levels. State what particles or species are present, how their arrangement, bonding, energy or electron distribution changes, and then connect that microscopic change to the observation, property or reaction described.',
      'When '+heading+' involves equations, balance atoms and charge before using numerical ratios. Include state symbols or conditions when they matter, distinguish amount in moles from mass or concentration, and keep units consistent throughout a calculation.',
      'Chemical explanations for '+heading+' should link structure to behaviour. Identify the type of particle, bonding or intermolecular force involved, compare the strength or number of interactions and then explain the resulting trend in reactivity or physical properties.',
      'For practical work involving '+heading+', separate the chemical change from the measurement used to detect it. State the independent and dependent variables, relevant controls, expected observations and how the data would support or challenge the proposed explanation.',
      'Exam questions on '+topic+' can move between words, formulae, particle diagrams and quantitative data. Translate each representation carefully and use precise chemical vocabulary, especially when distinguishing atoms, ions, molecules, elements, compounds and mixtures.'
    ],
    Biology:[
      'For '+heading+', build explanations from structure to mechanism to consequence. Name the cell, tissue, organ, molecule or process involved, describe what it does and then link that action to the biological outcome rather than listing disconnected facts.',
      'Location matters in '+heading+'. State where a process happens, what enters or leaves, which structures or molecules are involved and how their properties make the process effective. This level of detail is often what separates a description from a full explanation.',
      'When data are used to test '+heading+', describe the pattern first and quote or calculate evidence before explaining it. Consider controls, sample size, anomalies and whether the data show correlation or justify a causal conclusion.',
      'Processes in '+topic+' should be learned as connected sequences. Put events in the correct order, use arrows or a flow diagram when useful, and explain how changing one stage affects later stages through feedback, transport, enzyme action or exchange.',
      'For practical and unfamiliar questions on '+heading+', apply the same biological principles to the new context. Identify the variable being changed, predict the effect using a mechanism and explain why the result follows from the structure or process described in the notes.'
    ],
    'Computer Science':[
      'For '+heading+', move between the real-world problem, the data representation and the algorithm or program that solves it. State inputs, outputs and constraints clearly, then explain why each processing step is needed.',
      'Trace '+heading+' with a small example before generalising. Keep data types, ranges and edge cases in mind, and distinguish the logical design of a solution from the syntax used to implement it.',
      'When evaluating '+heading+', compare correctness, efficiency, reliability, maintainability and security where relevant. A strong answer explains the consequence of a design choice rather than merely naming a feature.',
      'Use precise terminology for '+heading+' and distinguish concepts that sound similar. Diagrams, tables, pseudocode and dry runs are useful because they expose assumptions and make errors easier to detect.',
      'Exam problems on '+topic+' may combine theory and application. Identify the concept being tested, apply it to the scenario given and support the answer with a specific reason tied to the data or system described.'
    ]
  };
  const bank=banks[subject]||[
    'Develop '+heading+' as a connected explanation. Define the central idea, show how its parts relate and then apply it to a specific example from '+topic+'.',
    'Use the vocabulary of '+heading+' precisely and support statements with evidence, a calculation, a diagram or a clear chain of reasoning whenever the question requires it.',
    'Compare related ideas within '+heading+' by stating both the similarity and the important difference, then explain why that difference matters in the context of '+topic+'.',
    'When interpreting information about '+heading+', identify the claim, select the relevant evidence and explain how the evidence supports the conclusion instead of simply repeating the data.',
    'For unfamiliar questions on '+topic+', start from the core principles in '+heading+' and apply them step by step. Check that the final response addresses the command word and every part of the question.'
  ];
  return bank[index%bank.length];
}

function masteryQuestions(entry){
  const existing=unique(entry.deepNotes&&entry.deepNotes.selfCheck);
  if(existing.length)return existing;
  return unique(asArray(entry.keyPoints).slice(0,7).map(point=>{
    const p=clean(point).replace(/[.!?]+$/,'');
    return 'Explain '+p.charAt(0).toLowerCase()+p.slice(1)+', then give one example or application.';
  }));
}

function enrichFullEntry(entry){
  const full=entry&&entry.cambridgeFullNotes;
  if(!full||full._studyaiLongForm)return;
  full._studyaiLongForm=true;
  const keyPoints=unique(entry.keyPoints);
  full.sections=asArray(full.sections).map((section,index)=>{
    const copy={...section};
    const paragraphs=unique(copy.paragraphs);
    const extra=guideParagraph(entry,copy,index);
    if(extra&&!paragraphs.some(p=>p===extra))paragraphs.push(extra);
    copy.paragraphs=paragraphs;
    const linked=keyPoints[index];
    copy.bullets=unique([...(asArray(copy.bullets)),...(linked?[linked]:[])]);
    return copy;
  });

  const titles=new Set(full.sections.map(s=>clean(s.title).toLowerCase()));
  const d=entry.deepNotes||{};
  const add=(title,paragraphs,bullets,formulas)=>{
    if(titles.has(title.toLowerCase()))return;
    const cleanParagraphs=unique(paragraphs);
    const cleanBullets=unique(bullets);
    const cleanFormulas=unique(formulas);
    if(!cleanParagraphs.length&&!cleanBullets.length&&!cleanFormulas.length)return;
    full.sections.push({title,paragraphs:cleanParagraphs,bullets:cleanBullets,formulas:cleanFormulas});
    titles.add(title.toLowerCase());
  };

  add('Specification detail',
      ['Use this section as a coverage check after reading the explanations above. Each point should be something you can explain from first principles, not only recognise when you see it.'],
      keyPoints,[]);
  add('Equations and relationships',
      ['Know what every symbol means, the conditions under which each relationship applies and the units expected in a final answer. Rearranging correctly is part of understanding the relationship.'],
      [],asArray(d.formulas).length?d.formulas:entry.formulas);
  add('Applying the ideas',
      ['Longer exam questions often combine this topic with earlier knowledge. Start by identifying the principle being tested, then connect the given information to that principle before calculating or explaining.'],
      unique([...(asArray(d.reasoning)),...(asArray(entry.method))]),[]);
  add('Important distinctions',
      ['Keep related terms separate. Many lost marks come from using two similar ideas as if they mean the same thing.'],
      unique([...(asArray(d.distinctions)),...(asArray(d.vocabulary))]),[]);
  add('Common exam traps',
      ['Check definitions, units, signs, command words and whether your conclusion is supported by the information given.'],
      unique([...(asArray(d.examTips)),...asArray(entry.mistakes).map(x=>'Avoid: '+clean(x))]),[]);
  add('Mastery check',
      ['You should be able to answer these without looking back at the page. If one is difficult, return to the matching subsection and rebuild the explanation.'],
      masteryQuestions(entry),[]);
}

function enrichClass9Math(){
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;
  if(!bank)return;
  for(const entry of curriculum){
    if(entry.board!=='CBSE'||entry.grade!=='Class 9'||entry.subject!=='Mathematics')continue;
    const full=bank[entry.title];
    // Fully authored topic lessons should not receive generic length-padding sections.
    if(!full||full._studyaiLongForm||full._studyaiTopicFirst)continue;
    full._studyaiLongForm=true;
    const keyPoints=unique(entry.keyPoints);
    full.sections=asArray(full.sections).map((section,index)=>{
      const copy={...section};
      const paragraphs=unique(copy.paragraphs);
      const extra=guideParagraph(entry,copy,index);
      if(extra)paragraphs.push(extra);
      copy.paragraphs=unique(paragraphs);
      copy.bullets=unique([...(asArray(copy.bullets)),...(keyPoints[index]?[keyPoints[index]]:[])]);
      return copy;
    });
    full.sections.push({
      title:'Chapter coverage',
      paragraphs:['Use the checklist below only after studying the worked explanations above. You should be able to derive or justify each point and connect it to a question, diagram, graph or calculation.'],
      bullets:keyPoints
    });
    full.sections.push({
      title:'Exam application',
      paragraphs:['For multi-step problems, write down what is known, choose a representation, show the reasoning and then check the result against the original conditions.'],
      bullets:unique(entry.method)
    });
    full.sections.push({
      title:'Common traps and final checks',
      paragraphs:['Before finishing a solution, check signs, units, scale, restrictions, exact values and whether the final line answers the question that was asked.'],
      bullets:unique(entry.mistakes)
    });
    full.sections.push({
      title:'Mastery check',
      paragraphs:['Try these from memory. A complete answer should include the reasoning, not only the final formula or result.'],
      bullets:masteryQuestions(entry)
    });
  }
}

function enrichDeepEntry(entry){
  if(!entry||entry.cambridgeFullNotes)return;
  let d=entry.deepNotes;
  if(!d||!clean(d.overview)){
    const kp=unique(entry.keyPoints);
    if(!clean(entry.summary)&&!kp.length)return;
    d=entry.deepNotes={
      overview:clean(entry.summary),
      concepts:kp.map((point,index)=>['Core concept '+(index+1),point]),
      formulas:unique(entry.formulas),
      reasoning:unique(entry.method),
      examTips:unique(entry.mistakes),
      quickRevision:kp,
      selfCheck:masteryQuestions(entry),
      practice:[]
    };
  }else{
    d.formulas=unique([...(asArray(d.formulas)),...(asArray(entry.formulas))]);
    d.reasoning=unique([...(asArray(d.reasoning)),...(asArray(entry.method))]);
    d.examTips=unique([...(asArray(d.examTips)),...asArray(entry.mistakes).map(x=>'Avoid: '+clean(x))]);
    if(!asArray(d.selfCheck).length)d.selfCheck=masteryQuestions(entry);
  }
}

function renderList(items){
  const list=unique(items);
  return list.length?'<ul>'+list.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>':'';
}
function renderFormulas(items){
  const formulas=unique(items);
  return formulas.length?'<div class="formula-list actual-note-formulas">'+formulas.map(x=>'<div class="formula">'+escapeHtml(x)+'</div>').join('')+'</div>':'';
}
function renderExamples(items){
  return asArray(items).map(ex=>{
    if(!ex)return '';
    const steps=asArray(ex.steps);
    return '<div class="worked-box"><h4>'+escapeHtml(ex.title||'Worked example')+'</h4>'+
      (ex.question?'<p><strong>Question:</strong> '+escapeHtml(ex.question)+'</p>':'')+
      (steps.length?'<ol>'+steps.map(step=>'<li>'+escapeHtml(step)+'</li>').join('')+'</ol>':'')+
      (ex.answer?'<p><strong>Answer:</strong> '+escapeHtml(ex.answer)+'</p>':'')+
      '</div>';
  }).join('');
}
function renderSection(section){
  return '<section class="note-section actual-note-topic"><h3>'+escapeHtml(section.title||'')+'</h3>'+
    asArray(section.paragraphs).map(p=>'<p>'+escapeHtml(p)+'</p>').join('')+
    (section.figureId?window.StudyAIConceptFigures?.render?.(section.figureId)||'':'')+
    asArray(section.subtopics).map(part=>'<div class="studyai-lesson-subtopic"><h4>'+escapeHtml(part.title||'')+'</h4>'+
      asArray(part.paragraphs).map(p=>'<p>'+escapeHtml(p)+'</p>').join('')+
      renderList(part.bullets)+renderFormulas(part.formulas)+renderExamples(part.examples)+'</div>').join('')+
    renderList(section.bullets)+renderFormulas(section.formulas)+renderExamples(section.examples)+
    (section.exam_warning?'<div class="studyai-mistake-warning" role="note"><h4>Common mistake</h4><p>'+escapeHtml(section.exam_warning)+'</p></div>':'')+
    (section.tip?'<div class="exam-box"><h4>Exam tip</h4><p>'+escapeHtml(section.tip)+'</p></div>':'')+
    '</section>';
}

function contentFirstDeepNotes(entry){
  const d=entry.deepNotes||{};
  const concepts=asArray(d.concepts);
  const conceptSections=concepts.map((item,index)=>{
    const pair=Array.isArray(item)?item:['Concept '+(index+1),item];
    const title=clean(pair[0])||'Concept '+(index+1);
    const body=clean(pair[1]);
    return renderSection({
      title,
      paragraphs:body?[body,guideParagraph(entry,{title},index)]:[guideParagraph(entry,{title},index)]
    });
  }).join('');

  const extra=[];
  const keyPoints=unique(entry.keyPoints);
  if(keyPoints.length)extra.push(renderSection({
    title:'Specification detail',
    paragraphs:['These are the syllabus-level details that the explanations above must allow you to use in unfamiliar questions.'],
    bullets:keyPoints
  }));
  const formulas=unique([...(asArray(d.formulas)),...(asArray(entry.formulas))]);
  if(formulas.length)extra.push(renderSection({
    title:'Equations and relationships',
    paragraphs:['Define every symbol, keep units consistent and check that the relationship applies to the situation before substituting values.'],
    formulas
  }));
  const distinctions=unique(d.distinctions);
  if(distinctions.length)extra.push(renderSection({
    title:'Important distinctions',
    paragraphs:['Learn these differences precisely because exam questions often test whether closely related terms are being used correctly.'],
    bullets:distinctions
  }));
  const vocabulary=unique(d.vocabulary);
  if(vocabulary.length)extra.push(renderSection({
    title:'Vocabulary to know',
    paragraphs:['Use these terms precisely in explanations and text analysis. Knowing the word is not enough, you should be able to apply it to the chapter or passage.'],
    bullets:vocabulary
  }));
  const reasoning=unique([...(asArray(d.reasoning)),...(asArray(entry.method))]);
  if(reasoning.length)extra.push(renderSection({
    title:'Applying the ideas',
    paragraphs:['Use the topic knowledge above as a reasoning chain. Start with the principle, connect it to the information given and then state the consequence.'],
    bullets:reasoning
  }));
  const visuals=unique(d.visuals);
  if(visuals.length)extra.push(renderSection({
    title:'Diagrams, graphs and visual reasoning',
    paragraphs:['Use diagrams as part of the explanation. Labels, direction, scale and relationships should communicate the science or mathematics rather than decorate the page.'],
    bullets:visuals
  }));
  const exam=unique([...(asArray(d.examTips)),...asArray(entry.mistakes).map(x=>'Avoid: '+clean(x))]);
  if(exam.length)extra.push(renderSection({
    title:'Common exam traps',
    paragraphs:['Check these before moving on. They target mistakes that can turn a correct idea into an incomplete or inaccurate answer.'],
    bullets:exam
  }));
  const practice=unique(d.practice);
  if(practice.length)extra.push(renderSection({
    title:'Practice targets',
    paragraphs:['Use these to convert the notes into exam performance. Work without the notes first, then correct the reasoning rather than only the final answer.'],
    bullets:practice
  }));
  const checks=masteryQuestions(entry);
  if(checks.length)extra.push(renderSection({
    title:'Mastery check',
    paragraphs:['Answer these from memory and explain each step. If you cannot, return to the matching subsection rather than memorising the final sentence.'],
    bullets:checks
  }));

  return '<div class="note-prose actual-chapter-notes detailed-exam-notes content-first-long-notes">'+
    '<section class="note-section actual-note-intro"><p class="chapter-lead">'+escapeHtml(d.overview||entry.summary||'')+'</p></section>'+
    conceptSections+extra.join('')+
    '</div>';
}

function contentFirstCambridge(entry){
  const full=entry.cambridgeFullNotes;
  if(full){
    return '<div class="note-prose actual-chapter-notes detailed-exam-notes cambridge-full-notes content-first-long-notes">'+
      '<section class="note-section actual-note-intro"><p class="chapter-lead">'+escapeHtml(full.lead||entry.summary||'')+'</p></section>'+
      asArray(full.sections).map(renderSection).join('')+
      '</div>';
  }
  return contentFirstDeepNotes(entry);
}

function contentFirstClass9Math(entry){
  const full=window.CBSE_CLASS9_MATH_FULL_NOTES&&window.CBSE_CLASS9_MATH_FULL_NOTES[entry.title];
  if(full){
    return '<div class="note-prose actual-chapter-notes detailed-exam-notes content-first-long-notes">'+
      '<section class="note-section actual-note-intro"><p class="chapter-lead">'+escapeHtml(full.lead||entry.summary||'')+'</p></section>'+
      asArray(full.sections).map(renderSection).join('')+
      '</div>';
  }
  return contentFirstDeepNotes(entry);
}

for(const entry of curriculum)enrichDeepEntry(entry);
for(const entry of curriculum)enrichFullEntry(entry);
enrichClass9Math();

try{
  if(typeof richDeepSections==='function')richDeepSections=contentFirstDeepNotes;
  if(typeof cambridgeFullNotes==='function')cambridgeFullNotes=contentFirstCambridge;
  if(typeof class9CbseMathNotes==='function')class9CbseMathNotes=contentFirstClass9Math;
}catch(error){
  console.warn('StudyAI long-form renderer override skipped',error);
}

window.STUDYAI_LONG_NOTES_STATUS={
  entries:curriculum.length,
  cambridgeFull:curriculum.filter(e=>e.cambridgeFullNotes).length,
  deep:curriculum.filter(e=>e.deepNotes&&e.deepNotes.overview).length,
  minimumSections:curriculum.reduce((min,e)=>{
    const count=e.cambridgeFullNotes?asArray(e.cambridgeFullNotes.sections).length:asArray(e.deepNotes&&e.deepNotes.concepts).length;
    return Math.min(min,count||0);
  },Infinity)
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
