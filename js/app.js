/**
 * app.js
 * Aplikasi utama CampusMap — UPN "Veteran" Yogyakarta
 */
'use strict';

const CampusApp = (() => {

  /* =====================================================
     STATE & HELPER
  ===================================================== */

  let activeFilter = 'all';
  let searchMatches = [];
  let searchCursor = -1;
  let toastTimer = null;

  const $ = id => document.getElementById(id);
  const icon = (name, size = 18) => Icons.svg(name, size);

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[ch]);

  const getCategory = id => CampusConfig.getCategory(id);
  const hasPoint = facility => CampusData.hasPoint(facility);
  const campusLabel = facility => CampusData.CAMPUS_LABEL[facility.campusId] || '';

  function userDistance(facility) {
    const location = CampusMap.getUserLocation();
    if (!location || !hasPoint(facility)) return null;
    return DistanceUtils.getDistanceToFacility(location, facility);
  }

  /** Membuat elemen dengan atribut & anak sekaligus. */
  function h(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'style') node.style.cssText = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    children.flat().forEach(child => {
      if (child === null || child === undefined || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(child));
    });
    return node;
  }

  /** Notifikasi singkat di bagian bawah peta. */
  function toast(message, type = 'info') {
    const box = $('toast');
    box.className = `toast show ${type}`;
    box.innerHTML = `${icon(type === 'error' ? 'info' : 'check', 16)}<span>${esc(message)}</span>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => box.classList.remove('show'), 3800);
  }

  /* =====================================================
     INISIALISASI
  ===================================================== */

  function init() {
    hydrateStaticIcons();
    buildCategoryControls();

    CampusMap.init();

    bindCampusSwitcher();
    bindNavigation();
    bindFilters();
    bindSearch();
    bindDirectory();
    bindDetailPanel();
    bindMapControls();
    bindAssistant();
    bindShortcuts();

    refreshCampusUI();
    renderDirectory();
    showView('viewMap');
  }

  /** Mengisi ikon SVG pada elemen statis ber-atribut data-icon. */
  function hydrateStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(node => {
      const size = Number(node.dataset.iconSize) || 18;
      node.insertAdjacentHTML('afterbegin', icon(node.dataset.icon, size));
    });
  }

  /** Membangun tombol filter & opsi direktori dari config.js. */
  function buildCategoryControls() {
    const bar = $('filterBar');
    bar.innerHTML = '';
    bar.append(filterButton({ id: 'all', label: 'Semua', icon: 'grid' }, true));
    Object.values(CampusConfig.CATEGORIES).forEach(cat => bar.append(filterButton(cat, false)));

    const select = $('dirFilter');
    select.innerHTML = '<option value="all">Semua Kategori</option>' +
      Object.values(CampusConfig.CATEGORIES)
        .map(cat => `<option value="${cat.id}">${esc(cat.label)}</option>`).join('');
  }

  function filterButton(cat, active) {
    return h('button', {
      class: `filter-btn${active ? ' active' : ''}`,
      type: 'button',
      'data-filter': cat.id,
      'aria-pressed': String(active),
      style: cat.color ? `--cat:${cat.color}` : ''
    },
      h('span', { class: 'filter-icon', html: icon(cat.icon, 15) }),
      h('span', { class: 'filter-label', text: cat.label }),
      h('span', { class: 'filter-count', 'data-count': cat.id, text: '0' })
    );
  }

  function updateFilterCounts() {
    const counts = CampusManager.getCategoryCounts();
    document.querySelectorAll('[data-count]').forEach(node => {
      const count = counts[node.dataset.count] || 0;
      node.textContent = count;
      node.closest('.filter-btn').classList.toggle('is-empty', count === 0 && node.dataset.count !== 'all');
    });
  }

  /* =====================================================
     KAMPUS
  ===================================================== */

  function bindCampusSwitcher() {
    document.querySelectorAll('.campus-btn').forEach(button => {
      button.addEventListener('click', () => selectCampus(button.dataset.campus));
    });
  }

  /**
   * Mengganti kampus aktif.
   * @param {string} campusId   'all' | 'campus1' | 'campus2'
   * @param {Object} [options]  { fly: false } agar peta tidak berpindah otomatis
   */
  function selectCampus(campusId, { fly = true } = {}) {
    if (!CampusManager.setActiveCampus(campusId)) return;

    document.querySelectorAll('.campus-btn').forEach(btn => {
      const active = btn.dataset.campus === campusId;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    setFilter('all', { render: false });
    CampusMap.setCampus(campusId, fly);
    refreshCampusUI();
    renderDirectory();
    closeDetail();
    showView('viewMap');
  }

  function refreshCampusUI() {
    const campus = CampusManager.getActiveCampus();
    if (campus) {
      $('campusInfoName').textContent = campus.name;
      $('campusInfoAddr').textContent = campus.address;
    }
    const stats = CampusManager.getStats();
    $('statTotal').textContent = stats.total;
    $('statPrograms').textContent = stats.programs;
    $('statCategories').textContent = stats.categories;
    updateFilterCounts();
  }

  /* =====================================================
     NAVIGASI
  ===================================================== */

  function bindNavigation() {
    $('navMap').addEventListener('click', () => showView('viewMap'));
    $('navDirectory').addEventListener('click', () => { showView('viewDirectory'); renderDirectory(); });
    $('navAssistant').addEventListener('click', () => { showView('viewAssistant'); $('chatInput').focus({ preventScroll: true }); });
    $('headerAssistant').addEventListener('click', () => $('navAssistant').click());
    $('menuToggle').addEventListener('click', toggleSidebar);
    $('sidebarOverlay').addEventListener('click', closeSidebar);
  }

  const VIEW_NAV = { viewMap: 'navMap', viewDirectory: 'navDirectory', viewAssistant: 'navAssistant' };

  function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === viewId));
    document.querySelectorAll('.nav-item').forEach(item => {
      const active = item.id === VIEW_NAV[viewId];
      item.classList.toggle('active', active);
      if (active) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
    });
    // Filter kategori hanya relevan untuk peta
    $('filterBar').classList.toggle('is-hidden', viewId !== 'viewMap');

    if (viewId === 'viewMap') {
      CampusMap.invalidate();
      setTimeout(CampusMap.invalidate, 160);
    }
    if (window.innerWidth <= 900) closeSidebar();
  }

  function toggleSidebar() {
    const open = $('sidebar').classList.toggle('open');
    $('sidebarOverlay').classList.toggle('active', open);
    $('menuToggle').setAttribute('aria-expanded', String(open));
  }

  function closeSidebar() {
    $('sidebar').classList.remove('open');
    $('sidebarOverlay').classList.remove('active');
    $('menuToggle').setAttribute('aria-expanded', 'false');
  }

  /* =====================================================
     FILTER KATEGORI
  ===================================================== */

  function bindFilters() {
    $('filterBar').addEventListener('click', event => {
      const button = event.target.closest('.filter-btn');
      if (button) setFilter(button.dataset.filter || 'all');
    });
    $('dirFilter').addEventListener('change', () => setFilter($('dirFilter').value));
  }

  function setFilter(categoryId, { render = true } = {}) {
    activeFilter = categoryId || 'all';
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const active = btn.dataset.filter === activeFilter;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    $('dirFilter').value = activeFilter;
    CampusMap.setFilter(activeFilter);
    if (render) renderDirectory();
  }

  /* =====================================================
     PENCARIAN GLOBAL
  ===================================================== */

  function highlight(text, query) {
    const safe = esc(text);
    const tokens = query.split(/\s+/).filter(Boolean).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!tokens.length) return safe;
    return safe.replace(new RegExp(`(${tokens.map(esc).join('|')})`, 'ig'), '<mark>$1</mark>');
  }

  function bindSearch() {
    const input = $('searchInput');
    const box = $('searchResults');

    input.addEventListener('input', () => runSearch(input.value.trim()));
    input.addEventListener('focus', () => { if (input.value.trim()) runSearch(input.value.trim()); });

    input.addEventListener('keydown', event => {
      if (!box.classList.contains('show')) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); moveCursor(1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); moveCursor(-1); }
      else if (event.key === 'Enter') {
        event.preventDefault();
        const target = searchMatches[searchCursor >= 0 ? searchCursor : 0];
        if (target) chooseSearchResult(target);
      } else if (event.key === 'Escape') { closeSearch(); input.blur(); }
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.search-wrapper')) closeSearch();
    });
  }

  function runSearch(query) {
    const box = $('searchResults');
    searchCursor = -1;
    box.innerHTML = '';

    if (!query) { closeSearch(); return; }

    searchMatches = CampusData.searchFacilities(query, null, CampusManager.getActiveCampusId()).slice(0, 8);

    if (!searchMatches.length) {
      box.append(h('div', { class: 'search-empty' }, h('strong', { text: 'Tidak ada hasil' }), h('span', { text: 'Coba kata kunci lain, misalnya "perpustakaan" atau "masjid".' })));
    } else {
      searchMatches.forEach((facility, index) => {
        const cat = getCategory(facility.category);
        const item = h('button', {
          class: 'search-result-item', type: 'button', role: 'option', id: `sr-${index}`,
          style: `--cat:${cat.color}`,
          onClick: () => chooseSearchResult(facility),
          onMouseenter: () => setCursor(index)
        },
          h('span', { class: 'search-result-icon', html: icon(cat.icon, 17) }),
          h('span', { class: 'search-result-text' },
            h('span', { class: 'search-result-name', html: highlight(facility.name, query) }),
            h('span', { class: 'search-result-category', text: `${cat.label} · ${campusLabel(facility)}` })
          )
        );
        box.append(item);
      });
    }
    box.classList.add('show');
    $('searchInput').setAttribute('aria-expanded', 'true');
  }

  function setCursor(index) {
    searchCursor = index;
    document.querySelectorAll('.search-result-item').forEach((el, i) => el.classList.toggle('is-active', i === index));
  }

  function moveCursor(step) {
    if (!searchMatches.length) return;
    setCursor((searchCursor + step + searchMatches.length) % searchMatches.length);
    document.querySelector('.search-result-item.is-active')?.scrollIntoView({ block: 'nearest' });
  }

  function closeSearch() {
    $('searchResults').classList.remove('show');
    $('searchInput').setAttribute('aria-expanded', 'false');
  }

  function chooseSearchResult(facility) {
    closeSearch();
    $('searchInput').value = '';
    $('searchInput').blur();
    showView('viewMap');
    showFacility(facility.id);
  }

  /* =====================================================
     DIREKTORI
  ===================================================== */

  function bindDirectory() {
    $('dirSearch').addEventListener('input', renderDirectory);
    $('dirType').addEventListener('change', renderDirectory);
    $('dirSort').addEventListener('change', renderDirectory);
  }

  function sortFacilities(list, mode) {
    const byName = (a, b) => a.name.localeCompare(b.name, 'id');
    const rank = item => (item.type === 'program' ? 1 : 0);
    const copy = [...list];
    if (mode === 'distance') {
      return copy.sort((a, b) => (userDistance(a) ?? Infinity) - (userDistance(b) ?? Infinity) || byName(a, b));
    }
    if (mode === 'category') {
      return copy.sort((a, b) =>
        rank(a) - rank(b) ||
        getCategory(a.category).label.localeCompare(getCategory(b.category).label, 'id') || byName(a, b));
    }
    return copy.sort((a, b) => rank(a) - rank(b) || byName(a, b));
  }

  function renderDirectory() {
    const query = $('dirSearch').value.trim();
    const category = $('dirFilter').value;
    const type = $('dirType').value;
    let sort = $('dirSort').value;

    // Opsi jarak hanya aktif jika lokasi pengguna diketahui
    const distanceOption = $('dirSort').querySelector('[value="distance"]');
    distanceOption.disabled = !CampusMap.getUserLocation();
    if (sort === 'distance' && distanceOption.disabled) { sort = 'name'; $('dirSort').value = 'name'; }

    const scope = CampusData.searchFacilities(query, category, CampusManager.getActiveCampusId());
    const filtered = scope.filter(item =>
      type === 'all' ? true : type === 'program' ? item.type === 'program' : item.type !== 'program');
    const facilities = query && sort === 'name' ? filtered : sortFacilities(filtered, sort);

    $('dirCount').textContent = `${facilities.length} hasil`;

    const container = $('dirList');
    container.innerHTML = '';

    if (!facilities.length) {
      container.append(h('div', { class: 'empty-card' },
        h('span', { class: 'empty-icon', html: icon('search', 26) }),
        h('h3', { text: 'Fasilitas tidak ditemukan' }),
        h('p', { text: 'Coba kata kunci atau kategori lain, atau ubah filter kampus.' })));
      return;
    }

    const fragment = document.createDocumentFragment();
    facilities.forEach(facility => fragment.append(facilityCard(facility)));
    container.append(fragment);
  }

  function facilityCard(facility) {
    const cat = getCategory(facility.category);
    const distance = userDistance(facility);
    const isProgram = facility.type === 'program';
    const parent = isProgram && facility.parentId ? CampusData.getFacilityById(facility.parentId) : null;

    return h('article', { class: `facility-card${isProgram ? ' is-program' : ''}`, role: 'listitem', style: `--cat:${cat.color}` },
      h('div', { class: 'facility-card-top' },
        h('div', { class: 'facility-icon', html: icon(isProgram ? 'program' : cat.icon, 20) }),
        h('div', { class: 'facility-info' },
          h('div', { class: 'facility-name', text: facility.name }),
          h('div', { class: 'facility-category', text: isProgram ? 'Program Studi' : cat.label })
        ),
        distance !== null && h('span', { class: 'distance-chip', text: DistanceUtils.formatDistance(distance) })
      ),
      h('p', { class: 'facility-desc', text: facility.description }),
      h('div', { class: 'facility-meta' },
        h('span', { class: 'meta-pill', html: `${icon('pin', 12)} ${esc(campusLabel(facility))}` }),
        parent && h('span', { class: 'meta-pill', html: `${icon('academic', 12)} ${esc(parent.name.replace(/\s*\(.*\)$/, ''))}` }),
        !hasPoint(facility) && h('span', { class: 'meta-pill warn', text: 'Titik gedung belum diverifikasi' })
      ),
      h('div', { class: 'facility-card-actions' },
        h('button', { class: 'facility-action-btn btn-map', type: 'button', html: `${icon('map', 15)} Lihat di Peta`,
          onClick: () => { showView('viewMap'); showFacility(facility.id); } }),
        h('a', { class: 'facility-action-btn btn-icon', href: CampusMap.getMapsUrl(facility), target: '_blank', rel: 'noopener noreferrer',
          title: 'Buka di Google Maps', 'aria-label': `Buka ${facility.name} di Google Maps`, html: icon('external', 15) }),
        h('a', { class: 'facility-action-btn btn-icon', href: CampusMap.getDirectionsUrl(facility), target: '_blank', rel: 'noopener noreferrer',
          title: 'Petunjuk arah', 'aria-label': `Petunjuk arah ke ${facility.name}`, html: icon('navigation', 15) })
      )
    );
  }

  /* =====================================================
     PANEL DETAIL
  ===================================================== */

  function bindDetailPanel() {
    $('detailClose').addEventListener('click', closeDetail);
    $('detailBody').addEventListener('click', event => {
      const jump = event.target.closest('[data-jump]');
      if (jump) showFacility(jump.dataset.jump);
      const copy = event.target.closest('[data-copy]');
      if (copy) {
        navigator.clipboard?.writeText(copy.dataset.copy).then(
          () => toast('Koordinat disalin ke papan klip.'),
          () => toast('Tidak dapat menyalin koordinat.', 'error')
        );
      }
    });
  }

  function showFacility(facilityId, { fromMap = false } = {}) {
    const facility = CampusData.getFacilityById(facilityId);
    if (!facility) return;

    // Pastikan fasilitas terlihat pada peta: kampus & filter menyesuaikan
    const activeCampus = CampusManager.getActiveCampusId();
    if (activeCampus !== 'all' && activeCampus !== facility.campusId) selectCampus(facility.campusId, { fly: false });
    if (activeFilter !== 'all' && activeFilter !== facility.category) setFilter('all');

    renderDetail(facility);

    const panel = $('detailPanel');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    $('detailBody').scrollTop = 0;

    if (fromMap) CampusMap.revealOnMap(facility.id);
    else CampusMap.focusFacility(facility.id);
  }

  function renderDetail(facility) {
    const cat = getCategory(facility.category);
    const mapped = hasPoint(facility);
    const distance = userDistance(facility);
    const isProgram = facility.type === 'program';
    const parent = facility.parentId ? CampusData.getFacilityById(facility.parentId) : null;
    const children = CampusData.getChildren(facility.id);

    const programs = children.length ? `
      <section class="detail-block">
        <h4>${icon('program', 14)} ${children.length} Program Studi</h4>
        <div class="chip-list">${children.map(p =>
          `<button class="mini-chip" type="button" data-jump="${esc(p.id)}">${esc(p.name.replace(/^Program Studi\s+/i, ''))}</button>`).join('')}</div>
      </section>` : '';

    const parentBlock = parent ? `
      <section class="detail-block">
        <h4>${icon('academic', 14)} Berada di bawah</h4>
        <button class="mini-chip strong" type="button" data-jump="${esc(parent.id)}">${esc(parent.name)}</button>
      </section>` : '';

    const coords = mapped ? `${facility.lat}, ${facility.lng}` : null;

    $('detailBody').innerHTML = `
      <div class="detail-hero" style="--cat:${cat.color}">
        <span class="detail-hero-icon">${icon(isProgram ? 'program' : cat.icon, 24)}</span>
        <div>
          <div class="detail-category">${esc(isProgram ? 'Program Studi' : cat.label)}</div>
          <h2 class="detail-name">${esc(facility.name)}</h2>
        </div>
      </div>

      <div class="detail-badges">
        <span class="badge">${icon('pin', 13)} ${esc(campusLabel(facility))}</span>
        <span class="badge ${mapped ? 'ok' : 'warn'}">${icon(mapped ? 'check' : 'info', 13)} ${mapped ? 'Titik peta tersedia' : 'Titik gedung belum diverifikasi'}</span>
      </div>

      <p class="detail-desc">${esc(facility.description)}</p>
      ${isProgram && mapped ? `<p class="detail-note">${icon('info', 14)} Titik peta mengikuti lokasi fakultas induk.</p>` : ''}
      ${programs}
      ${parentBlock}

      <dl class="detail-meta">
        <div><dt>Koordinat</dt>
          <dd>${coords ? `<code>${esc(coords)}</code><button class="icon-btn" type="button" data-copy="${esc(coords)}" aria-label="Salin koordinat" title="Salin koordinat">${icon('copy', 14)}</button>` : 'Belum tersedia'}</dd></div>
        ${distance !== null ? `<div><dt>Jarak dari Anda</dt><dd><strong>${esc(DistanceUtils.formatDistance(distance))}</strong> <span class="muted">(garis lurus)</span></dd></div>` : ''}
      </dl>

      <div class="detail-actions">
        <a class="detail-btn primary" href="${esc(CampusMap.getDirectionsUrl(facility))}" target="_blank" rel="noopener noreferrer">${icon('navigation', 16)} Petunjuk Arah</a>
        <a class="detail-btn" href="${esc(CampusMap.getMapsUrl(facility))}" target="_blank" rel="noopener noreferrer">${icon('external', 16)} Google Maps</a>
      </div>`;
  }

  function closeDetail() {
    $('detailPanel').classList.remove('open');
    $('detailPanel').setAttribute('aria-hidden', 'true');
    CampusMap.getMap()?.closePopup();
    CampusMap.clearSelection();
  }

  /* =====================================================
     KONTROL PETA
  ===================================================== */

  function bindMapControls() {
    $('locateBtn').addEventListener('click', async () => {
      const button = $('locateBtn');
      button.classList.add('loading');
      button.disabled = true;
      try {
        await CampusMap.locateUser();
        toast('Lokasi Anda berhasil ditemukan.');
        renderDirectory();
      } catch (error) {
        toast(error.message, 'error');
      } finally {
        button.classList.remove('loading');
        button.disabled = false;
      }
    });

    $('resetViewBtn').addEventListener('click', () => CampusMap.resetView());

    $('boundaryBtn').addEventListener('click', () => {
      const visible = CampusMap.toggleBoundary();
      $('boundaryBtn').classList.toggle('active', visible);
      $('boundaryBtn').setAttribute('aria-pressed', String(visible));
    });
  }

  /* =====================================================
     CAMPUS ASSISTANT
  ===================================================== */

  function bindAssistant() {
    $('chatSend').addEventListener('click', sendMessage);
    $('chatInput').addEventListener('keydown', event => { if (event.key === 'Enter') sendMessage(); });
    $('chatClear').addEventListener('click', () => { $('chatMessages').innerHTML = ''; greet(); });

    document.querySelectorAll('.chip').forEach(button => {
      button.addEventListener('click', () => { $('chatInput').value = button.dataset.query; sendMessage(); });
    });
    greet();
  }

  function greet() {
    addMessage('bot', 'Halo! Saya Campus Assistant. Saya bisa membantu mencari perpustakaan, kantin, masjid, laboratorium, parkir, dan fasilitas lain di UPN "Veteran" Yogyakarta. Apa yang ingin Anda cari?');
  }

  function scrollChat() {
    const container = $('chatMessages');
    container.scrollTop = container.scrollHeight;
  }

  function addMessage(type, message) {
    const isUser = type === 'user';
    $('chatMessages').append(h('div', { class: `chat-message ${isUser ? 'user' : 'bot'}` },
      !isUser && h('span', { class: 'chat-avatar', html: icon('chat', 16) }),
      h('div', { class: 'chat-bubble', text: message })));
    scrollChat();
  }

  function addTyping() {
    const row = h('div', { class: 'chat-message bot typing' },
      h('span', { class: 'chat-avatar', html: icon('chat', 16) }),
      h('div', { class: 'chat-bubble' }, h('i'), h('i'), h('i')));
    $('chatMessages').append(row);
    scrollChat();
    return row;
  }

  function addFacilityMessage(facility) {
    const cat = getCategory(facility.category);
    const distance = facility.distance ?? userDistance(facility);

    const card = h('div', { class: 'chat-result', style: `--cat:${cat.color}` },
      h('span', { class: 'chat-result-icon', html: icon(cat.icon, 18) }),
      h('div', { class: 'chat-result-body' },
        h('div', { class: 'chat-result-title' }, h('strong', { text: facility.name }),
          distance !== null && distance !== undefined && h('span', { class: 'distance-chip', text: DistanceUtils.formatDistance(distance) })),
        h('div', { class: 'chat-result-sub', text: `${cat.label} · ${campusLabel(facility)}` }),
        h('div', { class: 'chat-result-actions' },
          h('button', { class: 'facility-action-btn btn-map', type: 'button', html: `${icon('map', 14)} Peta`,
            onClick: () => { showView('viewMap'); showFacility(facility.id); } }),
          h('a', { class: 'facility-action-btn', href: CampusMap.getMapsUrl(facility), target: '_blank', rel: 'noopener noreferrer', html: `${icon('pin', 14)} Lokasi` }),
          h('a', { class: 'facility-action-btn', href: CampusMap.getDirectionsUrl(facility), target: '_blank', rel: 'noopener noreferrer', html: `${icon('navigation', 14)} Arah` })
        )
      )
    );
    $('chatMessages').append(h('div', { class: 'chat-message bot results' }, card));
    scrollChat();
  }

  function addDirectoryLink(result) {
    const link = h('button', { class: 'chat-more', type: 'button', html: `${icon('list', 14)} Lihat semua ${result.total} hasil di Direktori`,
      onClick: () => {
        if (result.campusId && result.campusId !== CampusManager.getActiveCampusId()) selectCampus(result.campusId, { fly: false });
        $('dirFilter').value = result.category || 'all';
        setFilter(result.category || 'all', { render: false });
        $('dirSearch').value = result.category ? '' : (result.query || '');
        showView('viewDirectory');
        renderDirectory();
      } });
    $('chatMessages').append(h('div', { class: 'chat-message bot results' }, link));
    scrollChat();
  }

  function sendMessage() {
    const input = $('chatInput');
    const query = input.value.trim();
    if (!query) return;

    addMessage('user', query);
    input.value = '';

    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const result = CampusAssistant.respond(query, CampusManager.getActiveCampusId(), { userLocation: CampusMap.getUserLocation() });
      addMessage('bot', result.message);
      result.facilities.forEach(addFacilityMessage);
      if (result.total > result.facilities.length) addDirectoryLink(result);
    }, 380);
  }

  /* =====================================================
     PINTASAN KEYBOARD
  ===================================================== */

  function bindShortcuts() {
    document.addEventListener('keydown', event => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
      if (event.key === '/' && !typing) { event.preventDefault(); $('searchInput').focus(); }
      if (event.key === 'Escape') { closeSidebar(); if (!typing) closeDetail(); }
    });
  }

  /* =====================================================
     API PUBLIK
  ===================================================== */

  return { init, showFacility, showView, selectCampus, renderDirectory };
})();

window.CampusApp = CampusApp;
document.addEventListener('DOMContentLoaded', CampusApp.init);
