# StackUnderflow API - Node.js

A Q&A Platform API built with **Node.js**, **Express**, and **Prisma ORM**. Follows clean architecture with separation of concerns.

---

## 🧬 Project Structure

```
backend/node/
├── src/
│   ├── config/           # Configuration files
│   │   └── database.js   # Prisma client
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── repositories/     # Data access layer
│   ├── dto/              # Request validation DTOs
│   ├── middleware/       # Express middleware
│   ├── routes/           # Route definitions
│   └── app.js           # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend/node

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/stackunderflow
# JWT_SECRET=your-secret-key

# Run database migrations
npm run migrate

# Generate Prisma client
npm run generate

# Start development server
npm run dev
```

Server will run at `http://localhost:3000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/data` | Get current user data |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/questions` | Create question |
| GET | `/api/v1/questions` | Get all questions |
| GET | `/api/v1/questions/paginated` | Get paginated questions |
| GET | `/api/v1/questions/search?q=...` | Search questions |
| GET | `/api/v1/questions/hot` | Get hot questions |
| GET | `/api/v1/questions/:id` | Get question by ID |
| GET | `/api/v1/questions/:id/related` | Get related questions |
| PUT | `/api/v1/questions/:id` | Update question |
| DELETE | `/api/v1/questions/:id` | Delete question |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/comments` | Create comment |
| GET | `/api/v1/comments/question/:questionId` | Get comments by question |
| DELETE | `/api/v1/comments/:id` | Delete comment |

---

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm start` | Start production server |
| `npm run migrate` | Run database migrations |
| `npm run generate` | Generate Prisma client |
| `npm test` | Run tests |

---

## 📦 Dependencies

- **@prisma/client**: ORM for PostgreSQL
- **express**: Web framework
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Request validation
- **cors**: CORS middleware
- **dotenv**: Environment variables
- **winston**: Logging
