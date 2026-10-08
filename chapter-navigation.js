/*
 * StudyAI chapter-to-chapter navigation.
 * Uses the same filtered order as the visible chapter list, including Cambridge routes.
 */
(() => {
  'use strict';

  if (typeof renderReaderContent !== 'function' ||
      typeof topicList !== 'function' ||
      typeof openTopic !== 'function') return;

  const originalRenderReaderContent = renderReaderContent;

  renderReaderContent = function (entry) {
    const result = originalRenderReaderContent.apply(this, arguments);
    const panel = document.getElementById('tab-notes');
    if (!panel) return result;

    // renderReaderContent can run repeatedly when filters or deferred notes refresh.
    panel.querySelector('.chapter-next-nav')?.remove();
    if (!entry || !entry.id) return result;

    const chapters = topicList();
    const index = chapters.findIndex(chapter => chapter.id === entry.id);
    if (index < 0) return result;

    const next = chapters[index + 1] || null;
    const nav = document.createElement('nav');
    nav.className = 'chapter-next-nav';
    nav.setAttribute('aria-label', 'Chapter navigation');

    const summary = document.createElement('div');
    summary.className = 'chapter-next-summary';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'small-label';
    eyebrow.textContent = next ? 'Up next' : 'End of chapter list';

    const name = document.createElement('strong');
    name.className = 'next-chapter-name';
    name.textContent = next ? next.title : 'You have reached the final chapter.';

    summary.append(eyebrow, name);

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'next-chapter-button';
    button.className = 'button primary next-chapter-button';

    if (next) {
      button.textContent = 'Next chapter →';
      button.setAttribute('aria-label', 'Next chapter: ' + next.title);
      button.addEventListener('click', () => {
        // Preserve the active board, grade, subject and optional Maths route.
        openTopic(next.title, next.id);

        // Students reading a long chapter should start the new note at its heading.
        const heading = document.getElementById('note-title');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({preventScroll: true});
        }
        document.getElementById('reader-view')?.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      });
    } else {
      button.textContent = 'Last chapter reached';
      button.disabled = true;
      button.setAttribute('aria-label', 'This is the last chapter in the selected course');
    }

    nav.append(summary, button);
    panel.append(nav);
    return result;
  };

  // Support a chapter that was already open when this deferred script executed.
  if (typeof currentEntry === 'function') {
    const active = currentEntry();
    const view = document.getElementById('reader-view');
    if (active && view && !view.classList.contains('hidden')) {
      renderReaderContent(active);
    }
  }
})();
