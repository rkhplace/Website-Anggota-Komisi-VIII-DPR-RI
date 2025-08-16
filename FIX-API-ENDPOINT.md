# 🔧 Fix API Endpoint Issue

## Masalah yang Anda Alami:
Anda mengakses `http://localhost:1337/api/profiles` dan mendapat 404 error.

## Penyebab:
- **Profile** adalah **Single Type** di Strapi
- Single Type menggunakan endpoint **singular** (tanpa 's')
- Collection Type menggunakan endpoint **plural** (dengan 's')

## ✅ Solusi:

### 1. Gunakan Endpoint yang Benar
**SALAH**: `http://localhost:1337/api/profiles` ❌  
**BENAR**: `http://localhost:1337/api/profile` ✅

### 2. Test API yang Benar
Buka browser dan test endpoint ini:

```
✅ BENAR:
http://localhost:1337/api/profile
http://localhost:1337/api/news-articles  
http://localhost:1337/api/agenda-items
http://localhost:1337/api/gallery-albums

❌ SALAH:
http://localhost:1337/api/profiles
http://localhost:1337/api/news
http://localhost:1337/api/agendas
http://localhost:1337/api/galleries
```

### 3. Pastikan Content Type Dibuat dengan Benar
Di Strapi Admin:
1. **Content-Type Builder**
2. **Profile** harus dibuat sebagai **Single Type** (bukan Collection Type)
3. **API ID**: `profile` (singular)

### 4. Cek Permissions
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Pastikan **Profile** (bukan Profiles) sudah diizinkan untuk **find** dan **findOne**

### 5. Publish Content
1. **Content Manager** → **Profile**
2. Klik **Publish** jika belum

## 🧪 Test API Response
Setelah menggunakan endpoint yang benar, Anda akan mendapat response seperti ini:

```json
{
  "data": {
    "id": 2,
    "attributes": {
      "name": "Selly",
      "role": "Anggota DPR RI",
      "shortGreeting": [...],
      "biography": [...],
      "education": [...],
      "experiences": [...],
      "vision": [...],
      "mission": [...],
      "publishedAt": "2025-08-15T17:49:46.807Z"
    }
  },
  "meta": {}
}
```

## 📝 Perbedaan Single Type vs Collection Type

### Single Type (Profile)
- **Endpoint**: `/api/profile` (singular)
- **Response**: `{ data: { ... } }`
- **Gunakan**: Untuk data yang hanya ada satu (seperti profil)

### Collection Type (News, Agenda, Gallery)
- **Endpoint**: `/api/news-articles` (plural)
- **Response**: `{ data: [{ ... }, { ... }] }`
- **Gunakan**: Untuk data yang bisa banyak (seperti berita, agenda)

## ✅ Checklist
- [ ] Profile dibuat sebagai Single Type
- [ ] Menggunakan endpoint `/api/profile`
- [ ] Permissions sudah diset untuk Profile
- [ ] Content sudah di-publish
- [ ] Frontend menggunakan endpoint yang benar

## 🚀 Setelah Fix
Website frontend akan bisa mengakses data dari Strapi dengan benar!
