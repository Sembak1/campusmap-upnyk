/**
 * campusManager.js
 * Mengelola Kampus 1, Kampus 2, dan tampilan gabungan.
 */
'use strict';

const CampusManager = (() => {
  let activeCampusId = 'all';

  const ALL_CAMPUS = {
    id: 'all',
    shortName: 'Semua Kampus',
    name: 'Semua Kampus',
    address: 'Condongcatur dan Babarsari, Kabupaten Sleman, DIY',
    lat: -7.7722,
    lng: 110.4119,
    defaultZoom: 14
  };

  function getAllCampuses() {
    return window.CampusData.getAllCampuses();
  }

  function getActiveCampusId() {
    return activeCampusId;
  }

  function getActiveCampus() {
    if (activeCampusId === 'all') return ALL_CAMPUS;
    const campus = window.CampusData.getCampusById(activeCampusId);
    return campus ? { ...campus, name: campus.shortName } : null;
  }

  function setActiveCampus(campusId) {
    if (campusId !== 'all' && !window.CampusData.getCampusById(campusId)) {
      console.warn('CampusMap: Kampus tidak ditemukan:', campusId);
      return false;
    }
    activeCampusId = campusId;
    return true;
  }

  function getActiveFacilities() {
    return window.CampusData.getFacilities(null, activeCampusId);
  }

  function getActiveVerifiedFacilities() {
    return window.CampusData.getVerifiedFacilities(activeCampusId);
  }

  function getFacilitiesByCategory(categoryId) {
    return window.CampusData.getFacilities(categoryId, activeCampusId);
  }

  /** Statistik untuk kampus aktif. Program studi dihitung terpisah. */
  function getStats() {
    const facilities = getActiveFacilities();
    const places = facilities.filter(item => item.type !== 'program');
    return {
      total: places.length,
      programs: facilities.length - places.length,
      located: places.filter(window.CampusData.hasPoint).length,
      categories: new Set(places.map(item => item.category)).size
    };
  }

  /** Jumlah fasilitas per kategori (untuk lencana pada filter). */
  function getCategoryCounts() {
    const counts = { all: 0 };
    getActiveFacilities().forEach(item => {
      if (item.type === 'program') return;
      counts.all += 1;
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }

  return {
    getAllCampuses,
    getActiveCampusId,
    getActiveCampus,
    setActiveCampus,
    getActiveFacilities,
    getActiveVerifiedFacilities,
    getFacilitiesByCategory,
    getStats,
    getCategoryCounts
  };
})();

window.CampusManager = CampusManager;
