/* StudyAI | NCERT Class 9 Maths | chapter > lesson > focused subtopic.
 * Preserve the major-lesson dropdown and group overview pages, while allowing
 * any number of AUTHORED child explanations and worked examples to be opened
 * as their own page. Nothing is split into empty paragraph-only pages.
 */
(() => {
  'use strict';
  if(typeof renderReaderContent!=='function')return;
  const baseRender=renderReaderContent;
  const skip=new Set([
    'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]);
  const remembered=new Map();
  const rememberedLeaf=new Map();
  let activeEntry=null,activeGroup=0,focusedKey=null;
  let groups=[],sections=[],select,footerProgress,topCount;
  let prevButtons=[],nextButtons=[];
  const textOf=element=>String(element?.textContent||'').trim();
  const makeButton=(className,label,style='secondary')=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='button '+style+' '+className;
    button.textContent=label;
    return button;
  };
  const findLeaf=key=>groups.flatMap(group=>group.leaves)
    .find(leaf=>leaf.key===key)||null;
  const allLeaves=()=>groups.flatMap(group=>group.leaves);
  const hide=(element,hidden)=>{
    element.hidden=hidden;
    element.classList.toggle('studyai-leaf-hidden',hidden);
  };
  function notify(leaf,userInitiated){
    window.dispatchEvent(new CustomEvent('studyai:lesson-changed',{
      detail:{
        entryId:activeEntry,index:activeGroup,
        leafKey:leaf?.key||null,
        title:leaf?.title||groups[activeGroup]?.title||'',
        userInitiated:!!userInitiated
      }
    }));
  }
  function scrollToLesson(notes,section){
    const heading=section?.querySelector(':scope > h3');
    if(heading){
      heading.tabIndex=-1;
      heading.focus({preventScroll:true});
    }
    (notes.closest('.reader')||notes).scrollIntoView({
      block:'start',behavior:'auto'
    });
  }
  function setNavigation(){
    const leaf=focusedKey?findLeaf(focusedKey):null;
    const flat=allLeaves();
    const focusedIndex=leaf?flat.findIndex(unit=>unit.key===leaf.key):-1;
    const label=leaf
      ?'Subtopic '+(focusedIndex+1)+' of '+flat.length
      :'Lesson '+(activeGroup+1)+' of '+groups.length;
    if(topCount)topCount.textContent=label;
    if(footerProgress)footerProgress.textContent=label;
    if(select)select.value=String(activeGroup);
    prevButtons.forEach(button=>{button.disabled=leaf?focusedIndex<=0:activeGroup<=0});
    nextButtons.forEach(button=>{button.disabled=leaf?
      focusedIndex>=flat.length-1:activeGroup>=groups.length-1});
  }
  function showGroup(index,scroll=false){
    if(!groups.length)return false;
    const n=Math.max(0,Math.min(groups.length-1,Number(index)||0));
    activeGroup=n;
    focusedKey=null;
    remembered.set(activeEntry,n);
    rememberedLeaf.delete(activeEntry);
    sections.forEach((section,i)=>{
      hide(section,i!==n);
      if(i===n){
        section.classList.add('studyai-current-topic');
        [...section.children].forEach(child=>hide(child,false));
        section.querySelectorAll('.studyai-lesson-subtopic').forEach(part=>{
          hide(part,false);
          part.classList.remove('studyai-current-subtopic');
        });
        // The overview displays the complete parent lesson, not dozens of
        // repetitive "mark this child" bars. Each child gets its inline
        // completion button when the student opens its focused page.
        section.querySelectorAll('.studyai-inline-leaf-only').forEach(bar=>
          hide(bar,true));
      }else section.classList.remove('studyai-current-topic');
    });
    setNavigation();
    const notes=document.getElementById('detailed-notes');
    if(scroll)scrollToLesson(notes,sections[n]);
    notify(null,scroll);
    return true;
  }
  function showLeaf(key,scroll=true){
    const leaf=findLeaf(key);
    if(!leaf)return false;
    const group=leaf.groupIndex;
    if(group!==activeGroup||focusedKey===null)showGroup(group,false);
    else if(sections[group]?.hidden)showGroup(group,false);
    const section=sections[group];
    if(!section)return false;
    activeGroup=group;
    focusedKey=leaf.key;
    remembered.set(activeEntry,group);
    rememberedLeaf.set(activeEntry,leaf.key);
    const examples=[...section.children].filter(node=>node.classList.contains('worked-box'));
    const parts=[...section.children].filter(node=>node.classList.contains('studyai-lesson-subtopic'));
    [...section.children].forEach(child=>{
      const isHeading=child.matches(':scope > h3');
      const isFigure=child.classList.contains('studyai-concept-figure')||
        child.classList.contains('studyai-diagram');
      const isPart=child.classList.contains('studyai-lesson-subtopic');
      const isExample=child.classList.contains('worked-box');
      const isCoreCompletion=child.classList.contains('studyai-inline-completion');
      let visible=isHeading;
      if(leaf.kind==='core'){
        visible=!isPart&&!isExample;
      }else if(leaf.kind==='subtopic'){
        visible=isHeading||isFigure||
          (isPart&&parts.indexOf(child)===leaf.subtopicIndex);
      }else if(leaf.kind==='example'){
        visible=isHeading||(isExample&&examples.indexOf(child)===leaf.exampleIndex);
      }
      if(isCoreCompletion){
        visible=leaf.kind==='core' && child.dataset.leafKey===leaf.key;
      }
      hide(child,!visible);
      if(isPart){
        child.classList.toggle('studyai-current-subtopic',visible&&leaf.kind==='subtopic');
      }
    });
    section.querySelectorAll('.studyai-inline-leaf-only').forEach(bar=>
      hide(bar,bar.querySelector('.studyai-inline-complete')?.dataset.leafKey!==leaf.key));
    setNavigation();
    const notes=document.getElementById('detailed-notes');
    if(scroll)scrollToLesson(notes,section);
    notify(leaf,scroll);
    return true;
  }
  function step(delta){
    if(focusedKey){
      const flat=allLeaves();
      const i=flat.findIndex(unit=>unit.key===focusedKey);
      return showLeaf(flat[Math.max(0,Math.min(flat.length-1,i+delta))]?.key,true);
    }
    return showGroup(activeGroup+delta,true);
  }
  function mountLessonReader(entry,notes){
    const all=[...notes.querySelectorAll('.note-section.actual-note-topic')];
    sections=all.filter(section=>!skip.has(textOf(
      section.querySelector(':scope > h3'))));
    groups=window.StudyAIClass9Outline?.forEntry(entry)||[];
    if(!sections.length||sections.length!==groups.length){
      console.warn('StudyAI detailed outline mismatch; retaining the unpaginated chapter',entry.title);
      groups=[];
      return;
    }
    notes.classList.add('studyai-compact-chapter');
    const nav=document.createElement('nav');
    nav.className='studyai-lesson-reader studyai-compact-reader';
    nav.setAttribute('aria-label','Lessons in '+entry.title);
    const label=document.createElement('label');
    label.className='studyai-lesson-label';
    const kicker=document.createElement('span');
    kicker.className='small-label';
    kicker.textContent='Choose a lesson';
    topCount=document.createElement('strong');
    topCount.className='studyai-lesson-total';
    select=document.createElement('select');
    select.className='studyai-topic-select';
    select.setAttribute('aria-label','Choose a lesson in '+entry.title);
    groups.forEach((group,index)=>{
      const option=document.createElement('option');
      option.value=String(index);
      option.textContent=(index+1)+'. '+group.title;
      select.append(option);
    });
    label.append(kicker,topCount,select);
    const controls=document.createElement('div');
    controls.className='studyai-lesson-controls';
    const prev=makeButton('studyai-prev-topic','← Previous lesson');
    const next=makeButton('studyai-next-topic','Next lesson →','primary');
    controls.append(prev,next);
    const heading=document.createElement('div');
    heading.className='studyai-lesson-group';
    heading.append(label,controls);
    nav.append(heading);
    const footer=document.createElement('nav');
    footer.className='studyai-topic-pagination';
    footer.setAttribute('aria-label','Lesson page navigation');
    const footerPrev=makeButton('studyai-prev-page','← Previous');
    footerProgress=document.createElement('span');
    footerProgress.className='studyai-topic-progress';
    footerProgress.setAttribute('aria-live','polite');
    const footerNext=makeButton('studyai-next-page','Next →','primary');
    footer.append(footerPrev,footerProgress,footerNext);
    const prose=notes.querySelector('.note-prose');
    if(!prose)return;
    notes.insertBefore(nav,prose);
    notes.append(footer);
    select.addEventListener('change',()=>showGroup(select.value,true));
    [prev,footerPrev].forEach(button=>button.addEventListener('click',()=>step(-1)));
    [next,footerNext].forEach(button=>button.addEventListener('click',()=>step(1)));
    prevButtons=[prev,footerPrev];
    nextButtons=[next,footerNext];
    activeEntry=entry.id;
    showGroup(remembered.get(entry.id)||0,false);
    const lastLeaf=rememberedLeaf.get(entry.id);
    if(lastLeaf)findLeaf(lastLeaf)&&showLeaf(lastLeaf,false);
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
      activeEntry=null;groups=[];sections=[];
      return result;
    }
    mountLessonReader(entry,notes);
    return result;
  };
  window.StudyAILessonReader={
    goTo(index){return showGroup(index,true)},
    goToLeaf(key){return showLeaf(key,true)},
    activeIndex(){return activeGroup},
    activeLeafKey(){return focusedKey},
    currentEntryId(){return activeEntry},
    groups(){return groups},
    leaves(){return allLeaves()}
  };
})();
