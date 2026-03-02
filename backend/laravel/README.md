# Laravel Backend - StackUnderflow Q&A Platform

## Deskripsi
Backend API untuk StackUnderflow Q&A Platform menggunakan Laravel 10 + JWT Auth.

## Struktur Folder

```
backend/laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/          # Controllers (Request handling)
│   │   │   ├── Api/
│   │   │   │   ├── v1/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── QuestionController.php
│   │   │   │   │   ├── AnswerController.php
│   │   │   │   │   └── CommentController.php
│   │   │   │   └── Controller.php
│   │   │   ├── Requests/          # Form Requests (Validation)
│   │   │   │   ├── Auth/
│   │   │   │   ├── Question/
│   │   │   │   └── Answer/
│   │   │   └── Resources/         # API Resources (Response formatting)
│   │   └── Kernel.php
│   ├── Models/                    # Eloquent Models
│   │   ├── User.php
│   │   ├── Question.php
│   │   ├── Answer.php
│   │   ├── Comment.php
│   │   └── Traits/
│   ├── Services/                  # Business logic layer
│   │   ├── AuthService.php
│   │   ├── QuestionService.php
│   │   └── AnswerService.php
│   ├── Repositories/              # Data access layer
│   │   ├── UserRepository.php
│   │   ├── QuestionRepository.php
│   │   └── AnswerRepository.php
│   ├── DTOs/                      # Data Transfer Objects
│   │   ├── UserDTO.php
│   │   ├── QuestionDTO.php
│   │   └── AnswerDTO.php
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── RepositoryServiceProvider.php
├── config/
│   ├── app.php
│   ├── database.php
│   ├── jwt.php
│   └── cors.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── bootstrap/
├── storage/
├── public/
├── resources/
├── artisan
├── composer.json
└── .env.example
```

## Instalasi

```bash
# Install dependencies
cd backend/laravel
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Generate JWT secret
php artisan jwt:secret

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Start development server
php artisan serve
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/auth/logout | Logout user |
| GET | /api/v1/auth/me | Get current user |
| PUT | /api/v1/auth/refresh | Refresh token |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/questions | List all questions |
| POST | /api/v1/questions | Create question |
| GET | /api/v1/questions/{id} | Get question detail |
| PUT | /api/v1/questions/{id} | Update question |
| DELETE | /api/v1/questions/{id} | Delete question |
| GET | /api/v1/questions/{id}/answers | Get question answers |

### Answers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/questions/{questionId}/answers | Create answer |
| PUT | /api/v1/answers/{id} | Update answer |
| DELETE | /api/v1/answers/{id} | Delete answer |
| POST | /api/v1/answers/{id}/accept | Accept answer |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/questions/{questionId}/comments | Add comment to question |
| POST | /api/v1/answers/{answerId}/comments | Add comment to answer |

## Environment Variables

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stackunderflow
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=
JWT_TTL=60
```

## Layer Architecture

### Repository Pattern
- **Repositories** menangani semua operasi database
- **Services** berisi business logic
- **Controllers** hanya menerima request dan return response

### Alur Request
```
Request → Route → Controller → Service → Repository → Database
          ← Response ← Resource ← DTO ← Model ←
```

## Testing

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage
```

## License

MIT
