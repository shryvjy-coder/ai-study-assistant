(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fmtTime = (seconds) => {
    const s = Math.max(0, Math.ceil(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const TIMING = {
    normal: {'Reading & Writing': 32 * 60, 'Math': 35 * 60},
    extra50: {'Reading & Writing': 48 * 60, 'Math': 53 * 60},
    extra100: {'Reading & Writing': 64 * 60, 'Math': 70 * 60}
  };

  let exam = null;
  let desmosCalculator = null;
  let desmosLoading = null;
  let calcAngleMode = 'deg';
  let mockPreferences = {timingMode:'normal', breakMode:'normal'};
  let selectedMockTest = 1;
  const MOCK_HISTORY_KEY = 'studyai-sat-mock-history-v1';

  function questionBank() {
    try {
      return typeof SAT_QUESTIONS !== 'undefined' && Array.isArray(SAT_QUESTIONS) ? SAT_QUESTIONS : [];
    } catch (_) {
      return [];
    }
  }

function getMockHistory() {
    try { return JSON.parse(localStorage.getItem(MOCK_HISTORY_KEY) || '{}'); }
    catch (_) { return {}; }
  }

  function saveMockHistory(testNumber, summary) {
    const history = getMockHistory();
    const key = String(testNumber);
    const current = history[key] || {attempts:0,best:0};
    history[key] = {
      attempts:(current.attempts || 0) + 1,
      best:Math.max(current.best || 0, summary.percent || 0),
      last:summary.percent || 0,
      completedAt:new Date().toISOString()
    };
    localStorage.setItem(MOCK_HISTORY_KEY, JSON.stringify(history));
  }

  function mockData() {
    return window.StudyAISATMocks || null;
  }

  function renderMockCards() {
    const grid = $('#mock-test-grid');
    const data = mockData();
    if (!grid || !data) return;
    const history = getMockHistory();
    grid.innerHTML = data.tests.map(test => {
      const h = history[String(test.number)] || {};
      const status = h.attempts ? `${h.attempts} attempt${h.attempts === 1 ? '' : 's'} · Best ${Math.round(h.best || 0)}%` : 'Not taken yet';
      return `
        <article class="mock-test-card">
          <div class="mock-test-number">0${test.number}</div>
          <div>
            <span class="small-label">Full-length adaptive</span>
            <h4>${escapeHtml(test.title)}</h4>
            <p>${escapeHtml(test.subtitle)} · 54 Reading & Writing + 44 Math</p>
            <small>${status}</small>
          </div>
          <button class="button primary compact" type="button" data-start-mock="${test.number}">Start</button>
        </article>`;
    }).join('');
    $$('[data-start-mock]', grid).forEach(button => button.addEventListener('click', () => openMockSetup(Number(button.dataset.startMock))));
  }

    function addExamLab() {
    const sat = $('#sat');
    const disclaimer = $('.sat-disclaimer', sat);
    if (!sat || !disclaimer || $('#sat-exam-lab')) return;

    const lab = document.createElement('div');
    lab.id = 'sat-exam-lab';
    lab.className = 'sat-exam-lab sat-mock-suite';
    lab.innerHTML = `
      <div class="exam-lab-copy">
        <span class="small-label">Full-length SAT practice</span>
        <h3>Four complete adaptive mock tests.</h3>
        <p>Each test has 27 questions in each Reading & Writing module and 22 questions in each Math module. Module 1 contains a broad difficulty mix; Module 2 changes based on Module 1 performance.</p>
        <small class="mock-bank-note">All StudyAI questions are original. The suite follows current digital SAT structure and content-domain proportions without copying official or third-party questions.</small>
      </div>
      <div class="exam-launch-actions">
        <button class="button secondary" id="open-desmos" type="button">Open Desmos</button>
      </div>
      <div class="mock-test-grid" id="mock-test-grid"></div>
    `;
    disclaimer.insertAdjacentElement('afterend', lab);

    $('#open-desmos')?.addEventListener('click', () => openDesmos('floating'));
    renderMockCards();
  }

  function ensureMockSetupDialog() {
    let dialog = $('#mock-setup-dialog');
    if (dialog) return dialog;

    dialog = document.createElement('dialog');
    dialog.id = 'mock-setup-dialog';
    dialog.className = 'mock-setup-dialog';
    dialog.innerHTML = `
      <form method="dialog" class="mock-setup-shell" id="mock-setup-form">
        <div class="mock-setup-head">
          <div><span class="small-label">Before you begin</span><h3 id="mock-setup-title">Mock test settings</h3><p>Choose the timing and break setup you want for this attempt.</p></div>
          <button class="quiet-button" id="mock-setup-close" type="button">Close</button>
        </div>

        <fieldset class="mock-setting-group">
          <legend>Timing</legend>
          <label class="mock-setting-choice"><input type="radio" name="mock-time" value="normal" checked><span><strong>Normal time</strong><small>32 min R&W · 35 min Math per module</small></span></label>
          <label class="mock-setting-choice"><input type="radio" name="mock-time" value="extra50"><span><strong>50% extra time</strong><small>48 min R&W · 53 min Math per module</small></span></label>
          <label class="mock-setting-choice"><input type="radio" name="mock-time" value="extra100"><span><strong>100% extra time</strong><small>64 min R&W · 70 min Math per module</small></span></label>
        </fieldset>

        <fieldset class="mock-setting-group">
          <legend>Breaks</legend>
          <label class="mock-setting-choice"><input type="radio" name="mock-break" value="normal" checked><span><strong>Normal breaks</strong><small>10-minute scheduled break between sections</small></span></label>
          <label class="mock-setting-choice"><input type="radio" name="mock-break" value="extended"><span><strong>Extended breaks</strong><small>10-minute module breaks and a 20-minute section break</small></span></label>
          <label class="mock-setting-choice"><input type="radio" name="mock-break" value="needed"><span><strong>Breaks as needed</strong><small>Pause the timer whenever needed; questions and calculators are hidden while paused</small></span></label>
        </fieldset>

        <div class="mock-setup-summary" id="mock-setup-summary"></div>
        <div class="mock-setup-actions">
          <button class="button secondary" id="mock-setup-cancel" type="button">Cancel</button>
          <button class="button primary" id="mock-setup-begin" type="submit">Begin mock test</button>
        </div>
      </form>
    `;
    document.body.appendChild(dialog);

    const close = () => dialog.close();
    $('#mock-setup-close', dialog)?.addEventListener('click', close);
    $('#mock-setup-cancel', dialog)?.addEventListener('click', close);
    dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
    $$('input[name="mock-time"], input[name="mock-break"]', dialog).forEach(input => input.addEventListener('change', updateMockSetupSummary));
    $('#mock-setup-form', dialog)?.addEventListener('submit', event => {
      event.preventDefault();
      mockPreferences = {
        timingMode: $('input[name="mock-time"]:checked', dialog)?.value || 'normal',
        breakMode: $('input[name="mock-break"]:checked', dialog)?.value || 'normal'
      };
      dialog.close();
      startMockExam();
    });
    updateMockSetupSummary();
    return dialog;
  }

  function updateMockSetupSummary() {
    const dialog = $('#mock-setup-dialog');
    const note = $('#mock-setup-summary', dialog);
    if (!dialog || !note) return;
    const time = $('input[name="mock-time"]:checked', dialog)?.value || 'normal';
    const breaks = $('input[name="mock-break"]:checked', dialog)?.value || 'normal';
    const t = time === 'normal' ? 'Standard module timing'
      : time === 'extra50' ? '50% extra module time'
      : '100% extra module time';
    const b = breaks === 'normal' ? 'normal scheduled breaks'
      : breaks === 'extended' ? 'extended scheduled breaks'
      : 'pause whenever needed with questions hidden';
    note.textContent = `${t} · ${b}.`;
  }

  function openMockSetup(testNumber = 1) {
    selectedMockTest = Math.max(1, Math.min(4, Number(testNumber) || 1));
    const dialog = ensureMockSetupDialog();
    const meta = mockData()?.getTestMeta(selectedMockTest);
    const title = $('#mock-setup-title', dialog);
    if (title) title.textContent = meta ? `${meta.title} settings` : 'Mock test settings';
    const time = $(`input[name="mock-time"][value="${mockPreferences.timingMode}"]`, dialog);
    const breaks = $(`input[name="mock-break"][value="${mockPreferences.breakMode}"]`, dialog);
    if (time) time.checked = true;
    if (breaks) breaks.checked = true;
    updateMockSetupSummary();
    if (!dialog.open) dialog.showModal();
  }

  function chooseModule(pool, section, module, targetSize, previousIds = new Set(), moduleOneScore = null) {
    let available = pool.filter(q => !previousIds.has(q.id));
    if (!available.length) available = [...pool];

    if (module === 2 && moduleOneScore !== null) {
      const highRoute = moduleOneScore >= 0.6;
      const preferred = highRoute ? ['Advanced','Medium','Foundation'] : ['Foundation','Medium','Advanced'];
      const ranked = [];
      preferred.forEach(level => ranked.push(...shuffle(available.filter(q => q.level === level))));
      available = ranked.length ? ranked : shuffle(available);
    } else {
      const levels = ['Foundation','Medium','Advanced'];
      const buckets = levels.map(level => shuffle(available.filter(q => q.level === level)));
      const balanced = [];
      while (buckets.some(b => b.length)) {
        buckets.forEach(b => { if (b.length) balanced.push(b.shift()); });
      }
      available = balanced.length ? balanced : shuffle(available);
    }
    return available.slice(0, Math.min(targetSize, available.length));
  }

  function buildInitialExam() {
    const data = mockData();
    if (!data) return null;
    const testNumber = selectedMockTest;
    const rw1 = data.getModule(testNumber, 'Reading & Writing', 1, 'mixed');
    const math1 = data.getModule(testNumber, 'Math', 1, 'mixed');
    if (rw1.length !== 27 || math1.length !== 22) return null;

    return {
      testNumber,
      meta:data.getTestMeta(testNumber),
      timingMode:mockPreferences.timingMode || 'normal',
      breakMode:mockPreferences.breakMode || 'normal',
      modules:{
        'Reading & Writing:1':rw1,
        'Math:1':math1
      },
      routes:{},
      phase:0,
      phases:[
        {section:'Reading & Writing',module:1},
        {section:'Reading & Writing',module:2},
        {section:'Math',module:1},
        {section:'Math',module:2}
      ],
      currentIndex:0,
      answers:{},
      flagged:new Set(),
      completed:[],
      remaining:0,
      deadline:0,
      timerId:null,
      paused:false,
      pauseStartedAt:0
    };
  }

  function enterMockFullscreen() {
    document.body.classList.add('mock-exam-active');
    const root = document.documentElement;
    if (!document.fullscreenElement && root.requestFullscreen) {
      root.requestFullscreen({navigationUI:'hide'}).catch(() => {});
    }
  }

  function leaveMockFullscreen() {
    document.body.classList.remove('mock-exam-active');
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function difficultyParameter(question, route = 'medium') {
    const base = question.level === 'Foundation' ? -1.05 : question.level === 'Advanced' ? 1.05 : 0;
    const routeShift = route === 'easy' ? -0.12 : route === 'hard' ? 0.12 : 0;
    return base + routeShift;
  }

  function estimateSectionScore(questions, section, route = 'medium') {
    const operational = questions.filter(q => !q.pretest);
    const responses = operational.map(q => ({
      q,
      correct: answerCorrect(q) ? 1 : 0,
      difficulty: difficultyParameter(q, route)
    }));

    const correctCount = responses.reduce((sum, item) => sum + item.correct, 0);
    const total = responses.length;
    if (!total) return {score:200, low:200, high:240, theta:-3.5, correct:0, total:0, misses:{}};

    let theta;
    if (correctCount === total) {
      theta = 3.5;
    } else if (correctCount === 0) {
      theta = -3.5;
    } else {
      let bestTheta = -3.5;
      let bestLogLikelihood = -Infinity;
      for (let t = -3.5; t <= 3.5001; t += 0.02) {
        let ll = 0;
        for (const item of responses) {
          const p = 1 / (1 + Math.exp(-(t - item.difficulty)));
          ll += item.correct ? Math.log(Math.max(p, 1e-9)) : Math.log(Math.max(1 - p, 1e-9));
        }
        if (ll > bestLogLikelihood) {
          bestLogLikelihood = ll;
          bestTheta = t;
        }
      }
      theta = bestTheta;
    }

    let scaled = 200 + 600 / (1 + Math.exp(-1.05 * theta));
    if (correctCount === total) scaled = 800;
    if (correctCount === 0) scaled = 200;
    const score = clamp(Math.round(scaled / 10) * 10, 200, 800);

    const baseSpread = section === 'Reading & Writing' ? 40 : 30;
    const routeSpread = route === 'medium' ? 10 : 0;
    const spread = baseSpread + routeSpread;
    const low = clamp(Math.round((score - spread) / 10) * 10, 200, 800);
    const high = clamp(Math.round((score + spread) / 10) * 10, 200, 800);

    const misses = {Foundation:0, Medium:0, Advanced:0};
    const hits = {Foundation:0, Medium:0, Advanced:0};
    for (const item of responses) {
      const level = item.q.level || 'Medium';
      if (item.correct) hits[level] = (hits[level] || 0) + 1;
      else misses[level] = (misses[level] || 0) + 1;
    }

    return {score,low,high,theta,correct:correctCount,total,misses,hits,route};
  }

  function scoreExplanation(sectionResult) {
    const misses = sectionResult.misses;
    const easyMisses = misses.Foundation || 0;
    const mediumMisses = misses.Medium || 0;
    const hardMisses = misses.Advanced || 0;
    const parts = [];
    if (easyMisses) parts.push(`${easyMisses} Foundation miss${easyMisses===1?'':'es'} had comparatively stronger downward pressure`);
    if (mediumMisses) parts.push(`${mediumMisses} Medium miss${mediumMisses===1?'':'es'} had moderate impact`);
    if (hardMisses) parts.push(`${hardMisses} Advanced miss${hardMisses===1?'':'es'} had less downward pressure than missing an easier item`);
    if (!parts.length) parts.push('No operational questions were missed');
    return parts.join(' · ');
  }

  function startMockExam() {
    exam = buildInitialExam();
    if (!exam) {
      showStudyToast('The full mock-test data could not load. Restart StudyAI and try again.');
      return;
    }
    ensureExamShell();
    enterMockFullscreen();
    $('#mock-exam-shell').classList.remove('hidden');
    $('.sat-layout')?.classList.add('mock-dimmed');
    enterPhase();
    $('#mock-question-pane')?.focus?.({preventScroll:true});
  }

  function ensureExamShell() {
    if ($('#mock-exam-shell')) return;
    const lab = $('#sat-exam-lab');
    if (!lab) return;
    const shell = document.createElement('div');
    shell.id = 'mock-exam-shell';
    shell.className = 'mock-exam-shell hidden';
    shell.innerHTML = `
      <div class="mock-exam-topbar">
        <div><span class="small-label" id="mock-section-label">SAT mock</span><strong id="mock-module-label"></strong></div>
        <div class="mock-top-actions">
          <button class="quiet-button hidden" id="mock-pause" type="button">Pause</button>
          <button class="quiet-button hidden" id="mock-desmos-btn" type="button">Desmos</button>
          <span class="mock-timer" id="mock-timer">--:--</span>
          <button class="quiet-button" id="mock-exit" type="button">Exit</button>
        </div>
      </div>
      <div class="mock-exam-layout" id="mock-exam-layout">
        <main class="mock-question-pane" id="mock-question-pane"></main>
        <div class="mock-splitter hidden" id="mock-splitter" role="separator" aria-orientation="vertical" aria-label="Resize calculator"></div>
        <div class="mock-calc-slot hidden" id="mock-calc-slot"></div>
      </div>
      <div class="mock-pause-cover hidden" id="mock-pause-cover">
        <div><span class="small-label">Timer paused</span><h3>Questions are hidden during your break.</h3><p>Your answers are safe. Resume when you're ready.</p><button class="button primary" id="mock-resume" type="button">Resume test</button></div>
      </div>
    `;
    lab.insertAdjacentElement('afterend', shell);
    $('#mock-exit')?.addEventListener('click', exitMock);
    $('#mock-pause')?.addEventListener('click', pauseMock);
    $('#mock-resume')?.addEventListener('click', resumeMock);
    $('#mock-desmos-btn')?.addEventListener('click', () => openDesmos('split'));
    setupSplitter();
  }

  function currentPhase() {
    return exam?.phases?.[exam.phase] || null;
  }

  function moduleKey(phase = currentPhase()) {
    return phase ? `${phase.section}:${phase.module}` : '';
  }

  function moduleQuestions() {
    const phase = currentPhase();
    if (!phase || !exam) return [];
    const key = moduleKey(phase);
    if (!exam.modules[key] && phase.module === 2) {
      const firstQuestions = exam.modules[`${phase.section}:1`] || [];
      const firstScore = scoreQuestions(firstQuestions);
      const route = mockData().routeFromPerformance(firstScore.ratio);
      exam.routes[phase.section] = route;
      exam.modules[key] = mockData().getModule(exam.testNumber, phase.section, 2, route);
    }
    return exam.modules[key] || [];
  }

  function enterPhase() {
    if (!exam) return;
    const phase = currentPhase();
    if (!phase) return finishExam();
    const questions = moduleQuestions();
    exam.currentIndex = 0;
    exam.paused = false;
    exam.remaining = TIMING[exam.timingMode][phase.section];
    setTimerFromRemaining();
    $('#mock-section-label').textContent = `${exam.meta?.title || 'SAT mock'} · ${phase.section}`;
    $('#mock-module-label').textContent = `Module ${phase.module} · ${questions.length} questions`;
    $('#mock-pause')?.classList.toggle('hidden', exam.breakMode !== 'needed');
    $('#mock-desmos-btn')?.classList.toggle('hidden', phase.section !== 'Math');
    $('#mock-pause-cover')?.classList.add('hidden');
    $('#mock-question-pane')?.classList.remove('question-hidden');
    renderCurrentQuestion();
    startTimer();
  }

  function setTimerFromRemaining() {
    if (!exam) return;
    exam.deadline = Date.now() + exam.remaining * 1000;
    updateTimerDisplay();
  }

  function startTimer() {
    stopTimer();
    if (!exam || exam.paused) return;
    exam.timerId = setInterval(() => {
      exam.remaining = Math.max(0, (exam.deadline - Date.now()) / 1000);
      updateTimerDisplay();
      if (exam.remaining <= 0) completeModule(true);
    }, 250);
  }

  function stopTimer() {
    if (exam?.timerId) clearInterval(exam.timerId);
    if (exam) exam.timerId = null;
  }

  function updateTimerDisplay() {
    const timer = $('#mock-timer');
    if (timer && exam) {
      timer.textContent = fmtTime(exam.remaining);
      timer.classList.toggle('timer-warning', exam.remaining <= 5 * 60);
      timer.classList.toggle('timer-critical', exam.remaining <= 60);
    }
  }

  function pauseMock() {
    if (!exam || exam.breakMode !== 'needed' || exam.paused) return;
    exam.remaining = Math.max(0, (exam.deadline - Date.now()) / 1000);
    exam.paused = true;
    stopTimer();
    $('#mock-pause-cover')?.classList.remove('hidden');
    $('#mock-question-pane')?.classList.add('question-hidden');
    $('#mock-calc-slot')?.classList.add('calc-paused');
    const floating = $('#desmos-panel.desmos-floating');
    if (floating) floating.classList.add('calc-paused');
  }

  function resumeMock() {
    if (!exam || !exam.paused) return;
    exam.paused = false;
    $('#mock-pause-cover')?.classList.add('hidden');
    $('#mock-question-pane')?.classList.remove('question-hidden');
    $('#mock-calc-slot')?.classList.remove('calc-paused');
    $('#desmos-panel')?.classList.remove('calc-paused');
    setTimerFromRemaining();
    startTimer();
  }

  function answerPresent(q) {
    const value = exam?.answers?.[q.id];
    return value !== undefined && value !== null && String(value).trim() !== '';
  }

  function answerCorrect(q) {
    if (!answerPresent(q)) return false;
    const value = exam.answers[q.id];
    if (q.format === 'spr') {
      const entered = String(value).trim().replace(/,/g,'');
      return (q.acceptedAnswers || [q.correctAnswer]).some(ans => {
        const expected = String(ans).trim().replace(/,/g,'');
        const a = Number(entered), b = Number(expected);
        return Number.isFinite(a) && Number.isFinite(b) ? Math.abs(a-b) < 1e-9 : entered === expected;
      });
    }
    return Number(value) === Number(q.answer);
  }

  function renderCurrentQuestion() {
    if (!exam) return;
    const questions = moduleQuestions();
    const q = questions[exam.currentIndex];
    const pane = $('#mock-question-pane');
    if (!pane || !q) return;
    const answer = exam.answers[q.id];
    const flagged = exam.flagged.has(q.id);
    const response = q.format === 'spr'
      ? `<div class="mock-spr-wrap"><label for="mock-spr-answer">Your answer</label><input id="mock-spr-answer" class="mock-spr-answer" inputmode="decimal" autocomplete="off" value="${escapeHtml(answer ?? '')}" placeholder="Enter answer"><small>Student-produced response</small></div>`
      : `<div class="mock-options">${q.options.map((option,index)=>`<button type="button" class="mock-option ${Number(answer)===index?'selected':''}" data-answer="${index}"><span>${String.fromCharCode(65+index)}</span><strong>${escapeHtml(option)}</strong></button>`).join('')}</div>`;

    pane.innerHTML = `
      <div class="mock-progress-row">
        <span>Question ${exam.currentIndex + 1} of ${questions.length}</span>
        <button class="mock-flag ${flagged ? 'active' : ''}" id="mock-flag" type="button">${flagged ? '★ Marked' : '☆ Mark for review'}</button>
      </div>
      <article class="mock-question-card">
        ${q.passage ? `<div class="mock-passage">${escapeHtml(q.passage).replace(/\n/g,'<br>')}</div>` : ''}
        <h3>${escapeHtml(q.stem)}</h3>
        ${response}
      </article>
      <div class="mock-question-footer">
        <button class="button secondary" id="mock-prev" type="button" ${exam.currentIndex===0?'disabled':''}>← Previous</button>
        <div class="mock-question-dots">${questions.map((item,i)=>`<button type="button" data-jump-q="${i}" class="${i===exam.currentIndex?'current':''} ${answerPresent(item)?'answered':''} ${exam.flagged.has(item.id)?'flagged':''}">${i+1}</button>`).join('')}</div>
        <button class="button primary" id="mock-next" type="button">${exam.currentIndex===questions.length-1?'Finish module':'Next →'}</button>
      </div>`;

    $$('.mock-option', pane).forEach(btn => btn.addEventListener('click', () => {
      exam.answers[q.id] = Number(btn.dataset.answer);
      renderCurrentQuestion();
    }));
    $('#mock-spr-answer', pane)?.addEventListener('input', event => {
      exam.answers[q.id] = event.target.value;
      const dot = $$(`[data-jump-q]`, pane)[exam.currentIndex];
      dot?.classList.toggle('answered', String(event.target.value).trim() !== '');
    });
    $('#mock-flag', pane)?.addEventListener('click', () => {
      if (exam.flagged.has(q.id)) exam.flagged.delete(q.id); else exam.flagged.add(q.id);
      renderCurrentQuestion();
    });
    $('#mock-prev', pane)?.addEventListener('click', () => { exam.currentIndex=Math.max(0,exam.currentIndex-1); renderCurrentQuestion(); });
    $('#mock-next', pane)?.addEventListener('click', () => {
      if (exam.currentIndex < questions.length-1) { exam.currentIndex++; renderCurrentQuestion(); }
      else completeModule(false);
    });
    $$('[data-jump-q]', pane).forEach(btn => btn.addEventListener('click', () => {
      exam.currentIndex=Number(btn.dataset.jumpQ); renderCurrentQuestion();
    }));
  }

  function scoreQuestions(questions) {
    const operational = questions.filter(q => !q.pretest);
    const correct = operational.filter(answerCorrect).length;
    const answered = questions.filter(answerPresent).length;
    const operationalAnswered = operational.filter(answerPresent).length;
    return {
      correct,
      total:operational.length,
      questionTotal:questions.length,
      answered,
      operationalAnswered,
      ratio:operational.length ? correct / operational.length : 0
    };
  }

  function completeModule(autoEnded) {
    if (!exam) return;
    stopTimer();
    const phase = currentPhase();
    const questions = moduleQuestions();
    const score = scoreQuestions(questions);
    exam.completed.push({phase:{...phase}, score, autoEnded});
    const isLast = exam.phase === exam.phases.length - 1;
    if (isLast) return finishExam();
    showModuleTransition(score, autoEnded);
  }

  function scheduledBreakSeconds(fromPhase, nextPhase) {
    if (!exam || !fromPhase || !nextPhase) return 0;
    const sectionChange = fromPhase.section !== nextPhase.section;
    if (sectionChange) return exam.breakMode === 'extended' ? 20 * 60 : 10 * 60;
    if (exam.breakMode === 'extended') return 10 * 60;
    return 0;
  }

  function showModuleTransition(score, autoEnded) {
    const pane = $('#mock-question-pane');
    const from = currentPhase();
    const next = exam.phases[exam.phase + 1];
    const breakSeconds = scheduledBreakSeconds(from, next);
    if (!pane) return;
    pane.innerHTML = `
      <div class="module-transition">
        <span class="small-label">${autoEnded ? 'Time expired' : 'Module complete'}</span>
        <h3>${escapeHtml(from.section)} Module ${from.module} finished.</h3>
        <p>You answered ${score.answered} of ${score.questionTotal} questions. Results stay hidden until the end of the full mock test.</p>
        ${breakSeconds ? `<div class="scheduled-break"><span>${from.section !== next.section ? 'Section break' : 'Extended module break'}</span><strong id="break-timer">${fmtTime(breakSeconds)}</strong></div>` : '<p class="muted">No scheduled break between these modules.</p>'}
        <button class="button primary" id="continue-mock" type="button">${breakSeconds ? 'Start / skip break and continue' : 'Continue'}</button>
      </div>
    `;
    let remainingBreak = breakSeconds;
    let breakInterval = null;
    if (breakSeconds) {
      breakInterval = setInterval(() => {
        remainingBreak = Math.max(0, remainingBreak - 1);
        const el = $('#break-timer');
        if (el) el.textContent = fmtTime(remainingBreak);
        if (!remainingBreak) {
          clearInterval(breakInterval);
          advancePhase();
        }
      }, 1000);
    }
    $('#continue-mock')?.addEventListener('click', () => {
      if (breakInterval) clearInterval(breakInterval);
      advancePhase();
    });
  }

  function advancePhase() {
    if (!exam) return;
    exam.phase++;
    enterPhase();
  }

  function finishExam() {
    if (!exam) return;
    stopTimer();
    closeDesmos();
    const pane = $('#mock-question-pane');
    const allQuestions = exam.phases.flatMap(phase => exam.modules[`${phase.section}:${phase.module}`] || []);
    const rwQuestions = allQuestions.filter(q => q.section === 'Reading & Writing');
    const mathQuestions = allQuestions.filter(q => q.section === 'Math');
    const rwRouteKey = exam.routes['Reading & Writing'] || 'medium';
    const mathRouteKey = exam.routes['Math'] || 'medium';
    const rwEstimate = estimateSectionScore(rwQuestions, 'Reading & Writing', rwRouteKey);
    const mathEstimate = estimateSectionScore(mathQuestions, 'Math', mathRouteKey);
    const totalScore = rwEstimate.score + mathEstimate.score;
    const totalLow = rwEstimate.low + mathEstimate.low;
    const totalHigh = rwEstimate.high + mathEstimate.high;
    const overallAnswered = allQuestions.filter(answerPresent).length;

    const rwRoute = mockData()?.routeLabel(rwRouteKey) || '';
    const mathRoute = mockData()?.routeLabel(mathRouteKey) || '';
    const percent = Math.round((rwEstimate.correct + mathEstimate.correct) / Math.max(1, rwEstimate.total + mathEstimate.total) * 100);
    saveMockHistory(exam.testNumber, {percent, estimatedScore:totalScore});
    renderMockCards();

    if (pane) pane.innerHTML = `
      <div class="mock-results sat-score-report">
        <span class="small-label">${escapeHtml(exam.meta?.title || 'Mock test')} complete</span>
        <div class="estimated-score-hero">
          <div>
            <small>StudyAI estimated SAT score</small>
            <strong>${totalScore}</strong>
            <span>Estimated range ${totalLow}–${totalHigh}</span>
          </div>
          <p>This is an evidence-based practice estimate, not an official College Board score. College Board uses calibrated Item Response Theory parameters that are not publicly available.</p>
        </div>

        <div class="score-section-grid">
          <article>
            <span>Reading & Writing</span>
            <strong>${rwEstimate.score}</strong>
            <small>Range ${rwEstimate.low}–${rwEstimate.high} · ${escapeHtml(rwRoute)}</small>
            <p>${rwEstimate.correct}/${rwEstimate.total} operational questions correct</p>
          </article>
          <article>
            <span>Math</span>
            <strong>${mathEstimate.score}</strong>
            <small>Range ${mathEstimate.low}–${mathEstimate.high} · ${escapeHtml(mathRoute)}</small>
            <p>${mathEstimate.correct}/${mathEstimate.total} operational questions correct</p>
          </article>
        </div>

        <div class="score-method-card">
          <h4>Why this estimate landed here</h4>
          <p><strong>Reading & Writing:</strong> ${escapeHtml(scoreExplanation(rwEstimate))}.</p>
          <p><strong>Math:</strong> ${escapeHtml(scoreExplanation(mathEstimate))}.</p>
          <p>The estimator excludes all 8 pretest questions, treats blanks as incorrect, models Foundation, Medium, and Advanced items at different difficulty levels, and uses the adaptive Module 2 route as a small difficulty adjustment. The resulting ability estimate is converted to the SAT's 200–800 section scale and rounded to the nearest 10 points.</p>
        </div>

        <div class="mock-result-grid">
          <div><span>Operational accuracy</span><strong>${percent}%</strong><small>${rwEstimate.correct + mathEstimate.correct}/${rwEstimate.total + mathEstimate.total} scored items</small></div>
          <div><span>Questions answered</span><strong>${overallAnswered}/98</strong><small>8 pretest items were unscored</small></div>
          <div><span>Adaptive routes</span><strong>${rwRouteKey.toUpperCase()} / ${mathRouteKey.toUpperCase()}</strong><small>R&W / Math</small></div>
        </div>

        <div class="button-row"><button class="button primary" id="mock-again" type="button">Retake this test</button><button class="button secondary" id="mock-done" type="button">Choose another test</button></div>
      </div>`;
    $('#mock-timer').textContent = 'Done';
    $('#mock-pause')?.classList.add('hidden');
    $('#mock-desmos-btn')?.classList.add('hidden');
    $('#mock-again')?.addEventListener('click', () => {
      const n = exam.testNumber;
      exitMock();
      openMockSetup(n);
    });
    $('#mock-done')?.addEventListener('click', exitMock);
  }

  function exitMock() {
    if (exam) {
      stopTimer();
      closeDesmos();
    }
    exam = null;
    $('#mock-exam-shell')?.classList.add('hidden');
    $('.sat-layout')?.classList.remove('mock-dimmed');
    leaveMockFullscreen();
  }

  function ensureDesmosPanel() {
    let panel = $('#desmos-panel');
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'desmos-panel';
    panel.className = 'desmos-panel hidden desmos-floating';
    panel.innerHTML = `
      <header class="calc-window-header" id="desmos-drag-handle">
        <div><span class="calc-dot"></span><strong>Desmos</strong><small>Graphing Calculator</small></div>
        <div class="calc-window-actions">
          <button type="button" id="desmos-split">Split</button>
          <button type="button" id="desmos-float">Float</button>
          <button type="button" id="desmos-close" aria-label="Close calculator">×</button>
        </div>
      </header>
      <div class="desmos-mount" id="desmos-mount"><div class="calc-loading">Loading Desmos…</div></div>
      <footer class="calc-attribution">StudyAI practice tool · Desmos calculator</footer>
    `;
    document.body.appendChild(panel);
    $('#desmos-close')?.addEventListener('click', closeDesmos);
    $('#desmos-float')?.addEventListener('click', () => openDesmos('floating'));
    $('#desmos-split')?.addEventListener('click', () => openDesmos('split'));
    makeDraggable(panel, $('#desmos-drag-handle'));
    if ('ResizeObserver' in window) new ResizeObserver(() => desmosCalculator?.resize?.()).observe(panel);
    return panel;
  }

  function loadDesmos() {
    if (window.Desmos) return Promise.resolve(window.Desmos);
    if (desmosLoading) return desmosLoading;
    desmosLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.desmos.com/api/v1.12/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
      script.async = true;
      script.onload = () => resolve(window.Desmos);
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return desmosLoading;
  }

  async function openDesmos(mode = 'floating') {
    const panel = ensureDesmosPanel();
    panel.classList.remove('hidden');
    if (mode === 'split' && exam && $('#mock-calc-slot')) {
      const slot = $('#mock-calc-slot');
      slot.classList.remove('hidden');
      $('#mock-splitter')?.classList.remove('hidden');
      slot.appendChild(panel);
      panel.classList.remove('desmos-floating');
      panel.classList.add('desmos-split');
      panel.style.cssText = '';
    } else {
      document.body.appendChild(panel);
      panel.classList.remove('desmos-split');
      panel.classList.add('desmos-floating');
      if (!panel.style.width) {
        panel.style.width = '440px';
        panel.style.height = '560px';
        panel.style.right = '24px';
        panel.style.bottom = '24px';
      }
      $('#mock-calc-slot')?.classList.add('hidden');
      $('#mock-splitter')?.classList.add('hidden');
    }

    try {
      const DesmosLib = await loadDesmos();
      const mount = $('#desmos-mount');
      if (!desmosCalculator && mount && DesmosLib) {
        mount.innerHTML = '';
        desmosCalculator = DesmosLib.GraphingCalculator(mount, {
          expressions: true,
          settingsMenu: true,
          keypad: true,
          graphpaper: true,
          expressionsTopbar: true
        });
      } else {
        desmosCalculator?.resize?.();
      }
    } catch (_) {
      const mount = $('#desmos-mount');
      if (mount) mount.innerHTML = '<div class="calc-loading">Desmos could not load. Check your internet connection and try again.</div>';
    }
  }

  function closeDesmos() {
    const panel = $('#desmos-panel');
    if (!panel) return;
    panel.classList.add('hidden');
    panel.classList.remove('desmos-split');
    panel.classList.add('desmos-floating');
    document.body.appendChild(panel);
    $('#mock-calc-slot')?.classList.add('hidden');
    $('#mock-splitter')?.classList.add('hidden');
    desmosCalculator?.resize?.();
  }

  function makeDraggable(panel, handle) {
    if (!panel || !handle) return;
    let drag = null;

    const stopDragging = () => {
      drag = null;
      window.removeEventListener('pointermove', onMove);
      document.documentElement.classList.remove('studyai-dragging-window');
    };

    const onMove = event => {
      if (!drag) return;
      if ((event.buttons & 1) !== 1) {
        stopDragging();
        return;
      }
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      panel.style.left = `${clamp(event.clientX - drag.dx, 6, window.innerWidth - w - 6)}px`;
      panel.style.top = `${clamp(event.clientY - drag.dy, 6, window.innerHeight - h - 6)}px`;
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    };

    const onUp = () => stopDragging();

    handle.addEventListener('pointerdown', event => {
      if (!panel.classList.contains('desmos-floating') || event.button !== 0 || event.target.closest('button')) return;
      const rect = panel.getBoundingClientRect();
      drag = {dx:event.clientX - rect.left, dy:event.clientY - rect.top};
      document.documentElement.classList.add('studyai-dragging-window');
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp, {once:true});
      window.addEventListener('pointercancel', onUp, {once:true});
      event.preventDefault();
    });

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('blur', stopDragging);
    handle.addEventListener('lostpointercapture', stopDragging);
  }

  function setupSplitter() {
    const splitter = $('#mock-splitter');
    const layout = $('#mock-exam-layout');
    const slot = $('#mock-calc-slot');
    if (!splitter || !layout || !slot) return;
    let active = false;
    splitter.addEventListener('pointerdown', event => {
      active = true;
      splitter.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });
    splitter.addEventListener('pointermove', event => {
      if (!active || slot.classList.contains('hidden')) return;
      const rect = layout.getBoundingClientRect();
      const calcWidth = clamp(rect.right - event.clientX, 300, Math.max(320, rect.width * 0.68));
      slot.style.flexBasis = `${calcWidth}px`;
      desmosCalculator?.resize?.();
    });
    const end = () => active = false;
    splitter.addEventListener('pointerup', end);
    splitter.addEventListener('pointercancel', end);
  }

  function addCambridgeCalculator() {
    const toolsGrid = $('.tools-grid');
    if (toolsGrid && !$('#cambridge-calc-card')) {
      const card = document.createElement('article');
      card.className = 'tool-card';
      card.id = 'cambridge-calc-card';
      card.innerHTML = `<span class="small-label">IGCSE · AS · A Level</span><h3>Scientific calculator</h3><p>A detachable calculator for arithmetic, powers, roots, logarithms and trigonometry.</p><button class="button compact secondary" id="open-scientific-calc" type="button">Open calculator</button>`;
      toolsGrid.appendChild(card);
      $('#open-scientific-calc')?.addEventListener('click', openScientificCalculator);
    }

    const notice = $('#curriculum-notice');
    if (notice && !$('#cambridge-calc-shortcut')) {
      const row = document.createElement('div');
      row.id = 'cambridge-calc-shortcut';
      row.className = 'cambridge-calc-shortcut hidden';
      row.innerHTML = '<span>Cambridge study tools</span><button class="quiet-button" type="button">Scientific calculator</button>';
      notice.insertAdjacentElement('afterend', row);
      $('button', row)?.addEventListener('click', openScientificCalculator);
    }
    const board = $('#board-filter');
    const sync = () => {
      const text = `${board?.value || ''} ${$('#grade-filter')?.value || ''}`.toLowerCase();
      const relevant = /cambridge|igcse|as level|a level/.test(text);
      $('#cambridge-calc-shortcut')?.classList.toggle('hidden', !relevant);
    };
    board?.addEventListener('change', () => setTimeout(sync, 0));
    $('#grade-filter')?.addEventListener('change', sync);
    sync();
  }

  function ensureScientificPanel() {
    let panel = $('#scientific-calc');
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'scientific-calc';
    panel.className = 'scientific-calc hidden';
    panel.innerHTML = `
      <header class="calc-window-header" id="scientific-drag-handle">
        <div><span class="calc-dot"></span><strong>Scientific Calculator</strong><small>IGCSE · AS · A Level</small></div>
        <div class="calc-window-actions"><button type="button" id="scientific-close">×</button></div>
      </header>
      <div class="scientific-body">
        <div class="scientific-mode-row"><button class="active" data-angle="deg">DEG</button><button data-angle="rad">RAD</button></div>
        <input id="scientific-expression" autocomplete="off" inputmode="text" placeholder="Enter an expression" aria-label="Calculator expression">
        <div class="scientific-result" id="scientific-result">0</div>
        <div class="scientific-keys">
          ${[
            ['AC','action','clear'],['⌫','action','back'],['(', 'insert','('],[')','insert',')'],['÷','insert','/'],
            ['sin','func','sin('],['cos','func','cos('],['tan','func','tan('],['√','func','sqrt('],['×','insert','*'],
            ['ln','func','ln('],['log','func','log('],['x²','action','square'],['xʸ','insert','^'],['−','insert','-'],
            ['7','insert','7'],['8','insert','8'],['9','insert','9'],['π','insert','pi'],['+','insert','+'],
            ['4','insert','4'],['5','insert','5'],['6','insert','6'],['e','insert','e'],['|x|','func','abs('],
            ['1','insert','1'],['2','insert','2'],['3','insert','3'],['.','insert','.'],['=','action','equals'],
            ['0','insert','0'],['ans','insert','ans'],['%','action','percent'],[',','insert',','],['EXP','func','exp(']
          ].map(([label,type,value])=>`<button type="button" data-calc-type="${type}" data-calc-value="${value}">${label}</button>`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    panel.style.width = '360px';
    panel.style.height = '570px';
    panel.style.right = '28px';
    panel.style.bottom = '28px';
    $('#scientific-close')?.addEventListener('click', () => panel.classList.add('hidden'));
    makeGenericDraggable(panel, $('#scientific-drag-handle'));
    $$('.scientific-mode-row button', panel).forEach(btn => btn.addEventListener('click', () => {
      calcAngleMode = btn.dataset.angle;
      $$('.scientific-mode-row button', panel).forEach(b => b.classList.toggle('active', b === btn));
    }));
    $$('.scientific-keys button', panel).forEach(btn => btn.addEventListener('click', () => handleScientificKey(btn)));
    $('#scientific-expression')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); evaluateScientific(); }
    });
    return panel;
  }

  function openScientificCalculator() {
    const panel = ensureScientificPanel();
    panel.classList.remove('hidden');
  }

  let scientificAns = 0;
  function handleScientificKey(button) {
    const input = $('#scientific-expression');
    if (!input) return;
    const type = button.dataset.calcType;
    const value = button.dataset.calcValue;
    if (type === 'insert' || type === 'func') {
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? start;
      input.value = input.value.slice(0,start) + value + input.value.slice(end);
      const pos = start + value.length;
      input.setSelectionRange(pos,pos);
      input.focus();
      return;
    }
    if (value === 'clear') { input.value=''; $('#scientific-result').textContent='0'; return; }
    if (value === 'back') { input.value = input.value.slice(0,-1); return; }
    if (value === 'square') { input.value = `(${input.value || scientificAns})^2`; return; }
    if (value === 'percent') { input.value = `(${input.value || scientificAns})/100`; return; }
    if (value === 'equals') evaluateScientific();
  }

  function evaluateScientific() {
    const input = $('#scientific-expression');
    const result = $('#scientific-result');
    if (!input || !result) return;
    try {
      let expr = input.value.trim();
      if (!expr) return;
      if (!/^[0-9+\-*/().,^\sA-Za-zπ]+$/.test(expr)) throw new Error('Unsupported input');
      const ids = expr.match(/[A-Za-zπ]+/g) || [];
      const allowed = new Set(['sin','cos','tan','sqrt','ln','log','abs','exp','pi','e','ans','π']);
      if (ids.some(id => !allowed.has(id))) throw new Error('Unsupported function');
      expr = expr.replace(/\^/g,'**').replace(/π/g,'pi');
      const toRad = x => calcAngleMode === 'deg' ? x * Math.PI / 180 : x;
      const fn = Function('sin','cos','tan','sqrt','ln','log','abs','exp','pi','e','ans', `"use strict"; return (${expr});`);
      const value = fn(
        x=>Math.sin(toRad(x)), x=>Math.cos(toRad(x)), x=>Math.tan(toRad(x)),
        Math.sqrt, Math.log, Math.log10, Math.abs, Math.exp, Math.PI, Math.E, scientificAns
      );
      if (!Number.isFinite(value)) throw new Error('Math error');
      scientificAns = value;
      result.textContent = Number.isInteger(value) ? String(value) : String(Number(value.toPrecision(12)));
    } catch (_) {
      result.textContent = 'Error';
    }
  }

  function makeGenericDraggable(panel, handle) {
    if (!panel || !handle) return;
    let drag = null;

    const stopDragging = () => {
      drag = null;
      window.removeEventListener('pointermove', onMove);
      document.documentElement.classList.remove('studyai-dragging-window');
    };

    const onMove = event => {
      if (!drag) return;
      if ((event.buttons & 1) !== 1) {
        stopDragging();
        return;
      }
      panel.style.left = `${clamp(event.clientX - drag.dx, 6, window.innerWidth - panel.offsetWidth - 6)}px`;
      panel.style.top = `${clamp(event.clientY - drag.dy, 6, window.innerHeight - panel.offsetHeight - 6)}px`;
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    };

    handle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('button')) return;
      const rect = panel.getBoundingClientRect();
      drag = {dx:event.clientX - rect.left, dy:event.clientY - rect.top};
      document.documentElement.classList.add('studyai-dragging-window');
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', stopDragging, {once:true});
      window.addEventListener('pointercancel', stopDragging, {once:true});
      event.preventDefault();
    });

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('blur', stopDragging);
  }

  function showStudyToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function addSatCalculatorShortcut() {
    const modes = $('.sat-mode-buttons');
    if (!modes || $('#sat-calculator-shortcut')) return;
    const button = document.createElement('button');
    button.className = 'button ghost full';
    button.id = 'sat-calculator-shortcut';
    button.type = 'button';
    button.textContent = 'Open Desmos calculator';
    button.addEventListener('click', () => openDesmos('floating'));
    modes.appendChild(button);
  }

  function init() {
    addExamLab();
    addSatCalculatorShortcut();
    addCambridgeCalculator();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();