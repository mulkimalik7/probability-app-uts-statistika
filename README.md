# Probability App – Project UTS Statistika

Probability App adalah aplikasi berbasis web yang menyediakan kalkulator probabilitas interaktif untuk membantu perhitungan, pemahaman konsep, dan analisis peluang secara matematis. Aplikasi ini dikembangkan sebagai media pembelajaran interaktif yang menyajikan rumus formal, tahapan perhitungan bertahap (*step-by-step*), serta interpretasi hasil untuk mempermudah pemahaman teori statistika dan probabilitas.

---

## Link Website

Aplikasi dapat diakses dan digunakan secara langsung melalui tautan berikut:

- **Live Demo Website:** [https://mulkimalik7.github.io/probability-app-uts-statistika/](https://mulkimalik7.github.io/probability-app-uts-statistika/)
- **Repository GitHub:** [https://github.com/mulkimalik7/probability-app-uts-statistika](https://github.com/mulkimalik7/probability-app-uts-statistika)

---

## Tentang Aplikasi

Probability App dirancang untuk menjembatani perhitungan teoritis probabilitas dengan implementasi komputasi web yang praktis. Pengguna tidak hanya memperoleh nilai akhir probabilitas (dalam bentuk desimal dan persentase), tetapi juga dapat mempelajari alur substitusi rumus secara transparan dan membaca interpretasi kontekstual dari hasil yang diperoleh.

Aplikasi ini berjalan sepenuhnya di sisi klien (*client-side*), responsif di berbagai ukuran layar, serta mendukung fleksibilitas penulisan angka desimal menggunakan format titik (`.`) maupun koma (`,`).

---

## Fitur Aplikasi

Aplikasi memiliki total **11 kalkulator probabilitas** yang dikelompokkan ke dalam dua modul utama:

### A. Modul Probabilitas Dasar
1. **Probabilitas Suatu Kejadian P(A)**  
   Menghitung peluang klasik berdasarkan rasio jumlah kejadian yang diharapkan $n(A)$ terhadap ukuran ruang sampel $n(S)$. Dilengkapi sinkronisasi dinamis batas maksimum $n(A) \le n(S)$.
2. **Probabilitas Komplemen P(A')**  
   Menghitung peluang tidak terjadinya suatu kejadian menggunakan rumus $P(A') = 1 - P(A)$.
3. **Probabilitas Gabungan P(A ∪ B)**  
   Menghitung peluang terjadinya kejadian A, B, atau keduanya dengan menerapkan aturan penjumlahan umum $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
4. **Probabilitas Irisan P(A ∩ B)**  
   Menghitung peluang terjadinya kejadian A dan B secara bersamaan yang diturunkan dari nilai gabungan yang diketahui: $P(A \cap B) = P(A) + P(B) - P(A \cup B)$.
5. **Probabilitas Kejadian Saling Lepas**  
   Menghitung peluang gabungan dua kejadian yang mustahil terjadi bersamaan ($P(A \cap B) = 0$), sehingga $P(A \cup B) = P(A) + P(B)$.
6. **Probabilitas Kejadian Independen**  
   Menghitung peluang irisan dari dua kejadian saling bebas ($P(A \cap B) = P(A) \times P(B)$) serta menampilkan peluang gabungannya secara simultan.

### B. Modul Probabilitas Bersyarat dan Teorema Bayes
7. **Probabilitas Bersyarat P(A|B)**  
   Menghitung peluang terjadinya kejadian A setelah kejadian B terbukti terjadi: $P(A|B) = \frac{P(A \cap B)}{P(B)}$ dengan validasi $P(B) > 0$.
8. **Aturan Perkalian Probabilitas Umum**  
   Menghitung peluang irisan dua kejadian dependen melalui informasi probabilitas bersyarat: $P(A \cap B) = P(A) \times P(B|A)$.
9. **Teorema Bayes**  
   Memperbarui keyakinan awal (*prior*) menjadi keyakinan akhir (*posterior*) setelah adanya bukti (*evidence*): $P(A|B) = \frac{P(B|A) \times P(A)}{P(B)}$. Fitur ini dilengkapi validasi konsistensi batas Fréchet pada nilai bukti $P(B)$.
10. **Probabilitas Total**  
    Menghitung peluang keseluruhan suatu peristiwa yang terbagi ke dalam beberapa partisi kelompok berbobot: $P(B) = \sum P(B|A_i) \times P(A_i)$ dengan validasi $\sum P(A_i) = 1$.
11. **Studi Kasus Email Phishing**  
    Simulasi penerapan Teorema Bayes dan Probabilitas Total pada sistem keamanan email gateway. Mengolah parameter prevalensi, sensitivitas deteksi, dan *false positive* untuk menghitung probabilitas email ditandai sistem serta probabilitas email yang ditandai benar-benar berbahaya (*posterior*).

> **Catatan:** File `js/distribusi.js` pada project merupakan berkas *placeholder* arsitektural yang disiapkan untuk rencana pengembangan distribusi probabilitas di masa depan, dan bukan merupakan fitur kalkulator aktif saat ini.

---

## Teknologi yang Digunakan

Aplikasi dibangun menggunakan tumpukan teknologi web standar tanpa ketergantungan pada *framework* eksternal:

- **HTML5:** Menyusun struktur semantik halaman, navigasi tab interaktif, form input numerik, dan atribut aksesibilitas WAI-ARIA (`aria-invalid`, `aria-current`).
- **CSS3:** Mengatur desain visual, tipografi, sistem warna berbasis CSS Custom Properties, layout responsif (Flexbox dan CSS Grid), serta indikator status validasi.
- **Vanilla JavaScript (ES Modules):** Mengelola seluruh logika komputasi matematika, pemisahan modul (*modular architecture*), penanganan *event listener*, validasi format desimal, dan manipulasi DOM secara dinamis.
- **GitHub Pages:** Layanan hosting statis untuk mempublikasikan website secara daring langsung dari repositori GitHub.

---

## Struktur Folder Project

Berikut adalah struktur direktori aktual yang terdapat pada repositori:

```text
probability-website/
├── assets/                  # Direktori untuk aset pendukung aplikasi
├── css/
│   └── style.css            # Berkas styling visual dan tata letak responsif
├── js/
│   ├── main.js              # Controller utama aplikasi dan event listener
│   ├── ui.js                # Pengelola tampilan hasil dan manipulasi DOM
│   ├── validation.js        # Utilitas validasi input dan normalisasi desimal
│   ├── probabilitas-dasar.js # Modul perhitungan probabilitas dasar
│   ├── probabilitas-bersyarat.js # Modul perhitungan bersyarat & aturan perkalian
│   ├── teorema-bayes.js     # Modul Teorema Bayes, probabilitas total, & kasus phishing
│   └── distribusi.js        # Placeholder untuk modul distribusi probabilitas masa depan
├── tests/
│   ├── calculations.test.js # Berkas pengujian unit otomatis (Node.js test runner)
│   └── manual-test-cases.md # Dokumentasi panduan pengujian manual
├── index.html               # Halaman utama antarmuka pengguna
├── package.json             # Konfigurasi project dan script npm test
└── README.md                # Dokumentasi utama project
```

### Fungsi Direktori Utama:
- `css/`: Menyimpan lembar gaya (*stylesheet*) untuk tata letak antarmuka yang modern dan responsif.
- `js/`: Menyimpan kode sumber JavaScript terstruktur berbasis ES Modules yang memisahkan logika matematika, validasi, dan presentasi antarmuka (*Separation of Concerns*).
- `tests/`: Menyimpan rangkaian pengujian unit terotomatisasi serta skenario kasus uji manual.
- `assets/`: Direktori yang disiapkan untuk menyimpan aset gambar atau berkas statis pendukung.

---

## Cara Menjalankan Project

Aplikasi ini merupakan situs web statis murni sehingga tidak memerlukan proses *build* atau instalasi dependensi rumit. Untuk menjalankan project secara lokal menggunakan Visual Studio Code:

1. **Clone repositori:**
   ```bash
   git clone https://github.com/mulkimalik7/probability-app-uts-statistika.git
   ```
2. **Buka folder project di Visual Studio Code:**
   Buka VS Code, pilih menu **File** > **Open Folder...**, lalu arahkan ke folder `probability-website`.
3. **Gunakan ekstensi Live Server:**
   - Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang di VS Code.
   - Buka berkas `index.html`.
   - Klik kanan pada editor `index.html` dan pilih **Open with Live Server**, atau klik tombol **Go Live** di status bar pojok kanan bawah.
4. **Akses aplikasi:**
   Peramban web (*browser*) akan otomatis terbuka menampilkan aplikasi pada alamat lokal (umumnya `http://127.0.0.1:5500` atau `http://localhost:5500`).

---

## Pengujian

Project ini dilengkapi dengan pengujian unit otomatis dan panduan pengujian manual untuk menjamin ketepatan rumus matematika serta ketangguhan validasi input.

### Pengujian Otomatis (Unit Testing)
Pengujian otomatis berada di dalam folder `tests/calculations.test.js` menggunakan *test runner* bawaan Node.js (`node:test`) tanpa memerlukan pustaka pihak ketiga.

Jalankan perintah berikut di terminal:
```bash
npm test
```

Perintah di atas mengeksekusi skrip `"test": "node --test"` dari `package.json`. Berdasarkan hasil pengujian terbaru, seluruh **32 unit test** berhasil dijalankan dengan status lulus:
- Total pengujian: 32 test cases
- Status: **32 passed, 0 failed**
- Cakupan pengujian: verifikasi akurasi 11 rumus kalkulator, penanganan format desimal titik dan koma, penolakan input di luar rentang $[0, 1]$, batas Fréchet matematis, penolakan pembagian dengan nol, dan syarat partisi probabilitas total.

### Pengujian Manual
Skenario pengujian interaksi antarmuka dan validasi form dapat dilihat pada berkas panduan:
- `tests/manual-test-cases.md`

---

## Informasi Project

Project ini disusun untuk memenuhi tugas **Ujian Tengah Semester (UTS)** pada mata kuliah **Statistika dan Probabilitas**, Program Studi Teknik Informatika.
