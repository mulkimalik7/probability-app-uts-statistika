# Probability App — Project UTS Statistika

Website kedua untuk project UTS Statistika. Aplikasi ini berfokus pada perhitungan probabilitas dan dibuat menggunakan HTML5, CSS3, serta Vanilla JavaScript (ES Modules).

## Persyaratan dari naskah UTS

Soal 2 meminta aplikasi untuk menghitung probabilitas berdasarkan metode dan distribusi probabilitas yang telah dipelajari. Fitur minimum yang tertulis meliputi:

- Probabilitas suatu kejadian P(A).
- Probabilitas komplemen P(A').
- Probabilitas gabungan P(A ∪ B).
- Probabilitas irisan P(A ∩ B).
- Probabilitas kejadian saling lepas.
- Probabilitas kejadian independen.
- Probabilitas bersyarat P(A|B).
- Probabilitas berdasarkan Teorema Bayes.
- Interpretasi hasil probabilitas.
- Studi kasus filter email phishing dengan prevalensi 8%, sensitivitas 92%, dan false positive 3%.

Nama distribusi tertentu belum tercantum pada rincian soal yang tersedia. Modul distribusi disiapkan sebagai placeholder sampai materi perkuliahan dikonfirmasi.

## Teknologi

- HTML5: struktur halaman dan form.
- CSS3: tampilan dan layout responsif.
- JavaScript ES Modules: validasi, rumus, dan interaksi.
- Tidak memerlukan backend atau database untuk versi awal.

## Cara menjalankan di VS Code

1. Ekstrak folder project.
2. Buka folder `probability-website` melalui VS Code.
3. Pasang ekstensi **Live Server** bila belum ada.
4. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
5. Browser akan membuka aplikasi. Gunakan alamat lokal yang disediakan Live Server.

Alternatif tanpa ekstensi, dari terminal pada folder project jalankan:

```bash
python3 -m http.server 5500
```

Kemudian buka `http://localhost:5500` di browser. Perintah ini hanya menjalankan server file statis; seluruh perhitungan tetap menggunakan JavaScript.

## Struktur folder

```text
probability-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── ui.js
│   ├── validation.js
│   ├── probabilitas-dasar.js
│   ├── probabilitas-bersyarat.js
│   ├── teorema-bayes.js
│   └── distribusi.js
├── assets/
├── docs/
│   ├── REQUIREMENTS.md
│   └── WORKFLOW.md
├── tests/
│   └── manual-test-cases.md
├── ANTIGRAVITY_BRIEF.md
└── README.md
```

## Pengujian fungsi perhitungan

Project menyediakan pengujian otomatis berbasis Node.js tanpa dependensi tambahan. Dari terminal pada folder project jalankan:

```bash
npm test
```

## Catatan implementasi

- Probabilitas dimasukkan dalam bentuk desimal 0–1 pada kalkulator umum. Contoh: 0,3 ditulis `0.3`.
- Kalkulator kasus phishing menggunakan input persentase 0–100.
- Untuk probabilitas gabungan, masukkan nilai irisan P(A ∩ B) agar rumus tidak mengasumsikan kejadian saling lepas atau independen.
- Untuk probabilitas irisan umum, masukkan P(A ∪ B) selain P(A) dan P(B).
- Kalkulator kejadian saling lepas dan independen secara eksplisit menerapkan asumsi masing-masing.
- Metode distribusi probabilitas ditambahkan setelah daftar materi dari dosen/kelompok tersedia.

## Pengujian cepat

- Komplemen P(A) untuk P(A)=0.3 harus menghasilkan 0.7.
- Contoh saling lepas P(A)=0.3 dan P(B)=0.4 harus menghasilkan 0.7.
- Kasus phishing 8%, 92%, dan 3% harus menghasilkan P(email ditandai)=10.12% dan P(phishing|ditandai) sekitar 72.73%.

Lihat `tests/manual-test-cases.md` untuk daftar pengujian awal.
