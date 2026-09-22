/* StudyAI performance loader: load heavy optional features only when needed. */
(() => {
  'use strict';

  const loadedStyles=new Set([...document.styleSheets].map(s=>s.href).filter(Boolean));
  const promises=new Map();

  const FEATURES={
    practice:{
      css:['sat-exam-tools.css','practice-studio.css','learning-intelligence.css','exam-question-upgrade.css'],
      scripts:['sat-mock-data.js','sat-exam-tools.js','exam-question-upgrade.js','practice-studio.js','learning-intelligence.js']
    },
    personalAI:{
      css:['personal-ai.css'],
      scripts:['personal-ai.js']
    },
    help:{
      css:['help-center.css'],
      scripts:['help-center.js']
    }
  };

  function style(href){
    const absolute=new URL(href,location.href).href;
    if(loadedStyles.has(absolute)||document.querySelector('link[href="'+CSS.escape(href)+'"]'))return Promise.resolve();
    loadedStyles.add(absolute);
    return new Promise((resolve,reject)=>{
      const link=document.createElement('link');
      link.rel='stylesheet';link.href=href;
      link.onload=()=>resolve();link.onerror=()=>reject(new Error('Could not load '+href));
      document.head.appendChild(link);
    });
  }

  function script(src){
    if(document.querySelector('script[src="'+CSS.escape(src)+'"]'))return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const el=document.createElement('script');
      el.src=src;el.defer=true;
      el.onload=()=>resolve();el.onerror=()=>reject(new Error('Could not load '+src));
      document.body.appendChild(el);
    });
  }

  function loadFeature(name){
    if(promises.has(name))return promises.get(name);
    const feature=FEATURES[name];
    if(!feature)return Promise.resolve(false);
    const promise=(async()=>{
      await Promise.all((feature.css||[]).map(style));
      for(const src of feature.scripts||[])await script(src);
      window.dispatchEvent(new CustomEvent('studyai:feature-loaded',{detail:{name}}));
      return true;
    })().catch(error=>{
      console.error('[StudyAI] Optional feature failed to load:',name,error);
      promises.delete(name);
      return false;
    });
    promises.set(name,promise);
    return promise;
  }

  function featureForHash(hash){
    if(hash==='#personal-ai')return 'personalAI';
    if(hash==='#help'||hash.startsWith('#help-'))return 'help';
    if(hash==='#sat'||hash==='#practice'||hash==='#practice-studio')return 'practice';
    return null;
  }

  async function ensureHash(hash=location.hash){
    const feature=featureForHash(hash);
    if(!feature)return;
    const ok=await loadFeature(feature);
    if(!ok)return;
    const id=hash.slice(1);
    const target=id&&document.getElementById(id);
    if(target&&location.hash===hash)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }

  function warmFromLink(link){
    const href=link?.getAttribute?.('href')||'';
    if(!href.startsWith('#'))return;
    const feature=featureForHash(href);
    if(feature)loadFeature(feature);
  }

  document.addEventListener('pointerover',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(link)warmFromLink(link);
  },{passive:true});
  document.addEventListener('focusin',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(link)warmFromLink(link);
  });
  document.addEventListener('touchstart',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(link)warmFromLink(link);
  },{passive:true});

  window.addEventListener('hashchange',()=>ensureHash());
  window.StudyAIPerformance={loadFeature,ensureHash};

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>ensureHash());
  else ensureHash();
})();