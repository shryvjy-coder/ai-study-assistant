/* StudyAI minimal client error reporting for public-beta reliability. */
(() => {
  'use strict';
  const sent=new Set();
  let count=0;
  function sourceName(value){
    try{
      const url=new URL(String(value||''),location.href);
      return url.pathname.split('/').pop().slice(0,120);
    }catch(_){return String(value||'').split('/').pop().slice(0,120)}
  }
  function report(data){
    if(count>=8)return;
    const message=String(data.message||'').trim().slice(0,500);
    if(!message)return;
    const payload={
      message,
      source:sourceName(data.source),
      line:Number(data.line)||0,
      column:Number(data.column)||0,
      page:String(location.hash||location.pathname||'').slice(0,160)
    };
    const key=[payload.message,payload.source,payload.line,payload.column,payload.page].join('|');
    if(sent.has(key))return;
    sent.add(key);count++;
    fetch('/api/client-errors',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
      keepalive:true
    }).catch(()=>{});
  }
  window.addEventListener('error',event=>{
    report({message:event.message||event.error?.name||'JavaScript error',source:event.filename,line:event.lineno,column:event.colno});
  });
  window.addEventListener('unhandledrejection',event=>{
    const reason=event.reason;
    report({message:'Unhandled promise: '+String(reason?.message||reason?.name||'Promise rejection'),source:'promise',line:0,column:0});
  });
})();