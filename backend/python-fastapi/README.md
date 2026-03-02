# StackUnderflow API - Python FastAPI

A Q&A Platform API built with **Python**, **FastAPI**, and **SQLAlchemy ORM**. Follows clean architecture with separation of concerns.

---

## 🧬 Project Structure

```
backend/python-fastapi/
├── config/
│   └── database.py         # SQLAlchemy configuration
├── models/
│   └── models.py          # SQLAlchemy ORM models
├── repositories/
│   ├── user.repository.py
│   ├── question.repository.py
│   └── comment.repository.py
├── services/
│   ├── auth.service.py
│   ├── question.service.py
│   └── comment.service.py
├── routes/
│   ├── auth.routes.py
│   ├── question.routes.py
│   └── comment.routes.py
├── schemas/
│   └── schemas.py         # Pydantic DTOs
├── main.py                # Entry point
├── requirements.txt
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python >= 3.9
- PostgreSQL
- pip or uv

### Installation

```bash
# Navigate to backend directory
cd backend/python-fastapi

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/stackunderflow
# SECRET_KEY=your-secret-key

# Run database migrations (auto-create tables)
uvicorn main:app --reload
```

Server will run at `http://localhost:8000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/data` | Get current user data |
| POST | `/api/v1/auth/register` | Register new user |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/questions` | Create question |
| GET | `/api/v1/questions` | Get all questions |
| GET | `/api/v1/questions/paginated` | Get paginated questions |
| GET | `/api/v1/questions/search` | Search questions |
| GET | `/api/v1/questions/hot` | Get hot questions |
| GET | `/api/v1/questions/{id}` | Get question by ID |
| GET | `/api/v1/questions/{id}/related` | Get related questions |
| PUT | `/api/v1/questions/{id}` | Update question |
| DELETE | `/api/v1/questions/{id}` | Delete question |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/comments` | Create comment |
| GET | `/api/v1/comments/question/{question_id}` | Get comments by question |
| DELETE | `/api/v1/comments/{id}` | Delete comment |

---

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 📚 API Documentation

FastAPI provides auto-generated interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🛠️ Running the Server

```bash
# Development
uvicorn main:app --reload

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📦 Dependencies

- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **sqlalchemy**: ORM for PostgreSQL
- **psycopg2-binary**: PostgreSQL adapter
- **pydantic**: Data validation
- **python-jose**: JWT encoding/decoding
- **passlib**: Password hashing
- **python-dotenv**: Environment variables

---

## ✅ Testing with Postman

Import `postman-collection.json` from backend/node folder and update the `baseUrl` variable to:
```
http://localhost:8000/api/v1
```
