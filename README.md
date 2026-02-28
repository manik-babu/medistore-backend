# 🏥 MediStore Backend API

RESTful API for MediStore online pharmacy platform.

## Live Link
```
https://medistore-unique.vercel.app
```

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js / NestJS
- **Database**: PostgreSQL / MongoDB
- **ORM**: Prisma / TypeORM
- **Authentication**: JWT / Better Auth
- **Validation**: Zod
- **File Upload**: Multer / Cloudinary


## 📦 Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

## 🔧 Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/medistore"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
CLOUDINARY_URL="cloudinary://..."
```

## 📁 Project Structure
```
backend/
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