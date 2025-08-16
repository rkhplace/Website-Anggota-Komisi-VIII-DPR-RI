# Konfigurasi Strapi (Ringkas)

1) Instal: `npx create-strapi-app@latest cms --quickstart`
2) Buat model:
- Single Type `profile`: name, role, shortGreeting, photo, biography, education[], experiences[], vision, mission[]
- Collection `news-article`: title, slug(UID), excerpt, content, publishedAt
- Collection `agenda-item`: title, location, startDate, endDate?, description
- Collection `gallery-album`: title, media (multiple)
3) Roles → Public: izinkan hanya `find`/`findOne` pada `profile`, `news-article`, `agenda-item`, `gallery-album`.
4) (Opsional) API Token Read-Only, isi `STRAPI_API_TOKEN` di frontend.
5) Set CORS ke domain situs. Gunakan HTTPS di produksi.

Endpoint dipakai frontend:
- `/api/profile?populate=photo`
- `/api/news-articles?sort=publishedAt:desc&pagination[pageSize]=6`
- `/api/news-articles?filters[slug][$eq]=:slug`
- `/api/agenda-items?sort=startDate:asc`
- `/api/gallery-albums?populate=media`
