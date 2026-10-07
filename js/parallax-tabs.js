/**
 * Horizontal Parallax Tabs (slider style)
 * Turns the stacked page sections into side-by-side "slides". Navigating (menu links,
 * pager, arrow keys, swipe) slides the incoming panel over while the outgoing one
 * recedes slower, inner layers travel at different speeds, a giant outlined word
 * moves behind each section, headings reveal through a mask and cards stagger in.
 * Motion values live in css/style.css; this file toggles state classes and sets
 * --offset / --sy / --h-index plus the viewport height.
 */
(function () {
  'use strict';

  const viewport = document.getElementById('h-viewport');
  const track = document.getElementById('h-track');
  if (!viewport || !track) return;

  const panels = Array.from(track.children).filter(el => el.tagName === 'SECTION' && el.id);
  if (panels.length < 2) return;

  const dotsWrap = document.getElementById('h-dots');
  const countEl = document.getElementById('h-count');
  const prevBtn = document.getElementById('h-prev');
  const nextBtn = document.getElementById('h-next');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const ids = panels.map(p => p.id);
  const ENTER_MS = 1900;
  const CARD_SELECTOR = '.service-card, .project-card, .skill-category-card, .timeline-item, ' +
    '.value-card, .contact-info-card, .stat-item, .filter-btn';

  // Giant outlined word behind each section
  const BG_WORDS = {
    home: 'PORTFOLIO',
    about: 'ABOUT',
    services: 'CORE COMPETENCIES',
    projects: 'PROJECTS',
    skills: 'SKILLS',
    journey: 'JOURNEY',
    contact: 'CONTACT'
  };

  let current = -1;
  let enterTimer = null;

  document.body.classList.add('h-mode');
  panels.forEach(panel => {
    panel.classList.add('h-panel');
    const word = document.createElement('div');
    word.className = 'h-bg-word';
    word.setAttribute('aria-hidden', 'true');
    word.textContent = BG_WORDS[panel.id] || panel.id.toUpperCase();
    word.style.setProperty('--chars', word.textContent.length); // long words shrink to fit
    panel.prepend(word);
  });

  // Pager dots, labelled with the matching menu text when available
  const dots = panels.map((panel, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'h-dot';
    const link = navLinks.find(a => a.getAttribute('href') === `#${panel.id}`);
    dot.setAttribute('aria-label', link ? link.textContent.trim() : panel.id);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  const pad = n => String(n).padStart(2, '0');

  function syncHeight() {
    if (current < 0) return;
    viewport.style.height = `${panels[current].offsetHeight}px`;
  }

  // Replay the masked-heading / staggered-card entrance on a panel
  function playEntrance(panel) {
    panels.forEach(p => p.classList.remove('is-entering'));
    panel.querySelectorAll(CARD_SELECTOR).forEach((el, k) => el.style.setProperty('--i', Math.min(k, 10)));
    void panel.offsetWidth; // restart CSS animations
    panel.classList.add('is-entering');
    clearTimeout(enterTimer);
    enterTimer = setTimeout(() => panel.classList.remove('is-entering'), ENTER_MS);
  }

  function goTo(index, opts = {}) {
    const { animate = true, updateHash = true } = opts;
    index = Math.max(0, Math.min(panels.length - 1, index));
    if (index === current) return;

    const previous = current;
    if (!animate) document.body.classList.add('h-no-anim');

    current = index;
    document.documentElement.style.setProperty('--h-index', index);
    panels.forEach((panel, i) => {
      // Only the outgoing and incoming panels animate; the rest jump into place
      panel.classList.toggle('h-skip', animate && i !== index && i !== previous);
      panel.classList.toggle('is-active', i === index);
      panel.classList.toggle('is-prev', i < index);
      panel.classList.toggle('is-next', i > index);
      panel.style.setProperty('--offset', i - index);
      panel.inert = i !== index; // keep keyboard focus out of off-screen panels
      panel.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    if (countEl) countEl.textContent = `${pad(index + 1)} / ${pad(panels.length)}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === panels.length - 1;

    const id = ids[index];
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    if (updateHash && location.hash !== `#${id}`) {
      history.pushState(null, '', `#${id}`);
    }

    syncHeight();
    updateScrollVar();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: animate ? 'smooth' : 'auto' });
    playEntrance(panels[index]);

    if (!animate) {
      void track.offsetWidth; // flush styles before re-enabling transitions
      requestAnimationFrame(() => document.body.classList.remove('h-no-anim'));
    }
  }

  // Vertical scroll parallax for the active panel (background word, portrait)
  // (scroll events already fire at most once per frame, so no rAF batching needed)
  function updateScrollVar() {
    if (current < 0) return;
    panels[current].style.setProperty('--sy', `${window.scrollY}px`);
  }
  window.addEventListener('scroll', updateScrollVar, { passive: true });

  // Fallback for browsers without overflow: clip — undo any sideways scroll of the viewport
  viewport.addEventListener('scroll', () => {
    if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
  });

  // In-page links (#about, #projects, ...) switch panels instead of jumping
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (link.classList.contains('back-to-top-btn')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const index = ids.indexOf(id);
    if (index === -1) return;
    e.preventDefault();
    goTo(index);
  });

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('popstate', () => {
    const index = ids.indexOf(location.hash.slice(1));
    goTo(index === -1 ? 0 : index, { updateHash: false });
  });

  // Arrow keys, unless the visitor is typing, editing or has a modal open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const t = e.target;
    if (t instanceof Element && t.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (document.querySelector('.modal-backdrop.open, .cropper-modal-backdrop.open')) return;
    goTo(current + (e.key === 'ArrowRight' ? 1 : -1));
  });

  // Horizontal swipe on touch devices (vertical scrolling stays untouched)
  let touchX = 0;
  let touchY = 0;
  viewport.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  // Keep the viewport as tall as the active panel when its content changes
  // (project filters, language switch, live editor, images loading)
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => syncHeight());
    panels.forEach(p => ro.observe(p));
  }
  window.addEventListener('resize', syncHeight);
  // Fallbacks for when ResizeObserver callbacks are throttled (e.g. background tabs)
  window.addEventListener('portfolio:rendered', syncHeight);
  track.addEventListener('load', syncHeight, true); // images finishing inside panels

  const startIndex = ids.indexOf(location.hash.slice(1));
  goTo(startIndex === -1 ? 0 : startIndex, { animate: false, updateHash: false });
  window.scrollTo(0, 0);
  viewport.scrollLeft = 0;
})();
