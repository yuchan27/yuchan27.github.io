/* Progressive enhancement only. No API keys, analytics, microphone or model calls. */
(() => {
  'use strict';
  const root = document.documentElement;
  const tr = (en, zh) => root.lang === 'zh-Hant' ? zh : en;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let explicitMotionChoice = false;
  const motionButton = document.querySelector('#motion-toggle');
  const motionCallbacks = new Set();
  function setMotion(value) {
    paused = value;
    root.dataset.motion = value ? 'off' : 'on';
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(value));
      motionButton.textContent = value ? tr('Play animation', '\u64ad\u653e\u52d5\u614b') : tr('Pause animation', '\u66ab\u505c\u52d5\u614b');
    }
    motionCallbacks.forEach(callback => callback());
  }
  motionButton?.addEventListener('click', () => {
    explicitMotionChoice = true;
    setMotion(!paused);
  });
  reduced.addEventListener('change', event => {
    if (!explicitMotionChoice) setMotion(event.matches);
  });
  setMotion(paused);

  // Accessible mobile navigation; the rest of the document remains usable.
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  function closeMenu(restoreFocus = false) {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', tr('Open menu', '\u958b\u555f\u9078\u55ae'));
    if (restoreFocus) menuButton?.focus();
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? tr('Close menu', '\u95dc\u9589\u9078\u55ae') : tr('Open menu', '\u958b\u555f\u9078\u55ae'));
    nav?.classList.toggle('open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.matchMedia('(min-width: 561px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  // Filter existing semantic HTML instead of loading projects over the network.
  const cards = [...document.querySelectorAll('.project-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('#project-count');
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      const matches = category === 'all' || card.dataset.categories.split(' ').includes(category);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (count) count.textContent = `${String(visible).padStart(2, '0')} ${tr('PROJECTS / PRACTICES', '\u500b\u5c08\u6848 / \u5be6\u4f5c')}`;
  }));

  // Restrained entrances. Elements are visible even if JS or observers fail.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!paused && entry.target.animate) {
          entry.target.animate([
            { opacity: 0.4, transform: 'translateY(15px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)' });
        }
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.project-card, .section-heading, .about-grid').forEach(item => reveal.observe(item));
  }
  const progress = document.querySelector('.reading-progress');
  let scrollFrame = 0;
  function updateProgress() {
    scrollFrame = 0;
    const distance = root.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
  }
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const toast = document.querySelector('#toast');
  let toastTimer = 0;
  function notify(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 4000);
  }
  document.querySelector('#copy-link')?.addEventListener('click', async () => {
    const url = document.querySelector('link[rel="canonical"]')?.href || location.href;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      notify(tr('Website link copied', '\u7db2\u7ad9\u9023\u7d50\u5df2\u8907\u88fd'));
    } catch {
      notify(`${tr('Copy this URL: ', '\u8acb\u8907\u88fd\u7db2\u5740\uff1a')}${url}`);
    }
  });

  document.querySelector('#copy-email')?.addEventListener('click', async () => {
    const email = 'wuwu6249@gmail.com';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      notify(tr('Email copied', '\u4fe1\u7bb1\u5df2\u8907\u88fd'));
    } catch {
      notify(`${tr('Email: ', '\u4fe1\u7bb1\uff1a')}${email}`);
    }
  });

  // Deterministic 3D knot study. This is decorative, not an AI/network monitor.
  const canvas = document.querySelector('#neural-canvas');
  const art = document.querySelector('.hero-art');
  if (!canvas || !art) return;
  const context = canvas.getContext('2d');
  if (!context) return; // The CSS ring illustration remains as the fallback.
  const rings = 150;
  const sides = 10;
  const points = [];
  for (let ring = 0; ring < rings; ring += 1) {
    const u = (ring / rings) * Math.PI * 2;
    for (let side = 0; side < sides; side += 1) {
      const v = (side / sides) * Math.PI * 2;
      const radius = 2 + 0.64 * Math.cos(3 * u) + 0.21 * Math.cos(v);
      points.push({
        x: radius * Math.cos(2 * u),
        y: radius * Math.sin(2 * u),
        z: 0.72 * Math.sin(3 * u) + 0.21 * Math.sin(v)
      });
    }
  }
  let width = 0;
  let height = 0;
  let active = true;
  let frame = 0;
  let lastTime = 0;
  let angle = 0.45;
  let pointerX = 0;
  let pointerY = 0;
  function project(point) {
    const ay = angle * 0.34 + pointerX * 0.15;
    const ax = -0.55 + Math.sin(angle * 0.3) * 0.12 + pointerY * 0.12;
    const az = -0.45;
    const x1 = point.x * Math.cos(ay) + point.z * Math.sin(ay);
    const z1 = -point.x * Math.sin(ay) + point.z * Math.cos(ay);
    const y1 = point.y * Math.cos(ax) - z1 * Math.sin(ax);
    const z2 = point.y * Math.sin(ax) + z1 * Math.cos(ax);
    const x2 = x1 * Math.cos(az) - y1 * Math.sin(az);
    const y2 = x1 * Math.sin(az) + y1 * Math.cos(az);
    const perspective = 8 / (8 - z2);
    const scale = Math.min(width, height) * 0.137;
    return { x: width * 0.51 + x2 * scale * perspective, y: height * 0.48 + y2 * scale * perspective, z: z2 };
  }
  function draw() {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const projected = points.map(project);
    for (let ring = 0; ring < rings; ring += 1) {
      for (let side = 0; side < sides; side += 1) {
        const index = ring * sides + side;
        const point = projected[index];
        const nextRing = projected[((ring + 1) % rings) * sides + side];
        const nextSide = projected[ring * sides + ((side + 1) % sides)];
        const depth = Math.max(0.08, Math.min(1, (point.z + 2.9) / 5.8));
        context.strokeStyle = `rgba(230,170,129,${0.09 + depth * 0.35})`;
        context.lineWidth = 0.55;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(nextRing.x, nextRing.y);
        if (ring % 2 === 0) {
          context.moveTo(point.x, point.y);
          context.lineTo(nextSide.x, nextSide.y);
        }
        context.stroke();
        if (ring % 3 === 0) {
          context.fillStyle = `rgba(251,204,158,${0.13 + depth * 0.8})`;
          context.beginPath();
          context.arc(point.x, point.y, 0.45 + depth * 0.65, 0, Math.PI * 2);
          context.fill();
        }
      }
    }
    art.classList.add('canvas-ready');
  }
  function tick(time) {
    frame = 0;
    if (paused || !active || document.hidden) return;
    const elapsed = time - lastTime;
    if (elapsed >= 1000 / 24) {
      angle += Math.min(elapsed, 80) * 0.00018;
      lastTime = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function refreshAnimation() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    draw();
    if (!paused && active && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const bounds = art.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(art);
  else window.addEventListener('resize', resize, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      active = entries[0].isIntersecting;
      refreshAnimation();
    }, { threshold: 0 }).observe(art);
  }
  art.addEventListener('pointermove', event => {
    if (paused || event.pointerType === 'touch') return;
    const bounds = art.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  }, { passive: true });
  art.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  motionCallbacks.add(refreshAnimation);
  document.addEventListener('visibilitychange', refreshAnimation);
  resize();
  refreshAnimation();
})();