# 🔧 Troubleshooting Admin Strapi

## Masalah: Admin Panel Tidak Bisa Dibuka

### Solusi 1: Pastikan Strapi Berjalan
```bash
cd cms
npm run develop
```
Tunggu sampai muncul:
```
✅ Strapi is running on http://localhost:1337
```

### Solusi 2: Cek Port 1337
```bash
netstat -an | findstr :1337
```
Jika tidak ada output, berarti Strapi belum berjalan.

### Solusi 3: Restart Strapi
```bash
# Tekan Ctrl+C untuk stop
cd cms
npm run develop
```

## Masalah: Tidak Bisa Login Admin

### Solusi 1: Reset Password Admin
```bash
cd cms
npm run strapi admin:reset-user-password
```

### Solusi 2: Hapus Database dan Buat Ulang
```bash
cd cms
# Hapus file database
rm .tmp/data.db
# Jalankan ulang
npm run develop
```

### Solusi 3: Cek Email dan Password
- Pastikan email valid
- Password minimal 8 karakter
- Tidak ada spasi di awal/akhir

## Masalah: Content Types Tidak Muncul

### Solusi 1: Buat Content Types Manual
1. Login ke admin panel
2. **Content-Type Builder** → **Create new collection type**
3. Ikuti panduan di `QUICK-SETUP.md`

### Solusi 2: Restart Setelah Buat Content Types
```bash
# Setelah buat content types
# Tekan Ctrl+C untuk stop
npm run develop
```

## Masalah: API 404 Error

### Solusi 1: Set Permissions
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable **find** dan **findOne** untuk semua content types
3. **Save**

### Solusi 2: Publish Content
1. **Content Manager** → Pilih content type
2. Klik **Publish** untuk setiap entry

### Solusi 3: Cek API URL
Test di browser:
- `http://localhost:1337/api/profile`
- `http://localhost:1337/api/news-articles`
- `http://localhost:1337/api/agenda-items`
- `http://localhost:1337/api/gallery-albums`

## Masalah: Gambar Tidak Muncul

### Solusi 1: Upload Gambar
1. **Media Library** → **Upload**
2. Pilih gambar
3. Copy URL gambar

### Solusi 2: Set Media Permissions
1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable permissions untuk **Media**
3. **Save**

## Masalah: Frontend Tidak Bisa Akses Strapi

### Solusi 1: Cek Environment Variables
Buat file `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_HOSTNAME=localhost
```

### Solusi 2: Restart Frontend
```bash
cd frontend
npm run dev
```

### Solusi 3: Cek CORS
1. **Settings** → **Webhooks & CORS**
2. Tambahkan `http://localhost:3000` ke **origins**

## Langkah-langkah Lengkap Setup

### 1. Jalankan Strapi
```bash
cd cms
npm run develop
```

### 2. Buka Admin Panel
`http://localhost:1337/admin`

### 3. Buat Admin Account
- Email: admin@example.com
- Password: password123456

### 4. Buat Content Types
Ikuti `QUICK-SETUP.md`

### 5. Set Permissions
Enable find/findOne untuk semua content types

### 6. Tambah Sample Data
Buat entry untuk setiap content type

### 7. Test API
Buka URL API di browser

### 8. Jalankan Frontend
```bash
cd frontend
npm run dev
```

## ✅ Checklist Selesai
- [ ] Strapi berjalan di port 1337
- [ ] Admin panel bisa diakses
- [ ] Admin account sudah dibuat
- [ ] Content types sudah dibuat
- [ ] Permissions sudah diset
- [ ] Sample data sudah ditambah
- [ ] API bisa diakses
- [ ] Frontend bisa akses Strapi

## 🆘 Jika Masih Bermasalah
1. Cek log error di terminal
2. Restart Strapi dan frontend
3. Hapus database dan buat ulang
4. Ikuti panduan lengkap di `docs/SETUP-ADMIN.md`
