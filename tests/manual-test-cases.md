# Manual Test Cases — Probability App

| ID | Modul | Input | Hasil yang diharapkan |
|---|---|---|---|
| TC-01 | P(A) | n(A)=3, n(S)=10 | 0.3 atau 30% |
| TC-02 | Komplemen | P(A)=0.3 | 0.7 atau 70% |
| TC-03 | Gabungan saling lepas | P(A)=0.3, P(B)=0.4, P(A∩B)=0 | 0.7 atau 70% |
| TC-04 | Irisan | P(A)=0.6, P(B)=0.5, P(A∪B)=0.8 | 0.3 atau 30% |
| TC-05 | Kejadian saling lepas | P(A)=0.3, P(B)=0.4 | Union 0.7; intersection 0 |
| TC-06 | Independen | P(A)=0.3, P(B)=0.4 | Intersection 0.12 atau 12% |
| TC-07 | Bersyarat | P(A∩B)=0.2, P(B)=0.5 | P(A\|B)=0.4 atau 40% |
| TC-08 | Bayes umum | P(A)=0.2, P(B\|A)=0.9, P(B)=0.3 | P(A\|B)=0.6 atau 60% |
| TC-09 | Phishing | Prevalensi=8%, sensitivitas=92%, false positive=3% | Ditandai=10.12%; phishing jika ditandai≈72.73% |
| TC-10 | Validasi | P(A)=1.2 | Pesan error rentang 0–1 |
| TC-11 | Validasi | P(B)=0 pada kalkulator bersyarat | Pesan error penyebut tidak boleh 0 |
| TC-12 | P(A) | n(A)=7, n(S)=10 | 70%; kedua input menerima bilangan bulat |
| TC-13 | P(A) | n(A)=0.5 atau n(S)=2.5 | Ditolak oleh validasi input |
| TC-14 | Bayes umum | P(A)=0.2, P(B\|A)=0.9, P(B)=0.99 | Ditolak karena evidence melebihi batas maksimum 0.98 |
| TC-15 | Hasil kedaluwarsa | Hitung hasil valid lalu ubah salah satu input | Hasil lama langsung hilang |
| TC-16 | Validasi native | Tampilkan hasil valid, lalu kosongkan input wajib dan submit | Browser memblokir submit; hasil lama tidak terlihat |
| TC-17 | Reset | Hitung hasil, lalu tekan Reset | Input kembali ke nilai awal dan hasil/pesan validasi hilang |
| TC-18 | Reset phishing | Ubah parameter, hitung, lalu tekan Reset | Nilai kembali ke 8%, 92%, 3%; hasil hilang |
| TC-19 | Presisi kecil | Hitung probabilitas 0.0000004 | Desimal dan persen ditampilkan sebagai nilai non-nol |
| TC-20 | Aturan perkalian umum | P(A)=0.25, P(B\|A)=4/19 | P(A∩B)=1/19≈0.052632 atau 5.26% |
| TC-21 | Probabilitas total | A: P(A)=0.50, P(B\|A)=0.02; B: 0.30, 0.04; C: 0.20, 0.10 | P(B)=0.042 atau 4.2% |
| TC-22 | Partisi probabilitas total | Jumlah proporsi kelompok kurang atau lebih dari 1 | Ditolak dengan pesan total proporsi harus sama dengan 1 |
| TC-23 | Tambah kelompok | Tekan Tambah Kelompok saat ada 3 kelompok | Kelompok keempat ditambahkan dan dapat diedit |
| TC-24 | Hapus kelompok | Hapus kelompok hingga tersisa 2 | Dua kelompok tersisa; tombol Hapus dinonaktifkan |
| TC-25 | Reset probabilitas total | Ubah nama/nilai, tambah atau hapus kelompok, lalu Reset | Tiga subnet awal kembali, nilai probabilitas kosong, dan hasil dihapus |
| TC-26 | Nama kelompok | Ubah nama kelompok pada kalkulator probabilitas total | Legend fieldset langsung mengikuti nama yang diketik |
| TC-27 | Nama pada hasil | Hitung probabilitas total setelah mengganti nama kelompok | Langkah kontribusi memakai nama terbaru dari input |
| TC-28 | Format angka probabilitas | Coba 0.3, 0,3, 0x1, 1e-1, input kosong, NaN, dan Infinity | Desimal titik/koma diterima; format lain atau nilai tidak valid ditolak |

Catatan: angka di tabel adalah test case awal untuk memeriksa implementasi, bukan tambahan instruksi dosen.
