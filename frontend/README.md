# Frontend (Next.js + Tailwind)

Website pribadi anggota DPR RI dengan navigasi scroll ke section. Lihat `README.md` di root untuk panduan lengkap.

## Struktur
- **Single Page Application**: Semua konten dalam satu halaman dengan navigasi scroll
- **Sections**: Beranda, Berita, Profil, Agenda, Galeri, Kontak
- **Mobile-friendly**: Menu hamburger untuk mobile dengan animasi smooth

## Variabel Lingkungan
Buat file `.env.local` dengan:
```
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_HOSTNAME=localhost
STRAPI_API_TOKEN=
NEXT_PUBLIC_FORM_ENDPOINT=#
NEXT_PUBLIC_MAP_EMBED_URL=
```

## Fitur
- ✅ Navigasi scroll smooth ke section
- ✅ Header sticky dengan backdrop blur
- ✅ Mobile menu dengan animasi hamburger
- ✅ Responsive design
- ✅ Error handling untuk Strapi
- ✅ Fallback content saat CMS belum siap

