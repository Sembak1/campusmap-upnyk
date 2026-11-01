/**
 * facilities.js
 * Direktori fasilitas dan fakultas UPN Veteran Yogyakarta.
 *
 * Setiap fasilitas memiliki:
 *   mapsUrl        — URL pencarian Google Maps (dari data resmi spesifikasi)
 *   directionsUrl  — URL Google Maps Directions ke fasilitas ini
 *
 * Ketentuan koordinat:
 *   status "verified"    — koordinat terverifikasi, marker spesifik
 *   status "approximate" — koordinat belum diverifikasi, marker area kampus
 *   lat/lng null         — tidak ada koordinat, muncul di direktori saja
 */
'use strict';

const FACILITIES = [

  /* ============================================================
     KAMPUS 1 – CONDONGCATUR
  ============================================================ */

  {
    id: "FAC-001",
    name: "Fakultas Teknologi Mineral dan Energi (FTME)",
    category: "academic",
    description: "Fakultas bidang ilmu kebumian, mineral, dan energi. Berlokasi di Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=FTME+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=FTME+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/1j7qQfDJRHMqWR6a8",
    sourceUrl: "https://maps.app.goo.gl/1j7qQfDJRHMqWR6a8",
    keywords: ["fakultas", "teknologi", "mineral", "energi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "FAC-002",
    name: "Fakultas Ekonomi dan Bisnis (FEB)",
    category: "academic",
    description: "Fakultas yang menaungi bidang Manajemen, Akuntansi, dan Ekonomi Pembangunan. Berlokasi di Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622683,
    lng: 110.4081048,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=FEB+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=FEB+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/eJAQrpkUTkq1uCaF9",
    sourceUrl: "https://maps.app.goo.gl/eJAQrpkUTkq1uCaF9",
    keywords: ["fakultas", "ekonomi", "bisnis", "feb", "manajemen", "akuntansi", "upn", "upnyk", "kampus"]
  },

  {
    id: "FAC-003",
    name: "Fakultas Pertanian",
    category: "academic",
    description: "Fakultas yang menaungi bidang Agroteknologi, Agribisnis, dan Ilmu Tanah. Berlokasi di Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622289,
    lng: 110.410761,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fakultas+Pertanian+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Fakultas+Pertanian+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/XpuHvMng7Wj2aJGY6",
    sourceUrl: "https://maps.app.goo.gl/XpuHvMng7Wj2aJGY6",
    keywords: ["fakultas", "pertanian", "agroteknologi", "agribisnis", "fp", "upn", "upnyk", "kampus"]
  },

  {
    id: "ADM-001",
    name: "Gedung Rektorat",
    category: "administrative",
    description: "Pusat administrasi universitas dan layanan pimpinan UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7622325,
    lng: 110.4092788,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rektorat+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rektorat+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/fYRHiCUnePbAVWuSA",
    sourceUrl: "https://maps.app.goo.gl/fYRHiCUnePbAVWuSA",
    keywords: ["gedung", "rektorat", "administrasi", "pimpinan", "rektor", "upn", "upnyk", "kampus"]
  },

  {
    id: "AKD-002",
    name: "Auditorium W.R. Supratman",
    category: "academic",
    description: "Auditorium utama untuk kegiatan universitas, seminar, wisuda, dan acara akademik.",
    campusId: "campus1",
    lat: -7.7614619,
    lng: 110.408117,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Auditorium+WR+Supratman+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Auditorium+WR+Supratman+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/Pw55P2hgFpASV72Q9",
    sourceUrl: "https://maps.app.goo.gl/Pw55P2hgFpASV72Q9",
    keywords: ["auditorium", "wr", "supratman", "wisuda", "seminar", "aula", "upn", "upnyk", "kampus"]
  },

  {
    id: "AKD-001",
    name: "Perpustakaan Yos Sudarso",
    category: "academic",
    description: "Perpustakaan universitas yang menyediakan layanan koleksi, ruang baca, dan sumber informasi untuk sivitas akademika.",
    campusId: "campus1",
    lat: -7.7618375,
    lng: 110.4099565,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Perpustakaan+Yos+Sudarso+UPN",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Perpustakaan+Yos+Sudarso+UPN",
    source: "Google Maps shortlink maps.app.goo.gl/GUejk2n1UxvPavLaA",
    sourceUrl: "https://maps.app.goo.gl/GUejk2n1UxvPavLaA",
    keywords: ["perpustakaan", "yos", "sudarso", "library", "buku", "koleksi", "upn", "upnyk", "kampus"]
  },

  {
    id: "LAB-001",
    name: "Laboratorium Riset Terpadu",
    category: "laboratory",
    description: "Unit laboratorium terpadu yang mendukung pengujian, praktikum, dan kegiatan riset universitas.",
    campusId: "campus1",
    lat: -7.7637557,
    lng: 110.4096854,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Laboratorium+Riset+Terpadu+UPN+Veteran",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Laboratorium+Riset+Terpadu+UPN+Veteran",
    source: "Google Maps shortlink maps.app.goo.gl/aWh5ABbT7TNAgRL7A",
    sourceUrl: "https://maps.app.goo.gl/aWh5ABbT7TNAgRL7A",
    keywords: ["laboratorium", "riset", "terpadu", "lab", "praktikum", "penelitian", "upn", "upnyk", "kampus"]
  },

  {
    id: "WRS-001",
    name: "Masjid Nurul Taqwa",
    category: "worship",
    description: "Masjid di area Kampus I UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7632491,
    lng: 110.4080553,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Masjid+Nurul+Taqwa+UPN+Veteran",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Masjid+Nurul+Taqwa+UPN+Veteran",
    source: "Google Maps shortlink maps.app.goo.gl/4iK2b8vFC5M8DgjaA",
    sourceUrl: "https://maps.app.goo.gl/4iK2b8vFC5M8DgjaA",
    keywords: ["masjid", "nurul", "taqwa", "mushola", "ibadah", "sholat", "upn", "upnyk", "kampus"]
  },

  {
    id: "HLT-001",
    name: "Klinik Pratama UPN",
    category: "health",
    description: "Layanan kesehatan tingkat pertama untuk sivitas akademika UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7631427,
    lng: 110.4076071,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Klinik+Pratama+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Klinik+Pratama+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/fDpCXU6DyhzGKoUK8",
    sourceUrl: "https://maps.app.goo.gl/fDpCXU6DyhzGKoUK8",
    keywords: ["klinik", "pratama", "kesehatan", "dokter", "medis", "upn", "upnyk", "kampus"]
  },

  {
    id: "ACC-001",
    name: "Asrama Mahasiswa",
    category: "accommodation",
    description: "Fasilitas asrama mahasiswa UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7631455,
    lng: 110.4073908,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Asrama+Mahasiswa+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Asrama+Mahasiswa+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/gFGDGeZ9bjwVQSjQ8",
    sourceUrl: "https://maps.app.goo.gl/gFGDGeZ9bjwVQSjQ8",
    keywords: ["asrama", "mahasiswa", "penginapan", "akomodasi", "menginap", "upn", "upnyk", "kampus"]
  },

  {
    id: "SVC-007",
    name: "Rumah Kaca / Greenhouse",
    category: "services",
    description: "Fasilitas rumah kaca/greenhouse untuk kegiatan pembelajaran dan praktik bidang pertanian.",
    campusId: "campus1",
    lat: -7.7624724,
    lng: 110.4102692,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Greenhouse+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Greenhouse+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/tkHL7SxptgwvHgkR6",
    sourceUrl: "https://maps.app.goo.gl/tkHL7SxptgwvHgkR6",
    keywords: ["greenhouse", "rumah", "kaca", "pertanian", "praktik", "upn", "upnyk", "kampus"]
  },

  {
    id: "SPT-001",
    name: "Lapangan Sepak Bola",
    category: "sports",
    description: "Lapangan sepak bola di Kampus I UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7627452,
    lng: 110.4091343,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lapangan+Sepak+Bola+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Lapangan+Sepak+Bola+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/fRxR8g3Bsrs7SsvA7",
    sourceUrl: "https://maps.app.goo.gl/fRxR8g3Bsrs7SsvA7",
    keywords: ["lapangan", "sepak", "bola", "olahraga", "futsal", "upn", "upnyk", "kampus"]
  },

  {
    id: "FNB-001",
    name: "Kantin / Food Court",
    category: "food",
    description: "Area kantin dan food court untuk kebutuhan makan dan minum mahasiswa Kampus I.",
    campusId: "campus1",
    lat: -7.7621462,
    lng: 110.4074371,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kantin+UPN+Veteran+Yogyakarta+Kampus+1",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kantin+UPN+Veteran+Yogyakarta+Kampus+1",
    source: "Google Maps shortlink maps.app.goo.gl/JZVqk6yKkKcmVFLF9",
    sourceUrl: "https://maps.app.goo.gl/JZVqk6yKkKcmVFLF9",
    keywords: ["kantin", "food", "court", "makan", "makanan", "minuman", "kuliner", "lapar", "upn", "upnyk", "kampus"]
  },

  {
    id: "SVC-001",
    name: "ATM Center",
    category: "services",
    description: "Fasilitas ATM BRI di kawasan Kampus I UPN Veteran Yogyakarta.",
    campusId: "campus1",
    lat: -7.7610846,
    lng: 110.4090563,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=ATM+UPN+Veteran+Yogyakarta+Kampus+1",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=ATM+UPN+Veteran+Yogyakarta+Kampus+1",
    source: "Google Maps shortlink maps.app.goo.gl/7f51i58Nq5Unc4j48",
    sourceUrl: "https://maps.app.goo.gl/7f51i58Nq5Unc4j48",
    keywords: ["atm", "center", "bank", "tarik", "tunai", "transfer", "upn", "upnyk", "kampus"]
  },

  {
    id: "PRK-003",
    name: "Area Parkir Auditorium",
    category: "parking",
    description: "Area parkir kendaraan di sekitar Auditorium W.R. Supratman Kampus I.",
    campusId: "campus1",
    lat: -7.7608508,
    lng: 110.4082497,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parkir+Auditorium+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Parkir+Auditorium+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/QH4gEtB9XwHHutVc9",
    sourceUrl: "https://maps.app.goo.gl/QH4gEtB9XwHHutVc9",
    keywords: ["parkir", "parkiran", "auditorium", "motor", "mobil", "kendaraan", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 1 – PROGRAM STUDI (FTME)
  ============================================================ */

  {
    id: "PS-001",
    name: "Program Studi Teknik Geologi",
    category: "academic",
    description: "Program Studi Teknik Geologi di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Geologi+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Geologi+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "geologi", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-002",
    name: "Program Studi Teknik Pertambangan",
    category: "academic",
    description: "Program Studi Teknik Pertambangan di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Pertambangan+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Pertambangan+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "pertambangan", "tambang", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-003",
    name: "Program Studi Teknik Perminyakan",
    category: "academic",
    description: "Program Studi Teknik Perminyakan di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Perminyakan+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Perminyakan+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "perminyakan", "minyak", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-004",
    name: "Program Studi Teknik Lingkungan",
    category: "academic",
    description: "Program Studi Teknik Lingkungan di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Lingkungan+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Lingkungan+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "lingkungan", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-005",
    name: "Program Studi Teknik Geofisika",
    category: "academic",
    description: "Program Studi Teknik Geofisika di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Geofisika+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Geofisika+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "geofisika", "fisika", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-006",
    name: "Program Studi Teknik Geomatika",
    category: "academic",
    description: "Program Studi Teknik Geomatika di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Geomatika+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Geomatika+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "geomatika", "geodesi", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-007",
    name: "Program Studi Teknik Metalurgi",
    category: "academic",
    description: "Program Studi Teknik Metalurgi di Fakultas Teknologi Mineral dan Energi (FTME) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.763013,
    lng: 110.409955,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Metalurgi+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Metalurgi+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTME (maps.app.goo.gl/1j7qQfDJRHMqWR6a8)",
    sourceUrl: "https://ftmineral.upnyk.ac.id/id",
    keywords: ["teknik", "metalurgi", "logam", "material", "program", "studi", "ftme", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 1 – PROGRAM STUDI (FEB)
  ============================================================ */

  {
    id: "PS-008",
    name: "Program Studi Manajemen",
    category: "academic",
    description: "Program Studi Manajemen di Fakultas Ekonomi dan Bisnis (FEB) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622683,
    lng: 110.4081048,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Manajemen+FEB+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Manajemen+FEB+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FEB (maps.app.goo.gl/eJAQrpkUTkq1uCaF9)",
    sourceUrl: "https://feb.upnyk.ac.id/",
    keywords: ["manajemen", "program", "studi", "feb", "bisnis", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-009",
    name: "Program Studi Akuntansi",
    category: "academic",
    description: "Program Studi Akuntansi di Fakultas Ekonomi dan Bisnis (FEB) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622683,
    lng: 110.4081048,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Akuntansi+FEB+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Akuntansi+FEB+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FEB (maps.app.goo.gl/eJAQrpkUTkq1uCaF9)",
    sourceUrl: "https://feb.upnyk.ac.id/",
    keywords: ["akuntansi", "program", "studi", "feb", "keuangan", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-010",
    name: "Program Studi Ekonomi Pembangunan",
    category: "academic",
    description: "Program Studi Ekonomi Pembangunan di Fakultas Ekonomi dan Bisnis (FEB) Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622683,
    lng: 110.4081048,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ekonomi+Pembangunan+FEB+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ekonomi+Pembangunan+FEB+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FEB (maps.app.goo.gl/eJAQrpkUTkq1uCaF9)",
    sourceUrl: "https://feb.upnyk.ac.id/",
    keywords: ["ekonomi", "pembangunan", "program", "studi", "feb", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 1 – PROGRAM STUDI (FP)
  ============================================================ */

  {
    id: "PS-011",
    name: "Program Studi Agroteknologi",
    category: "academic",
    description: "Program Studi Agroteknologi di Fakultas Pertanian Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622289,
    lng: 110.410761,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Agroteknologi+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Agroteknologi+UPN+Veteran+Yogyakarta",
    source: "Titik gedung Fakultas Pertanian (maps.app.goo.gl/XpuHvMng7Wj2aJGY6)",
    sourceUrl: "https://upnyk.ac.id/page/pendidikan",
    keywords: ["agroteknologi", "agro", "pertanian", "program", "studi", "fp", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-012",
    name: "Program Studi Agribisnis",
    category: "academic",
    description: "Program Studi Agribisnis di Fakultas Pertanian Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622289,
    lng: 110.410761,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Agribisnis+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Agribisnis+UPN+Veteran+Yogyakarta",
    source: "Titik gedung Fakultas Pertanian (maps.app.goo.gl/XpuHvMng7Wj2aJGY6)",
    sourceUrl: "https://upnyk.ac.id/page/pendidikan",
    keywords: ["agribisnis", "bisnis", "pertanian", "program", "studi", "fp", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-013",
    name: "Program Studi Ilmu Tanah",
    category: "academic",
    description: "Program Studi Ilmu Tanah di Fakultas Pertanian Kampus I Condongcatur.",
    campusId: "campus1",
    lat: -7.7622289,
    lng: 110.410761,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ilmu+Tanah+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ilmu+Tanah+UPN+Veteran+Yogyakarta",
    source: "Titik gedung Fakultas Pertanian (maps.app.goo.gl/XpuHvMng7Wj2aJGY6)",
    sourceUrl: "https://upnyk.ac.id/page/pendidikan",
    keywords: ["ilmu", "tanah", "pertanian", "program", "studi", "fp", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 2 – PROGRAM STUDI (FTI)
  ============================================================ */

  {
    id: "PS-014",
    name: "Program Studi Teknik Kimia (S1)",
    category: "academic",
    description: "Program Studi Teknik Kimia S1 di Fakultas Teknik Industri (FTI) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824741,
    lng: 110.4157263,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Kimia+S1+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Kimia+S1+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTI (maps.app.goo.gl/tRG7cwf9cGxUV85BA)",
    sourceUrl: "https://fit.upnyk.ac.id/",
    keywords: ["teknik", "kimia", "s1", "program", "studi", "fti", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-015",
    name: "Program Studi Teknik Kimia (D3)",
    category: "academic",
    description: "Program Studi Teknik Kimia D3 di Fakultas Teknik Industri (FTI) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824741,
    lng: 110.4157263,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Kimia+D3+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Kimia+D3+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTI (maps.app.goo.gl/tRG7cwf9cGxUV85BA)",
    sourceUrl: "https://fit.upnyk.ac.id/",
    keywords: ["teknik", "kimia", "d3", "diploma", "program", "studi", "fti", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-016",
    name: "Program Studi Teknik Industri",
    category: "academic",
    description: "Program Studi Teknik Industri S1 di Fakultas Teknik Industri (FTI) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824741,
    lng: 110.4157263,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Teknik+Industri+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Teknik+Industri+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FTI (maps.app.goo.gl/tRG7cwf9cGxUV85BA)",
    sourceUrl: "https://fit.upnyk.ac.id/",
    keywords: ["teknik", "industri", "program", "studi", "fti", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-021",
    name: "Program Studi Informatika",
    category: "academic",
    description: "Program Studi Informatika di Fakultas Teknik Industri (FTI) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7823031,
    lng: 110.4159049,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Prodi+Informatika+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Prodi+Informatika+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/LCjpbgi69YEwzjRn7",
    sourceUrl: "https://maps.app.goo.gl/LCjpbgi69YEwzjRn7",
    keywords: ["program", "studi", "informatika", "if", "komputer", "fti", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-022",
    name: "Program Studi Sistem Informasi",
    category: "academic",
    description: "Program Studi Sistem Informasi di Fakultas Teknik Industri (FTI) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7823031,
    lng: 110.4159049,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Prodi+Sistem+Informasi+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Prodi+Sistem+Informasi+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/LCjpbgi69YEwzjRn7",
    sourceUrl: "https://maps.app.goo.gl/LCjpbgi69YEwzjRn7",
    keywords: ["program", "studi", "sistem", "informasi", "si", "fti", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 2 – PROGRAM STUDI (FISIP)
  ============================================================ */

  {
    id: "PS-017",
    name: "Program Studi Ilmu Hubungan Internasional",
    category: "academic",
    description: "Program Studi Ilmu Hubungan Internasional di Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.782105,
    lng: 110.4144789,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hubungan+Internasional+FISIP+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Hubungan+Internasional+FISIP+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FISIP (maps.app.goo.gl/gTpPWYnV7dbPgAzZ9)",
    sourceUrl: "https://fisip.upnyk.ac.id/",
    keywords: ["hubungan", "internasional", "hi", "program", "studi", "fisip", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-018",
    name: "Program Studi Ilmu Administrasi Bisnis",
    category: "academic",
    description: "Program Studi Ilmu Administrasi Bisnis di Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.782105,
    lng: 110.4144789,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Administrasi+Bisnis+FISIP+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Administrasi+Bisnis+FISIP+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FISIP (maps.app.goo.gl/gTpPWYnV7dbPgAzZ9)",
    sourceUrl: "https://fisip.upnyk.ac.id/",
    keywords: ["administrasi", "bisnis", "ab", "program", "studi", "fisip", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-019",
    name: "Program Studi Ilmu Komunikasi",
    category: "academic",
    description: "Program Studi Ilmu Komunikasi di Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.782105,
    lng: 110.4144789,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ilmu+Komunikasi+FISIP+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ilmu+Komunikasi+FISIP+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FISIP (maps.app.goo.gl/gTpPWYnV7dbPgAzZ9)",
    sourceUrl: "https://fisip.upnyk.ac.id/",
    keywords: ["ilmu", "komunikasi", "ikom", "program", "studi", "fisip", "upn", "upnyk", "kampus"]
  },

  {
    id: "PS-020",
    name: "Program Studi Hubungan Masyarakat",
    category: "academic",
    description: "Program Studi Hubungan Masyarakat (Humas) di Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.782105,
    lng: 110.4144789,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hubungan+Masyarakat+FISIP+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Hubungan+Masyarakat+FISIP+UPN+Veteran+Yogyakarta",
    source: "Titik gedung FISIP (maps.app.goo.gl/gTpPWYnV7dbPgAzZ9)",
    sourceUrl: "https://fisip.upnyk.ac.id/",
    keywords: ["hubungan", "masyarakat", "humas", "pr", "public", "relations", "program", "studi", "fisip", "upn", "upnyk", "kampus"]
  },

  /* ============================================================
     KAMPUS 2 – BABARSARI
  ============================================================ */

  {
    id: "FAC-004",
    name: "Fakultas Teknik Industri (FTI)",
    category: "academic",
    description: "Fakultas yang menaungi bidang Teknik Kimia, Teknik Industri, Informatika, dan Sistem Informasi. Berlokasi di Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824741,
    lng: 110.4157263,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fakultas+Teknik+Industri+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Fakultas+Teknik+Industri+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/tRG7cwf9cGxUV85BA",
    sourceUrl: "https://maps.app.goo.gl/tRG7cwf9cGxUV85BA",
    keywords: ["fakultas", "teknik", "industri", "fti", "informatika", "sistem", "informasi", "upn", "upnyk", "kampus"]
  },

  {
    id: "FAC-005",
    name: "Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)",
    category: "academic",
    description: "Fakultas yang menaungi bidang Administrasi Bisnis, Hubungan Internasional, dan Ilmu Komunikasi. Berlokasi di Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.782105,
    lng: 110.4144789,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=FISIP+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=FISIP+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/gTpPWYnV7dbPgAzZ9",
    sourceUrl: "https://maps.app.goo.gl/gTpPWYnV7dbPgAzZ9",
    keywords: ["fakultas", "ilmu", "sosial", "politik", "fisip", "komunikasi", "hubungan", "internasional", "upn", "upnyk", "kampus"]
  },



  {
    id: "AKD-007",
    name: "Gedung Jurusan Teknik Industri (Gedung Cipto Mangunkusumo)",
    category: "academic",
    description: "Gedung Jurusan Teknik Industri (Gedung Cipto Mangunkusumo) di Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824237,
    lng: 110.4153323,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gedung+Teknik+Industri+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Gedung+Teknik+Industri+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/5pz8JCjJyVPXsrCfA",
    sourceUrl: "https://maps.app.goo.gl/5pz8JCjJyVPXsrCfA",
    keywords: ["gedung", "teknik", "industri", "cipto", "mangunkusumo", "kuliah", "fti", "upn", "upnyk", "kampus"]
  },

  {
    id: "AKD-004",
    name: "Museum Geoteknologi Mineral",
    category: "academic",
    description: "Museum kampus yang berkaitan dengan geoteknologi dan mineral, berlokasi di Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7816997,
    lng: 110.4146097,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+Geoteknologi+Mineral+UPN",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Museum+Geoteknologi+Mineral+UPN",
    source: "Google Maps shortlink maps.app.goo.gl/WZCEQPrjKmyaWVt4A",
    sourceUrl: "https://maps.app.goo.gl/WZCEQPrjKmyaWVt4A",
    keywords: ["museum", "geoteknologi", "mineral", "geologi", "koleksi", "upn", "upnyk", "kampus"]
  },

  {
    id: "LAB-002",
    name: "Laboratorium FTI",
    category: "laboratory",
    description: "Laboratorium Proses Manufaktur dan laboratorium lain di Fakultas Teknik Industri untuk kegiatan praktikum.",
    campusId: "campus2",
    lat: -7.7827543,
    lng: 110.4157943,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Laboratorium+FTI+UPN+Veteran+Yogyakarta",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Laboratorium+FTI+UPN+Veteran+Yogyakarta",
    source: "Google Maps shortlink maps.app.goo.gl/6cmNSpEEdBJsWb4v9",
    sourceUrl: "https://maps.app.goo.gl/6cmNSpEEdBJsWb4v9",
    keywords: ["laboratorium", "fti", "lab", "praktikum", "teknik", "manufaktur", "komputer", "upn", "upnyk", "kampus"]
  },

  {
    id: "AKD-003",
    name: "Perpustakaan FISIP",
    category: "academic",
    description: "Perpustakaan fakultas yang mendukung kegiatan belajar dan pencarian referensi mahasiswa FISIP Kampus II.",
    campusId: "campus2",
    lat: -7.7822511,
    lng: 110.4145714,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Perpustakaan+FISIP+UPN+Veteran",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Perpustakaan+FISIP+UPN+Veteran",
    source: "Google Maps shortlink maps.app.goo.gl/7374vtWeac9Hdboz5",
    sourceUrl: "https://maps.app.goo.gl/7374vtWeac9Hdboz5",
    keywords: ["perpustakaan", "fisip", "library", "buku", "koleksi", "referensi", "upn", "upnyk", "kampus"]
  },

  {
    id: "WRS-002",
    name: "Masjid Sarbini Kampus UPN",
    category: "worship",
    description: "Masjid Sarbini di area Kampus II Babarsari UPN Veteran Yogyakarta.",
    campusId: "campus2",
    lat: -7.7816372,
    lng: 110.4148396,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Masjid+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Masjid+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/ztirDoLC5WMHQC3g7",
    sourceUrl: "https://maps.app.goo.gl/ztirDoLC5WMHQC3g7",
    keywords: ["masjid", "sarbini", "mushola", "ibadah", "sholat", "salat", "kampus", "babarsari", "upn", "upnyk"]
  },

  {
    id: "FNB-002",
    name: "Kopmart BB (Kopma UPNVYK)",
    category: "food",
    description: "Koperasi mahasiswa UPNVYK – Kopmart BB, menyediakan kebutuhan sehari-hari dan makanan di Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7821953,
    lng: 110.4160842,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kantin+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kantin+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/9bXFNsXXGsG88TcX8",
    sourceUrl: "https://maps.app.goo.gl/9bXFNsXXGsG88TcX8",
    keywords: ["kopmart", "kopma", "koperasi", "kantin", "makan", "makanan", "minuman", "kuliner", "babarsari", "upn", "upnyk", "kampus"]
  },

  {
    id: "SVC-008",
    name: "ATM BRI Kampus 2",
    category: "services",
    description: "Mesin ATM BRI di area Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7824375,
    lng: 110.4143125,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=ATM+BRI+UPN+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=ATM+BRI+UPN+Babarsari",
    source: "Plus Code Google Maps 6C87+XMG",
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=ATM+BRI+UPN+Babarsari",
    keywords: ["atm", "bri", "bank", "tarik", "tunai", "transfer", "babarsari", "upn", "upnyk", "kampus"]
  },

  {
    id: "PRK-001",
    name: "Area Parkir Kampus 2 – FTI",
    category: "parking",
    description: "Area parkir motor kendaraan mahasiswa dan dosen di zona FTI Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7822099,
    lng: 110.415186,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parkir+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Parkir+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/xje6ESoRFe8KwxYx9",
    sourceUrl: "https://maps.app.goo.gl/xje6ESoRFe8KwxYx9",
    keywords: ["parkir", "parkiran", "motor", "mobil", "kendaraan", "fti", "babarsari", "upn", "upnyk", "kampus"]
  },

  {
    id: "PRK-002",
    name: "Area Parkir Kampus 2 – FISIP",
    category: "parking",
    description: "Area parkir motor kendaraan mahasiswa dan dosen di zona FISIP Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7820564,
    lng: 110.4144889,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parkir+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Parkir+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/iGazCa34onxHT3T86",
    sourceUrl: "https://maps.app.goo.gl/iGazCa34onxHT3T86",
    keywords: ["parkir", "parkiran", "motor", "mobil", "kendaraan", "fisip", "babarsari", "upn", "upnyk", "kampus"]
  },

  {
    id: "SPT-005",
    name: "Sarana Olahraga Kampus 2",
    category: "sports",
    description: "Lapangan bulutangkis dan sarana olahraga lainnya di area Kampus II Babarsari.",
    campusId: "campus2",
    lat: -7.7817681,
    lng: 110.4150086,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lapangan+Olahraga+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Lapangan+Olahraga+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/bHzarMQSHV9KrUgu8",
    sourceUrl: "https://maps.app.goo.gl/bHzarMQSHV9KrUgu8",
    keywords: ["olahraga", "lapangan", "bulutangkis", "badminton", "voli", "basket", "babarsari", "upn", "upnyk", "kampus"]
  },

  {
    id: "SPT-006",
    name: "Lapangan Basket dan Voli Kampus 2",
    category: "sports",
    description: "Lapangan basket dan voli di area Kampus II Babarsari UPN Veteran Yogyakarta.",
    campusId: "campus2",
    lat: -7.782667,
    lng: 110.415201,
    status: "verified",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lapangan+Basket+Voli+UPN+Veteran+Yogyakarta+Babarsari",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Lapangan+Basket+Voli+UPN+Veteran+Yogyakarta+Babarsari",
    source: "Google Maps shortlink maps.app.goo.gl/tFEaEWNrGUcJjrC87",
    sourceUrl: "https://maps.app.goo.gl/tFEaEWNrGUcJjrC87",
    keywords: ["lapangan", "basket", "voli", "olahraga", "bola", "babarsari", "upn", "upnyk", "kampus"]
  }

];

/* ============================================================
   PEMROSESAN DATA
   - type   : 'faculty' | 'program' | 'facility'
   - parentId: fakultas induk untuk program studi, sehingga
     program studi tidak menumpuk sebagai marker di peta.
============================================================ */

(function enrichFacilities() {
  // Program studi yang titiknya tidak sama persis dengan titik fakultas.
  const EXPLICIT_PARENT = { 'PS-021': 'FAC-004', 'PS-022': 'FAC-004' };

  const faculties = FACILITIES.filter(item => item.id.startsWith('FAC-'));

  FACILITIES.forEach(item => {
    if (item.id.startsWith('FAC-')) item.type = 'faculty';
    else if (item.id.startsWith('PS-')) item.type = 'program';
    else item.type = 'facility';
  });

  FACILITIES.filter(item => item.type === 'program').forEach(program => {
    const parent =
      faculties.find(f => f.id === EXPLICIT_PARENT[program.id]) ||
      faculties.find(f => f.campusId === program.campusId && f.lat === program.lat && f.lng === program.lng);
    if (parent) program.parentId = parent.id;
  });
})();

/* ============================================================
   FUNGSI UTILITAS
============================================================ */

const CAMPUS_LABEL = { campus1: 'Kampus 1 Condongcatur', campus2: 'Kampus 2 Babarsari' };

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasPoint(item) {
  return item.status === 'verified' && Number.isFinite(item.lat) && Number.isFinite(item.lng);
}

function getFacilities(categoryId = null, campusId = null) {
  let result = FACILITIES;
  if (categoryId && categoryId !== 'all') result = result.filter(item => item.category === categoryId);
  if (campusId && campusId !== 'all') result = result.filter(item => item.campusId === campusId);
  return result;
}

function getVerifiedFacilities(campusId = null) {
  return getFacilities(null, campusId).filter(hasPoint);
}

function getUnlocatedFacilities(campusId = null) {
  return getFacilities(null, campusId).filter(item => !hasPoint(item));
}

/** Program studi milik sebuah fakultas. */
function getChildren(parentId) {
  return FACILITIES.filter(item => item.parentId === parentId);
}

/**
 * Pencarian berbasis token: setiap kata pada kueri harus ditemukan
 * (urutan bebas). Hasil diurutkan berdasarkan relevansi.
 */
function searchFacilities(query = '', categoryId = null, campusId = null) {
  const list = getFacilities(categoryId, campusId);
  const phrase = normalize(query);
  if (!phrase) return list;

  const tokens = phrase.split(' ');

  return list
    .map(item => {
      const name = normalize(item.name);
      const keywords = normalize((item.keywords || []).join(' '));
      const description = normalize(item.description);
      const meta = normalize(`${CAMPUS_LABEL[item.campusId] || ''} ${(window.CampusConfig.getCategory(item.category) || {}).label || ''}`);
      const haystack = `${name} ${keywords} ${description} ${meta}`;

      // Kata kueri harus cocok di awal kata (mendukung ketikan sebagian,
      // mis. "perpus", tetapi "atm" tidak cocok dengan "matematika").
      const hit = (text, token) => (` ${text}`).includes(` ${token}`);

      if (!tokens.every(token => hit(haystack, token))) return null;

      let score = name.includes(phrase) ? 50 : 0;
      if (name.startsWith(phrase)) score += 20;
      tokens.forEach(token => {
        if (hit(name, token)) score += 10;
        if (hit(keywords, token)) score += 4;
        if (hit(description, token)) score += 1;
      });
      // Program studi diprioritaskan lebih rendah dibanding fasilitas umum
      if (item.type === 'program') score -= 3;
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'id'))
    .map(entry => entry.item);
}

function getFacilityById(id) { return FACILITIES.find(item => item.id === id) || null; }
function getCategory(id) { return window.CampusConfig.getCategory(id); }

window.CampusData = window.CampusData || {};
Object.assign(window.CampusData, {
  FACILITIES, CAMPUS_LABEL, hasPoint, getFacilities, getVerifiedFacilities,
  getUnlocatedFacilities, getChildren, searchFacilities, getFacilityById, getCategory
});
