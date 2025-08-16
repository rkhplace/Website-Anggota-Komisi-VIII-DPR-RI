# 🔧 Environment Variables Setup

## Masalah:
Photo tidak muncul karena environment variable `NEXT_PUBLIC_STRAPI_URL` tidak ter-set dengan benar.

## ✅ Solusi:

### 1. Buat File Environment Variables

Buat file `frontend/.env.local` dengan isi:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_HOSTNAME=localhost
```

### 2. Restart Frontend

```bash
cd frontend
# Tekan Ctrl+C untuk stop
npm run dev
```

### 3. Test Photo URL

Buka browser console (F12) dan lihat log:
```
Photo URL: http://localhost:1337/uploads/Screenshot_2025_08_16_004452_cb8d88f2fc.png
Environment STRAPI_URL: http://localhost:1337
```

### 4. Test Photo URL Langsung

Buka URL photo langsung di browser:
```
http://localhost:1337/uploads/Screenshot_2025_08_16_004452_cb8d88f2fc.png
```

## 🔍 Debug Steps:

### 1. Cek Environment Variables
```bash
cd frontend
echo $NEXT_PUBLIC_STRAPI_URL
```

### 2. Cek File .env.local
```bash
cat .env.local
```

### 3. Test API Response
```bash
curl http://localhost:1337/api/profile?populate=*
```

### 4. Test Photo File
```bash
curl http://localhost:1337/uploads/Screenshot_2025_08_16_004452_cb8d88f2fc.png
```

## 🚨 Common Issues:

### 1. File .env.local tidak ada
- Buat file `frontend/.env.local`
- Isi dengan URL Strapi yang benar

### 2. Frontend tidak restart
- Setelah buat .env.local, restart frontend
- Environment variables hanya terbaca saat startup

### 3. Photo file tidak ada
- Cek folder `cms/public/uploads/`
- Pastikan file photo ada di folder tersebut

### 4. CORS Issues
- Buka browser console (F12)
- Lihat error CORS di Network tab

## 📝 Expected Result:

Setelah setup environment variables:
- ✅ Console log menampilkan photo URL yang benar
- ✅ Photo muncul di website
- ✅ Photo URL bisa diakses langsung di browser

## 🚀 Quick Fix Commands:

```bash
# Buat .env.local
echo "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337" > frontend/.env.local
echo "NEXT_PUBLIC_STRAPI_HOSTNAME=localhost" >> frontend/.env.local

# Restart frontend
cd frontend && npm run dev

# Test photo URL
curl http://localhost:1337/uploads/Screenshot_2025_08_16_004452_cb8d88f2fc.png
```

## 🔍 Debug Checklist:

- [ ] File `.env.local` ada di folder `frontend/`
- [ ] `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
- [ ] Frontend di-restart setelah buat .env.local
- [ ] Console log menampilkan photo URL yang benar
- [ ] Photo URL bisa diakses langsung di browser
- [ ] Strapi berjalan di port 1337
