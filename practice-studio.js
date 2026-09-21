/* StudyAI Practice Studio: original SAT question bank; local, no AI charges. */
(() => {
  'use strict';
  const bridge=window.StudyAIPracticeBridge;
  if(!bridge)return;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bank=bridge.getSatQuestions().filter(q=>q&&q.id&&q.section&&q.skill&&q.stem&&Array.isArray(q.options)&&q.options.length===4);
  const LEVELS=['Foundation','Medium','Advanced'];
  const random=items=>{const arr=[...items];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr};
  let session=null,interval=null;
  function makeUI(){
    const sibling=$('#practice');
    if(!sibling||$('#practice-studio'))return;
    const section=document.createElement('section');
    section.className='section practice-studio-section';
    section.id='practice-studio';
    section.innerHTML=[
      '<div class="shell"><header class="section-head"><p class="kicker">Learning engine · practice</p>',
      '<h2>Practice Studio.</h2><p>Diagnostic checks, adaptive SAT practice, custom tests and timed sprints—all connected to your Mastery Map and Wrong Answer Notebook.</p></header>',
      '<div class="ps-layout"><div class="ps-builder" id="ps-builder">',
      '<span class="small-label">01 · Build your session</span><h3>Choose how to practice</h3>',
      '<div class="ps-mode-grid" role="group" aria-label="Practice mode">',
      '<button type="button" data-ps-mode="diagnostic" class="active" aria-pressed="true"><strong>Diagnostic</strong><small>Sample domains and show initial gaps</small></button>',
      '<button type="button" data-ps-mode="adaptive" aria-pressed="false"><strong>Adaptive practice</strong><small>Difficulty responds to answers</small></button>',
      '<button type="button" data-ps-mode="custom" aria-pressed="false"><strong>Custom test</strong><small>Choose filters, count and time</small></button>',
      '<button type="button" data-ps-mode="sprint" aria-pressed="false"><strong>Timed sprint</strong><small>10 questions · 10 minutes</small></button>',
      '<button type="button" data-ps-mode="mixed" aria-pressed="false"><strong>Mixed retrieval</strong><small>Mix weak and previously practiced skills</small></button></div>',
      '<div class="ps-fields">',
      '<label>Section<select id="ps-section"><option value="all">Both sections</option><option value="Reading &amp; Writing">Reading &amp; Writing</option><option value="Math">Math</option></select></label>',
      '<label>Domain<select id="ps-domain"><option value="all">All domains</option></select></label>',
      '<label>Skill<select id="ps-skill"><option value="all">All skills</option></select></label>',
      '<label class="ps-custom-field">Difficulty<select id="ps-level"><option value="all">All difficulties</option><option>Foundation</option><option>Medium</option><option>Advanced</option></select></label>',
      '<label>Questions<select id="ps-count"><option value="5">5</option><option value="10" selected>10</option><option value="12">12</option><option value="20">20</option><option value="30">30</option></select></label>',
      '<label class="ps-custom-field">Time limit (minutes)<input id="ps-time" type="number" min="0" max="120" step="1" value="0" aria-describedby="ps-time-help"></label>',
      '</div><p class="ps-help" id="ps-time-help">Use 0 for untimed practice. The number of available original questions depends on your filters.</p>',
      '<p class="ps-preview" id="ps-preview" role="status"></p>',
      '<button type="button" class="button primary" id="ps-start">Start practice →</button>',
      '<p class="ps-disclaimer">Practice results are learning signals, not an official SAT diagnostic or score prediction. The current bank contains 50 original items (12 Reading &amp; Writing and 38 Math). Repeated practice can make scores less representative.</p>',
      '</div>',
      '<article class="ps-runner" id="ps-runner" hidden aria-live="polite"></article></div></div>'
    ].join('');
    sibling.insertAdjacentElement('afterend',section);
    const practiceHeader=sibling.querySelector('.section-head');
    if(practiceHeader&&!practiceHeader.querySelector('a[href="#practice-studio"]')){
      const a=document.createElement('a');
      a.className='button secondary compact ps-open-link';
      a.href='#practice-studio';
      a.textContent='Open Practice Studio →';
      practiceHeader.appendChild(a);
    }
    $$('[data-ps-mode]',section).forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.psMode)));
    ['ps-section','ps-domain','ps-skill','ps-level','ps-count','ps-time'].forEach(id=>{
      $('#'+id).addEventListener('change',()=>{if(id==='ps-section')populateDomains();else if(id==='ps-domain')populateSkills();updatePreview()});
    });
    $('#ps-start').addEventListener('click',start);
    setMode('diagnostic');populateDomains();
  }
  function mode(){return $('[data-ps-mode][aria-pressed="true"]')?.dataset.psMode||'diagnostic'}
  function setMode(value){
    $$('[data-ps-mode]').forEach(b=>{let on=b.dataset.psMode===value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
    $('.ps-builder')?.classList.toggle('ps-custom',value==='custom');
    if(value==='sprint'){$('#ps-count').value='10';$('#ps-time').value='10'}
    else if(value==='diagnostic'){$('#ps-count').value='12';$('#ps-time').value='0'}
    else if(value==='adaptive'||value==='mixed'){$('#ps-count').value='10';$('#ps-time').value='0'}
    updatePreview();
  }
  function fill(select,items,anyLabel){
    const selected=select.value;
    select.innerHTML='<option value="all">'+safe(anyLabel)+'</option>'+items.map(x=>'<option value="'+safe(x)+'">'+safe(x)+'</option>').join('');
    if(items.includes(selected))select.value=selected;
  }
  function populateDomains(){
    const section=$('#ps-section').value;
    const pool=bank.filter(q=>section==='all'||q.section===section);
    fill($('#ps-domain'),[...new Set(pool.map(q=>q.domain))].sort(),'All domains');
    populateSkills();
  }
  function populateSkills(){
    const section=$('#ps-section').value,domain=$('#ps-domain').value;
    const pool=bank.filter(q=>(section==='all'||q.section===section)&&(domain==='all'||q.domain===domain));
    fill($('#ps-skill'),[...new Set(pool.map(q=>q.skill))].sort(),'All skills');
    updatePreview();
  }
  function poolFor(modeName){
    const section=$('#ps-section').value,domain=$('#ps-domain').value,skill=$('#ps-skill').value,level=$('#ps-level').value;
    return bank.filter(q=>(section==='all'||q.section===section)&&(domain==='all'||q.domain===domain)
      &&(skill==='all'||q.skill===skill)&&(modeName!=='custom'||level==='all'||q.level===level));
  }
  function wanted(){
    const n=Number($('#ps-count').value);
    return Math.max(1,Math.min(30,Number.isFinite(n)?n:10));
  }
  function updatePreview(){
    const m=mode(),pool=poolFor(m),requested=m==='sprint'?10:wanted(),actual=Math.min(requested,pool.length);
    $('#ps-preview').textContent=pool.length
      ? actual+' of '+pool.length+' matching original questions will be used.'+(actual<requested?' Your filters contain fewer than requested.':'')
      : 'No questions match these filters. Change the section, domain, skill or difficulty.';
    $('#ps-start').disabled=!pool.length;
  }
  function roundRobin(pool,key,count){
    const groups=new Map();
    random(pool).forEach(q=>{let name=key(q);if(!groups.has(name))groups.set(name,[]);groups.get(name).push(q)});
    let out=[];while(out.length<count){let progressed=false;for(const arr of groups.values()){if(arr.length&&out.length<count){out.push(arr.shift());progressed=true}}if(!progressed)break}
    return out;
  }
  function masteryOf(q){
    return bridge.getMastery()[['sat',q.section,q.domain,q.skill].join('|')]||null;
  }
  function pickQuestions(pool,n,m){
    if(m==='diagnostic')return roundRobin(pool,q=>q.section+'|'+q.domain,n);
    if(m==='mixed'){
      const randomized=random(pool);
      return randomized.sort((a,b)=>{
        const ra=masteryOf(a),rb=masteryOf(b);
        const pa=ra?100-ra.score:45,pb=rb?100-rb.score:45;
        return pb-pa;
      }).slice(0,n);
    }
    return random(pool).slice(0,n);
  }
  function levelForAdaptive(){
    if(!session)return 'Medium';
    const recent=session.answers.slice(-4).filter(a=>!a.skipped);
    if(recent.length>=2&&recent.slice(-2).every(a=>a.correct))return 'Advanced';
    if(recent.length&&recent[recent.length-1].correct===false)return 'Foundation';
    return 'Medium';
  }
  function nextAdaptive(){
    const remaining=session.pool.filter(q=>!session.seen.has(q.id));
    if(!remaining.length)return null;
    const desired=levelForAdaptive(),index=LEVELS.indexOf(desired);
    const candidates=random(remaining);
    candidates.sort((a,b)=>{
      const am=masteryOf(a),bm=masteryOf(b);
      const weaknessA=am?100-am.score:42,weaknessB=bm?100-bm.score:42;
      const levelA=Math.abs(LEVELS.indexOf(a.level)-index),levelB=Math.abs(LEVELS.indexOf(b.level)-index);
      return levelA-levelB||(weaknessB-weaknessA);
    });
    return candidates[0];
  }
  function start(){
    if(session&&!session.finished)return;
    const m=mode(),pool=poolFor(m),n=Math.min(m==='sprint'?10:wanted(),pool.length);
    if(!n)return;
    const questions=m==='adaptive'?[]:pickQuestions(pool,n,m);
    session={mode:m,pool,questions,target:n,index:0,answers:[],seen:new Set(),started:Date.now(),remaining:Math.max(0,Math.min(120,+(m==='sprint'?10:$('#ps-time').value)||0))*60,finished:false,current:null,answered:false};
    $('#ps-builder').hidden=true;$('#ps-runner').hidden=false;
    if(session.remaining)interval=setInterval(tick,1000);
    nextQuestion();
  }
  function tick(){
    if(!session||session.finished)return;
    session.remaining=Math.max(0,session.remaining-1);
    const timer=$('#ps-clock');if(timer)timer.textContent=formatTime(session.remaining);
    if(!session.remaining)finish('Time expired');
  }
  function formatTime(seconds){const m=Math.floor(seconds/60),s=seconds%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
  function nextQuestion(){
    if(!session||session.finished)return;
    if(session.answers.length>=session.target){finish('Practice complete');return}
    let q=session.mode==='adaptive'?nextAdaptive():session.questions[session.index];
    if(!q){finish('Practice complete');return}
    session.current=q;session.answered=false;session.seen.add(q.id);
    const progress=session.answers.length+1;
    const timer=session.remaining?'<strong class="ps-clock" id="ps-clock">'+formatTime(session.remaining)+'</strong>':'<span>Untimed</span>';
    $('#ps-runner').innerHTML=[
      '<div class="ps-runner-head"><span>'+safe(session.mode.replace(/-/g,' '))+' · '+progress+' / '+session.target+'</span>'+timer+'</div>',
      '<div class="ps-question"><div class="ps-crumb">'+safe(q.section)+' · '+safe(q.domain)+' · '+safe(q.skill)+' · '+safe(q.level)+'</div>',
      q.passage?'<div class="ps-passage">'+safe(q.passage)+'</div>':'',
      '<h3>'+safe(q.stem)+'</h3>',
      '<div class="ps-choices">'+q.options.map((choice,i)=>'<button type="button" data-ps-choice="'+i+'"><span>'+String.fromCharCode(65+i)+'</span>'+safe(choice)+'</button>').join('')+'</div>',
      '<div id="ps-feedback" role="status"></div>',
      '<div class="ps-runner-actions"><button type="button" class="button secondary compact" id="ps-skip">Skip question</button><button type="button" class="button primary compact" id="ps-next" disabled>'+(progress===session.target?'Finish':'Next →')+'</button></div></div>'
    ].join('');
    $$('[data-ps-choice]',$('#ps-runner')).forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.psChoice)));
    $('#ps-skip').addEventListener('click',skip);
    $('#ps-next').addEventListener('click',()=>{session.index++;nextQuestion()});
  }
  function answer(index){
    if(!session||session.finished||session.answered)return;
    const q=session.current,correct=index===q.answer;
    session.answered=true;
    session.answers.push({id:q.id,q,chosen:index,correct,skipped:false});
    // Record immediately so a closed tab does not discard objective practice.
    bridge.recordAttempt(q,index,correct,session.mode);
    $$('[data-ps-choice]',$('#ps-runner')).forEach(b=>{
      b.disabled=true;
      if(+b.dataset.psChoice===q.answer)b.classList.add('correct');
      else if(+b.dataset.psChoice===index)b.classList.add('wrong');
    });
    $('#ps-feedback').innerHTML='<div class="ps-feedback '+(correct?'correct':'wrong')+'"><strong>'+(correct?'Correct':'Review this explanation')+'</strong><p>'+safe(q.explanation)+'</p></div>';
    $('#ps-next').disabled=false;$('#ps-skip').disabled=true;
  }
  function skip(){
    if(!session||session.finished||session.answered)return;
    session.answers.push({id:session.current.id,q:session.current,chosen:null,correct:false,skipped:true});
    session.index++;nextQuestion();
  }
  function finish(reason){
    if(!session||session.finished)return;
    session.finished=true;
    if(interval){clearInterval(interval);interval=null}
    const answered=session.answers.filter(a=>!a.skipped),correct=answered.filter(a=>a.correct).length;
    const summary={kind:'sat',mode:session.mode,correct,total:answered.length,skipped:session.answers.filter(a=>a.skipped).length,section:$('#ps-section').value,durationSec:Math.round((Date.now()-session.started)/1000)};
    if(answered.length)bridge.recordTest(summary);
    const grouped=new Map();
    answered.forEach(a=>{let k=a.q.section+' · '+a.q.domain;let row=grouped.get(k)||{correct:0,total:0};row.total++;if(a.correct)row.correct++;grouped.set(k,row)});
    const details=[...grouped].map(([name,row])=>'<div class="ps-breakdown-row"><strong>'+safe(name)+'</strong><span>'+row.correct+' / '+row.total+' correct'+(row.total<3?' · early evidence':'')+'</span></div>').join('');
    $('#ps-runner').innerHTML=[
      '<div class="ps-results"><span class="small-label">'+safe(reason)+'</span><h3>'+correct+' / '+answered.length+' correct</h3>',
      '<p>'+session.answers.filter(a=>a.skipped).length+' skipped · '+(session.mode==='diagnostic'?'This is an initial skill check, not a standardized test score.':'Your answered questions have updated StudyAI mastery.')+'</p>',
      '<div class="ps-breakdown"><h4>Domain breakdown</h4>'+(details||'<p>No answered questions yet.</p>')+'</div>',
      '<div class="ps-result-actions"><button type="button" class="button primary" id="ps-again">Build another session →</button>',
      '<button type="button" class="button secondary" id="ps-mistakes">Open Wrong Answer Notebook</button></div></div>'
    ].join('');
    $('#ps-again').addEventListener('click',()=>{$('#ps-runner').hidden=true;$('#ps-builder').hidden=false;session=null;updatePreview()});
    $('#ps-mistakes').addEventListener('click',()=>{location.hash='#mistake-notebook'});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',makeUI);
  else makeUI();
})();