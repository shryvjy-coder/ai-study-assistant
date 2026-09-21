/* Offline, source-based revision sheets for the selected StudyAI curriculum topic. */
(() => {
 'use strict';
 const bridge=window.StudyAIPracticeBridge;
 if(!bridge)return;
 const $=(s,r=document)=>r.querySelector(s);
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let currentSheet=null;
 function entry(){
  const id=bridge.exportState()?.lastTopic;
  return bridge.getCurriculum().find(x=>x.id===id)||null;
 }
 function linesFor(value,max=7){
  return (Array.isArray(value)?value:[]).filter(x=>typeof x==='string'&&x.trim()).slice(0,max);
 }
 function sheetFor(item,mode){
  const data={
   title:item.title,board:item.board,grade:item.grade,subject:item.subject,source:item.id,
   mode,summary:String(item.summary||''),
   keyPoints:linesFor(item.keyPoints,6),formulas:linesFor(item.formulas,14),
   method:linesFor(item.method,5),mistakes:linesFor(item.mistakes,5),lens:String(item.lens||'')
  };
  const title=mode==='formula'?'Formula and relationship sheet':'Quick revision guide';
  const parts=[title+' · '+data.title,data.board+' · '+data.grade+' · '+data.subject,'Source: StudyAI curriculum · '+data.source,''];
  if(mode==='formula'){
   parts.push('Formulas / relationships');
   if(data.formulas.length)parts.push(...data.formulas.map((v,i)=>(i+1)+'. '+v));
   else parts.push('No formulas are specified in the current StudyAI source for this topic. Check your syllabus or textbook rather than assuming a formula.');
   parts.push('','Exam-method reminders');
   parts.push(...(data.method.length?data.method.map((v,i)=>(i+1)+'. '+v):['No method steps supplied for this topic.']));
  }else{
   parts.push('Overview',data.summary||'No overview supplied.','',
    'Core points',...(data.keyPoints.length?data.keyPoints.map((v,i)=>(i+1)+'. '+v):['No core points supplied.']),
    '','Formulas / relationships',...(data.formulas.length?data.formulas.map((v,i)=>(i+1)+'. '+v):['None specified in this source.']),
    '','Method',...(data.method.length?data.method.map((v,i)=>(i+1)+'. '+v):['No method supplied.']),
    '','Common mistakes',...(data.mistakes.length?data.mistakes.map((v,i)=>(i+1)+'. '+v):['No common mistakes supplied.']));
  }
  parts.push('','Check the source notes for completeness; this sheet does not independently verify textbook content.');
  return {...data,heading:title,text:parts.join('\n')};
 }
 function listBlock(title,values,empty){
  return '<section class="revision-sheet-group"><h4>'+safe(title)+'</h4>'+
   (values.length?'<ol>'+values.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol>':'<p>'+safe(empty)+'</p>')+
   '</section>';
 }
 function render(sheet){
  currentSheet=sheet;
  const panel=$('#revision-sheet-panel');panel.hidden=false;
  $('#revision-sheet-heading').textContent=sheet.heading+' · '+sheet.title;
  $('#revision-sheet-subtitle').textContent=[sheet.board,sheet.grade,sheet.subject].join(' · ');
  const content=$('#revision-sheet-content');
  if(sheet.mode==='formula'){
   content.innerHTML=listBlock('Formulas / relationships',sheet.formulas,
    'No formulas are specified in the current StudyAI notes for this topic. Check your syllabus or textbook rather than assuming a formula.')+
    listBlock('Exam-method reminders',sheet.method,'No method steps supplied for this topic.');
  }else{
   content.innerHTML='<section class="revision-sheet-group"><h4>Overview</h4><p>'+safe(sheet.summary||'No overview supplied.')+'</p></section>'+
   listBlock('Core points',sheet.keyPoints,'No core points supplied.')+
   listBlock('Formulas / relationships',sheet.formulas,'None specified in this source.')+
   listBlock('Method',sheet.method,'No method supplied.')+
   listBlock('Common mistakes',sheet.mistakes,'No common mistakes supplied.');
  }
  $('#revision-sheet-source').textContent='From StudyAI curriculum · '+sheet.source+
   ' · check the full note for completeness and accuracy.';
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 function open(mode){
  const selected=entry();
  if(!selected){alert('Open a curriculum topic first.');return}
  render(sheetFor(selected,mode));
 }
 function download(){
  if(!currentSheet)return;
  const file=new Blob([currentSheet.text],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(file),link=document.createElement('a');
  link.href=url;
  link.download='StudyAI-'+(currentSheet.mode==='formula'?'Formula-Sheet-':'Revision-Guide-')+
   currentSheet.title.replace(/[^\w-]+/g,'-').slice(0,65)+'.txt';
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 async function copy(){
  if(!currentSheet)return;
  const notice=$('#revision-sheet-feedback');
  try{
   if(!navigator.clipboard)throw Error('Clipboard unavailable');
   await navigator.clipboard.writeText(currentSheet.text);
   notice.textContent='Copied.';
  }catch(_){notice.textContent='Clipboard unavailable. Use Download TXT instead.'}
 }
 function saveWorkspace(){
  if(!currentSheet)return;
  const name=currentSheet.heading+' · '+currentSheet.title;
  const okay=bridge.saveRevisionNote(name,currentSheet.text,'StudyAI curriculum: '+currentSheet.source);
  $('#revision-sheet-feedback').textContent=okay?'Saved in your Workspace.':'Could not save this sheet.';
 }
 function mount(){
  const footer=$('#reader-view .article-footer');
  if(!footer||$('#revision-sheet-panel'))return;
  const actions=document.createElement('div');
  actions.className='revision-entry-actions';
  actions.innerHTML='<button class="button secondary compact" type="button" id="revision-open-formula">Formula sheet</button>'+
   '<button class="button secondary compact" type="button" id="revision-open-guide">Quick revision guide</button>';
  footer.appendChild(actions);
  const panel=document.createElement('section');
  panel.id='revision-sheet-panel';panel.className='revision-sheet-panel';panel.hidden=true;
  panel.innerHTML='<div class="revision-sheet-top"><div><p class="small-label">From your StudyAI library</p><h3 id="revision-sheet-heading">Revision sheet</h3>'+
   '<p id="revision-sheet-subtitle"></p></div><button type="button" class="quiet-button" id="revision-sheet-close" aria-label="Close revision sheet">Close ✕</button></div>'+
   '<div id="revision-sheet-content"></div><p class="revision-sheet-source" id="revision-sheet-source"></p>'+
   '<div class="revision-sheet-actions"><button type="button" class="button secondary compact" id="revision-sheet-copy">Copy</button>'+
   '<button type="button" class="button secondary compact" id="revision-sheet-download">Download TXT</button>'+
   '<button type="button" class="button secondary compact" id="revision-sheet-save">Save to Workspace</button>'+
   '<button type="button" class="button primary compact" id="revision-sheet-print">Print / Save PDF</button></div>'+
   '<span id="revision-sheet-feedback" role="status"></span>';
  footer.insertAdjacentElement('afterend',panel);
  $('#revision-open-formula').addEventListener('click',()=>open('formula'));
  $('#revision-open-guide').addEventListener('click',()=>open('guide'));
  $('#revision-sheet-close').addEventListener('click',()=>{panel.hidden=true;currentSheet=null});
  $('#revision-sheet-copy').addEventListener('click',copy);
  $('#revision-sheet-download').addEventListener('click',download);
  $('#revision-sheet-save').addEventListener('click',saveWorkspace);
  $('#revision-sheet-print').addEventListener('click',()=>window.print());
  const title=$('#note-title');
  if(title&&window.MutationObserver){
   const observer=new MutationObserver(()=>{
    if(!panel.hidden){panel.hidden=true;currentSheet=null}
   });
   observer.observe(title,{childList:true,characterData:true,subtree:true});
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
 else mount();
})();