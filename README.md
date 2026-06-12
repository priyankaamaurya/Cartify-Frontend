# Cartify – Full Stack E-Commerce Application

![Cartify Banner](https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=400&fit=crop)

A full-stack e-commerce application built with **Spring Boot** (backend) and **React.js** (frontend), featuring JWT authentication, role-based access control, and real-time email notifications.

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | [cartify-frontend-28x5-priyankaamauryas-projects.vercel.app](https://cartify-frontend-28x5-priyankaamauryas-projects.vercel.app) |
| Backend API | [e-commerce-backend-production-d6f0.up.railway.app](https://e-commerce-backend-production-d6f0.up.railway.app) |
| Swagger UI | [Swagger Docs](https://e-commerce-backend-production-d6f0.up.railway.app/swagger-ui/index.html) |

---

## Features

### Authentication & Security
- User registration and login
- JWT (JSON Web Token) based authentication
- Role-based authorization — **USER** / **ADMIN**
- Password encryption using BCrypt
- Stateless session handling

### Product Management
- Browse all products with images
- Search products by name
- Add, edit, delete products (**Admin only**)
- Stock quantity management

### Cart Management
- Add products to cart
- Update quantity with `+` / `−` controls
- Remove items from cart
- Automatic total price calculation

### Order Management
- Place order from cart
- Auto cart clear after order placement
- Order history with status tracking
- Admin can update order status (PENDING → SHIPPED → DELIVERED)

### Email Notifications
- Order confirmation email sent via **SendGrid**
- HTML email template with order details

### User Profile
- View profile (username, email, role)
- Change password securely

---

## Tech Stack

**Backend:**
| Technology | Purpose |
|------------|---------|
| Java 21 | Programming Language |
| Spring Boot 4.x | Backend Framework |
| Spring Security | Authentication & Authorization |
| JWT (jjwt) | Token-based Auth |
| Spring Data JPA | ORM |
| Hibernate | Database Persistence |
| PostgreSQL | Database |
| SendGrid | Email Service |
| Swagger UI | API Documentation |
| Maven | Build Tool |

**Frontend:**
| Technology | Purpose |
|------------|---------|
| React.js | Frontend Framework |
| Vite | Build Tool |
| Context API | State Management |
| Fetch API | REST API Integration |
| JSX | UI Components |

**Deployment:**
| Service | Purpose |
|---------|---------|
| Railway | Backend + PostgreSQL Hosting |
| Vercel | Frontend Hosting |

---

## Project Structure

```
Cartify/
├── backend/                    # Spring Boot Backend
│   ├── controller/             # REST API Controllers
│   │   ├── AuthController.java
│   │   ├── ProductController.java
│   │   ├── CartController.java
│   │   ├── OrderController.java
│   │   └── UserController.java
│   ├── service/                # Business Logic
│   │   ├── AuthService.java
│   │   ├── ProductService.java
│   │   ├── CartService.java
│   │   ├── OrderService.java
│   │   ├── UserService.java
│   │   └── EmailService.java
│   ├── model/                  # JPA Entities
│   │   ├── User.java
│   │   ├── Product.java
│   │   ├── CartItem.java
│   │   ├── Order.java
│   │   └── OrderItem.java
│   ├── repository/             # Spring Data JPA Repos
│   ├── security/               # JWT Filter & Util
│   ├── config/                 # Security & Swagger Config
│   ├── dto/                    # Data Transfer Objects
│   └── exception/              # Global Exception Handler
│
└── frontend/                   # React.js Frontend
    └── src/
        └── Cartify.jsx         # Main App (Single File)
```

---

## API Endpoints

### Auth APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Product APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/{id}` | Get product by ID | Public |
| POST | `/api/products` | Add new product | ADMIN |
| PUT | `/api/products/{id}` | Update product | ADMIN |
| DELETE | `/api/products/{id}` | Delete product | ADMIN |

### Cart APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/cart/add` | Add item to cart | USER |
| GET | `/api/cart` | View cart | USER |
| PUT | `/api/cart/update` | Update quantity | USER |
| DELETE | `/api/cart/{itemId}` | Remove item | USER |
| DELETE | `/api/cart/clear` | Clear cart | USER |

### Order APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders/place` | Place order | USER |
| GET | `/api/orders/my` | Get my orders | USER |
| GET | `/api/orders/all` | Get all orders | ADMIN |
| PUT | `/api/orders/{id}/status` | Update status | ADMIN |

### User APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/profile` | Get profile | USER/ADMIN |
| PUT | `/api/users/change-password` | Change password | USER/ADMIN |

---

## Authentication Flow

```
1. User registers → POST /api/auth/register
2. User logs in → POST /api/auth/login → receives JWT token
3. Client stores token in localStorage
4. Every request includes: Authorization: Bearer <JWT_TOKEN>
5. Server validates token → processes request
```

---

## Database Design

```
User          Product        CartItem       Order         OrderItem
------        -------        --------       -----         ---------
id            id             id             id            id
username      name           username       username      product_id
email         description    product_id     total_price   product_name
password      price          quantity       order_date    price
role          stock                         status        quantity
              image_url                     items[]
```

---

## Run Locally

### Prerequisites
- Java 21
- Maven
- PostgreSQL
- Node.js 18+

### Backend Setup

```bash
# Clone repository
git clone https://github.com/priyankaamaurya/E-Commerce-Backend.git
cd E-Commerce-Backend/backend

# Configure application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_password
jwt.secret=your_secret_key
sendgrid.api.key=your_sendgrid_key
sendgrid.from.email=your_email@gmail.com

# Run
mvn spring-boot:run
```

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/priyankaamaurya/cartify-frontend.git
cd cartify-frontend

# Install dependencies
npm install

# Update BASE_URL in src/App.jsx
const BASE_URL = "http://localhost:8080";

# Run
npm run dev
```

Open **http://localhost:5173** 🎉

---

## Test Credentials

| Role | Username | Password |
|------|----------|----------|
| ADMIN | admin | admin123 |
| USER | Register via app | - |

> Register via Swagger UI to create ADMIN: `POST /api/auth/register` with `"role": "ADMIN"`

---

## Screenshots

### Home Page
![Home](https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop)

### Products Page
Browse products with images, search functionality and hover effects.

### Cart Page
Manage cart items with quantity controls and order summary.

### Admin Panel
Add/edit/delete products and manage all orders with status updates.

---

## Future Enhancements

- [ ] Payment gateway integration (Razorpay)
- [ ] Product search & filtering by category/price
- [ ] Pagination on products and orders
- [ ] Product ratings and reviews
- [ ] Microservices migration
- [ ] Mobile app (React Native)

---

## Author

**Priyanka Maurya**

BCA Graduate | Java Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-priyankaamaurya-black?style=flat&logo=github)](https://github.com/priyankaamaurya)

---

## Show Your Support

If you like this project, give it a **⭐ star** on GitHub!

---

*Built with ❤️ using Spring Boot + React.js*
