/* StudyAI | Ganita Manjari Class 9 | 2026–27 complete-chapter pedagogy
 * Original, concept-first text written for StudyAI.
 * The 2026–27 NCERT textbook chapter sequence has 14 chapters across Parts I/II.
 * This layer enhances existing verified section objects while retaining
 * their original formulae, examples, examination warnings and figures.
 */
(() => {
'use strict';
const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
const registry=window.STUDYAI_CLASS9_DEPTH_AUDIT=window.STUDYAI_CLASS9_DEPTH_AUDIT||{};
const original=window.StudyAIClass9Depth;
if(original)return;
const normal=s=>String(s||'').replace(/[\u2018\u2019]/g,"'").trim().toLowerCase();
const safe=a=>Array.isArray(a)?a:[];
function example(title,question,steps,answer){
  return {title,question,steps,answer};
}
function subsection(title,paragraphs,formulas=[],examples=[],bullets=[],tip='',exam_warning=''){
  return {title,paragraphs:safe(paragraphs),formulas:safe(formulas),
    examples:safe(examples),bullets:safe(bullets),
    ...(tip?{tip}:{}),...(exam_warning?{exam_warning}:{})};
}
function apply(chapterTitle,records,options={}){
  const chapter=bank[chapterTitle];
  if(!chapter)throw Error('StudyAI Class 9 depth patch: missing '+chapterTitle);
  if(chapter._studyaiCompleteDepth)return;
  const mapped=new Set();
  for(const [title,units] of records){
    const section=safe(chapter.sections).find(s=>normal(s.title)===normal(title));
    if(!section)throw Error('StudyAI depth patch: missing section '+title+' in '+chapterTitle);
    if(!Array.isArray(units)||units.length<2)
      throw Error('StudyAI depth patch: section needs at least two learning subtopics '+title);
    if(mapped.has(normal(title)))throw Error('Duplicate section '+title);
    mapped.add(normal(title));
    section.subtopics=units.map(unit=>subsection(...unit));
    // The rewritten teaching paragraphs replace short summary-only previews.
    // Original formula boxes, section worked examples, warnings and figures
    // remain available below their detailed explanations.
    section.paragraphs=[];
  }
  if(options.lead)chapter.lead=options.lead;
  if(options.mixed){
    chapter.sections.push({
      title:'Mixed exam applications and fully worked solutions',
      paragraphs:['Exam solutions require a mathematical argument, not merely a final number. Identify what is given, choose a valid representation, justify each formula or theorem, and verify the outcome against the original question.'],
      examples:options.mixed.map(x=>example(...x))
    });
  }
  if(options.extension){
    chapter.sections.push({title:'Optional Enrichment: '+options.extension.title,
      extension:true,paragraphs:[options.extension.explanation],
      subtopics:options.extension.units?.map(unit=>subsection(...unit))||[]});
  }
  chapter._studyaiCompleteDepth=true;
  const sections=chapter.sections||[];
  const subtopics=sections.flatMap(s=>safe(s.subtopics));
  const examples=sections.reduce((n,s)=>n+safe(s.examples).length,0)+
    subtopics.reduce((n,s)=>n+safe(s.examples).length,0);
  const paragraphs=sections.reduce((n,s)=>n+safe(s.paragraphs).length,0)+
    subtopics.reduce((n,s)=>n+safe(s.paragraphs).length,0);
  const words=[chapter.lead,...sections.flatMap(s=>[...safe(s.paragraphs),
    ...safe(s.subtopics).flatMap(u=>[...safe(u.paragraphs),...safe(u.formulas),...safe(u.bullets)])])].join(' ').trim().split(/\s+/).length;
  registry[chapterTitle]={sections:sections.length,subtopics:subtopics.length,examples,paragraphs,words,
    revisedSections:mapped.size};
  return registry[chapterTitle];
}
window.StudyAIClass9Depth={apply,example,subsection};
})();