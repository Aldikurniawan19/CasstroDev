# Rule Penulisan Kode

Panduan ini memastikan kode terstruktur rapi, konsisten antar file/komponen, dan mudah dideteksi oleh search engine (SEO).

---

## 1. Struktur & Konvensi Kode

- **Satu sumber kebenaran untuk styling**: pakai CSS variables / design tokens, jangan hardcode warna & ukuran berulang di banyak file. (Definisi token warna & tipografi ada di `rules-desain-tampilan.md`.)
- Struktur folder konsisten (komponen, style, assets terpisah rapi sesuai konvensi proyek).
- Penamaan class/komponen deskriptif dan konsisten (mis. `Button`, `Card`, `Badge` — bukan campuran `btn1`, `MyButton2`, `card-new`).
- Hindari CSS selector yang saling menimpa (mis. campur selector berbasis class dan element yang bikin specificity bentrok, terutama untuk padding/margin antar section).
- Setiap komponen baru dicek dulu apakah sudah ada versinya di sistem desain sebelum bikin baru dari nol.
- Responsive wajib diuji minimal di 3 breakpoint: mobile, tablet, desktop.

---

## 2. SEO (Search Engine Optimization)

Tujuan: struktur kode harus mudah dibaca dan diindeks oleh search engine (Google, Bing, dll), tanpa mengorbankan aksesibilitas atau performa.

### 2.1 Struktur HTML Semantik
- Gunakan tag semantik, bukan `<div>` untuk semuanya: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Hanya ada **satu `<h1>`** per halaman, mewakili topik utama halaman tersebut.
- Heading harus berurutan dan hierarkis (`h1` → `h2` → `h3`, jangan lompat dari `h1` langsung ke `h4`).
- Gunakan `<a>` untuk semua link internal/eksternal (bukan `<div onClick>` atau `<button>` yang berpindah halaman) supaya crawler bisa mengikuti link.

### 2.2 Meta Tag Wajib (per halaman)
```html
<title>Judul Halaman yang Deskriptif — Maks 60 karakter</title>
<meta name="description" content="Ringkasan halaman yang menarik & relevan, maks 155-160 karakter.">
<link rel="canonical" href="https://domain.com/path-halaman-ini">
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- `title` dan `description` harus **unik per halaman** — jangan disalin dari satu template ke semua halaman.
- Tambahkan Open Graph & Twitter Card untuk preview saat dibagikan:
```html
<meta property="og:title" content="Judul Halaman">
<meta property="og:description" content="Deskripsi singkat halaman.">
<meta property="og:image" content="https://domain.com/gambar-preview.jpg">
<meta property="og:url" content="https://domain.com/path-halaman-ini">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### 2.3 Data Terstruktur (Structured Data / Schema.org)
- Tambahkan JSON-LD sesuai jenis konten (Article, Product, FAQ, BreadcrumbList, Organization, dll) agar search engine paham konteks halaman dan bisa memunculkan rich snippet.
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Judul Artikel",
  "datePublished": "2026-08-12",
  "author": { "@type": "Person", "name": "Nama Penulis" }
}
</script>
```
- Validasi hasil markup dengan Rich Results Test dari Google sebelum deploy.

### 2.4 Gambar & Media
- Setiap `<img>` wajib punya atribut `alt` yang deskriptif (bukan kosong, bukan "image1.jpg").
- Gunakan `loading="lazy"` untuk gambar di luar viewport awal, tapi jangan lazy-load gambar hero/LCP (Largest Contentful Paint).
- Nama file gambar deskriptif (`sepatu-lari-merah.jpg`, bukan `IMG_2031.jpg`).
- Sediakan ukuran gambar (`width` & `height`) eksplisit untuk mencegah layout shift (CLS).

### 2.5 URL & Navigasi
- URL bersih, deskriptif, pakai huruf kecil dan tanda hubung: `/blog/tips-menulis-kode-seo`, bukan `/page?id=1234`.
- Buat `sitemap.xml` dan `robots.txt` yang selalu update dan bisa diakses di root domain.
- Gunakan breadcrumb (dengan markup `BreadcrumbList`) untuk halaman berlapis.
- Pastikan tidak ada broken link (404) dan redirect memakai 301 (permanent) untuk URL yang berubah.

### 2.6 Performa & Rendering (berpengaruh ke ranking)
- Konten utama harus ada di HTML awal (server-side render atau static generate) — jangan render konten penting hanya lewat JavaScript di client tanpa fallback, karena crawler bisa gagal membaca konten yang butuh JS berat.
- Optimalkan Core Web Vitals: **LCP** < 2.5s, **INP** < 200ms, **CLS** < 0.1.
- Minifikasi CSS/JS, kompres gambar (WebP/AVIF), gunakan CDN jika perlu.
- Hindari pop-up/interstitial yang menutupi konten utama saat halaman baru dibuka (mengurangi skor mobile-friendliness).

### 2.7 Aksesibilitas = SEO
- Struktur yang aksesibel (label form yang benar, kontras warna cukup, navigasi keyboard) juga membantu crawler memahami halaman — dua kebutuhan ini saling melengkapi, bukan terpisah.

---

## 3. Checklist Sebelum Selesai

- [ ] Kode mengikuti struktur folder & penamaan yang konsisten.
- [ ] Tidak ada style/CSS hardcoded yang seharusnya pakai token dari sistem desain.
- [ ] Tidak ada CSS selector yang saling menimpa/bentrok.
- [ ] Sudah diuji responsive di 3 breakpoint (mobile, tablet, desktop).
- [ ] Setiap halaman punya `<title>` dan `meta description` yang unik.
- [ ] HTML pakai tag semantik, hanya satu `<h1>` per halaman.
- [ ] Semua gambar punya `alt` deskriptif dan ukuran eksplisit.
- [ ] URL bersih dan deskriptif, sitemap.xml & robots.txt tersedia.
- [ ] Konten utama bisa dibaca crawler tanpa bergantung penuh pada JS client-side.
- [ ] Core Web Vitals (LCP, INP, CLS) dalam batas wajar.
