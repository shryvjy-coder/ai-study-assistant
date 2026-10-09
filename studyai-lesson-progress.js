/* StudyAI — progress-aware chapter/lesson navigation for CBSE Class 9 Mathematics.
 *
 * Layout: Chapters | Lesson checklist | Full-width teaching note
 * The chapter ring shows completed substantial lessons (not every small h4
 * heading). Completion is stored in the existing StudyAI account state so it
 * survives reloads and syncs through the existing authenticated state API.
 * No notes, formulas, SVGs or exercises are changed by this UI enhancement.
 */
(() => {
  'use strict';
  if(typeof renderReaderContent!=='function'||
     typeof renderTopicList!=='function'||
     typeof topicList!=='function')return;

  const previousRender=renderReaderContent;
  const previousChapterList=renderTopicList;
  const ignored=new Set([
    'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]);
  let chapterEntry=null;
  let lessons=[];
  let sideRail=null;

  const isCourse=()=>current.board==='CBSE'&&current.grade==='Class 9'&&
    current.subject==='Mathematics';
  const bank=entry=>window.CBSE_CLASS9_MATH_FULL_NOTES?.[entry?.title]||null;
  const isEligible=entry=>isCourse()&&entry?.board==='CBSE'&&
    entry?.grade==='Class 9'&&entry?.subject==='Mathematics'&&!!bank(entry);
  const one=selector=>document.querySelector(selector);
  const readStore=()=>state.studyaiLessonProgress&&
    typeof state.studyaiLessonProgress==='object'&&!Array.isArray(state.studyaiLessonProgress)
    ?state.studyaiLessonProgress:{};

  function lessonData(entry){
    const sections=bank(entry)?.sections||[];
    const appearances=new Map();
    return sections.filter(section=>
      section&&typeof section.title==='string'&&section.title.trim()&&
      !ignored.has(section.title.trim())).map(section=>{
        const title=section.title.trim();
        const occurrence=appearances.get(title)||0;
        appearances.set(title,occurrence+1);
        return {title,key:occurrence?title+' #'+(occurrence+1):title};
      });
  }

  function readChecks(entry,units=lessonData(entry)){
    const record=readStore()[entry.id];
    // Preserve an existing "Completed" chapter from the old StudyAI reader.
    const values=Array.isArray(record)?record:
      state.completed?.includes(entry.id)?units.map(lesson=>lesson.key):[];
    const allowed=new Set(units.map(unit=>unit.key));
    return new Set(values.filter(value=>typeof value==='string'&&allowed.has(value)));
  }

  function summary(entry){
    const units=lessonData(entry);
    const marked=readChecks(entry,units);
    const done=units.filter(unit=>marked.has(unit.key)).length;
    return {done,total:units.length,percent:units.length?Math.round(100*done/units.length):0};
  }

  function makeRing(info){
    const ring=document.createElement('span');
    ring.className='studyai-progress-ring'+
      (info.total&&info.done===info.total?' is-complete':'');
    ring.style.setProperty('--studyai-done',info.percent+'%');
    ring.setAttribute('role','img');
    ring.setAttribute('aria-label',info.done+' of '+info.total+
      ' lessons complete, '+info.percent+' percent');
    const numeral=document.createElement('span');
    numeral.className='studyai-progress-number';
    numeral.textContent=info.total&&info.done===info.total?'✓':info.percent+'%';
    ring.append(numeral);
    return ring;
  }

  function enhanceChapterRail(){
    const rail=one('#study .chapter-rail');
    const label=rail?.querySelector('.rail-head .small-label');
    if(label)label.textContent=isCourse()?'Chapters':'Topics';
    if(!isCourse())return;
    const byId=new Map(topicList().map(entry=>[entry.id,entry]));
    rail?.querySelectorAll('.chapter-item[data-id]').forEach(button=>{
      const entry=byId.get(button.dataset.id);
      if(!entry||!bank(entry))return;
      const info=summary(entry);
      const label=document.createElement('span');
      label.className='studyai-chapter-name';
      label.textContent=entry.title;
      button.replaceChildren(makeRing(info),label);
      button.title=entry.title+' — '+info.done+' of '+info.total+' lessons complete';
    });
  }

  function setLayout(){
    const section=one('#study');
    const layout=section?.querySelector('.reader-layout');
    if(!section||!layout)return;
    const enabled=isCourse();
    section.classList.toggle('studyai-progress-active',enabled);
    if(!enabled){
      one('#study .studyai-lesson-rail')?.remove();
      sideRail=null;
      chapterEntry=null;
      lessons=[];
      return;
    }
    sideRail=one('#study .studyai-lesson-rail');
    if(!sideRail){
      sideRail=document.createElement('aside');
      sideRail.className='studyai-lesson-rail';
      sideRail.setAttribute('aria-label','Subtopics for the selected chapter');
      const reader=layout.querySelector('.reader');
      if(reader)layout.insertBefore(sideRail,reader);
    }
    if(!sideRail.childElementCount){
      sideRail.innerHTML='<div class="studyai-side-head">'+
        '<span class="small-label">Subtopics</span>'+
        '<h3 class="studyai-rail-title">Choose a chapter</h3>'+
        '<p class="studyai-rail-count">Pick a chapter on the left to see its lessons.</p>'+
        '</div><div class="studyai-lesson-list"></div>';
    }
  }

  function updateChapterRings(){
    if(!isCourse())return;
    const byId=new Map(topicList().map(e=>[e.id,e]));
    one('#study')?.querySelectorAll('.chapter-item[data-id]').forEach(button=>{
      const entry=byId.get(button.dataset.id);
      const ring=button.querySelector('.studyai-progress-ring');
      if(!entry||!ring)return;
      const info=summary(entry);
      ring.style.setProperty('--studyai-done',info.percent+'%');
      ring.classList.toggle('is-complete',info.total>0&&info.done===info.total);
      ring.querySelector('.studyai-progress-number').textContent=
        info.total>0&&info.done===info.total?'✓':info.percent+'%';
      ring.setAttribute('aria-label',info.done+' of '+info.total+
        ' lessons complete, '+info.percent+' percent');
      button.title=entry.title+' — '+info.done+' of '+info.total+' lessons complete';
    });
  }

  function activeIndex(){
    return window.StudyAILessonReader?.activeIndex?.()||0;
  }

  function refreshIndicators(){
    if(!isEligible(chapterEntry)||!sideRail)return;
    const checked=readChecks(chapterEntry,lessons);
    const completed=lessons.filter(lesson=>checked.has(lesson.key)).length;
    const count=sideRail.querySelector('.studyai-rail-count');
    if(count)count.textContent=completed+' of '+lessons.length+' completed';
    const bar=sideRail.querySelector('.studyai-rail-progress-fill');
    if(bar)bar.style.width=(lessons.length?completed*100/lessons.length:0)+'%';
    sideRail.querySelectorAll('.studyai-lesson-row').forEach(row=>{
      const n=Number(row.dataset.index);
      const lesson=lessons[n];
      if(!lesson)return;
      const done=checked.has(lesson.key);
      const active=n===activeIndex();
      row.classList.toggle('is-complete',done);
      row.classList.toggle('is-active',active);
      const link=row.querySelector('.studyai-lesson-link');
      if(active)link?.setAttribute('aria-current','page');
      else link?.removeAttribute('aria-current');
      const tick=row.querySelector('.studyai-lesson-toggle');
      if(tick){
        tick.setAttribute('aria-checked',String(done));
        tick.setAttribute('aria-label',(done?'Mark incomplete: ':'Mark complete: ')+lesson.title);
        tick.title=done?'Mark incomplete':'Mark as complete';
        tick.textContent=done?'✓':'';
      }
    });
    one('#detailed-notes')?.querySelectorAll('.studyai-inline-complete').forEach(button=>{
      const key=button.dataset.lessonKey;
      const done=checked.has(key);
      button.classList.toggle('is-complete',done);
      button.setAttribute('aria-pressed',String(done));
      button.textContent=done?'✓ Completed · Mark incomplete':'✓ Mark as complete';
    });
    updateChapterRings();
  }

  function toggleLesson(index){
    if(!isEligible(chapterEntry))return;
    const unit=lessons[index];
    if(!unit)return;
    const store=readStore();
    const checked=readChecks(chapterEntry,lessons);
    if(checked.has(unit.key))checked.delete(unit.key);
    else checked.add(unit.key);
    state.studyaiLessonProgress={...store,[chapterEntry.id]:[...checked]};
    // The previous single chapter-wide completion state remains consistent
    // with the new lesson-level progress and the existing dashboard.
    if(!Array.isArray(state.completed))state.completed=[];
    const wasComplete=state.completed.indexOf(chapterEntry.id);
    if(checked.size===lessons.length && lessons.length){
      if(wasComplete<0)state.completed.push(chapterEntry.id);
    } else if(wasComplete>=0){
      state.completed.splice(wasComplete,1);
    }
    save();
    refreshIndicators();
    if(typeof updateDashboard==='function')updateDashboard();
    if(typeof updateTopicActions==='function')updateTopicActions();
  }

  function createLessonRow(lesson,index){
    const row=document.createElement('div');
    row.className='studyai-lesson-row';
    row.dataset.index=String(index);

    const link=document.createElement('button');
    link.type='button';
    link.className='studyai-lesson-link';
    link.textContent=String(index+1).padStart(2,'0')+'  '+lesson.title;
    link.addEventListener('click',()=>{
      window.StudyAILessonReader?.goTo(index);
      refreshIndicators();
    });

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='studyai-lesson-toggle';
    toggle.setAttribute('role','checkbox');
    toggle.setAttribute('aria-checked','false');
    toggle.setAttribute('aria-label','Mark complete: '+lesson.title);
    toggle.title='Mark as complete';
    toggle.addEventListener('click',()=>toggleLesson(index));
    row.append(link,toggle);
    return row;
  }

  function mountInlineButtons(){
    const rendered=[...document.querySelectorAll(
      '#detailed-notes .actual-note-topic')].filter(section=>
        !ignored.has(String(section.querySelector(':scope > h3')?.textContent||'').trim()));
    rendered.forEach((section,index)=>{
      const lesson=lessons[index];
      const heading=section.querySelector(':scope > h3');
      if(!lesson||!heading)return;
      const bar=document.createElement('div');
      bar.className='studyai-inline-completion';
      const description=document.createElement('span');
      description.textContent='Track your progress through this lesson';
      const button=document.createElement('button');
      button.className='studyai-inline-complete';
      button.type='button';
      button.dataset.lessonKey=lesson.key;
      button.setAttribute('aria-pressed','false');
      button.addEventListener('click',()=>toggleLesson(index));
      bar.append(description,button);
      heading.insertAdjacentElement('afterend',bar);
    });
  }

  function buildLessonRail(entry){
    if(!isEligible(entry))return;
    setLayout();
    chapterEntry=entry;
    lessons=lessonData(entry);
    if(!sideRail)return;
    sideRail.replaceChildren();

    const header=document.createElement('div');
    header.className='studyai-side-head';
    const label=document.createElement('span');
    label.className='small-label';
    label.textContent='Subtopics';
    const title=document.createElement('h3');
    title.className='studyai-rail-title';
    title.textContent=entry.title;
    const counter=document.createElement('p');
    counter.className='studyai-rail-count';
    const bar=document.createElement('div');
    bar.className='studyai-rail-progress';
    bar.setAttribute('aria-hidden','true');
    const fill=document.createElement('span');
    fill.className='studyai-rail-progress-fill';
    bar.append(fill);
    header.append(label,title,counter,bar);

    const list=document.createElement('nav');
    list.className='studyai-lesson-list';
    list.setAttribute('aria-label','Lessons in '+entry.title);
    lessons.forEach((lesson,index)=>list.append(createLessonRow(lesson,index)));
    sideRail.append(header,list);
    mountInlineButtons();
    refreshIndicators();
  }

  renderReaderContent=function(entry){
    const result=previousRender.apply(this,arguments);
    setLayout();
    if(isEligible(entry))buildLessonRail(entry);
    return result;
  };

  renderTopicList=function(){
    const result=previousChapterList.apply(this,arguments);
    setLayout();
    enhanceChapterRail();
    return result;
  };

  window.addEventListener('studyai:lesson-changed',event=>{
    if(chapterEntry?.id===event.detail?.entryId)refreshIndicators();
  });
  window.addEventListener('studyai:state-changed',()=>{
    if(isCourse())refreshIndicators();
  });

  window.StudyAIProgress={
    summary:entryId=>{
      const entry=STUDY_DATA.find(e=>e.id===entryId);
      return entry&&bank(entry)?summary(entry):null;
    },
    completedKeys:entryId=>{
      const entry=STUDY_DATA.find(e=>e.id===entryId);
      return entry&&bank(entry)?[...readChecks(entry)]:[];
    }
  };

  // Main script.js initializes before deferred enhancement scripts run.
  // Bring the visible catalogue and any restored study note up to date.
  renderTopicList();
  const active=typeof currentEntry==='function'?currentEntry():null;
  if(isEligible(active)&&!one('#reader-view')?.classList.contains('hidden')){
    renderReaderContent(active);
  }
})();