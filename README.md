# CampusMap — UPN "Veteran" Yogyakarta

Peta interaktif dan direktori fasilitas untuk **Kampus 1 Condongcatur** dan **Kampus 2 Babarsari**.
Dibangun dengan HTML, CSS, dan JavaScript murni + [Leaflet](https://leafletjs.com/) — tanpa proses build.

## Fitur

- **Peta interaktif** dengan tiga peta dasar (Standar, Terang, Satelit), batas kampus perkiraan, skala, dan legenda yang dapat dilipat.
- **Tiga mode kampus**: Semua Kampus (ringkasan per kampus, rincian muncul saat peta diperbesar), Kampus 1, dan Kampus 2.
- **Marker ikon SVG** per kategori; klik marker membuka panel detail (di layar sempit tampil sebagai *bottom sheet*).
- **Fakultas → Program Studi**: program studi ditampilkan di panel fakultas induknya, sehingga peta tidak penuh marker bertumpuk.
- **Pencarian cepat** (tekan `/`) dengan navigasi keyboard (↑ ↓ Enter Esc) dan penyorotan kata.
- **Direktori** dengan pencarian, filter kategori/jenis, dan urutan nama/kategori/jarak terdekat.
- **Lokasi Saya**: menampilkan posisi + akurasi, jarak garis lurus ke fasilitas, dan urutan terdekat.
- **Campus Assistant** berbasis kata kunci: memahami nama kampus ("masjid di Kampus 2"), kata "terdekat", dan menautkan hasil ke peta/direktori.
- Tautan **Google Maps** (lokasi & petunjuk arah) untuk setiap fasilitas.

## Menjalankan

1. Ekstrak folder, lalu buka `index.html` di browser **dengan koneksi internet** (Leaflet, font, dan peta dasar dimuat dari CDN).
2. Fitur *Lokasi Saya* memerlukan konteks aman. Jika tidak berfungsi saat membuka file langsung, jalankan lewat server lokal:

   ```bash
   python3 -m http.server 8000   # lalu buka http://localhost:8000
   ```

## Struktur proyek

```
index.html
css/style.css              Desain, komponen, dan responsif
js/config.js               Kategori fasilitas (label, ikon, warna)
js/app.js                  Antarmuka: navigasi, pencarian, direktori, panel detail, chat
js/data/campuses.js        Data kampus & batas perkiraan
js/data/facilities.js      Data fasilitas + fungsi pencarian
js/modules/map.js          Peta Leaflet, marker, legenda, lokasi pengguna
js/modules/campusManager.js  Kampus aktif & statistik
js/modules/assistant.js    Campus Assistant
js/utils/icons.js          Ikon SVG
js/utils/distance.js       Perhitungan jarak (Haversine)
```

## Memperbarui data

Edit `js/data/facilities.js`. Setiap entri memiliki `id`, `name`, `category`, `description`, `campusId`, `lat`, `lng`, `status`, `mapsUrl`, `directionsUrl`, dan `keywords`.

- Awalan `id` menentukan jenis: `FAC-` fakultas, `PS-` program studi, selainnya fasilitas umum.
- Program studi otomatis dikaitkan ke fakultas yang koordinatnya sama (pengecualian ditulis di `EXPLICIT_PARENT`).
- Fasilitas tanpa koordinat terverifikasi (`status` bukan `"verified"` atau `lat`/`lng` kosong) tetap muncul di direktori dan dikelompokkan pada marker area kampus — jangan mengisi koordinat perkiraan sebagai titik gedung.

## Catatan akurasi data

- Titik berstatus `verified` berasal dari tautan/Plus Code Google Maps; lakukan verifikasi lapangan sebelum dipakai sebagai data resmi.
- Program studi memakai titik fakultas induknya, bukan titik ruang/gedung program studi.
- Batas kampus pada peta hanya perkiraan, bukan batas resmi.

## Sumber informasi

- Peta kampus & alamat resmi: <https://www.upnyk.ac.id/page/peta-kampus>
- Fakultas: <https://www.upnyk.ac.id/page/pendidikan>, FEB, FISIP (<https://fisip.upnyk.ac.id/>), FTI (<https://fit.upnyk.ac.id/>), FTME (<https://ftmineral.upnyk.ac.id/id>)
- UPA Perpustakaan <https://perpus.upnyk.ac.id/> · UPA Laboratorium Terpadu <https://labterpadu.upnyk.ac.id/> · Fasilitas Sistem Informasi FTI <https://si.upnyk.ac.id/fasilitas>
- Panduan Akademik FISIP 2023–2024 (ab.upnyk.ac.id)
- Peta dasar: © OpenStreetMap contributors, © CARTO, Esri.
