# Sistem Informasi Geografis (GIS) Desa Jambu Timur

## Deskripsi Sistem

Sistem Informasi Geografis (SIG) ini bertujuan untuk memetakan infrastruktur dan fasilitas publik di Desa Jambu Timur. Aplikasi berbasis web ini digunakan untuk monitoring kondisi fasilitas, mendukung perencanaan pembangunan, dan meningkatkan keterbukaan informasi kepada masyarakat. Sistem juga menyediakan fitur pelaporan dari pengguna untuk memperbarui kondisi lokasi secara lebih cepat.

### A. Rencana Pemetaan Wilayah

Objek yang dipetakan meliputi:
*   Kantor desa
*   Sekolah
*   Masjid dan mushola
*   Posyandu
*   Lapangan desa
*   Fasilitas dan lokasi umum lainnya

### B. Fitur Aplikasi SIG

*   **Peta Interaktif**: Menampilkan lokasi fasilitas desa dengan marker yang informatif.
*   **Layer Pemetaan**: Visualisasi berdasarkan kategori fasilitas dan infrastruktur.
*   **Pencarian Lokasi**: Memudahkan pencarian berdasarkan nama atau kategori.
*   **Informasi Detail**: Menampilkan data lengkap pada setiap marker (nama, kondisi, foto).
*   **Manajemen Data Admin**: Fitur untuk menambah, mengedit, dan menghapus lokasi (memerlukan autentikasi).
*   **Dashboard Monitoring**: Menampilkan statistik ringkas mengenai fasilitas desa.
*   **Laporan Warga**: Memungkinkan warga mengirimkan pembaruan kondisi atau kerusakan fasilitas.

### C. Alur Kerja Sistem

1.  **Pengumpulan dan pencatatan data geografis**: Data awal dikumpulkan dari lapangan.
2.  **Admin memasukkan data ke sistem**: Data diinput sesuai kategori yang relevan.
3.  **User mengakses aplikasi melalui browser**: Masyarakat dapat melihat peta sebaran fasilitas.
4.  **User memilih layer dan melihat informasi lokasi**: Eksplorasi data secara interaktif.
5.  **Warga dapat mengirim laporan kondisi terbaru**: Partisipasi aktif masyarakat dalam pemeliharaan data.
6.  **Admin memverifikasi laporan dan memperbarui peta**: Validasi data untuk menjaga keakuratan informasi.

### D. Manfaat Sistem

*   Mempermudah monitoring kondisi infrastruktur desa.
*   Mendukung perencanaan pembangunan yang lebih tepat sasaran.
*   Meningkatkan transparansi informasi publik.
*   Mempercepat pembaruan data melalui laporan masyarakat.

---

## Live Demo

Anda dapat langsung mencoba aplikasi ini melalui tautan berikut:
[https://gis-seven-khaki.vercel.app/](https://gis-seven-khaki.vercel.app/)

Silakan eksplorasi fitur-fitur yang tersedia:
*   Melihat data lokasi pada peta.
*   Melaporkan kondisi fasilitas sebagai warga.
*   Login sebagai admin untuk mengelola data.

**Kredensial Admin:**
*   **Username:** `admin`
*   **Password:** `admin123`

---

## Teknologi yang Digunakan

*   **Frontend**: [Next.js](https://nextjs.org/) (React Framework), [Tailwind CSS](https://tailwindcss.com/) (Styling).
*   **Peta**: [React Leaflet](https://react-leaflet.js.org/) / [Leaflet](https://leafletjs.com/), [MapTiler](https://www.maptiler.com/) (Base Maps).
*   **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + PostGIS).
*   **Icons**: [Lucide React](https://lucide.dev/).
*   **Charts**: [Recharts](https://recharts.org/).

## Prasyarat

Sebelum menjalankan project ini, pastikan Anda telah menginstal:
*   [Node.js](https://nodejs.org/) (Versi LTS direkomendasikan).
*   Akun [Supabase](https://supabase.com/) untuk database.

## Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

### 1. Clone Repository

```bash
git clone <https://github.com/rianmubarok/gis>
cd gis
```

### 2. Install Dependencies

Install semua library yang dibutuhkan menggunakan npm:

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` di root project dan tambahkan konfigurasi berikut (sesuaikan dengan kredensial Anda):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Map Configuration
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key

# Admin
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
```

### 4. Setup Database

Jalankan script SQL yang terdapat di file `supabase_setup.sql` pada SQL Editor di dashboard Supabase Anda. Script ini akan:
*   Mengaktifkan ekstensi PostGIS.
*   Membuat tabel yang diperlukan (`categories`, `locations`, `location_images`, dll).
*   Mengatur Row Level Security (RLS) policies.

### 5. Jalankan Aplikasi

Jalankan development server:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Struktur Folder

*   `src/app`: Halaman-halaman aplikasi (Next.js App Router).
*   `src/components`: Komponen UI yang dapat digunakan kembali (Map, Sidebar, ControlPanel, dll).
*   `src/lib`: Utilitas dan konfigurasi klien Supabase.
*   `src/types`: Definisi tipe TypeScript.
