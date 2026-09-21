(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const MAX_SOURCE = 48000, MAX_TOTAL = 52000, MAX_COUNT = 8;
  const STORE_PREFIX = 'studyai-personal-ai-v1-';
  let sources = [];
  let selected = new Set();
  let scope = 'guest';
  let currentScript = null;
  let currentQuiz = null;
  let generatedCards = [];
  let currentAudioUrl = null;
  let busy = false;
  let providerReady = false;

  function safe(text) {
    return String(text ?? '').replace(/[&<>"']/g,
      c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function id() {
    return 'src-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,9);
  }

  function notify(message, type = 'info') {
    const el = $('#pai-message');
    if (!el) return;
    el.textContent = message;
    el.dataset.type = type;
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  }

  function persistenceKey() { return STORE_PREFIX + scope; }

  function persist() {
    try {
      // Personal AI documents are intentionally NOT included in cloud-synced StudyAI state.
      localStorage.setItem(persistenceKey(), JSON.stringify(sources));
    } catch (_) {
      notify('Browser storage is full. Remove an unused source or copy its text elsewhere. The current document may not persist after reload.', 'error');
    }
  }

  function restore() {
    try {
      const data = JSON.parse(localStorage.getItem(persistenceKey()) || '[]');
      sources = Array.isArray(data) ? data.filter(item =>
        item && typeof item.id === 'string' && typeof item.title === 'string'
        && typeof item.text === 'string' && item.text.length <= MAX_SOURCE).slice(0, MAX_COUNT) : [];
    } catch (_) { sources = []; }
    selected = new Set(sources.map(item => item.id));
    renderSources();
  }

  function selectedSources() {
    return sources.filter(item => selected.has(item.id));
  }

  function checkRoom(text) {
    if (!text.trim()) throw new Error('The source is empty.');
    if (text.length > MAX_SOURCE) throw new Error('This note exceeds 48,000 characters. Split it into smaller sources.');
    if (sources.length >= MAX_COUNT) throw new Error('You can keep up to 8 sources in this workspace. Remove an unused source first.');
    const existing = selectedSources().reduce((sum,item)=>sum+item.text.length,0);
    if (existing + text.length > MAX_TOTAL)
      throw new Error('Your selected sources would exceed 52,000 characters. Uncheck another source first.');
  }

  function addSource(title, text, origin, meta = {}) {
    text = String(text || '').trim();
    checkRoom(text);
    const item = {id:id(),title:String(title || 'Untitled note').trim().slice(0,100),text,origin:origin || 'pasted',...meta};
    sources.unshift(item);
    selected.add(item.id);
    persist();
    renderSources();
    notify('Source added. Select it for an AI task.', 'success');
  }

  function renderSources() {
    const list = $('#pai-source-list');
    if (!list) return;
    if (!sources.length) {
      list.innerHTML = '<div class="pai-empty"><span aria-hidden="true">✎</span><strong>Your source library is empty</strong><p>Upload your notes, paste text, or import a StudyAI chapter or workspace note.</p></div>';
    } else {
      list.innerHTML = sources.map(item => `
        <div class="pai-source ${selected.has(item.id)?'is-selected':''}" data-source="${safe(item.id)}">
          <label><input type="checkbox" data-pai-select="${safe(item.id)}" ${selected.has(item.id)?'checked':''} aria-label="Use ${safe(item.title)} in AI generation">
            <span class="pai-source-detail"><strong>${safe(item.title)}</strong><small>${safe(item.origin)} · ${item.text.length.toLocaleString()} characters</small></span>
          </label>
          <button class="pai-remove" type="button" data-pai-remove="${safe(item.id)}" aria-label="Remove ${safe(item.title)}" title="Remove source">×</button>
        </div>`).join('');
      $$('[data-pai-select]',list).forEach(check=>check.addEventListener('change',()=>{
        if (check.checked) selected.add(check.dataset.paiSelect);
        else selected.delete(check.dataset.paiSelect);
        renderSources();
      }));
      $$('[data-pai-remove]',list).forEach(button=>button.addEventListener('click',()=>{
        sources = sources.filter(item=>item.id!==button.dataset.paiRemove);
        selected.delete(button.dataset.paiRemove);
        persist();
        renderSources();
        notify('Source removed from this browser.');
      }));
    }
    const chosen = selectedSources();
    $('#pai-selected-count').textContent = `${chosen.length} of ${sources.length} selected`;
    $('#pai-source-meter').textContent = `${chosen.reduce((n,item)=>n+item.text.length,0).toLocaleString()} / 52,000 characters selected`;
    const badge = $('#pai-library-count');
    if (badge) badge.textContent = String(sources.length);
  }

  function showOutput(title, text, citations = []) {
    $('#pai-output-title').textContent = title;
    $('#pai-output-text').textContent = text;
    $('#pai-output-text').classList.remove('hidden');
    $('#pai-output-empty').classList.add('hidden');
    $('#pai-output-actions').classList.remove('hidden');
    const refs = $('#pai-output-sources');
    refs.innerHTML = '';
    citations.forEach(item => {
      const chip = document.createElement('span');
      chip.textContent = `[${item.ref}] ${item.title}`;
      refs.appendChild(chip);
    });
    $('#pai-podcast').classList.add('hidden');
    $('#pai-structured')?.classList.add('hidden');
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = null;
    }
  }

  async function readResponse(response) {
    let data;
    try { data = await response.json(); }
    catch (_) { throw new Error('The server returned an unexpected response. Restart StudyAI and try again.'); }
    if (!response.ok || !data.ok)
      throw new Error(data.error || 'Something went wrong. Please try again.');
    return data;
  }

  async function uploadFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) throw new Error('Each file must be 8 MB or smaller.');
    const form = new FormData();
    form.append('file',file,file.name);
    const response = await fetch('/api/personal-ai/extract',{method:'POST',body:form});
    const data = await readResponse(response);
    addSource(data.title,data.text,'Uploaded document');
  }

  function topicEntries() {
    try {
      if (Array.isArray(window.STUDYAI_CURRICULUM) && window.STUDYAI_CURRICULUM.length) {
        return window.STUDYAI_CURRICULUM;
      }
      return (typeof STUDY_DATA !== 'undefined' && Array.isArray(STUDY_DATA)) ? STUDY_DATA : [];
    } catch (_) { return []; }
  }

  function optionValues(select) {
    return select ? [...select.options].map(option => option.value || option.textContent).filter(Boolean) : [];
  }

  function triggerChange(select) {
    if (!select) return;
    select.dispatchEvent(new Event('change',{bubbles:true}));
  }

  function syncStudyLibrary(boardValue, gradeValue, subjectValue, topicValue = '') {
    const coreBoard = document.querySelector('#board-filter');
    const coreGrade = document.querySelector('#grade-filter');
    const coreSubject = document.querySelector('#subject-filter');
    if (!coreBoard || !coreGrade || !coreSubject) return false;

    if (boardValue && coreBoard.value !== boardValue) {
      coreBoard.value = boardValue;
      triggerChange(coreBoard);
    }
    if (gradeValue && coreGrade.value !== gradeValue) {
      coreGrade.value = gradeValue;
      triggerChange(coreGrade);
    }
    if (subjectValue && coreSubject.value !== subjectValue) {
      coreSubject.value = subjectValue;
      triggerChange(coreSubject);
    }
    if (topicValue) {
      const button = [...document.querySelectorAll('#chapter-list .chapter-item')]
        .find(item => item.dataset.topic === topicValue || item.textContent.replace(/^✓\s*/,'').trim() === topicValue);
      if (button) button.click();
    }
    return true;
  }

  function domTopicDescriptor() {
    const board = $('#pai-topic-board')?.value || '';
    const grade = $('#pai-topic-grade')?.value || '';
    const subject = $('#pai-topic-subject')?.value || '';
    const title = $('#pai-topic-topic')?.value || '';
    if (!board || !grade || !subject || !title) return null;

    const opened = window.StudyAICurriculum?.open?.(board,grade,subject,title) || null;
    if (!opened) syncStudyLibrary(board,grade,subject,title);
    const summary = opened?.summary || document.querySelector('#note-summary')?.textContent?.trim() || '';
    const detailed = opened?.detailed || document.querySelector('#detailed-notes')?.textContent?.trim() || '';
    const quick = opened?.quick || document.querySelector('#quick-review')?.textContent?.trim() || '';
    const renderedText = [
      `Topic: ${title}`,
      `Curriculum: ${board}\nStage: ${grade}\nSubject: ${subject}`,
      summary ? `Big picture:\n${summary}` : '',
      detailed ? `StudyAI detailed notes:\n${detailed}` : '',
      quick ? `Quick review:\n${quick}` : ''
    ].filter(Boolean).join('\n\n');

    return {
      id:`StudyAI|${board}|${grade}|${subject}|${title}`,
      board,grade,subject,title,summary,
      _renderedText:renderedText
    };
  }

  function paiUnique(values) {
    return [...new Set(values)];
  }

  function fillTopicSelect(select, values, chosen) {
    if (!select) return;
    select.innerHTML = '';
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      if (value === chosen) option.selected = true;
      select.appendChild(option);
    });
  }

  function topicSourceText(entry) {
    if (entry?._renderedText) return entry._renderedText;
    const sections = [
      `Topic: ${entry.title}`,
      `Curriculum: ${entry.board}\nStage: ${entry.grade}\nSubject: ${entry.subject}`,
      entry.summary ? `Big picture:\n${entry.summary}` : '',
      entry.lens ? `Topic lens:\n${entry.lens}` : '',
      (entry.keyPoints || []).length ? `Core ideas:\n${entry.keyPoints.map(x => '- ' + x).join('\n')}` : '',
      (entry.formulas || []).length ? `Key relationships / formulas:\n${entry.formulas.map(x => '- ' + x).join('\n')}` : '',
      (entry.method || []).length ? `Problem-solving method:\n${entry.method.map((x,i) => `${i+1}. ${x}`).join('\n')}` : '',
      (entry.mistakes || []).length ? `Common mistakes:\n${entry.mistakes.map(x => '- ' + x).join('\n')}` : ''
    ];
    return sections.filter(Boolean).join('\n\n');
  }

  function selectedTopicEntry() {
    const value = $('#pai-topic-topic')?.value;
    const direct = topicEntries().find(entry => entry.id === value);
    return direct || domTopicDescriptor();
  }

  function updateTopicPicker(level = 'board') {
    const board = $('#pai-topic-board');
    const grade = $('#pai-topic-grade');
    const subject = $('#pai-topic-subject');
    const topic = $('#pai-topic-topic');
    if (!board || !grade || !subject || !topic) return;

    // Preferred path: StudyAI core publishes the curriculum itself. This is
    // deterministic and does not depend on rendered Study Library controls.
    const core = window.StudyAICurriculumData;
    if (core && typeof core.boards === 'function') {
      const boards = core.boards();
      fillTopicSelect(board,boards,boards.includes(board.value) ? board.value : boards[0]);
      const grades = core.grades(board.value);
      fillTopicSelect(grade,grades,grades.includes(grade.value) ? grade.value : grades[0]);
      const subjects = core.subjects(board.value,grade.value);
      fillTopicSelect(subject,subjects,subjects.includes(subject.value) ? subject.value : subjects[0]);
      const entries = core.topics(board.value,grade.value,subject.value);
      const previous = topic.value;
      topic.innerHTML='';
      entries.forEach(entry=>{
        const option=document.createElement('option');
        option.value=entry.id;
        option.textContent=entry.title;
        if(entry.id===previous) option.selected=true;
        topic.appendChild(option);
      });
      updateTopicPreview();
      return;
    }

    const preview=$('#pai-topic-preview');
    if(preview) preview.textContent='Curriculum is loading…';
  }

  function updateTopicPreview() {
    const preview = $('#pai-topic-preview');
    if (!preview) return;
    const data = topicEntries();
    let entry = null;
    const value = $('#pai-topic-topic')?.value;
    if (data.length) entry = data.find(item => item.id === value) || null;
    if (!entry && value) {
      entry = {
        title:value,
        summary:'This StudyAI topic can be used directly as a Personal AI source. Topic Mode will read the Study Library notes when you start a tool.'
      };
    }
    if (!entry) {
      preview.textContent = 'Choose a topic to begin.';
      return;
    }
    preview.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = entry.title;
    const p = document.createElement('p');
    p.textContent = entry.summary || 'This StudyAI topic can be used as a Personal AI source.';
    preview.append(strong,p);
  }

  function addSelectedTopic() {
    const entry = selectedTopicEntry();
    if (!entry) {
      notify('Choose a StudyAI topic first.','error');
      return null;
    }
    const existing = sources.find(item => item.studyaiId === entry.id);
    if (existing) {
      selected.add(existing.id);
      renderSources();
      notify(`${entry.title} is selected as a source.`,'success');
      return existing;
    }
    try {
      addSource(
        entry.title,
        topicSourceText(entry),
        `StudyAI topic · ${entry.board} · ${entry.grade} · ${entry.subject}`,
        {studyaiId: entry.id}
      );
      return sources.find(item => item.studyaiId === entry.id) || null;
    } catch (error) {
      notify(error.message,'error');
      return null;
    }
  }

  function setupTopicMode() {
    const panel = $('#pai-topic-mode');
    if (!panel) return;
    const count = topicEntries().length;
    panel.dataset.topicCount = String(count);
    updateTopicPicker('init');
    window.addEventListener('studyai:curriculum-ready',()=>updateTopicPicker('init'),{once:true});
    $('#pai-topic-board').addEventListener('change',()=>updateTopicPicker('board'));
    $('#pai-topic-grade').addEventListener('change',()=>updateTopicPicker('grade'));
    $('#pai-topic-subject').addEventListener('change',()=>updateTopicPicker('subject'));
    $('#pai-topic-topic').addEventListener('change',updateTopicPreview);
    $('#pai-use-topic').addEventListener('click',addSelectedTopic);
  }

  function setOutputSources(citations = []) {
    const refs = $('#pai-output-sources');
    refs.innerHTML = '';
    citations.forEach(item => {
      const chip = document.createElement('span');
      chip.textContent = `[${item.ref}] ${item.title}`;
      refs.appendChild(chip);
    });
  }

  function showStructured(title, citations = []) {
    $('#pai-output-title').textContent = title;
    $('#pai-output-empty').classList.add('hidden');
    $('#pai-output-text').classList.add('hidden');
    $('#pai-output-actions').classList.add('hidden');
    $('#pai-podcast').classList.add('hidden');
    const box = $('#pai-structured');
    box.classList.remove('hidden');
    box.innerHTML = '';
    setOutputSources(citations);
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = null;
    }
  }

  function renderQuiz(questions, refs = []) {
    currentQuiz = Array.isArray(questions) ? questions : [];
    generatedCards = [];
    showStructured('AI quiz', refs);
    const box = $('#pai-structured');
    const header = document.createElement('div');
    header.className = 'pai-quiz-head';
    header.innerHTML = '<strong>Topic check</strong><span id="pai-quiz-score">0 answered · 0 correct</span>';
    box.appendChild(header);
    let answered = 0, correct = 0;

    currentQuiz.forEach((item, index) => {
      const card = document.createElement('section');
      card.className = 'pai-quiz-card';
      const q = document.createElement('h4');
      q.textContent = `${index + 1}. ${item.question}`;
      const options = document.createElement('div');
      options.className = 'pai-quiz-options';
      const feedback = document.createElement('div');
      feedback.className = 'pai-quiz-feedback hidden';

      item.options.forEach((optionText, optionIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${optionText}`;
        button.addEventListener('click', () => {
          if (card.dataset.answered) return;
          card.dataset.answered = '1';
          answered += 1;
          if (optionIndex === item.answerIndex) correct += 1;
          [...options.querySelectorAll('button')].forEach((choice, choiceIndex) => {
            choice.disabled = true;
            if (choiceIndex === item.answerIndex) choice.classList.add('is-correct');
            else if (choiceIndex === optionIndex) choice.classList.add('is-wrong');
          });
          feedback.textContent = `${optionIndex === item.answerIndex ? 'Correct. ' : 'Not quite. '}${item.explanation}${item.references ? ' ' + item.references : ''}`;
          feedback.classList.remove('hidden');
          $('#pai-quiz-score').textContent = `${answered} answered · ${correct} correct`;
        });
        options.appendChild(button);
      });
      card.append(q,options,feedback);
      box.appendChild(card);
    });
  }

  function renderFlashcards(cards, refs = []) {
    currentQuiz = null;
    generatedCards = Array.isArray(cards) ? cards : [];
    showStructured('AI flashcards', refs);
    const box = $('#pai-structured');
    const intro = document.createElement('div');
    intro.className = 'pai-cardset-head';
    intro.innerHTML = `<div><strong>${generatedCards.length} active-recall cards</strong><span>Click a card to reveal its answer.</span></div><button type="button" class="button primary compact" id="pai-load-generated-cards">Study these flashcards →</button>`;
    box.appendChild(intro);

    generatedCards.forEach((item, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'pai-generated-card';
      const front = document.createElement('span');
      front.className = 'pai-generated-front';
      front.textContent = `${index + 1}. ${item.front}`;
      const back = document.createElement('span');
      back.className = 'pai-generated-back';
      back.textContent = `${item.back}${item.references ? ' ' + item.references : ''}`;
      back.hidden = true;
      card.append(front,back);
      card.addEventListener('click',()=>{
        const showing = !back.hidden;
        back.hidden = showing;
        front.hidden = !showing;
        card.classList.toggle('is-flipped',!showing);
      });
      box.appendChild(card);
    });

    $('#pai-load-generated-cards')?.addEventListener('click',()=>{
      if (!generatedCards.length) return;
      try {
        activeDeck = generatedCards.map((item,index)=>({
          id:`pai|${Date.now()}|${index}`,
          front:item.front,
          back:item.back,
          source:'Personal AI'
        }));
        cardIndex = 0;
        if (typeof renderCard === 'function') renderCard();
        if (typeof renderFlashStats === 'function') renderFlashStats();
        location.hash = '#flashcards';
        notify('AI flashcards loaded into your StudyAI deck.','success');
      } catch (_) {
        notify('Could not open the StudyAI flashcard deck. You can still use the cards here.','error');
      }
    });
  }

  function refreshWorkspaceChoices() {
    const select = $('#pai-workspace-select');
    if (!select) return;
    select.innerHTML = '<option value="">Choose an existing note…</option>';
    try {
      if (typeof state !== 'undefined' && Array.isArray(state.workspaceNotes)) {
        state.workspaceNotes.forEach(note => {
          const option=document.createElement('option');
          option.value=note.id;
          option.textContent=note.title || 'Untitled note';
          select.appendChild(option);
        });
      }
    } catch (_) {}
  }

  function importWorkspace() {
    const value = $('#pai-workspace-select').value;
    try {
      if (typeof state === 'undefined') return notify('Workspace is not available.','error');
      const note = state.workspaceNotes.find(item=>item.id===value);
      if (!note) return notify('Choose a workspace note.','error');
      addSource(note.title,note.content,'StudyAI workspace');
    } catch(e){notify(e.message,'error');}
  }

  function importChapter() {
    try {
      if (typeof currentEntry !== 'function') return notify('Open a chapter in the Study Library first.','error');
      const entry = currentEntry();
      if (!entry) return notify('Open a chapter in the Study Library first.','error');
      const text = [
        entry.title,
        entry.summary,
        'Core points:\n'+(entry.keyPoints||[]).join('\n'),
        'Formulas:\n'+(entry.formulas||[]).join('\n'),
        'Method:\n'+(entry.method||[]).join('\n'),
        'Common mistakes:\n'+(entry.mistakes||[]).join('\n'),
        entry.lens ? 'Overview:\n'+entry.lens : ''
      ].join('\n\n');
      addSource(entry.title,text,'Current chapter outline');
    } catch(e){notify(e.message,'error');}
  }

  async function runText(mode, trigger = null) {
    if (busy) return;
    const chosen = selectedSources();
    if (!chosen.length) return notify('Select at least one source first.','error');
    const total = chosen.reduce((n,item)=>n+item.text.length,0);
    if (total > MAX_TOTAL) return notify('Select fewer notes: the limit is 52,000 characters.','error');
    let question = mode === 'ask' ? $('#pai-question').value.trim() : '';
    if (mode === 'ask' && !question) return notify('Type a question about your notes.','error');
    if (mode === 'explain' || mode === 'teach') {
      const depth = $('#pai-depth')?.value || 'Standard';
      question = `Requested explanation depth: ${depth}.`;
    }
    if (!providerReady) return notify('Personal AI needs a server-side Gemini API key. Follow the setup note below.','error');

    busy=true;
    const buttons = [...document.querySelectorAll('[data-pai-mode],[data-pai-topic-mode]')];
    buttons.forEach(button=>button.disabled=true);
    const clicked=trigger || $(`[data-pai-mode="${mode}"]`) || $(`[data-pai-topic-mode="${mode}"]`);
    const oldMarkup=clicked?.innerHTML || '';
    if (clicked) clicked.textContent = mode==='podcast'?'Writing discussion…':'Generating…';
    notify(mode==='podcast'?'Creating a grounded two-voice discussion…':'Reading the selected notes…');
    try {
      const response = await fetch('/api/personal-ai/generate',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          mode,
          question,
          sources:chosen.map(({title,text})=>({title,text}))
        })
      });
      const data=await readResponse(response);
      if (mode === 'podcast') {
        currentScript=data.script;
        currentQuiz=null;
        generatedCards=[];
        renderPodcast(data.script,data.sources);
        notify('Discussion script ready. Review or edit it, then generate the audio.','success');
      } else if (mode === 'quiz') {
        currentScript=null;
        renderQuiz(data.quiz?.questions || [],data.sources||[]);
        notify('Quiz ready. Answer each question and check the grounded explanations.','success');
      } else if (mode === 'flashcards') {
        currentScript=null;
        renderFlashcards(data.flashcards?.cards || [],data.sources||[]);
        notify('Flashcards ready. You can study them here or load them into the StudyAI deck.','success');
      } else {
        currentScript=null;
        currentQuiz=null;
        generatedCards=[];
        const titles={
          summary:'Source summary',
          notes:'Generated study notes',
          improve:'Improved notes',
          ask:'Answer from your notes',
          explain:'Topic explanation',
          revision:'Revision notes',
          teach:'Teach me'
        };
        showOutput(titles[mode] || 'Personal AI',data.text,data.sources||[]);
        notify('Ready. Check the source references before using the result.','success');
      }
    } catch(error) {notify(error.message,'error');}
    finally {
      busy=false;
      buttons.forEach(button=>button.disabled=false);
      if (clicked) clicked.innerHTML=oldMarkup;
    }
  }

  function transcriptText() {
    if (!currentScript) return '';
    return currentScript.turns.map(turn=>`${turn.speaker}: ${turn.text}`).join('\n\n');
  }

  function renderPodcast(script, refs = []) {
    showOutput('AI audio discussion script',transcriptText(),refs);
    const container=$('#pai-podcast');
    container.classList.remove('hidden');
    $('#pai-podcast-title').textContent=script.title || 'StudyAI audio discussion';
    const editor=$('#pai-transcript-editor');
    editor.innerHTML='';
    script.turns.forEach((turn,index)=>{
      const row=document.createElement('div');
      row.className='pai-transcript-row';
      const label=document.createElement('label');
      label.textContent=`${turn.speaker} · Turn ${index+1}`;
      const textarea=document.createElement('textarea');
      textarea.value=turn.text;
      textarea.maxLength=450;
      textarea.rows=3;
      textarea.setAttribute('aria-label',`${turn.speaker} turn ${index+1}`);
      textarea.addEventListener('input',()=>{
        currentScript.turns[index].text=textarea.value;
        $('#pai-output-text').textContent=transcriptText();
      });
      row.append(label,textarea);
      editor.appendChild(row);
    });
    $('#pai-audio-result').classList.add('hidden');
  }

  async function makeAudio() {
    if (!currentScript || busy) return;
    if (!providerReady) return notify('A Gemini API key is needed to generate audio.','error');
    busy=true;
    const button=$('#pai-generate-audio');
    button.disabled=true;
    const label=button.textContent;
    button.textContent='Generating audio…';
    notify('Synthesizing both speakers. This can take a minute or two…');
    try {
      const response=await fetch('/api/personal-ai/audio',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({turns:currentScript.turns})
      });
      if (!response.ok) await readResponse(response);
      const blob=await response.blob();
      if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl=URL.createObjectURL(blob);
      const audio=$('#pai-audio-player');
      audio.src=currentAudioUrl;
      const link=$('#pai-audio-download');
      link.href=currentAudioUrl;
      link.download='studyai-personal-ai-podcast.wav';
      $('#pai-audio-result').classList.remove('hidden');
      notify('Your two-voice audio discussion is ready. The voices are AI-generated.','success');
    } catch(error) {notify(error.message,'error');}
    finally {busy=false;button.disabled=false;button.textContent=label;}
  }

  function saveToWorkspace() {
    const text=$('#pai-output-text').textContent.trim();
    if (!text) return notify('Generate notes before saving.','error');
    try {
      if (typeof state === 'undefined' || !Array.isArray(state.workspaceNotes)) {
        return notify('Workspace is not available right now. Copy the output instead.','error');
      }
      const title=`Personal AI · ${$('#pai-output-title').textContent}`;
      const note={
        id:'n'+Date.now(),
        title:title.slice(0,100),
        folder:(state.folders||[])[0]||'General',
        source:selectedSources().map(x=>x.title).join('; ').slice(0,230),
        content:text,
        updated:Date.now()
      };
      state.workspaceNotes.unshift(note);
      save();
      if (typeof renderWorkspace==='function') renderWorkspace();
      notify('Saved to your StudyAI Workspace.','success');
    } catch(e){notify('Could not save the note. Copy it and try again.','error');}
  }

  function addNavLink() {
    const nav=$('#main-nav');
    if (nav && !$('#main-nav a[href="#personal-ai"]')) {
      const a=document.createElement('a');
      a.href='#personal-ai';a.textContent='Personal AI';
      const before=nav.querySelector('a[href="#flashcards"]');
      nav.insertBefore(a,before || null);
    }
    const rail=$('#studyai-right-rail nav');
    if (rail && !rail.querySelector('a[href="#personal-ai"]')) {
      const a=document.createElement('a');
      a.href='#personal-ai';
      a.innerHTML='<span class="rail-icon" aria-hidden="true">✦</span><span>Personal AI</span>';
      const before=rail.querySelector('a[href="#flashcards"]');
      rail.insertBefore(a,before||null);
    }
  }

  function mount() {
    if ($('#personal-ai')) return;
    const target=$('#workspace');
    if (!target) return;
    const section=document.createElement('section');
    section.id='personal-ai';
    section.className='section pai-section';
    section.innerHTML=`
      <div class="shell">
        <header class="section-head pai-head">
          <div>
            <span class="kicker">Your notes. Your questions. Your studio.</span>
            <h2>Personal AI <span aria-hidden="true">✦</span></h2>
            <p>Turn your material into clearer notes, grounded answers, and a two-voice study discussion. Select exactly which sources the AI can use.</p>
          </div>
          <div class="pai-availability"><span class="pai-status-dot"></span><strong id="pai-provider-status">Checking Gemini setup…</strong><small>Gemini-powered · server-side key</small></div>
        </header>
        <div class="pai-privacy"><strong>Before you start</strong><p>Only upload notes you have permission to share. Selected text is sent to Google's Gemini API when you generate; documents stay in this browser and are not added to account sync. This is not a private on-device AI. Google states free-tier Gemini API data may be used to improve its products, so avoid passwords, personal records or other sensitive information.</p></div>

        <section class="pai-topic-mode" id="pai-topic-mode">
          <div class="pai-topic-heading">
            <div><span class="small-label">00 · Topic Mode</span><h3>Start with a StudyAI topic</h3><p>No notes yet? Pick a curriculum topic, then explain it, revise it, quiz yourself, make flashcards, or turn it into an audio lesson.</p></div>
            <div class="pai-depth-wrap"><label for="pai-depth">Explanation depth</label><select id="pai-depth"><option>Quick</option><option selected>Standard</option><option>Deep</option></select></div>
          </div>
          <div class="pai-topic-selectors">
            <label>Curriculum<select id="pai-topic-board"></select></label>
            <label>Class / stage<select id="pai-topic-grade"></select></label>
            <label>Subject<select id="pai-topic-subject"></select></label>
            <label>Topic<select id="pai-topic-topic"></select></label>
          </div>
          <div class="pai-topic-preview" id="pai-topic-preview"></div>
          <div class="pai-topic-actions">
            <button type="button" class="button secondary compact" id="pai-use-topic">＋ Use this topic as a source</button>
            <span>Keep your uploaded notes selected too to combine school material with StudyAI.</span>
          </div>
          <div class="pai-topic-tools">
            <button type="button" data-pai-topic-mode="explain"><strong>Explain topic</strong><small>At your chosen depth</small></button>
            <button type="button" data-pai-topic-mode="revision"><strong>Revision notes</strong><small>Fast exam-focused review</small></button>
            <button type="button" data-pai-topic-mode="teach"><strong>Teach me</strong><small>Lesson + recall checkpoints</small></button>
            <button type="button" data-pai-topic-mode="quiz"><strong>Quiz me</strong><small>6 grounded MCQs</small></button>
            <button type="button" data-pai-topic-mode="flashcards"><strong>Make flashcards</strong><small>10 active-recall cards</small></button>
            <button type="button" data-pai-topic-mode="podcast"><strong>Audio lesson</strong><small>Two-voice discussion</small></button>
          </div>
        </section>

        <div class="pai-layout">
          <aside class="pai-library">
            <div class="pai-card-head"><div><span class="small-label">01 · Source library</span><h3>Bring your material</h3></div><span class="pai-count" id="pai-library-count">0</span></div>
            <label class="pai-upload" for="pai-file"><span aria-hidden="true">↑</span><strong>Upload notes</strong><small>PDF, DOCX, TXT, MD · up to 8 MB per file</small><input id="pai-file" type="file" accept=".pdf,.docx,.txt,.md" multiple></label>
            <div class="pai-import-actions">
              <button type="button" id="pai-import-chapter" class="button secondary compact">＋ Current chapter</button>
              <div class="pai-import-workspace">
                <select id="pai-workspace-select" aria-label="Choose a workspace note"><option value="">Choose an existing note…</option></select>
                <button id="pai-import-workspace" class="button secondary compact" type="button">Import</button>
              </div>
            </div>
            <details class="pai-paste"><summary>＋ Paste your own text</summary><label for="pai-paste-title">Title</label><input id="pai-paste-title" placeholder="e.g. Electrochemistry class notes" maxlength="100"><label for="pai-paste-text">Note text</label><textarea id="pai-paste-text" rows="6" placeholder="Paste your notes here…"></textarea><button id="pai-add-paste" type="button" class="button primary compact">Add source</button></details>
            <div class="pai-list-heading"><strong>Your sources</strong><small id="pai-selected-count">0 selected</small></div>
            <div id="pai-source-list" class="pai-source-list"></div>
            <div class="pai-meter" id="pai-source-meter">0 / 52,000 characters selected</div>
            <button type="button" id="pai-clear" class="pai-clear">Clear all personal sources</button>
          </aside>

          <div class="pai-studio">
            <div class="pai-studio-top"><span class="small-label">02 · Create</span><h3>What should we make?</h3><p>Every result is based on the selected notes, with source markers [S1], [S2], etc.</p></div>
            <div class="pai-mode-grid">
              <button type="button" data-pai-mode="summary"><span class="pai-mode-icon amber">≡</span><strong>Summarize</strong><small>A concise, faithful overview</small></button>
              <button type="button" data-pai-mode="notes"><span class="pai-mode-icon cobalt">✎</span><strong>Study notes</strong><small>Structured, detailed notes</small></button>
              <button type="button" data-pai-mode="improve"><span class="pai-mode-icon violet">✦</span><strong>Improve notes</strong><small>Clarity without invented facts</small></button>
              <button type="button" data-pai-mode="podcast"><span class="pai-mode-icon coral">♫</span><strong>AI podcast</strong><small>Two-person audio discussion</small></button>
            </div>
            <div class="pai-ask">
              <label for="pai-question">Ask your notes</label>
              <textarea id="pai-question" rows="3" maxlength="1200" placeholder="What do my notes say about this concept? Where is the formula explained?"></textarea>
              <button type="button" class="button primary" data-pai-mode="ask">Ask Personal AI →</button>
            </div>
            <div id="pai-message" class="pai-message" role="status">Add a source to get started.</div>
            <div class="pai-config-note">AI generation requires a StudyAI account and a server-side Gemini API key. Gemini's free tier has usage/rate limits. Uploading, pasting and viewing sources work without an API key.</div>
          </div>

          <article class="pai-results">
            <div class="pai-card-head"><div><span class="small-label">03 · Output</span><h3 id="pai-output-title">Your output</h3></div><span class="pai-result-icon" aria-hidden="true">✦</span></div>
            <div id="pai-output-empty" class="pai-output-empty"><span aria-hidden="true">✧</span><strong>Ready when you are</strong><p>Select a source and choose a tool. Your personalized notes or discussion will appear here.</p></div>
            <pre id="pai-output-text" class="pai-output-text hidden"></pre>
            <div id="pai-output-sources" class="pai-output-sources"></div>
            <div id="pai-structured" class="pai-structured hidden"></div>
            <div id="pai-podcast" class="pai-podcast hidden">
              <h4 id="pai-podcast-title">Audio discussion</h4>
              <p>Edit the two-speaker script before creating audio.</p>
              <div id="pai-transcript-editor" class="pai-transcript-editor"></div>
              <button id="pai-generate-audio" class="button primary" type="button">Generate two-voice audio ♫</button>
              <div id="pai-audio-result" class="pai-audio-result hidden"><strong>AI-generated voices · not human hosts</strong><audio id="pai-audio-player" controls preload="none"></audio><a id="pai-audio-download" class="button secondary compact" href="#" download="studyai-personal-ai-podcast.wav">Save audio file</a></div>
            </div>
            <div id="pai-output-actions" class="pai-output-actions hidden">
              <button id="pai-copy" class="button secondary compact" type="button">Copy result</button>
              <button id="pai-save-workspace" class="button secondary compact" type="button">Save to Workspace</button>
            </div>
          </article>
        </div>
      </div>`;
    target.insertAdjacentElement('afterend',section);
    addNavLink();

    $('#pai-file').addEventListener('change', async event=>{
      const files=Array.from(event.target.files||[]);
      event.target.value='';
      for(const file of files){
        try{
          notify('Reading '+file.name+'…');
          await uploadFile(file);
        }catch(e){notify(`${file.name}: ${e.message}`,'error');}
      }
    });
    $('#pai-add-paste').addEventListener('click',()=>{
      try {
        addSource($('#pai-paste-title').value || 'Pasted notes',$('#pai-paste-text').value,'Pasted text');
        $('#pai-paste-title').value='';$('#pai-paste-text').value='';
      } catch(e){notify(e.message,'error');}
    });
    $('#pai-import-chapter').addEventListener('click',importChapter);
    $('#pai-workspace-select').addEventListener('focus',refreshWorkspaceChoices);
    $('#pai-import-workspace').addEventListener('click',importWorkspace);
    $('#pai-clear').addEventListener('click',()=>{
      if (!sources.length) return;
      if (!confirm('Remove all Personal AI sources stored in this browser?')) return;
      sources=[];selected.clear();persist();renderSources();notify('Personal AI source library cleared.');
    });
    document.querySelectorAll('[data-pai-mode]').forEach(button=>button.addEventListener('click',()=>runText(button.dataset.paiMode,button)));
    document.querySelectorAll('[data-pai-topic-mode]').forEach(button=>button.addEventListener('click',()=>{
      const source = addSelectedTopic();
      if (!source) return;
      runText(button.dataset.paiTopicMode,button);
    }));
    $('#pai-generate-audio').addEventListener('click',makeAudio);
    $('#pai-copy').addEventListener('click',()=>{
      const output=$('#pai-output-text').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(output).then(()=>notify('Copied to clipboard.','success')).catch(()=>notify('Clipboard access was blocked.','error'));
      else notify('Clipboard is not available in this browser.','error');
    });
    $('#pai-save-workspace').addEventListener('click',saveToWorkspace);
    refreshWorkspaceChoices();
    setupTopicMode();
  }

  async function init() {
    mount();
    try {
      const [statusResponse,meResponse]=await Promise.all([
        fetch('/api/personal-ai/status'),
        fetch('/api/auth/me')
      ]);
      const status=await readResponse(statusResponse);
      const me=await readResponse(meResponse);
      providerReady=!!status.configured;
      scope=me.user?.id ? 'account-'+String(me.user.id) : 'guest';
      $('#pai-provider-status').textContent=providerReady ? 'Gemini connection ready' : 'Gemini key not configured';
      $('.pai-availability')?.classList.toggle('ready',providerReady);
      if (providerReady && !me.user) notify('Sign in to generate AI notes and audio. You can add sources first.');
      else if (!providerReady) notify('Your source library is ready. AI generation needs GEMINI_API_KEY in the server .env file.');
      restore();
    } catch (_) {
      $('#pai-provider-status').textContent='Server connection needed';
      notify('Run StudyAI through StudyAI.bat to enable uploads and AI tools.','error');
      restore();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
