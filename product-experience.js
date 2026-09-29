/* StudyAI product experience: Today dashboard, guided sessions, onboarding, evidence confidence. */
(() => {
  'use strict';

  const bridge = window.StudyAIPracticeBridge;
  if (!bridge) return;

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const PREFS_KEY='studyai-product-prefs-v1';
  const SESSION_KEY='studyai-active-session-v1';
  const DAY=24*60*60*1000;
  let onboardingStep=0;

  function readJSON(key,fallback){
    try{return {...fallback,...JSON.parse(localStorage.getItem(key)||'{}')}}
    catch(_){return {...fallback}}
  }
  function prefs(){
    return readJSON(PREFS_KEY,{pathway:'',examDate:'',dailyMinutes:40,onboardingComplete:false,createdAt:0});
  }
  function savePrefs(next){
    const clean={
      pathway:String(next.pathway||'').slice(0,80),
      examDate:/^\d{4}-\d{2}-\d{2}$/.test(next.examDate||'')?next.examDate:'',
      dailyMinutes:[20,40,60,90].includes(Number(next.dailyMinutes))?Number(next.dailyMinutes):40,
      onboardingComplete:!!next.onboardingComplete,
      createdAt:Number(next.createdAt)||Date.now()
    };
    localStorage.setItem(PREFS_KEY,JSON.stringify(clean));
    renderToday();
    return clean;
  }
  function activeSession(){
    try{
      const data=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
      if(!data||!Array.isArray(data.steps)||Date.now()-Number(data.createdAt||0)>DAY)return null;
      return data;
    }catch(_){return null}
  }
  function saveSession(session){
    if(session)localStorage.setItem(SESSION_KEY,JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
    renderToday();
  }

  function state(){return bridge.exportState?.()||{}}
  function hasLearningEvidence(){
    const s=state();
    return (s.masteryHistory?.length||0)+(s.quizHistory?.length||0)+(s.satHistory?.length||0)+
      (s.mistakes?.length||0)+(s.completed?.length||0)+(s.flashcardSchedule?Object.keys(s.flashcardSchedule).length:0)>0;
  }
  function confidence(attempts){
    const n=Math.max(0,Number(attempts)||0);
    if(n>=21)return {label:'Strong evidence',className:'strong',detail:n+' answered questions'};
    if(n>=8)return {label:'Developing evidence',className:'developing',detail:n+' answered questions'};
    if(n>=1)return {label:'Limited evidence',className:'limited',detail:n+' answered question'+(n===1?'':'s')};
    return {label:'No evidence',className:'none',detail:'No answered questions yet'};
  }
  function daysUntil(value){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;
    const [y,m,d]=value.split('-').map(Number);
    const target=new Date(y,m-1,d);target.setHours(0,0,0,0);
    const now=new Date();now.setHours(0,0,0,0);
    return Math.round((target-now)/DAY);
  }

  function queue(){
    const result=bridge.getReviewQueue?.(100);
    return result&&Array.isArray(result.items)?result:{items:[],due:0,mistakes:0,weak:0,total:0};
  }
  function masteryStats(){
    const rows=Object.values(bridge.getMastery?.()||{}).filter(x=>x&&Number(x.attempts)>0);
    const attempts=rows.reduce((n,x)=>n+(Number(x.attempts)||0),0);
    const score=rows.length?Math.round(rows.reduce((n,x)=>n+(Number(x.score)||0),0)/rows.length):null;
    return {rows,attempts,score,confidence:confidence(attempts)};
  }
  function estimateMinutes(item){
    if(!item)return 8;
    const planned=String(item.detail||'').match(/(\d+)\s+planned minutes/i);
    if(planned)return Math.max(5,Math.min(30,Number(planned[1])));
    if(item.type==='due')return Math.max(5,Math.min(12,Math.ceil((queue().due||1)*1.2)));
    if(item.type==='mistake')return 6;
    if(item.type==='mastery')return 12;
    if(item.type==='goal')return 10;
    if(item.type==='planned')return 15;
    if(item.type==='flag')return 10;
    return 8;
  }
  function itemWhy(item){
    if(!item)return 'This is a useful next action from your current StudyAI evidence.';
    if(item.detail)return item.detail;
    if(item.type==='due')return 'These cards are due according to your spaced-repetition schedule.';
    if(item.type==='mistake')return 'This question is still open in your Wrong Answer Notebook.';
    if(item.type==='mastery')return 'Recent answered practice shows this unit is not yet secure.';
    if(item.type==='planned')return 'This task is scheduled by one of your saved study plans.';
    if(item.type==='goal')return 'A saved deadline is approaching.';
    return 'This item is on your review list.';
  }

  function chooseSessionSteps(minutes){
    const q=queue();
    const candidates=q.items.slice(0,30).map((item,i)=>({...item,minutes:estimateMinutes(item),rank:i}));
    const selected=[];
    let used=0;
    const seenType=new Map();

    for(const item of candidates){
      const count=seenType.get(item.type)||0;
      if(count>=2)continue;
      if(selected.length&&used+item.minutes>minutes+5)continue;
      selected.push(item);used+=item.minutes;seenType.set(item.type,count+1);
      if(used>=minutes-5)break;
    }

    if(!selected.length){
      selected.push({
        key:'fallback|adaptive',type:'adaptive',title:'Adaptive SAT practice',
        label:'Practice Studio',detail:'Build a short adaptive set and use the result as new learning evidence.',
        action:'Start adaptive practice',minutes:Math.min(minutes,20),section:'all'
      });
      used=selected[0].minutes;
    } else if(used<minutes-8 && !selected.some(x=>x.type==='mastery'||x.type==='adaptive')){
      selected.push({
        key:'fallback|adaptive',type:'adaptive',title:'Adaptive practice',
        label:'Practice Studio',detail:'Use remaining time on unseen questions, prioritizing weaker recorded skills.',
        action:'Start adaptive practice',minutes:Math.min(15,minutes-used),section:'all'
      });
    }

    return selected.map((item,index)=>({
      id:'session-step-'+index+'-'+String(item.key||item.type),
      key:item.key||item.type,type:item.type,title:item.title||'Study task',
      label:item.label||'',detail:item.detail||'',action:item.action||'Open',
      minutes:Math.max(3,Math.round(Number(item.minutes)||estimateMinutes(item))),
      unit:item.unit||'',topicId:item.topicId||'',mistakeId:item.mistakeId||'',
      kind:item.kind||'',taskKey:item.taskKey||'',goalId:item.goalId||'',
      section:item.section||'',domain:item.domain||'',skill:item.skill||'',
      done:false
    }));
  }

  async function runItem(item){
    if(!item)return;
    if(item.type==='due'){bridge.openDue?.();return}
    if(item.type==='mistake'){bridge.openMistakes?.();return}
    if(item.type==='planned'||item.type==='goal'){window.StudyAIPlanning?.open?.(item);return}
    if(item.type==='flag'&&item.topicId){bridge.openTopic?.(item.topicId);return}
    if(item.type==='mastery'){
      const record=(bridge.getMastery?.()||{})[item.unit];
      if(record?.kind==='curriculum'&&record.topicId){bridge.openTopic?.(record.topicId);return}
      if(record?.kind==='sat'){bridge.openSat?.(record.section,record.domain,record.skill);return}
    }
    if(item.type==='adaptive'){
      await window.StudyAIPerformance?.loadFeature?.('practice');
      window.StudyAIPracticeStudio?.configure?.({mode:'adaptive',section:item.section||'all',count:10,time:0});
      return;
    }
    location.hash='#progress';
  }

  function stepToQueueItem(step){
    const current=queue().items.find(x=>x.key===step.key);
    if(current)return current;
    return {...step};
  }

  function startSession(minutes){
    const session={
      id:'session-'+Date.now(),createdAt:Date.now(),minutes:Number(minutes)||40,
      steps:chooseSessionSteps(Number(minutes)||40)
    };
    saveSession(session);
    openSessionDialog();
  }
  function toggleStep(id){
    const session=activeSession();if(!session)return;
    session.steps=session.steps.map(step=>step.id===id?{...step,done:!step.done}:step);
    saveSession(session);renderSessionDialog(session);
  }
  function clearSession(){saveSession(null);$('#study-session-dialog')?.close()}

  function sessionMarkup(session){
    const done=session.steps.filter(x=>x.done).length;
    const totalMinutes=session.steps.reduce((n,x)=>n+x.minutes,0);
    return `
      <div class="session-dialog-head">
        <div><span class="small-label">Guided study session</span><h2>${session.minutes}-minute plan</h2>
        <p>${done} of ${session.steps.length} steps marked complete · about ${totalMinutes} planned minutes</p></div>
        <button type="button" class="quiet-button" data-session-close>Close</button>
      </div>
      <div class="session-progress"><span style="width:${session.steps.length?100*done/session.steps.length:0}%"></span></div>
      <div class="session-steps">
        ${session.steps.map((step,i)=>`
          <article class="session-step ${step.done?'done':''}" data-session-step="${safe(step.id)}">
            <div class="session-step-num">${step.done?'✓':i+1}</div>
            <div class="session-step-copy"><small>${safe(step.label)} · ${step.minutes} min</small><strong>${safe(step.title)}</strong><p>${safe(step.detail||itemWhy(step))}</p></div>
            <div class="session-step-actions">
              <button type="button" class="button secondary compact" data-session-open="${safe(step.id)}">${safe(step.action||'Open')} →</button>
              <button type="button" class="quiet-button" data-session-toggle="${safe(step.id)}">${step.done?'Reopen':'Mark done'}</button>
            </div>
          </article>`).join('')}
      </div>
      <div class="session-dialog-foot">
        <p>Marking a session step complete does <strong>not</strong> raise mastery. Only answered practice changes mastery evidence.</p>
        <button type="button" class="button secondary" data-session-clear>End session</button>
      </div>`;
  }
  function ensureSessionDialog(){
    let dialog=$('#study-session-dialog');
    if(dialog)return dialog;
    dialog=document.createElement('dialog');dialog.id='study-session-dialog';dialog.className='study-session-dialog';
    dialog.innerHTML='<div id="study-session-dialog-content"></div>';
    document.body.appendChild(dialog);
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    dialog.addEventListener('click',async event=>{
      const open=event.target.closest('[data-session-open]');
      const toggle=event.target.closest('[data-session-toggle]');
      if(event.target.closest('[data-session-close]'))dialog.close();
      if(event.target.closest('[data-session-clear]'))clearSession();
      if(toggle)toggleStep(toggle.dataset.sessionToggle);
      if(open){
        const session=activeSession(),step=session?.steps.find(x=>x.id===open.dataset.sessionOpen);
        if(step){dialog.close();await runItem(stepToQueueItem(step))}
      }
    });
    return dialog;
  }
  function renderSessionDialog(session=activeSession()){
    const box=$('#study-session-dialog-content');if(!box||!session)return;
    box.innerHTML=sessionMarkup(session);
  }
  function openSessionDialog(){
    const session=activeSession();if(!session)return;
    const dialog=ensureSessionDialog();renderSessionDialog(session);dialog.showModal();
  }

  function renderToday(){
    const root=$('#today-dashboard');if(!root)return;
    const p=prefs(),q=queue(),m=masteryStats(),session=activeSession();
    const top=q.items.slice(0,4);
    const examDays=daysUntil(p.examDate);
    const examText=examDays===null?'No exam date saved':examDays<0?'Exam date passed':examDays===0?'Exam today':examDays===1?'Exam tomorrow':examDays+' days to exam';
    root.innerHTML=`
      <div class="today-head">
        <div>
          <span class="small-label">Today</span>
          <h2>${q.items.length?'Your next useful work is ready.':'Build today’s learning evidence.'}</h2>
          <p>${safe(p.pathway||'StudyAI')} · ${safe(examText)} · ${p.dailyMinutes||40} min/day preference</p>
        </div>
        <div class="today-head-actions">
          <button type="button" class="quiet-button" id="today-edit-goals">Study preferences</button>
          ${session?'<button type="button" class="button secondary" id="today-resume-session">Resume session</button>':''}
        </div>
      </div>
      <div class="today-metrics">
        <article><span>Due flashcards</span><strong>${q.due||0}</strong><small>scheduled recall</small></article>
        <article><span>Open mistakes</span><strong>${q.mistakes||0}</strong><small>questions to recover</small></article>
        <article><span>Developing units</span><strong>${q.weak||0}</strong><small>below secure mastery</small></article>
        <article><span>Practiced mastery</span><strong>${m.score===null?'—':m.score+'%'}</strong><small class="evidence-chip ${m.confidence.className}">${safe(m.confidence.label)}</small></article>
      </div>
      <div class="today-layout">
        <section class="today-priorities">
          <div class="today-subhead"><div><span class="small-label">Recommended next</span><h3>What should you do first?</h3></div></div>
          <div class="today-priority-list">
            ${top.length?top.map((item,i)=>`
              <article class="today-priority">
                <span class="today-priority-index">${i+1}</span>
                <div><small>${safe(item.label||item.type)}</small><strong>${safe(item.title)}</strong><p>${safe(item.detail||'')}</p>
                <details><summary>Why this?</summary><p>${safe(itemWhy(item))}</p></details></div>
                <button type="button" class="button secondary compact" data-today-open="${safe(item.key)}">${safe(item.action||'Open')} →</button>
              </article>`).join(''):
              '<div class="today-empty"><strong>No review debt yet.</strong><p>Take a diagnostic or answer a few questions so StudyAI has evidence to work from.</p><button class="button primary" id="today-start-diagnostic">Start a diagnostic →</button></div>'}
          </div>
        </section>
        <aside class="today-session-builder">
          <span class="small-label">Guided session</span><h3>How much time do you have?</h3>
          <p>StudyAI will combine real due work, mistakes, weak skills and deadlines into one focused plan.</p>
          <div class="session-lengths">
            <button type="button" data-session-minutes="20"><strong>20</strong><span>minutes</span></button>
            <button type="button" data-session-minutes="40" class="recommended"><strong>40</strong><span>minutes</span></button>
            <button type="button" data-session-minutes="60"><strong>60</strong><span>minutes</span></button>
          </div>
          <p class="today-trust">Recommendations are deterministic and explainable. StudyAI does not treat clicks or “Mark done” as proof of mastery.</p>
        </aside>
      </div>`;

    $$('[data-today-open]',root).forEach(button=>button.addEventListener('click',()=>{
      const item=queue().items.find(x=>x.key===button.dataset.todayOpen);if(item)runItem(item);
    }));
    $$('[data-session-minutes]',root).forEach(button=>button.addEventListener('click',()=>startSession(Number(button.dataset.sessionMinutes))));
    $('#today-resume-session')?.addEventListener('click',openSessionDialog);
    $('#today-edit-goals')?.addEventListener('click',()=>openOnboarding(true));
    $('#today-start-diagnostic')?.addEventListener('click',async()=>{
      await window.StudyAIPerformance?.loadFeature?.('practice');
      window.StudyAIPracticeStudio?.configure?.({mode:'diagnostic',section:'all',count:12,time:0});
    });
    enhanceMasteryRows();
  }

  function ensureToday(){
    if($('#today'))return;
    const hero=$('#home');if(!hero)return;
    const section=document.createElement('section');
    section.id='today';section.className='section today-section';
    section.innerHTML='<div class="shell" id="today-dashboard"></div>';
    hero.insertAdjacentElement('afterend',section);
    const brand=$('.brand');if(brand)brand.href='#today';
    const primary=$('#home .button.primary');
    if(primary){primary.href='#today';primary.textContent='Start today’s study →'}
  }

  function enhanceMasteryRows(){
    const mastery=bridge.getMastery?.()||{};
    $$('[data-mastery-key]').forEach(row=>{
      if(row.querySelector('.evidence-confidence'))return;
      const record=mastery[row.dataset.masteryKey];if(!record)return;
      const c=confidence(record.attempts);
      const target=row.querySelector('.mastery-row-title');
      if(target){
        const chip=document.createElement('small');
        chip.className='evidence-confidence '+c.className;
        chip.textContent=c.label+' · '+c.detail;
        chip.title='Confidence reflects the amount of answered practice evidence, not certainty about ability.';
        target.appendChild(chip);
      }
    });
  }

  function boardOptions(){
    return ['SAT',...[...new Set((bridge.getCurriculum?.()||[]).map(x=>x.board).filter(Boolean))]];
  }
  function ensureOnboarding(){
    let dialog=$('#studyai-onboarding');if(dialog)return dialog;
    dialog=document.createElement('dialog');dialog.id='studyai-onboarding';dialog.className='studyai-onboarding';
    dialog.innerHTML='<div id="studyai-onboarding-content"></div>';
    document.body.appendChild(dialog);
    dialog.addEventListener('click',event=>{if(event.target===dialog&&prefs().onboardingComplete)dialog.close()});
    dialog.addEventListener('click',async event=>{
      const next=event.target.closest('[data-onboarding-next]');
      const prev=event.target.closest('[data-onboarding-prev]');
      const finish=event.target.closest('[data-onboarding-finish]');
      const skip=event.target.closest('[data-onboarding-skip]');
      if(prev){onboardingStep=Math.max(0,onboardingStep-1);renderOnboarding()}
      if(next){
        const form=$('#onboarding-form');
        if(onboardingStep===0){
          const pathway=form?.elements.pathway?.value;
          if(!pathway){$('#onboarding-status').textContent='Choose what you are studying first.';return}
          savePrefs({...prefs(),pathway});
        }
        if(onboardingStep===1){
          const date=form?.elements.examDate?.value||'';
          savePrefs({...prefs(),examDate:date});
        }
        if(onboardingStep===2){
          const dailyMinutes=Number(form?.elements.dailyMinutes?.value)||40;
          savePrefs({...prefs(),dailyMinutes});
        }
        onboardingStep=Math.min(3,onboardingStep+1);renderOnboarding();
      }
      if(skip){savePrefs({...prefs(),onboardingComplete:true});dialog.close()}
      if(finish){
        const wantsDiagnostic=!!$('#onboarding-diagnostic')?.checked;
        savePrefs({...prefs(),onboardingComplete:true});
        dialog.close();
        if(wantsDiagnostic&&prefs().pathway==='SAT'){
          await window.StudyAIPerformance?.loadFeature?.('practice');
          window.StudyAIPracticeStudio?.configure?.({mode:'diagnostic',section:'all',count:12,time:0});
        } else {
          location.hash='#today';
        }
      }
    });
    return dialog;
  }

  function renderOnboarding(){
    const box=$('#studyai-onboarding-content');if(!box)return;
    const p=prefs(),options=boardOptions();
    const steps=[
      `<span class="small-label">1 of 4 · Goal</span><h2>What are you studying?</h2><p>StudyAI will use this only to shape your starting workflow.</p>
        <label>Pathway<select name="pathway"><option value="">Choose one</option>${options.map(x=>'<option '+(p.pathway===x?'selected':'')+'>'+safe(x)+'</option>').join('')}</select></label>`,
      `<span class="small-label">2 of 4 · Date</span><h2>Is there an exam date?</h2><p>Optional. A date helps StudyAI prioritize deadlines without pretending to predict your score.</p>
        <label>Exam date<input name="examDate" type="date" value="${safe(p.examDate)}"></label>`,
      `<span class="small-label">3 of 4 · Time</span><h2>How much time can you usually study?</h2><p>This becomes the default size of a guided Study Session. You can change it anytime.</p>
        <div class="onboarding-time-grid">${[20,40,60,90].map(n=>'<label><input type="radio" name="dailyMinutes" value="'+n+'" '+(Number(p.dailyMinutes)===n?'checked':'')+'><span><strong>'+n+'</strong> min/day</span></label>').join('')}</div>`,
      `<span class="small-label">4 of 4 · Starting point</span><h2>You’re ready.</h2><p>${p.pathway==='SAT'?'A short diagnostic can give StudyAI its first real evidence.':'Start with Today, then learn and answer questions to build real mastery evidence.'}</p>
        ${p.pathway==='SAT'?'<label class="onboarding-check"><input id="onboarding-diagnostic" type="checkbox" checked><span><strong>Take a 12-question SAT diagnostic</strong><small>Results create initial mastery evidence. It is not an official SAT score.</small></span></label>':''}
        <div class="onboarding-summary"><span>${safe(p.pathway||'Pathway')}</span><span>${p.examDate?safe(p.examDate):'No exam date'}</span><span>${p.dailyMinutes||40} min/day</span></div>`
    ];
    box.innerHTML=`<form id="onboarding-form"><div class="onboarding-progress"><span style="width:${25*(onboardingStep+1)}%"></span></div>${steps[onboardingStep]}<p id="onboarding-status" role="status"></p>
      <div class="onboarding-actions">
        <button type="button" class="quiet-button" data-onboarding-skip>${p.onboardingComplete?'Close':'Skip for now'}</button>
        <div>${onboardingStep?'<button type="button" class="button secondary" data-onboarding-prev>Back</button>':''}
        ${onboardingStep<3?'<button type="button" class="button primary" data-onboarding-next>Continue →</button>':'<button type="button" class="button primary" data-onboarding-finish>Go to Today →</button>'}</div>
      </div></form>`;
  }
  function openOnboarding(edit=false){
    const dialog=ensureOnboarding();onboardingStep=edit?0:0;renderOnboarding();dialog.showModal();
  }

  function autoOnboarding(){
    const p=prefs();
    if(p.onboardingComplete)return;
    if(hasLearningEvidence()){
      savePrefs({...p,onboardingComplete:true,pathway:p.pathway||'StudyAI'});
      return;
    }
    setTimeout(()=>openOnboarding(false),450);
  }

  function mount(){
    ensureToday();
    ensureSessionDialog();
    renderToday();
    autoOnboarding();

    window.addEventListener('studyai:state-changed',()=>queueMicrotask(()=>{renderToday();enhanceMasteryRows()}));
    window.addEventListener('hashchange',()=>{if(location.hash==='#today'||location.hash==='#progress'){renderToday();setTimeout(enhanceMasteryRows,50)}});
    window.addEventListener('studyai:feature-loaded',()=>renderToday());
    const observer=new MutationObserver(()=>enhanceMasteryRows());
    const progress=$('#progress');if(progress)observer.observe(progress,{subtree:true,childList:true});
  }

  window.StudyAIProduct={
    prefs,savePrefs,confidence,startSession,openSession:openSessionDialog,openOnboarding,
    buildSession:chooseSessionSteps,renderToday
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();