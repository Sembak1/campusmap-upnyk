
/**
 * distance.js
 * Utilitas perhitungan jarak menggunakan rumus Haversine.
 */

'use strict';

// Radius bumi dalam satuan kilometer
const EARTH_RADIUS_KM = 6371;

/**
 * Mengubah derajat menjadi radian.
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Menghitung jarak antara dua koordinat menggunakan
 * rumus Haversine.
 *
 * @param {number} lat1 Latitude titik pertama
 * @param {number} lng1 Longitude titik pertama
 * @param {number} lat2 Latitude titik kedua
 * @param {number} lng2 Longitude titik kedua
 * @returns {number|null} Jarak dalam kilometer
 */
function calculateDistance(lat1, lng1, lat2, lng2) {

  const coordinates = [lat1, lng1, lat2, lng2];

  // Memastikan semua koordinat berupa angka valid
  if (!coordinates.every(Number.isFinite)) {
    return null;
  }

  const latitudeDifference = toRadians(lat2 - lat1);
  const longitudeDifference = toRadians(lng2 - lng1);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return EARTH_RADIUS_KM * c;
}

/**
 * Mengubah jarak kilometer menjadi format
 * meter atau kilometer yang mudah dibaca.
 */
function formatDistance(distanceKm) {

  if (!Number.isFinite(distanceKm)) {
    return 'Jarak tidak tersedia';
  }

  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} meter`;
  }

  return `${distanceKm.toFixed(2)} km`;
}

/**
 * Menghitung jarak dari posisi pengguna
 * menuju fasilitas.
 */
function getDistanceToFacility(userLocation, facility) {

  if (
    !userLocation ||
    !facility ||
    !Number.isFinite(userLocation.lat) ||
    !Number.isFinite(userLocation.lng) ||
    !Number.isFinite(facility.lat) ||
    !Number.isFinite(facility.lng)
  ) {
    return null;
  }

  return calculateDistance(
    userLocation.lat,
    userLocation.lng,
    facility.lat,
    facility.lng
  );
}

/**
 * Mengurutkan fasilitas berdasarkan jarak
 * terdekat dari posisi pengguna.
 */
function sortFacilitiesByDistance(userLocation, facilities) {

  if (!userLocation || !Array.isArray(facilities)) {
    return [];
  }

  return facilities
    .map(facility => ({
      ...facility,
      distance: getDistanceToFacility(userLocation, facility)
    }))
    .filter(item => item.distance !== null)
    .sort((a, b) => a.distance - b.distance);
}

// Export fungsi agar dapat digunakan modul lain
window.DistanceUtils = {
  EARTH_RADIUS_KM,
  toRadians,
  calculateDistance,
  formatDistance,
  getDistanceToFacility,
  sortFacilitiesByDistance
};
