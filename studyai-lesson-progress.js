/* StudyAI — progress-aware chapter/lesson navigation for CBSE Class 9 Mathematics and Science.
 *
 * Layout: Collapsible contents (chapters and lesson checklist) | Teaching note
 * Chapter rings count the ACTUAL selectable authored subtopics and worked
 * examples, without a fixed maximum. Old section-level completion records
 * migrate into the new fine-grained checklist without losing progress.
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
  let groups=[];
  let sideRail=null;

  const isSupportedSubject=subject=>subject==='Mathematics'||subject==='Science'||subject==='English';
  const isCourse=()=>current.board==='CBSE'&&current.grade==='Class 9'&&
    isSupportedSubject(current.subject);
  const bank=entry=>entry?.subject==='Science'
    ?window.CBSE_CLASS9_SCIENCE_FULL_NOTES?.[entry?.title]||null
    :entry?.subject==='English'
      ?window.CBSE_CLASS9_ENGLISH_FULL_NOTES?.[entry?.title]||null
      :entry?.subject==='Mathematics'
        ?window.CBSE_CLASS9_MATH_FULL_NOTES?.[entry?.title]||null:null;
  const isEligible=entry=>isCourse()&&entry?.board==='CBSE'&&
    entry?.grade==='Class 9'&&entry?.subject===current.subject&&!!bank(entry);
  const one=selector=>document.querySelector(selector);
  const readStore=()=>state.studyaiLessonProgress&&
    typeof state.studyaiLessonProgress==='object'&&!Array.isArray(state.studyaiLessonProgress)
    ?state.studyaiLessonProgress:{};

  const lessonGroups=entry=>window.StudyAIClass9Outline?.forEntry(entry)||[];
  const lessonData=entry=>lessonGroups(entry).flatMap(group=>group.leaves);

  function readChecks(entry,units=lessonData(entry)){
    const record=readStore()[entry.id];
    // Older StudyAI stored complete MAJOR lesson keys. Treat such a check
    // as completing its authored children until the next explicit edit
    // migrates it to the new stable leaf-key representation.
    const legacy=lessonGroups(entry);
    const values=Array.isArray(record)?record:
      state.completed?.includes(entry.id)?units.map(leaf=>leaf.key):[];
    const selected=new Set(values.filter(x=>typeof x==='string'));
    const migrated=new Set();
    for(const group of legacy){
      if(selected.has(group.key))group.leaves.forEach(leaf=>migrated.add(leaf.key));
    }
    const allowed=new Set(units.map(leaf=>leaf.key));
    selected.forEach(key=>{if(allowed.has(key))migrated.add(key)});
    return migrated;
  }

  function summary(entry){
    const units=lessonData(entry);
    const marked=readChecks(entry,units);
    const done=units.filter(unit=>marked.has(unit.key)).length;
    return {
      done,total:units.length,
      percent:units.length?Math.round(100*done/units.length):0,
      lessonCount:lessonGroups(entry).length
    };
  }

  function makeRing(info){
    const ring=document.createElement('span');
    ring.className='studyai-progress-ring'+
      (info.total&&info.done===info.total?' is-complete':'');
    ring.style.setProperty('--studyai-done',info.percent+'%');
    ring.setAttribute('role','img');
    ring.setAttribute('aria-label',info.done+' of '+info.total+
      ' subtopics complete, '+info.percent+' percent');
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
      button.title=entry.title+' — '+info.done+' of '+info.total+' subtopics complete';
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
      groups=[];
      return;
    }
    sideRail=one('#study .studyai-lesson-rail');
    const slot=layout.querySelector('.studyai-lessons-slot');
    if(!sideRail){
      sideRail=document.createElement('aside');
      sideRail.className='studyai-lesson-rail';
      sideRail.setAttribute('aria-label','Subtopics for the selected chapter');
    }
    // Keep chapter selection and lesson checkboxes in one scrollable contents
    // drawer instead of allocating a separate middle column.
    if(slot && sideRail.parentElement!==slot)slot.appendChild(sideRail);
    else if(!slot && !sideRail.isConnected){
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
        ' subtopics complete, '+info.percent+' percent');
      button.title=entry.title+' — '+info.done+' of '+info.total+' subtopics complete';
    });
  }

  const byLeafKey=key=>lessons.find(leaf=>leaf.key===key);
  const activeIndex=()=>window.StudyAILessonReader?.activeIndex?.()||0;
  const activeLeaf=()=>window.StudyAILessonReader?.activeLeafKey?.()||null;

  function refreshIndicators(){
    if(!isEligible(chapterEntry)||!sideRail)return;
    const checked=readChecks(chapterEntry,lessons);
    const count=sideRail.querySelector('.studyai-rail-count');
    if(count)count.textContent=checked.size+' of '+lessons.length+' subtopics completed';
    const bar=sideRail.querySelector('.studyai-rail-progress-fill');
    if(bar)bar.style.width=(lessons.length?checked.size*100/lessons.length:0)+'%';
    const selectedIndex=activeIndex();
    const selectedLeaf=activeLeaf();
    sideRail.querySelectorAll('.studyai-outline-group').forEach(groupNode=>{
      const group=groups[Number(groupNode.dataset.index)];
      if(!group)return;
      const complete=group.leaves.filter(leaf=>checked.has(leaf.key)).length;
      groupNode.classList.toggle('is-complete',complete===group.leaves.length);
      const header=groupNode.querySelector(':scope > .studyai-lesson-row');
      header?.classList.toggle('is-active',group.index===selectedIndex);
      header?.classList.toggle('is-complete',complete===group.leaves.length);
      const link=header?.querySelector('.studyai-lesson-link');
      if(group.index===selectedIndex&&!selectedLeaf)link?.setAttribute('aria-current','page');
      else link?.removeAttribute('aria-current');
      const toggle=header?.querySelector('.studyai-lesson-toggle');
      if(toggle){
        const status=complete===0?'false':
          complete===group.leaves.length?'true':'mixed';
        toggle.setAttribute('aria-checked',status);
        toggle.setAttribute('aria-label',
          (status==='true'?'Mark all incomplete: ':'Mark all complete: ')+group.title);
        toggle.title=complete+' of '+group.leaves.length+' subtopics completed';
        toggle.textContent=status==='true'?'✓':status==='mixed'?'−':'';
      }
      const count=groupNode.querySelector('.studyai-outline-group-count');
      if(count)count.textContent=complete+'/'+group.leaves.length;
      groupNode.querySelectorAll('.studyai-sublesson-row').forEach(row=>{
        const leaf=byLeafKey(row.dataset.leafKey);
        if(!leaf)return;
        const done=checked.has(leaf.key);
        const active=selectedLeaf===leaf.key;
        row.classList.toggle('is-complete',done);
        row.classList.toggle('is-active',active);
        const link=row.querySelector('.studyai-sublesson-link');
        if(active)link?.setAttribute('aria-current','page');
        else link?.removeAttribute('aria-current');
        const tick=row.querySelector('.studyai-sublesson-toggle');
        if(tick){
          tick.setAttribute('aria-checked',String(done));
          tick.setAttribute('aria-label',
            (done?'Mark incomplete: ':'Mark complete: ')+leaf.title);
          tick.title=done?'Mark incomplete':'Mark as complete';
          tick.textContent=done?'✓':'';
        }
      });
    });
    document.querySelectorAll('#detailed-notes .studyai-inline-complete').forEach(button=>{
      const group=groups.find(item=>item.key===button.dataset.groupKey);
      const done=group?group.leaves.every(leaf=>checked.has(leaf.key)):
        checked.has(button.dataset.leafKey);
      button.classList.toggle('is-complete',done);
      button.setAttribute('aria-pressed',String(done));
      button.textContent=done?'✓ Completed · Mark incomplete':'✓ Mark as complete';
    });
    updateChapterRings();
  }

  function persistChecks(marked){
    if(!isEligible(chapterEntry))return;
    const store=readStore();
    state.studyaiLessonProgress={...store,[chapterEntry.id]:[...marked]};
    if(!Array.isArray(state.completed))state.completed=[];
    const oldIndex=state.completed.indexOf(chapterEntry.id);
    const allDone=lessons.length>0&&marked.size===lessons.length;
    if(allDone&&oldIndex<0)state.completed.push(chapterEntry.id);
    if(!allDone&&oldIndex>=0)state.completed.splice(oldIndex,1);
    save();
    refreshIndicators();
    if(typeof updateDashboard==='function')updateDashboard();
    if(typeof updateTopicActions==='function')updateTopicActions();
  }
  function toggleLeaf(key){
    if(!isEligible(chapterEntry)||!byLeafKey(key))return;
    const checked=readChecks(chapterEntry,lessons);
    if(checked.has(key))checked.delete(key);
    else checked.add(key);
    persistChecks(checked);
  }
  function toggleGroup(index){
    if(!isEligible(chapterEntry))return;
    const group=groups[index];
    if(!group)return;
    const checked=readChecks(chapterEntry,lessons);
    const allDone=group.leaves.every(leaf=>checked.has(leaf.key));
    group.leaves.forEach(leaf=>{
      if(allDone)checked.delete(leaf.key);
      else checked.add(leaf.key);
    });
    persistChecks(checked);
  }
  // Reading to the end completes the selected focused page (or all leaves
  // on a full lesson overview). Merely opening a lesson never earns progress.
  // Use the existing stable keys and persistence path so dashboard rings,
  // manual checkboxes and saved progress remain in sync.
  let readerScrollIntent=false;
  let scrollCheckQueued=false;
  let touchY=null;
  function resetReaderScrollIntent(){
    readerScrollIntent=false;
  }
  function atReadingEnd(){
    if(!readerScrollIntent||!isEligible(chapterEntry))return;
    const notes=one('#detailed-notes');
    if(!notes||!notes.offsetParent)return;
    const section=notes.querySelector(
      '.actual-note-topic.studyai-current-topic:not([hidden])');
    if(!section)return;
    const rect=section.getBoundingClientRect();
    // Reaching the actual end of the visible lesson is required. Do not
    // count a chapter simply because navigation jumped near its start.
    if(rect.bottom>window.innerHeight+16||
       rect.bottom<0||rect.top>=window.innerHeight)return;
    const marked=readChecks(chapterEntry,lessons);
    const key=activeLeaf();
    let changed=false;
    if(key){
      const leaf=byLeafKey(key);
      if(!leaf)return;
      if(!marked.has(key)){marked.add(key);changed=true;}
    }else{
      const group=groups[activeIndex()];
      if(!group)return;
      group.leaves.forEach(leaf=>{
        if(!marked.has(leaf.key)){marked.add(leaf.key);changed=true;}
      });
    }
    // A manual 'mark incomplete' must stay incomplete until the next real
    // downward reading gesture, not immediately flip back on its own.
    resetReaderScrollIntent();
    if(changed)persistChecks(marked);
  }
  function queueReadingEndCheck(){
    if(scrollCheckQueued)return;
    scrollCheckQueued=true;
    requestAnimationFrame(()=>{
      scrollCheckQueued=false;
      atReadingEnd();
    });
  }
  function scrollingDown(event){
    if(!isEligible(chapterEntry))return;
    if(event.target?.closest?.('.studyai-notes-nav'))return;
    if(event.type==='wheel'&&event.deltaY<=0)return;
    if(event.type==='keydown'){
      if(!['ArrowDown','PageDown','End',' '].includes(event.key)||
         event.altKey||event.ctrlKey||event.metaKey||
         event.target?.closest?.('button,input,select,textarea,[contenteditable]'))return;
    }
    readerScrollIntent=true;
    queueReadingEndCheck();
  }
  document.addEventListener('wheel',scrollingDown,{passive:true});
  document.addEventListener('touchstart',event=>{
    touchY=event.touches?.[0]?.clientY??null;
  },{passive:true});
  document.addEventListener('touchmove',event=>{
    const y=event.touches?.[0]?.clientY;
    if(y===undefined||touchY===null)return;
    const down=touchY-y>2;
    touchY=y;
    if(down)scrollingDown(event);
  },{passive:true});
  document.addEventListener('keydown',scrollingDown);
  // Scrollbars can also be dragged instead of using the wheel.
  document.addEventListener('pointerdown',event=>{
    const scrollbarWidth=window.innerWidth-document.documentElement.clientWidth;
    if(scrollbarWidth>0&&event.clientX>=document.documentElement.clientWidth)
      scrollingDown(event);
  });
  window.addEventListener('scroll',queueReadingEndCheck,{passive:true});
  document.addEventListener('scroll',queueReadingEndCheck,{passive:true,capture:true});

  function addToggle(role,title,callback){
    const button=document.createElement('button');
    button.type='button';
    button.className=role;
    button.setAttribute('role','checkbox');
    button.setAttribute('aria-checked','false');
    button.setAttribute('aria-label','Mark complete: '+title);
    button.title='Mark as complete';
    button.addEventListener('click',callback);
    return button;
  }
  function createLessonGroup(group){
    const container=document.createElement('div');
    container.className='studyai-outline-group';
    container.dataset.index=String(group.index);
    const row=document.createElement('div');
    row.className='studyai-lesson-row';
    row.dataset.index=String(group.index);
    const disclosure=document.createElement('button');
    disclosure.type='button';
    disclosure.className='studyai-outline-disclosure';
    disclosure.textContent='⌄';
    disclosure.setAttribute('aria-label','Show subtopics in '+group.title);
    disclosure.setAttribute('aria-expanded','false');
    const children=document.createElement('div');
    children.className='studyai-outline-children';
    children.hidden=true;
    children.id='studyai-lesson-children-'+group.index;
    disclosure.setAttribute('aria-controls',children.id);
    const openChildren=open=>{
      children.hidden=!open;
      disclosure.textContent=open?'⌄':'›';
      disclosure.setAttribute('aria-expanded',String(open));
      disclosure.setAttribute('aria-label',
        (open?'Hide':'Show')+' subtopics in '+group.title);
    };
    disclosure.addEventListener('click',()=>openChildren(children.hidden));
    const link=document.createElement('button');
    link.type='button';
    link.className='studyai-lesson-link';
    const label=document.createElement('span');
    label.textContent=String(group.index+1).padStart(2,'0')+'  '+group.title;
    const counter=document.createElement('span');
    counter.className='studyai-outline-group-count';
    counter.setAttribute('aria-label','Subtopics completed');
    link.append(label,counter);
    link.addEventListener('click',()=>{
      window.StudyAILessonReader?.goTo(group.index);
      openChildren(true);
      refreshIndicators();
    });
    const groupTick=addToggle('studyai-lesson-toggle',group.title,
      ()=>toggleGroup(group.index));
    row.append(disclosure,link,groupTick);
    group.leaves.forEach((leaf,index)=>{
      const child=document.createElement('div');
      child.className='studyai-sublesson-row';
      child.dataset.leafKey=leaf.key;
      const childLink=document.createElement('button');
      childLink.type='button';
      childLink.className='studyai-sublesson-link';
      childLink.textContent=String(index+1).padStart(2,'0')+'  '+leaf.title;
      childLink.addEventListener('click',()=>{
        window.StudyAILessonReader?.goToLeaf(leaf.key);
        refreshIndicators();
      });
      const childTick=addToggle('studyai-sublesson-toggle',leaf.title,
        ()=>toggleLeaf(leaf.key));
      child.append(childLink,childTick);
      children.append(child);
    });
    container.append(row,children);
    if(group.index===activeIndex())openChildren(true);
    return container;
  }

  function inlineComplete(label,callback,key,type){
    const bar=document.createElement('div');
    bar.className='studyai-inline-completion';
    if(type==='leaf')bar.classList.add('studyai-inline-leaf-only');
    const description=document.createElement('span');
    description.textContent=label;
    const button=document.createElement('button');
    button.className='studyai-inline-complete';
    button.type='button';
    if(type==='group')button.dataset.groupKey=key;
    else button.dataset.leafKey=key;
    button.setAttribute('aria-pressed','false');
    button.addEventListener('click',callback);
    bar.append(description,button);
    return bar;
  }
  function mountInlineButtons(){
    const rendered=[...document.querySelectorAll(
      '#detailed-notes .actual-note-topic')].filter(section=>
      !ignored.has(String(section.querySelector(':scope > h3')?.textContent||'').trim()));
    rendered.forEach((section,index)=>{
      const group=groups[index];
      const heading=section.querySelector(':scope > h3');
      if(!group||!heading)return;
      heading.insertAdjacentElement('afterend',inlineComplete(
        'Track your progress through this lesson',
        ()=>toggleGroup(index),group.key,'group'));
      const parts=[...section.children].filter(child=>
        child.classList.contains('studyai-lesson-subtopic'));
      const examples=[...section.children].filter(child=>
        child.classList.contains('worked-box'));
      for(const leaf of group.leaves){
        let target=null;
        if(leaf.kind==='core')target=heading;
        if(leaf.kind==='subtopic'){
          target=parts[leaf.subtopicIndex]?.querySelector(':scope > h4');
        }
        if(leaf.kind==='example'){
          target=examples[leaf.exampleIndex]?.querySelector(':scope > h4');
        }
        if(!target)continue;
        const bar=inlineComplete('Mark this subtopic as complete',
          ()=>toggleLeaf(leaf.key),leaf.key,'leaf');
        target.insertAdjacentElement('afterend',bar);
        bar.hidden=true;
      }
    });
  }

  function buildLessonRail(entry){
    if(!isEligible(entry))return;
    setLayout();
    chapterEntry=entry;
    groups=lessonGroups(entry);
    lessons=groups.flatMap(group=>group.leaves);
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
    list.className='studyai-lesson-list studyai-outline-list';
    list.setAttribute('aria-label','Lessons and subtopics in '+entry.title);
    groups.forEach(group=>list.append(createLessonGroup(group)));
    sideRail.append(header,list);
    mountInlineButtons();
    refreshIndicators();
  }

  renderReaderContent=function(entry){
    resetReaderScrollIntent();
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
    resetReaderScrollIntent();
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
    },
    outline:entryId=>{
      const entry=STUDY_DATA.find(e=>e.id===entryId);
      return entry&&bank(entry)?lessonGroups(entry):[];
    },
    courseTotals:(subject='Mathematics')=>{
      const entries=STUDY_DATA.filter(entry=>
        entry.board==='CBSE'&&entry.grade==='Class 9'&&
        entry.subject===subject&&isSupportedSubject(subject)&&bank(entry));
      return {chapters:entries.length,subtopics:entries.reduce(
        (n,entry)=>n+lessonData(entry).length,0)};
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