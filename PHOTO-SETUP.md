# 📸 Photo Setup Guide

## Masalah:
Photo tidak muncul di website karena:
1. Photo belum diupload di Strapi
2. Photo field tidak di-populate dalam API response
3. URL photo tidak terbentuk dengan benar

## ✅ Solusi Lengkap:

### 1. Upload Photo di Strapi Admin

#### Langkah 1: Buka Strapi Admin
```
http://localhost:1337/admin
```

#### Langkah 2: Edit Profile
1. **Content Manager** → **Profile**
2. Klik **Edit** pada data profile yang ada
3. Scroll ke bagian **Photo**
4. Klik **Add media** atau **Upload files**
5. Upload foto profil (format: JPG, PNG, WebP)
6. **Save** dan **Publish**

### 2. Cek API Response dengan Photo

#### Test API dengan Populate
Buka browser dan akses:
```
http://localhost:1337/api/profile?populate=*
```

Response harus seperti ini:
```json
{
  "data": {
    "id": 2,
    "name": "Selly",
    "role": "Anggota DPR RI",
    "photo": {
      "data": {
        "id": 1,
        "attributes": {
          "name": "profile-photo.jpg",
          "alternativeText": null,
          "caption": null,
          "width": 800,
          "height": 600,
          "formats": {
            "thumbnail": {
              "name": "thumbnail_profile-photo.jpg",
              "hash": "thumbnail_abc123",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "width": 245,
              "height": 184,
              "size": 12.34,
              "url": "/uploads/thumbnail_abc123.jpg"
            },
            "small": {
              "name": "small_profile-photo.jpg",
              "hash": "small_abc123",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "width": 500,
              "height": 375,
              "size": 25.67,
              "url": "/uploads/small_abc123.jpg"
            }
          },
          "hash": "abc123",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "size": 45.89,
          "url": "/uploads/abc123.jpg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "createdAt": "2025-01-15T10:30:00.000Z",
          "updatedAt": "2025-01-15T10:30:00.000Z"
        }
      }
    },
    "shortGreeting": [...],
    "biography": [...],
    "education": [...],
    "experiences": [...],
    "vision": [...],
    "mission": [...]
  }
}
```

### 3. Cek Environment Variables

Pastikan file `frontend/.env.local` ada:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_HOSTNAME=localhost
```

### 4. Test Debug Page

Buka: `http://localhost:3000/debug`

Cek apakah photo URL muncul di response.

### 5. Restart Frontend

```bash
cd frontend
# Ctrl+C untuk stop
npm run dev
```

### 6. Hard Refresh Browser

- Tekan `Ctrl + F5` (Windows)
- Atau buka incognito window

## 🔧 Troubleshooting:

### Jika Photo Masih Tidak Muncul:

#### 1. Cek File Upload di Strapi
- Buka **Media Library** di Strapi Admin
- Pastikan file photo ada dan bisa diakses

#### 2. Cek File Permissions
- Pastikan folder `cms/public/uploads/` ada
- Pastikan file photo ada di folder tersebut

#### 3. Test Photo URL Langsung
Jika photo URL: `/uploads/abc123.jpg`
Test di browser: `http://localhost:1337/uploads/abc123.jpg`

#### 4. Cek CORS Settings
Di Strapi Admin:
1. **Settings** → **Global Settings** → **Security**
2. Pastikan **CORS** mengizinkan `http://localhost:3000`

#### 5. Cek Network Tab
1. Buka browser developer tools (F12)
2. Tab **Network**
3. Refresh halaman
4. Lihat apakah request photo berhasil atau gagal

### 6. Manual Photo URL Test

Jika photo URL gagal, coba:
```javascript
// Di browser console
const photoUrl = "http://localhost:1337/uploads/abc123.jpg";
console.log(photoUrl);
// Buka URL ini di tab baru
```

## 📝 Expected Result:

Setelah setup lengkap:
- ✅ Photo muncul di website homepage
- ✅ Photo responsive (ukuran sesuai)
- ✅ Photo bisa diakses langsung via URL
- ✅ Debug page menampilkan photo URL

## 🚀 Quick Fix Commands:

```bash
# Restart Strapi
cd cms
npm run develop

# Restart Frontend
cd frontend
npm run dev

# Test API
curl http://localhost:1337/api/profile?populate=*
```

## 📸 Photo Requirements:

- **Format**: JPG, PNG, WebP
- **Size**: Max 10MB
- **Dimensions**: Recommended 800x600 atau lebih besar
- **Aspect Ratio**: 4:3 atau 1:1 (square)

## 🔍 Debug Checklist:

- [ ] Photo diupload di Strapi Admin
- [ ] Photo di-publish
- [ ] API response mengandung photo data
- [ ] Environment variables sudah benar
- [ ] Frontend di-restart
- [ ] Browser cache di-clear
- [ ] Photo URL bisa diakses langsung
