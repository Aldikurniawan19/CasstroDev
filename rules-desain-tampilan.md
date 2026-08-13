# Rule Desain Tampilan

Panduan ini memastikan setiap tampilan baru konsisten, terasa "dirancang dengan sengaja", dan tidak jatuh ke pola generik ala AI ("AI-slop").

---

## 1. Prinsip Utama

1. **Konsisten dulu, kreatif kemudian.** Semua komponen baru harus mengikuti sistem desain yang sudah ada (warna, tipografi, spacing) sebelum menambahkan hal baru.
2. **Setiap keputusan visual harus punya alasan.** Kalau tidak bisa menjelaskan kenapa suatu warna/spacing/animasi dipakai, kemungkinan itu default template — ganti.
3. **Hindari "AI-slop design"** — tampilan generik yang langsung terlihat auto-generated. Contoh pola yang harus dihindari kecuali memang diminta:
   - Background krem hangat + font serif kontras tinggi + aksen warna terracotta/oranye kecoklatan.
   - Background hitam pekat + satu aksen warna neon (hijau/vermilion) tanpa alasan brand.
   - Layout "koran" dengan garis tipis, sudut kotak (border-radius 0), kolom rapat, tanpa konteks yang mendukung.
   - Kartu dengan ikon bulat + judul + deskripsi generik, diulang 3x, tanpa hierarki nyata.
   - Gradient ungu-biru sebagai default background hero.
   - Badge/angka "01 02 03" dipakai padahal kontennya bukan urutan/proses nyata.

---

## 2. Sistem Warna (Design Tokens)

- Tentukan **4–6 warna** dengan nama & hex value tetap di satu file (mis. `tokens/colors.md` atau `:root` CSS variables). Jangan hardcode hex di banyak tempat.
- Struktur minimal:
  - `--color-bg` (background utama)
  - `--color-surface` (card/panel)
  - `--color-text-primary` / `--color-text-secondary`
  - `--color-accent` (1 warna aksen utama, dipakai konsisten untuk CTA/highlight)
  - `--color-border`
  - `--color-danger` / `--color-success` (jika perlu status)
- **Satu warna aksen dominan.** Jangan pakai 3-4 warna terang sekaligus dalam satu tampilan.
- Pastikan kontras teks vs background memenuhi standar aksesibilitas (WCAG AA minimum, rasio ≥ 4.5:1 untuk teks normal).
- Warna gelap/terang (dark/light mode) harus didefinisikan sebagai variasi dari token yang sama, bukan file/logic terpisah yang bisa "ngaco".

---

## 3. Tipografi

- Maksimal **2 font family**: satu untuk display/heading (boleh berkarakter), satu untuk body/teks panjang (mudah dibaca).
- Tentukan **type scale** tetap (mis. 12/14/16/20/24/32/48px) — jangan pakai ukuran font sembarangan per komponen.
- Line-height dan letter-spacing konsisten per level heading/body.
- Jangan campur terlalu banyak font weight dalam satu blok teks (maksimal 2: reguler + semi-bold/bold).

---

## 4. Layout & Spacing

- Gunakan **spacing scale** kelipatan tetap (mis. 4px/8px: 4, 8, 12, 16, 24, 32, 48, 64px). Jangan pakai angka acak seperti 13px atau 27px.
- Grid/container width konsisten di seluruh halaman (mis. max-width 1200px, padding horizontal 24px di mobile).
- Border-radius punya nilai tetap (mis. hanya pakai 4px, 8px, 16px — jangan campur banyak nilai berbeda tanpa alasan).
- Hierarki visual harus jelas: judul > subjudul > body > caption, dibedakan lewat ukuran/weight/warna, bukan sekadar bold semua.

---

## 5. Komponen & Interaksi

- Semua tombol, input, card, badge harus reusable — buat sebagai komponen, jangan duplikasi style inline berulang-ulang.
- State interaktif (hover, focus, active, disabled) wajib didefinisikan, bukan cuma default browser.
- **Focus state harus terlihat** (accessibility) — jangan hilangkan outline tanpa pengganti yang jelas.
- Animasi/motion dipakai secukupnya dan harus punya tujuan (menjelaskan perubahan state, mengarahkan perhatian) — bukan hiasan. Hormati preferensi `prefers-reduced-motion`.
- Hindari animasi berlebihan di banyak elemen sekaligus (efek "semua bergerak" adalah tanda AI-slop).

---

## 6. Konten & Copywriting

- Tulisan di UI harus spesifik dan fungsional, bukan template generik ("Solusi Terbaik Untuk Anda", "Unlock Your Potential").
- Gunakan kata kerja aktif dan konsisten: kalau tombol bertuliskan "Simpan", notifikasi setelahnya juga bilang "Tersimpan" (bukan "Data telah diproses").
- Pesan error harus jelas: apa yang salah + cara memperbaikinya. Hindari pesan generik seperti "Terjadi kesalahan".
- Empty state (halaman kosong) harus mengarahkan aksi berikutnya, bukan sekadar teks kosong.

---

## 7. Checklist Sebelum Selesai

- [ ] Warna yang dipakai semuanya berasal dari token yang sudah ditentukan (tidak ada hex baru sembarangan).
- [ ] Font & ukuran teks mengikuti type scale yang ada.
- [ ] Spacing memakai skala tetap, bukan angka acak.
- [ ] Tidak ada pola template AI-slop (lihat daftar di bagian 1) tanpa alasan kuat.
- [ ] Kontras warna teks/background aman untuk dibaca.
- [ ] Komponen reusable, tidak ada duplikasi style yang tidak perlu.
- [ ] Animasi (jika ada) punya tujuan jelas dan tidak berlebihan.
- [ ] Sudah dicek tampilan di mobile dan desktop.
