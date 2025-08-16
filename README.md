# Situs Pribadi Anggota DPR RI

Website pribadi anggota DPR RI dengan desain elegan, formal, dan profesional. **Single Page Application** dengan navigasi scroll ke section.

**Tech Stack:**
- Frontend: Next.js + Tailwind CSS (`frontend/`)
- Backend CMS: Strapi (`cms/`)

## Fitur Utama
- ✅ **Single Page**: Semua konten dalam satu halaman
- ✅ **Scroll Navigation**: Menu navigasi scroll smooth ke section
- ✅ **Mobile-friendly**: Responsive design dengan menu hamburger
- ✅ **CMS Integration**: Strapi untuk manajemen konten
- ✅ **Error Handling**: Graceful fallback saat CMS belum siap

## Mulai Cepat
1. **Pasang Node.js 18/20 LTS**: `https://nodejs.org/en/download`
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   # buat .env.local, isi NEXT_PUBLIC_STRAPI_URL, dll.
   npm run dev
   ```
3. **CMS (Strapi)**:
   ```bash
   npx create-strapi-app@latest cms --quickstart
   ```
   Buka `http://localhost:1337/admin` untuk membuat admin.

Detail konfigurasi Strapi: lihat `docs/CONFIG-STRAPI.md`.

## Sections
- **Beranda**: Hero section dengan foto profil dan sambutan
- **Berita**: Daftar berita terbaru dari CMS
- **Profil**: Biografi, pendidikan, pengalaman, visi & misi
- **Agenda**: Jadwal kegiatan resmi
- **Galeri**: Foto dan video kegiatan
- **Kontak**: Form pesan + alamat + peta lokasi
