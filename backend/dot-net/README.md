# StackUnderflow API - .NET 8

A Q&A Platform API built with **.NET 8**, **ASP.NET Core**, and **Entity Framework Core**. Follows clean architecture with separation of concerns.

---

## 🧬 Project Structure

```
backend/dot-net/
├── Data/
│   └── AppDbContext.cs     # Entity Framework DbContext
├── Models/
│   ├── User.cs
│   ├── Question.cs
│   └── Comment.cs
├── Repositories/
│   ├── UserRepository.cs
│   ├── QuestionRepository.cs
│   └── CommentRepository.cs
├── Services/
│   ├── AuthService.cs
│   ├── QuestionService.cs
│   └── CommentService.cs
├── DTOs/
│   ├── AuthDTOs.cs
│   ├── QuestionDTOs.cs
│   └── CommentDTOs.cs
├── Controllers/
│   ├── AuthController.cs
│   ├── QuestionController.cs
│   └── CommentController.cs
├── Program.cs
├── backend.csproj
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- PostgreSQL
- Visual Studio 2022 / VS Code

### Installation

```bash
# Navigate to backend directory
cd backend/dot-net

# Restore dependencies
dotnet restore

# Update appsettings.json with your database credentials
# "ConnectionStrings": {
#   "DefaultConnection": "Host=localhost;Database=stackunderflow;Username=postgres;Password=password"
# }

# Run the application
dotnet run
```

Server will run at `http://localhost:5000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/register` | Register new user |
| GET | `/api/v1/auth/data` | Get current user data |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/questions` | Create question |
| GET | `/api/v1/questions` | Get all questions |
| GET | `/api/v1/questions/paginated` | Get paginated questions |
| GET | `/api/v1/questions/search?q=...` | Search questions |
| GET | `/api/v1/questions/hot` | Get hot questions |
| GET | `/api/v1/questions/{id}` | Get question by ID |
| GET | `/api/v1/questions/{id}/related` | Get related questions |
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
| `dotnet restore` | Restore NuGet packages |
| `dotnet build` | Build the project |
| `dotnet run` | Run the project |
| `dotnet watch run` | Run with hot reload |

---

## 📦 Dependencies

- **Microsoft.AspNetCore.Authentication.JwtBearer**: JWT authentication
- **Microsoft.EntityFrameworkCore**: ORM for PostgreSQL
- **Npgsql.EntityFrameworkCore.PostgreSQL**: PostgreSQL provider
- **BCrypt.Net-Next**: Password hashing
- **Swashbuckle.AspNetCore**: Swagger/OpenAPI

---

## 📚 API Documentation

Swagger UI available at: `http://localhost:5000/swagger`

---

## ✅ Testing with Postman

Import `postman-collection.json` from backend/dot-net folder and update the `baseUrl` variable to:
```
http://localhost:5000/api/v1
```
