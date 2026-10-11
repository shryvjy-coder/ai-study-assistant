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
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();
