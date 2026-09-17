# Kost Kurnia — Web Profile

Web profile satu halaman (single-page) untuk Kost Kurnia. Dibuat dari nol
dengan HTML/CSS/JS biasa — tanpa framework, tanpa backend — jadi bisa langsung
di-hosting gratis di Vercel.

## Struktur folder

```
kost-kurnia/
├── index.html          ← semua konten halaman
├── css/style.css        ← semua styling
├── js/main.js            ← menu mobile, highlight menu aktif, lightbox galeri
└── assets/img/           ← taruh foto asli di sini (lihat panduan di bawah)
```

## Cara deploy ke Vercel (gratis)

1. Buat akun di https://vercel.com (bisa pakai akun GitHub/Google).
2. Cara termudah — drag & drop:
   - Buka https://vercel.com/new
   - Pilih tab **"Deploy"** / seret folder `kost-kurnia` ke halaman tersebut.
   - Tunggu proses build selesai (untuk situs statis seperti ini biasanya
     kurang dari 1 menit), lalu Vercel akan memberi link `namakamu.vercel.app`.
3. Alternatif (lebih rapi untuk update jangka panjang) — lewat GitHub:
   - Upload folder ini ke repository GitHub baru.
   - Di Vercel, pilih **"Add New Project"** → **Import** repository tadi.
   - Framework preset pilih **"Other"** (karena ini HTML statis biasa).
   - Klik **Deploy**.
4. Setiap kali kamu update file dan push ke GitHub, Vercel otomatis build ulang.

## Mengganti foto placeholder dengan foto asli

Semua foto saat ini masih placeholder (kotak warna + teks) karena file foto
aslinya belum diunggah. Supaya gampang, cara paling cepat:

1. Simpan foto asli kamu ke folder `assets/img/` (nama bebas, format `.jpg`
   atau `.png`, disarankan diperkecil dulu ke maks. ~1600px sisi terpanjang
   biar situsnya tetap ringan).
2. Buka `index.html`, cari baris `<img src="https://placehold.co/...">` yang
   sesuai, lalu ganti bagian `src="..."` dengan path foto kamu, contoh:

   ```html
   <!-- sebelum -->
   <img src="https://placehold.co/700x900/180d39/f3efe4?...text=Tampak%20Depan%20Kost" alt="Tampak depan Kost Kurnia">

   <!-- sesudah -->
   <img src="assets/img/tampak-depan-1.jpg" alt="Tampak depan Kost Kurnia">
   ```

Panduan foto mana untuk section mana (berdasarkan nama file yang kamu punya):

| Placeholder di halaman         | Rekomendasi isi foto asli        |
|---------------------------------|-----------------------------------|
| Hero — foto besar kiri          | tampakdepan1.jpg                  |
| Hero — 2 foto kecil kanan       | kamar kost / lorong kost          |
| Kamar Tipe A / B / C            | foto kamar masing-masing tipe     |
| Galeri — Tampak Depan (1/2/3)   | tampakdepan1.jpg, tampak depan2.jpg, tampakdepan3.jpg |
| Galeri — AC Kamar               | ac kost.jpg                       |
| Galeri — Depan Kamar            | depan kamar.jpg                   |
| Galeri — Fasilitas Dasar Kamar  | Kamar_Kost_Fasilitas_Dasar.jpg    |
| Galeri — Kamar Mandi            | kamar mandi.jpg                   |
| Galeri — Lorong Kost (1/2)      | lorong kost.jpg, lorong kost2.jpg |
| Galeri — Jemuran                | jemuran kost.jpg                  |
| Galeri — Meteran Listrik        | meteran listrik.jpg               |
| Galeri — Parkiran               | parkiran.jpg                      |
| Galeri — Area Kost              | wiri kost.jpg                     |

Foto rasio 1:1 (persegi) paling pas untuk grid Galeri — kalau foto aslinya
bukan persegi, crop dulu sebelum diunggah supaya rapi.

## Yang perlu kamu cek/lengkapi lagi

- **Alamat lengkap**: saat ini bagian Kontak hanya menyebut "Kawasan
  Pandanaran, Semarang" karena alamat detail belum ada di data yang saya
  terima — tambahkan alamat lengkapnya di bagian `.contact-card` pada
  `index.html` kalau mau ditampilkan.
- **Nomor kontak**: saya pakai dua nomor dari website lama —
  0851-7997-2899 sebagai nomor WhatsApp utama (semua tombol chat), dan
  0812-2518-2727 sebagai nomor telepon alternatif. Ganti kalau ada yang keliru.
- **Link Google Maps**: masih pakai link peta dari website lama (pin lokasi
  "Kost kurnia"). Kalau titik lokasinya perlu diperbarui, buka Google Maps →
  cari lokasi → Bagikan → Sematkan peta → salin kode `src` dari iframe-nya.

## Struktur desain

- **Warna**: Ink `#180d39` (gelap, identik dengan brand lama), Amber `#c98a3b`
  (aksen tombol utama), Teal `#1f6f7d` (aksen sekunder), Paper `#f3efe4`
  (latar halaman).
- **Font**: Fraunces (judul) + Plus Jakarta Sans (teks), dari Google Fonts.
- **Skala tipografi & jarak**: dibangun dari rasio emas (φ ≈ 1,618) — ukuran
  font naik dalam kelipatan φ dan √φ, jarak antar elemen memakai deret
  Fibonacci (8·13·21·34·55·89·144px) yang mendekati rasio emas. Di layar
  desktop, bagian Hero dan Tentang juga dibagi dengan proporsi emas
  (61,8% : 38,2%).
- **Responsif**: mobile-first, dengan breakpoint di 768px (tablet) dan
  1120px (desktop) — menu berubah jadi hamburger di bawah 1120px.
