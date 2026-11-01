/**
 * config.js
 * Konfigurasi kategori fasilitas CampusMap
 * UPN "Veteran" Yogyakarta
 */
'use strict';

// Daftar kategori fasilitas (icon = nama ikon pada utils/icons.js)
const CATEGORIES = {
  academic:       { id: 'academic',       label: 'Akademik',          icon: 'academic',       color: '#2563EB' },
  administrative: { id: 'administrative', label: 'Administrasi',      icon: 'administrative', color: '#7C3AED' },
  laboratory:     { id: 'laboratory',     label: 'Laboratorium',      icon: 'laboratory',     color: '#0E7490' },
  health:         { id: 'health',         label: 'Kesehatan',         icon: 'health',         color: '#DC2626' },
  worship:        { id: 'worship',        label: 'Ibadah',            icon: 'worship',        color: '#047857' },
  food:           { id: 'food',           label: 'Makanan & Minuman', icon: 'food',           color: '#C2410C' },
  sports:         { id: 'sports',         label: 'Olahraga',          icon: 'sports',         color: '#15803D' },
  parking:        { id: 'parking',        label: 'Parkir',            icon: 'parking',        color: '#475569' },
  services:       { id: 'services',       label: 'Layanan',           icon: 'services',       color: '#9333EA' },
  accommodation:  { id: 'accommodation',  label: 'Akomodasi',         icon: 'accommodation',  color: '#B45309' }
};

/**
 * Mengambil informasi kategori berdasarkan ID.
 * Jika kategori tidak ditemukan, gunakan ikon lokasi.
 */
function getCategory(id) {
  return CATEGORIES[id] || { id, label: id || 'Lainnya', icon: 'pin', color: '#64748B' };
}

// Konfigurasi dapat diakses oleh seluruh modul aplikasi
window.CampusConfig = { CATEGORIES, getCategory };
