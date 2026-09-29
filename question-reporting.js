/* StudyAI question reporting: capture quality feedback from practice and mocks. */
(() => {
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const LOCAL_KEY='studyai-question-reports-v1';
  const CATEGORIES=[
    ['answer','Answer seems wrong'],
    ['explanation','Explanation is unclear'],
    ['easy','Too easy for its difficulty'],
    ['hard','Too hard for its difficulty'],
    ['duplicate','Duplicate / too similar'],
    ['format','Formatting problem'],
    ['other','Other']
  ];
  let current=null;

  function readLocal(){
    try{return JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]')}catch(_){return []}
  }
  function saveLocal(report){
    const rows=readLocal();
    rows.unshift({...report,localOnly:true});
    localStorage.setItem(LOCAL_KEY,JSON.stringify(rows.slice(0,100)));
  }

  function ensureDialog(){
    let dialog=$('#question-report-dialog');
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id='question-report-dialog';
    dialog.className='question-report-dialog';
    dialog.innerHTML=`
      <form id="question-report-form">
        <div class="question-report-head">
          <div><span class="small-label">Question quality</span><h3>Report this question</h3><p>Your report does not affect your score or mastery.</p></div>
          <button type="button" class="quiet-button" id="question-report-close">Close</button>
        </div>
        <div class="question-report-preview" id="question-report-preview"></div>
        <label>What seems wrong?
          <select name="category" required>
            ${CATEGORIES.map(([value,label])=>'<option value="'+value+'">'+label+'</option>').join('')}
          </select>
        </label>
        <label>Details <span>optional</span>
          <textarea name="details" maxlength="1000" placeholder="Tell us what felt wrong or unrealistic."></textarea>
        </label>
        <p id="question-report-status" role="status"></p>
        <div class="question-report-actions">
          <button type="button" class="button secondary" id="question-report-cancel">Cancel</button>
          <button type="submit" class="button primary">Send report</button>
        </div>
      </form>`;
    document.body.appendChild(dialog);
    $('#question-report-close',dialog).addEventListener('click',()=>dialog.close());
    $('#question-report-cancel',dialog).addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    $('#question-report-form',dialog).addEventListener('submit',submit);
    return dialog;
  }

  function contextFromPractice(){
    const runner=$('#ps-runner');
    const question=$('.ps-question h3',runner);
    if(!runner||!question)return null;
    const crumb=$('.ps-crumb',runner)?.textContent?.trim()||'';
    const passage=$('.ps-passage',runner)?.textContent?.trim()||'';
    return {
      source:'practice-studio',
      questionText:question.textContent.trim(),
      passage,
      context:crumb,
      questionRef:''
    };
  }
  function contextFromMock(){
    const pane=$('#mock-question-pane');
    const question=$('.mock-question-heading h3',pane);
    if(!pane||!question)return null;
    const passage=$('.mock-passage',pane)?.textContent?.trim()||'';
    const section=$('#mock-section-label')?.textContent?.trim()||'SAT mock';
    const module=$('#mock-module-label')?.textContent?.trim()||'';
    const progress=$('.mock-progress-row span',pane)?.textContent?.trim()||'';
    return {
      source:'sat-mock',
      questionText:question.textContent.trim(),
      passage,
      context:[section,module,progress].filter(Boolean).join(' · '),
      questionRef:''
    };
  }

  function openReport(data){
    current=data;if(!current)return;
    const dialog=ensureDialog();
    $('#question-report-preview',dialog).innerHTML='<small>'+safe(current.context||current.source)+'</small><strong>'+safe(current.questionText).slice(0,500)+'</strong>';
    $('#question-report-status',dialog).textContent='';
    $('#question-report-form',dialog).elements.details.value='';
    $('#question-report-form',dialog).elements.category.value='answer';
    dialog.showModal();
  }

  async function submit(event){
    event.preventDefault();
    if(!current)return;
    const form=event.currentTarget,status=$('#question-report-status');
    const submit=form.querySelector('[type="submit"]');
    const payload={
      source:current.source,
      question_ref:current.questionRef||'',
      question_text:String(current.questionText||'').slice(0,1800),
      passage:String(current.passage||'').slice(0,4000),
      context:String(current.context||'').slice(0,500),
      category:form.elements.category.value,
      details:String(form.elements.details.value||'').trim().slice(0,1000),
      page:location.hash||'#home'
    };
    submit.disabled=true;status.textContent='Sending…';
    try{
      const response=await fetch('/api/question-reports',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      if(!response.ok)throw new Error('server rejected report');
      status.textContent='Thanks. The report was saved for review.';
      setTimeout(()=>$('#question-report-dialog')?.close(),650);
    }catch(_){
      saveLocal({...payload,createdAt:Date.now()});
      status.textContent='Saved in this browser. It can still be reviewed locally.';
    }finally{submit.disabled=false}
  }

  function addPracticeButton(){
    const actions=$('#ps-runner .ps-runner-actions');
    if(!actions||actions.querySelector('[data-report-question]'))return;
    if(!contextFromPractice())return;
    const button=document.createElement('button');
    button.type='button';button.className='quiet-button question-report-button';button.dataset.reportQuestion='practice';
    button.textContent='Report question';
    button.addEventListener('click',()=>openReport(contextFromPractice()));
    actions.prepend(button);
  }
  function addMockButton(){
    const heading=$('#mock-question-pane .mock-question-heading');
    if(!heading||heading.querySelector('[data-report-question]'))return;
    if(!contextFromMock())return;
    const button=document.createElement('button');
    button.type='button';button.className='quiet-button question-report-button mock-report-question';button.dataset.reportQuestion='mock';
    button.textContent='Report';
    button.title='Report a problem with this question';
    button.addEventListener('click',()=>openReport(contextFromMock()));
    const flag=$('#mock-flag',heading);
    flag?.insertAdjacentElement('beforebegin',button);
  }
  function decorate(){addPracticeButton();addMockButton()}

  function mount(){
    ensureDialog();
    const observer=new MutationObserver(()=>queueMicrotask(decorate));
    observer.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('studyai:feature-loaded',decorate);
    decorate();
  }

  window.StudyAIQuestionReports={open:openReport,local:readLocal};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();