# Stack Underflow - Svelte Frontend

A Q&A platform frontend built with Svelte 5 and Bun.

## Tech Stack

- **Framework**: Svelte 5 with SvelteKit
- **Runtime**: Bun (or npm/node)
- **Styling**: CSS with custom properties

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   └── Header.svelte
│   ├── services/       # API service layer
│   │   ├── auth.ts
│   │   └── questions.ts
│   ├── stores/         # State management
│   │   └── auth.ts
│   └── types/          # TypeScript types
│       └── index.ts
├── routes/
│   ├── +layout.svelte  # App layout
│   ├── +page.svelte    # Home page (questions list)
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   └── questions/      # Question pages
│       ├── [id]/        # Question detail
│       └── ask/         # Ask question
├── app.css            # Global styles
├── app.html           # HTML template
└── types/
    └── env.d.ts       # Environment types
```

## Getting Started

### Install dependencies (Bun)

```bash
bun install
```

### Install dependencies (npm)

```bash
npm install
```

### Start development server (Bun)

```bash
bun run dev
```

### Start development server (npm)

```bash
npm run dev
```

### Build for production (Bun)

```bash
bun run build
```

### Build for production (npm)

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

## API Integration

The frontend expects a backend API running at the specified URL. The backend should implement the following endpoints:

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/questions` - List all questions
- `GET /api/v1/questions/:id` - Get single question
- `POST /api/v1/questions` - Create question
- `GET /api/v1/questions/:id/answers` - Get answers for a question
- `POST /api/v1/questions/:id/answers` - Create answer
- `POST /api/v1/questions/:id/comments` - Create comment
