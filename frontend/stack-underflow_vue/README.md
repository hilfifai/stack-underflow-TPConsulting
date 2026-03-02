# Stack Underflow Vue.js

A Vue.js Q&A web application inspired by Stack Overflow, converted from the React version with the same output and styling.

## Features

- **Q&A Platform**: Ask questions, provide answers, and comment on questions
- **Authentication**: Login and signup functionality (mock)
- **Search & Filter**: Search questions by title/description and filter by status
- **Pagination**: Navigate through questions with pagination
- **Internationalization**: Support for English and Indonesian languages
- **Responsive Design**: Works on desktop and mobile devices

## Three API Layers

This project supports three different API layers. You can choose which one to use by setting the `VITE_API_LAYER` environment variable or using the appropriate npm script:

### 1. Mock API (Data Store)
Uses an in-memory data store for demonstration purposes. No backend server required. Data persists only during the session.

```bash
# Using .env.mock file
npm run dev:mock
npm run build:mock

# Or set environment variable
export VITE_API_LAYER=mock
npm run dev
```

### 2. Fake API (Dummy)
Simulates API responses with artificial delays, random errors (5% chance), and consistent data. Useful for testing UI states like loading, error, and success.

```bash
# Using .env.fake file
npm run dev:fake
npm run build:fake

# Or set environment variable
export VITE_API_LAYER=fake
npm run dev
```

### 3. Real Backend API
Connects to a real backend server. Requires a running backend service. Uses JWT authentication.

```bash
# Using .env.real file
npm run dev:api
npm run build:api

# Or set environment variable
export VITE_API_LAYER=real
export VITE_API_URL=http://localhost:8080/api
npm run dev
```

## Project Structure

```
src/
├── api/
│   ├── types.ts           # API types and validation
│   ├── auth.ts            # Auth API (selects layer dynamically)
│   ├── questions.ts       # Questions API (selects layer dynamically)
│   ├── comments.ts        # Comments API (selects layer dynamically)
│   ├── mock/              # Mock API implementations
│   │   ├── auth.ts        # In-memory data store auth
│   │   ├── questions.ts   # In-memory data store questions
│   │   └── comments.ts    # In-memory data store comments
│   ├── fake/              # Fake API implementations
│   │   ├── auth.ts        # Simulated auth with delays/errors
│   │   ├── questions.ts   # Simulated questions with delays/errors
│   │   └── comments.ts    # Simulated comments with delays/errors
│   └── real/              # Real backend API implementations
│       ├── auth.ts        # REST API calls to backend
│       ├── questions.ts   # REST API calls to backend
│       └── comments.ts    # REST API calls to backend
├── components/
│   ├── Header.vue
│   ├── Login.vue
│   ├── Signup.vue
│   ├── QuestionList.vue
│   ├── CreateQuestion.vue
│   └── QuestionDetail.vue
├── pages/
│   ├── HomePage.vue
│   ├── LoginPage.vue
│   ├── SignupPage.vue
│   ├── CreateQuestionPage.vue
│   └── QuestionDetailPage.vue
├── store/
│   ├── auth.ts            # Pinia auth store
│   └── dataStore.ts       # Mock data store
├── locales/
│   ├── en.json
│   └── id.json
├── router/
│   └── index.ts
├── App.vue
├── main.ts
├── style.css
└── env.d.ts
```

## Running the Application

### Install dependencies
```bash
npm install
```

### Development (Default: Mock API)
```bash
npm run dev
```

### Development with Fake API
```bash
npm run dev:fake
```

### Development with Real Backend API
```bash
npm run dev:api
```

### Build
```bash
npm run build           # Build with mock API (default)
npm run build:fake     # Build with fake API
npm run build:api      # Build with real API
```

### Preview Build
```bash
npm run preview         # Preview mock build
npm run preview:fake    # Preview fake API build
npm run preview:api     # Preview real API build
```

## Configuration

### Environment Variables

Create environment files or set variables directly:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_LAYER` | API layer to use: `mock`, `fake`, or `real` | `mock` |
| `VITE_API_URL` | Backend API URL (for real layer) | `http://localhost:8080/api` |

### Environment Files

- `.env.mock` - Mock API configuration
- `.env.fake` - Fake API configuration  
- `.env.real` - Real backend API configuration

To use a specific environment file:
```bash
cp .env.real .env.local
npm run dev
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Next generation frontend tooling
- **Pinia** - Vue store library with TypeScript support
- **Vue Router** - Official router for Vue
- **vue-i18n** - Internationalization plugin for Vue
- **CSS3** - Styling with responsive design

## Backend Integration

For the real API layer, the frontend expects a backend server running at `VITE_API_URL`. The backend should provide the following endpoints:

### Auth Endpoints
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Questions Endpoints
- `GET /questions` - List all questions
- `GET /questions/:id` - Get single question
- `POST /questions` - Create question
- `PUT /questions/:id` - Update question
- `GET /questions/search?q=` - Search questions
- `GET /questions/:id/related` - Get related questions
- `GET /questions/hot` - Get hot questions

### Comments Endpoints
- `POST /questions/:id/comments` - Add comment
- `PUT /questions/:id/comments/:id` - Update comment
- `DELETE /questions/:id/comments/:id` - Delete comment

## License

MIT
