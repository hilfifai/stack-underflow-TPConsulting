# StackUnderflow API - Rust

A Q&A Platform API built with **Rust**, **Actix-web**, and **SQLx**. Follows clean architecture with separation of concerns.

---

## 🧬 Project Structure

```
backend/rust/
├── src/
│   ├── main.rs              # Entry point
│   ├── models/
│   │   └── mod.rs          # Database models (User, Question, Comment)
│   ├── repositories/
│   │   └── mod.rs          # Data access layer
│   ├── services/
│   │   └── mod.rs          # Business logic
│   └── handlers/
│       └── mod.rs          # Request handlers
├── Cargo.toml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Rust 1.70+
- PostgreSQL
- Cargo

### Installation

```bash
# Navigate to backend directory
cd backend/rust

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgres://postgres:password@localhost:5432/stackunderflow
# JWT_SECRET=your-super-secret-key-minimum-32-characters

# Run database migrations (create tables manually or use sqlx-cli)
sqlx database create
sqlx migrate run

# Build and run
cargo build
cargo run
```

Server will run at `http://localhost:8080`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/register` | Register new user |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/questions` | Create question |
| GET | `/api/v1/questions` | Get all questions |
| GET | `/api/v1/questions/{id}` | Get question by ID |
| PUT | `/api/v1/questions/{id}` | Update question |
| DELETE | `/api/v1/questions/{id}` | Delete question |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/comments` | Create comment |
| GET | `/api/v1/comments/question/{questionId}` | Get comments by question |
| DELETE | `/api/v1/comments/{id}` | Delete comment |

---

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `cargo build` | Build the project |
| `cargo run` | Run the project |
| `cargo run --release` | Build and run in release mode |
| `cargo check` | Check for compilation errors |

---

## 📦 Dependencies

- **actix-web**: Web framework
- **sqlx**: Async SQL query builder
- **serde**: Serialization/deserialization
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **chrono**: Date/time handling
- **uuid**: UUID generation
- **dotenv**: Environment variables

---

## ✅ Testing with Postman

Import `postman-collection.json` from backend/rust folder and update the `baseUrl` variable to:
```
http://localhost:8080/api/v1
```
