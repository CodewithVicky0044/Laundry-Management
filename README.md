# 🧺 Mini Laundry Order Management System (AI-First)

## 📌 Overview

A lightweight system built for a dry cleaning store to manage daily orders efficiently.
The application supports order creation, billing, status tracking, filtering, and dashboard insights.

This project was built using an **AI-first approach**, leveraging tools like ChatGPT to accelerate development and problem-solving.

---

## 🚀 Live Demo

* Frontend: https://laundry-management-nu.vercel.app/
* Backend: https://laundry-management-dhuz.onrender.com/

⚠️ Note: Backend may take 20–60 seconds on first request due to cold start (Render free tier).

---

## ⚙️ Tech Stack

### Backend

* Node.js
* Express
* MongoDB (Atlas)
* Mongoose

### Frontend

* React (Vite)
* Tailwind CSS

---

## 🛠️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run:

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## ✅ Features Implemented

### 1. Create Order

* Add customer name, phone, garments
* Quantity & price per garment
* Auto billing calculation
* Unique Order ID generation

---

### 2. Order Status Management

* Status flow:

  * RECEIVED → PROCESSING → READY → DELIVERED
* Update status via API & UI

---

### 3. View Orders

* List all orders
* Filter by status
* Search by name or phone

---

### 4. Dashboard

* Total orders
* Total revenue
* Orders per status

---

## 🔌 API Endpoints

* `POST /orders`
* `GET /orders`
* `GET /orders?status=READY`
* `GET /orders?search=9876`
* `PATCH /orders/:id/status`
* `GET /orders/dashboard`

---

## 🤖 AI Usage Report

### Tools Used

* ChatGPT (primary)
* GitHub Copilot (optional)

---

### Sample Prompts

* "Create Express API for laundry order with billing calculation"
* "Add order status update with validation"
* "Generate MongoDB aggregation for dashboard data"
* "Convert UI into React + Tailwind components"
* "Fix MongoDB connection and deployment errors"

---

### Where AI Helped

* Backend scaffolding (models, controllers)
* API structure design
* Debugging MongoDB & deployment issues
* Frontend structure and component design
* Improving development speed significantly

---

### What AI Got Wrong

* Missing dashboard API initially
* Incorrect middleware usage (`next` issue)
* No proper ID validation
* Incomplete error handling
* Minor syntax/formatting issues

---

### Improvements Done Manually

* Implemented dashboard API
* Added robust validation (status & ID)
* Improved error handling
* Added unique orderId logic
* Fixed deployment (Render + MongoDB Atlas)
* Built full frontend UI

---

## ⚖️ Tradeoffs

* No authentication system
* No automated testing
* Pricing is dynamic (not fixed rate card)
* Free hosting → cold start delay

---

## 🔮 Future Improvements

* Add authentication (admin/staff)
* Add estimated delivery date
* Create price master system
* Add unit & integration tests
* Improve UI/UX
* Add notifications system

---

## 🧪 How to Test

1. Open frontend link
2. Create a new order
3. Verify order in list
4. Update order status
5. Check dashboard updates

---

## 📦 Additional Deliverables

* GitHub Repository ✔
* Postman Collection ✔
* Live Deployment ✔

---

## 🙌 Conclusion

This project demonstrates:

* Strong backend fundamentals
* Real-world API design
* Deployment & debugging skills
* Effective use of AI tools for rapid development

---
