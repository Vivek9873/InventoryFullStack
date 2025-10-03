# Inventory Management Backend

## Overview

This is a **Backend API for an Inventory Management System**, built using **Node.js, Express, MongoDB, and TypeScript**.  
The API supports **user authentication, role-based access**, and **CRUD operations for products**.

---

## Features

- **User Authentication**

  - Register & Login
  - Password hashing with bcrypt
  - JWT-based authentication

- **Role-Based Access**

  - Users can have roles: `Buyer` or `Seller`
  - Only sellers can add/update/delete their products

- **Product Management**

  - Add, update, delete products
  - Fetch all products with pagination and sorting
  - Fetch products by a particular seller

- **Input Validation**

  - `quantity` and `price` must be numeric
  - `image_url` must be a valid URL

- **Error Handling**

  - Proper HTTP status codes
  - Clear success/error messages in JSON responses

- **Database**
  - MongoDB (either Atlas cloud or local instance)
  - User & Product schemas with references

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB / MongoDB Atlas
- **Libraries:** bcryptjs, jsonwebtoken, validator, mongoose
- **Environment Variables:** dotenv

---

## Environment Setup

- 1. Clone the repository:
- bash
  git clone <your-repo-url>
  cd backend
  npm install

2. Create a .env file in the backend folder:

PORT=5000
MONGODB_URI=<your mongodb url>
JWT_SECURITY_KEY=<PUT your secret here>
CLIENT_URL=http://localhost:3000

Running the Server
Option 1: Locally without Docker
npm run dev # Runs the server in development mode (with TypeScript)
npm run build # Builds the TypeScript files
npm start # Runs the compiled JS files

Option 2: Using Docker (optional)
docker-compose up --build

Backend will be available at: http://localhost:5000

## API Endpoints

#### Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

#### Products

GET /api/products → Get all products (with pagination & sorting)

GET /api/products/myproducts → Get products added by logged-in seller

POST /api/products → Add new product (seller only)

PUT /api/products/:id → Update product (seller only)

DELETE /api/products/:id → Delete product (seller only)

# Author

- Vivek Sharma

- Backend Developer Intern Assignment
