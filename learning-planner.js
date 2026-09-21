/* Deadlines and planner integration. Dates are local calendar dates, never UTC slices. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=s=>document.querySelector(s);
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dayString=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
 function parseDay(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;
  const [y,m,d]=value.split('-').map(Number),date=new Date(y,m-1,d);
  return dayString(date)===value?date:null;
 }
 const calendarNumber=value=>{const d=parseDay(value);return d?Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000:null};
 const daysAway=(value,now=Date.now())=>calendarNumber(value)-calendarNumber(dayString(new Date(now)));
 const goals=()=>bridge.getGoals().filter(g=>g&&typeof g.id==='string'&&parseDay(g.date));
 const planFor=kind=>kind==='sat'?bridge.getSatPlan():bridge.getPlanner();
 function tasks(kind){
  const plan=planFor(kind);
  return (Array.isArray(plan?.days)?plan.days:[]).flatMap(day=>
   (Array.isArray(day.items)?day.items:[]).filter(t=>t&&t.id).map(task=>({
    kind,date:day.date,key:day.date+'|'+task.id,task,done:!!plan.completed?.[day.date+'|'+task.id]
   }))).filter(t=>parseDay(t.date));
 }
 function taskUnit(task){
  return task.unit||(task.topicId?'curriculum|'+task.topicId:
   task.type==='skill'?['sat',task.section,task.domain,task.skill].join('|'):'');
 }
 function recommendations(now=Date.now()){
  const today=dayString(new Date(now)),items=[],seen=new Set();
  ['school','sat'].forEach(kind=>tasks(kind).filter(t=>!t.done&&t.date<=today).sort((a,b)=>a.date.localeCompare(b.date)).forEach(row=>{
   const unit=taskUnit(row.task),unique=unit||kind+'|'+row.task.id;
   if(seen.has(unique))return;
   // Due cards already have a dedicated live action in the core queue.
   if(row.task.kind==='due')return;
   seen.add(unique);
   const overdue=row.date<today;
   items.push({key:'planned|'+kind+'|'+row.key,type:'planned',kind,taskKey:row.key,unit,
    priority:overdue?120+Math.min(8,-daysAway(row.date,now)):100,
    title:row.task.title,detail:(overdue?'Overdue from '+row.date:'Scheduled for today')+' · '+row.task.minutes+' planned minutes.',
    label:kind==='sat'?'SAT plan':'School plan',meta:row.date,action:'Open session'});
  }));
  goals().filter(g=>!g.done&&daysAway(g.date,now)<=7).forEach(g=>{
   const delta=daysAway(g.date,now);
   items.push({key:'goal|'+g.id,type:'goal',goalId:g.id,unit:g.topicId?'curriculum|'+g.topicId:'',
    priority:delta<0?124:delta===0?118:90+(7-delta)*3,title:g.title,
    detail:delta<0?'Deadline overdue since '+g.date:delta===0?'Deadline today':'Deadline in '+delta+' day'+(delta===1?'':'s'),
    label:'Your deadline',meta:g.pathway,action:g.topicId?'Open topic':'Open plan'});
  });
  return items;
 }
 function open(item){
  if(item.type==='planned'){
   const row=tasks(item.kind).find(t=>t.key===item.taskKey);
   if(!row)return;
   (item.kind==='sat'?window.StudyAISatPlanner:window.StudyAISchoolPlanner)?.openTask(row.task);
  }else{
   const goal=goals().find(g=>g.id===item.goalId);
   if(goal?.topicId)bridge.openTopic(goal.topicId);
   else location.hash=goal?.pathway==='SAT'?'#sat-study-planner':'#planner';
  }
 }
 function nextExam(pathway){
  const today=dayString(new Date());
  return goals().filter(g=>!g.done&&g.type==='exam'&&g.date>today&&
   (g.pathway===pathway||(pathway==='All'&&g.pathway!=='SAT'))).sort((a,b)=>a.date.localeCompare(b.date))[0]||null;
 }
 function topicTasks(board){
  return goals().filter(g=>!g.done&&g.topicId&&(board==='All'||g.pathway===board))
   .sort((a,b)=>a.date.localeCompare(b.date)).filter((g,i,all)=>all.findIndex(x=>x.topicId===g.topicId)===i)
   .map(g=>({kind:'goal',id:'goal|'+g.id,title:g.title,detail:'Your deadline: '+g.date,
    topicId:g.topicId,board:g.pathway,deadline:g.date,minutes:20}));
 }
 function reservedMinutes(kind){
  // Include completed work: finishing a task does not create extra minutes in that day.
  return tasks(kind).reduce((out,row)=>{out[row.date]=(out[row.date]||0)+Math.max(0,Number(row.task.minutes)||0);return out},{});
 }
 function addGoal(data){
  const title=String(data.title||'').trim().slice(0,120),date=parseDay(data.date);
  if(!title||!date)return {error:'Enter a title and a valid date.'};
  if(goals().length>=40)return {error:'You have 40 saved goals. Remove an old goal before adding another.'};
  const pathway=data.pathway==='SAT'?'SAT':bridge.getCurriculum().some(e=>e.board===data.pathway)?data.pathway:'All';
  const entry=bridge.getCurriculum().find(e=>e.id===data.topicId&&e.board===pathway);
  if(data.type==='topic'&&!entry)return {error:'Choose a curriculum topic for this deadline.'};
  if(goals().some(g=>!g.done&&g.title===title&&g.date===data.date&&g.pathway===pathway))return {error:'That goal already exists.'};
  const goal={id:'goal|'+(window.crypto?.randomUUID?.()||Date.now()+'|'+Math.random().toString(36).slice(2)),
   title,date:data.date,pathway,type:['exam','topic','revision'].includes(data.type)?data.type:'revision',
   topicId:data.type==='topic'?entry.id:'',done:false,createdAt:Date.now()};
  bridge.saveGoals([...goals(),goal]);return {goal};
 }
 function toggleTask(kind,key){
  const plan=planFor(kind);
  if(!plan||!tasks(kind).some(row=>row.key===key))return;
  plan.completed=plan.completed||{};
  if(plan.completed[key])delete plan.completed[key];else plan.completed[key]=true;
  (kind==='sat'?bridge.saveSatPlan:bridge.savePlanner)(plan);
  (kind==='sat'?window.StudyAISatPlanner:window.StudyAISchoolPlanner)?.render(plan);
 }
 function render(){
  const list=$('#learning-goal-list'),agenda=$('#learning-agenda');if(!list||!agenda)return;
  list.innerHTML=goals().sort((a,b)=>Number(a.done)-Number(b.done)||a.date.localeCompare(b.date)).map(g=>
   '<div class="learning-goal '+(g.done?'is-complete':'')+'"><div><strong>'+safe(g.title)+'</strong><small>'+safe(g.pathway)+' · '+safe(g.date)+' · '+safe(g.type)+'</small></div>'+
   '<button type="button" class="quiet-button" data-goal-toggle="'+safe(g.id)+'" aria-pressed="'+!!g.done+'">'+(g.done?'Reopen':'Mark done')+'</button>'+
   '<button type="button" class="quiet-button" data-goal-remove="'+safe(g.id)+'" aria-label="Remove '+safe(g.title)+'">Remove</button></div>').join('')||'<p class="muted">No deadlines yet. Add an exam, topic or revision goal.</p>';
  const today=dayString(new Date()),all=[...tasks('school'),...tasks('sat')];
  const pending=all.filter(row=>!row.done&&row.date<=today).sort((a,b)=>a.date.localeCompare(b.date));
  agenda.innerHTML=pending.slice(0,12).map((row,i)=>'<div class="learning-goal"><button type="button" class="ps-plan-task" data-agenda-open="'+i+'"><span><strong>'+safe(row.task.title)+'</strong><small>'+safe(row.kind)+' · '+(row.date<today?'Overdue: ':'Today: ')+safe(row.date)+' · '+row.task.minutes+' min</small></span></button>'+
   '<button type="button" class="satplan-check" data-agenda-done="'+i+'">Mark done</button></div>').join('')||'<p class="muted">No outstanding tasks for today. Generate a plan or open your review queue.</p>';
  agenda.onclick=e=>{
   const button=e.target.closest('[data-agenda-open],[data-agenda-done]');if(!button)return;
   const row=pending[Number(button.dataset.agendaOpen??button.dataset.agendaDone)];if(!row)return;
   if(button.hasAttribute('data-agenda-done'))toggleTask(row.kind,row.key);
   else open({type:'planned',kind:row.kind,taskKey:row.key});
  };
  const allocations=all.filter(row=>row.date===today).reduce((n,row)=>n+Number(row.task.minutes||0),0);
  const done=all.filter(row=>row.date===today&&row.done).length;
  $('#learning-agenda-summary').textContent=allocations+' planned minutes today · '+done+' tasks marked done · '+pending.length+' outstanding today or overdue';
 }
 function mount(){
  const planner=$('#planner .shell');if(!planner||$('#learning-goals'))return;
  const section=document.createElement('section');section.id='learning-goals';section.className='dashboard-card learning-goals';
  section.innerHTML='<h3>Goals and deadlines</h3><p>Link an exam, topic or revision deadline to your plans. Marking it done does not change mastery.</p>'+
   '<form id="learning-goal-form" class="learning-goal-form"><label>Goal<input name="title" maxlength="120" required placeholder="Revise electrostatics"></label>'+
   '<label>Pathway<select name="pathway" id="goal-pathway"><option>All</option><option>SAT</option>'+[...new Set(bridge.getCurriculum().map(e=>e.board))].map(b=>'<option>'+safe(b)+'</option>').join('')+'</select></label>'+
   '<label>Type<select name="type" id="goal-type"><option value="exam">Exam</option><option value="revision">Revision</option><option value="topic">Topic deadline</option></select></label>'+
   '<label>Date<input name="date" type="date" required></label><label id="goal-topic-label" hidden>Topic<select name="topicId" id="goal-topic"></select></label>'+
   '<button type="submit" class="button primary compact">Save goal</button></form><p id="learning-goal-message" role="status"></p><div id="learning-goal-list"></div>'+
   '<h3>Today and overdue</h3><p id="learning-agenda-summary"></p><div id="learning-agenda"></div>'+
   '<p class="muted">Each planner treats your minutes per day as a combined budget and reserves time used by the other saved plan. Existing plans remain until you regenerate them.</p>';
  planner.appendChild(section);
  const updateTopics=()=>{
   const board=$('#goal-pathway').value,topic=$('#goal-type').value==='topic';
   $('#goal-topic-label').hidden=!topic;$('#goal-topic').required=topic;
   $('#goal-topic').innerHTML='<option value="">Choose a topic</option>'+bridge.getCurriculum().filter(e=>e.board===board).map(e=>'<option value="'+safe(e.id)+'">'+safe(e.grade+' · '+e.subject+' · '+e.title)+'</option>').join('');
  };
  $('#goal-pathway').addEventListener('change',updateTopics);$('#goal-type').addEventListener('change',updateTopics);updateTopics();
  $('#learning-goal-form').addEventListener('submit',e=>{
   e.preventDefault();const result=addGoal(Object.fromEntries(new FormData(e.currentTarget)));
   $('#learning-goal-message').textContent=result.error||'Goal saved. Regenerate your plan to include the new deadline.';
   if(!result.error)e.currentTarget.elements.title.value='';
  });
  $('#learning-goal-list').addEventListener('click',e=>{
   const toggle=e.target.closest('[data-goal-toggle]'),remove=e.target.closest('[data-goal-remove]');
   if(toggle)bridge.saveGoals(goals().map(g=>g.id===toggle.dataset.goalToggle?{...g,done:!g.done}:g));
   if(remove)bridge.saveGoals(goals().filter(g=>g.id!==remove.dataset.goalRemove));
  });
  render();if(typeof renderSmartReviewQueue==='function')renderSmartReviewQueue();
 }
 window.StudyAIPlanning={recommendations,open,nextExam,topicTasks,reservedMinutes,addGoal,toggleTask,parseDay};
 let refreshPending=false;
 window.addEventListener('studyai:state-changed',()=>{
  if(refreshPending)return;refreshPending=true;
  queueMicrotask(()=>{refreshPending=false;render();if(typeof renderSmartReviewQueue==='function')renderSmartReviewQueue()});
 });
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
 setInterval(render,60000);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
