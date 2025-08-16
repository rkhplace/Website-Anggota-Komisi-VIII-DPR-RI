# 🚀 Quick Setup - Admin Strapi

## Langkah 1: Jalankan Strapi
```bash
cd cms
npm run develop
```

## Langkah 2: Buka Admin Panel
Buka browser: `http://localhost:1337/admin`

## Langkah 3: Buat Admin Account
- **First Name**: Admin
- **Last Name**: User  
- **Email**: admin@example.com
- **Password**: Buat password kuat (minimal 8 karakter)
- **Confirm Password**: Ulangi password
- Klik **"Let's start"**

## Langkah 4: Buat Content Types (Manual)
Setelah login, ikuti langkah ini:

### A. Profile (Single Type)
1. **Content-Type Builder** → **Create new single type**
2. **Display name**: `Profile`
3. **API ID**: `profile`
4. **Fields**:
   - `name` (Text) ✅ Required
   - `role` (Text) ✅ Required
   - `shortGreeting` (Rich Text)
   - `photo` (Media) - Single media
   - `biography` (Rich Text)
   - `education` (JSON)
   - `experiences` (JSON)
   - `vision` (Rich Text)
   - `mission` (JSON)
5. **Save**

### B. News (Collection Type)
1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `News Article`
3. **API ID**: `news-article`
4. **Fields**:
   - `title` (Text) ✅ Required
   - `slug` (UID) - Target field: title ✅ Required
   - `excerpt` (Text)
   - `content` (Rich Text) ✅ Required
5. **Save**

### C. Agendas (Collection Type)
1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `Agenda Item`
3. **API ID**: `agenda-item`
4. **Fields**:
   - `title` (Text) ✅ Required
   - `location` (Text)
   - `startDate` (Date) ✅ Required
   - `endDate` (Date)
   - `description` (Rich Text)
5. **Save**

### D. Galleries (Collection Type)
1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `Gallery Album`
3. **API ID**: `gallery-album`
4. **Fields**:
   - `title` (Text) ✅ Required
   - `media` (Media) - Multiple media
5. **Save**

## Langkah 5: Set Permissions
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Untuk setiap content type:
   - ✅ **find** (GET)
   - ✅ **findOne** (GET)
   - ❌ **create** (POST)
   - ❌ **update** (PUT)
   - ❌ **delete** (DELETE)
3. **Save**

## Langkah 6: Update Frontend API Calls
Karena API ID berubah, update file `frontend/src/app/page.tsx`:

```typescript
// Ganti endpoint dari:
'/api/news' → '/api/news-articles'
'/api/agendas' → '/api/agenda-items'
'/api/galleries' → '/api/gallery-albums'
```

## Langkah 7: Tambah Sample Data
1. **Content Manager** → Pilih content type
2. **Create new entry**
3. Isi data sesuai contoh di `docs/SETUP-ADMIN.md`
4. **Save** → **Publish**

## Langkah 8: Test API
**PENTING**: Gunakan endpoint yang benar!

### ✅ Endpoint yang Benar:
- `http://localhost:1337/api/profile` (Single Type - tidak ada 's')
- `http://localhost:1337/api/news-articles`
- `http://localhost:1337/api/agenda-items`
- `http://localhost:1337/api/gallery-albums`

### ❌ Endpoint yang Salah:
- `http://localhost:1337/api/profiles` (SALAH - Profile adalah Single Type)
- `http://localhost:1337/api/news` (SALAH - sudah diganti)
- `http://localhost:1337/api/agendas` (SALAH - sudah diganti)
- `http://localhost:1337/api/galleries` (SALAH - sudah diganti)

## Troubleshooting

### Jika Admin tidak bisa login:
```bash
cd cms
npm run strapi admin:reset-user-password
```

### Jika API 404:
- Pastikan content types sudah dibuat
- Pastikan permissions sudah diset
- Pastikan content sudah di-publish
- **Cek API ID yang benar** (terutama Profile = `/api/profile`, bukan `/api/profiles`)

### Jika gambar tidak muncul:
- Upload gambar via Media Library
- Pastikan permissions untuk Media sudah diizinkan

## ✅ Selesai!
Sekarang admin panel sudah siap dan website frontend bisa mengakses data dari Strapi.
