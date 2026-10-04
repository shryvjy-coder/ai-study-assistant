/* StudyAI Help Center and guided tutorial. */
(() => {
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const guides=[
    {group:'Learn',title:'Study Library',icon:'01',summary:'Open curriculum notes by board, class, subject and topic.',when:'Use this when you are learning or revising a school topic.',steps:['Choose your board, class and subject.','Open a topic from the chapter list.','Read the notes, add personal notes, bookmark it, or send it to review.'],action:'Open Study Library',hash:'#study',keywords:'notes chapters curriculum cbse cambridge learn'},
    {group:'Practice',title:'SAT Practice',icon:'02',summary:'Practice original SAT-style questions by section, domain and skill.',when:'Use this for quick targeted SAT work.',steps:['Choose Reading & Writing or Math.','Select a domain or skill.','Answer questions and review every explanation.'],action:'Open SAT',hash:'#sat',keywords:'sat reading writing math domain skill'},
    {group:'Practice',title:'Practice Studio',icon:'03',summary:'Run diagnostic, adaptive, mixed, custom and timed SAT sessions.',when:'Use this when you want a structured practice session.',steps:['Pick a practice mode.','Choose filters, question count and time.','Use hints when needed, then review the result breakdown.'],action:'Open Practice Studio',hash:'#practice-studio',keywords:'diagnostic adaptive custom test mixed timed practice hints'},
    {group:'Review',title:'Flashcards & Spaced Repetition',icon:'04',summary:'Recall cards and schedule them with Again, Hard, Good or Easy.',when:'Use this for memory-heavy material and recurring review.',steps:['Load a topic, Workspace, mistake or due-review deck.','Flip the card before rating it.','Review cards again when StudyAI marks them due.'],action:'Open Flashcards',hash:'#flashcards',keywords:'flashcards srs spaced repetition due cards again hard good easy'},
    {group:'Review',title:'Smart Review Queue',icon:'05',summary:'StudyAI ranks useful next actions from due cards, mistakes, mastery and plans.',when:'Use this when you are unsure what to study next.',steps:['Open the queue on Progress.','Read the reason shown for each recommendation.','Choose the highest useful action that fits your time.'],action:'Open Smart Review',hash:'#smart-review-queue',keywords:'smart review queue what next weak mastery due'},
    {group:'Review',title:'Wrong Answer Notebook',icon:'06',summary:'Keeps question-level mistakes so you can retry and recover them.',when:'Use this after quizzes, SAT practice or mocks.',steps:['Filter to To review.','Expand a mistake and study the explanation.','Retry it, practice the skill, or mark it understood when appropriate.'],action:'Open Wrong Answers',hash:'#mistake-notebook',keywords:'mistakes wrong answers retry recovered understood'},
    {group:'Plan',title:'SAT Planner',icon:'07',summary:'Build SAT study sessions around your exam date, weak skills and mocks.',when:'Use this when preparing for a real SAT date.',steps:['Set your SAT preferences and exam date.','Generate the plan.','Complete or open tasks from the plan, then regenerate as your evidence changes.'],action:'Open SAT Planner',hash:'#sat-study-planner',keywords:'sat planner exam date schedule mock weak skills'},
    {group:'Plan',title:'Goals & Deadlines',icon:'08',summary:'Add exams, revision deadlines and topic deadlines to your learning plan.',when:'Use this to make StudyAI aware of important dates.',steps:['Add a goal and date in Planner.','Choose SAT, a curriculum pathway or a topic.','Use Today and overdue tasks to stay on track.'],action:'Open Planner',hash:'#planner',keywords:'goals deadlines exams revision tasks planner'},
    {group:'Track',title:'Progress & Mastery',icon:'09',summary:'See evidence-based mastery, practice activity and learning trends.',when:'Use this to find strengths, weaknesses and recent progress.',steps:['Check the Mastery Map.','Look for low-evidence or weak units.','Open a unit to practice it instead of chasing the percentage itself.'],action:'Open Progress',hash:'#progress',keywords:'progress mastery analytics weak strong trends evidence'},
    {group:'AI',title:'Personal AI',icon:'10',summary:'Use your own sources for grounded explanations, notes, quizzes, flashcards and audio.',when:'Use this when you have notes, documents or a StudyAI topic you want help with.',steps:['Add or select sources.','Choose a tool such as Teach Me, Revision Notes or Quiz Me.','Check the cited sources before relying on the result.'],action:'Open Personal AI',hash:'#personal-ai',keywords:'personal ai pdf docx sources grounded quiz flashcards teach audio'},
    {group:'Create',title:'Workspace',icon:'11',summary:'Write and organize your own notes, then turn them into flashcards or AI sources.',when:'Use this for personal class notes and revision material.',steps:['Create or open a note.','Save it in a folder.','Reuse it in Flashcards or Personal AI when needed.'],action:'Open Workspace',hash:'#workspace',keywords:'workspace notes folders personal class notes'},
    {group:'Navigate',title:'Command Center',icon:'12',summary:'Jump to topics and actions quickly without scrolling through the app.',when:'Use this once you know what you want to open.',steps:['Press the command button in the top bar.','Search a feature, topic or action.','Choose a result to jump directly there.'],action:'Open Command Center',command:true,keywords:'command center search keyboard quick actions navigation'},
    {group:'Create',title:'Revision Sheets',icon:'13',summary:'Create compact revision or formula sheets from StudyAI curriculum material.',when:'Use this before focused review sessions or an exam.',steps:['Open a supported curriculum topic.','Create a revision sheet.','Save useful sheets into Workspace for later review.'],action:'Open Study Library',hash:'#study',keywords:'revision sheet formula sheet quick review'},
    {group:'Practice',title:'Hints & Foundation Practice',icon:'14',summary:'Use graduated hints and prerequisite suggestions inside Practice Studio.',when:'Use this when you are stuck or repeatedly missing a skill.',steps:['Try Hint 1 before revealing more help.','If needed, progress to Hint 2 or Hint 3.','After a miss, use a suggested foundation only when it is relevant to the gap.'],action:'Open Practice Studio',hash:'#practice-studio',keywords:'hints prerequisite foundation tutor practice studio'}
  ];

  const workflows=[
    {title:'Prepare for the SAT',steps:['Set your SAT date in the SAT Planner.','Run a diagnostic in Practice Studio.','Practice weak skills and review mistakes.','Use spaced repetition for recurring facts or rules.','Take mocks, review the Wrong Answer Notebook, then let the plan update.']},
    {title:'Revise for a school exam',steps:['Add the exam date under Goals & Deadlines.','Open the relevant Study Library topics.','Quiz yourself and watch the Mastery Map.','Review wrong answers and due flashcards.','Use the Smart Review Queue for the next best revision action.']},
    {title:'Learn from your own notes',steps:['Put your notes in Workspace or Personal AI.','Ask Personal AI to explain or structure the material.','Create flashcards or a grounded quiz.','Review the cards later using spaced repetition.']},
    {title:'Recover from repeated mistakes',steps:['Open the Wrong Answer Notebook.','Read the explanation and identify the underlying skill.','Use foundation practice if StudyAI suggests one.','Retry with similar or targeted practice.','Check whether mastery improves with real answered practice.']}
  ];

  const tour=[
    {title:'Welcome to StudyAI',text:'StudyAI works best as a loop: decide what matters today, learn, practice, review mistakes, then use the evidence to choose what comes next.',selector:'#today .today-head',hash:'#today'},
    {title:'Today: start here',text:'Today is your home base. It combines due reviews, mistakes, weak areas and deadlines so you are not guessing what to study first.',selector:'#today .today-layout',hash:'#today'},
    {title:'Study Library: learn the topic',text:'Choose your board, grade and subject, then open a topic. Reading helps you learn, but mastery only changes when you answer real practice questions.',selector:'#study .section-head',hash:'#study'},
    {title:'Practice: turn learning into evidence',text:'Use quizzes and practice after learning. Explanations and wrong answers are important because StudyAI uses answered practice, not clicks, as evidence.',selector:'#practice .section-head',hash:'#practice'},
    {title:'SAT: practice by skill',text:'For SAT prep, choose Reading & Writing or Math, then narrow to a domain, skill and difficulty. Use Bluebook separately for official full-length tests.',selector:'#sat .section-head',hash:'#sat'},
    {title:'Workspace: bring your own material',text:'Workspace is for your class notes and revision material. Save notes into folders, then reuse them for flashcards or other StudyAI tools.',selector:'#workspace .section-head',hash:'#workspace'},
    {title:'Flashcards: remember what you learned',text:'Reveal the answer before rating your recall. Again, Hard, Good and Easy control when StudyAI schedules the card for review.',selector:'#flashcards .section-head',hash:'#flashcards'},
    {title:'Progress: read the evidence',text:'Progress shows strengths, developing areas and mastery evidence. Use it to find what needs practice instead of trying to chase a percentage.',selector:'#progress .section-head',hash:'#progress'},
    {title:'Planner: turn goals into sessions',text:'Add deadlines and study goals here. StudyAI can use them with your learning evidence to build more useful next steps.',selector:'#planner .section-head',hash:'#planner'},
    {title:'Search StudyAI instantly',text:'Use the command button when you already know where you want to go. It is the fastest way to jump between major tools.',selector:'#open-command'},
    {title:'Your account keeps progress synced',text:'Your account menu shows your sign-in and sync status. When signed in, supported StudyAI progress can follow your account instead of staying only in this browser.',selector:'#account-button'},
    {title:'Replay this tutorial any time',text:'If you forget where something is, open Help & Tutorial. This full guided tour can always be replayed from here.',selector:'#help-start-tour',hash:'#help'}
  ];

  const TOUR_STORAGE_KEY='studyai-guided-tour-v2';
  let tourIndex=0;
  let tourActive=false;
  let tourLayoutFrame=0;
  let tourReadyTimer=null;
  let tourLastFocus=null;

  function cardMarkup(g){
    return '<article class="help-card" data-help-search="'+safe((g.title+' '+g.summary+' '+g.when+' '+g.keywords).toLowerCase())+'">'+
      '<div class="help-card-head"><span>'+safe(g.icon)+'</span><div><small>'+safe(g.group)+'</small><h3>'+safe(g.title)+'</h3></div></div>'+
      '<p>'+safe(g.summary)+'</p><p class="help-when"><strong>Best for:</strong> '+safe(g.when.replace(/^Use this /,'').replace(/.$/,''))+'.</p>'+
      '<ol>'+g.steps.map(step=>'<li>'+safe(step)+'</li>').join('')+'</ol>'+
      '<button type="button" class="button secondary compact" data-help-guide="'+guides.indexOf(g)+'">'+safe(g.action)+' →</button>'+
    '</article>';
  }

  function makeHelp(){
    if($('#help')) return;
    const main=$('main');
    if(!main) return;

    const section=document.createElement('section');
    section.id='help';
    section.className='section help-center';
    section.innerHTML=
      '<div class="shell">'+
        '<header class="section-head help-head"><div><p class="kicker">Help · Tutorial</p><h2>Learn StudyAI without guessing.</h2><p>Start with a workflow, search for a feature, or take the guided tour. You do not need to use every tool.</p></div>'+
        '<button type="button" class="button primary" id="help-start-tour">Replay full tutorial →</button></header>'+
        '<div class="help-quickstart">'+
          '<div><span class="small-label">If you are new</span><h3>Use this simple loop first</h3><p>Learn → Practice → Review mistakes → Review due cards → Plan the next session.</p></div>'+
          '<div class="help-quick-actions"><a class="button secondary compact" href="#study">Learn a topic</a><a class="button secondary compact" href="#practice-studio">Start practice</a><a class="button secondary compact" href="#smart-review-queue">What should I do next?</a></div>'+
        '</div>'+
        '<div class="help-search-row"><label for="help-search">Find a feature</label><input id="help-search" type="search" placeholder="Try: adaptive practice, flashcards, SAT planner, Personal AI..." autocomplete="off"><span id="help-result-count"></span></div>'+
        '<div class="help-layout"><aside class="help-index" aria-label="Help sections">'+
          '<a href="#help-guides">Feature guides</a><a href="#help-workflows">Common workflows</a><a href="#help-system">How StudyAI works</a><a href="#help-faq">FAQ</a>'+
        '</aside><div class="help-content">'+
          '<section id="help-guides"><div class="help-subhead"><span class="small-label">Feature guides</span><h3>What each tool is for</h3></div><div class="help-grid" id="help-grid">'+guides.map(cardMarkup).join('')+'</div><p class="help-no-results" id="help-no-results" hidden>No feature guide matches that search.</p></section>'+
          '<section id="help-workflows" class="help-block"><div class="help-subhead"><span class="small-label">Workflows</span><h3>Common ways to use StudyAI</h3></div><div class="help-workflow-grid">'+workflows.map(w=>'<article><h4>'+safe(w.title)+'</h4><ol>'+w.steps.map(s=>'<li>'+safe(s)+'</li>').join('')+'</ol></article>').join('')+'</div></section>'+
          '<section id="help-system" class="help-block"><div class="help-subhead"><span class="small-label">Learning engine</span><h3>How StudyAI decides what matters</h3></div>'+
            '<div class="help-principles">'+
              '<article><strong>Mastery uses answered practice</strong><p>Opening a topic, reading notes or marking something understood does not raise mastery by itself.</p></article>'+
              '<article><strong>Mistakes stay actionable</strong><p>Incorrect answers can enter the Wrong Answer Notebook, where you can retry them or practice the same skill.</p></article>'+
              '<article><strong>Spaced repetition uses recall ratings</strong><p>Reveal the answer first. Again, Hard, Good and Easy schedule the next review at different intervals.</p></article>'+
              '<article><strong>Recommendations explain why</strong><p>The Smart Review Queue combines signals such as due cards, weak mastery, mistakes and scheduled work. Treat it as a priority guide, not absolute certainty.</p></article>'+
              '<article><strong>Personal AI is source-grounded</strong><p>When using selected sources, the AI should rely on those sources and identify when the answer is not established by them.</p></article>'+
              '<article><strong>Evidence quality matters</strong><p>A tiny number of questions is early evidence. Use repeated practice before treating a mastery result as stable.</p></article>'+
            '</div></section>'+
          '<section id="help-faq" class="help-block"><div class="help-subhead"><span class="small-label">FAQ</span><h3>Common questions</h3></div>'+
            '<details><summary>Why did my mastery not increase after reading a chapter?</summary><p>StudyAI intentionally uses answered practice as mastery evidence. Reading and completion are useful, but they are not proof that you can retrieve or apply the skill.</p></details>'+
            '<details><summary>Why do I have no due flashcards?</summary><p>A card enters spaced repetition after you reveal it and rate your recall. If nothing is due, either you have not scheduled cards yet or the next review time has not arrived.</p></details>'+
            '<details><summary>Why is Personal AI unavailable?</summary><p>Core StudyAI still works without AI. Personal AI needs the server-side Gemini setup to be available. Do not put API keys in browser code or GitHub.</p></details>'+
            '<details><summary>What should I use if I only have 20 minutes?</summary><p>Open Smart Review and choose a short high-priority action, or use a small Practice Studio session. Completing one focused task is better than opening several tools.</p></details>'+
            '<details><summary>Should I always follow a prerequisite suggestion?</summary><p>No. It is a possible foundation to revisit, based on the skill relationship and your recorded evidence. Use it when the underlying concept actually feels weak.</p></details>'+
            '<details><summary>Where is my progress stored?</summary><p>StudyAI is local-first when signed out. If account sync is enabled and you are signed in, the supported StudyAI state can also sync to your account database.</p></details>'+
          '</section>'+
        '</div></div>'+
      '</div>';

    main.appendChild(section);

    const command=$('#command-dialog form');
    if(command&&!command.querySelector('[data-jump="#help"]')){
      const button=document.createElement('button');
      button.type='button';button.dataset.jump='#help';button.innerHTML='Help & tutorial <span>?</span>';
      button.addEventListener('click',()=>{document.querySelector('#command-dialog')?.close();location.hash='#help'});
      command.appendChild(button);
    }

    $('#help-search').addEventListener('input',filterGuides);
    $$('[data-help-guide]').forEach(button=>button.addEventListener('click',()=>openGuide(guides[Number(button.dataset.helpGuide)])));
    $('#help-start-tour').addEventListener('click',startTour);
    renderCount();
  }

  function renderCount(){
    const visible=$$('.help-card').filter(card=>!card.hidden).length;
    const label=$('#help-result-count');
    if(label) label.textContent=visible+' guide'+(visible===1?'':'s');
    const empty=$('#help-no-results');
    if(empty) empty.hidden=visible!==0;
  }

  function filterGuides(){
    const q=$('#help-search')?.value.trim().toLowerCase()||'';
    $$('.help-card').forEach(card=>{card.hidden=!!q&&!card.dataset.helpSearch.includes(q)});
    renderCount();
  }

  function openGuide(guide){
    if(guide.command){
      window.StudyAICommandCenter?.open?.();
      return;
    }
    if(guide.hash) location.hash=guide.hash;
  }

  function ensureTourOverlay(){
    let overlay=$('#help-guided-tour');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.id='help-guided-tour';
    overlay.className='help-guided-tour hidden';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML=
      '<div class="help-tour-mask" data-tour-mask="top"></div>'+
      '<div class="help-tour-mask" data-tour-mask="left"></div>'+
      '<div class="help-tour-mask" data-tour-mask="right"></div>'+
      '<div class="help-tour-mask" data-tour-mask="bottom"></div>'+
      '<div class="help-tour-focus-ring" aria-hidden="true"></div>'+
      '<div class="help-tour-target-shield" aria-hidden="true"></div>'+
      '<section class="help-tour-popover" id="help-tour-popover" role="dialog" aria-modal="true" aria-labelledby="help-tour-title" aria-describedby="help-tour-text">'+
        '<div class="help-tour-step-row"><span class="small-label" id="help-tour-step"></span><button type="button" class="help-tour-skip-link" data-tour-skip>Skip tutorial</button></div>'+
        '<div class="help-tour-progress" id="help-tour-progress"></div>'+
        '<h3 id="help-tour-title"></h3><p id="help-tour-text"></p>'+
        '<div class="help-tour-actions"><button type="button" class="button secondary" data-tour-prev>Back</button><button type="button" class="button primary" data-tour-next>Next →</button></div>'+
      '</section>'+
      '<section class="help-tour-skip-warning" id="help-tour-skip-warning" role="alertdialog" aria-modal="true" aria-labelledby="help-tour-skip-title" hidden>'+
        '<span class="help-tour-warning-mark" aria-hidden="true">!</span><span class="small-label">Before you skip</span>'+
        '<h3 id="help-tour-skip-title">You may miss important parts of StudyAI.</h3>'+
        '<p>You can still use the website without the tutorial, but you may miss features and workflows that help you get the full StudyAI experience. You can replay the tutorial later from Help & Tutorial.</p>'+
        '<div class="help-tour-actions"><button type="button" class="button secondary" data-tour-skip-cancel>Continue tutorial</button><button type="button" class="button ghost" data-tour-skip-confirm>Skip anyway</button></div>'+
      '</section>';
    document.body.appendChild(overlay);

    $('[data-tour-next]',overlay).addEventListener('click',async()=>{
      if(tourIndex>=tour.length-1){endTour('complete');return}
      tourIndex++;await renderTour();
    });
    $('[data-tour-prev]',overlay).addEventListener('click',async()=>{
      if(!tourIndex)return;
      tourIndex--;await renderTour();
    });
    $('[data-tour-skip]',overlay).addEventListener('click',showSkipWarning);
    $('[data-tour-skip-cancel]',overlay).addEventListener('click',hideSkipWarning);
    $('[data-tour-skip-confirm]',overlay).addEventListener('click',()=>endTour('skipped'));
    overlay.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();showSkipWarning()}
      if(event.key==='ArrowRight'&&!$('#help-tour-skip-warning')?.hidden){return}
      if(event.key==='ArrowRight'){event.preventDefault();$('[data-tour-next]',overlay)?.click()}
      if(event.key==='ArrowLeft'&&tourIndex){event.preventDefault();$('[data-tour-prev]',overlay)?.click()}
    });
    return overlay;
  }

  function tourSeen(){
    try{return !!localStorage.getItem(TOUR_STORAGE_KEY)}catch(_){return false}
  }

  function saveTourStatus(status){
    try{localStorage.setItem(TOUR_STORAGE_KEY,JSON.stringify({status,version:2,at:Date.now()}))}catch(_){}
  }

  function showSkipWarning(){
    const overlay=ensureTourOverlay();
    $('#help-tour-popover',overlay).hidden=true;
    const warning=$('#help-tour-skip-warning',overlay);
    warning.hidden=false;
    $('[data-tour-skip-cancel]',warning)?.focus();
  }

  function hideSkipWarning(){
    const overlay=ensureTourOverlay();
    $('#help-tour-skip-warning',overlay).hidden=true;
    $('#help-tour-popover',overlay).hidden=false;
    scheduleTourLayout();
    $('[data-tour-next]',overlay)?.focus();
  }

  function setBox(el,{top,left,width,height}){
    if(!el)return;
    el.style.top=Math.max(0,top)+'px';
    el.style.left=Math.max(0,left)+'px';
    el.style.width=Math.max(0,width)+'px';
    el.style.height=Math.max(0,height)+'px';
  }

  function positionTour(){
    if(!tourActive)return;
    const overlay=ensureTourOverlay(),step=tour[tourIndex];
    const target=$(step.selector)||$('.topbar');
    if(!target)return;
    const rect=target.getBoundingClientRect();
    const pad=10;
    const left=Math.max(8,rect.left-pad);
    const top=Math.max(8,rect.top-pad);
    const right=Math.min(innerWidth-8,rect.right+pad);
    const bottom=Math.min(innerHeight-8,rect.bottom+pad);
    const width=Math.max(1,right-left),height=Math.max(1,bottom-top);

    setBox($('[data-tour-mask="top"]',overlay),{top:0,left:0,width:innerWidth,height:top});
    setBox($('[data-tour-mask="bottom"]',overlay),{top:bottom,left:0,width:innerWidth,height:innerHeight-bottom});
    setBox($('[data-tour-mask="left"]',overlay),{top,left:0,width:left,height});
    setBox($('[data-tour-mask="right"]',overlay),{top,left:right,width:innerWidth-right,height});
    setBox($('.help-tour-focus-ring',overlay),{top,left,width,height});
    setBox($('.help-tour-target-shield',overlay),{top,left,width,height});

    const pop=$('#help-tour-popover',overlay);
    if(pop.hidden)return;
    pop.style.visibility='hidden';
    pop.style.left='16px';
    pop.style.top='16px';
    const popRect=pop.getBoundingClientRect();
    const gap=22;
    const roomBelow=innerHeight-bottom;
    const placement=roomBelow>=popRect.height+gap+12?'below':'above';
    let popTop=placement==='below'?bottom+gap:top-popRect.height-gap;
    popTop=Math.max(12,Math.min(innerHeight-popRect.height-12,popTop));
    let popLeft=(left+right)/2-popRect.width/2;
    popLeft=Math.max(12,Math.min(innerWidth-popRect.width-12,popLeft));
    const arrowX=Math.max(28,Math.min(popRect.width-28,(left+right)/2-popLeft));
    pop.dataset.placement=placement;
    pop.style.setProperty('--tour-arrow-x',arrowX+'px');
    pop.style.left=popLeft+'px';
    pop.style.top=popTop+'px';
    pop.style.visibility='visible';
  }

  function scheduleTourLayout(){
    if(!tourActive||tourLayoutFrame)return;
    tourLayoutFrame=requestAnimationFrame(()=>{tourLayoutFrame=0;positionTour()});
  }

  async function renderTour(){
    const overlay=ensureTourOverlay(),step=tour[tourIndex];
    $('#help-tour-skip-warning',overlay).hidden=true;
    const pop=$('#help-tour-popover',overlay);pop.hidden=false;
    $('#help-tour-step',overlay).textContent=(tourIndex+1)+' of '+tour.length;
    $('#help-tour-title',overlay).textContent=step.title;
    $('#help-tour-text',overlay).textContent=step.text;
    $('#help-tour-progress',overlay).innerHTML=tour.map((_,i)=>'<span class="'+(i<=tourIndex?'active':'')+'"></span>').join('');
    $('[data-tour-prev]',overlay).hidden=tourIndex===0;
    $('[data-tour-next]',overlay).textContent=tourIndex===tour.length-1?'Finish tutorial':'Next →';

    if(step.hash&&location.hash!==step.hash)location.hash=step.hash;
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    const target=$(step.selector)||$('.topbar');
    if(target){
      const r=target.getBoundingClientRect();
      if(r.top<80||r.bottom>innerHeight-80){
        target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center',inline:'nearest'});
        await new Promise(resolve=>setTimeout(resolve,matchMedia('(prefers-reduced-motion: reduce)').matches?40:320));
      }
    }
    positionTour();
    $('[data-tour-next]',overlay)?.focus();
  }

  async function startTour(options={}){
    const auto=!!options.auto;
    if(tourActive||(auto&&tourSeen()))return;
    if(auto&&document.querySelector('dialog[open]'))return;
    tourIndex=0;tourActive=true;tourLastFocus=document.activeElement;
    const overlay=ensureTourOverlay();
    overlay.classList.remove('hidden');overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('help-tour-active');
    await renderTour();
  }

  function endTour(status){
    if(status)saveTourStatus(status);
    tourActive=false;
    const overlay=$('#help-guided-tour');
    if(overlay){overlay.classList.add('hidden');overlay.setAttribute('aria-hidden','true')}
    document.body.classList.remove('help-tour-active');
    if(tourLastFocus&&typeof tourLastFocus.focus==='function')tourLastFocus.focus();
  }

  function armFirstRunTutorial(){
    if(tourSeen())return;
    clearInterval(tourReadyTimer);
    const tryStart=()=>{
      if(tourSeen()){clearInterval(tourReadyTimer);return}
      const product=window.StudyAIProduct;
      const ready=!!product?.prefs?.().onboardingComplete;
      const modalOpen=!!document.querySelector('dialog[open]');
      if(!ready||modalOpen)return;
      clearInterval(tourReadyTimer);
      setTimeout(()=>startTour({auto:true}),350);
    };
    tourReadyTimer=setInterval(tryStart,600);
    tryStart();
  }

  window.addEventListener('resize',scheduleTourLayout);
  window.addEventListener('scroll',scheduleTourLayout,{passive:true});

  window.StudyAIHelp={
    startTour:()=>startTour({auto:false}),
    replayTour:()=>startTour({auto:false}),
    isTourActive:()=>tourActive
  };

  function mountHelp(){
    makeHelp();
    armFirstRunTutorial();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountHelp);
  else mountHelp();
})();