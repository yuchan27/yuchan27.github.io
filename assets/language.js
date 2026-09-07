/* Static, fully rendered language pages. No flag icons or translation service. */
(() => {
  'use strict';
  const key = 'yuchan-language';
  const url = new URL(location.href);
  const normalize = value => value === 'en' ? 'en' : /^zh(?:-|$)/i.test(value || '') ? 'zh' : null;
  const current = document.documentElement.lang === 'zh-Hant' ? 'zh' : 'en';
  const explicit = normalize(url.searchParams.get('lang'));
  let stored = null;
  try { stored = normalize(localStorage.getItem(key)); } catch { /* Storage is optional. */ }
  // An explicit Chinese path wins over preferences. Root is English by default.
  const desired = explicit || (current === 'zh' ? 'zh' : stored || 'en');
  if (explicit) {
    try { localStorage.setItem(key, explicit); } catch { /* Keep navigation usable. */ }
  }
  if (desired !== current && /^https?:$/.test(location.protocol)) {
    const target = new URL(desired === 'zh' ? '/zh/' : '/', location.origin);
    target.searchParams.set('lang', desired);
    target.hash = url.hash;
    location.replace(target.href);
    return;
  }
  function wireLinks() {
    document.querySelectorAll('[data-language]').forEach(link => {
      const target = new URL(link.href);
      target.hash = location.hash;
      link.href = target.href;
      link.addEventListener('click', () => {
        const next = normalize(link.dataset.language);
        if (!next) return;
        try { localStorage.setItem(key, next); } catch { /* No persistent storage required. */ }
        const href = new URL(link.href);
        href.hash = location.hash;
        link.href = href.href;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireLinks, { once: true });
  else wireLinks();
})();
