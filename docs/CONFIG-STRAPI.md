# Konfigurasi Strapi (Ringkas)

1) Instal: `npx create-strapi-app@latest cms --quickstart`
2) Buat model:
- Single Type `profile`: name, role, shortGreeting, photo, biography, education[], experiences[], vision, mission[]
- Collection `news`: title, slug(UID), excerpt, content, publishedAt
- Collection `agendas`: title, location, startDate, endDate?, description
- Collection `galleries`: title, media (multiple)
3) Roles → Public: izinkan hanya `find`/`findOne` pada `profile`, `news`, `agendas`, `galleries`.
4) (Opsional) API Token Read-Only, isi `STRAPI_API_TOKEN` di frontend.
5) Set CORS ke domain situs. Gunakan HTTPS di produksi.

Endpoint dipakai frontend:
- `/api/profile?populate=photo`
- `/api/news?sort=publishedAt:desc&pagination[pageSize]=6`
- `/api/news?filters[slug][$eq]=:slug`
- `/api/agendas?sort=startDate:asc`
- `/api/galleries?populate=media`

