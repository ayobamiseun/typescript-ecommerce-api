# E-Commerce API with Node.js, Express & TypeORM

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![TypeORM](https://img.shields.io/badge/TypeORM-v0.3-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue)

A robust RESTful API for e-commerce applications featuring user authentication, product management, shopping cart functionality, order processing, and digital wallet integration.

## Features

- **User Authentication**
  - JWT-based registration/login
  - Password hashing with bcrypt
  - Protected routes

- **Product Management**
  - CRUD operations for products
  - Product categories
  - Product ratings and reviews

- **Shopping Cart**
  - Add/remove items
  - Quantity adjustment
  - Cart persistence

- **Order Processing**
  - Order creation from cart
  - Order status tracking
  - Order history

- **Digital Wallet**
  - Wallet balance management
  - Transaction support

## API Endpoints

| Endpoint          | Method | Description                     |
|-------------------|--------|---------------------------------|
| `/api/users`      | POST   | Register new user               |
| `/api/users/login`| POST   | User login                      |
| `/api/products`   | GET    | Get all products                |
| `/api/cart`       | POST   | Add item to cart                |
| `/api/orders`     | POST   | Create new order                |
| `/api/wallets`    | GET    | Get wallet balance              |

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: TypeORM (supports PostgreSQL, MySQL, etc.)
- **Authentication**: JWT
- **Language**: TypeScript
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Database (PostgreSQL recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayobamiseun/typescript-ecommerce-api.git
   cd typescript-ecommerce-api