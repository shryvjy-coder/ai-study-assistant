(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const NAV_KEY = 'studyai-nav-mode';

  function updateThemeToggle() {
    const button = $('#theme-toggle');
    const icon = $('#theme-icon');
    const label = $('#theme-label');
    if (!button || !icon) return;
    const dark = document.documentElement.dataset.theme === 'dark';
    icon.textContent = dark ? '☀' : '☾';
    if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function buildLeftRail() {
    if ($('#studyai-right-rail')) return;
    const links = [
      ['Home', '#home', '⌂'],['Study', '#study', '▤'],['SAT', '#sat', 'A'],['Workspace', '#workspace', '✎'],
      ['Flashcards', '#flashcards', '◇'],['Practice', '#practice', '✓'],['Progress', '#progress', '↗'],
      ['Planner', '#planner', '□'],['Tutor', '#tutor', '?'],['Tools', '#tools', '⋯']
    ];

    const rail = document.createElement('aside');
    rail.id = 'studyai-right-rail';
    rail.className = 'studyai-right-rail rail-hidden';
    rail.setAttribute('aria-label', 'StudyAI section navigation');
    rail.innerHTML = `
      <button class="rail-peek" type="button" aria-label="Show navigation" title="Show navigation">›</button>
      <div class="rail-panel">
        <div class="rail-headline"><span>Navigate</span><button id="rail-settings" type="button" aria-label="Navigation settings" title="Navigation settings">⚙</button></div>
        <nav>${links.map(([name,href,icon]) => `<a href="${href}" data-rail-link="${href}"><span class="rail-icon">${icon}</span><span>${name}</span></a>`).join('')}</nav>
      </div>`;
    document.body.appendChild(rail);

    const saved = localStorage.getItem(NAV_KEY) || 'auto';
    document.documentElement.dataset.navMode = saved;

    let hideTimer = null;
    let edgeTimer = null;

    const cancelHide = () => {
      clearTimeout(hideTimer);
      hideTimer = null;
    };

    const hide = () => {
      if (document.documentElement.dataset.navMode !== 'auto') return;
      rail.classList.remove('rail-visible');
      rail.classList.add('rail-hidden');
    };

    const scheduleHide = (delay = 2800) => {
      cancelHide();
      if (document.documentElement.dataset.navMode === 'auto') {
        hideTimer = setTimeout(hide, delay);
      }
    };

    const show = (autoHide = false) => {
      cancelHide();
      rail.classList.add('rail-visible');
      rail.classList.remove('rail-hidden');
      if (autoHide) scheduleHide(3800);
    };

    rail.addEventListener('mouseenter', () => {
      cancelHide();
      show(false);
    });
    rail.addEventListener('mouseleave', () => scheduleHide(2600));
    rail.addEventListener('focusin', () => show(false));
    rail.addEventListener('focusout', () => scheduleHide(2600));
    $('.rail-peek', rail)?.addEventListener('click', () => show(true));

    $$('#studyai-right-rail a').forEach(link => link.addEventListener('click', () => scheduleHide(2200)));

    window.addEventListener('mousemove', event => {
      if (document.documentElement.dataset.navMode !== 'auto' || !rail.classList.contains('rail-hidden')) return;
      if (event.clientX <= 8) {
        if (!edgeTimer) edgeTimer = setTimeout(() => {
          edgeTimer = null;
          show(true);
        }, 180);
      } else if (edgeTimer) {
        clearTimeout(edgeTimer);
        edgeTimer = null;
      }
    }, {passive:true});

    const sections = links.map(([,href]) => document.querySelector(href)).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        $$('#studyai-right-rail a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
      }, {rootMargin:'-20% 0px -60% 0px', threshold:[.05,.2,.5]});
      sections.forEach(section => observer.observe(section));
    }

    if (saved === 'always') show(false);
    $('#rail-settings')?.addEventListener('click', openSettings);
  }

  function buildSettings() {
    if ($('#studyai-settings-dialog')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'studyai-settings-dialog';
    dialog.className = 'studyai-settings-dialog';
    dialog.innerHTML = `
      <div class="settings-shell">
        <div class="settings-top"><div><span class="small-label">Settings</span><h3>Customization</h3></div><button class="quiet-button" id="settings-close" type="button">Close</button></div>
        <div class="settings-card">
          <div><strong>Left navigation</strong><p>The navigation stays on the left. Choose whether it hides when you are not using it.</p></div>
          <label class="settings-choice"><input type="radio" name="nav-mode" value="auto"><span><strong>Auto-hide</strong><small>Default. It stays tucked away and opens only when you deliberately move to the far-left edge or click its tab.</small></span></label>
          <label class="settings-choice"><input type="radio" name="nav-mode" value="always"><span><strong>Always visible</strong><small>Keeps the left navigation open on desktop.</small></span></label>
        </div>
      </div>`;
    document.body.appendChild(dialog);

    $('#settings-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    $$('input[name="nav-mode"]', dialog).forEach(input => input.addEventListener('change', event => {
      const mode = event.target.value;
      localStorage.setItem(NAV_KEY, mode);
      document.documentElement.dataset.navMode = mode;
      const rail = $('#studyai-right-rail');
      if (!rail) return;
      if (mode === 'always') {
        rail.classList.add('rail-visible');
        rail.classList.remove('rail-hidden');
      } else {
        rail.classList.remove('rail-visible');
        rail.classList.add('rail-hidden');
      }
    }));
  }

  function openSettings() {
    buildSettings();
    const dialog = $('#studyai-settings-dialog');
    const mode = localStorage.getItem(NAV_KEY) || 'auto';
    const option = $(`input[name="nav-mode"][value="${mode}"]`, dialog);
    if (option) option.checked = true;
    if (!dialog.open) dialog.showModal();
  }

  function addSettingsButton() {
    const actions = $('.top-actions');
    if (!actions || $('#settings-button')) return;
    const button = document.createElement('button');
    button.id = 'settings-button';
    button.className = 'settings-button';
    button.type = 'button';
    button.textContent = '⚙';
    button.setAttribute('aria-label', 'Open settings');
    button.title = 'Settings';
    actions.insertBefore(button, $('#theme-toggle'));
    button.addEventListener('click', openSettings);
  }

  function init() {
    updateThemeToggle();
    addSettingsButton();
    buildLeftRail();
    buildSettings();
    const observer = new MutationObserver(updateThemeToggle);
    observer.observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
    $('#theme-toggle')?.addEventListener('click', () => setTimeout(updateThemeToggle, 0));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();