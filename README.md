# 🧠 Fullstack Quiz App (Vue 3 + Node.js)

Fullstack test project for a Fullstack Developer position.  
Quiz application with authentication, admin panel, and Telegram Web App support.

---

## 🚀 Demo

- 🌐 Web: https://quiz-2373.onrender.com/
- 📱 Telegram Web App: https://t.me/Quiz91_bot/Quiz91

---

## 🔐 Demo Admin

- Email: `admin@test.com`
- Password: `admin123`

---

## ✨ Features

### 👤 User

- JWT authentication (register / login)
- Quiz (5 questions)
- Submit answers & view result
- Store quiz history

### 🛠 Admin

- Users management
- View quiz attempts
- Check correct / incorrect answers
- Delete users

---

## 📱 Telegram Web App

- Launch quiz inside Telegram
- Shared auth with backend API
- WebApp-compatible UX

---

## ⚙️ CI/CD

- GitHub Actions (lint + build)
- Render auto-deploy on `main` push
- Separate frontend/backend workflows with path filters

---

## 🧩 Tech Stack

### Frontend

Vue 3, Vue Router, Pinia, Axios, TailwindCSS, PrimeVue, Yup

### Backend

Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, express-validator, Helmet, CORS, Morgan

---

## 🚀 Setup

### Backend

```bash
cd server
npm install
npm run dev
```
