# 🍬 Sweet Shop Management System

A full-stack web application to manage sweets inventory, customers, and sales — built with **Node.js, Express, Prisma, SQLite, React, TypeScript, and Vite**.

---

##  Features

###  Backend (Node + Express + Prisma)
- User registration & login (JWT Authentication)
- Role-based access (Admin / User)
- CRUD for sweets: Add, update, delete, view
- Purchase and restock sweets
- Prisma ORM with SQLite database
- Auto seed script for sample data
- TDD with Jest & Supertest

###  Frontend (React + Vite + TypeScript)
- User-friendly dashboard
- Login / Register pages
- Admin panel to add and edit sweets
- Live sweet list fetched from backend API
- Axios + JWT authorization headers
- Responsive, clean UI

---

##  Folder Structure

sweet-shop-management-system/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── middlewares/
│ │ └── index.ts
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.ts
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.tsx
│ │ │ ├── Register.tsx
│ │ │ └── Dashboard.tsx
│ │ ├── components/
│ │ ├── api.ts
│ │ └── main.tsx
│ ├── vite.config.ts
│ └── package.json
│
└── README.md


---

##  Setup Instructions

###  Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npm run dev

Backend runs on ➜ http://localhost:4000

### Frontend
cd frontend
npm install
npm run dev

Frontend runs on ➜ http://localhost:5173

###Environment Variables
#backend/.env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"

#frontend/.env
VITE_API_BASE=http://localhost:4000/api

###Testing
cd backend
npm test

### My AI Usage:
My AI Usage

This project was developed with the help of ChatGPT (OpenAI) for:
	•	Explaining backend concepts and syntax
	•	Generating TypeScript & Prisma boilerplate
	•	Troubleshooting npm and TS errors
	•	Creating the README & seed scripts

All generated code was reviewed, tested, and customized manually.
