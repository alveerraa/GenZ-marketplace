# 🛍️ Gen-Z Marketplace

**Gen-Z Marketplace** is a full-stack e-commerce demo built for users to browse, wishlist, and purchase trendy products. It features clean UI, responsive design, secure authentication, and seamless user experience.

---

## 🚀 Features Implemented

- 🔐 **User Authentication** with Sign-Up, Login, JWT, and persistent localStorage
- 📦 **Product Upload** (with image support for admins)
- 💖 **Add to Wishlist**
- 🛒 **Add to Cart**
- ❌ **Remove from Wishlist & Cart**
- 🖼️ **Product Image Upload** with Multer
- 🌈 **Aesthetic Hero Section** with background gradient and illustrations
- 👤 **Session Persistence** using localStorage
- 🗂️ **Protected Routes** for wishlist, cart, and upload functionality
- ⚙️ **Frontend and Backend** separated using the MERN stack

---

## 🖼️ UI Highlights

- 🎨 Gen-Z themed color palette
- 🪄 Hero section with gradient background + custom illustration
- 📱 Mobile-first responsive design (partially implemented)
- 🔗 Conditional navigation based on login status
- ⚠️ Protected actions like "Add to Cart" or "Wishlist" unless user is logged in

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- React Router DOM
- Axios
- CSS Modules / Custom Styling

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (for image upload)
- JWT for secure user auth
- CORS, dotenv, bcryptjs

---

## 🧠 Future Improvements

- 💳 **Payment Gateway Integration** (Razorpay or Stripe)
- 🧾 **Order Management & Checkout Flow**
- 🔍 **Search and Filter Products**
- 🌐 **Pagination & Infinite Scrolling**
- 👑 **Admin Dashboard** for managing users and products
- 🆕 Profile Settings Page (edit name, email, etc.)
- 🆕 DM Seller to Buy
- 📱 **Full Mobile Responsiveness**

---

## 📂 Project Structure

```bash
genz-marketplace/
├── backend/              # Node.js backend (API routes, models, controllers)
├── frontend/             # React frontend (pages, components, styles)
│   └── assets/           # Static files like illustrations, images
├── README.md
└── .gitignore
