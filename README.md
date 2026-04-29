# Mini Laundry Order Management System (AI-First)

## Overview
A lightweight system for a dry cleaning store to:
- Create orders
- Track/update order status
- Calculate billing
- View dashboard metrics

This project includes a working backend API and a simple frontend UI.

## Tech Stack
### Backend
- Node.js
- Express
- MongoDB + Mongoose

### Frontend
- React
- Vite
- Tailwind CSS

## Project Structure
```text
laundry-system/
  README.md
  server/
    app.js
    controllers/
    models/
    routes/
  client/
    src/
      api/
      components/
      constants/
```

## Setup Instructions
### 1. Backend Setup
```bash
cd C:\Users\shiva\OneDrive\Desktop\laundry-system\server
npm install
```
Create `.env` in `server/`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Run backend:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd C:\Users\shiva\OneDrive\Desktop\laundry-system\client
npm install
npm run dev
```
Frontend runs on Vite default URL (usually `http://localhost:5173`).

## Features Implemented
### 1) Create Order
- Fields: customer name, phone, garments, quantity, price
- Total bill auto-calculated
- Unique `orderId` generated (`ORD-xxxxxx-xxxx`)

### 2) Order Status Management
- Supported statuses:
  - `RECEIVED`
  - `PROCESSING`
  - `READY`
  - `DELIVERED`
- Status update endpoint implemented

### 3) View Orders
- List all orders
- Filter by status
- Search by customer name or phone

### 4) Basic Dashboard
- Total orders
- Total revenue
- Orders per status

## API Endpoints
Base URL: `http://localhost:5000`

1. `POST /orders`
2. `GET /orders`
3. `GET /orders?status=READY`
4. `GET /orders?search=9876`
5. `PATCH /orders/:id/status`
6. `GET /orders/dashboard`

Sample create-order payload:
```json
{
  "customerName": "Aman",
  "phone": "9876543210",
  "garments": [
    { "type": "Shirt", "quantity": 2, "price": 50 },
    { "type": "Pants", "quantity": 1, "price": 80 }
  ]
}
```

## Frontend Coverage
- Dashboard cards
- Create order form with dynamic `Add Garment`
- Orders list
- Status update from UI
- Search and status filter

## AI Usage Report
### Tools Used
- ChatGPT (primary)
- GitHub Copilot (optional)

### Sample Prompts
1. "Generate Express + Mongoose model and controller for laundry order creation with total amount calculation."
2. "Add order status update API with enum validation."
3. "Create dashboard API to return total orders, total revenue, and orders per status."
4. "Convert client to React + Vite and style with Tailwind CSS."
5. "Refactor frontend into professional component-based folder structure."

### Where AI Helped
- Backend scaffolding speed
- Validation and aggregation query drafts
- Frontend migration and modular structure ideas
- README structure and deliverables checklist

### What AI Got Wrong / Needed Fixes
- Encoding/text artifacts in some generated files
- Missing dashboard route in first draft
- No custom order ID in initial version
- `next is not a function` issue in Mongoose hook (fixed)
- Invalid `{id}` request handling improved with ObjectId validation

### Improvements Done Manually
- Added `orderId` generation
- Added `/orders/dashboard` implementation
- Added robust ID/status validation handling
- Refactored frontend into reusable components
- Integrated Tailwind CSS and polished UI

## Tradeoffs
- Authentication not added
- No automated tests yet
- Pricing currently passed in request (no master rate card)
- Data persistence depends on MongoDB connection (no offline fallback)

## If Given More Time
- Add authentication (admin/staff)
- Add estimated delivery date
- Add garment price master table
- Add unit/integration tests
- Add deployment (Render/Railway)
- Add Postman collection file in repo

## Demo / Submission Checklist
- Public GitHub repo
- README (this file)
- Postman collection or API screenshots
- Short demo video (optional but recommended)