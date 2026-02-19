# StackUnderflow Backend (Java Spring Boot)

A RESTful API backend for the StackUnderflow Q and A platform built with Spring Boot 3.2.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Questions**: Create, read, update, delete questions with voting and view counting
- **Comments**: Add comments to questions with voting support
- **Search**: Search questions by keyword
- **Security**: JWT-based authentication with BCrypt password encoding

## Tech Stack

- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- MySQL Database
- JWT (JSON Web Tokens)
- Lombok
- Maven

## Project Structure

```
backend/java-springbot/
├── pom.xml                                    # Maven configuration
├── README.md                                  # This file
└── src/
    └── main/
        ├── java/com/stackunderflow/backend/
        │   ├── BackendApplication.java         # Main application class
        │   ├── config/
        │   │   ├── PasswordConfig.java        # Password encoder configuration
        │   │   ├── SecurityConfig.java        # Security configuration
        │   │   └── UserDetailsServiceImpl.java # User details service
        │   ├── controller/
        │   │   ├── AuthController.java         # Authentication endpoints
        │   │   ├── CommentController.java     # Comment CRUD endpoints
        │   │   ├── HealthController.java      # Health check endpoint
        │   │   └── QuestionController.java    # Question CRUD endpoints
        │   ├── dto/
        │   │   ├── AuthResponse.java          # Authentication response DTO
        │   │   ├── CommentRequest.java         # Comment request DTO
        │   │   ├── LoginRequest.java           # Login request DTO
        │   │   ├── QuestionRequest.java        # Question request DTO
        │   │   └── RegisterRequest.java        # Registration request DTO
        │   ├── entity/
        │   │   ├── Comment.java               # Comment entity
        │   │   ├── Question.java              # Question entity
        │   │   ├── QuestionStatus.java        # Question status enum
        │   │   └── User.java                   # User entity
        │   ├── exception/
        │   │   └── GlobalExceptionHandler.java # Global exception handler
        │   ├── repository/
        │   │   ├── CommentRepository.java      # Comment data access
        │   │   ├── QuestionRepository.java    # Question data access
        │   │   └── UserRepository.java         # User data access
        │   └── service/
        │       ├── AuthService.java            # Authentication logic
        │       ├── CommentService.java         # Comment business logic
        │       ├── JwtService.java             # JWT token handling
        │       └── QuestionService.java        # Question business logic
        └── resources/
            └── application.yml                 # Application configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Questions
- `GET /api/questions` - Get all questions (paginated)
- `GET /api/questions/{id}` - Get a question by ID
- `POST /api/questions` - Create a new question (authenticated)
- `PUT /api/questions/{id}` - Update a question (authenticated)
- `DELETE /api/questions/{id}` - Delete a question (authenticated)
- `GET /api/questions/search?keyword=xxx` - Search questions
- `GET /api/questions/recent?limit=10` - Get recent questions
- `GET /api/questions/popular?limit=10` - Get most viewed questions
- `POST /api/questions/{id}/vote?voteChange=1` - Vote on a question (authenticated)

### Comments
- `POST /api/comments` - Create a comment (authenticated)
- `GET /api/comments/question/{questionId}` - Get comments for a question
- `PUT /api/comments/{id}` - Update a comment (authenticated)
- `DELETE /api/comments/{id}` - Delete a comment (authenticated)
- `POST /api/comments/{id}/vote?voteChange=1` - Vote on a comment (authenticated)

### Health
- `GET /api/health` - Health check endpoint

## Configuration

Edit `src/main/resources/application.yml` to configure:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/stackunderflow
    username: root
    password: password

app:
  jwt:
    secret: your-secret-key
    expiration: 86400000
  cors:
    allowed-origins: http://localhost:5173
```

## Database Setup

1. Create a MySQL database named `stackunderflow`
2. Update the database credentials in `application.yml`
3. The application will auto-create tables (ddl-auto: update)

## Running the Application

```bash
# Navigate to the backend directory
cd backend/java-springbot

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Frontend Integration

The API is CORS-enabled for the following origins:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```
