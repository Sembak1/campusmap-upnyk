/**
 * map.js
 * Peta Leaflet untuk dua kampus UPN "Veteran" Yogyakarta.
 *
 * - Marker memakai ikon SVG per kategori.
 * - Program studi tidak dibuat marker sendiri; daftarnya muncul
 *   pada panel detail fakultas induk agar peta tidak bertumpuk.
 * - Detail fasilitas ditampilkan pada panel detail (bukan popup),
 *   marker hanya menampilkan tooltip nama.
 * - Pada tampilan "Semua Kampus", peta menampilkan penanda ringkasan
 *   tiap kampus pada zoom jauh, lalu marker fasilitas saat didekati.
 * - Fasilitas tanpa titik terverifikasi dikelompokkan pada marker
 *   area kampus (tidak ada koordinat gedung yang dikarang).
 */
'use strict';

const CampusMap = (() => {
  const DETAIL_ZOOM = 16;           // zoom minimum untuk menampilkan marker fasilitas
  let map = null;
  let facilityLayer = null;
  let areaLayer = null;
  let summaryLayer = null;
  let boundaryLayer = null;
  let legendControl = null;
  let markers = [];
  let activeFilter = 'all';
  let selectedId = null;
  let userMarker = null;
  let userAccuracy = null;
  let userLocation = null;
  let boundaryVisible = true;

  /* ──────────────────────────────────────────────────────────
     UTIL
  ────────────────────────────────────────────────────────── */

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[ch]);

  const safeUrl = url => esc(url);

  const hasPoint = item => CampusData.hasPoint(item);

  function campusNameOf(item) {
    return CampusData.CAMPUS_LABEL[item.campusId] || '';
  }

  function mapsUrlOf(item) {
    return item.mapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} UPN Veteran Yogyakarta ${campusNameOf(item)}`)}`;
  }

  function directionsUrlOf(item) {
    if (item.directionsUrl) return item.directionsUrl;
    if (hasPoint(item)) return `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${item.name} UPN Veteran Yogyakarta ${campusNameOf(item)}`)}`;
  }

  function makeIcon(item, selected = false) {
    const category = CampusConfig.getCategory(item.category);
    return L.divIcon({
      className: 'campus-marker-wrapper',
      html: `<div class="pin ${selected ? 'is-selected' : ''}" style="--pin:${category.color}">
               <span class="pin-head">${Icons.svg(category.icon, 17, 2.2)}</span>
             </div>`,
      iconSize: [40, 48],
      iconAnchor: [20, 46],
      popupAnchor: [0, -44]
    });
  }

  /* ──────────────────────────────────────────────────────────
     INISIALISASI
  ────────────────────────────────────────────────────────── */

  function init() {
    if (map) return;

    if (typeof L === 'undefined') {
      document.getElementById('mapContainer').innerHTML =
        '<div class="map-error"><strong>Peta tidak dapat dimuat.</strong><p>Periksa koneksi internet lalu muat ulang halaman.</p></div>';
      return;
    }

    const campus = CampusManager.getActiveCampus();
    map = L.map('mapContainer', {
      zoomControl: false,
      scrollWheelZoom: true,
      zoomSnap: 0.5,
      maxZoom: 20
    }).setView([campus.lat, campus.lng], campus.defaultZoom || 16);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.scale({ position: 'bottomright', imperial: false }).addTo(map);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20, maxNativeZoom: 19
    });
    const light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 20, maxNativeZoom: 19
    });
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics, and the GIS User Community',
      maxZoom: 20, maxNativeZoom: 19
    });

    osm.addTo(map);
    L.control.layers(
      { 'Standar': osm, 'Terang': light, 'Satelit': satellite },
      null,
      { position: 'topright', collapsed: true }
    ).addTo(map);

    boundaryLayer = L.layerGroup().addTo(map);
    facilityLayer = L.layerGroup().addTo(map);
    areaLayer = L.layerGroup().addTo(map);
    summaryLayer = L.layerGroup().addTo(map);

    drawBoundaries();
    renderMarkers();
    renderLegend();

    map.on('zoomend', syncLayerVisibility);
    
    if (CampusManager.getActiveCampusId() === 'all') fitAllCampuses(false);
    syncLayerVisibility();
  }

  function fitAllCampuses(animate = true) {
    const bounds = L.latLngBounds(CampusData.getAllCampuses().map(c => [c.lat, c.lng]));
    if (animate) map.flyToBounds(bounds, { padding: [70, 70], duration: 0.8, maxZoom: 15 });
    else map.fitBounds(bounds, { padding: [70, 70], maxZoom: 15 });
  }

  /* ──────────────────────────────────────────────────────────
     BATAS KAMPUS (perkiraan)
  ────────────────────────────────────────────────────────── */

  function drawBoundaries() {
    boundaryLayer.clearLayers();
    CampusData.getAllCampuses().forEach(campus => {
      if (!campus.boundaryApprox) return;
      L.polygon(campus.boundaryApprox, {
        color: '#176b45', weight: 2, opacity: 0.85, dashArray: '6 6',
        fillColor: '#176b45', fillOpacity: 0.06, interactive: false
      }).addTo(boundaryLayer);
    });
  }

  function toggleBoundary(force) {
    boundaryVisible = typeof force === 'boolean' ? force : !boundaryVisible;
    if (!map) return boundaryVisible;
    if (boundaryVisible) boundaryLayer.addTo(map); else map.removeLayer(boundaryLayer);
    return boundaryVisible;
  }

  /* ──────────────────────────────────────────────────────────
     POPUP
  ────────────────────────────────────────────────────────── */

  function areaPopup(campusId, items) {
    const campus = CampusData.getCampusById(campusId);
    const list = items.map(item => {
      const cat = CampusConfig.getCategory(item.category);
      return `<li>
        <span class="area-item-name"><i style="background:${cat.color}"></i>${esc(item.name)}</span>
        <span class="area-popup-btns">
          <a href="${safeUrl(mapsUrlOf(item))}" target="_blank" rel="noopener noreferrer" title="Lihat lokasi" aria-label="Lihat lokasi ${esc(item.name)}">${Icons.svg('pin', 14)}</a>
          <a href="${safeUrl(directionsUrlOf(item))}" target="_blank" rel="noopener noreferrer" title="Petunjuk arah" aria-label="Petunjuk arah ke ${esc(item.name)}">${Icons.svg('navigation', 14)}</a>
        </span>
      </li>`;
    }).join('');
    return `<div class="map-area-popup">
      <strong>Fasilitas lain di ${esc(campus.shortName)}</strong>
      <p class="map-area-note">Marker ini menunjukkan area kampus, bukan koordinat persis tiap gedung.</p>
      <ul>${list}</ul>
    </div>`;
  }

  /* ──────────────────────────────────────────────────────────
     MARKER
  ────────────────────────────────────────────────────────── */

  function renderMarkers() {
    if (!map) return;
    facilityLayer.clearLayers();
    areaLayer.clearLayers();
    summaryLayer.clearLayers();
    markers = [];

    const campusId = CampusManager.getActiveCampusId();
    const items = CampusData.getFacilities(activeFilter, campusId).filter(item => item.type !== 'program');

    items.filter(hasPoint).forEach(item => {
      const marker = L.marker([item.lat, item.lng], {
        icon: makeIcon(item, item.id === selectedId),
        title: item.name,
        riseOnHover: true,
        keyboard: true
      }).addTo(facilityLayer);
      marker.bindTooltip(esc(item.name), { direction: 'top', offset: [0, -40], opacity: 1, className: 'pin-tooltip' });
      marker.on('click', () => {
        setSelected(item.id);
        if (window.CampusApp) window.CampusApp.showFacility(item.id, { fromMap: true });
      });
      markers.push({ id: item.id, marker, facility: item });
    });

    // Satu marker per kampus mengelompokkan fasilitas tanpa titik gedung.
    const campusIds = campusId === 'all' ? CampusData.getAllCampuses().map(c => c.id) : [campusId];
    campusIds.forEach(id => {
      const group = items.filter(item => !hasPoint(item) && item.campusId === id);
      if (!group.length) return;
      const campus = CampusData.getCampusById(id);
      const marker = L.marker([campus.lat, campus.lng], {
        icon: L.divIcon({
          className: 'campus-area-marker-wrapper',
          html: `<div class="campus-area-marker"><span>+</span><small>${group.length}</small></div>`,
          iconSize: [44, 44], iconAnchor: [22, 22]
        }),
        title: `Fasilitas lain di ${campus.shortName}`
      }).addTo(areaLayer);
      marker.bindPopup(areaPopup(id, group), { maxWidth: 360, maxHeight: 360 });
      markers.push({ id: `AREA-${id}`, marker, facility: null });
    });

    // Penanda ringkasan per kampus (tampilan Semua Kampus, zoom jauh)
    if (campusId === 'all') {
      CampusData.getAllCampuses().forEach(campus => {
        const count = items.filter(item => item.campusId === campus.id).length;
        const marker = L.marker([campus.lat, campus.lng], {
          icon: L.divIcon({
            className: 'campus-summary-wrapper',
            html: `<div class="campus-summary"><strong>${count}</strong><span>${esc(campus.shortName)}</span></div>`,
            iconSize: [118, 56], iconAnchor: [59, 28]
          }),
          title: `Buka ${campus.shortName}`
        }).addTo(summaryLayer);
        marker.on('click', () => window.CampusApp && window.CampusApp.selectCampus(campus.id));
      });
    }

    syncLayerVisibility();
  }

  /** Atur layer mana yang tampak sesuai tingkat zoom dan kampus aktif. */
  function syncLayerVisibility() {
    if (!map) return;
    const showSummary = CampusManager.getActiveCampusId() === 'all' && map.getZoom() < DETAIL_ZOOM - 0.5;
    const toggle = (layer, show) => {
      if (show && !map.hasLayer(layer)) layer.addTo(map);
      if (!show && map.hasLayer(layer)) map.removeLayer(layer);
    };
    toggle(summaryLayer, showSummary);
    toggle(facilityLayer, !showSummary);
    toggle(areaLayer, !showSummary);
  }

  function setSelected(id) {
    if (selectedId === id) return;
    const previous = markers.find(m => m.id === selectedId);
    selectedId = id;
    if (previous && previous.facility) previous.marker.setIcon(makeIcon(previous.facility, false));
    const current = markers.find(m => m.id === id);
    if (current && current.facility) current.marker.setIcon(makeIcon(current.facility, true));
  }

  /* ──────────────────────────────────────────────────────────
     LEGENDA (dapat dilipat)
  ────────────────────────────────────────────────────────── */

  function renderLegend() {
    if (legendControl) map.removeControl(legendControl);
    legendControl = L.control({ position: 'bottomleft' });

    legendControl.onAdd = function () {
      const div = L.DomUtil.create('div', 'map-legend');
      const collapsed = window.innerWidth <= 700;
      div.classList.toggle('collapsed', collapsed);
      div.innerHTML = `
        <button class="map-legend-toggle" type="button" aria-expanded="${!collapsed}">
          ${Icons.svg('layers', 15)} <span>Legenda</span>
        </button>
        <div class="map-legend-body">
          ${Object.values(CampusConfig.CATEGORIES).map(cat => `
            <div class="map-legend-item">
              <span class="map-legend-dot" style="background:${cat.color}">${Icons.svg(cat.icon, 11, 2.4)}</span>
              <span class="map-legend-label">${esc(cat.label)}</span>
            </div>`).join('')}
        </div>`;
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      const toggle = div.querySelector('.map-legend-toggle');
      toggle.addEventListener('click', () => {
        const isCollapsed = div.classList.toggle('collapsed');
        toggle.setAttribute('aria-expanded', String(!isCollapsed));
      });
      return div;
    };
    legendControl.addTo(map);
  }

  /* ──────────────────────────────────────────────────────────
     KONTROL KAMPUS, FILTER, FOKUS
  ────────────────────────────────────────────────────────── */

  function setCampus(campusId, fly = true) {
    if (!map) return;
    renderMarkers();
    if (!fly) return;
    if (campusId === 'all') { fitAllCampuses(true); return; }
    const campus = CampusData.getCampusById(campusId);
    if (campus) map.flyTo([campus.lat, campus.lng], campus.defaultZoom || 17, { duration: 0.8 });
  }

  function setFilter(categoryId = 'all') {
    activeFilter = categoryId || 'all';
    renderMarkers();
  }

  /**
   * Menghitung pusat peta agar titik tidak tertutup panel detail
   * (panel kanan di desktop, panel bawah di layar sempit).
   */
  function offsetCenter(latlng, zoom) {
    const size = map.getSize();
    const narrow = window.innerWidth <= 700;
    const shift = narrow ? L.point(0, size.y * 0.2) : L.point(190, 0);
    return map.unproject(map.project(latlng, zoom).add(shift), zoom);
  }

  function focusFacility(facilityId, { pan = true } = {}) {
    if (!map) return;
    let item = CampusData.getFacilityById(facilityId);
    if (!item) return;

    // Program studi → fokus ke fakultas induk
    if (item.type === 'program' && item.parentId) item = CampusData.getFacilityById(item.parentId) || item;

    if (hasPoint(item)) {
      setSelected(item.id);
      if (pan) {
        const zoom = Math.max(map.getZoom(), 18);
        map.flyTo(offsetCenter(L.latLng(item.lat, item.lng), zoom), zoom, { duration: 0.8 });
      }
      return;
    }
    const campus = CampusData.getCampusById(item.campusId);
    if (campus) {
      map.flyTo([campus.lat, campus.lng], 17, { duration: 0.8 });
      const area = markers.find(m => m.id === `AREA-${item.campusId}`);
      if (area) map.once('moveend', () => area.marker.openPopup());
    }
  }

  /** Dipanggil saat marker diklik: geser halus tanpa mengubah zoom. */
  function revealOnMap(facilityId) {
    const item = CampusData.getFacilityById(facilityId);
    if (!map || !item || !hasPoint(item)) return;
    map.panTo(offsetCenter(L.latLng(item.lat, item.lng), map.getZoom()), { animate: true, duration: 0.5 });
  }

  /* ──────────────────────────────────────────────────────────
     LOKASI PENGGUNA
  ────────────────────────────────────────────────────────── */

  function locateUser() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Browser tidak mendukung fitur lokasi.'));
      navigator.geolocation.getCurrentPosition(position => {
        userLocation = { lat: position.coords.latitude, lng: position.coords.longitude, accuracy: position.coords.accuracy };
        if (map) {
          if (userMarker) map.removeLayer(userMarker);
          if (userAccuracy) map.removeLayer(userAccuracy);
          userAccuracy = L.circle([userLocation.lat, userLocation.lng], {
            radius: userLocation.accuracy, color: '#2563EB', weight: 1, fillColor: '#2563EB', fillOpacity: 0.1, interactive: false
          }).addTo(map);
          userMarker = L.marker([userLocation.lat, userLocation.lng], {
            icon: L.divIcon({ className: 'user-dot-wrapper', html: '<div class="user-dot"></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
            zIndexOffset: 1000, title: 'Lokasi Anda'
          }).addTo(map).bindPopup('Lokasi Anda saat ini');
          map.flyTo([userLocation.lat, userLocation.lng], 18, { duration: 0.8 });
        }
        resolve(userLocation);
      }, error => {
        const messages = {
          1: 'Izin lokasi ditolak. Aktifkan izin lokasi pada browser Anda.',
          2: 'Lokasi Anda tidak tersedia saat ini.',
          3: 'Waktu pencarian lokasi habis. Coba lagi.'
        };
        reject(new Error(messages[error.code] || 'Gagal mengambil lokasi.'));
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
    });
  }

  function getUserLocation() { return userLocation; }

  function resetView() {
    if (!map) return;
    map.closePopup();
    setCampus(CampusManager.getActiveCampusId());
  }

  function invalidate() { if (map) map.invalidateSize(); }
  function getMap() { return map; }

  return {
    init, getMap, setCampus, setFilter, renderMarkers, focusFacility,
    locateUser, getUserLocation, resetView, invalidate, toggleBoundary, revealOnMap, clearSelection: () => setSelected(null),
    getMapsUrl: mapsUrlOf, getDirectionsUrl: directionsUrlOf
  };
})();

window.CampusMap = CampusMap;
