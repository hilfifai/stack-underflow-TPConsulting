# StackUnderflow Next.js

A Q&A platform for developers built with Next.js 14, following patterns from both Vue and React implementations.

## Architecture

This project standardizes the **fake**, **mock**, and **real** API layer pattern across all implementations:

### API Layer Structure

```
src/api/
├── auth.ts           # Factory that selects implementation
├── questions.ts      # Factory for questions API
├── comments.ts      # Factory for comments API
├── config.ts         # Configuration (selects layer from env)
├── types.ts          # Shared error types & validation
├── fake/             # Simulated responses with delays & errors
│   ├── auth.ts
│   ├── questions.ts
│   └── comments.ts
├── mock/             # In-memory data store (predictable)
│   ├── auth.ts
│   ├── questions.ts
│   └── comments.ts
└── real/             # Actual backend API calls
    ├── auth.ts
    ├── questions.ts
    └── comments.ts
```

### Layer Definitions

| Layer | Purpose | Characteristics |
|-------|---------|-----------------|
| **fake** | Testing UI states | Random delays (200-600ms), occasional errors (5% chance) |
| **mock** | Development | In-memory data, predictable responses, minimal delays |
| **real** | Production | Actual HTTP calls to backend API |

## Usage

### Switching API Layers

Set the environment variable in `.env.local`:

```bash
# Use fake API (testing)
NEXT_PUBLIC_API_LAYER=fake

# Use mock API (development - default)
NEXT_PUBLIC_API_LAYER=mock

# Use real API (production)
NEXT_PUBLIC_API_LAYER=real
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Using the API

All API functions are imported from the factory files:

```typescript
import { login, signup, logout, getCurrentUser } from "@/api/auth";
import { getAll, getById, create, update, deleteQuestion } from "@/api/questions";
import { getByQuestionId, create as createComment, deleteComment } from "@/api/comments";
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx           # Home (question list)
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── questions/
│       ├── create/page.tsx
│       └── [id]/page.tsx
├── components/            # React components
│   ├── Header.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── QuestionList.tsx
│   ├── CreateQuestion.tsx
│   └── QuestionDetail.tsx
├── context/               # React Context providers
│   └── AuthContext.tsx
├── api/                   # API layer (fake/mock/real)
├── types/                 # TypeScript types
│   └── index.ts
└── utils/                 # Utility functions
    ├── formatDate.ts
    └── i18n.ts
```

## Installation

```bash
cd frontend/stack-underflow-nextjs
npm install
npm run dev
```

## Comparison with Vue/React Implementations

| Feature | Vue | React | Next.js (This) |
|---------|-----|-------|----------------|
| Router | Vue Router | React Router | Next.js App Router |
| State | Pinia/Vuex | Context API | Context API |
| API Layer | Vite env vars | Direct imports | Factory pattern |
| Pages | .vue files | .tsx files | page.tsx |
| Components | .vue files | .tsx files | .tsx |

## Key Patterns

### Auth Context Pattern (React/Next.js)
```typescript
// src/context/AuthContext.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // ... login, signup, logout functions
}
```

### Factory Pattern for API Selection
```typescript
// src/api/auth.ts
async function getAuthAPI() {
  switch (API_LAYER) {
    case "fake": return await import("./fake/auth");
    case "real": return await import("./real/auth");
    default: return await import("./mock/auth");
  }
}
```

## License

MIT
