/* Dedicated SAT planner and skill insights. No official score prediction. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=(selector,root=document)=>root.querySelector(selector);
 const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const SECTIONS=['Reading & Writing','Math'];
 const DAY=86400000;
 const bank=bridge.getSatQuestions().filter(q=>q&&q.id&&SECTIONS.includes(q.section)&&q.domain&&q.skill);
 let lastPlan=null;
 const localDay=()=>{const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate())};
 const dayString=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
 const formatDay=d=>d.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
 function addDays(date,count){const next=new Date(date);next.setDate(next.getDate()+count);return next}
 function parseDay(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;
  const [y,m,d]=value.split('-').map(Number),date=new Date(y,m-1,d);
  return dayString(date)===value?date:null;
 }
 function satSkills(config='both'){
  const available=new Map(),mastery=bridge.getMastery(),mistakes=bridge.getMistakes().filter(m=>m.kind==='sat'&&(m.status||'open')==='open');
  const recent=(bridge.exportState().satHistory||[]).filter(h=>h&&h.date&&Date.parse(h.date)>Date.now()-7*DAY);
  bank.forEach(q=>{
   if(config!=='both'&&q.section!==config)return;
   const id=[q.section,q.domain,q.skill].join('|'),key='sat|'+id;
   let skill=available.get(id);
   if(!skill){skill={id,key,section:q.section,domain:q.domain,skill:q.skill,bankCount:0,misses:0,recent:0,score:null,attempts:0};available.set(id,skill)}
   skill.bankCount++;
  });
  available.forEach(skill=>{
   const record=mastery[skill.key];
   skill.attempts=Math.max(0,Number(record?.attempts)||0);
   skill.score=skill.attempts?Math.max(0,Math.min(100,Number(record?.score)||0)):null;
   skill.misses=mistakes.filter(m=>m.section===skill.section&&m.domain===skill.domain&&m.skill===skill.skill).length;
   skill.recent=recent.filter(h=>h.section===skill.section&&h.domain===skill.domain&&h.skill===skill.skill).length;
   // Untested topics are useful coverage targets, not diagnosed weaknesses.
   skill.priority=(skill.score===null?54:100-skill.score)+Math.min(30,skill.misses*12)-Math.min(15,skill.recent*2);
  });
  return [...available.values()].sort((a,b)=>b.priority-a.priority||a.section.localeCompare(b.section)||a.domain.localeCompare(b.domain));
 }
 function openStudio(config){
  const api=window.StudyAIPracticeStudio;
  if(api?.configure)return api.configure(config);
  location.hash='#practice-studio';
  return true;
 }
 function openTask(task){
  if(!task)return;
  if(task.type==='mistakes'){bridge.openMistakes();return}
  if(task.type==='mixed'){
   openStudio({mode:'mixed',section:task.section||'all',count:10});return;
  }
  if(task.type==='sprint'){
   openStudio({mode:'sprint',section:task.section||'all',count:10,time:10});return;
  }
  if(task.type==='diagnostic'){
   openStudio({mode:'diagnostic',section:task.section||'all',count:12});return;
  }
  if(task.type==='skill'){
   openStudio({mode:'custom',section:task.section,domain:task.domain,skill:task.skill,count:task.bankCount>=10?10:5,time:0});
  }
 }
 function build(config,base=localDay()){
  const minutes=Math.max(15,Math.min(240,Math.round(Number(config.minutes)||60)));
  const start=new Date(base.getFullYear(),base.getMonth(),base.getDate());
  let days=config.cram?3:7;
  const exam=parseDay(config.examDate);
  if(config.examDate&&!exam)return {error:'Choose a valid SAT date.'};
  if(exam){
   if(exam<=start)return {error:'Choose a future SAT date. This plan schedules practice before the test day.'};
   let count=0,day=new Date(start);
   while(day<exam&&count<7){count++;day=addDays(day,1)}
   days=Math.min(days,count);
  }
  const section=SECTIONS.includes(config.section)?config.section:'both';
  const skills=satSkills(section);
  if(!skills.length)return {error:'No original SAT questions are available for this selection.'};
  const bySection={
   'Reading & Writing':skills.filter(s=>s.section==='Reading & Writing'),
   'Math':skills.filter(s=>s.section==='Math')
  };
  const cursors={'Reading & Writing':0,'Math':0};
  const satMistakes=bridge.getMistakes().filter(m=>m.kind==='sat'&&(m.status||'open')==='open'
    &&(section==='both'||m.section===section));
  const chosenSections=section==='both'?SECTIONS:[section];
  const plans=[];
  for(let day=0;day<days;day++){
   let budget=minutes;
   const tasks=[],daySections=chosenSections.length===2&&day%2===1?[chosenSections[1],chosenSections[0]]:chosenSections;
   const add=task=>{
    if(budget<8||tasks.length>=5)return false;
    const allocation=Math.min(budget,task.minutes);
    if(allocation<8)return false;
    tasks.push({...task,minutes:allocation});budget-=allocation;return true;
   };
   if(day===0&&skills.every(s=>s.attempts===0)&&budget>=25){
    add({id:'diagnostic|'+day,type:'diagnostic',title:'Start with a short SAT diagnostic',
     detail:'Initial sample of original questions · not an official score',section:section==='both'?'all':section,minutes:25});
   }
   if(satMistakes.length&&budget>=18&&day%2===0){
    add({id:'mistakes|'+day,type:'mistakes',title:'Review missed SAT questions',
     detail:satMistakes.length+' open SAT mistake'+(satMistakes.length===1?'':'s')+' · open notebook',
     minutes:12});
   }
   let turns=0;
   while(budget>=15&&tasks.length<4&&turns<10){
    const selectedSection=daySections[turns%daySections.length];
    const pool=bySection[selectedSection];
    turns++;
    if(!pool?.length)continue;
    const index=cursors[selectedSection]++%pool.length,skill=pool[index];
    const context=skill.score===null?'No recorded practice yet':
     skill.score+'% early mastery estimate from '+skill.attempts+' answer'+(skill.attempts===1?'':'s');
    if(!add({id:'skill|'+day+'|'+skill.id,type:'skill',section:skill.section,domain:skill.domain,skill:skill.skill,
      bankCount:skill.bankCount,title:skill.skill,detail:skill.section+' · '+skill.domain+' · '+context,
      minutes:Math.min(25,Math.max(15,Math.round(minutes*.4)))}))break;
   }
   if(budget>=10&&tasks.length<5){
    const mixSection=section==='both'?'all':section;
    const type=day===days-1?'sprint':'mixed';
    add({id:type+'|'+day,type,section:mixSection,
      title:type==='sprint'?'Finish with a short timed sprint':'Mixed SAT retrieval',
      detail:type==='sprint'?'Timed original questions · review explanations afterward':'Revisit skills across domains',
      minutes:type==='sprint'?15:18});
   }
   plans.push({date:dayString(addDays(start,day)),items:tasks,unused:budget});
  }
  return {version:1,generatedAt:Date.now(),minutes,section,examDate:config.examDate||'',cram:!!config.cram,
   days:plans,completed:{},diagnosticEvidence:skills.some(x=>x.attempts>0),skillCount:skills.length,mistakeCount:satMistakes.length};
 }
 function render(plan){
  const box=$('#satplan-output');if(!box)return;
  if(plan.error){box.innerHTML='<p role="alert" class="ps-plan-error">'+safe(plan.error)+'</p>';return}
  lastPlan=plan;
  $('#satplan-heading').textContent=plan.cram?'SAT cram · '+plan.days.length+' days':'Your SAT '+plan.days.length+'-day plan';
  const label=plan.section==='both'?'Both SAT sections':plan.section;
  const totalTasks=plan.days.reduce((n,d)=>n+d.items.length,0);
  const done=plan.days.reduce((n,d)=>n+d.items.filter(t=>plan.completed?.[d.date+'|'+t.id]).length,0);
  box.innerHTML='<div class="satplan-intro">Created '+new Date(plan.generatedAt).toLocaleString()+
   ' · '+safe(label)+' · '+plan.minutes+' minutes/day · '+done+'/'+totalTasks+' tasks marked done'+(plan.examDate?' · SAT '+safe(plan.examDate):'')+
   '<p>Based on recorded practice, open mistakes and available original questions. Regenerate when your practice changes.</p></div>'+
   plan.days.map((day,index)=>{
    const d=parseDay(day.date),total=day.items.reduce((n,item)=>n+item.minutes,0);
    const completed=day.items.filter(task=>plan.completed?.[day.date+'|'+task.id]).length;
    return '<section class="satplan-day"><div class="satplan-day-head"><strong>Day '+(index+1)+' · '+formatDay(d)+'</strong><span>'+total+' planned min · '+completed+'/'+day.items.length+' done</span></div>'+
     (day.items.length?day.items.map((task,i)=>{
      const key=day.date+'|'+task.id,isDone=!!plan.completed?.[key];
      return '<div class="satplan-task-row '+(isDone?'is-complete':'')+'">'+
       '<button type="button" class="satplan-task" data-satplan-day="'+index+'" data-satplan-item="'+i+'">'+
       '<span><strong>'+safe(task.title)+'</strong><small>'+safe(task.detail)+'</small></span><span>'+task.minutes+' min →</span></button>'+
       '<button type="button" class="satplan-check" data-satplan-check="'+safe(key)+'" aria-pressed="'+isDone+'">'+(isDone?'✓ Done':'Mark done')+'</button></div>';
     }).join(''):'<p class="muted">Light review or rest today.</p>')+'</section>';
   }).join('')+
   '<p class="satplan-note">Practice times are estimates. StudyAI does not predict your official SAT score. The current question bank is limited and repeated attempts reduce diagnostic value.</p>';
 }
 function generate(cram=false){
  const config={section:$('#satplan-section').value,minutes:Number($('#satplan-minutes').value),
   examDate:$('#satplan-date').value,cram};
  const plan=build(config);
  if(!plan.error){
   bridge.setSatPlanPrefs(config);
   bridge.saveSatPlan(plan);
  }
  render(plan);
 }
 function renderInsights(){
  const holder=$('#sat-skill-insights');if(!holder)return;
  const h=(bridge.exportState().satHistory||[]).filter(x=>x&&x.section&&x.domain&&Number.isFinite(Number(x.correct)));
  const total=h.length,correct=h.filter(x=>x.correct===1).length;
  $('#sat-insight-total').textContent=total;
  $('#sat-insight-accuracy').textContent=total?Math.round(100*correct/total)+'%':'—';
  $('#sat-insight-skills').textContent=new Set(h.map(x=>x.section+'|'+x.domain+'|'+x.skill)).size;
  const grouped=new Map();
  h.forEach(row=>{
   const key=row.section+'|'+row.domain;
   let g=grouped.get(key);
   if(!g){g={section:row.section,domain:row.domain,answered:0,correct:0,skills:new Set()};grouped.set(key,g)}
   g.answered++;g.correct+=row.correct===1?1:0;if(row.skill)g.skills.add(row.skill);
  });
  const rows=[...grouped.values()].sort((a,b)=>a.section.localeCompare(b.section)||a.domain.localeCompare(b.domain));
  const list=$('#sat-insight-list');
  list.innerHTML=rows.length?rows.map((g,i)=>{
   const pct=Math.round(100*g.correct/g.answered);
   return '<button type="button" class="sat-insight-row" data-sat-insight="'+i+'">'+
    '<span><strong>'+safe(g.domain)+'</strong><small>'+safe(g.section)+' · '+g.answered+' answered · '+g.skills.size+' practiced skills</small></span>'+
    '<span class="sat-insight-track"><span style="width:'+pct+'%"></span></span>'+
    '<strong>'+pct+'%</strong></button>';
  }).join(''):'<p class="muted">Your SAT domain breakdown appears after you answer practice questions.</p>';
  list.onclick=event=>{
   const el=event.target.closest('[data-sat-insight]');
   if(!el)return;
   const item=rows[Number(el.dataset.satInsight)];
   if(item)openStudio({mode:'custom',section:item.section,domain:item.domain,count:10});
  };
  $('#sat-insight-note').textContent=total<12
   ? 'Small sample: these are recorded practice results, not a standardized assessment.'
   : 'Accuracy reflects your answered StudyAI questions and may include repeat attempts.';
 }
 function mount(){
  const planner=$('#planner .shell');
  if(!planner||$('#sat-study-planner'))return;
  const section=document.createElement('section');
  section.id='sat-study-planner';section.className='satplan';
  section.innerHTML='<header class="satplan-header"><div><p class="kicker">Dedicated exam pathway</p><h2>SAT study planner.</h2><p>Make a separate, practical plan for Reading & Writing and Math, using your actual practice history.</p></div></header>'+
   '<div class="satplan-layout"><div class="satplan-form">'+
   '<label>Section<select id="satplan-section"><option value="both">Both sections</option><option value="Reading &amp; Writing">Reading &amp; Writing</option><option value="Math">Math</option></select></label>'+
   '<label>Minutes per day<input id="satplan-minutes" type="number" min="15" max="240" step="5" value="60"></label>'+
   '<label>SAT date (optional)<input id="satplan-date" type="date" min="'+dayString(localDay())+'"></label>'+
   '<p class="satplan-evidence" id="satplan-evidence"></p>'+
   '<button class="button primary" type="button" id="satplan-generate">Build SAT plan</button>'+
   '<button class="button secondary compact" type="button" id="satplan-cram">Three-day SAT cram</button>'+
   '<p class="satplan-note">Only original StudyAI questions are used. Official Bluebook exams are separate.</p></div>'+
   '<div class="dashboard-card satplan-results"><div class="card-head"><div><span class="small-label">Your next sessions</span><h3 id="satplan-heading">Your SAT plan</h3></div></div>'+
   '<div id="satplan-output"><p class="muted">Choose your time and section, then generate a plan.</p></div></div></div>';
  planner.appendChild(section);
  const prefs=bridge.getSatPlanPrefs()||{};
  if(SECTIONS.includes(prefs.section))$('#satplan-section').value=prefs.section;
  if(Number.isFinite(Number(prefs.minutes))&&Number(prefs.minutes)>=15)$('#satplan-minutes').value=prefs.minutes;
  if(prefs.examDate&&parseDay(prefs.examDate)>=localDay())$('#satplan-date').value=prefs.examDate;
  function evidence(){
   const skills=satSkills($('#satplan-section').value);
   const practiced=skills.filter(x=>x.attempts>0).length;
   $('#satplan-evidence').textContent=skills.length+' available skills · '+practiced+' practiced · '+skills.filter(x=>x.misses>0).length+' with open mistakes';
  }
  $('#satplan-section').addEventListener('change',evidence);
  $('#satplan-generate').addEventListener('click',()=>generate(false));
  $('#satplan-cram').addEventListener('click',()=>generate(true));
  $('#satplan-output').addEventListener('click',e=>{
   const check=e.target.closest('[data-satplan-check]');
   if(check&&lastPlan){
    const key=check.dataset.satplanCheck;
    if(!lastPlan.completed||typeof lastPlan.completed!=='object')lastPlan.completed={};
    if(lastPlan.completed[key])delete lastPlan.completed[key];
    else lastPlan.completed[key]=true;
    bridge.saveSatPlan(lastPlan);
    render(lastPlan);
    return;
   }
   const button=e.target.closest('[data-satplan-day][data-satplan-item]');
   if(!button)return;
   const day=lastPlan?.days[Number(button.dataset.satplanDay)];
   const task=day?.items[Number(button.dataset.satplanItem)];
   if(task)openTask(task);
  });
  const saved=bridge.getSatPlan();
  if(saved?.version===1&&Array.isArray(saved.days))render(saved);
  evidence();
  const progress=$('#smart-review-queue');
  if(progress&&!$('#sat-skill-insights')){
   const insights=document.createElement('article');
   insights.className='dashboard-card wide sat-insights';insights.id='sat-skill-insights';
   insights.innerHTML='<div class="card-head"><div><span class="small-label">SAT practice · evidence</span><h3>SAT skill insights</h3><p>Actual answered practice by section and domain, connected to targeted study.</p></div>'+
    '<button class="button secondary compact" type="button" id="sat-insight-refresh">Refresh insights</button></div>'+
    '<div class="sat-insight-metrics"><div><span>Answered</span><strong id="sat-insight-total">0</strong></div>'+
    '<div><span>Accuracy</span><strong id="sat-insight-accuracy">—</strong></div>'+
    '<div><span>Practiced skills</span><strong id="sat-insight-skills">0</strong></div></div>'+
    '<div id="sat-insight-list" class="sat-insight-list"></div><p id="sat-insight-note" class="satplan-note"></p>';
   progress.insertAdjacentElement('afterend',insights);
   $('#sat-insight-refresh').addEventListener('click',renderInsights);
   window.addEventListener('hashchange',()=>{if(location.hash==='#progress')renderInsights()});
   document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderInsights()});
   renderInsights();
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
 else mount();
})();