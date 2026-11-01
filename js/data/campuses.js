
/**
 * campuses.js
 * Data lokasi kampus UPN "Veteran" Yogyakarta
 */

'use strict';

const CAMPUSES = [
  {
    id: 'campus1',
    shortName: 'Kampus 1',
    fullName: 'UPN "Veteran" Yogyakarta – Kampus 1 Condongcatur',

    address:
      'Jl. Padjajaran, Jl. Ring Road Utara No.104, Ngropoh, Condongcatur, Kec. Depok, Kabupaten Sleman, DIY 55283',

    googleMapsUrl:
      'https://maps.app.goo.gl/YEu8C4sTt4g4H48m8',

    // Titik referensi Kampus 1
    lat: -7.762232,
    lng: 110.409279,

    defaultZoom: 17,

    // Batas perkiraan, bukan batas resmi kampus
    boundaryApprox: [
      [-7.7600, 110.4065],
      [-7.7600, 110.4120],
      [-7.7646, 110.4120],
      [-7.7646, 110.4065]
    ]
  },

  {
    id: 'campus2',
    shortName: 'Kampus 2',
    fullName: 'UPN "Veteran" Yogyakarta – Kampus 2 Babarsari',

    address:
      'Jl. Babarsari, Jl. Tambak Bayan No.2, Janti, Caturtunggal, Kec. Depok, Kabupaten Sleman, DIY 55281',

    googleMapsUrl:
      'https://maps.app.goo.gl/SgHZ6PFxgiZMvA3E9',

    // Titik referensi Kampus 2
    lat: -7.782118,
    lng: 110.414618,

    defaultZoom: 17,

    // Batas perkiraan, bukan batas resmi kampus
    boundaryApprox: [
      [-7.7812, 110.4140],
      [-7.7812, 110.4164],
      [-7.7832, 110.4164],
      [-7.7832, 110.4140]
    ]
  }
];

/**
 * Mengambil seluruh data kampus.
 */
function getAllCampuses() {
  return CAMPUSES;
}

/**
 * Mengambil data kampus berdasarkan ID.
 */
function getCampusById(id) {
  return CAMPUSES.find(campus => campus.id === id) || null;
}

/**
 * Mengambil kampus default.
 */
function getDefaultCampus() {
  return getCampusById('campus1');
}

// Menyimpan data ke CampusData
window.CampusData = window.CampusData || {};

window.CampusData.CAMPUSES = CAMPUSES;
window.CampusData.getAllCampuses = getAllCampuses;
window.CampusData.getCampusById = getCampusById;
window.CampusData.getDefaultCampus = getDefaultCampus;
