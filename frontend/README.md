🍬 Sweet Shop Management System - Full Stack Project (TDD Inspired)

A complete full-stack Sweet Shop Management System featuring authentication, cart management, stock tracking, and a modern responsive UI.  
Status: ✅ **Complete** – Frontend & Backend fully functional, end-to-end flow working perfectly.

---

## 📋 Table of Contents
- Overview  
- Features  
- Tech Stack  
- Project Structure  
- Quick Start  
- Backend Setup  
- Frontend Setup  
- API Endpoints  
- Testing  
- My AI Usage  
- Troubleshooting  
- License  

---

## 🎯 Overview

This project demonstrates a production-ready **full-stack application** built using modern web technologies and structured for scalability.

✅ **TDD-Inspired Development** – Component-level and API-level testing included  
✅ **Clean Architecture** – Modular, layered, and maintainable  
✅ **Security** – JWT-based authentication with token verification  
✅ **Responsive UI** – Built using Material UI  
✅ **Cart System** – Add to cart, view cart, checkout flow  
✅ **Stock Handling** – Prevents out-of-stock purchases  
✅ **AI-Aided Development** – Accelerated via iterative co-authoring

---

## ✨ Features

### 👤 User Management
- **Register:** Create a new account  
- **Login:** Authenticate with JWT tokens  
- **Protected Routes:** Only logged-in users can perform cart and purchase actions  
- **Session Management:** Tokens stored in localStorage  

---

### 🍭 Sweet Management

| Feature | Description |
|----------|-------------|
| View All | Display all available sweets with prices and categories |
| Search | Filter sweets by name or category |
| Add | (Admin only) Add new sweets |
| Delete | (Admin only) Remove sweets from catalog |
| Stock Handling | Automatically reduce quantity after checkout |
| Out of Stock | Prevents adding unavailable sweets |

---

### 🛒 Cart & Checkout

- Add sweets to cart  
- View and remove items from cart  
- Checkout (with backend validation)  
- Stock reduces automatically  
- Success message after successful checkout  

---

### 🎨 UI & UX

- Built using **Material UI (MUI)**  
- Responsive across mobile, tablet, and desktop  
- Intuitive layout with search and filtering  
- Clean typography and consistent colors  

---

## 🛠 Tech Stack

### Backend
- **Framework:** Express.js (Node.js)
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT  
- **Validation:** Express Validator  
- **Testing:** Jest / Supertest  

### Frontend
- **Framework:** React 18 (TypeScript)  
- **UI Library:** Material UI 7  
- **Routing:** React Router DOM  
- **HTTP Client:** Axios  
- **State Management:** React Context API  

### Infrastructure
- **Version Control:** Git + GitHub  
- **Package Management:** npm  
- **Environment:** dotenv  

---

## 📁 Project Structure
sweet-shop-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── sweets.controller.ts
│   │   ├── routes/
│   │   │   └── sweets.routes.ts
│   │   ├── models/
│   │   │   └── Sweet.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── server.ts
│   │   └── config/
│   │       └── db.ts
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SweetCard.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── context/
│   │   │   └── CartContext.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── Login.tsx
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env
│
└── README.md

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+  
- MongoDB (local or Atlas)  
- npm  
- Git  

---

## 🔧 Backend Setup

1️⃣ **Install dependencies**
```bash
cd backend
npm install

2️⃣ Configure .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=mysecretkey

3️⃣ Run backend
npm run dev
✅ Backend runs at: http://localhost:5000

⚛️ Frontend Setup
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Configure .env
VITE_API_URL=http://localhost:5000/api

3️⃣ Run frontend
npm run dev
✅ Frontend runs at: http://localhost:5173

📡 API Endpoints
Method
Endpoint
Description
POST
/api/auth/register
Register new user
POST
/api/auth/login
Authenticate user
GET
/api/sweets
Get all sweets
GET
/api/sweets/:id
Get single sweet
POST
/api/sweets
Add new sweet (Admin only)
PUT
/api/sweets/:id
Update sweet
DELETE
/api/sweets/:id
Delete sweet
POST
/api/sweets/purchase
Checkout sweets

🧪 Testing
Run backend tests:
cd backend
npm run test

Run frontend tests:
cd frontend
npm run test
✅ All core routes and UI components tested.

🤖 My AI Usage

Tools Used:
	•	ChatGPT (OpenAI GPT-5)
	•	GitHub Copilot (for code suggestions)

AI Contribution:
	•	Assisted in component layout and backend route structuring
	•	Helped debug MUI version conflicts and TypeScript type errors
	•	Suggested modular folder architecture

Human Contribution:
	•	Implemented complete logic, tested API manually
	•	Integrated cart, checkout, and search functionalities
	•	Debugged and ensured responsive UI

🧩 Troubleshooting
Port already in use
lsof -i :5173 | awk '{print $2}' | xargs kill -9
CORS error
	•	Update CORS in server.ts backend

Database connection error
	•	Check MongoDB is running locally or via Atlas

    📚 Learning Resources
	•	Express Documentation￼
	•	React with TypeScript Docs￼
	•	Material UI v7￼
	•	JWT.io￼
	•	MongoDB Docs￼

⸻

📄 License

MIT License

Permission is granted to use, modify, and distribute this project for educational purposes.
© 2025 Shanmukha Sai G – All rights reserved.

⸻

👨‍💻 Author

Built by: Shanmukha Sai G
Project: Sweet_Shop_Management_System (Full Stack)
Focus: Clean code, modular architecture, responsive UI
Highlights:
✅ Fully functional full-stack project
✅ Secure authentication and checkout flow
✅ Modern React + Node architecture

📧 Contact: shanmukhas445@gmail.com
🌐 GitHub: https://github.com/shanmukha54-web

Last Updated: November 2025
Status: Complete & Production Ready ✅

