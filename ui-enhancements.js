(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

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

  function init() {
    updateThemeToggle();
    const observer = new MutationObserver(updateThemeToggle);
    observer.observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
    $('#theme-toggle')?.addEventListener('click', () => setTimeout(updateThemeToggle, 0));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();