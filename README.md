# CleanBox Laundry - Fullstack Web App with AI Price Estimator

CleanBox Laundry adalah aplikasi web modern berbasis **Neobrutalism** untuk pemesanan/reservasi pickup laundry secara dinamis dengan fitur cerdas **AI Estimator harga & layanan** yang ditenagai oleh Google Gemini AI.

Aplikasi ini dibangun dengan arsitektur **Full-stack (Vue.js 3 di Frontend & Express.js di Backend)** serta menggunakan **TypeScript** demi menjaga maintainability dan clean code yang scalable di jangka panjang.

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
Sebelum memulai, pastikan komputer Anda telah terpasang:
- **Node.js** (Versi 18 ke atas)
- **NPM** (Bawaan Node.js)

### Langkah-Langkah Instalasi:

1. **Instal seluruh Dependensi (Library):**
   ```bash
   npm install
   ```

2. **Dapatkan & Konfigurasi API Key Gemini:**
   - Dapatkan kunci API gratis di [Google AI Studio](https://aistudio.google.com/).
   - Buat file baru bernama `.env` di folder utama (root) aplikasi Anda atau isi file `.env.example` lalu ubah namanya menjadi `.env`.
   - Masukkan GEMINI_API_KEY Anda di sana:
     ```env
     GEMINI_API_KEY="ISI_DENGAN_API_KEY_GEMINI_ANDA"
     ```

3. **Jalankan Aplikasi Mode Development:**
   ```bash
   npm run dev
   ```
   Aplikasi Anda sekarang aktif dan dapat dibuka langsung di browser Anda melalui alamat port default `http://localhost:3000`!

---

## 📁 Struktur Folder Modular

Aplikasi ini dipecah menjadi beberapa komponen kecil (< 150 baris) agar bersih, mudah dibaca, dan re-usable:
- `/src/components/Navbar.vue` (Navigasi responsif khas neobrutalisme)
- `/src/components/Hero.vue` (Tampilan utama, tajam & impresif)
- `/src/components/Services.vue` (Katalog daftar harga & menu servis interaktif)
- `/src/components/AboutInfo.vue` (Bagian profil keunggulan & latar belakang sejak 2014)
- `/src/components/WhyUs.vue` (Ulasan keunggulan, saluran pembayaran terlengkap, & jaminan pickup)
- `/src/components/AiEstimator.vue` (Formulir penganalisa daftar pakaian ditenagai AI)
- `/src/components/BookingForm.vue` (Sistem pemesanan pickup laundry dengan integrasi instan ke WhatsApp)
- `/src/components/Testimonials.vue` (Ulasan bintang 5 interaktif dari pelanggan setia)
- `/src/components/Footer.vue` (Bagian hak cipta, kontak, & tautan sosmed terstruktur)


## 📄 Lisensi & Hak Cipta

Copyright © 2026 BeEs. All rights reserved.

Proyek ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](./LICENSE) untuk detail lengkapnya.