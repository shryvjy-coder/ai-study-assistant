/* StudyAI Command Center: fast local navigation and content search. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=(s,r=document)=>r.querySelector(s);
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let dialog,input,results,active=0,items=[];
 const sections=[
  ['Study library','#study'],['SAT practice','#sat'],['Practice Studio','#practice-studio'],
  ['Flashcards','#flashcards'],['Progress','#progress'],['Planner','#planner'],
  ['Workspace','#workspace'],['Personal AI','#personal-ai'],['Tools','#tools'],['Help & tutorial','#help']
 ];
 function index(){
  const curriculum=bridge.getCurriculum().map(e=>({type:'Topic',title:e.title,detail:[e.board,e.grade,e.subject].join(' · '),keywords:[e.title,e.board,e.grade,e.subject,e.summary].join(' ').toLowerCase(),run:()=>bridge.openTopic(e.id)}));
  const notes=(bridge.exportState().workspaceNotes||[]).map(n=>({type:'Workspace',title:n.title||'Untitled note',detail:n.folder||'General',keywords:[n.title,n.folder,n.source,n.content].join(' ').toLowerCase(),run:()=>{location.hash='#workspace';setTimeout(()=>document.querySelector('[data-note-id="'+CSS.escape(n.id)+'"]')?.click(),80)}}));
  const nav=sections.filter(([,hash])=>$(hash)).map(([title,hash])=>({type:'Go to',title,detail:hash.slice(1),keywords:(title+' '+hash).toLowerCase(),run:()=>{location.hash=hash}}));
  const actions=[
   {type:'Action',title:'Review due flashcards',detail:'Spaced repetition',keywords:'due cards flashcards spaced repetition review',run:()=>bridge.openDue()},
   {type:'Action',title:'Review wrong answers',detail:'Wrong Answer Notebook',keywords:'mistakes wrong answers notebook review',run:()=>bridge.openMistakes()},
   {type:'Action',title:'Build SAT plan',detail:'Planner',keywords:'sat planner exam study plan',run:()=>{location.hash='#sat-study-planner'}},
   {type:'Action',title:'Open Smart Review Queue',detail:'Progress',keywords:'smart review queue weak mastery',run:()=>{location.hash='#smart-review-queue'}},
   {type:'Action',title:'Start diagnostic practice',detail:'Practice Studio',keywords:'diagnostic assessment practice',run:()=>{window.StudyAIPracticeStudio?.configure?.({mode:'diagnostic',section:'all',count:12})|| (location.hash='#practice-studio')}},
   {type:'Action',title:'Adaptive SAT practice',detail:'Practice Studio',keywords:'adaptive sat practice weak skill',run:()=>{window.StudyAIPracticeStudio?.configure?.({mode:'adaptive',section:'all',count:10})|| (location.hash='#practice-studio')}}
  ];
  return [...actions,...nav,...curriculum,...notes];
 }
 function search(query){
  const q=query.trim().toLowerCase(),tokens=q.split(/\s+/).filter(Boolean);
  const all=index();
  if(!q)return all.slice(0,10);
  return all.map(item=>{
   const hay=(item.title+' '+item.detail+' '+item.keywords).toLowerCase();
   let score=0;
   if(item.title.toLowerCase()===q)score+=100;
   if(item.title.toLowerCase().startsWith(q))score+=45;
   if(item.title.toLowerCase().includes(q))score+=25;
   tokens.forEach(t=>{if(hay.includes(t))score+=8});
   if(item.type==='Action')score+=3;
   return {item,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).slice(0,12).map(x=>x.item);
 }
 function draw(){
  items=search(input.value);active=Math.min(active,Math.max(0,items.length-1));
  results.innerHTML=items.length?items.map((item,i)=>'<button type="button" class="cc-result '+(i===active?'active':'')+'" data-cc-index="'+i+'"><span class="cc-kind">'+safe(item.type)+'</span><span><strong>'+safe(item.title)+'</strong><small>'+safe(item.detail)+'</small></span><kbd>↵</kbd></button>').join(''):'<p class="cc-empty">No StudyAI topics, notes, sections or actions matched that search.</p>';
 }
 function run(index){
  const item=items[index];if(!item)return;
  dialog.close();item.run();
 }
 function open(){
  active=0;input.value='';draw();dialog.showModal();requestAnimationFrame(()=>input.focus());
 }
 function mount(){
  if($('#studyai-command-center'))return;
  dialog=document.createElement('dialog');dialog.id='studyai-command-center';dialog.className='cc-dialog';
  dialog.innerHTML='<div class="cc-shell"><div class="cc-search-row"><span aria-hidden="true">⌕</span><input id="cc-input" type="search" autocomplete="off" placeholder="Search topics, notes, tools or actions…" aria-label="Search StudyAI"><kbd>Esc</kbd></div><div id="cc-results" class="cc-results" role="listbox"></div><footer><span><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>Enter</kbd> open</span><span>Search stays in your browser.</span></footer></div>';
  document.body.appendChild(dialog);input=$('#cc-input');results=$('#cc-results');
  const button=document.createElement('button');button.type='button';button.className='cc-launch';button.innerHTML='<span>⌕</span><span>Search StudyAI</span><kbd>Ctrl K</kbd>';button.addEventListener('click',open);
  document.body.appendChild(button);
  input.addEventListener('input',()=>{active=0;draw()});
  input.addEventListener('keydown',e=>{
   if(e.key==='ArrowDown'){e.preventDefault();active=Math.min(items.length-1,active+1);draw()}
   else if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(0,active-1);draw()}
   else if(e.key==='Enter'){e.preventDefault();run(active)}
  });
  results.addEventListener('click',e=>{const b=e.target.closest('[data-cc-index]');if(b)run(Number(b.dataset.ccIndex))});
  document.addEventListener('keydown',e=>{
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dialog.open?dialog.close():open()}
  },true);
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  window.StudyAICommandCenter={open};
  draw();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
