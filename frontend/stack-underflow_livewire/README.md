# StackUnderflow - Laravel Livewire Frontend

A modern Q&A platform frontend built with Laravel Livewire and Tailwind CSS.

## Features

- 🔐 **Authentication** - Login, Register, Logout functionality
- ❓ **Questions** - Browse, Create, View questions with full CRUD operations
- 💬 **Answers** - Post answers, vote, accept best answer
- 💬 **Comments** - Add comments to questions and answers
- 🏷️ **Tags** - Organize questions by tags
- 👥 **Users** - Browse user profiles and reputation
- 🔍 **Search** - Full-text search functionality
- 📱 **Responsive** - Mobile-first design with Tailwind CSS

## Tech Stack

- **Backend**: Laravel 10.x
- **Frontend**: Livewire 3.x
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Guzzle HTTP
- **Package Manager**: Composer, npm

## Requirements

- PHP 8.1+
- Composer
- Node.js & npm
- Laravel Valet/Homestead or similar local development environment

## Installation

1. **Clone the repository**
   ```bash
   cd /path/to/project
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install npm dependencies**
   ```bash
   npm install
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure API endpoint**
   Update `.env` with your backend API URL:
   ```env
   API_BASE_URL=http://localhost:8000/api/v1
   ```

6. **Build assets**
   ```bash
   npm run dev
   # or for production
   npm run build
   ```

7. **Start the server**
   ```bash
   php artisan serve
   ```

## Project Structure

```
frontend/stack-underflow_livewire/
├── app/
│   ├── DTOs/                    # Data Transfer Objects
│   │   ├── UserDTO.php
│   │   ├── QuestionDTO.php
│   │   ├── AnswerDTO.php
│   │   └── CommentDTO.php
│   ├── Livewire/                # Livewire Components
│   │   ├── Home.php
│   │   ├── Login.php
│   │   ├── Register.php
│   │   ├── CreateQuestion.php
│   │   └── QuestionDetail.php
│   └── Services/                # API Service Layer
│       ├── ApiService.php
│       ├── AuthService.php
│       ├── QuestionService.php
│       ├── AnswerService.php
│       └── CommentService.php
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   │   └── app.blade.php
│   │   └── livewire/            # Blade Views for Components
│   │       ├── home.blade.php
│   │       ├── login.blade.php
│   │       ├── register.blade.php
│   │       ├── create-question.blade.php
│   │       ├── question-detail.blade.php
│   │       ├── tags.blade.php
│   │       ├── users.blade.php
│   │       └── profile.blade.php
│   └── css/
│       └── app.css               # Tailwind CSS styles
├── routes/
│   └── web.php                  # Application routes
├── package.json
├── composer.json
├── tailwind.config.js
└── vite.config.js
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home - Question list |
| GET | `/login` | Login page |
| GET | `/register` | Registration page |
| GET | `/questions` | Questions list |
| GET | `/questions/create` | Create new question |
| GET | `/questions/{id}` | Question detail |
| GET | `/questions/search` | Search questions |
| GET | `/tags` | Browse tags |
| GET | `/users` | Browse users |
| GET | `/profile` | User profile |

## API Integration

The frontend communicates with the backend API using the service layer:

```php
// Example: Creating a question
$questionService = new QuestionService();
$result = $questionService->create([
    'title' => 'How do I...',
    'body' => 'Detailed question body...',
    'tags' => ['laravel', 'php'],
]);

if ($result['success']) {
    $question = $result['question'];
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

### Styling

Custom CSS classes are defined in `resources/css/app.css`:

```css
.btn-primary {
    @apply bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded;
}

.input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange;
}
```

## Development

1. Start the development server:
   ```bash
   php artisan serve
   ```

2. Run Vite for hot reloading:
   ```bash
   npm run dev
   ```

3. Make changes to components and views in `app/Livewire/` and `resources/views/livewire/`

## Production

1. Build assets:
   ```bash
   npm run build
   ```

2. Optimize Laravel:
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
