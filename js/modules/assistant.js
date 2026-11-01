/**
 * assistant.js
 * Campus Assistant — pencarian fasilitas berbasis kata kunci.
 *
 * Alur: normalisasi → deteksi kampus → buang kata umum → deteksi
 * kategori → pencarian bertahap (nama/kata kunci, kategori, longgar)
 * → urutkan berdasarkan jarak bila diminta dan lokasi tersedia.
 */
'use strict';

const CampusAssistant = (() => {

  const MAX_RESULTS = 5;

  const INTENTS = [
    { category: 'academic', keywords: ['akademik', 'perpustakaan', 'library', 'pustaka', 'buku', 'kuliah', 'kelas', 'gedung kuliah', 'auditorium', 'seminar', 'wisuda', 'fakultas', 'museum', 'ftme', 'fti', 'feb', 'fisip', 'pertanian'] },
    { category: 'administrative', keywords: ['administrasi', 'rektorat', 'rektor', 'kantor', 'pimpinan'] },
    { category: 'laboratory', keywords: ['laboratorium', 'lab', 'praktikum', 'penelitian', 'riset'] },
    { category: 'health', keywords: ['kesehatan', 'klinik', 'dokter', 'sakit', 'medis', 'obat', 'pertolongan'] },
    { category: 'worship', keywords: ['masjid', 'mushola', 'musala', 'ibadah', 'sholat', 'salat', 'shalat'] },
    { category: 'food', keywords: ['makan', 'makanan', 'minuman', 'minum', 'kantin', 'warung', 'food court', 'kuliner', 'lapar', 'kopma', 'kopmart'] },
    { category: 'sports', keywords: ['olahraga', 'sepak bola', 'futsal', 'basket', 'voli', 'lapangan', 'bulutangkis', 'badminton'] },
    { category: 'parking', keywords: ['parkir', 'parkiran', 'motor', 'mobil', 'kendaraan'] },
    { category: 'services', keywords: ['atm', 'bank', 'fotokopi', 'print', 'cetak', 'percetakan', 'transfer', 'tarik tunai', 'layanan', 'greenhouse', 'rumah kaca'] },
    { category: 'accommodation', keywords: ['asrama', 'penginapan', 'kos', 'kamar', 'akomodasi', 'menginap'] }
  ];

  // Kata yang tidak membantu pencarian (hampir semua data memuatnya)
  const STOPWORDS = new Set([
    'di', 'ke', 'dari', 'yang', 'dan', 'atau', 'mana', 'dimana', 'dimanakah', 'apa', 'apakah', 'ada', 'adakah',
    'tolong', 'bantu', 'cari', 'carikan', 'tunjukkan', 'tunjukan', 'lihat', 'lokasi', 'letak', 'posisi',
    'saya', 'aku', 'kami', 'kita', 'mau', 'ingin', 'pengen', 'bisa', 'dong', 'ya', 'nih', 'kah', 'itu', 'ini',
    'tempat', 'daftar', 'semua', 'fasilitas', 'gedung', 'area', 'sekitar',
    'kampus', 'upn', 'upnyk', 'veteran', 'yogyakarta', 'jogja', 'universitas', 'untuk', 'sebuah', 'jam'
  ]);

  const NEARBY_WORDS = ['terdekat', 'dekat', 'sekitar sini', 'nearby'];
  const PROGRAM_WORDS = ['prodi', 'program studi', 'jurusan', 'studi', 'program'];

  const GREETINGS = ['halo', 'hai', 'hallo', 'hello', 'hi', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'assalamualaikum', 'permisi'];
  const HELP_WORDS = ['bantuan', 'help', 'cara menggunakan', 'bisa apa', 'fitur', 'panduan', 'petunjuk penggunaan'];
  const THANKS_WORDS = ['terima kasih', 'makasih', 'thanks', 'thank you', 'terimakasih'];

  /* ──────────────────────────────────────────────────────────
     NORMALISASI & PENCOCOKAN
  ────────────────────────────────────────────────────────── */

  function normalizeText(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** Cocokkan kata/frasa utuh (bukan potongan kata, mis. "lab" ≠ "tablet"). */
  function hasWord(text, keyword) {
    return (` ${text} `).includes(` ${keyword} `);
  }

  function detectCategory(query) {
    const text = normalizeText(query);
    for (const intent of INTENTS) {
      if (intent.keywords.some(keyword => hasWord(text, keyword))) return intent.category;
    }
    return null;
  }

  function isGreeting(query) {
    const text = normalizeText(query);
    return GREETINGS.some(g => text === g || text.startsWith(g + ' '));
  }

  function isHelpRequest(query) {
    const text = normalizeText(query);
    return HELP_WORDS.some(k => text.includes(k));
  }

  function isThanks(query) {
    const text = normalizeText(query);
    return THANKS_WORDS.some(k => text.includes(k));
  }

  /** Deteksi kampus yang disebut pada kalimat; null jika tidak ada. */
  function detectCampus(text) {
    if (/\bkampus\s*(2|ii|dua)\b|\bbabarsari\b/.test(text)) return 'campus2';
    if (/\bkampus\s*(1|i|satu)\b|\bcondongcatur\b|\bring\s?road\b/.test(text)) return 'campus1';
    return null;
  }

  function stripCampusPhrases(text) {
    return text
      .replace(/\bkampus\s*(1|2|i|ii|satu|dua)\b/g, ' ')
      .replace(/\b(babarsari|condongcatur)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extractTokens(text) {
    return text.split(' ').filter(token => token && !STOPWORDS.has(token));
  }

  /* ──────────────────────────────────────────────────────────
     PENCARIAN
  ────────────────────────────────────────────────────────── */

  function dedupe(list) {
    const seen = new Set();
    return list.filter(item => !seen.has(item.id) && seen.add(item.id));
  }

  /** Mengembalikan { results, via } — via: 'search' | 'category' | 'loose'. */
  function search(query, campusId, options = {}) {
    const { wantsPrograms = false, tokens = null, category = detectCategory(query) } = options;
    const words = tokens || extractTokens(normalizeText(query));
    const phrase = words.join(' ');

    let results = [];
    let via = 'search';

    // 1) Cocok pada nama / kata kunci / deskripsi (semua kata harus ditemukan)
    if (phrase) results = CampusData.searchFacilities(phrase, null, campusId);

    // 2) Kata kunci kategori saja → semua fasilitas pada kategori itu
    if (!results.length && category) {
      results = CampusData.getFacilities(category, campusId);
      via = 'category';
    }

    // 3) Pencarian longgar: salah satu kata cocok
    if (!results.length && words.length) {
      results = dedupe(words.flatMap(word => CampusData.searchFacilities(word, null, campusId)));
      via = 'loose';
    }

    // Program studi hanya tampil jika memang ditanyakan
    if (!wantsPrograms) {
      const withoutPrograms = results.filter(item => item.type !== 'program');
      if (withoutPrograms.length) results = withoutPrograms;
    }

    return { results: dedupe(results), via, phrase };
  }

  function findFacilities(query, campusId, options = {}) {
    return search(query, campusId, options).results;
  }

  function sortByDistance(list, userLocation) {
    return list
      .map(item => ({ item, distance: DistanceUtils.getDistanceToFacility(userLocation, item) }))
      .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
      .map(({ item, distance }) => ({ ...item, distance }));
  }

  /* ──────────────────────────────────────────────────────────
     RESPONS
  ────────────────────────────────────────────────────────── */

  function reply(message, facilities = [], extra = {}) {
    return { message, facilities, total: facilities.length, ...extra };
  }

  /**
   * @param {string} query        Pertanyaan pengguna
   * @param {string} campusId     ID kampus aktif ('all' | 'campus1' | 'campus2')
   * @param {Object} [context]    { userLocation }
   */
  function respond(query, campusId, context = {}) {
    const text = normalizeText(query);

    if (!text) return reply('Silakan masukkan pertanyaan terlebih dahulu.');

    if (isGreeting(text) && text.split(' ').length <= 3) {
      return reply('Halo! Saya dapat membantu menemukan perpustakaan, kantin, masjid, laboratorium, parkir, dan fasilitas kampus lainnya. Apa yang ingin Anda cari?');
    }
    if (isThanks(text)) return reply('Sama-sama! Kabari saya jika masih ada fasilitas lain yang ingin Anda cari.');
    if (isHelpRequest(text)) {
      return reply('Ketik nama atau jenis fasilitas, misalnya "Di mana perpustakaan?", "Masjid di Kampus 2", atau "Parkir terdekat". Anda juga bisa menyebut kampus (Kampus 1 atau Kampus 2), dan mengaktifkan "Lokasi Saya" di peta untuk hasil terdekat.');
    }

    // Kampus: dari kalimat jika disebut, selain itu ikut pilihan aktif
    const mentionedCampus = detectCampus(text);
    const effectiveCampus = mentionedCampus || campusId || 'all';
    const campusLabel = effectiveCampus === 'all'
      ? 'seluruh kampus'
      : (CampusData.getCampusById(effectiveCampus)?.shortName || 'kampus');

    const stripped = stripCampusPhrases(text);
    const wantsNearby = NEARBY_WORDS.some(w => hasWord(stripped, w));
    const wantsPrograms = PROGRAM_WORDS.some(w => hasWord(stripped, w));
    const tokens = extractTokens(stripped).filter(t => !NEARBY_WORDS.includes(t) && !(wantsPrograms && ['prodi', 'jurusan', 'program', 'studi'].includes(t)));
    const category = detectCategory(stripped);

    // Hanya menyebut kampus (mis. "Fasilitas di Kampus 2") → ringkasan
    if (!tokens.length && !category) {
      if (!mentionedCampus && !wantsNearby) {
        return reply('Maaf, saya belum menangkap fasilitas yang Anda maksud. Coba sebut nama atau jenis fasilitas, misalnya "kantin", "laboratorium", atau "ATM".');
      }
      const items = CampusData.getFacilities(null, effectiveCampus).filter(i => i.type !== 'program');
      const counts = {};
      items.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
      const summary = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([cat, n]) => `${CampusConfig.getCategory(cat).label} (${n})`)
        .join(', ');
      return reply(
        `Terdapat ${items.length} lokasi di ${campusLabel}: ${summary}. Sebutkan jenis fasilitas yang ingin dicari agar hasilnya lebih spesifik.`,
        [], { campusId: effectiveCampus }
      );
    }

    const found = search(stripped, effectiveCampus, { wantsPrograms, tokens, category });
    let facilities = found.results;

    if (!facilities.length) {
      return reply(`Maaf, saya belum menemukan fasilitas yang sesuai di ${campusLabel}. Coba gunakan nama fasilitas atau kategori lain, atau periksa Direktori Fasilitas.`);
    }

    const total = facilities.length;
    let nearbyNote = '';

    if (wantsNearby) {
      if (context.userLocation) {
        facilities = sortByDistance(facilities.filter(CampusData.hasPoint), context.userLocation);
        nearbyNote = ' diurutkan dari yang terdekat dengan lokasi Anda';
      } else {
        nearbyNote = ' (aktifkan "Lokasi Saya" pada peta agar dapat diurutkan berdasarkan jarak)';
      }
    }

    const shown = facilities.slice(0, MAX_RESULTS);
    const categoryInfo = category ? CampusConfig.getCategory(category) : null;
    let subject;
    if (found.via === 'category' && categoryInfo) subject = `fasilitas kategori ${categoryInfo.label}`;
    else if (found.phrase) subject = `hasil untuk "${found.phrase}"`;
    else subject = 'fasilitas yang sesuai';
    const moreNote = total > shown.length ? ` Menampilkan ${shown.length} teratas dari ${total} hasil.` : '';

    return reply(
      `Saya menemukan ${total} ${subject} di ${campusLabel}${nearbyNote}.${moreNote}`,
      shown,
      { total, category: found.via === 'category' ? category : null, campusId: effectiveCampus, query: found.phrase }
    );
  }

  return { respond, findFacilities, detectCategory, isGreeting, isHelpRequest };
})();

window.CampusAssistant = CampusAssistant;
