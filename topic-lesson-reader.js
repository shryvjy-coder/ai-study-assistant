/* StudyAI: Class 9 CBSE Mathematics chapter > topic > subtopic reader.
 * Only one topic and one lesson subsection display at once.
 * The complete original pedagogical content remains in the DOM, including
 * per-subtopic examples/formulas and end-of-topic exercise material.
 */
(() => {
  'use strict';
  if(typeof renderReaderContent!=='function')return;
  const oldRender=renderReaderContent;
  const genericTitles=new Set([
    'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]);
  let activeChapterId=null;
  let selectedTopic=0;
  let selectedSubtopic=0;
  const titleOf=element=>String(element?.textContent||'').trim();

  const createButton=(className,text,kind='secondary')=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='button '+kind+' '+className;
    button.textContent=text;
    return button;
  };

  const createSelect=(className,ariaLabel,items)=>{
    const select=document.createElement('select');
    select.className=className;
    select.setAttribute('aria-label',ariaLabel);
    items.forEach((label,index)=>{
      const option=document.createElement('option');
      option.value=String(index);
      option.textContent=(index+1)+'. '+label;
      select.append(option);
    });
    return select;
  };

  function makeNavigation(){
    const nav=document.createElement('nav');
    nav.className='studyai-lesson-reader';
    nav.setAttribute('aria-label','Topics and subtopics in this chapter');

    const topicGroup=document.createElement('div');
    topicGroup.className='studyai-lesson-group';
    const topicLabel=document.createElement('label');
    topicLabel.className='studyai-lesson-label';
    const topicKicker=document.createElement('span');
    topicKicker.className='small-label';
    topicKicker.textContent='Chapter topic';
    const topicCount=document.createElement('span');
    topicCount.className='studyai-lesson-total';
    topicLabel.append(topicKicker,topicCount);
    const topicControls=document.createElement('div');
    topicControls.className='studyai-lesson-controls';
    const prevTopic=createButton('studyai-prev-topic','← Previous topic');
    const nextTopic=createButton('studyai-next-topic','Next topic →','primary');
    topicControls.append(prevTopic,nextTopic);
    topicGroup.append(topicLabel,topicControls);

    const subtopicGroup=document.createElement('div');
    subtopicGroup.className='studyai-subtopic-nav';
    const subLabel=document.createElement('label');
    subLabel.className='studyai-lesson-label';
    const subKicker=document.createElement('span');
    subKicker.className='small-label';
    subKicker.textContent='Subtopic';
    const subCount=document.createElement('span');
    subCount.className='studyai-lesson-total studyai-subtopic-total';
    subLabel.append(subKicker,subCount);
    const subControls=document.createElement('div');
    subControls.className='studyai-lesson-controls';
    const prevSub=createButton('studyai-prev-subtopic','← Previous subtopic');
    const nextSub=createButton('studyai-next-subtopic','Next subtopic →','primary');
    subControls.append(prevSub,nextSub);
    subtopicGroup.append(subLabel,subControls);
    nav.append(topicGroup,subtopicGroup);

    const footer=document.createElement('nav');
    footer.className='studyai-topic-pagination';
    footer.setAttribute('aria-label','Lesson page navigation');
    const footPrev=createButton('studyai-prev-page','← Previous page');
    const progress=document.createElement('span');
    progress.className='studyai-topic-progress';
    progress.setAttribute('aria-live','polite');
    const footNext=createButton('studyai-next-page','Next page →','primary');
    footer.append(footPrev,progress,footNext);
    return {
      nav,topicGroup,subtopicGroup,topicLabel,subLabel,
      topicCount,subCount,prevTopic,nextTopic,prevSub,nextSub,
      footer,footPrev,footNext,progress
    };
  }

  /* Keep a page for the topic-level worked examples and exam warnings instead
   * of leaving them visible under every single subtopic or discarding them. */
  function prepareSubtopicPages(section){
    const pages=[...section.children].filter(el=>el.classList.contains('studyai-lesson-subtopic'));
    if(!pages.length)return [];

    const figure=[...section.children].find(el=>el.classList.contains('studyai-concept-figure'));
    if(figure){
      // A figure needs to be visible alongside its relevant subtopic, not on a
      // separate introductory wall of content.
      const id=titleOf(figure.querySelector('svg title')).toLowerCase();
      const preferred=pages.find(page=>{
        const heading=titleOf(page.querySelector('h4')).toLowerCase();
        if(id.includes('compass')&&id.includes('√3'))return heading.includes('√3')&&heading.includes('compass');
        if(id.includes('magnification'))return heading.includes('zoom 1');
        if(id.includes('sqrt')||id.includes('√2'))return heading.includes('square')||heading.includes('ordinary')||heading.includes('exact geometry');
        return false;
      })||pages[0];
      preferred.insertBefore(figure,preferred.querySelector('h4')?.nextSibling||preferred.firstChild);
    }

    // A full-topic review is a distinct page. Preserve the authored worked
    // examples, formulas, common-mistake notices and any remaining recap text.
    const trailing=[...section.children].filter(el=>
      el!==section.querySelector(':scope > h3') &&
      !el.classList.contains('studyai-lesson-subtopic'));
    if(trailing.length){
      const review=document.createElement('div');
      review.className='studyai-lesson-subtopic studyai-topic-review';
      review.dataset.studyaiReview='true';
      const heading=document.createElement('h4');
      heading.textContent='Practice, formulas and exam checks';
      review.append(heading);
      trailing.forEach(node=>review.append(node));
      section.append(review);
      pages.push(review);
    }

    return pages;
  }

  /*
   * The World of Numbers has a rich hierarchy of roughly 60 teaching
   * subsections. They are headings INSIDE the 15 substantial topic pages, not
   * 60+ separate clicks. Keep all authored content, figures and worked problems
   * intact; paginate only the chapter's top-level topics.
   */
  function renderCompactWorldOfNumbers(notes,allSections,topics){
    notes.classList.add('studyai-compact-chapter');
    const nav=document.createElement('nav');
    nav.className='studyai-lesson-reader studyai-compact-reader';
    nav.setAttribute('aria-label','Lessons in The World of Numbers');

    const group=document.createElement('div');
    group.className='studyai-lesson-group';
    const label=document.createElement('label');
    label.className='studyai-lesson-label';
    const kicker=document.createElement('span');
    kicker.className='small-label';
    kicker.textContent='Choose a lesson';
    const count=document.createElement('span');
    count.className='studyai-lesson-total';
    const select=createSelect('studyai-topic-select',
      'Choose a lesson in The World of Numbers',
      topics.map(el=>titleOf(el.querySelector('h3'))));
    label.append(kicker,count,select);

    const controls=document.createElement('div');
    controls.className='studyai-lesson-controls';
    const previous=createButton('studyai-prev-topic','← Previous lesson');
    const next=createButton('studyai-next-topic','Next lesson →','primary');
    controls.append(previous,next);
    group.append(label,controls);
    nav.append(group);

    const bottom=document.createElement('nav');
    bottom.className='studyai-topic-pagination';
    bottom.setAttribute('aria-label','Lesson page navigation');
    const bottomPrevious=createButton('studyai-prev-page','← Previous lesson');
    const progress=document.createElement('span');
    progress.className='studyai-topic-progress';
    progress.setAttribute('aria-live','polite');
    const bottomNext=createButton('studyai-next-page','Next lesson →','primary');
    bottom.append(bottomPrevious,progress,bottomNext);

    const prose=notes.querySelector('.note-prose');
    if(!prose)return;
    notes.insertBefore(nav,prose);
    notes.append(bottom);
    const show=(index,focus)=>{
      const n=Math.max(0,Math.min(topics.length-1,Number(index)||0));
      selectedTopic=n;
      selectedSubtopic=0;
      allSections.forEach(section=>{
        section.hidden=true;
        section.classList.remove('studyai-current-topic');
      });
      const active=topics[n];
      active.hidden=false;
      active.classList.add('studyai-current-topic');
      // Nested pedagogical subtopics remain visible headings, not extra pages.
      active.querySelectorAll('.studyai-lesson-subtopic').forEach(part=>{
        part.hidden=false;
        part.classList.remove('studyai-current-subtopic');
      });
      select.value=String(n);
      count.textContent='Lesson '+(n+1)+' of '+topics.length;
      progress.textContent='Lesson '+(n+1)+' of '+topics.length;
      previous.disabled=bottomPrevious.disabled=n===0;
      next.disabled=bottomNext.disabled=n===topics.length-1;
      if(focus){
        const heading=active.querySelector('h3');
        if(heading){
          heading.setAttribute('tabindex','-1');
          heading.focus({preventScroll:true});
        }
        nav.scrollIntoView({behavior:'auto',block:'start'});
      }
    };
    select.addEventListener('change',()=>show(Number(select.value),true));
    previous.addEventListener('click',()=>show(selectedTopic-1,true));
    next.addEventListener('click',()=>show(selectedTopic+1,true));
    bottomPrevious.addEventListener('click',()=>show(selectedTopic-1,true));
    bottomNext.addEventListener('click',()=>show(selectedTopic+1,true));
    show(selectedTopic,false);
  }

  renderReaderContent=function(entry){
    const result=oldRender.apply(this,arguments);
    const notes=document.getElementById('detailed-notes');
    if(!notes)return result;

    // Each fresh render comes from the unmodified notes bank.
    notes.querySelector('.studyai-lesson-reader')?.remove();
    notes.querySelector('.studyai-topic-pagination')?.remove();

    if(!entry || entry.board!=='CBSE' || entry.grade!=='Class 9' ||
       entry.subject!=='Mathematics'){
      activeChapterId=null;
      selectedTopic=0;
      selectedSubtopic=0;
      return result;
    }
    const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
    if(!bank[entry.title])return result;
    const allSections=[...notes.querySelectorAll('.note-section.actual-note-topic')];
    const topics=allSections.filter(el=>!genericTitles.has(titleOf(el.querySelector('h3'))));
    if(!topics.length)return result;

    if(activeChapterId!==entry.id){
      activeChapterId=entry.id;
      selectedTopic=0;
      selectedSubtopic=0;
    }
    selectedTopic=Math.max(0,Math.min(selectedTopic,topics.length-1));

    notes.classList.remove('studyai-compact-chapter');
    if(entry.title==='The World of Numbers'){
      renderCompactWorldOfNumbers(notes,allSections,topics);
      return result;
    }

    const pagesByTopic=topics.map(prepareSubtopicPages);
    const ui=makeNavigation();
    const topicSelect=createSelect('studyai-topic-select','Choose a topic in this chapter',
      topics.map(el=>titleOf(el.querySelector('h3'))));
    const subtopicSelect=document.createElement('select');
    subtopicSelect.className='studyai-subtopic-select';
    subtopicSelect.setAttribute('aria-label','Choose a subtopic on its own page');
    ui.topicLabel.append(topicSelect);
    ui.subLabel.append(subtopicSelect);

    const prose=notes.querySelector('.note-prose');
    if(!prose)return result;
    notes.insertBefore(ui.nav,prose);
    notes.append(ui.footer);
    const pageLabel=section=>titleOf(section?.querySelector(':scope > h4'))||'Subtopic';

    function show(topicIndex,subtopicIndex,focus){
      const i=Math.max(0,Math.min(Number(topicIndex)||0,topics.length-1));
      selectedTopic=i;
      const pages=pagesByTopic[i];
      selectedSubtopic=pages.length
        ?Math.max(0,Math.min(Number(subtopicIndex)||0,pages.length-1))
        :0;

      allSections.forEach(section=>{
        section.hidden=true;
        section.classList.remove('studyai-current-topic');
      });
      const section=topics[i];
      section.hidden=false;
      section.classList.add('studyai-current-topic');
      topicSelect.value=String(i);
      ui.topicCount.textContent='Topic '+(i+1)+' of '+topics.length;

      // Clear old submenu state and populate in content order.
      subtopicSelect.replaceChildren();
      pages.forEach((page,j)=>{
        const opt=document.createElement('option');
        opt.value=String(j);
        opt.textContent=(j+1)+'. '+pageLabel(page);
        subtopicSelect.append(opt);
        page.hidden=j!==selectedSubtopic;
        page.classList.toggle('studyai-current-subtopic',j===selectedSubtopic);
      });

      const paged=pages.length>0;
      ui.subtopicGroup.hidden=!paged;
      subtopicSelect.value=String(selectedSubtopic);
      ui.subCount.textContent=paged?'Subtopic '+(selectedSubtopic+1)+' of '+pages.length:'';
      ui.prevTopic.disabled=i===0;
      ui.nextTopic.disabled=i===topics.length-1;
      ui.prevSub.disabled=!paged||selectedSubtopic===0;
      ui.nextSub.disabled=!paged||selectedSubtopic===pages.length-1;
      // Footer uses a coherent linear reading order: previous/next *page*.
      const first=i===0&&(!paged||selectedSubtopic===0);
      const last=i===topics.length-1&&(!paged||selectedSubtopic===pages.length-1);
      ui.footPrev.disabled=first;
      ui.footNext.disabled=last;
      ui.progress.textContent=paged
        ?'Topic '+(i+1)+'/'+topics.length+' · Subtopic '+(selectedSubtopic+1)+'/'+pages.length
        :'Topic '+(i+1)+'/'+topics.length;

      if(focus){
        const heading=paged?pages[selectedSubtopic].querySelector('h4'):section.querySelector('h3');
        if(heading){
          heading.setAttribute('tabindex','-1');
          heading.focus({preventScroll:true});
        }
        ui.nav.scrollIntoView({block:'start',behavior:'instant'});
      }
    }
    const switchTopic=index=>show(index,0,true);
    const switchSubtopic=index=>show(selectedTopic,index,true);
    const turnPage=delta=>{
      const pages=pagesByTopic[selectedTopic];
      const lastIndex=pages.length-1;
      if(!pages.length){
        switchTopic(selectedTopic+delta);return;
      }
      const next=selectedSubtopic+delta;
      if(next>=0&&next<=lastIndex)switchSubtopic(next);
      else if(delta>0 && selectedTopic<topics.length-1)switchTopic(selectedTopic+1);
      else if(delta<0 && selectedTopic>0){
        const previousTopic=selectedTopic-1;
        show(previousTopic,pagesByTopic[previousTopic].length-1,true);
      }
    };
    topicSelect.addEventListener('change',()=>switchTopic(Number(topicSelect.value)));
    subtopicSelect.addEventListener('change',()=>switchSubtopic(Number(subtopicSelect.value)));
    ui.prevTopic.addEventListener('click',()=>switchTopic(selectedTopic-1));
    ui.nextTopic.addEventListener('click',()=>switchTopic(selectedTopic+1));
    ui.prevSub.addEventListener('click',()=>switchSubtopic(selectedSubtopic-1));
    ui.nextSub.addEventListener('click',()=>switchSubtopic(selectedSubtopic+1));
    ui.footPrev.addEventListener('click',()=>turnPage(-1));
    ui.footNext.addEventListener('click',()=>turnPage(1));
    show(selectedTopic,selectedSubtopic,false);
    return result;
  };
})();