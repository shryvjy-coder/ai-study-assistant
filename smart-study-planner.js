/* StudyAI Smart Planner: local-first priorities, no prediction or AI costs. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let lastPlan=null;
 const today=()=>{
  const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate());
 };
 const isoLocal=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
 const formatDate=date=>date.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
 function addDays(day,offset){const next=new Date(day);next.setDate(day.getDate()+offset);return next}
 function boardOfTask(task){
  if(task.kind==='due')return 'All';
  if(task.kind==='flag')return bridge.getCurriculum().find(e=>e.id===task.topicId)?.board||'All';
  if(task.kind==='mistake'){
   const item=bridge.getMistakes().find(m=>m.id===task.mistakeId);
   return item?.kind==='curriculum'?item.board||'All':'SAT';
  }
  if(task.kind==='mastery'){
   const r=bridge.getMastery()[task.unit];
   return r?.kind==='curriculum'?r.board||'All':'SAT';
  }
  return task.board||'All';
 }
 function taskFor(item){
  const minutes=item.type==='due'?Math.min(20,Math.max(5,Math.ceil(bridge.getReviewSummary().due*.7))):
   item.type==='mistake'?12:item.type==='mastery'?18:20;
  return {kind:item.type,title:item.title,detail:item.detail,minutes,
   unit:item.unit||'',topicId:item.topicId||'',mistakeId:item.mistakeId||'',id:item.key};
 }
 function candidates(board){
  const pool=bridge.getReviewQueue(100).items.filter(item=>!['planned','goal'].includes(item.type)).map(taskFor)
   .filter(t=>board==='All'||boardOfTask(t)===board||t.kind==='due');
  const picked=new Set(pool.filter(t=>t.kind==='flag'||t.kind==='mastery').map(t=>t.topicId||t.unit));
  const currentId=bridge.exportState()?.lastTopic;
  const currentEntry=bridge.getCurriculum().find(e=>e.id===currentId);
  const preferredBoard=board==='All'?(currentEntry?.board||null):board;
  const additions=bridge.getCurriculum().filter(e=>(board==='All'||e.board===board)
   &&!picked.has(e.id)&&!picked.has('curriculum|'+e.id)
   &&!bridge.getMastery()['curriculum|'+e.id]
   &&!(bridge.exportState()?.completed||[]).includes(e.id))
   .sort((a,b)=>{
    const weight=e=>(e.board===preferredBoard?4:0)+(e.grade===currentEntry?.grade?3:0)+(e.subject===currentEntry?.subject?2:0);
    return weight(b)-weight(a)||(a.order||0)-(b.order||0);
   })
   .slice(0,16).map(e=>({kind:'new',id:'new|'+e.id,title:e.title,detail:e.grade+' · '+e.subject,topicId:e.id,board:e.board,minutes:30}));
  const goalTasks=(window.StudyAIPlanning?.topicTasks(board)||[]);
  const goalIds=new Set(goalTasks.map(t=>t.topicId));
  return [...goalTasks,...pool.filter(t=>!goalIds.has(t.topicId||t.unit?.replace(/^curriculum\|/,''))),...additions.filter(t=>!goalIds.has(t.topicId))];
 }
 function calculate(config){
  const start=today();
  let days=7;
  if(config.examDate){
   const [y,m,d]=config.examDate.split('-').map(Number);
   const exam=new Date(y,m-1,d);
   if(isoLocal(exam)!==config.examDate||exam<=start)return {error:'Choose a future exam date. Practice is scheduled before exam day.'};
   days=Math.min(config.cram?3:7,Math.round((exam-start)/86400000));
  }else if(config.cram)days=3;
  const minutes=Math.max(15,Math.min(240,Number(config.minutes)||60));
  const queue=candidates(config.board).map(task=>task.minutes>minutes
   ? {...task,minutes,detail:task.detail+' · focused session within your daily budget'}:task);
  const blocked=window.StudyAIPlanning?.reservedMinutes('sat')||{};
  let unmet=0;
  let index=0;
  const schedule=Array.from({length:days},(_,i)=>{
   const date=isoLocal(addDays(start,i));
   let budget=Math.max(0,minutes-(blocked[date]||0));
   const actions=[];
   while(index<queue.length&&actions.length<4&&budget>=5){
    const entry=queue[index];
    if(entry.deadline&&entry.deadline<date){index++;unmet++;continue}
    const time=entry.minutes;
    if(time>budget)break;
    actions.push({...entry,minutes:time});index++;budget-=time;
   }
   return {date:isoLocal(addDays(start,i)),items:actions,unused:budget};
  });
  return {version:1,generatedAt:Date.now(),board:config.board,examDate:config.examDate||'',cram:!!config.cram,minutes,completed:{},unmet,days:schedule,remaining:Math.max(0,queue.length-index)};
 }
 function render(plan){
  const box=$('#planner-output');if(!box)return;
  if(plan.error){box.innerHTML='<p class="ps-plan-error" role="alert">'+safe(plan.error)+'</p>';return}
  lastPlan=plan;
  $('#planner-heading').textContent=plan.cram?'Exam cram · '+plan.days.length+' day'+(plan.days.length===1?'':'s'):'Your smart '+plan.days.length+'-day plan';
  box.innerHTML='<div class="ps-plan-intro">Created '+new Date(plan.generatedAt).toLocaleString()+' · '+plan.minutes+' min/day'+
   (plan.examDate?' · exam '+safe(plan.examDate):'')+
   '<p>A practical snapshot from the current review queue. Regenerate after practice as your priorities change.</p></div>'+
   plan.days.map((day,i)=>{
    const [y,m,d]=day.date.split('-').map(Number);
    return '<section class="ps-plan-day"><div class="ps-plan-day-heading"><strong>Day '+(i+1)+' · '+formatDate(new Date(y,m-1,d))+'</strong><span>'+day.items.reduce((sum,t)=>sum+t.minutes,0)+' planned minutes</span></div>'+
      (day.items.length?day.items.map(task=>{const key=day.date+'|'+task.id,done=!!plan.completed?.[key];return '<div class="satplan-task-row '+(done?'is-complete':'')+'"><button type="button" class="ps-plan-task" data-plan-task="'+safe(task.id)+'">'+
       '<span><strong>'+safe(task.title)+'</strong><small>'+safe(task.detail)+'</small></span><span>'+task.minutes+' min →</span></button>'+
       '<button type="button" class="satplan-check" data-school-check="'+safe(key)+'" aria-pressed="'+done+'">'+(done?'✓ Done':'Mark done')+'</button></div>'}).join(''):'<p class="muted">Catch up, rest, or revisit something you want to clarify.</p>')+
      '</section>';
   }).join('')+
   (plan.unmet?'<p class="ps-plan-error">'+plan.unmet+' deadline tasks could not fit before their due dates. Adjust your time or deadlines.</p>':'')+
   (plan.remaining?'<p class="ps-plan-more">'+plan.remaining+' more study opportunities remain after this plan. Increase the daily time or regenerate for the next week.</p>':'')+
   '<p class="ps-plan-disclaimer">Estimated times are planning suggestions, not predictions. A task is only completed when you actually study it.</p>';
 }
 function act(task){
  if(!task)return;
  if(task.kind==='due'){bridge.openDue();return}
  if(task.kind==='mistake'){bridge.openMistakes();return}
  if(task.kind==='mastery'){
   const record=bridge.getMastery()[task.unit];
   if(record?.kind==='curriculum'){bridge.openTopic(record.topicId);return}
   if(record?.kind==='sat'){bridge.openSat(record.section,record.domain,record.skill);return}
  }
  if(task.topicId)bridge.openTopic(task.topicId);
 }
 function generate(cram=false){
  const config={minutes:Number($('#daily-time').value),board:$('#planner-board').value,
   examDate:$('#smart-exam-date').value,cram};
  if(!config.examDate)config.examDate=window.StudyAIPlanning?.nextExam(config.board)?.date||'';
  const plan=calculate(config);
  if(!plan.error)bridge.savePlanner(plan);
  render(plan);
 }
 function mount(){
  const form=$('#planner .planner-form');
  if(!form||$('#smart-exam-date'))return;
  const fragment=document.createElement('div');
  fragment.className='ps-planner-extra';
  fragment.innerHTML='<label>Exam date (optional)<input type="date" id="smart-exam-date" min="'+isoLocal(today())+'"></label>'+
   '<small>If the exam is within seven days, the plan adjusts to the available days.</small>'+
   '<button type="button" class="button secondary compact" id="smart-cram">Build three-day cram plan</button>';
  const button=$('#generate-plan');button.insertAdjacentElement('beforebegin',fragment);
  button.textContent='Generate smart plan';
  button.onclick=()=>generate(false);
  $('#smart-cram').addEventListener('click',()=>generate(true));
  $('#planner-output').addEventListener('click',e=>{
   const check=e.target.closest('[data-school-check]');
   if(check&&lastPlan){
    const key=check.dataset.schoolCheck;lastPlan.completed=lastPlan.completed||{};
    if(lastPlan.completed[key])delete lastPlan.completed[key];else lastPlan.completed[key]=true;
    bridge.savePlanner(lastPlan);render(lastPlan);return;
   }
   const target=e.target.closest('[data-plan-task]');
   const task=lastPlan?.days.flatMap(d=>d.items).find(t=>t.id===target?.dataset.planTask);
   if(task)act(task);
  });
  const saved=bridge.getPlanner();
  if(saved?.version===1&&Array.isArray(saved.days))render(saved);
 }
 window.StudyAISchoolPlanner={build:calculate,openTask:act,render};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
 else mount();
})();