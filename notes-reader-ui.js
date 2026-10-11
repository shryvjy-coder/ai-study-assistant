/* StudyAI notes: a study-only contents dock that can be minimized.
 * Does not create a permanent site-wide navigation rail.
 */
(() => {
  'use strict';
  const KEY='studyai-notes-contents-minimized-v1';

  function setup(){
    const study=document.getElementById('study');
    const button=document.getElementById('toggle-notes-nav');
    const contents=document.getElementById('studyai-notes-nav-content');
    if(!study||!button||!contents)return;

    let saved=null;
    try{saved=localStorage.getItem(KEY)}catch(_){}
    // Start compact on phones, but never override a learner's explicit choice.
    let minimized=saved==='1'||(saved===null&&
      window.matchMedia('(max-width: 760px)').matches);

    const apply=()=>{
      study.classList.toggle('studyai-nav-collapsed',minimized);
      contents.hidden=minimized;
      button.setAttribute('aria-expanded',String(!minimized));
      button.setAttribute('aria-label',minimized?'Expand notes contents':'Minimize notes contents');
      button.title=minimized?'Expand notes contents':'Minimize notes contents';
      button.textContent=minimized?'›':'‹';
    };
    button.addEventListener('click',()=>{
      minimized=!minimized;
      try{localStorage.setItem(KEY,minimized?'1':'0')}catch(_){}
      apply();
    });
    apply();

    // Chapters and subtopics are separate stacked sections. Collapsing
    // either one does not change the other or the whole contents dock.
    const setupRow=(buttonId,contentId,storageKey,label)=>{
      const rowButton=document.getElementById(buttonId);
      const rowContent=document.getElementById(contentId);
      if(!rowButton||!rowContent)return;
      let savedValue=null;
      try{savedValue=localStorage.getItem(storageKey)}catch(_){}
      let rowMinimized=savedValue==='1';
      const update=()=>{
        rowContent.hidden=rowMinimized;
        rowButton.setAttribute('aria-expanded',String(!rowMinimized));
        rowButton.setAttribute('aria-label',
          (rowMinimized?'Expand ':'Minimize ')+label.toLowerCase());
        rowButton.title=(rowMinimized?'Expand ':'Minimize ')+label.toLowerCase();
        rowButton.textContent=rowMinimized?'⌄':'⌃';
      };
      // The original chapter button is wired with onclick in script.js.
      // Replace that handler so aria state, visibility and saved preference
      // always stay synchronized.
      rowButton.onclick=()=>{
        rowMinimized=!rowMinimized;
        try{localStorage.setItem(storageKey,rowMinimized?'1':'0')}catch(_){}
        update();
      };
      update();
    };
    setupRow('collapse-chapters','chapter-list',
      'studyai-notes-chapters-minimized-v1','Chapters');
    setupRow('collapse-subtopics','studyai-subtopics-content',
      'studyai-notes-subtopics-minimized-v1','Subtopics');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();
