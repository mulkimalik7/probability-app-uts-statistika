# Workflow Website Probabilitas

## A. Alur pengguna

1. Pengguna membuka Dashboard.
2. Pengguna memilih kalkulator: probabilitas dasar, bersyarat, atau Bayes.
3. Pengguna memasukkan parameter yang diminta.
4. JavaScript memvalidasi input.
5. Jika valid, modul perhitungan menjalankan rumus yang sesuai.
6. Website menampilkan hasil, rumus, langkah substitusi, dan interpretasi.
7. Pengguna dapat mengubah input dan menghitung ulang.

## B. Alur pengembangan kelompok

1. Sepakati requirement dan rumus.
2. Tentukan struktur file serta kontrak fungsi antarmodul.
3. Kembangkan setiap modul pada file JavaScript terpisah.
4. Integrasikan form dan modul melalui `main.js`.
5. Uji nilai normal, nilai batas, input kosong, serta input tidak konsisten.
6. Tinjau ulang hasil dengan perhitungan manual.
7. Dokumentasikan cara menjalankan aplikasi dan hasil pengujian.

## C. Alur satu kalkulator

`Form input → Validasi → Fungsi perhitungan → Hasil desimal/persentase → Rumus dan langkah → Interpretasi`

## D. Alur GitHub yang disarankan

1. Satu anggota membuat repository dan mengunggah struktur awal.
2. Setiap anggota mengambil repository terbaru.
3. Kerjakan bagian masing-masing pada branch terpisah.
4. Lakukan commit dengan pesan yang menjelaskan perubahan.
5. Gabungkan melalui pull request atau review sebelum merge ke branch utama.
6. Uji aplikasi setelah penggabungan.
