# 🍽️ Kuliner Backend API - UKL

Backend REST API untuk aplikasi kuliner menggunakan **NestJS + Prisma + PostgreSQL**

---

## 🛠️ Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT + Bcrypt
- **Docs**: Swagger

---

## 🚀 Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
```bash
cp .env.example .env
# Edit .env dengan konfigurasi database kamu
```

### 3. Setup database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Jalankan aplikasi
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## 📄 Dokumentasi API

Setelah server berjalan, buka:
```
http://localhost:3000/api/docs
```

---

## 🔑 Endpoint Utama

| Method | Endpoint | Akses |
|--------|----------|-------|
| POST | /auth/register | Public |
| POST | /auth/login | Public |
| GET | /menus | Public |
| POST | /menus | Admin |
| PUT | /menus/:id | Admin |
| DELETE | /menus/:id | Admin |
| GET | /categories | Public |
| POST | /categories | Admin |
| POST | /orders | Customer |
| GET | /orders | Admin |
| GET | /orders/my-orders | Customer |
| PATCH | /orders/:id/status | Admin |
| POST | /payments/:orderId | Customer/Admin |

---

## 👥 Role

- **ADMIN** → Kelola menu, kategori, lihat semua pesanan
- **CUSTOMER** → Lihat menu, buat pesanan, bayar

---

## 📦 Deploy

Bisa di-deploy ke:
- **Railway** (gratis, support PostgreSQL)
- **Render**
- **Heroku**

```bash
# Set environment variable di platform cloud:
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
```
