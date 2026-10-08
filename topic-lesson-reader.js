/* StudyAI dedicated topic pages inside Class 9 Mathematics chapters.
 * The chapter and active curriculum route stay unchanged while the student studies.
 */
(() => {
  'use strict';
  if(typeof renderReaderContent!=='function')return;
  const oldRender=renderReaderContent;
  let openChapterId=null;
  let currentLesson=0;
  const genericTitles=new Set(['Chapter coverage','Exam application','Common traps and final checks','Mastery check']);
  const escapeText=text=>String(text||'').trim();

  renderReaderContent=function(entry){
    const result=oldRender.apply(this,arguments);
    const notes=document.getElementById('detailed-notes');
    if(!notes)return result;
    notes.querySelector('.studyai-lesson-reader')?.remove();
    notes.querySelector('.studyai-topic-pagination')?.remove();
    if(!entry || entry.board!=='CBSE' || entry.grade!=='Class 9' || entry.subject!=='Mathematics'){
      openChapterId=null;
      currentLesson=0;
      return result;
    }
    const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
    if(!bank[entry.title])return result;
    const allSections=[...notes.querySelectorAll('.note-section.actual-note-topic')];
    const lessons=allSections.filter(section=>!genericTitles.has(escapeText(section.querySelector('h3')?.textContent)));
    if(!lessons.length)return result;

    if(openChapterId!==entry.id){
      openChapterId=entry.id;
      currentLesson=0;
    }
    currentLesson=Math.min(currentLesson,lessons.length-1);

    const nav=document.createElement('nav');
    nav.className='studyai-lesson-reader';
    nav.setAttribute('aria-label','Topics in this chapter');

    const label=document.createElement('div');
    label.className='studyai-lesson-label';
    const kicker=document.createElement('span');
    kicker.className='small-label';
    kicker.textContent='Chapter topic';
    const total=document.createElement('span');
    total.className='studyai-lesson-total';
    label.append(kicker,total);

    const topicSelect=document.createElement('select');
    topicSelect.className='studyai-topic-select';
    topicSelect.setAttribute('aria-label','Choose a topic in this chapter');
    lessons.forEach((section,index)=>{
      const opt=document.createElement('option');
      opt.value=String(index);
      opt.textContent=(index+1)+'. '+escapeText(section.querySelector('h3')?.textContent);
      topicSelect.append(opt);
    });
    const actions=document.createElement('div');
    actions.className='studyai-lesson-controls';

    const previous=document.createElement('button');
    previous.className='button secondary studyai-prev-topic';
    previous.type='button';
    previous.textContent='← Previous topic';

    const next=document.createElement('button');
    next.className='button primary studyai-next-topic';
    next.type='button';
    next.textContent='Next topic →';
    actions.append(previous,next);
    nav.append(label,topicSelect,actions);

    const bottom=document.createElement('nav');
    bottom.className='studyai-topic-pagination';
    bottom.setAttribute('aria-label','Topic page navigation');
    const bottomPrevious=previous.cloneNode(true);
    const bottomNext=next.cloneNode(true);
    const progress=document.createElement('span');
    progress.className='studyai-topic-progress';
    bottom.append(bottomPrevious,progress,bottomNext);
    const prose=notes.querySelector('.note-prose');
    if(!prose)return result;
    notes.insertBefore(nav,prose);
    notes.append(bottom);

    const go=(index,shouldScroll)=>{
      const n=Math.max(0,Math.min(lessons.length-1,index));
      currentLesson=n;
      allSections.forEach(section=>{
        section.hidden=true;
        section.classList.remove('studyai-current-topic');
      });
      const active=lessons[n];
      active.hidden=false;
      active.classList.add('studyai-current-topic');
      topicSelect.value=String(n);
      const indicator='Topic '+(n+1)+' of '+lessons.length;
      total.textContent=indicator;
      progress.textContent=indicator;
      previous.disabled=n===0;
      bottomPrevious.disabled=n===0;
      next.disabled=n===lessons.length-1;
      bottomNext.disabled=n===lessons.length-1;
      if(shouldScroll){
        const title=active.querySelector('h3');
        if(title){
          title.setAttribute('tabindex','-1');
          title.focus({preventScroll:true});
        }
        nav.scrollIntoView({behavior:'auto',block:'start'});
      }
    };
    topicSelect.addEventListener('change',()=>go(Number(topicSelect.value),true));
    previous.addEventListener('click',()=>go(currentLesson-1,true));
    next.addEventListener('click',()=>go(currentLesson+1,true));
    bottomPrevious.addEventListener('click',()=>go(currentLesson-1,true));
    bottomNext.addEventListener('click',()=>go(currentLesson+1,true));
    go(currentLesson,false);
    return result;
  };
})();