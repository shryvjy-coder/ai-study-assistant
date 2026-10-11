(() => {
'use strict';

const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];
const escDash=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const SEP='¦';
const courseKey=(board,grade,subject)=>[board,grade,subject].join(SEP);
const courseKeyForEntry=e=>courseKey(e.board,e.grade,e.subject);

function buildCourseCatalogue(){
  const map=new Map();
  for(const e of STUDY_DATA){
    const key=courseKeyForEntry(e);
    if(!map.has(key))map.set(key,{key,board:e.board,grade:e.grade,subject:e.subject,topics:[]});
    map.get(key).topics.push(e);
  }
  for(const course of map.values())course.topics.sort((a,b)=>(a.order||0)-(b.order||0));
  return [...map.values()];
}

let courses=[];
let byKey=new Map();
let catalogueReady=false;

function ensureCourseState(){
  if(!Array.isArray(state.selectedCourses))state.selectedCourses=[];
  if(!catalogueReady)return;
  state.selectedCourses=[...new Set(state.selectedCourses)].filter(key=>byKey.has(key));
}

function selectedCourses(){
  ensureCourseState();
  return state.selectedCourses.map(key=>byKey.get(key)).filter(Boolean);
}

function entriesForSelected(){
  const keys=new Set(state.selectedCourses||[]);
  return STUDY_DATA.filter(e=>keys.has(courseKeyForEntry(e)));
}

function courseMastery(course){
  const ids=new Set(course.topics.map(t=>t.id));
  const rows=Object.values(state.mastery||{}).filter(m=>m&&m.kind==='curriculum'&&ids.has(m.topicId)&&m.attempts>0);
  if(!rows.length)return {score:null,practiced:0};
  return {score:Math.round(rows.reduce((sum,row)=>sum+(Number(row.score)||0),0)/rows.length),practiced:rows.length};
}

function selectedMastery(){
  const ids=new Set(entriesForSelected().map(t=>t.id));
  const rows=Object.values(state.mastery||{}).filter(m=>m&&m.kind==='curriculum'&&ids.has(m.topicId)&&m.attempts>0);
  if(!rows.length)return {score:null,practiced:0};
  return {score:Math.round(rows.reduce((sum,row)=>sum+(Number(row.score)||0),0)/rows.length),practiced:rows.length};
}

// The Class 9 Mathematics reader stores lesson checkboxes separately from
// chapter completion. Use its public progress API without duplicating state.
function entryProgress(entry){
  const value=window.StudyAIProgress?.summary?.(entry.id);
  if(value&&Number.isInteger(value.total)&&value.total>0){
    return {done:Math.min(value.total,Math.max(0,value.done||0)),total:value.total,unit:'lessons'};
  }
  return {done:(state.completed||[]).includes(entry.id)?1:0,total:1,unit:'topics'};
}

function progressForEntries(entries){
  return entries.reduce((sum,entry)=>{
    const progress=entryProgress(entry);
    sum.done+=progress.done;
    sum.total+=progress.total;
    return sum;
  },{done:0,total:0});
}

function nextDestination(entries=entriesForSelected()){
  if(!entries.length)return null;
  const recent=state.studyaiLastLesson;
  const last=entries.find(e=>e.id===state.lastTopic)||
    entries.find(e=>e.id===recent?.topicId);
  const target=(last&&entryProgress(last).done<entryProgress(last).total?last:null)||
    entries.find(e=>entryProgress(e).done<entryProgress(e).total)||
    last||entries[0];
  let lessonIndex=null;
  const lessons=window.CBSE_CLASS9_MATH_FULL_NOTES?.[target.title]?.sections;
  if(target.board==='CBSE'&&target.grade==='Class 9'&&target.subject==='Mathematics'&&
      Array.isArray(lessons)&&window.StudyAIProgress?.summary?.(target.id)){
    const ignored=new Set(['Chapter coverage','Exam application','Common traps and final checks','Mastery check']);
    const titles=lessons.filter(l=>l&&typeof l.title==='string'&&
      l.title.trim()&&!ignored.has(l.title.trim()));
    if(recent?.topicId===target.id&&Number.isInteger(recent.index)&&recent.index>=0&&recent.index<titles.length){
      lessonIndex=recent.index;
    }else{
      const done=new Set(window.StudyAIProgress.completedKeys(target.id));
      const appeared=new Map();
      lessonIndex=titles.findIndex(unit=>{
        const name=unit.title.trim();
        const n=appeared.get(name)||0;
        appeared.set(name,n+1);
        return !done.has(n?name+' #'+(n+1):name);
      });
      if(lessonIndex<0)lessonIndex=0;
    }
    return {entry:target,lessonIndex,lessonTitle:titles[lessonIndex]?.title||null};
  }
  return {entry:target,lessonIndex:null,lessonTitle:null};
}

function openEntry(entry,lessonIndex=null){
  if(!entry)return;
  current={board:entry.board,grade:entry.grade,subject:entry.subject,component:'All components',topic:entry.title,topicId:entry.id};
  renderFilters();
  openTopic(entry.title,entry.id);
  location.hash='#study';
  if(Number.isInteger(lessonIndex))window.StudyAILessonReader?.goTo?.(lessonIndex);
}

function openCourse(course){
  if(!course)return;
  const destination=nextDestination(course.topics);
  if(destination)openEntry(destination.entry,destination.lessonIndex);
}

function setText(id,value){
  const el=q(id);
  if(el)el.textContent=value;
}

function render(){
  ensureCourseState();
  const picked=selectedCourses();
  const entries=entriesForSelected();
  const done=entries.filter(e=>(state.completed||[]).includes(e.id)).length;
  const units=progressForEntries(entries);
  const pct=units.total?Math.round(units.done/units.total*100):0;
  const mastery=selectedMastery();
  let reviewCount=0;
  try{reviewCount=smartReviewCandidates().total||0}catch(_){}

  setText('#dashboard-course-count',String(picked.length));
  setText('#dashboard-topic-progress',entries.length?done+' / '+entries.length:'—');
  setText('#dashboard-mastery',mastery.score==null?'—':mastery.score+'%');
  setText('#dashboard-review-count',String(reviewCount));

  const percent=q('#hero-percent');if(percent)percent.textContent=pct+'%';
  const progress=q('#hero-progress');if(progress)progress.style.width=pct+'%';
  setText('#hero-completed',String(units.done));
  setText('#hero-review',String(reviewCount));
  setText('#hero-average',mastery.score==null?'—':mastery.score+'%');

  const grid=q('#my-course-grid');
  const empty=q('#course-empty-state');
  if(grid){
    grid.innerHTML=picked.map(course=>{
      const completed=course.topics.filter(e=>(state.completed||[]).includes(e.id)).length;
      const progress=progressForEntries(course.topics);
      const cpct=progress.total?Math.round(progress.done/progress.total*100):0;
      const kind=progress.total===course.topics.length?'topics':'study units';
      const masteryInfo=courseMastery(course);
      return `<article class="course-card" data-course="${escDash(course.key)}">
        <div class="course-card-top">
          <span class="course-subject-mark" aria-hidden="true">${escDash(course.subject.charAt(0))}</span>
          <button class="course-remove" type="button" data-remove-course="${escDash(course.key)}" aria-label="Remove ${escDash(course.subject)} from My Courses">Remove</button>
        </div>
        <div class="course-card-body">
          <span class="small-label">${escDash(course.board)} · ${escDash(course.grade)}</span>
          <h3>${escDash(course.subject)}</h3>
          <p>${course.topics.length} topics · ${completed} chapters/topics finished</p>
          <div class="course-progress" role="progressbar" aria-label="${escDash(course.subject)} completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${cpct}"><span style="width:${cpct}%"></span></div>
          <div class="course-card-stats"><span><strong>${progress.done} / ${progress.total}</strong> ${kind}</span><span><strong>${masteryInfo.score==null?'—':masteryInfo.score+'%'}</strong> mastery</span></div>
        </div>
        <button class="button secondary full course-open" type="button" data-open-course="${escDash(course.key)}">Open course →</button>
      </article>`;
    }).join('');
    qa('[data-open-course]',grid).forEach(btn=>btn.addEventListener('click',()=>openCourse(byKey.get(btn.dataset.openCourse))));
    qa('[data-remove-course]',grid).forEach(btn=>btn.addEventListener('click',()=>{
      state.selectedCourses=(state.selectedCourses||[]).filter(key=>key!==btn.dataset.removeCourse);
      save();
      render();
      try{toast('Course removed from your dashboard')}catch(_){}
    }));
  }
  if(empty)empty.classList.toggle('hidden',picked.length>0);

  const next=nextDestination(entries);
  const nextBox=q('#dashboard-next-topic');
  if(nextBox){
    if(!next){
      nextBox.innerHTML='<div><span class="small-label">Continue studying</span><h3>Add your first course</h3><p>Your next topic will appear here once you choose what you are studying.</p></div><button class="button primary" type="button" data-dashboard-add>Add course</button>';
    }else{
      const entry=next.entry;
      const title=next.lessonTitle||entry.title;
      nextBox.innerHTML=`<div><span class="small-label">Continue studying · ${escDash(entry.subject)}</span><h3>${escDash(title)}</h3><p>${escDash(entry.board)} · ${escDash(entry.grade)} · ${escDash(entry.title)}${next.lessonTitle?' · Lesson '+(next.lessonIndex+1):''}</p></div><button class="button primary" type="button" id="dashboard-continue">Continue →</button>`;
      q('#dashboard-continue',nextBox)?.addEventListener('click',()=>openEntry(entry,next.lessonIndex));
    }
    q('[data-dashboard-add]',nextBox)?.addEventListener('click',openDialog);
  }

  const summary=q('#hero-next');
  if(summary)summary.textContent=next?('Next: '+(next.lessonTitle||next.entry.title)):(picked.length?'All selected topics are complete.':'Add your courses to personalise StudyAI.');

  const suggestions=q('#dashboard-study-suggestions');
  if(suggestions){
    const candidates=entries.filter(e=>{
      const p=entryProgress(e);
      return p.done<p.total;
    }).slice(0,3);
    suggestions.innerHTML=candidates.length?candidates.map(entry=>{
      const p=entryProgress(entry);
      return `<article class="dashboard-focus-item">
        <div><span class="small-label">${escDash(entry.subject)} · ${escDash(entry.grade)}</span>
        <h3>${escDash(entry.title)}</h3><p>${p.done} of ${p.total} ${p.unit} completed</p></div>
        <button type="button" class="button secondary compact" data-focus-id="${escDash(entry.id)}">Study →</button>
      </article>`;
    }).join(''):'<p class="dashboard-focus-empty">'+(picked.length?
      'Everything you selected is marked complete. Revisit a course or practise questions.':
      'Add a course to see the next unfinished chapters and lessons.')+'</p>';
    qa('[data-focus-id]',suggestions).forEach(btn=>btn.addEventListener('click',()=>{
      const entry=STUDY_DATA.find(e=>e.id===btn.dataset.focusId);
      if(!entry)return;
      const dest=nextDestination([entry]);
      openEntry(entry,dest?.lessonIndex??null);
    }));
  }
}

function fill(select,items,value){
  if(!select)return;
  select.innerHTML=items.map(item=>`<option value="${escDash(item)}"${item===value?' selected':''}>${escDash(item)}</option>`).join('');
}

function refreshDialog(){
  const board=q('#course-board'),grade=q('#course-grade'),subject=q('#course-subject');
  const boards=[...new Set(courses.map(c=>c.board))];
  const boardValue=boards.includes(board?.value)?board.value:boards[0];
  fill(board,boards,boardValue);
  const grades=[...new Set(courses.filter(c=>c.board===boardValue).map(c=>c.grade))];
  const gradeValue=grades.includes(grade?.value)?grade.value:grades[0];
  fill(grade,grades,gradeValue);
  const subjects=[...new Set(courses.filter(c=>c.board===boardValue&&c.grade===gradeValue).map(c=>c.subject))];
  const subjectValue=subjects.includes(subject?.value)?subject.value:subjects[0];
  fill(subject,subjects,subjectValue);
  const key=courseKey(boardValue,gradeValue,subjectValue);
  const selected=(state.selectedCourses||[]).includes(key);
  const button=q('#add-course-confirm');
  if(button){button.disabled=selected;button.textContent=selected?'Already added':'Add course';}
  const meta=q('#course-dialog-meta');
  const course=byKey.get(key);
  if(meta&&course)meta.textContent=`${course.topics.length} StudyAI topics available for this course.`;
}

function openDialog(){
  refreshDialog();
  const dialog=q('#add-course-dialog');
  if(dialog&&!dialog.open)dialog.showModal();
}

function addSelectedCourse(){
  const board=q('#course-board')?.value,grade=q('#course-grade')?.value,subject=q('#course-subject')?.value;
  const key=courseKey(board,grade,subject);
  if(!byKey.has(key))return;
  ensureCourseState();
  if(!state.selectedCourses.includes(key))state.selectedCourses.push(key);
  save();
  q('#add-course-dialog')?.close();
  render();
  try{toast(subject+' added to My Courses')}catch(_){}
}

function bind(){
  if(typeof STUDY_DATA==='undefined'||typeof state==='undefined'){
    window.addEventListener('studyai:curriculum-ready',bind,{once:true});
    return;
  }
  courses=buildCourseCatalogue();
  byKey=new Map(courses.map(c=>[c.key,c]));
  catalogueReady=true;
  ensureCourseState();
  q('#open-add-course')?.addEventListener('click',openDialog);
  q('#dashboard-add-another')?.addEventListener('click',openDialog);
  q('#course-empty-add')?.addEventListener('click',openDialog);
  q('#course-dialog-close')?.addEventListener('click',()=>q('#add-course-dialog')?.close());
  q('#course-board')?.addEventListener('change',refreshDialog);
  q('#course-grade')?.addEventListener('change',refreshDialog);
  q('#course-subject')?.addEventListener('change',refreshDialog);
  q('#add-course-confirm')?.addEventListener('click',addSelectedCourse);
  q('#add-course-dialog')?.addEventListener('click',event=>{
    const dialog=event.currentTarget;
    if(event.target===dialog)dialog.close();
  });
  window.addEventListener('studyai:state-changed',()=>requestAnimationFrame(render));
  // Persist the exact lesson, not merely its parent chapter. This uses the
  // existing save() path, including account sync when the student signs in.
  window.addEventListener('studyai:lesson-changed',event=>{
    const topicId=event.detail?.entryId;
    const index=event.detail?.index;
    if(event.detail?.userInitiated===false)return;
    if(!Number.isInteger(index)||index<0||!STUDY_DATA.some(e=>e.id===topicId&&
        e.board==='CBSE'&&e.grade==='Class 9'&&e.subject==='Mathematics'))return;
    if(state.studyaiLastLesson?.topicId===topicId&&state.studyaiLastLesson.index===index)return;
    state.studyaiLastLesson={topicId,index};
    save();
  });
  window.addEventListener('hashchange',()=>{if(location.hash==='#today')requestAnimationFrame(render)});
  window.addEventListener('load',()=>requestAnimationFrame(render),{once:true});
  window.addEventListener('pageshow',()=>requestAnimationFrame(render));
  render();
}

window.StudyAICourseDashboard={render,openAddCourse:openDialog,courses:()=>courses.slice(),selectedCourses};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();