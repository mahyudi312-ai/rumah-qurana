// =====================================================
// DATA BUKU — Rumah Quran Al-Hikmah
// =====================================================
// Cara mengedit:
// - Buku GRATIS  → isi "downloadUrl" dengan link Google Drive
// - Buku BERBAYAR → isi "buyUrl" dengan link Lynk.ID/KaryaKarsa
// - "category" bisa diisi lebih dari satu: ["tahsin", "fiqih"]
// - "cover" → isi "images/namafile.jpg" atau kosongkan ""
// =====================================================

const books = [
  {
    title: "Panduan Praktis Tahsin",
    author: "Ustadz Ahmad Fauzi",
    category: ["tahsin"],
    type: "gratis",
    price: 0,
    desc: "Buku panduan lengkap memperbaiki bacaan Al-Qur'an sesuai kaidah tajwid, dilengkapi contoh dan latihan.",
    cover: "",
    downloadUrl: "https://drive.google.com/file/d/CONTOH-LINK/view",
    pages: 120,
    year: 2024
  },
  {
    title: "Metode Cepat Hafal Juz 30",
    author: "Ustadzah Siti Khadijah",
    category: ["tahfidz"],
    type: "gratis",
    price: 0,
    desc: "Strategi menghafal Juz 30 dengan teknik pengulangan yang efektif, cocok untuk anak dan dewasa.",
    cover: "",
    downloadUrl: "https://drive.google.com/file/d/CONTOH-LINK/view",
    pages: 85,
    year: 2024
  },
  {
    title: "Fiqih Shalat untuk Pemula",
    author: "Ustadz Yusuf Ibrahim",
    category: ["fiqih"],
    type: "gratis",
    price: 0,
    desc: "Panduan lengkap tata cara shalat sesuai sunnah, mulai dari bersuci hingga salam.",
    cover: "",
    downloadUrl: "https://drive.google.com/file/d/CONTOH-LINK/view",
    pages: 150,
    year: 2023
  },
  {
    title: "Kumpulan Doa Harian",
    author: "Tim Rumah Quran Al-Hikmah",
    category: ["fiqih", "parenting"],
    type: "gratis",
    price: 0,
    desc: "Kumpulan doa-doa harian pilihan yang disertai arti dan cara membacanya.",
    cover: "",
    downloadUrl: "https://drive.google.com/file/d/CONTOH-LINK/view",
    pages: 60,
    year: 2023
  },
  {
    title: "Belajar Tajwid dari Nol",
    author: "Ustadz Ahmad Fauzi",
    category: ["tahsin"],
    type: "gratis",
    price: 0,
    desc: "Panduan belajar tajwid untuk pemula, dari makhorijul huruf hingga hukum bacaan lengkap.",
    cover: "",
    downloadUrl: "https://drive.google.com/file/d/CONTOH-LINK/view",
    pages: 95,
    year: 2024
  },
  {
    title: "Mendidik Anak Cinta Al-Qur'an",
    author: "Ustadzah Siti Khadijah",
    category: ["parenting"],
    type: "berbayar",
    price: 45000,
    desc: "Panduan praktis untuk orang tua dalam menumbuhkan kecintaan anak terhadap Al-Qur'an sejak dini.",
    cover: "",
    buyUrl: "https://lynk.id/username-anda/mendidik-anak",
    pages: 180,
    year: 2024
  },
  {
    title: "Tajwid Lengkap Bergambar",
    author: "Ustadz Ahmad Fauzi",
    category: ["tahsin"],
    type: "berbayar",
    price: 65000,
    desc: "Buku tajwid dengan ilustrasi dan contoh yang memudahkan pemahaman makhorijul huruf dan hukum bacaan.",
    cover: "",
    buyUrl: "https://lynk.id/username-anda/tajwid-lengkap",
    pages: 200,
    year: 2024
  },
  {
    title: "90 Hari Hafal 1 Juz",
    author: "Ustadzah Nur Aini",
    category: ["tahfidz"],
    type: "berbayar",
    price: 55000,
    desc: "Program terstruktur 90 hari untuk menghafal 1 juz dengan target harian dan muroja'ah terukur.",
    cover: "",
    buyUrl: "https://lynk.id/username-anda/90-hari-1-juz",
    pages: 140,
    year: 2024
  },
  {
    title: "Fiqih Ibadah Sehari-hari",
    author: "Ustadz Yusuf Ibrahim",
    category: ["fiqih"],
    type: "berbayar",
    price: 75000,
    desc: "Panduan fiqih praktis untuk ibadah sehari-hari: thaharah, shalat, puasa, zakat, dan haji.",
    cover: "",
    buyUrl: "https://lynk.id/username-anda/fiqih-ibadah",
    pages: 260,
    year: 2024
  }
];

// =====================================================
// LOGIKA FILTER & SEARCH (tidak perlu diubah)
// =====================================================

const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

let activeFilter = 'all';
let searchQuery = '';

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

function renderBooks() {
  if (!booksGrid) return;

  const filtered = books.filter(book => {
    const matchFilter = activeFilter === 'all'
      || book.type === activeFilter
      || book.category.includes(activeFilter);

    const q = searchQuery.toLowerCase();
    const matchSearch = q === ''
      || book.title.toLowerCase().includes(q)
      || book.author.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    booksGrid.innerHTML = '<div class="no-result">😔 Tidak ada buku yang cocok dengan pencarian Anda.</div>';
    return;
  }

  booksGrid.innerHTML = filtered.map(book => {
    const isFree = book.type === 'gratis';
    const badge = isFree
      ? '<span class="book-badge">GRATIS</span>'
      : '<span class="book-badge paid">BERBAYAR</span>';

    const coverContent = book.cover
      ? `<img src="${book.cover}" alt="${book.title}">`
      : `<span>${book.title}</span>`;

    const priceText = isFree
      ? '<p class="book-price free">Gratis</p>'
      : `<p class="book-price">${formatRupiah(book.price)}</p>`;

    const actionBtn = isFree
      ? `<a href="${book.downloadUrl}" target="_blank" rel="noopener" class="btn-sm btn-download">⬇ Unduh PDF</a>`
      : `<a href="${book.buyUrl}" target="_blank" rel="noopener" class="btn-sm btn-buy">🛒 Beli Sekarang</a>`;

    return `
      <div class="book-card">
        <div class="book-cover">
          ${badge}
          ${coverContent}
        </div>
        <div class="book-info">
          <h3>${book.title}</h3>
          <p class="book-author">✍ ${book.author} · ${book.year}</p>
          <p class="book-desc">${book.desc}</p>
          ${priceText}
          <div class="book-actions">${actionBtn}</div>
        </div>
      </div>
    `;
  }).join('');
}

function updateStats() {
  const totalEl = document.getElementById('totalBooks');
  const freeEl = document.getElementById('freeBooks');
  const paidEl = document.getElementById('paidBooks');
  if (!totalEl) return;

  totalEl.textContent = books.length;
  freeEl.textContent = books.filter(b => b.type === 'gratis').length;
  paidEl.textContent = books.filter(b => b.type === 'berbayar').length;
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderBooks();
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderBooks();
  });
});

if (booksGrid) {
  updateStats();
  renderBooks();
}