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
  const pool=bridge.getReviewQueue(100).items.map(taskFor)
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
  return [...pool,...additions];
 }
 function calculate(config){
  const start=today();
  let days=7;
  if(config.examDate){
   const [y,m,d]=config.examDate.split('-').map(Number);
   const exam=new Date(y,m-1,d);
   if(!Number.isFinite(exam.getTime())||exam<start)return {error:'Choose an exam date that is today or later.'};
   days=Math.min(config.cram?3:7,Math.round((exam-start)/86400000)+1);
  }else if(config.cram)days=3;
  const minutes=Math.max(15,Math.min(240,Number(config.minutes)||60));
  const queue=candidates(config.board);
  let index=0;
  const schedule=Array.from({length:days},(_,i)=>{
   let budget=minutes;
   const actions=[];
   while(index<queue.length&&actions.length<4&&budget>=5){
    const entry=queue[index];
    const time=Math.min(entry.minutes,budget);
    if(time<5)break;
    actions.push({...entry,minutes:time});index++;budget-=time;
   }
   return {date:isoLocal(addDays(start,i)),items:actions,unused:budget};
  });
  return {version:1,generatedAt:Date.now(),board:config.board,examDate:config.examDate||'',cram:!!config.cram,minutes,days:schedule,remaining:Math.max(0,queue.length-index)};
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
      (day.items.length?day.items.map(task=>'<button type="button" class="ps-plan-task" data-plan-task="'+safe(task.id)+'">'+
       '<span><strong>'+safe(task.title)+'</strong><small>'+safe(task.detail)+'</small></span><span>'+task.minutes+' min →</span></button>').join(''):'<p class="muted">Catch up, rest, or revisit something you want to clarify.</p>')+
      '</section>';
   }).join('')+
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
   const target=e.target.closest('[data-plan-task]');
   const task=lastPlan?.days.flatMap(d=>d.items).find(t=>t.id===target?.dataset.planTask);
   if(task)act(task);
  });
  const saved=bridge.getPlanner();
  if(saved?.version===1&&Array.isArray(saved.days))render(saved);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
 else mount();
})();