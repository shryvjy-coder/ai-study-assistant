/* StudyAI original Kaveri Unit 1 reader. Preserves all other curricula, IDs,
 * saved user data, original notes and the existing maths/science reading engine.
 * English teaching explanations and practice are authored, never copied verbatim.
 */
(()=>{
'use strict';
if(typeof deepSections!=='function'||typeof renderReaderContent!=='function')return;
const priorDeep=deepSections;
const priorRender=renderReaderContent;
const esc=value=>String(value??'').replace(/&/g,'&amp;')
 .replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
 .replace(/'/g,'&#39;');
const list=value=>Array.isArray(value)?value:[];
const eligible=entry=>entry?.board==='CBSE'&&entry?.grade==='Class 9'&&
 entry?.subject==='English'&&!!window.CBSE_CLASS9_ENGLISH_FULL_NOTES?.[entry.title];
const examples=rows=>list(rows).map(ex=>
 '<div class="worked-box studyai-english-worked"><h4>'+esc(ex.title||'Worked example')+'</h4>'+
 (ex.question?'<p><strong>Question:</strong> '+esc(ex.question)+'</p>':'')+
 (list(ex.steps).length?'<ol>'+ex.steps.map(step=>'<li>'+esc(step)+'</li>').join('')+'</ol>':'')+
 (ex.answer?'<p><strong>Model answer:</strong> '+esc(ex.answer)+'</p>':'')+
 '</div>').join('');
function note(entry){
 const full=window.CBSE_CLASS9_ENGLISH_FULL_NOTES[entry.title];
 return '<div class="note-prose actual-chapter-notes detailed-exam-notes content-first-long-notes studyai-english-full-notes">'+
 '<section class="note-section actual-note-intro"><p class="chapter-lead">'+esc(full.lead||entry.summary||'')+'</p>'+
 '<p class="muted"><strong>Textbook:</strong> NCERT Kaveri (2026–27), <a href="'+
 esc(full.sourceUrl||'https://ncert.nic.in/textbook/pdf/iebe101.pdf')+
 '" target="_blank" rel="noopener noreferrer">'+esc(full.sourcePdf||'')+'</a>'+
 ', printed pp. '+esc(full.printedPages||'')+'.</p>'+
 '<p class="muted">Original StudyAI explanations and practice. Independent teacher editorial review pending.</p></section>'+
 list(full.sections).map(section=>
 '<section class="note-section actual-note-topic">'+
 '<h3>'+esc(section.title)+'</h3>'+
 list(section.paragraphs).map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('')+
 list(section.subtopics).map(part=>
 '<div class="studyai-lesson-subtopic"><h4>'+esc(part.title)+'</h4>'+
 list(part.paragraphs).map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('')+
 examples(part.examples)+'</div>').join('')+
 examples(section.examples)+
 (section.tip?'<div class="exam-box"><h4>Exam tip</h4><p>'+esc(section.tip)+'</p></div>':'')+
 '</section>').join('')+'</div>';
}
deepSections=function(entry){
 return eligible(entry)?note(entry):priorDeep.apply(this,arguments);
};
renderReaderContent=function(entry){
 const result=priorRender.apply(this,arguments);
 if(!eligible(entry))return result;
 const full=window.CBSE_CLASS9_ENGLISH_FULL_NOTES[entry.title];
 const root=document.querySelector('#detailed-notes .studyai-english-full-notes');
 if(!root)return result;
 const sections=[...root.querySelectorAll(':scope > .actual-note-topic')];
 sections.forEach((element,index)=>{
  const row=full.sections[index];
  if(!row||element.querySelector('.studyai-english-checks'))return;
  const checks=list(row.checkQuestions).filter(q=>q?.question&&q?.answer);
  if(!checks.length)return;
  const box=document.createElement('section');
  box.className='studyai-english-checks';
  box.setAttribute('aria-label','Practice questions for '+row.title);
  const head=document.createElement('h4');head.textContent='Test yourself';box.append(head);
  for(const item of checks){
   const wrapper=document.createElement('div');
   wrapper.className='studyai-english-question';
   const text=document.createElement('p');text.textContent=item.question;
   const details=document.createElement('details');
   const summary=document.createElement('summary');summary.textContent='Check answer';
   const answer=document.createElement('p');answer.textContent=item.answer;
   details.append(summary,answer);wrapper.append(text,details);box.append(wrapper);
  }
  const tip=element.querySelector(':scope > .exam-box');
  element.insertBefore(box,tip);
 });
 return result;
};
})();
