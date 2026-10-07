/**
 * Live Visual In-Place Editor for Portfolio LEDUCVIET
 * Allows direct in-browser text editing, image replacement, and saving permanently to data.js & assets/images/
 */

(function () {
  'use strict';

  let isEditMode = false; // Default is OFF: normal clean viewing mode for all visitors
  let isPreviewMode = false;
  let unsavedChangesCount = 0;
  let pendingImageUploads = [];
  let activeImageTarget = null;
  let activeCropperInstance = null;
  let cropperScaleX = 1;
  let cropperScaleY = 1;
  // Fingerprint of js/data.js as loaded from disk, used to tell whether a browser draft is stale
  let fileDataHash = '';

  function hashData(obj) {
    const str = JSON.stringify(obj);
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return String(h >>> 0);
  }

  // Helper: Get active language
  function getActiveLang() {
    return (window.portfolioGetCurrentLang && window.portfolioGetCurrentLang()) ||
           localStorage.getItem('viet_portfolio_lang') ||
           document.documentElement.lang ||
           'vi';
  }

  // Create & Inject Floating Capsule Toolbar
  function createEditorToolbar() {
    if (document.getElementById('live-editor-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.id = 'live-editor-toolbar';
    toolbar.className = 'live-editor-toolbar';

    toolbar.innerHTML = `
      <!-- Expanded Capsule Bar -->
      <div class="editor-bar-capsule" id="editor-bar-capsule">
        <div class="editor-capsule-status" id="editor-status-indicator" title="Chế độ biên tập đang mở - Nhấp để tạm dừng xem thử">
          <span class="editor-pulse-dot"></span>
          <span class="editor-capsule-status-text" id="editor-status-text">ĐANG BẬT SỬA</span>
        </div>

        <div class="editor-capsule-hint">
          <i class="ri-edit-2-line"></i>
          <span>Nhấp thẳng vào chữ để sửa</span>
        </div>

        <div class="editor-lang-group" title="Chuyển ngôn ngữ để sửa phiên bản tương ứng">
          <button class="editor-lang-btn ${getActiveLang() === 'vi' ? 'active' : ''}" id="editor-lang-vi" data-lang="vi">VI</button>
          <button class="editor-lang-btn ${getActiveLang() === 'en' ? 'active' : ''}" id="editor-lang-en" data-lang="en">EN</button>
        </div>

        <div class="editor-capsule-actions">
          <button class="editor-btn-action editor-btn-save" id="editor-save-btn" title="Lưu vĩnh viễn vào mã nguồn (Ctrl + S)">
            <i class="ri-save-3-line"></i>
            <span>LƯU THAY ĐỔI</span>
            <span class="editor-unsaved-badge" id="editor-unsaved-badge" style="display:none;">0</span>
          </button>

          <button class="editor-btn-action editor-btn-sub" id="editor-avatar-btn" title="Thay ảnh đại diện mới từ máy tính">
            <i class="ri-camera-lens-line"></i>
            <span>Đổi Avatar</span>
          </button>

          <button class="editor-btn-action editor-btn-sub" id="editor-preview-btn" title="Bật/Tắt xem trước không viền">
            <i class="ri-eye-line"></i>
            <span>Xem trước</span>
          </button>

          <button class="editor-btn-action editor-btn-sub" id="editor-reset-btn" title="Khôi phục lại nội dung ban đầu">
            <i class="ri-refresh-line"></i>
            <span>Đặt lại</span>
          </button>

          <button class="editor-btn-action editor-btn-sub editor-btn-icon-only" id="editor-theme-btn" title="Chuyển giao diện Sáng / Tối">
            <i class="ri-sun-line"></i>
          </button>

          <button class="editor-btn-action editor-btn-sub" id="editor-close-edit-btn" title="Tắt chế độ chỉnh sửa (Quay lại xem website bình thường)">
            <i class="ri-close-circle-line"></i>
            <span>Tắt sửa</span>
          </button>

          <button class="editor-btn-action editor-btn-sub editor-btn-icon-only" id="editor-minimize-btn" title="Thu nhỏ thanh công cụ">
            <i class="ri-arrow-down-s-line"></i>
          </button>
        </div>
      </div>

      <!-- Minimized Floating Pill -->
      <div class="editor-bar-collapsed" id="editor-bar-collapsed" title="Nhấp để bật chế độ chỉnh sửa trực tiếp">
        <i class="ri-edit-circle-line"></i>
        <span>Bật Chế Độ Sửa</span>
        <span class="editor-pulse-dot"></span>
      </div>

      <!-- Toast Notification -->
      <div class="editor-toast" id="editor-toast"></div>
    `;

    document.body.appendChild(toolbar);

    // Hidden file input for uploading images
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'editor-hidden-file-input';
    fileInput.accept = 'image/png, image/jpeg, image/webp, image/svg+xml';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    setupToolbarEvents(fileInput);
  }

  // Toast Notification Helper
  function showToast(msg, isError = false) {
    const toast = document.getElementById('editor-toast');
    if (!toast) return;
    toast.innerHTML = (isError ? '<i class="ri-error-warning-line"></i> ' : '<i class="ri-checkbox-circle-line"></i> ') + msg;
    toast.className = 'editor-toast ' + (isError ? 'toast-error' : 'toast-success') + ' show';
    setTimeout(() => {
      toast.className = 'editor-toast';
    }, 4500);
  }

  // Mark unsaved changes
  function registerChange() {
    unsavedChangesCount++;
    const saveBtn = document.getElementById('editor-save-btn');
    const badge = document.getElementById('editor-unsaved-badge');
    if (saveBtn) saveBtn.classList.add('has-unsaved');
    if (badge) {
      badge.textContent = unsavedChangesCount;
      badge.style.display = 'inline-block';
    }
  }

  function clearChangesIndicator() {
    unsavedChangesCount = 0;
    const saveBtn = document.getElementById('editor-save-btn');
    const badge = document.getElementById('editor-unsaved-badge');
    if (saveBtn) saveBtn.classList.remove('has-unsaved');
    if (badge) badge.style.display = 'none';
  }

  // Toggle Edit Mode vs Normal / Preview Mode
  function setEditMode(active, isPreviewOnly = false) {
    isEditMode = !!active;
    const toolbar = document.getElementById('live-editor-toolbar');
    const statusText = document.getElementById('editor-status-text');
    const statusBox = document.getElementById('editor-status-indicator');
    const previewBtn = document.getElementById('editor-preview-btn');

    if (isEditMode) {
      document.body.classList.add('editor-mode-active');
      if (toolbar) toolbar.classList.remove('minimized');
      if (statusText) statusText.textContent = 'ĐANG BẬT SỬA';
      if (statusBox) statusBox.classList.remove('paused');
      if (previewBtn) {
        previewBtn.classList.remove('active');
        previewBtn.innerHTML = '<i class="ri-eye-line"></i> <span>Xem trước</span>';
      }
      enableInlineTextEditing();
      enableInlineImageEditing();
      setupListAndCardControls();
    } else {
      document.body.classList.remove('editor-mode-active');
      if (toolbar) {
        if (isPreviewOnly) {
          toolbar.classList.remove('minimized');
        } else {
          toolbar.classList.add('minimized');
        }
      }
      if (statusText) statusText.textContent = isPreviewOnly ? 'ĐANG XEM TRƯỚC' : 'ĐÃ TẮT SỬA';
      if (statusBox) statusBox.classList.add('paused');
      if (previewBtn) {
        if (isPreviewOnly) {
          previewBtn.classList.add('active');
          previewBtn.innerHTML = '<i class="ri-edit-line"></i> <span>Tiếp tục sửa</span>';
        } else {
          previewBtn.classList.remove('active');
          previewBtn.innerHTML = '<i class="ri-eye-line"></i> <span>Xem trước</span>';
        }
      }
      disableInlineTextEditing();
      disableInlineImageEditing();
      disableListAndCardControls();
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }
  }

  // Apply contenteditable to all text elements across the page
  function enableInlineTextEditing() {
    if (!isEditMode) return;

    // Comprehensive selector covering headers, hero, stats, about, services, projects, skills, journey, contact
    const selectors = [
      '[data-i18n]',
      '.hero-title span',
      '.hero-greeting',
      '.hero-subrole',
      '.hero-bio',
      '#hero-badge',
      '.stat-label',
      '.counter',
      '#about-desc1',
      '#about-desc2',
      '.value-content h3',
      '.value-content p',
      '.service-title',
      '.service-desc',
      '.deliverable-item span',
      '.project-title',
      '.project-hero-metric',
      '.project-desc',
      '.project-highlight',
      '.project-client',
      '.project-category',
      '.project-tag',
      '#modal-title',
      '#modal-hero-metric',
      '#modal-category',
      '#modal-objective',
      '.modal-metric-val',
      '.modal-metric-lbl',
      '.modal-strategy-list li',
      '#modal-tags-row .project-tag',
      '.skill-cat-title',
      '.skill-name',
      '.timeline-year',
      '.timeline-role',
      '.timeline-company',
      '.timeline-desc',
      '.contact-card h4',
      '.contact-card p',
      '.contact-link-text',
      '.section-title',
      '.section-subtitle',
      '.section-badge'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(el => {
      // Do not make navigational anchors or interactive buttons editable unless specific text inside
      if (el.tagName === 'A' && (el.classList.contains('btn') || el.classList.contains('nav-link'))) {
        return;
      }
      if (el.tagName === 'BUTTON') return;

      // Do not make elements in closed modal editable
      const modalParent = el.closest('#case-study-modal');
      if (modalParent && !modalParent.classList.contains('open')) {
        return;
      }

      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
      el.title = 'Nhấp để chỉnh sửa nội dung này';

      // Avoid double-binding
      if (!el._hasEditorListener) {
        el._hasEditorListener = true;

        el.addEventListener('input', () => {
          registerChange();
          syncElementToData(el, false);
        });

        el.addEventListener('blur', () => {
          syncElementToData(el, true);
        });

        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            if (el.closest('.deliverable-item')) {
              e.preventDefault();
              const srvCard = el.closest('.service-card');
              const addBtn = srvCard ? srvCard.querySelector('.editor-add-item-btn') : null;
              if (addBtn) addBtn.click();
              return;
            }
            if (el.closest('.modal-strategy-list')) {
              e.preventDefault();
              const stratList = el.closest('.modal-strategy-list');
              const addStratBtn = stratList ? stratList.querySelector('.editor-add-item-btn') : null;
              if (addStratBtn) addStratBtn.click();
              return;
            }
            if (!el.matches('p, .hero-bio, .timeline-desc, .service-desc, #about-desc1, #about-desc2, #modal-objective, .project-highlight')) {
              e.preventDefault();
              el.blur();
            }
          }

          if (e.key === 'Backspace' && el.innerText.trim() === '') {
            if (el.closest('.deliverable-item')) {
              e.preventDefault();
              const delivItem = el.closest('.deliverable-item');
              const delBtn = delivItem ? delivItem.querySelector('.editor-item-del-btn') : null;
              if (delBtn) delBtn.click();
              return;
            }
            if (el.closest('.modal-strategy-list')) {
              e.preventDefault();
              const li = el.closest('li');
              const delBtn = li ? li.querySelector('.editor-item-del-btn') : null;
              if (delBtn) delBtn.click();
              return;
            }
          }
        });
      }
    });
  }

  // Disable text contenteditable completely
  function disableInlineTextEditing() {
    const editables = document.querySelectorAll('[contenteditable]');
    editables.forEach(el => {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
      if (el.title === 'Nhấp để chỉnh sửa nội dung này') {
        el.removeAttribute('title');
      }
    });
  }

  // Universal Double-click listener: allows editing ANY text block even if not in selectors
  document.addEventListener('dblclick', (e) => {
    if (!isEditMode) return;
    const target = e.target;
    if (target.matches('h1, h2, h3, h4, h5, h6, p, span, li, blockquote, label')) {
      if (target.getAttribute('contenteditable') !== 'true') {
        target.setAttribute('contenteditable', 'true');
        target.setAttribute('spellcheck', 'false');
        target.focus();
        target.addEventListener('input', () => {
          registerChange();
          syncElementToData(target);
        }, { once: false });
        target.addEventListener('blur', () => {
          syncElementToData(target);
        });
      }
    }
  });

  // Sync edited DOM text back into PORTFOLIO_DATA object
  function syncElementToData(el, isBlur = false) {
    if (typeof PORTFOLIO_DATA === 'undefined') return;
    const lang = getActiveLang();
    const dict = PORTFOLIO_DATA[lang];
    if (!dict) return;

    const textVal = el.innerText.trim();
    const key = el.getAttribute('data-i18n');

    // 1. Direct data-i18n binding
    if (key) {
      const keys = key.split('.');
      let target = dict;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = textVal;
      return;
    }

    // 2. Stats strip items
    const statItem = el.closest('.stat-item');
    if (statItem && dict.hero && dict.hero.stats) {
      const statsStrip = document.getElementById('stats-strip');
      if (statsStrip) {
        const index = Array.from(statsStrip.querySelectorAll('.stat-item')).indexOf(statItem);
        if (index !== -1 && dict.hero.stats[index]) {
          if (el.classList.contains('stat-label')) {
            dict.hero.stats[index].label = textVal;
          } else if (el.classList.contains('counter')) {
            const numVal = parseInt(textVal.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(numVal)) dict.hero.stats[index].value = numVal;
          }
          return;
        }
      }
    }

    // 3. About Core Values
    const valCard = el.closest('.value-card');
    if (valCard && dict.about && dict.about.coreValues) {
      const aboutValues = document.getElementById('about-values');
      if (aboutValues) {
        const index = Array.from(aboutValues.querySelectorAll('.value-card')).indexOf(valCard);
        if (index !== -1 && dict.about.coreValues[index]) {
          if (el.tagName === 'H3') dict.about.coreValues[index].title = textVal;
          if (el.tagName === 'P') dict.about.coreValues[index].desc = textVal;
          return;
        }
      }
    }

    // 4. Services
    const srvCard = el.closest('.service-card');
    if (srvCard && dict.services && dict.services.items) {
      const servicesGrid = document.getElementById('services-grid');
      if (servicesGrid) {
        const index = Array.from(servicesGrid.querySelectorAll('.service-card')).indexOf(srvCard);
        if (index !== -1 && dict.services.items[index]) {
          if (el.classList.contains('service-title')) dict.services.items[index].title = textVal;
          if (el.classList.contains('service-desc')) dict.services.items[index].desc = textVal;
          if (el.closest('.deliverable-item')) {
            const delivItem = el.closest('.deliverable-item');
            const dIndex = Array.from(srvCard.querySelectorAll('.deliverable-item')).indexOf(delivItem);
            if (dIndex !== -1 && dict.services.items[index].deliverables[dIndex] !== undefined) {
              if (textVal === '') {
                if (isBlur) {
                  dict.services.items[index].deliverables.splice(dIndex, 1);
                  delivItem.remove();
                  registerChange();
                  showToast('Đã xóa dòng nội dung rỗng');
                }
                return;
              } else {
                dict.services.items[index].deliverables[dIndex] = textVal;
              }
            }
          }
          return;
        }
      }
    }

    // 5. Projects (Card on Homepage)
    const projCard = el.closest('.project-card');
    if (projCard && dict.projects && dict.projects.list) {
      const projId = projCard.getAttribute('data-id');
      const proj = dict.projects.list.find(p => p.id === projId);
      if (proj) {
        if (el.classList.contains('project-title')) proj.title = textVal;
        if (el.classList.contains('project-hero-metric')) proj.heroMetric = textVal;
        if (el.classList.contains('project-highlight') || el.classList.contains('project-desc')) {
          proj.highlight = textVal;
          proj.desc = textVal;
          proj.shortDesc = textVal;
        }
        if (el.classList.contains('project-client')) proj.client = textVal;
        if (el.classList.contains('project-category')) {
          const normVal = textVal.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (normVal.includes('campaign')) proj.category = 'campaign';
          else if (normVal.includes('content') || normVal.includes('video') || normVal.includes('media')) proj.category = 'content';
          else if (normVal.includes('growth') || normVal.includes('brand')) proj.category = 'growth';
          else if (normVal.includes('performance') || normVal.includes('ads')) proj.category = 'performance';
          else proj.category = textVal;
        }
        if (el.classList.contains('project-tag')) {
          const tagEls = Array.from(projCard.querySelectorAll('.project-tag'));
          const tIdx = tagEls.indexOf(el);
          if (tIdx !== -1 && proj.tags && proj.tags[tIdx] !== undefined) {
            proj.tags[tIdx] = textVal.replace(/^#/, '');
          }
        }
        return;
      }
    }

    // 5b. Projects (Case Study Detail Modal)
    const caseModal = el.closest('#case-study-modal');
    if (caseModal && dict.projects && dict.projects.list) {
      if (!caseModal.classList.contains('open')) return;
      const projId = caseModal.getAttribute('data-current-project-id') ||
                     (window.portfolioGetCurrentOpenProjectId && window.portfolioGetCurrentOpenProjectId());
      const proj = dict.projects.list.find(p => p.id === projId);
      if (proj) {
        if (el.id === 'modal-title' || el.classList.contains('modal-title')) {
          proj.title = textVal;
          const cardTitle = document.querySelector(`.project-card[data-id="${projId}"] .project-title`);
          if (cardTitle) cardTitle.innerText = textVal;
        } else if (el.id === 'modal-hero-metric' || el.classList.contains('project-hero-metric')) {
          proj.heroMetric = textVal;
          const cardMetric = document.querySelector(`.project-card[data-id="${projId}"] .project-hero-metric`);
          if (cardMetric) cardMetric.innerHTML = `<i class="ri-pulse-line"></i> ${textVal}`;
        } else if (el.id === 'modal-category') {
          const normVal = textVal.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (normVal.includes('campaign')) proj.category = 'campaign';
          else if (normVal.includes('content') || normVal.includes('video') || normVal.includes('media')) proj.category = 'content';
          else if (normVal.includes('growth') || normVal.includes('brand')) proj.category = 'growth';
          else if (normVal.includes('performance') || normVal.includes('ads')) proj.category = 'performance';
          else proj.category = textVal;
          const cardCat = document.querySelector(`.project-card[data-id="${projId}"] .project-category`);
          if (cardCat) cardCat.innerText = textVal;
        } else if (el.id === 'modal-objective') {
          proj.objective = textVal;
        } else if (el.closest('.modal-metric-card')) {
          const mCard = el.closest('.modal-metric-card');
          const mGrid = document.getElementById('modal-metrics-grid');
          if (mGrid && proj.results) {
            const mIdx = Array.from(mGrid.querySelectorAll('.modal-metric-card')).indexOf(mCard);
            if (mIdx !== -1 && proj.results[mIdx]) {
              if (el.classList.contains('modal-metric-val')) {
                proj.results[mIdx].val = textVal;
              } else if (el.classList.contains('modal-metric-lbl')) {
                proj.results[mIdx].label = textVal;
              }
            }
          }
        } else if (el.closest('.modal-strategy-list')) {
          const sList = document.getElementById('modal-strategy-list');
          if (sList && proj.strategy) {
            const li = el.closest('li');
            const sIdx = Array.from(sList.querySelectorAll('li')).indexOf(li);
            if (sIdx !== -1 && proj.strategy[sIdx] !== undefined) {
              if (textVal === '') {
                if (isBlur) {
                  proj.strategy.splice(sIdx, 1);
                  li.remove();
                  registerChange();
                  showToast('Đã xóa dòng chiến lược rỗng');
                }
                return;
              } else {
                proj.strategy[sIdx] = textVal;
              }
            }
          }
        } else if (el.closest('#modal-tags-row')) {
          const tRow = document.getElementById('modal-tags-row');
          if (tRow && proj.tags) {
            const tIdx = Array.from(tRow.querySelectorAll('.project-tag')).indexOf(el);
            if (tIdx !== -1 && proj.tags[tIdx] !== undefined) {
              proj.tags[tIdx] = textVal.replace(/^#/, '');
            }
          }
        }
        return;
      }
    }

    // 6. Skills
    const skillCard = el.closest('.skill-category-card');
    if (skillCard && dict.skills && dict.skills.groups) {
      const skillsGrid = document.getElementById('skills-grid');
      if (skillsGrid) {
        const groupIndex = Array.from(skillsGrid.querySelectorAll('.skill-category-card')).indexOf(skillCard);
        if (groupIndex !== -1 && dict.skills.groups[groupIndex]) {
          const group = dict.skills.groups[groupIndex];
          if (el.classList.contains('skill-cat-title')) {
            group.title = textVal;
          } else if (el.classList.contains('skill-name')) {
            const skillIndex = Array.from(skillCard.querySelectorAll('.skill-name')).indexOf(el);
            if (skillIndex !== -1 && group.skills[skillIndex]) {
              group.skills[skillIndex].name = textVal;
            }
          }
          return;
        }
      }
    }

    // 7. Journey / Timeline
    const timeItem = el.closest('.timeline-item');
    if (timeItem && dict.journey && dict.journey.timeline) {
      const journeyTimeline = document.getElementById('journey-timeline');
      if (journeyTimeline) {
        const index = Array.from(journeyTimeline.querySelectorAll('.timeline-item')).indexOf(timeItem);
        if (index !== -1 && dict.journey.timeline[index]) {
          if (el.classList.contains('timeline-year')) dict.journey.timeline[index].year = textVal;
          if (el.classList.contains('timeline-role')) dict.journey.timeline[index].role = textVal;
          if (el.classList.contains('timeline-company')) dict.journey.timeline[index].company = textVal;
          if (el.classList.contains('timeline-desc')) dict.journey.timeline[index].desc = textVal;
          return;
        }
      }
    }
  }

  // ==================== IMAGE CROPPER & DISPLAY AREA ADJUSTER ====================

  // Open Image Cropper Modal for either newly picked file or existing image
  function openCropperModal({ imageSrc, targetType, id, index, imgEl, filename }) {
    activeImageTarget = { type: targetType, id, index, imgEl, filename };

    const modal = document.getElementById('image-cropper-modal');
    const imageEl = document.getElementById('cropper-active-image');
    const titleEl = document.getElementById('cropper-title');
    const previewBox = document.getElementById('cropper-preview-box');
    const previewCaption = document.getElementById('cropper-preview-caption');
    const zoomSlider = document.getElementById('cropper-zoom-slider');
    const zoomVal = document.getElementById('cropper-zoom-val');

    if (!modal || !imageEl) return;

    cropperScaleX = 1;
    cropperScaleY = 1;

    let defaultRatio = 1;
    if (targetType === 'avatar') {
      defaultRatio = 1;
      if (titleEl) titleEl.textContent = 'Căn Chỉnh Vùng Ảnh Chân Dung (1:1)';
      if (previewCaption) previewCaption.textContent = 'Khung hiển thị Avatar thực tế';
      if (previewBox) {
        previewBox.className = 'cropper-preview-box';
      }
    } else if (targetType === 'project') {
      defaultRatio = 16 / 9;
      if (titleEl) titleEl.textContent = 'Căn Chỉnh Vùng Ảnh Bìa Chiến Dịch (16:9)';
      if (previewCaption) previewCaption.textContent = 'Khung hiển thị Thẻ Dự Án thực tế';
      if (previewBox) {
        previewBox.className = 'cropper-preview-box ratio-16-9';
      }
    }

    // Highlight corresponding ratio button
    document.querySelectorAll('.cropper-ratio-btn').forEach(btn => {
      const r = parseFloat(btn.getAttribute('data-ratio'));
      if (Math.abs(r - defaultRatio) < 0.05) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (activeCropperInstance) {
      activeCropperInstance.destroy();
      activeCropperInstance = null;
    }

    // Set new image source
    imageEl.src = imageSrc;

    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    const startCropper = () => {
      if (typeof Cropper === 'undefined') {
        console.warn('[Cropper] Cropper.js library not available.');
        showToast('Chưa nạp được thư viện căn chỉnh ảnh, vui lòng thử lại!', true);
        return;
      }

      activeCropperInstance = new Cropper(imageEl, {
        aspectRatio: defaultRatio,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.95,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        preview: '#cropper-live-preview',
        ready() {
          if (zoomSlider) {
            zoomSlider.value = 1;
            if (zoomVal) zoomVal.textContent = '100%';
          }
        },
        zoom(e) {
          if (e.detail && e.detail.ratio && zoomSlider) {
            const clamped = Math.min(Math.max(e.detail.ratio, 0.2), 3);
            zoomSlider.value = clamped.toFixed(2);
            if (zoomVal) zoomVal.textContent = Math.round(clamped * 100) + '%';
          }
        }
      });
    };

    if (imageEl.complete && imageEl.naturalWidth > 0) {
      startCropper();
    } else {
      imageEl.onload = () => {
        startCropper();
        imageEl.onload = null;
      };
    }
  }

  // Close Cropper Modal
  function closeCropperModal() {
    const modal = document.getElementById('image-cropper-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
    if (activeCropperInstance) {
      activeCropperInstance.destroy();
      activeCropperInstance = null;
    }
  }

  // Setup Event Listeners for Cropper Modal
  function setupCropperModalEvents() {
    const modal = document.getElementById('image-cropper-modal');
    const closeBtn = document.getElementById('cropper-close-btn');
    const cancelBtn = document.getElementById('cropper-cancel-btn');
    const applyBtn = document.getElementById('cropper-apply-btn');
    const changeFileBtn = document.getElementById('cropper-change-file-btn');
    const zoomSlider = document.getElementById('cropper-zoom-slider');
    const zoomVal = document.getElementById('cropper-zoom-val');
    const zoomInBtn = document.getElementById('cropper-zoom-in-btn');
    const zoomOutBtn = document.getElementById('cropper-zoom-out-btn');
    const rotLeftBtn = document.getElementById('cropper-rot-left-btn');
    const rotRightBtn = document.getElementById('cropper-rot-right-btn');
    const flipXBtn = document.getElementById('cropper-flip-x-btn');
    const resetBtn = document.getElementById('cropper-reset-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeCropperModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeCropperModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCropperModal();
      });
    }

    if (changeFileBtn) {
      changeFileBtn.addEventListener('click', () => {
        const fileInput = document.getElementById('editor-hidden-file-input');
        if (fileInput) {
          fileInput.value = '';
          fileInput.click();
        }
      });
    }

    // Ratio Switchers
    document.querySelectorAll('.cropper-ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!activeCropperInstance) return;
        document.querySelectorAll('.cropper-ratio-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const raw = btn.getAttribute('data-ratio');
        const ratio = raw === 'NaN' ? NaN : parseFloat(raw);
        activeCropperInstance.setAspectRatio(ratio);

        const previewBox = document.getElementById('cropper-preview-box');
        if (previewBox) {
          previewBox.className = 'cropper-preview-box';
          if (!isNaN(ratio)) {
            if (Math.abs(ratio - (16 / 9)) < 0.05) {
              previewBox.classList.add('ratio-16-9');
            } else if (Math.abs(ratio - (4 / 3)) < 0.05) {
              previewBox.classList.add('ratio-4-3');
            }
          }
        }
      });
    });

    // Zoom Slider
    if (zoomSlider) {
      zoomSlider.addEventListener('input', () => {
        if (!activeCropperInstance) return;
        const val = parseFloat(zoomSlider.value);
        activeCropperInstance.zoomTo(val);
        if (zoomVal) zoomVal.textContent = Math.round(val * 100) + '%';
      });
    }

    // Zoom Buttons
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (activeCropperInstance) activeCropperInstance.zoom(0.1);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (activeCropperInstance) activeCropperInstance.zoom(-0.1);
      });
    }

    // Rotate & Flip
    if (rotLeftBtn) {
      rotLeftBtn.addEventListener('click', () => {
        if (activeCropperInstance) activeCropperInstance.rotate(-90);
      });
    }
    if (rotRightBtn) {
      rotRightBtn.addEventListener('click', () => {
        if (activeCropperInstance) activeCropperInstance.rotate(90);
      });
    }
    if (flipXBtn) {
      flipXBtn.addEventListener('click', () => {
        if (activeCropperInstance) {
          cropperScaleX = -cropperScaleX;
          activeCropperInstance.scaleX(cropperScaleX);
        }
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (activeCropperInstance) {
          activeCropperInstance.reset();
          cropperScaleX = 1;
          cropperScaleY = 1;
          if (zoomSlider) zoomSlider.value = 1;
          if (zoomVal) zoomVal.textContent = '100%';
        }
      });
    }

    // Apply Button
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        if (!activeCropperInstance || !activeImageTarget) return;

        const isAvatar = activeImageTarget.type === 'avatar';
        const canvas = activeCropperInstance.getCroppedCanvas({
          maxWidth: isAvatar ? 1200 : 2048,
          maxHeight: isAvatar ? 1200 : 2048,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        });

        if (!canvas) {
          showToast('Không thể xuất ảnh đã cắt, vui lòng thử lại!', true);
          return;
        }

        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

        // Immediate visual preview in DOM
        if (activeImageTarget.imgEl) {
          activeImageTarget.imgEl.src = croppedDataUrl;
        }

        // Also update matching card or modal image if target is project
        if (activeImageTarget.type === 'project' && activeImageTarget.id) {
          const matchingCardImg = document.querySelector(`.project-card[data-id="${activeImageTarget.id}"] .project-media img`);
          if (matchingCardImg) matchingCardImg.src = croppedDataUrl;
          const matchingModalImg = document.getElementById('modal-img');
          const modalEl = document.getElementById('case-study-modal');
          if (matchingModalImg && modalEl && modalEl.getAttribute('data-current-project-id') === activeImageTarget.id) {
            matchingModalImg.src = croppedDataUrl;
          }
        }

        // Safe filename for backend
        const rawName = (activeImageTarget.filename || `${activeImageTarget.type}_cropped`).replace(/\.[^/.]+$/, "");
        const finalFilename = `${rawName}_cropped.jpg`;

        // Filter out duplicate pending for this target
        pendingImageUploads = pendingImageUploads.filter(item => {
          if (item.targetType !== activeImageTarget.type) return true;
          if (item.targetType === 'avatar') return false;
          if (item.targetType === 'project') return item.id !== activeImageTarget.id && item.index !== activeImageTarget.index;
          return true;
        });

        pendingImageUploads.push({
          targetType: activeImageTarget.type,
          id: activeImageTarget.id,
          index: activeImageTarget.index,
          filename: finalFilename,
          dataUrl: croppedDataUrl
        });

        registerChange();
        closeCropperModal();
        showToast('✓ Đã điều chỉnh vùng hiển thị ảnh! Bấm "LƯU THAY ĐỔI" để lưu vĩnh viễn.');
      });
    }
  }

  // Enable inline image overlays on avatar and project media
  function enableInlineImageEditing() {
    if (!isEditMode) return;

    // 1. Avatar Image Buttons (Change & Adjust)
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    if (avatarWrapper && !avatarWrapper.querySelector('.editor-img-actions-wrap')) {
      const oldBtn = avatarWrapper.querySelector('.editor-img-btn');
      if (oldBtn) oldBtn.remove();

      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'editor-img-actions-wrap';

      const uploadBtn = document.createElement('button');
      uploadBtn.type = 'button';
      uploadBtn.className = 'editor-img-btn';
      uploadBtn.innerHTML = '<i class="ri-camera-lens-line"></i><span>Đổi ảnh mới</span>';
      uploadBtn.title = 'Tải ảnh chân dung mới từ máy tính';
      uploadBtn.onclick = (e) => {
        e.stopPropagation();
        triggerImageUpload({ type: 'avatar', imgEl: avatarWrapper.querySelector('img') });
      };

      const adjustBtn = document.createElement('button');
      adjustBtn.type = 'button';
      adjustBtn.className = 'editor-img-btn editor-img-btn-adjust';
      adjustBtn.innerHTML = '<i class="ri-crop-2-line"></i><span>Căn chỉnh vùng</span>';
      adjustBtn.title = 'Mở studio căn chỉnh góc hiển thị ảnh chân dung này';
      adjustBtn.onclick = (e) => {
        e.stopPropagation();
        const avatarImg = avatarWrapper.querySelector('img');
        if (avatarImg) {
          openCropperModal({
            imageSrc: avatarImg.src,
            targetType: 'avatar',
            imgEl: avatarImg,
            filename: 'viet-avatar.jpg'
          });
        }
      };

      actionsWrap.appendChild(uploadBtn);
      actionsWrap.appendChild(adjustBtn);
      avatarWrapper.appendChild(actionsWrap);
    }

    // 2. Project Media Buttons (Change & Adjust)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, idx) => {
      const media = card.querySelector('.project-media');
      if (media && !media.querySelector('.editor-img-actions-wrap')) {
        const oldBtn = media.querySelector('.editor-img-btn');
        if (oldBtn) oldBtn.remove();

        const actionsWrap = document.createElement('div');
        actionsWrap.className = 'editor-img-actions-wrap';

        const projId = card.getAttribute('data-id');
        const projImg = media.querySelector('img');

        const uploadBtn = document.createElement('button');
        uploadBtn.type = 'button';
        uploadBtn.className = 'editor-img-btn';
        uploadBtn.innerHTML = '<i class="ri-image-add-line"></i><span>Đổi ảnh</span>';
        uploadBtn.title = 'Tải ảnh chiến dịch mới từ máy tính';
        uploadBtn.onclick = (e) => {
          e.stopPropagation();
          triggerImageUpload({ type: 'project', id: projId, index: idx, imgEl: projImg });
        };

        const adjustBtn = document.createElement('button');
        adjustBtn.type = 'button';
        adjustBtn.className = 'editor-img-btn editor-img-btn-adjust';
        adjustBtn.innerHTML = '<i class="ri-crop-2-line"></i><span>Căn chỉnh</span>';
        adjustBtn.title = 'Căn chỉnh góc hiển thị, phóng to/thu nhỏ ảnh dự án này';
        adjustBtn.onclick = (e) => {
          e.stopPropagation();
          if (projImg) {
            openCropperModal({
              imageSrc: projImg.src,
              targetType: 'project',
              id: projId,
              index: idx,
              imgEl: projImg,
              filename: `project_${projId || idx}.jpg`
            });
          }
        };

        actionsWrap.appendChild(uploadBtn);
        actionsWrap.appendChild(adjustBtn);
        media.appendChild(actionsWrap);
      }
    });

    // 3. Case Study Modal Media Buttons (Change & Adjust)
    const modalImgBox = document.querySelector('.modal-image-box');
    if (modalImgBox && !modalImgBox.querySelector('.editor-img-actions-wrap')) {
      const oldBtn = modalImgBox.querySelector('.editor-img-btn');
      if (oldBtn) oldBtn.remove();

      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'editor-img-actions-wrap';

      const modalImg = modalImgBox.querySelector('img');

      const uploadBtn = document.createElement('button');
      uploadBtn.type = 'button';
      uploadBtn.className = 'editor-img-btn';
      uploadBtn.innerHTML = '<i class="ri-image-add-line"></i><span>Đổi ảnh</span>';
      uploadBtn.title = 'Tải ảnh mới từ máy tính cho dự án này';
      uploadBtn.onclick = (e) => {
        e.stopPropagation();
        const currentModal = document.getElementById('case-study-modal');
        const projId = (currentModal && currentModal.getAttribute('data-current-project-id')) ||
                       (window.portfolioGetCurrentOpenProjectId && window.portfolioGetCurrentOpenProjectId());
        triggerImageUpload({ type: 'project', id: projId, imgEl: modalImg });
      };

      const adjustBtn = document.createElement('button');
      adjustBtn.type = 'button';
      adjustBtn.className = 'editor-img-btn editor-img-btn-adjust';
      adjustBtn.innerHTML = '<i class="ri-crop-2-line"></i><span>Căn chỉnh</span>';
      adjustBtn.title = 'Căn chỉnh góc hiển thị ảnh dự án này';
      adjustBtn.onclick = (e) => {
        e.stopPropagation();
        const currentModal = document.getElementById('case-study-modal');
        const projId = (currentModal && currentModal.getAttribute('data-current-project-id')) ||
                       (window.portfolioGetCurrentOpenProjectId && window.portfolioGetCurrentOpenProjectId());
        if (modalImg && modalImg.src) {
          openCropperModal({
            imageSrc: modalImg.src,
            targetType: 'project',
            id: projId,
            imgEl: modalImg,
            filename: `project_${projId || 'modal'}.jpg`
          });
        }
      };

      actionsWrap.appendChild(uploadBtn);
      actionsWrap.appendChild(adjustBtn);
      modalImgBox.appendChild(actionsWrap);
    }
  }

  // Disable image overlays
  function disableInlineImageEditing() {
    document.querySelectorAll('.editor-img-actions-wrap, .editor-img-btn').forEach(btn => btn.remove());
  }

  // Setup interactive item deletion and addition for deliverables, strategies, and cards
  function setupListAndCardControls() {
    if (!isEditMode) return;
    const lang = getActiveLang();
    const dict = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA[lang]) ? PORTFOLIO_DATA[lang] : null;
    if (!dict) return;

    // 1. Deliverables in Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, cardIdx) => {
      const container = card.querySelector('.service-deliverables');
      if (!container) return;

      // Add Deliverable Button
      if (!container.querySelector('.editor-add-item-btn')) {
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'editor-add-item-btn';
        addBtn.innerHTML = '<i class="ri-add-line"></i><span>Thêm gạch đầu dòng</span>';
        addBtn.title = 'Thêm một dòng năng lực mới vào danh sách này';
        addBtn.onclick = (e) => {
          e.stopPropagation();
          const defaultText = 'Năng lực cốt lõi mới';
          if (dict.services && dict.services.items && dict.services.items[cardIdx]) {
            if (!dict.services.items[cardIdx].deliverables) dict.services.items[cardIdx].deliverables = [];
            dict.services.items[cardIdx].deliverables.push(defaultText);
          }
          const newItem = document.createElement('div');
          newItem.className = 'deliverable-item';
          newItem.innerHTML = `
            <i class="ri-check-double-line"></i>
            <span contenteditable="true" spellcheck="false" title="Nhấp để chỉnh sửa nội dung này">${defaultText}</span>
          `;
          container.insertBefore(newItem, addBtn);
          setupListAndCardControls();
          enableInlineTextEditing();
          registerChange();

          const span = newItem.querySelector('span');
          if (span) {
            span.focus();
            const range = document.createRange();
            range.selectNodeContents(span);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
          showToast('Đã thêm dòng mới. Bạn có thể gõ nội dung ngay.');
        };
        container.appendChild(addBtn);
      }

      // Delete Button for each Deliverable Item
      const items = container.querySelectorAll('.deliverable-item');
      items.forEach((item) => {
        if (!item.querySelector('.editor-item-del-btn')) {
          const delBtn = document.createElement('button');
          delBtn.type = 'button';
          delBtn.className = 'editor-item-del-btn';
          delBtn.title = 'Xóa dòng gạch đầu dòng này';
          delBtn.innerHTML = '<i class="ri-close-line"></i>';
          delBtn.onclick = (e) => {
            e.stopPropagation();
            if (dict.services && dict.services.items && dict.services.items[cardIdx] && dict.services.items[cardIdx].deliverables) {
              const currentIdx = Array.from(container.querySelectorAll('.deliverable-item')).indexOf(item);
              if (currentIdx !== -1) {
                dict.services.items[cardIdx].deliverables.splice(currentIdx, 1);
              }
            }
            item.remove();
            registerChange();
            showToast('Đã xóa dòng gạch đầu dòng.');
          };
          item.appendChild(delBtn);
        }
      });

      // Delete entire Service Card Button
      if (!card.querySelector('.editor-card-del-btn')) {
        const delCardBtn = document.createElement('button');
        delCardBtn.type = 'button';
        delCardBtn.className = 'editor-card-del-btn';
        delCardBtn.title = 'Xóa toàn bộ mục năng lực này';
        delCardBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
        delCardBtn.onclick = (e) => {
          e.stopPropagation();
          if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ mục năng lực/dịch vụ này?')) return;
          if (dict.services && dict.services.items) {
            const currentCardIdx = Array.from(document.querySelectorAll('#services-grid .service-card')).indexOf(card);
            if (currentCardIdx !== -1) dict.services.items.splice(currentCardIdx, 1);
          }
          if (window.portfolioRenderAll) window.portfolioRenderAll();
          else card.remove();
          registerChange();
          showToast('Đã xóa mục năng lực.');
        };
        card.appendChild(delCardBtn);
      }
    });

    // Add Service Card Button below services-grid
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid && servicesGrid.parentNode && !servicesGrid.parentNode.querySelector('.services-add-card-wrapper')) {
      const wrap = document.createElement('div');
      wrap.className = 'editor-add-card-wrapper services-add-card-wrapper';
      const addCardBtn = document.createElement('button');
      addCardBtn.type = 'button';
      addCardBtn.className = 'editor-add-card-btn';
      addCardBtn.innerHTML = '<i class="ri-add-circle-line"></i><span>Thêm Năng Lực / Dịch Vụ Mới</span>';
      addCardBtn.onclick = (e) => {
        e.stopPropagation();
        if (dict.services && dict.services.items) {
          dict.services.items.push({
            id: 'service-' + Date.now(),
            icon: 'ri-rocket-2-line',
            title: 'Tên Năng Lực Mới',
            desc: 'Mô tả ngắn gọn về giải pháp và chiến lược mang lại giá trị.',
            deliverables: [
              'Hạng mục triển khai thứ nhất',
              'Hạng mục triển khai thứ hai'
            ]
          });
          if (window.portfolioRenderAll) window.portfolioRenderAll();
          registerChange();
          showToast('Đã thêm mục năng lực mới. Hãy nhấp để sửa nội dung.');
        }
      };
      wrap.appendChild(addCardBtn);
      servicesGrid.parentNode.insertBefore(wrap, servicesGrid.nextSibling);
    }

    // 2. Project Cards in Projects Grid
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      if (!card.querySelector('.editor-card-del-btn')) {
        const delProjBtn = document.createElement('button');
        delProjBtn.type = 'button';
        delProjBtn.className = 'editor-card-del-btn';
        delProjBtn.title = 'Xóa toàn bộ dự án này';
        delProjBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
        delProjBtn.onclick = (e) => {
          e.stopPropagation();
          const projId = card.getAttribute('data-id');
          if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ dự án này khỏi danh sách?')) return;
          if (dict.projects && dict.projects.list) {
            const pIdx = dict.projects.list.findIndex(p => p.id === projId);
            if (pIdx !== -1) dict.projects.list.splice(pIdx, 1);
          }
          if (window.portfolioRenderAll) window.portfolioRenderAll();
          else card.remove();
          registerChange();
          showToast('Đã xóa dự án.');
        };
        card.appendChild(delProjBtn);
      }
    });

    // Add Project Card Button below projects-grid
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && projectsGrid.parentNode && !projectsGrid.parentNode.querySelector('.projects-add-card-wrapper')) {
      const wrap = document.createElement('div');
      wrap.className = 'editor-add-card-wrapper projects-add-card-wrapper';
      const addProjBtn = document.createElement('button');
      addProjBtn.type = 'button';
      addProjBtn.className = 'editor-add-card-btn';
      addProjBtn.innerHTML = '<i class="ri-add-circle-line"></i><span>Thêm Dự Án Mới</span>';
      addProjBtn.onclick = (e) => {
        e.stopPropagation();
        if (dict.projects && dict.projects.list) {
          const newId = 'project-' + Date.now();
          dict.projects.list.push({
            id: newId,
            category: 'campaign',
            title: 'Tên Dự Án / Chiến Dịch Mới',
            client: 'Khách hàng / Đối tác',
            image: 'assets/images/campaign-tech.jpg',
            heroMetric: '+100% Growth | High ROI',
            highlight: 'Mô tả kết quả và điểm nổi bật nhất của chiến dịch này.',
            desc: 'Mô tả kết quả và điểm nổi bật nhất của chiến dịch này.',
            shortDesc: 'Mô tả kết quả và điểm nổi bật nhất của chiến dịch này.',
            objective: 'Mục tiêu chiến dịch và bài toán tăng trưởng cần giải quyết.',
            strategy: [
              'Giải pháp chiến lược bước 1',
              'Giải pháp chiến lược bước 2'
            ],
            results: [
              { label: 'Chỉ số đo lường 1', val: '+200%' },
              { label: 'Chỉ số đo lường 2', val: '50K+' }
            ],
            tags: ['Digital Campaign', 'Growth']
          });
          if (window.portfolioRenderAll) window.portfolioRenderAll();
          registerChange();
          showToast('Đã thêm dự án mới. Hãy nhấp để sửa ảnh và nội dung.');
        }
      };
      wrap.appendChild(addProjBtn);
      projectsGrid.parentNode.insertBefore(wrap, projectsGrid.nextSibling);
    }

    // 3. Strategy in Case Study Modal
    const stratList = document.getElementById('modal-strategy-list');
    const caseModal = document.getElementById('case-study-modal');
    if (stratList && caseModal && caseModal.classList.contains('open')) {
      if (!stratList.querySelector('.editor-add-item-btn')) {
        const addStratBtn = document.createElement('button');
        addStratBtn.type = 'button';
        addStratBtn.className = 'editor-add-item-btn';
        addStratBtn.innerHTML = '<i class="ri-add-line"></i><span>Thêm giải pháp chiến lược</span>';
        addStratBtn.onclick = (e) => {
          e.stopPropagation();
          const projId = caseModal.getAttribute('data-current-project-id');
          const defaultText = 'Giải pháp chiến lược mới';
          if (projId && dict.projects && dict.projects.list) {
            const proj = dict.projects.list.find(p => p.id === projId);
            if (proj) {
              if (!proj.strategy) proj.strategy = [];
              proj.strategy.push(defaultText);
            }
          }
          const newLi = document.createElement('li');
          newLi.setAttribute('contenteditable', 'true');
          newLi.setAttribute('spellcheck', 'false');
          newLi.textContent = defaultText;
          stratList.insertBefore(newLi, addStratBtn);
          setupListAndCardControls();
          enableInlineTextEditing();
          registerChange();
          newLi.focus();
          showToast('Đã thêm chiến lược mới.');
        };
        stratList.appendChild(addStratBtn);
      }

      stratList.querySelectorAll('li').forEach((li) => {
        if (!li.querySelector('.editor-item-del-btn')) {
          const delStratBtn = document.createElement('button');
          delStratBtn.type = 'button';
          delStratBtn.className = 'editor-item-del-btn';
          delStratBtn.title = 'Xóa dòng chiến lược này';
          delStratBtn.innerHTML = '<i class="ri-close-line"></i>';
          delStratBtn.onclick = (e) => {
            e.stopPropagation();
            const projId = caseModal.getAttribute('data-current-project-id');
            if (projId && dict.projects && dict.projects.list) {
              const proj = dict.projects.list.find(p => p.id === projId);
              if (proj && proj.strategy) {
                const sIdx = Array.from(stratList.querySelectorAll('li')).indexOf(li);
                if (sIdx !== -1) proj.strategy.splice(sIdx, 1);
              }
            }
            li.remove();
            registerChange();
            showToast('Đã xóa chiến lược.');
          };
          li.appendChild(delStratBtn);
        }
      });
    }
  }

  function disableListAndCardControls() {
    document.querySelectorAll('.editor-item-del-btn, .editor-add-item-btn, .editor-card-del-btn, .editor-add-card-wrapper').forEach(el => el.remove());
  }

  // Trigger file selection for an image target
  function triggerImageUpload(target) {
    activeImageTarget = target;
    const fileInput = document.getElementById('editor-hidden-file-input');
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  }

  // Setup UI event listeners for the Floating Toolbar
  function setupToolbarEvents(fileInput) {
    const capsule = document.getElementById('editor-bar-capsule');
    const collapsed = document.getElementById('editor-bar-collapsed');
    const minimizeBtn = document.getElementById('editor-minimize-btn');
    const toolbar = document.getElementById('live-editor-toolbar');
    const previewBtn = document.getElementById('editor-preview-btn');
    const resetBtn = document.getElementById('editor-reset-btn');
    const saveBtn = document.getElementById('editor-save-btn');
    const avatarBtn = document.getElementById('editor-avatar-btn');
    const langViBtn = document.getElementById('editor-lang-vi');
    const langEnBtn = document.getElementById('editor-lang-en');
    const statusBox = document.getElementById('editor-status-indicator');

    // Minimize / Close Edit Mode
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        setEditMode(false);
        showToast('Đã đóng thanh công cụ và tắt chế độ sửa.');
      });
    }

    const closeEditBtn = document.getElementById('editor-close-edit-btn');
    if (closeEditBtn) {
      closeEditBtn.addEventListener('click', () => {
        setEditMode(false);
        showToast('Đã TẮT Chế Độ Sửa (Chuyển sang chế độ xem bình thường).');
      });
    }

    if (collapsed) {
      collapsed.addEventListener('click', () => {
        setEditMode(true);
        showToast('Đã BẬT Chế Độ Sửa trực tiếp. Bạn có thể nhấp vào chữ hoặc ảnh để sửa.');
      });
    }

    // Toggle Edit / Preview Mode
    if (statusBox) {
      statusBox.addEventListener('click', () => {
        setEditMode(!isEditMode, true);
      });
    }
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        if (isEditMode) {
          setEditMode(false, true);
          showToast('Chế độ xem trước (đã ẩn các khung viền chỉnh sửa)');
        } else {
          setEditMode(true);
          showToast('Đã tiếp tục chế độ chỉnh sửa');
        }
      });
    }

    // Change Avatar button in toolbar -> opens cropper directly or triggers upload
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        const avatarImg = document.querySelector('.avatar-wrapper img');
        if (avatarImg && avatarImg.src) {
          openCropperModal({
            imageSrc: avatarImg.src,
            targetType: 'avatar',
            imgEl: avatarImg,
            filename: 'viet-avatar.jpg'
          });
        } else {
          triggerImageUpload({ type: 'avatar', imgEl: avatarImg });
        }
      });
    }

    // Theme toggle button in toolbar
    const editorThemeBtn = document.getElementById('editor-theme-btn');
    if (editorThemeBtn) {
      editorThemeBtn.addEventListener('click', () => {
        if (window.portfolioToggleTheme) {
          window.portfolioToggleTheme();
        }
      });
    }

    // Language switcher buttons in toolbar
    function switchLanguage(lang) {
      if (window.portfolioSetLanguage) {
        window.portfolioSetLanguage(lang);
      } else {
        localStorage.setItem('viet_portfolio_lang', lang);
        window.location.reload();
      }

      if (langViBtn) langViBtn.classList.toggle('active', lang === 'vi');
      if (langEnBtn) langEnBtn.classList.toggle('active', lang === 'en');

      setTimeout(() => {
        if (isEditMode) {
          enableInlineTextEditing();
          enableInlineImageEditing();
        } else {
          disableInlineTextEditing();
          disableInlineImageEditing();
        }
        showToast(`Đang hiển thị phiên bản: ${lang.toUpperCase()}`);
      }, 100);
    }

    if (langViBtn) langViBtn.addEventListener('click', () => switchLanguage('vi'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => switchLanguage('en'));

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn hoàn tác các thay đổi chưa lưu và khôi phục nội dung ban đầu?')) {
          localStorage.removeItem('portfolio_custom_data');
          window.location.reload();
        }
      });
    }

    // Save button
    if (saveBtn) {
      saveBtn.addEventListener('click', handleSaveChanges);
    }

    // Image file selection handler: Opens Cropper Modal on image load
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !activeImageTarget) return;

      if (!file.type.startsWith('image/')) {
        showToast('Vui lòng chọn tệp định dạng hình ảnh (PNG, JPG, WebP)!', true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const dataUrl = readEvent.target.result;
        openCropperModal({
          imageSrc: dataUrl,
          targetType: activeImageTarget.type,
          id: activeImageTarget.id,
          index: activeImageTarget.index,
          imgEl: activeImageTarget.imgEl,
          filename: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle Save Changes: Upload images & save PORTFOLIO_DATA to disk & localStorage
  async function handleSaveChanges() {
    const saveBtn = document.getElementById('editor-save-btn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> <span>Đang lưu...</span>';
    }

    // First, force sync all current DOM text elements to PORTFOLIO_DATA
    document.querySelectorAll('[contenteditable="true"]').forEach(el => syncElementToData(el));

    try {
      // 1. Process pending image uploads to backend server
      for (const item of pendingImageUploads) {
        try {
          const uploadRes = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: item.filename,
              data: item.dataUrl
            })
          });

          if (uploadRes.ok) {
            const uploadJson = await uploadRes.json();
            if (uploadJson.success && uploadJson.url) {
              const savedUrl = uploadJson.url;

              if (item.targetType === 'avatar') {
                if (typeof PORTFOLIO_DATA !== 'undefined') {
                  if (PORTFOLIO_DATA.vi && PORTFOLIO_DATA.vi.hero) PORTFOLIO_DATA.vi.hero.avatar = savedUrl;
                  if (PORTFOLIO_DATA.en && PORTFOLIO_DATA.en.hero) PORTFOLIO_DATA.en.hero.avatar = savedUrl;
                }
              } else if (item.targetType === 'project') {
                ['vi', 'en'].forEach(lang => {
                  if (PORTFOLIO_DATA && PORTFOLIO_DATA[lang] && PORTFOLIO_DATA[lang].projects && PORTFOLIO_DATA[lang].projects.list) {
                    const proj = PORTFOLIO_DATA[lang].projects.list.find(p => p.id === item.id) ||
                                 PORTFOLIO_DATA[lang].projects.list[item.index];
                    if (proj) proj.image = savedUrl;
                  }
                });
              }
            }
          }
        } catch (uploadErr) {
          console.warn('Lỗi tải ảnh lên backend server:', uploadErr);
        }
      }
      pendingImageUploads = [];

      // 2. Save complete PORTFOLIO_DATA to /api/save-content
      let serverSaved = false;
      try {
        const saveRes = await fetch('/api/save-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ portfolioData: PORTFOLIO_DATA })
        });

        if (saveRes.ok) {
          const saveJson = await saveRes.json();
          if (saveJson.success) {
            serverSaved = true;
          }
        }
      } catch (saveErr) {
        console.warn('Server backend save-content API unavailable, falling back to localStorage', saveErr);
      }

      // 3. Client-side LocalStorage backup, only when the file could not be written.
      // Once data.js holds the content, a browser copy would just shadow future file changes.
      try {
        if (serverSaved) {
          localStorage.removeItem('portfolio_custom_data');
          fileDataHash = hashData(PORTFOLIO_DATA); // data.js now matches what is on screen
        } else {
          localStorage.setItem('portfolio_custom_data', JSON.stringify({ __base: fileDataHash, data: PORTFOLIO_DATA }));
        }
      } catch (lsErr) {
        console.warn('LocalStorage save error:', lsErr);
      }

      clearChangesIndicator();

      if (serverSaved) {
        showToast('✓ ĐÃ LƯU VĨNH VIỄN nội dung và hình ảnh vào file data.js thành công!');
      } else {
        showToast('✓ Đã lưu thành công vào bộ nhớ trình duyệt!');
      }

    } catch (err) {
      console.error('Save error:', err);
      showToast('Có lỗi xảy ra khi lưu: ' + err.message, true);
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="ri-save-3-line"></i> <span>LƯU THAY ĐỔI</span> <span class="editor-unsaved-badge" id="editor-unsaved-badge" style="display:none;">0</span>';
      }
    }
  }

  // Keyboard Shortcuts: Ctrl + S to save immediately
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      handleSaveChanges();
    }
    if (e.key === 'Escape') {
      if (document.activeElement && document.activeElement.getAttribute('contenteditable') === 'true') {
        document.activeElement.blur();
      }
    }
  });

  // Warn before leaving if unsaved changes exist
  window.addEventListener('beforeunload', (e) => {
    if (unsavedChangesCount > 0) {
      e.preventDefault();
      e.returnValue = 'Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?';
      return e.returnValue;
    }
  });

  // Re-hook whenever portfolio is re-rendered (by app.js or filter click)
  window.addEventListener('portfolio:rendered', () => {
    if (isEditMode) {
      enableInlineTextEditing();
      enableInlineImageEditing();
      setupListAndCardControls();
    } else {
      disableInlineTextEditing();
      disableInlineImageEditing();
      disableListAndCardControls();
    }
  });

  // Re-hook whenever a case study detail modal is opened
  window.addEventListener('modal:opened', () => {
    if (isEditMode) {
      setTimeout(() => {
        enableInlineTextEditing();
        enableInlineImageEditing();
        setupListAndCardControls();
      }, 50);
    } else {
      setTimeout(() => {
        disableInlineTextEditing();
        disableInlineImageEditing();
        disableListAndCardControls();
      }, 50);
    }
  });

  // Load custom data from localStorage if available on page load
  function loadStoredData() {
    try {
      if (typeof PORTFOLIO_DATA !== 'undefined') fileDataHash = hashData(PORTFOLIO_DATA);
      const stored = localStorage.getItem('portfolio_custom_data');
      if (stored) {
        const draft = JSON.parse(stored);
        // A draft only applies on top of the exact data.js it was made from. If data.js changed
        // since (edited by hand, pulled from git, or saved via the server), the draft is stale and
        // re-applying it would silently revert those newer changes on the next save.
        if (!draft || draft.__base !== fileDataHash || !draft.data) {
          localStorage.removeItem('portfolio_custom_data');
          return;
        }
        const parsed = draft.data;
        if (parsed && typeof PORTFOLIO_DATA !== 'undefined') {
          const normalizeProjCategory = (p) => {
            if (!p || !p.category) return;
            const normVal = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normVal.includes('campaign')) p.category = 'campaign';
            else if (normVal.includes('content') || normVal.includes('video') || normVal.includes('media')) p.category = 'content';
            else if (normVal.includes('growth') || normVal.includes('brand')) p.category = 'growth';
            else if (normVal.includes('performance') || normVal.includes('ads')) p.category = 'performance';
          };

          if (parsed.vi && parsed.vi.projects && parsed.vi.projects.list) {
            parsed.vi.projects.list.forEach(normalizeProjCategory);
          }
          if (parsed.en && parsed.en.projects && parsed.en.projects.list) {
            parsed.en.projects.list.forEach(normalizeProjCategory);
          }

          if (parsed.vi) Object.assign(PORTFOLIO_DATA.vi, parsed.vi);
          if (parsed.en) Object.assign(PORTFOLIO_DATA.en, parsed.en);
          console.log('[Live Editor] Đã nạp dữ liệu tùy chỉnh từ bộ nhớ cục bộ.');
        }
      }
    } catch (e) {
      console.warn('Không thể nạp dữ liệu từ localStorage:', e);
    }
  }

  // Primary Initialization Routine
  function initLiveEditor() {
    loadStoredData();
    createEditorToolbar();
    setupCropperModalEvents();
    // Default to OFF so visitors and normal browsing have pristine, un-editable experience
    setEditMode(false);

    // Watch for dynamic DOM additions (e.g. project filters, case study modal)
    const observer = new MutationObserver(() => {
      if (isEditMode) {
        enableInlineTextEditing();
        enableInlineImageEditing();
      } else {
        disableInlineTextEditing();
        disableInlineImageEditing();
      }
    });

    const mainContainers = document.querySelectorAll('#projects-grid, #skills-grid, #journey-timeline, #services-grid, #stats-strip, #about-values, #case-study-modal');
    mainContainers.forEach(container => {
      if (container) {
        observer.observe(container, { childList: true, subtree: true });
      }
    });
  }

  // The editor saves through serve.cjs, so only expose it when running locally (not on the public site)
  const isLocalHost = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
  if (!isLocalHost) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiveEditor);
  } else {
    initLiveEditor();
  }

})();
