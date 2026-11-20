# Laporan Revisi Probability App

## 1. File yang diubah

- `index.html`
- `js/main.js`
- `js/validation.js`
- `js/probabilitas-dasar.js`
- `js/teorema-bayes.js`
- `tests/calculations.test.js`
- `tests/manual-test-cases.md`
- `docs/REVISION_REPORT.md`

Tidak ada dependensi baru atau perubahan desain besar.

## 2. Bug yang ditemukan dan diperbaiki

- Bayes umum sebelumnya hanya memeriksa batas minimum `P(B)`. Validasi sekarang juga memeriksa batas maksimum berdasarkan `P(A) × P(B|A) + (1 − P(A))`; kombinasi yang mustahil ditolak sebelum posterior dihitung.
- Jumlah kejadian sebelumnya menerima pecahan. `n(A)` kini harus bilangan bulat aman non-negatif dan `n(S)` bilangan bulat aman positif; `n(A) ≤ n(S)` tetap diperiksa.
- Validator sebelumnya mengonversi string kosong menjadi nol. Validator sekarang menolak input kosong, nilai non-numerik, NaN, dan Infinity; probabilitas desimal yang valid tetap diterima.
- Hasil lama kini dibersihkan ketika input berubah, saat browser mengirim event validasi native, saat reset, dan sebelum perhitungan baru.
- Nilai maksimum HTML untuk `n(A)` mengikuti input `n(S)` dan dihapus kembali saat reset.
- Format angka menggunakan presisi signifikan adaptif sehingga probabilitas kecil tidak dibulatkan menjadi nol dan `-0` ditampilkan sebagai nol.

## 3. Rumus matematika

Rumus utama probabilitas dasar, komplemen, gabungan, irisan, saling lepas, independen, bersyarat, Bayes, dan phishing tidak diubah. Validasi gabungan/irisan tetap menghormati batas matematis kejadian.

Untuk input phishing 8%, 92%, dan 3%:

- Probabilitas email ditandai: **10,12%**
- Probabilitas phishing jika email ditandai: **sekitar 72,73%**

## 4. Validasi dan interaksi

- Semua fungsi kalkulasi tetap memvalidasi input secara internal, tidak hanya mengandalkan atribut HTML.
- Semua input jumlah/probabilitas wajib diisi; input probabilitas memakai `step="any"` dan jumlah kejadian memakai `step="1"`.
- Setiap kalkulator memiliki tombol Reset. Reset mengembalikan nilai awal form—termasuk default kasus phishing—dan menghapus hasil serta status `aria-invalid`.
- Distribusi Probabilitas tetap menjadi placeholder informatif. Tidak ditemukan nama distribusi yang telah dipelajari dalam dokumentasi atau materi yang tersedia di workspace, sehingga distribusi tidak ditebak.

## 5. Hasil pengujian

### Sebelum revisi

- `npm test`: **11/11 tes lulus** pada baseline audit.
- Tes browser otomatis belum dilakukan pada baseline.

### Sesudah revisi

- `npm test`: **19/19 tes lulus**.
- `node --check` untuk semua modul JavaScript: **lulus**.
- Pengujian browser pada sembilan form: **lulus** untuk hasil kalkulasi, keberadaan dan perilaku Reset, pemulihan nilai default, serta pembaruan batas dinamis `n(A)`.
- Pengujian browser tambahan: **lulus** untuk membersihkan hasil lama saat input berubah dan submit tidak valid, menolak kombinasi Bayes mustahil, serta hasil kasus phishing sesuai nilai yang diharapkan.

Pengujian unit mencakup rumus, nilai batas, desimal, input kosong, negatif, di luar rentang, NaN, Infinity, hitungan pecahan, ruang sampel nol, pembagian nol, batas gabungan/irisan, Bayes mustahil, hasil sangat kecil, dan phishing.

## 6. Fitur yang belum selesai dan konfirmasi

- Kalkulator distribusi probabilitas belum dibuat. Nama distribusi harus dikonfirmasi dari dosen atau kelompok sebelum implementasi.
- Tidak ada bug tersisa yang diketahui dari cakupan tes yang dijalankan. Audit ini tidak menetapkan distribusi atau materi kuliah yang belum tersedia.
