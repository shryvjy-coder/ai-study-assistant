/* StudyAI notes: collapsible contents dock and independent chapter/lesson rows.
 * Interaction durations are intentionally increased, never replaced with 0.25s.
 * Respects reduced-motion accessibility preferences.
 */
(() => {
  'use strict';
  const KEY='studyai-notes-contents-minimized-v1';
  // The rows previously snapped instantly; a 500 ms transition gives them
  // a natural expand/collapse without changing any lesson or progress data.
  const PANEL_DURATION_MS=500;
  const PANEL_EASING='cubic-bezier(.22, 1, .36, 1)';
  const running=new WeakMap();
  const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateRow(content,collapse){
    const active=running.get(content);
    const interruptedHeight=active?content.getBoundingClientRect().height:null;
    const interruptedOpacity=active?Number(getComputedStyle(content).opacity):null;
    if(active){active.cancel();running.delete(content);}

    if(reducedMotion()||typeof content.animate!=='function'){
      content.hidden=collapse;
      content.inert=collapse;
      content.style.overflow='';
      return;
    }

    // A hidden attribute uses display:none and cannot animate. Only apply it
    // after the closing motion has finished. Expanding first reveals a
    // measurable layout box and animates it from zero height.
    content.hidden=false;
    content.inert=collapse;
    const expandedHeight=content.getBoundingClientRect().height;
    const startHeight=interruptedHeight===null
      ?(collapse?expandedHeight:0):interruptedHeight;
    const endHeight=collapse?0:expandedHeight;
    const startOpacity=interruptedOpacity===null?(collapse?1:0):interruptedOpacity;
    const endOpacity=collapse?0:1;
    content.style.overflow='hidden';
    const animation=content.animate([
      {height:startHeight+'px',opacity:startOpacity},
      {height:endHeight+'px',opacity:endOpacity}
    ],{duration:PANEL_DURATION_MS,easing:PANEL_EASING,fill:'both'});
    running.set(content,animation);
    animation.addEventListener('finish',()=>{
      if(running.get(content)!==animation)return;
      running.delete(content);
      content.hidden=collapse;
      content.inert=collapse;
      content.style.overflow='';
      animation.cancel();
    });
  }

  function setup(){
    const study=document.getElementById('study');
    const button=document.getElementById('toggle-notes-nav');
    const contents=document.getElementById('studyai-notes-nav-content');
    if(!study||!button||!contents)return;

    let saved=null;
    try{saved=localStorage.getItem(KEY)}catch(_){}
    // Keep the prior default on phones, without overriding a saved choice.
    let minimized=saved==='1'||(saved===null&&
      window.matchMedia('(max-width: 760px)').matches);

    const apply=(animated=false)=>{
      // The old handler set [hidden] immediately. That short-circuited the
      // entire Contents panel motion, even though the CSS had a duration.
      // On interaction, animate the panel body BEFORE hiding it.
      if(animated && !reducedMotion()){
        if(minimized){
          animateRow(contents,true);
          study.classList.add('studyai-nav-collapsed');
        }else{
          study.classList.remove('studyai-nav-collapsed');
          animateRow(contents,false);
        }
      }else{
        study.classList.toggle('studyai-nav-collapsed',minimized);
        const previous=running.get(contents);
        if(previous){previous.cancel();running.delete(contents);}
        contents.hidden=minimized;
        contents.inert=minimized;
      }
      button.setAttribute('aria-expanded',String(!minimized));
      button.setAttribute('aria-label',minimized?'Expand notes contents':'Minimize notes contents');
      button.title=minimized?'Expand notes contents':'Minimize notes contents';
      button.textContent=minimized?'›':'‹';
    };
    button.addEventListener('click',()=>{
      minimized=!minimized;
      try{localStorage.setItem(KEY,minimized?'1':'0')}catch(_){}
      apply(true);
    });
    apply();

    // Chapters and subtopics each retain their own saved minimize state.
    const setupRow=(buttonId,contentId,storageKey,label)=>{
      const rowButton=document.getElementById(buttonId);
      const rowContent=document.getElementById(contentId);
      if(!rowButton||!rowContent)return;
      let savedValue=null;
      try{savedValue=localStorage.getItem(storageKey)}catch(_){}
      let rowMinimized=savedValue==='1';
      const updateButton=()=>{
        rowButton.setAttribute('aria-expanded',String(!rowMinimized));
        rowButton.setAttribute('aria-label',
          (rowMinimized?'Expand ':'Minimize ')+label.toLowerCase());
        rowButton.title=(rowMinimized?'Expand ':'Minimize ')+label.toLowerCase();
        rowButton.textContent=rowMinimized?'⌄':'⌃';
      };
      // Initial hydration is immediate, so a saved collapsed panel doesn't
      // flash open while the browser first renders the page.
      rowContent.hidden=rowMinimized;
      rowContent.inert=rowMinimized;
      updateButton();
      // script.js attaches the old chapter Hide handler first.
      rowButton.onclick=()=>{
        rowMinimized=!rowMinimized;
        try{localStorage.setItem(storageKey,rowMinimized?'1':'0')}catch(_){}
        updateButton();
        animateRow(rowContent,rowMinimized);
      };
    };
    setupRow('collapse-chapters','chapter-list',
      'studyai-notes-chapters-minimized-v1','Chapters');
    setupRow('collapse-subtopics','studyai-subtopics-content',
      'studyai-notes-subtopics-minimized-v1','Subtopics');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();
