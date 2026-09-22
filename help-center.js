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
    {title:'1. Learn',text:'Start in Study Library for curriculum topics, or SAT for exam-specific skills.',hash:'#study'},
    {title:'2. Practice',text:'Practice Studio gives you diagnostic, adaptive, mixed, custom and timed sessions.',hash:'#practice-studio'},
    {title:'3. Review mistakes',text:'Wrong Answer Notebook and Smart Review turn misses into specific follow-up actions.',hash:'#mistake-notebook'},
    {title:'4. Remember',text:'Flashcards use spaced repetition. Reveal first, then rate your recall.',hash:'#flashcards'},
    {title:'5. Plan',text:'Planner, SAT Planner and deadlines turn your priorities into manageable sessions.',hash:'#planner'},
    {title:'6. Track',text:'Progress shows mastery from actual practice evidence, not from opening a chapter.',hash:'#progress'},
    {title:'7. Use Personal AI',text:'Add selected sources and use grounded AI for explanations, revision notes, quizzes and flashcards.',hash:'#personal-ai'},
    {title:'8. Find anything fast',text:'Use the Command Center when you already know the topic or action you want.',command:true}
  ];

  let tourIndex=0;

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
        '<button type="button" class="button primary" id="help-start-tour">Start guided tour →</button></header>'+
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

  function ensureTourDialog(){
    let dialog=$('#help-tour-dialog');
    if(dialog) return dialog;
    dialog=document.createElement('dialog');
    dialog.id='help-tour-dialog';
    dialog.className='help-tour-dialog';
    dialog.innerHTML='<div class="help-tour-card"><div class="help-tour-progress" id="help-tour-progress"></div><span class="small-label" id="help-tour-label">Guided tour</span><h3 id="help-tour-title"></h3><p id="help-tour-text"></p><div class="help-tour-actions"><button type="button" class="button ghost" id="help-tour-close">Close</button><button type="button" class="button secondary" id="help-tour-open">Open feature</button><button type="button" class="button primary" id="help-tour-next">Next →</button></div></div>';
    document.body.appendChild(dialog);
    $('#help-tour-close',dialog).addEventListener('click',()=>dialog.close());
    $('#help-tour-next',dialog).addEventListener('click',()=>{tourIndex++;if(tourIndex>=tour.length){dialog.close();return}renderTour()});
    $('#help-tour-open',dialog).addEventListener('click',()=>{
      const step=tour[tourIndex];
      if(step.command) window.StudyAICommandCenter?.open?.();
      else if(step.hash) location.hash=step.hash;
    });
    return dialog;
  }

  function startTour(){
    tourIndex=0;
    const dialog=ensureTourDialog();
    renderTour();
    if(typeof dialog.showModal==='function') dialog.showModal();
  }

  function renderTour(){
    const dialog=ensureTourDialog(),step=tour[tourIndex];
    $('#help-tour-title',dialog).textContent=step.title;
    $('#help-tour-text',dialog).textContent=step.text;
    $('#help-tour-progress',dialog).innerHTML=tour.map((_,i)=>'<span class="'+(i<=tourIndex?'active':'')+'"></span>').join('');
    $('#help-tour-next',dialog).textContent=tourIndex===tour.length-1?'Finish':'Next →';
    $('#help-tour-open',dialog).textContent=step.command?'Open Command Center':'Open feature';
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',makeHelp);
  else makeHelp();
})();