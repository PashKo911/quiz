# 🧠 Fullstack Quiz App (Vue 3 + Node.js)

Fullstack test assignment for a Fullstack Developer position.  
A small quiz application with authentication, role-based access, admin panel, and Telegram Web App support.

---

## 🚀 Live Demo

- 🌐 Web App (Render): https://your-render-deploy-link.com
- 📱 Telegram Web App: https://your-telegram-webapp-link.com

---

## 🔐 Demo Admin Account

- Email: `admin@test.com`
- Password: `admin123`

---

## 📌 Features

### 👤 User

- Registration / Login (JWT authentication)
- Quiz (5 questions)
- Submit answers and store results
- View quiz result after completion

### 🛠 Admin

- View users list
- View users quiz attempts
- Visual check of correct / incorrect answers
- Delete users

---

## 📱 Telegram Web App

This project includes integration with **Telegram Web Apps**, allowing users to:

- Open the quiz directly inside Telegram
- Use the same authentication flow
- Work with backend API in WebApp environment

---

## 🧩 Tech Stack

### Frontend

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Axios
- TailwindCSS
- PrimeVue
- Yup (validation)

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs
- express-validator
- Helmet, CORS, Morgan

---

## ⚙️ Setup

### Backend

```bash
cd server
npm install
npm run dev
```
