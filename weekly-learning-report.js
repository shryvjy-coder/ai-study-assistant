/* StudyAI weekly learning report: transparent counts from recorded practice. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=(selector,root=document)=>root.querySelector(selector);
 const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const WEEK=7*24*60*60*1000;
 let copiedReport='';
 function summary(now=Date.now()){
  const s=bridge.exportState(),history=Array.isArray(s.masteryHistory)?s.masteryHistory:[];
  const windowed=history.filter(h=>Number.isFinite(h.at)&&h.at>now-2*WEEK&&h.at<=now);
  const current=windowed.filter(h=>h.at>now-WEEK),previous=windowed.filter(h=>h.at<=now-WEEK);
  const correct=items=>items.filter(h=>h.correct===true).length;
  const unique=[...new Set(current.map(h=>h.key).filter(Boolean))].length;
  const byDay=Array.from({length:7},(_,i)=>{
   const start=now-(6-i)*24*60*60*1000;
   const end=start+24*60*60*1000;
   return current.filter(h=>h.at>=start&&h.at<end).length;
  });
  const mastery=Object.values(s.mastery||{}).filter(v=>v&&v.attempts>0);
  const weak=mastery.filter(v=>v.score<55).sort((a,b)=>a.score-b.score).slice(0,3);
  const open=bridge.getMistakes().filter(v=>(v.status||'open')==='open').length;
  const due=bridge.getReviewSummary().due;
  const goal=Math.max(0,Math.min(500,Number(s.weeklyPracticeGoal)||0));
  return {total:current.length,correct:correct(current),previous:previous.length,previousCorrect:correct(previous),
   unique,byDay,weak,open,due,goal};
 }
 function reportText(data){
  return ['StudyAI · Last seven days','Answered: '+data.total,
   'Correct: '+data.correct+(data.total?' ('+Math.round(100*data.correct/data.total)+'%)':''),
   'Distinct practiced units: '+data.unique,
   'Prior seven days answered: '+data.previous,
   'Open wrong answers: '+data.open,
   'Flashcards due: '+data.due,
   'Weak practiced units: '+(data.weak.length?data.weak.map(v=>v.label+' ('+v.score+'%)').join('; '):'none recorded'),
   data.goal?'Weekly goal: '+data.total+'/'+data.goal:'No weekly goal set'
  ].join('\n');
 }
 function render(){
  const box=$('#weekly-report');if(!box)return;
  const d=summary();
  $('#weekly-answered').textContent=d.total;
  $('#weekly-correct').textContent=d.total?Math.round(100*d.correct/d.total)+'%':'—';
  $('#weekly-units').textContent=d.unique;
  $('#weekly-previous').textContent=d.previous+' answered in the previous seven days';
  $('#weekly-weak').textContent=d.weak.length?d.weak.map(v=>v.label+' ('+v.score+'%)').join(' · '):'No practiced units below 55% currently.';
  $('#weekly-todo').textContent=d.due+' due flashcards · '+d.open+' open wrong answers';
  $('#weekly-goal-progress').textContent=d.goal?d.total+' / '+d.goal+' questions':'No goal set';
  $('#weekly-goal-bar').style.width=d.goal?Math.min(100,100*d.total/d.goal)+'%':'0%';
  $('#weekly-goal-input').value=d.goal||'';
  $('#weekly-goal-note').textContent=d.total<5
   ? 'Very small sample: use this as an activity log, not a measure of ability.'
   : 'Activity and accuracy are from answered practice only; they are not an official exam score.';
  const max=Math.max(1,...d.byDay);
  $('#weekly-chart').innerHTML=d.byDay.map((n,i)=>{
    const label='Day '+(i+1)+': '+n+' question'+(n===1?'':'s');
    return '<div class="weekly-bar-slot" aria-label="'+safe(label)+'"><span style="height:'+Math.max(2,Math.round(100*n/max))+'%"></span><small>'+n+'</small></div>';
  }).join('');
  copiedReport=reportText(d);
 }
 function mount(){
  const anchor=$('#smart-review-queue');
  if(!anchor||$('#weekly-report'))return;
  const section=document.createElement('article');
  section.className='dashboard-card wide weekly-report-card';
  section.id='weekly-report';
  section.innerHTML=[
   '<div class="card-head"><div><span class="small-label">Learning engine · weekly</span><h3>Weekly learning report</h3><p>Track what you actually practiced in the last seven days.</p></div><button type="button" class="button secondary compact" id="weekly-refresh">Refresh report</button></div>',
   '<div class="weekly-metrics">',
   '<div><span>Questions answered</span><strong id="weekly-answered">0</strong><small id="weekly-previous"></small></div>',
   '<div><span>Practice accuracy</span><strong id="weekly-correct">—</strong><small>on answered questions</small></div>',
   '<div><span>Distinct units</span><strong id="weekly-units">0</strong><small>topics and SAT skills</small></div></div>',
   '<div class="weekly-chart" id="weekly-chart" aria-label="Daily practice count"></div>',
   '<p id="weekly-goal-note" class="weekly-note"></p>',
   '<div class="weekly-goal-panel"><div><strong>Weekly practice goal</strong><p>Optional, adjustable, and never required to use StudyAI.</p></div>',
   '<div class="weekly-goal-actions"><label>Questions this week<input type="number" id="weekly-goal-input" min="0" max="500" step="5" placeholder="No goal"></label>',
   '<button type="button" class="button secondary compact" id="weekly-save-goal">Save goal</button></div>',
   '<div class="weekly-goal-track"><span id="weekly-goal-bar" style="width:0%"></span></div><small id="weekly-goal-progress">No goal set</small></div>',
   '<div class="weekly-next"><p><strong>Current attention:</strong> <span id="weekly-weak"></span></p><p><strong>Review backlog:</strong> <span id="weekly-todo"></span></p></div>',
   '<button type="button" class="quiet-button" id="weekly-copy">Copy text report</button>',
   '<span id="weekly-copy-feedback" role="status"></span>'
  ].join('');
  anchor.insertAdjacentElement('afterend',section);
  $('#weekly-refresh').addEventListener('click',render);
  $('#weekly-save-goal').addEventListener('click',()=>{
   bridge.setWeeklyGoal($('#weekly-goal-input').value);
   render();
  });
  $('#weekly-copy').addEventListener('click',async()=>{
   const feedback=$('#weekly-copy-feedback');
   try{
    if(!navigator.clipboard)throw Error('Clipboard unavailable');
    await navigator.clipboard.writeText(copiedReport);
    feedback.textContent='Copied your report.';
   }catch(_){feedback.textContent='Clipboard unavailable. Try copying the visible statistics instead.'}
  });
  window.addEventListener('hashchange',()=>{if(location.hash==='#progress')render()});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
 else mount();
})();