/* StudyAI Class 9 CBSE Mathematics: chapter > substantial lesson pages.
 * A lesson holds its concept headings, proofs, formulae, worked problems and
 * original diagrams together. No individual paragraph becomes a new page.
 */
(() => {
  'use strict';
  if (typeof renderReaderContent !== 'function') return;
  const baseRender=renderReaderContent;
  const genericTitles=new Set([
    'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]);
  const remembered=new Map();
  let activeEntry=null;
  const textOf=el=>String(el?.textContent||'').trim();

  const makeButton=(className,label,style='secondary')=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='button '+style+' '+className;
    b.textContent=label;
    return b;
  };

  function mountLessonReader(entry,notes){
    const all=[...notes.querySelectorAll('.note-section.actual-note-topic')];
    const sections=all.filter(section=>
      !genericTitles.has(textOf(section.querySelector(':scope > h3'))));
    if(!sections.length) return;

    notes.classList.add('studyai-compact-chapter');
    const nav=document.createElement('nav');
    nav.className='studyai-lesson-reader studyai-compact-reader';
    nav.setAttribute('aria-label','Lessons in '+entry.title);
    const group=document.createElement('div');
    group.className='studyai-lesson-group';
    const label=document.createElement('label');
    label.className='studyai-lesson-label';
    const kicker=document.createElement('span');
    kicker.className='small-label';
    kicker.textContent='Choose a lesson';
    const count=document.createElement('strong');
    count.className='studyai-lesson-total';
    const select=document.createElement('select');
    select.className='studyai-topic-select';
    select.setAttribute('aria-label','Choose a lesson in '+entry.title);
    sections.forEach((section,index)=>{
      const option=document.createElement('option');
      option.value=String(index);
      option.textContent=(index+1)+'. '+textOf(section.querySelector(':scope > h3'));
      select.append(option);
    });
    label.append(kicker,count,select);
    const controls=document.createElement('div');
    controls.className='studyai-lesson-controls';
    const prev=makeButton('studyai-prev-topic','← Previous lesson');
    const next=makeButton('studyai-next-topic','Next lesson →','primary');
    controls.append(prev,next);
    group.append(label,controls);
    nav.append(group);

    const footer=document.createElement('nav');
    footer.className='studyai-topic-pagination';
    footer.setAttribute('aria-label','Lesson page navigation');
    const footerPrev=makeButton('studyai-prev-page','← Previous lesson');
    const progress=document.createElement('span');
    progress.className='studyai-topic-progress';
    progress.setAttribute('aria-live','polite');
    const footerNext=makeButton('studyai-next-page','Next lesson →','primary');
    footer.append(footerPrev,progress,footerNext);

    const prose=notes.querySelector('.note-prose');
    if(!prose)return;
    notes.insertBefore(nav,prose);
    notes.append(footer);

    const show=(value,scroll)=>{
      const n=Math.max(0,Math.min(sections.length-1,Number(value)||0));
      remembered.set(entry.id,n);
      all.forEach(section=>{
        section.hidden=true;
        section.classList.remove('studyai-current-topic');
      });
      const section=sections[n];
      section.hidden=false;
      section.classList.add('studyai-current-topic');
      section.querySelectorAll('.studyai-lesson-subtopic').forEach(part=>{
        part.hidden=false;
        part.classList.remove('studyai-current-subtopic');
      });
      select.value=String(n);
      count.textContent='Lesson '+(n+1)+' of '+sections.length;
      progress.textContent=count.textContent;
      prev.disabled=footerPrev.disabled=n===0;
      next.disabled=footerNext.disabled=n===sections.length-1;
      window.dispatchEvent(new CustomEvent('studyai:lesson-changed',{
        detail:{entryId:entry.id,index:n,title:textOf(section.querySelector(':scope > h3'))}
      }));
      if(scroll){
        const heading=section.querySelector('h3');
        if(heading){
          heading.tabIndex=-1;
          heading.focus({preventScroll:true});
        }
        const destination=notes.closest('.reader')||nav;
        destination.scrollIntoView({block:'start',behavior:'auto'});
      }
    };
    select.addEventListener('change',()=>show(select.value,true));
    prev.addEventListener('click',()=>show(Number(select.value)-1,true));
    next.addEventListener('click',()=>show(Number(select.value)+1,true));
    footerPrev.addEventListener('click',()=>show(Number(select.value)-1,true));
    footerNext.addEventListener('click',()=>show(Number(select.value)+1,true));
    activeEntry=entry.id;
    show(remembered.get(entry.id)||0,false);
  }

  renderReaderContent=function(entry){
    const result=baseRender.apply(this,arguments);
    const notes=document.getElementById('detailed-notes');
    if(!notes)return result;
    notes.querySelector('.studyai-compact-reader')?.remove();
    notes.querySelector('.studyai-topic-pagination')?.remove();
    notes.classList.remove('studyai-compact-chapter');
    const enabled=entry?.board==='CBSE'&&entry?.grade==='Class 9'&&
      entry?.subject==='Mathematics'&&
      !!window.CBSE_CLASS9_MATH_FULL_NOTES?.[entry.title];
    if(!enabled){
      activeEntry=null;
      return result;
    }
    mountLessonReader(entry,notes);
    return result;
  };
  window.StudyAILessonReader={
    goTo(index){
      const select=document.querySelector('#detailed-notes .studyai-topic-select');
      if(!select)return false;
      const i=Number(index);
      if(!Number.isInteger(i)||i<0||i>=select.options.length)return false;
      select.value=String(i);
      select.dispatchEvent(new Event('change',{bubbles:true}));
      return true;
    },
    activeIndex(){
      const select=document.querySelector('#detailed-notes .studyai-topic-select');
      return select?Number(select.value):0;
    },
    currentEntryId(){return activeEntry;}
  };
})();
