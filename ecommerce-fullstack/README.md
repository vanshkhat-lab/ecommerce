# Basic Full-Stack E-Commerce Application

A beginner-friendly e-commerce application built with:

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- API testing: Postman
- Cart: localStorage

## 1. Requirements

Install these first:

1. Node.js LTS: https://nodejs.org/
2. MongoDB Community Server OR use MongoDB Atlas: https://www.mongodb.com/
3. VS Code: https://code.visualstudio.com/
4. Optional: Postman: https://www.postman.com/

Check Node:

```bash
node -v
npm -v
```

## 2. Open the project in VS Code

Extract this folder and open `ecommerce-fullstack` in VS Code.

Open two terminals.

### Terminal 1 - Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:

```bash
cp .env.example .env
npm run dev
```

The backend runs at:

http://localhost:5000

### Terminal 2 - Frontend

The easiest option is to install the VS Code extension **Live Server** and right-click:

`frontend/index.html` -> `Open with Live Server`

The frontend will normally open around:

http://127.0.0.1:5500/frontend/index.html

## 3. Configure MongoDB

Open `backend/.env`.

For local MongoDB:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=change_this_to_a_long_random_secret
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## 4. Seed sample products

After the backend is running, open another terminal:

```bash
cd backend
npm run seed
```

This inserts sample products.

You can also call:

`GET http://localhost:5000/api/products`

## 5. Test the application

1. Open the frontend.
2. Register a new account.
3. Login.
4. Open Products.
5. Add products to Cart.
6. Go to Checkout.
7. Place the order.
8. Open My Orders.

## 6. Main API endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Products

- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

The create/update/delete product routes require a logged-in user.

### Orders

- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders/:id`

## 7. What to explain to your manager

Frontend:
- HTML creates page structure.
- CSS handles presentation and responsive layout.
- JavaScript handles DOM interaction and API calls.

Backend:
- Express receives HTTP requests.
- Routes decide which operation to perform.
- Mongoose communicates with MongoDB.
- JWT is used for authentication.

API:
- GET reads data.
- POST creates data.
- PUT updates data.
- DELETE removes data.
- JSON is used to exchange data.

Flow:

Browser -> Frontend JavaScript -> REST API -> Express -> MongoDB
MongoDB -> Express -> JSON response -> Frontend -> Browser

## 8. Important beginner note

This is a learning project, not a production payment system. It does not process real payments. Never store plain-text passwords or real payment-card information.
