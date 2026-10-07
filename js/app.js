/**
 * Portfolio Application Engine - Lê Đức Việt
 * Features:
 * - Dynamic i18n Language Switcher (VI / EN)
 * - Interactive Ambient Canvas Particle Constellation
 * - Custom Cursor Halo
 * - Animated Number Counters (IntersectionObserver)
 * - Interactive Project Filtering & 3D Tilt Effect
 * - Full Case Study Popup Modal
 * - Interactive Contact Form & Toast Feedback
 * - Navbar ScrollSpy & Mobile Menu
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  let currentLang = localStorage.getItem('viet_portfolio_lang') || 'vi';
  let currentTheme = localStorage.getItem('viet_portfolio_theme') || 'dark';
  let activeFilter = 'all';
  let currentOpenProjectId = null;

  // --- DOM REFERENCES ---
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const cursorGlow = document.getElementById('cursor-glow');
  const ambientCanvas = document.getElementById('ambient-canvas');

  const statsStrip = document.getElementById('stats-strip');
  const aboutValues = document.getElementById('about-values');
  const servicesGrid = document.getElementById('services-grid');
  const projectFilters = document.getElementById('project-filters');
  const projectsGrid = document.getElementById('projects-grid');
  const skillsGrid = document.getElementById('skills-grid');
  const journeyTimeline = document.getElementById('journey-timeline');


  const modalBackdrop = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalHeroMetric = document.getElementById('modal-hero-metric');
  const modalTitle = document.getElementById('modal-title');
  const modalMetricsGrid = document.getElementById('modal-metrics-grid');
  const modalObjective = document.getElementById('modal-objective');
  const modalStrategyList = document.getElementById('modal-strategy-list');
  const modalTagsRow = document.getElementById('modal-tags-row');
  const modalChallengeTitle = document.getElementById('modal-challenge-title');
  const modalStrategyTitle = document.getElementById('modal-strategy-title');
  const modalRoleRow = document.getElementById('modal-role-row');
  const modalLearningsSection = document.getElementById('modal-learnings-section');
  const modalLearningsList = document.getElementById('modal-learnings-list');
  const modalLearningsTitle = document.getElementById('modal-learnings-title');

  // --- HELPER: GET LOCALIZED DATA ---
  function getDict() {
    return PORTFOLIO_DATA[currentLang] || PORTFOLIO_DATA.vi;
  }

  // --- 1. INTERNATIONALIZATION (I18N) ENGINE ---
  function updateStaticTranslations() {
    const dict = getDict();
    document.documentElement.lang = currentLang;

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let val = dict;
      for (const k of keys) {
        if (val && val[k] !== undefined) {
          val = val[k];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null && typeof val === 'string') {
        if (key === 'nav.cta') {
          el.innerHTML = `<i class="ri-file-download-line"></i> ${val}`;
        } else if (key === 'hero.btnProjects') {
          el.innerHTML = `<i class="ri-fire-line"></i> ${val}`;
        } else if (key === 'hero.btnContact') {
          el.innerHTML = `<i class="ri-chat-smile-2-line"></i> ${val}`;
        } else if (key === 'footer.backToTop') {
          el.innerHTML = `<i class="ri-arrow-up-line"></i> ${val}`;
        } else {
          el.textContent = val;
        }
      }
    });

    // Update Language Toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Hero Avatar Image from data if present
    const avatarEl = document.querySelector('.avatar-wrapper img');
    if (avatarEl && dict.hero && dict.hero.avatar) {
      avatarEl.src = dict.hero.avatar;
    }

    // Modal Titles
    if (modalChallengeTitle) {
      modalChallengeTitle.innerHTML = `<i class="ri-flag-2-line"></i> ${dict.modal.challengeTitle}`;
    }
    if (modalStrategyTitle) {
      modalStrategyTitle.innerHTML = `<i class="ri-compass-3-line"></i> ${dict.modal.strategyTitle}`;
    }
    if (modalLearningsTitle && dict.modal.learningsTitle) {
      modalLearningsTitle.innerHTML = `<i class="ri-lightbulb-flash-line"></i> ${dict.modal.learningsTitle}`;
    }
  }

  // --- 2. RENDER DYNAMIC SECTIONS ---

  // Stats Counters
  function renderStats() {
    const dict = getDict();
    statsStrip.innerHTML = '';
    dict.hero.stats.forEach(st => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      item.innerHTML = `
        <div class="stat-number">
          <span class="counter" data-target="${st.value}">0</span>${st.suffix}
        </div>
        <div class="stat-label">${st.label}</div>
      `;
      statsStrip.appendChild(item);
    });
    initCounters();
  }

  // About Core Values
  function renderAboutValues() {
    const dict = getDict();
    aboutValues.innerHTML = '';
    const icons = ['ri-radar-fill', 'ri-movie-fill', 'ri-rocket-2-fill'];
    dict.about.coreValues.forEach((val, idx) => {
      const card = document.createElement('div');
      card.className = 'value-card';
      card.innerHTML = `
        <div class="value-icon"><i class="${icons[idx] || 'ri-check-line'}"></i></div>
        <div class="value-content">
          <h3>${val.title}</h3>
          <p>${val.desc}</p>
        </div>
      `;
      aboutValues.appendChild(card);
    });
  }

  // Services
  function renderServices() {
    const dict = getDict();
    servicesGrid.innerHTML = '';
    dict.services.items.forEach(srv => {
      const card = document.createElement('div');
      card.className = 'service-card';
      const deliverablesHtml = srv.deliverables.map(d => `
        <div class="deliverable-item">
          <i class="ri-check-double-line"></i>
          <span>${d}</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="service-header">
          <div class="service-icon-box"><i class="${srv.icon}"></i></div>
          <h3 class="service-title">${srv.title}</h3>
        </div>
        <p class="service-desc">${srv.desc}</p>
        <div class="service-deliverables">
          ${deliverablesHtml}
        </div>
      `;
      servicesGrid.appendChild(card);
    });
  }

  // Project Filters
  function renderProjectFilters() {
    const dict = getDict();
    projectFilters.innerHTML = '';

    // "All" filter button
    const allBtn = document.createElement('button');
    allBtn.className = `filter-btn ${activeFilter === 'all' ? 'active' : ''}`;
    allBtn.setAttribute('data-filter', 'all');
    allBtn.textContent = dict.projects.filterAll;
    projectFilters.appendChild(allBtn);

    // Categories
    for (const [key, label] of Object.entries(dict.projects.filterCategories)) {
      const btn = document.createElement('button');
      btn.className = `filter-btn ${activeFilter === key ? 'active' : ''}`;
      btn.setAttribute('data-filter', key);
      btn.textContent = label;
      projectFilters.appendChild(btn);
    }

    // Attach click events
    projectFilters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        renderProjects();
      });
    });
  }

  // Helper: Robust Category Matcher for Filtering
  function isProjectMatchingFilter(project, filterKey, filterCategories) {
    if (!filterKey || filterKey === 'all') return true;
    if (!project || !project.category) return false;

    const norm = (s) => (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    const projCatNorm = norm(project.category);
    const filterKeyNorm = norm(filterKey);
    const filterLabelNorm = norm(filterCategories && filterCategories[filterKey]);

    // 1. Direct key match: 'campaign' === 'campaign'
    if (projCatNorm === filterKeyNorm) return true;

    // 2. Direct label match: 'digitalcampaign' === 'digitalcampaign'
    if (filterLabelNorm && projCatNorm === filterLabelNorm) return true;

    // 3. Category alias mapping
    const aliases = {
      campaign: ['campaign', 'digitalcampaign', 'digital', 'chiendich'],
      content: ['content', 'viralvideomedia', 'viralvideo', 'media', 'video', 'noidung'],
      growth: ['growth', 'brandgrowth', 'brand', 'branding', 'thuonghieu'],
      performance: ['performance', 'performanceads', 'ads', 'performancemarketing', 'quangcao'],
      planning: ['planning', 'marketplanning', 'omnichannel', 'kehoach'],
      ecommerce: ['ecommerce', 'tiktokshop', 'shopee', 'thuongmaidientu'],
      affiliate: ['affiliate', 'koc', 'kol', 'influencer']
    };

    const targetAliases = aliases[filterKey] || [filterKeyNorm];
    return targetAliases.some(alias => projCatNorm === alias || projCatNorm.includes(alias) || alias.includes(projCatNorm));
  }

  // Projects Grid
  function renderProjects() {
    const dict = getDict();
    projectsGrid.innerHTML = '';

    const filtered = activeFilter === 'all'
      ? dict.projects.list
      : dict.projects.list.filter(p => isProjectMatchingFilter(p, activeFilter, dict.projects.filterCategories));

    if (filtered.length === 0) {
      const emptyItem = document.createElement('div');
      emptyItem.style.gridColumn = '1 / -1';
      emptyItem.style.textAlign = 'center';
      emptyItem.style.padding = '3.5rem 1rem';
      emptyItem.style.color = 'var(--text-muted)';
      emptyItem.innerHTML = `
        <i class="ri-folder-open-line" style="font-size: 2.5rem; color: var(--cyan); display: block; margin-bottom: 0.75rem;"></i>
        <p style="font-size: 1.1rem; font-weight: 600;">Không có dự án nào trong mục này</p>
      `;
      projectsGrid.appendChild(emptyItem);
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);

      const tagsHtml = project.tags.map(t => `<span class="project-tag">#${t}</span>`).join('');

      card.innerHTML = `
        <div class="project-media">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="project-overlay">
            <span class="project-hero-metric"><i class="ri-pulse-line"></i> ${project.heroMetric}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-meta">
            <span class="project-category">${dict.projects.filterCategories[project.category] || project.category}</span>
            <span class="project-client">${project.client}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-highlight">${project.highlight}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-footer">
            <span class="view-detail-link">
              ${dict.projects.viewDetail} <i class="ri-arrow-right-up-line"></i>
            </span>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        // Prevent opening modal if user is clicking an editable field or editor action button
        if (e.target.closest('[contenteditable="true"]') ||
            e.target.closest('.editor-img-actions-wrap') ||
            e.target.closest('.editor-img-btn')) {
          return;
        }
        openCaseStudyModal(project.id);
      });

      // 3D Card Tilt Interaction
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });

      projectsGrid.appendChild(card);
    });

    try {
      window.dispatchEvent(new CustomEvent('portfolio:rendered'));
    } catch (e) {}
  }

  // Skills
  function renderSkills() {
    const dict = getDict();
    skillsGrid.innerHTML = '';
    dict.skills.groups.forEach(group => {
      const card = document.createElement('div');
      card.className = 'skill-category-card';

      const itemsHtml = group.skills.map(sk => `
        <div class="skill-item-row">
          <div class="skill-item-left">
            <div class="skill-item-icon"><i class="${sk.icon || 'ri-checkbox-circle-line'}"></i></div>
            <span class="skill-name">${sk.name}</span>
          </div>
          <div class="skill-item-check"><i class="ri-checkbox-circle-fill"></i></div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="skill-cat-header">
          <div class="skill-cat-icon"><i class="${group.icon}"></i></div>
          <h3 class="skill-cat-title">${group.title}</h3>
        </div>
        <div class="skill-items-list">
          ${itemsHtml}
        </div>
      `;
      skillsGrid.appendChild(card);
    });
  }

  // Journey Timeline
  function renderJourney() {
    const dict = getDict();
    journeyTimeline.innerHTML = '';
    dict.journey.timeline.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-year">${item.year}</span>
            <span class="timeline-company">${item.company}</span>
          </div>
          <h3 class="timeline-role">${item.role}</h3>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      `;
      journeyTimeline.appendChild(el);
    });
  }



  // Refresh all components based on active language
  function renderAll() {
    updateStaticTranslations();
    renderStats();
    renderAboutValues();
    renderServices();
    renderProjectFilters();
    renderProjects();
    renderSkills();
    renderJourney();

    if (currentOpenProjectId) {
      openCaseStudyModal(currentOpenProjectId);
    }

    try {
      window.dispatchEvent(new CustomEvent('portfolio:rendered', { detail: { lang: currentLang } }));
    } catch (e) {}
  }

  // Expose global methods for Editor
  window.portfolioSetLanguage = function (lang) {
    if (lang && (lang === 'vi' || lang === 'en')) {
      currentLang = lang;
      localStorage.setItem('viet_portfolio_lang', currentLang);
      renderAll();
    }
  };
  window.portfolioGetCurrentLang = function () {
    return currentLang;
  };
  window.portfolioRenderAll = function () {
    renderAll();
  };
  window.portfolioGetCurrentOpenProjectId = function () {
    return currentOpenProjectId;
  };

  // --- THEME ENGINE (DARK / LIGHT) ---
  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('viet_portfolio_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'light' ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng');
    }

    const editorThemeBtn = document.getElementById('editor-theme-btn');
    if (editorThemeBtn) {
      editorThemeBtn.innerHTML = theme === 'light' ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
      editorThemeBtn.setAttribute('title', theme === 'light' ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng');
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  window.portfolioSetTheme = applyTheme;
  window.portfolioGetTheme = function () { return currentTheme; };
  window.portfolioToggleTheme = toggleTheme;

  // --- 3. CASE STUDY MODAL LOGIC ---
  function openCaseStudyModal(projectId) {
    const dict = getDict();
    const project = dict.projects.list.find(p => p.id === projectId);
    if (!project) return;

    currentOpenProjectId = projectId;
    modalBackdrop.setAttribute('data-current-project-id', projectId);
    modalImg.src = project.image;
    modalImg.alt = project.title;
    modalCategory.textContent = dict.projects.filterCategories[project.category] || project.category;
    modalHeroMetric.innerHTML = `<i class="ri-pulse-line"></i> ${project.heroMetric}`;
    modalTitle.textContent = project.title;
    modalObjective.textContent = project.objective;

    // Metrics grid
    modalMetricsGrid.innerHTML = '';
    project.results.forEach(res => {
      const mCard = document.createElement('div');
      mCard.className = 'modal-metric-card';
      mCard.innerHTML = `
        <div class="modal-metric-val">${res.val}</div>
        <div class="modal-metric-lbl">${res.label}</div>
      `;
      modalMetricsGrid.appendChild(mCard);
    });

    // Role & timeline (optional fields)
    modalRoleRow.innerHTML = '';
    [
      { icon: 'ri-user-star-line', title: dict.modal.roleTitle, text: project.role },
      { icon: 'ri-calendar-line', title: dict.modal.periodTitle, text: project.period }
    ].forEach(meta => {
      if (!meta.text) return;
      const cell = document.createElement('div');
      cell.className = 'modal-role-cell';
      cell.innerHTML = `
        <span class="modal-role-label"><i class="${meta.icon}"></i> ${meta.title || ''}</span>
        <p class="modal-role-text"></p>
      `;
      cell.querySelector('.modal-role-text').textContent = meta.text;
      modalRoleRow.appendChild(cell);
    });
    modalRoleRow.style.display = modalRoleRow.children.length ? '' : 'none';

    // Strategy bullet items
    modalStrategyList.innerHTML = '';
    project.strategy.forEach(st => {
      const li = document.createElement('li');
      li.textContent = st;
      modalStrategyList.appendChild(li);
    });

    // Learnings & next steps (optional field)
    modalLearningsList.innerHTML = '';
    (project.learnings || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalLearningsList.appendChild(li);
    });
    modalLearningsSection.style.display = modalLearningsList.children.length ? '' : 'none';

    // Tags
    modalTagsRow.innerHTML = '';
    project.tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'project-tag';
      tag.textContent = `#${t}`;
      modalTagsRow.appendChild(tag);
    });

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Dispatch event so editor attaches inline editing & cropper tools inside modal
    try {
      window.dispatchEvent(new CustomEvent('modal:opened', { detail: { projectId } }));
    } catch (e) {}
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentOpenProjectId = null;
    modalBackdrop.querySelectorAll('[contenteditable="true"]').forEach(el => {
      el.removeAttribute('contenteditable');
    });
    try {
      window.dispatchEvent(new CustomEvent('modal:closed'));
    } catch (e) {}
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // --- 4. ANIMATED COUNTERS ---
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 1600;
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            count = Math.floor(ease * target);
            el.textContent = count;
            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              el.textContent = target;
            }
          }
          requestAnimationFrame(updateNumber);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // --- 5. SKILL ITEMS (NO-OP / RETAINED FOR API COMPAT) ---
  function initSkillBars() {
    // Percentage rating bars removed per user request: display clean skill arsenal instead
  }

  // --- 6. LANGUAGE SWITCHER EVENT ---
  langToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.getAttribute('data-lang');
    if (lang && lang !== currentLang) {
      currentLang = lang;
      localStorage.setItem('viet_portfolio_lang', currentLang);
      renderAll();
    }
  });

  // --- 7. NAVBAR SCROLL & ACTIVE LINK SPY ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy (horizontal panel mode sets the active link itself, see parallax-tabs.js)
    if (document.body.classList.contains('h-mode')) return;
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'ri-close-line';
    } else {
      icon.className = 'ri-menu-4-line';
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'ri-menu-4-line';
    });
  });

  // --- 9. INTERACTIVE CURSOR GLOW FOLLOWER ---
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    if (cursorGlow) {
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // --- 10. AMBIENT CANVAS PARTICLE CONSTELLATION ---
  function initAmbientCanvas() {
    if (!ambientCanvas) return;
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width * 0.05), 65);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
        // Alternate between Cyan and Cobalt/Electric Blue
        this.color = Math.random() > 0.4 ? '0, 242, 254' : '29, 78, 216';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse gentle push/pull
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          this.x -= (dx / dist) * 0.6;
          this.y -= (dy / dist) * 0.6;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- INITIALIZATION ---
  applyTheme(currentTheme);
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  renderAll();
  initAmbientCanvas();

})();
