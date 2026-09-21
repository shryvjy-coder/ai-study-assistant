/*
 * StudyAI curriculum bridge
 *
 * script.js intentionally keeps its large curriculum dataset private. This
 * bridge reads the already-rendered Study Library controls and exposes a stable
 * API for Personal AI Topic Mode without duplicating curriculum data.
 */
(function () {
  function options(id) {
    const el = document.getElementById(id);
    return el ? [...el.options].map(o => o.value || o.textContent).filter(Boolean) : [];
  }

  function change(id, value) {
    const el = document.getElementById(id);
    if (!el) return false;
    if (value && el.value !== value) {
      el.value = value;
      el.dispatchEvent(new Event('change', {bubbles:true}));
    }
    return true;
  }

  function topics() {
    return [...document.querySelectorAll('#chapter-list .chapter-item')]
      .map(el => el.dataset.topic || el.textContent.replace(/^✓\s*/, '').trim())
      .filter(Boolean);
  }

  window.StudyAICurriculum = {
    boards: () => options('board-filter'),
    grades(board) {
      change('board-filter', board);
      return options('grade-filter');
    },
    subjects(board, grade) {
      change('board-filter', board);
      change('grade-filter', grade);
      return options('subject-filter');
    },
    topics(board, grade, subject) {
      change('board-filter', board);
      change('grade-filter', grade);
      change('subject-filter', subject);
      return topics();
    },
    open(board, grade, subject, topic) {
      change('board-filter', board);
      change('grade-filter', grade);
      change('subject-filter', subject);
      const button = [...document.querySelectorAll('#chapter-list .chapter-item')]
        .find(el => (el.dataset.topic || el.textContent.replace(/^✓\s*/, '').trim()) === topic);
      if (button) button.click();
      return {
        title: topic,
        board,
        grade,
        subject,
        summary: document.getElementById('note-summary')?.textContent?.trim() || '',
        detailed: document.getElementById('detailed-notes')?.textContent?.trim() || '',
        quick: document.getElementById('quick-review')?.textContent?.trim() || ''
      };
    }
  };
})();