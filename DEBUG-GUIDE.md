# 🔍 Debug Guide - Frontend Tidak Update

## Masalah:
API endpoint sudah benar dan mengembalikan data, tapi frontend tidak ter-update.

## Langkah Debug:

### 1. Test API Response
Buka browser dan akses:
```
http://localhost:1337/api/profile
```

Pastikan response seperti ini:
```json
{
  "data": {
    "id": 2,
    "name": "Selly",
    "role": "Anggota DPR RI",
    "shortGreeting": [...],
    "biography": [...],
    "education": [...],
    "experiences": [...],
    "vision": [...],
    "mission": [...]
  }
}
```

### 2. Test Debug Page
Buka browser dan akses:
```
http://localhost:3000/debug
```

Halaman ini akan menampilkan:
- Raw API response dari Strapi
- Data yang diekstrak
- Error jika ada

### 3. Cek Environment Variables
Pastikan file `frontend/.env.local` ada dan berisi:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_HOSTNAME=localhost
```

### 4. Restart Frontend
```bash
cd frontend
# Tekan Ctrl+C untuk stop
npm run dev
```

### 5. Cek Browser Console
1. Buka browser developer tools (F12)
2. Buka tab Console
3. Refresh halaman
4. Lihat apakah ada error

### 6. Cek Network Tab
1. Buka browser developer tools (F12)
2. Buka tab Network
3. Refresh halaman
4. Lihat apakah request ke Strapi berhasil

## Kemungkinan Penyebab:

### 1. Cache Browser
- Tekan Ctrl+F5 untuk hard refresh
- Atau buka incognito/private window

### 2. Environment Variables
- Pastikan `.env.local` ada di folder `frontend/`
- Restart frontend setelah mengubah env vars

### 3. Strapi Not Running
- Pastikan Strapi berjalan di port 1337
- Cek dengan: `netstat -an | findstr :1337`

### 4. CORS Issues
- Buka browser console, lihat error CORS
- Pastikan Strapi CORS settings sudah benar

### 5. Data Structure Mismatch
- Frontend mengharapkan struktur data tertentu
- Debug page akan menampilkan struktur yang sebenarnya

## Quick Fix:

### 1. Hard Refresh
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### 2. Clear Cache
```
Ctrl + Shift + Delete
Clear browsing data
```

### 3. Restart Both Services
```bash
# Terminal 1 - Strapi
cd cms
npm run develop

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 4. Test API Directly
Buka browser dan test:
```
http://localhost:1337/api/profile
http://localhost:3000/debug
```

## Expected Result:
Setelah fix, website akan menampilkan:
- **Nama**: Selly
- **Role**: Anggota DPR RI  
- **Sambutan**: "Hi saya anggota DPR RI Komisi VI"
- **Biografi**: "00000"
- **Pendidikan**: List pendidikan
- **Pengalaman**: List pengalaman
- **Visi**: "Membangun Indonesia Maju"
- **Misi**: List misi

## Jika Masih Bermasalah:
1. Cek debug page: `http://localhost:3000/debug`
2. Bandingkan data di debug page dengan yang diharapkan
3. Update frontend code sesuai struktur data yang sebenarnya
