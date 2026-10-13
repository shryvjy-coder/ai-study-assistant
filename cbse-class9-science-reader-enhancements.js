/* NCERT Exploration (2026-27), Grade 9 Science, Chapter 1.
 * Lightweight, authored diagrams and optional self-check answers.
 * Supplements the existing full-note reader; does not alter chapter IDs,
 * persisted completion, navigation, or any other subject.
 */
(() => {
  'use strict';
  if (typeof renderReaderContent !== 'function') return;
  const previousRender=renderReaderContent;
  const namespace='http://www.w3.org/2000/svg';

  // All markup below is authored, fixed HTML; student/source text is inserted
  // with textContent, never injected as untrusted HTML.
  const figures={
    'model-cycle': `<figure class="studyai-concept-figure science-ch01-figure" data-science-visual="model-cycle">
      <svg viewBox="0 0 380 412" role="img" aria-labelledby="science-model-title science-model-desc" xmlns="${namespace}">
        <title id="science-model-title">Evidence-driven modelling cycle</title>
        <desc id="science-model-desc">Ask a focused question, choose a model with assumptions, make a testable prediction, compare with observations, and revise the model if needed.</desc>
        <g font-family="system-ui, sans-serif" text-anchor="middle" font-size="16" font-weight="600">
          <rect x="38" y="14" width="304" height="57" rx="13" fill="#e3f1ed" stroke="#397c6b"/>
          <text x="190" y="49" fill="#164e44">1. Ask a focused question</text>
          <rect x="38" y="107" width="304" height="57" rx="13" fill="#e3f1ed" stroke="#397c6b"/>
          <text x="190" y="141" fill="#164e44">2. Choose a useful model</text>
          <rect x="38" y="200" width="304" height="57" rx="13" fill="#e3f1ed" stroke="#397c6b"/>
          <text x="190" y="234" fill="#164e44">3. Make a prediction</text>
          <rect x="38" y="293" width="304" height="57" rx="13" fill="#e6ebf8" stroke="#657cac"/>
          <text x="190" y="327" fill="#263f73">4. Compare with evidence</text>
        </g>
        <g fill="none" stroke="#397c6b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
          <path d="M190 72V97m-6-7 6 7 6-7"/>
          <path d="M190 165V190m-6-7 6 7 6-7"/>
          <path d="M190 258V283m-6-7 6 7 6-7"/>
          <path d="M38 322H17V136H29m-7-6 7 6-7 6" stroke="#a56836" stroke-dasharray="5 5"/>
        </g>
        <text x="190" y="382" fill="currentColor" font-size="13" text-anchor="middle">If evidence disagrees, revise assumptions.</text>
      </svg>
      <figcaption>Scientific models are tested against observations and improved when needed. The return arrow represents revising the assumptions, not simply repeating a prediction.</figcaption>
    </figure>`,
    'mask-map': `<figure class="studyai-concept-figure science-ch01-figure" data-science-visual="mask-map">
      <svg viewBox="0 0 380 335" role="img" aria-labelledby="science-mask-title science-mask-desc" xmlns="${namespace}">
        <title id="science-mask-title">How several sciences contribute to mask design</title>
        <desc id="science-mask-desc">Mask filtration draws on physics for airflow and particle motion, chemistry and materials science for fibre properties, biology for microorganisms, and mathematics for quantifying filtration performance.</desc>
        <rect x="27" y="12" width="326" height="53" rx="12" fill="#d5e9e1" stroke="#367c67"/>
        <text x="190" y="34" fill="#164e44" font-family="system-ui, sans-serif" font-weight="700" font-size="16" text-anchor="middle">How does a mask filter air?</text>
        <text x="190" y="51" fill="#164e44" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">One problem, several kinds of evidence</text>
        <g fill="none" stroke="#68998b" stroke-width="2" stroke-linecap="round">
          <path d="M190 65V85H91V99m99-14h99v14M190 85V188H91V201m99-13h99v13"/>
        </g>
        <g font-family="system-ui, sans-serif">
          <rect x="8" y="100" width="174" height="75" rx="10" fill="#edf6f3" stroke="#74a394"/>
          <text x="95" y="127" text-anchor="middle" font-size="15" font-weight="700" fill="#164e44">Physics</text>
          <text x="95" y="147" text-anchor="middle" font-size="12" fill="#164e44">Airflow and particle motion</text>
          <rect x="198" y="100" width="174" height="75" rx="10" fill="#edf6f3" stroke="#74a394"/>
          <text x="285" y="126" text-anchor="middle" font-size="15" font-weight="700" fill="#164e44">Chemistry</text>
          <text x="285" y="145" text-anchor="middle" font-size="12" fill="#164e44">Fibre materials</text>
          <text x="285" y="160" text-anchor="middle" font-size="12" fill="#164e44">and electrical attraction</text>
          <rect x="8" y="203" width="174" height="75" rx="10" fill="#edf6f3" stroke="#74a394"/>
          <text x="95" y="229" text-anchor="middle" font-size="15" font-weight="700" fill="#164e44">Biology</text>
          <text x="95" y="248" text-anchor="middle" font-size="12" fill="#164e44">Microorganisms</text>
          <text x="95" y="263" text-anchor="middle" font-size="12" fill="#164e44">and their characteristics</text>
          <rect x="198" y="203" width="174" height="75" rx="10" fill="#edf6f3" stroke="#74a394"/>
          <text x="285" y="229" text-anchor="middle" font-size="15" font-weight="700" fill="#164e44">Mathematics</text>
          <text x="285" y="248" text-anchor="middle" font-size="12" fill="#164e44">Measured filtration</text>
          <text x="285" y="263" text-anchor="middle" font-size="12" fill="#164e44">and airflow performance</text>
        </g>
        <text x="190" y="311" fill="currentColor" font-size="13" text-anchor="middle">Each discipline answers part of the question.</text>
      </svg>
      <figcaption>Interdisciplinary science links multiple methods to the same problem. Mask performance depends on the combined system, not only one branch of science.</figcaption>
    </figure>`
  };

  function enhanceChapter(entry) {
    if(entry?.board!=='CBSE'||entry?.grade!=='Class 9'||
       entry?.subject!=='Science'||
       entry?.title!=='Exploration: Entering the World of Secondary Science') return;
    const chapter=window.CBSE_CLASS9_SCIENCE_FULL_NOTES?.[entry.title];
    const notes=document.querySelector('#detailed-notes .science-full-notes');
    if(!chapter||!notes)return;
    const sections=[...notes.querySelectorAll(':scope > .actual-note-topic')];
    for(let i=0;i<sections.length;i++){
      const section=sections[i],data=chapter.sections?.[i];
      if(!data)return;
      if(data.visual&&figures[data.visual]&&!section.querySelector('.science-ch01-figure')){
        const diagram=document.createElement('div');
        diagram.innerHTML=figures[data.visual];
        const figure=diagram.firstElementChild;
        const before=section.querySelector(':scope > .worked-box, :scope > .exam-box');
        section.insertBefore(figure,before);
      }
      if(!Array.isArray(data.checkQuestions)||!data.checkQuestions.length)continue;
      const practice=document.createElement('section');
      practice.className='science-ch01-self-check';
      practice.setAttribute('aria-label','Try it yourself');
      const heading=document.createElement('h4');
      heading.textContent='Try it yourself';
      practice.append(heading);
      data.checkQuestions.forEach(({question,answer})=>{
        if(!question||!answer)return;
        const item=document.createElement('div');
        item.className='science-ch01-question';
        const questionNode=document.createElement('p');
        questionNode.className='science-ch01-question-text';
        questionNode.textContent=question;
        const details=document.createElement('details');
        const summary=document.createElement('summary');
        summary.textContent='Check your answer';
        const answerNode=document.createElement('p');
        answerNode.textContent=answer;
        details.append(summary,answerNode);
        item.append(questionNode,details);
        practice.append(item);
      });
      const tip=section.querySelector(':scope > .exam-box');
      section.insertBefore(practice,tip);
    }
  }

  renderReaderContent=function(entry){
    const result=previousRender.apply(this,arguments);
    enhanceChapter(entry);
    return result;
  };
})();