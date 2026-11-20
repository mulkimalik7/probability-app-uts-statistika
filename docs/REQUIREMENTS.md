# Spesifikasi Kebutuhan Awal — Website Probabilitas

## 1. Tujuan
Membangun aplikasi web untuk menghitung probabilitas berdasarkan metode dan distribusi probabilitas yang telah dipelajari. Website ini merupakan Website 2 yang terpisah dari aplikasi Statistik Deskriptif.

## 2. Kebutuhan fungsional berdasarkan naskah UTS

| ID | Kebutuhan | Input utama | Output |
|---|---|---|---|
| FR-01 | Menghitung P(A) | Jumlah kejadian n(A), ruang sampel n(S) | P(A) |
| FR-02 | Menghitung komplemen | P(A) | P(A') |
| FR-03 | Menghitung gabungan | P(A), P(B), P(A∩B) | P(A∪B) |
| FR-04 | Menghitung irisan | P(A), P(B), P(A∪B) | P(A∩B) |
| FR-05 | Menghitung kejadian saling lepas | P(A), P(B), asumsi saling lepas | P(A∪B), P(A∩B)=0 |
| FR-06 | Menghitung kejadian independen | P(A), P(B), asumsi independen | P(A∩B) |
| FR-07 | Menghitung probabilitas bersyarat | P(A∩B), P(B) | P(A\|B) |
| FR-08 | Menghitung Teorema Bayes | P(A), P(B\|A), P(B) | P(A\|B) |
| FR-09 | Menampilkan interpretasi | Hasil perhitungan | Penjelasan hasil dalam kalimat |
| FR-10 | Menyelesaikan kasus phishing | Prevalensi, sensitivitas, false positive | P(email ditandai), P(phishing\|ditandai) |

## 3. Kebutuhan kualitas/validasi

- Nilai probabilitas harus berada pada rentang 0 sampai 1.
- Input wajib tidak boleh kosong.
- Penyebut pada rumus pembagian tidak boleh nol.
- Input yang tidak konsisten harus menghasilkan pesan validasi, bukan hasil yang menyesatkan.
- Hasil ditampilkan dalam desimal dan persentase.
- Rumus dan langkah substitusi ditampilkan agar perhitungan dapat diperiksa.

## 4. Batasan dan hal yang perlu dikonfirmasi

Naskah menyebut distribusi probabilitas yang telah dipelajari, tetapi rincian distribusi tidak terlihat pada daftar fitur yang tersedia. Nama distribusi harus dikonfirmasi dari materi kuliah sebelum kalkulator distribusi ditambahkan.

Naskah juga tidak menentukan metode desain, jumlah halaman, atau format penyimpanan data. Rancangan navigasi dan tampilan pada project ini adalah keputusan awal kelompok dan masih dapat diubah.
