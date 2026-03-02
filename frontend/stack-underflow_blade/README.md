# StackUnderflow - Laravel Blade Frontend

A traditional server-side rendered Laravel Blade frontend for the StackUnderflow Q&A platform.

## Features

- 🔐 **Authentication** - Login, Register, Logout with session-based auth
- ❓ **Questions** - Browse, Create, View questions
- 💬 **Answers** - Post answers to questions
- 🏷️ **Tags** - Browse questions by tags
- 👥 **Users** - Browse user profiles
- 🔍 **Search** - Search questions

## Tech Stack

- **Backend**: Laravel 10.x
- **Frontend**: Blade Templates
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Guzzle HTTP

## Requirements

- PHP 8.1+
- Composer
- Laravel framework

## Installation

1. **Clone the repository**
   ```bash
   cd /path/to/project
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure API endpoint**
   Update `.env` with your backend API URL:
   ```env
   API_BASE_URL=http://localhost:8000/api/v1
   ```

5. **Start the server**
   ```bash
   php artisan serve
   ```

## Project Structure

```
frontend/stack-underflow_blade/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Controller.php
│   │       ├── AuthController.php
│   │       ├── QuestionController.php
│   │       └── AnswerController.php
│   └── Services/
│       ├── ApiService.php
│       ├── AuthService.php
│       ├── QuestionService.php
│       └── AnswerService.php
├── resources/
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php
│       ├── partials/
│       │   └── header.blade.php
│       ├── questions/
│       │   ├── index.blade.php
│       │   ├── show.blade.php
│       │   └── create.blade.php
│       ├── auth/
│       │   ├── login.blade.php
│       │   └── register.blade.php
│       ├── tags.blade.php
│       ├── users.blade.php
│       └── profile.blade.php
├── routes/
│   └── web.php
├── composer.json
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home - Question list |
| GET | `/login` | Login page |
| POST | `/login` | Login form submission |
| GET | `/register` | Registration page |
| POST | `/register` | Registration form submission |
| POST | `/logout` | Logout |
| GET | `/questions` | Questions list |
| GET | `/questions/create` | Create new question |
| POST | `/questions` | Create question form submission |
| GET | `/questions/{id}` | Question detail |
| GET | `/questions/search` | Search questions |
| POST | `/questions/{id}/answers` | Post answer |
| GET | `/tags` | Browse tags |
| GET | `/users` | Browse users |
| GET | `/profile` | User profile |

## API Integration

The frontend communicates with the backend API using service classes:

```php
// Example: Creating a question
$questionService = new QuestionService();
$result = $questionService->create([
    'title' => 'How do I...',
    'body' => 'Detailed question body...',
    'tags' => ['laravel', 'php'],
]);

if ($result['success']) {
    // Redirect to question page
}
```

## Authentication

Authentication is session-based with tokens stored in the session:

```php
$authService = new AuthService();
$result = $authService->login([
    'email' => 'user@example.com',
    'password' => 'password',
]);

if ($result['success']) {
    // User is now logged in
    session(['token' => $result['token'], 'user' => $result['user']]);
}
```

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the brand colors:

```javascript
theme: {
    extend: {
        colors: {
            'brand-orange': '#f48024',
            'brand-dark': '#2d2d2d',
            'brand-gray': '#6a737c',
        },
    },
},
```

## Development

1. Start the development server:
   ```bash
   php artisan serve
   ```

2. Make changes to controllers in `app/Http/Controllers/` and views in `resources/views/`

## Production

```bash
php artisan optimize
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
