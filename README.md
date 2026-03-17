# 🏥 MediStore Backend API

> A robust, production-ready RESTful API for the MediStore online pharmacy platform built with **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-0C344B?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

--- 

[![Live API](https://img.shields.io/badge/Live%20API-medistore--max.vercel.app-blue?style=flat-square)](https://medistore-unique.vercel.app)

🔗 Copy
```
https://medistore-unique.vercel.app
```

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## 🎯 Overview

MediStore Backend is a comprehensive RESTful API service that powers the MediStore online pharmacy platform. It handles all core business logic including user authentication, medicine inventory management, order processing, review systems, and administrative operations. Built with modern backend best practices, the API ensures security, reliability, and excellent performance.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- **Better Auth Integration**: Secure authentication with session management
- **Role-Based Access Control**: Three user roles (Customer, Seller, Admin)
- **Email Verification**: Secure email-based account verification
- **JWT Tokens**: Token-based API authentication
- **Protected Routes**: Middleware-based route protection

### 💊 **Medicine Management**
- **CRUD Operations**: Create, read, update, delete medicines
- **Image Management**: Cloudinary integration for image storage
- **Product Details**: Description, pricing, category, and stock management
- **Featured Medicines**: Highlight popular products
- **Ban/Unban System**: Admin control over medicine availability
- **Category Management**: Organize medicines by categories

### 🛒 **Shopping Cart System**
- **Add to Cart**: Add medicines with quantity selection
- **Cart Management**: View, update, and delete cart items
- **Persistent Storage**: Cart data persisted in database
- **Order Creation**: Convert cart to orders seamlessly

### 📦 **Order Management**
- **Order Creation**: Create orders from cart items
- **Order Tracking**: Real-time order status updates
- **Order History**: Complete order records for customers and sellers
- **Status Management**: Processing → Shipped → Delivered → Cancelled
- **Seller Order View**: Sellers can manage their orders
- **Customer Order View**: Customers can track their purchases

### ⭐ **Review & Rating System**
- **Product Reviews**: Customers can leave reviews and ratings
- **Store Replies**: Sellers can respond to customer reviews
- **Rating Display**: Average ratings and review counts
- **Review Validation**: Ensure authentic reviews

### 👥 **User Management**
- **Customer Accounts**: Registration and profile management
- **Seller Accounts**: Seller registration with inventory access
- **Admin Accounts**: Full platform oversight
- **User Ban**: Admin can ban/unban users
- **User Roles**: Dynamic role assignment and management

### 📊 **Admin Dashboard**
- **Platform Statistics**: User, order, and sales metrics
- **User Management**: View and manage all users
- **Medicine Moderation**: Approve/reject medicines
- **Order Monitoring**: Track all platform orders
- **Ban Management**: Enforce platform policies

---

## 🚀 Tech Stack

### Core Technologies
- **Runtime**: [Node.js 20+](https://nodejs.org/)
- **Framework**: [Express.js 5.x](https://expressjs.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

### Database & ORM
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Adapter**: [@prisma/adapter-pg](https://www.prisma.io/)
- **ORM**: [Prisma 7.x](https://www.prisma.io/)
- **Driver**: [pg (PostgreSQL driver)](https://node-postgres.com/)

### Authentication
- **Authentication Framework**: [Better Auth](https://better-auth.js.org/)
- **Token Management**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

### File & Image Management
- **File Upload**: [Multer 2.x](https://github.com/expressjs/multer)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)

### Utilities & Middleware
- **CORS**: [cors](https://github.com/expressjs/cors) - Cross-Origin Resource Sharing
- **Environment**: [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- **Email**: [nodemailer](https://nodemailer.com/) - Email sending service
- **Build Tool**: [tsup](https://tsup.egoist.dev/) - TypeScript bundler
- **Development**: [tsx](https://github.com/esbuild-kit/tsx) - TypeScript executor

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 20.0 or higher
- **npm** 8.x or higher (or yarn/pnpm)
- **PostgreSQL** 13 or higher
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manik-babu/medistore-backend.git
   cd medistore-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   See [Environment Variables](#environment-variables) section for details.

4. **Set up the database**
   ```bash
   # Create database and run migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed:admin
   ```
   This creates a default admin account for testing.

6. **Start the development server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000` by default.

7. **Verify the API**
   ```bash
   curl http://localhost:3000
   ```
   Expected response:
   ```json
   {
     "ok": true,
     "message": "API is running successfully",
     "server": "MediStore API",
     "version": "1.0.0",
     "timestamp": "2026-03-16T..."
   }
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/medistore"

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration (Image Storage)
CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email Configuration (for email verification)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_SERVICE="gmail"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secure-random-string"
BETTER_AUTH_URL=http://localhost:3000
```

### Variable Descriptions

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `DATABASE_URL` | Required | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/medistore` |
| `PORT` | Optional | Server port (default: 3000) | `3000` |
| `NODE_ENV` | Optional | Environment (development/production) | `development` |
| `FRONTEND_URL` | Required | Frontend application URL for CORS | `http://localhost:3000` |
| `CLOUDINARY_NAME` | Required | Cloudinary account name | `your-account` |
| `CLOUDINARY_API_KEY` | Required | Cloudinary API key | `xxx...` |
| `CLOUDINARY_API_SECRET` | Required | Cloudinary API secret | `xxx...` |
| `EMAIL_USER` | Required | Email sender address | `noreply@medistore.com` |
| `EMAIL_PASSWORD` | Required | Email password/app password | `xxxx xxxx xxxx xxxx` |
| `EMAIL_SERVICE` | Required | Email service provider | `gmail` |
| `BETTER_AUTH_SECRET` | Required | Auth secret key (use strong random) | `xxx...` |
| `BETTER_AUTH_URL` | Required | Auth callback URL | `http://localhost:3000` |

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ role        │
│ isBanned    │
└─────────────┘
      │
      ├──────────────┬─────────────┬──────────────┐
      │              │             │              │
      ▼              ▼             ▼              ▼
┌──────────────┐ ┌──────────┐ ┌────────┐ ┌────────────┐
│  Medicine    │ │  Review  │ │  Cart  │ │Order      │
├──────────────┤ ├──────────┤ ├────────┤ ├────────────┤
│ id (PK)      │ │ id (PK)  │ │ id (PK)│ │ id (PK)    │
│ name         │ │ content  │ │ qty    │ │ status     │
│ price        │ │ rating   │ │ author │ │ customer   │
│ description  │ │ author   │ │ order  │ │ seller     │
│ imageUrl     │ │ storeRep │ │        │ │ address    │
│ category     │ │ medicine │ │        │ │ carts[]    │
│ author       │ │          │ │        │ │            │
└──────────────┘ └──────────┘ └────────┘ └────────────┘
      │              │              │               │
      └──────────────┴──────────────┴───────────────┘
              Relations to User
```

### Key Models

**User** - Authentication and profile
- Multiple roles: CUSTOMER, SELLER, ADMIN
- Email verification status
- Ban status for content moderation

**Medicine** - Product inventory
- Managed by sellers
- Categories for organization
- Cloudinary image storage
- Price and availability

**Review** - Customer feedback
- Rating and text content
- Seller reply capability
- Linked to medicine and user

**Cart** - Shopping cart items
- Quantity management
- Can be converted to orders
- Linked to user and medicine

**Order** - Purchase records
- Status tracking (PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- Customer and seller references
- Shipping address and contact
- Contains multiple cart items

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/sign-up              - Register new user
POST   /api/auth/sign-in              - Login user
POST   /api/auth/sign-out             - Logout user
POST   /api/auth/verify-email         - Verify email address
GET    /api/auth/session              - Get current session
POST   /api/auth/forgot-password      - Request password reset
```

### Medicine Routes
```
GET    /api/medicines                 - Get all medicines
GET    /api/medicines/:medicineId     - Get medicine details
GET    /api/categories                - Get all categories
GET    /api/featured                  - Get featured medicines
POST   /api/medicines                 - Create medicine (Seller)
PUT    /api/medicines/:medicineId     - Update medicine (Seller)
DELETE /api/medicines/:medicineId     - Delete medicine (Seller)
```

### Cart Routes
```
GET    /api/carts                     - Get user's cart
POST   /api/carts                     - Add to cart
PATCH  /api/carts/:cartId             - Update cart item
DELETE /api/carts/:cartId             - Remove from cart
```

### Order Routes (Customer)
```
GET    /api/orders                    - Get user's orders
POST   /api/orders                    - Create order
GET    /api/orders/:orderId           - Get order details
PATCH  /api/orders/:orderId           - Update order status
```

### Order Routes (Seller)
```
GET    /api/seller/orders             - Get seller's orders
GET    /api/seller/orders/:orderId    - Get seller's single order
PATCH  /api/seller/orders/:orderId    - Update seller's order status
```

### Review Routes
```
POST   /api/reviews                   - Create review (Customer)
GET    /api/reviews/:medicineId       - Get medicine reviews
DELETE /api/reviews/:reviewId         - Delete review (Customer)
PATCH  /api/reviews/reply/:reviewId   - Add seller reply (Seller)
```

### Seller Routes
```
POST   /api/seller/medicines                     - Create medicine
GET    /api/seller/medicines                     - Get seller's medicines
PUT    /api/seller/medicines/:medicineId         - Update medicine
DELETE /api/seller/medicines/:medicineId         - Delete medicine
GET    /api/seller/dashboard                     - Get dashboard statistics
```

### Admin Routes
```
GET    /api/admin/users               - List all users
GET    /api/admin/users/:userId       - Get user details
PATCH  /api/admin/users/:userId       - Update user (ban/unban)
GET    /api/admin/medicines           - List all medicines
PATCH  /api/admin/medicines/:medicineId - Approve/reject medicine
POST   /api/admin/category            - Create category
GET    /api/admin/statics             - Get platform statistics
```

### User Routes
```
GET    /api/user/profile              - Get user profile
PATCH  /api/user/profile              - Update user profile
PATCH  /api/user/change-role          - Change user role
POST   /api/user/update/profile       - Upload profile image
```

---

## 📁 Project Structure

```
backend/
├── api/                              # Vercel API functions (production)
├── generated/
│   └── prisma/                       # Auto-generated Prisma types
│       ├── client.ts
│       ├── models.ts
│       ├── enums.ts
│       └── commonInputTypes.ts
│
├── prisma/                           # Database schema & migrations
│   ├── schema.prisma                 # Database schema definition
│   ├── migrations/                   # Migration history
│   │   ├── 20260127161957_init/
│   │   ├── 20260127171241_auth/
│   │   ├── 20260128061323_medicine_image/
│   │   └── ... (other migrations)
│   └── migration_lock.toml
│
├── src/
│   ├── app.ts                        # Express app configuration
│   ├── server.ts                     # Server entry point
│   │
│   ├── configs/
│   │   └── cloudinary.ts             # Cloudinary setup
│   │
│   ├── helper/
│   │   ├── customError.ts            # Custom error class
│   │   └── sendEmail.ts              # Email utility functions
│   │
│   ├── lib/
│   │   ├── auth.ts                   # Better Auth setup
│   │   └── prisma.ts                 # Prisma client setup
│   │
│   ├── middleware/
│   │   ├── auth.ts                   # Authentication middleware
│   │   └── errorHandler.ts           # Global error handler
│   │
│   ├── modules/                      # Feature modules
│   │   ├── admin/                    # Admin operations
│   │   │   ├── admin.routes.ts
│   │   │   ├── admin.controller.ts
│   │   │   └── admin.service.ts
│   │   │
│   │   ├── cart/                     # Shopping cart
│   │   │   ├── cart.routes.ts
│   │   │   ├── cart.controller.ts
│   │   │   └── cart.service.ts
│   │   │
│   │   ├── medicine/                 # Medicine inventory
│   │   │   ├── medicine.routes.ts
│   │   │   ├── medicine.controller.ts
│   │   │   └── medicine.service.ts
│   │   │
│   │   ├── order/                    # Order management
│   │   │   ├── order.routes.ts
│   │   │   ├── order.controller.ts
│   │   │   └── order.service.ts
│   │   │
│   │   ├── review/                   # Reviews & ratings
│   │   │   ├── review.routes.ts
│   │   │   ├── review.controller.ts
│   │   │   └── review.service.ts
│   │   │
│   │   ├── seller/                   # Seller operations
│   │   │   ├── seller.routes.ts
│   │   │   ├── seller.controller.ts
│   │   │   └── seller.service.ts
│   │   │
│   │   └── user/                     # User management
│   │       ├── user.routes.ts
│   │       ├── user.controller.ts
│   │       └── user.service.ts
│   │
│   ├── scripts/
│   │   └── seedAdmin.ts              # Database seeding script
│   │
│   └── types/
│       ├── express.d.ts              # Express middleware types
│       └── loggedInUser.ts           # User auth types
│
├── .env                              # Environment variables
├── .env.example                      # Example environment file
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
├── prisma.config.ts                  # Prisma configuration
├── vercel.json                       # Vercel deployment config
└── README.md                         # This file
```

---

## 📦 Available Scripts

### Development
```bash
npm run dev              # Start development server with hot reload
```

### Production
```bash
npm run build            # Build for production
npm start                # Start production server
```

### Database & Prisma
```bash
prisma migrate dev       # Create and apply migrations
prisma migrate deploy    # Apply migrations in production
prisma generate          # Generate Prisma types
prisma studio           # Open Prisma Studio GUI
```

### Seeds
```bash
npm run seed:admin       # Create default admin user
```

---

## 🏗️ Architecture

### Modular Architecture

The backend follows a **feature-based modular architecture** with clear separation of concerns:

```
Request → Routes → Controllers → Services → Prisma (Database)
```

#### **Routes** (`*.routes.ts`)
- Define API endpoints
- Handle request routing
- Attach middleware

#### **Controllers** (`*.controller.ts`)
- Handle HTTP requests/responses
- Validate request data
- Call service methods

#### **Services** (`*.service.ts`)
- Core business logic
- Database operations via Prisma
- Data validation and transformation

#### **Middleware** (`middleware/`)
- Authentication checks
- Error handling
- Request validation

### Request Flow Example

```
POST /api/medicines
  ↓
medicineRoute (authentication check)
  ↓
medicineController.create() (validate input)
  ↓
medicineService.createMedicine() (business logic)
  ↓
prisma.medicine.create() (database operation)
  ↓
Response with created medicine
```

---

## 🔐 Authentication & Authorization

### Better Auth Integration

The backend uses [Better Auth](https://better-auth.js.org/) for secure authentication:

- **Email/Password Authentication**: Secure credential-based login
- **Session Management**: Server-side session tracking
- **Email Verification**: Required for account activation
- **Password Security**: Hashed passwords with bcrypt

### Role-Based Access Control (RBAC)

Three distinct user roles with specific permissions:

| Role | Permissions |
|------|-------------|
| **CUSTOMER** | Browse medicines, cart, orders, reviews |
| **SELLER** | Manage medicines, view orders, respond to reviews |
| **ADMIN** | Full platform control, moderation, user management |

### Middleware Protection

Routes are protected using the `authMiddleware`:

```typescript
// Customer-only route
app.use("/api/carts", authMiddleware(UserRole.CUSTOMER), cartRoute);

// Seller-only route
app.use("/api/seller", authMiddleware(UserRole.SELLER), sellerRoute);

// Multi-role route
app.use("/api/user", authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userRoute);
```

---

## ⚠️ Error Handling

### Custom Error Class

The application uses a custom error handler for consistent error responses:

```typescript
throw new CustomError("Error message", 400, "ERROR_CODE");
```

### Global Error Handler

All errors are caught by the global error handler middleware and returned in a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "timestamp": "2026-03-16T..."
}
```

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

The project is configured for Vercel serverless deployment:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `backend` directory as root

3. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add all `.env` variables

4. **Deploy**
   - Vercel automatically detects Node.js app
   - Runs build command: `npm run build`
   - Deploys serverless functions

### Self-Hosted Deployment

#### Using PM2
```bash
npm install -g pm2
npm run build
pm2 start npm --name "medistore-api" -- start
pm2 save
```

#### Using Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm run build
COPY . .
CMD ["npm", "start"]
```

#### Using systemd
Create `/etc/systemd/system/medistore-api.service`:
```ini
[Unit]
Description=MediStore API
After=network.target

[Service]
Type=simple
User=medistore
WorkingDirectory=/home/medistore/app
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Database Deployment

#### Prisma Postgres
```bash
prisma db push
prisma migrate deploy
```

#### Self-Hosted PostgreSQL
Ensure your `DATABASE_URL` points to your PostgreSQL instance and run migrations:
```bash
npx prisma migrate deploy
```

---

## 🔒 Security Best Practices

✅ **Implemented**
- Environment variable protection
- CORS configuration for frontend-only access
- Middleware-based route protection
- Secure password hashing
- JWT token validation
- Input validation (TypeScript types)
- Error sanitization (no stack traces in production)

✅ **Recommended**
- Regular security audits
- Rate limiting on sensitive endpoints
- SQL injection prevention (via Prisma)
- XSS protection
- HTTPS enforcement
- Regular dependency updates

---

## 👨‍💻 Author

**Manik** - [GitHub](https://github.com/manik-babu)

---

## 📮 Support

For support, please [open an issue](https://github.com/manik-babu/medistore-backend/issues) on GitHub or contact us directly.

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM
- [Better Auth](https://better-auth.js.org/) - Authentication
- [Cloudinary](https://cloudinary.com/) - Image storage
- [PostgreSQL](https://www.postgresql.org/) - Database

---

**Happy coding! 🎉**
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── index.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## 🔑 API Endpoints

### **Authentication**
```
POST   /api/auth/signup          # Register user
POST   /api/auth/login           # Login
GET    /api/auth/verify-email    # Verify email
POST   /api/auth/logout          # Logout
```

### **Medicines**
```
GET    /api/medicines            # Get all medicines
GET    /api/medicines/:id        # Get medicine by ID
POST   /api/medicines            # Create medicine (Seller)
PUT    /api/medicines/:id        # Update medicine (Seller)
DELETE /api/medicines/:id        # Delete medicine (Seller)
```

### **Cart**
```
GET    /api/cart                 # Get user cart
POST   /api/cart                 # Add to cart
PATCH  /api/cart/:id             # Update cart item
DELETE /api/cart/:id             # Remove from cart
GET    /api/cart/count           # Get cart count
```

### **Orders**
```
GET    /api/orders               # Get user orders
GET    /api/orders/:id           # Get order details
POST   /api/orders               # Create order
PATCH  /api/orders/:id           # Update order status (Seller)
DELETE /api/orders/:id           # Cancel order
```

### **Reviews**
```
GET    /api/reviews/:medicineId  # Get medicine reviews
POST   /api/reviews              # Create review
PATCH  /api/reviews/:id          # Update review
DELETE /api/reviews/:id          # Delete review
```

### **Admin**
```
GET    /api/admin/dashboard      # Dashboard stats
GET    /api/admin/users          # Get all users
PATCH  /api/admin/users/:id      # Ban/Unban user
GET    /api/admin/medicines      # Get all medicines
PATCH  /api/admin/medicines/:id  # Approve/Ban medicine
```

## 🗄️ Database Schema

### **User**
- id, name, email, password, role, image, banned, createdAt

### **Medicine**
- id, name, price, description, category, image, featured, banned, authorId

### **Order**
- id, customerId, sellerId, status, address, phone, totalPrice, createdAt

### **Cart**
- id, userId, medicineId, quantity, createdAt

### **Review**
- id, medicineId, authorId, rating, content, storeReply, createdAt

## 🔐 Authentication

Protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your-token>
```

## 📊 Response Format

### Success Response
```json
{
  "ok": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "ok": false,
  "status": 500,
  "message": "Error message",
  "error": "Error details"
}
```

## 🚀 Scripts
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run seed         # Seed database
npm run test         # Run tests
```

## 📝 User Roles

- **CUSTOMER**: Browse and purchase
- **SELLER**: Manage medicines and orders
- **ADMIN**: Platform management

## 🔒 Security Features

- Password hashing (bcrypt)
- JWT authentication
- Input validation (Zod)
- SQL injection prevention
- CORS configuration
- Rate limiting

## 👥 Author

Your Name - [GitHub](https://github.com/manik-babu)

---

Made with ❤️ for MediStore