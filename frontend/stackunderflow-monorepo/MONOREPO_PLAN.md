# Monorepo Plan: StackUnderflow Unified

## Struktur Folder Target

```
frontend/stackunderflow-monorepo/
├── README.md
├── MONOREPO_PLAN.md
├── apps/
│   ├── web/                    # Pindah dari stack-underflow/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── electron/           # Desktop
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── index.css
│   │   │   ├── i18n.ts
│   │   │   ├── components/    # UI khusus web
│   │   │   ├── pages/          # Pages khusus web
│   │   │   ├── hooks/          # Hooks khusus web
│   │   │   └── locales/
│   │   └── ...
│   │
│   └── mobile/                 # Pindah dari StackUnderflowMobile/
│       ├── package.json
│       ├── tsconfig.json
│       ├── metro.config.js
│       ├── App.tsx
│       ├── index.js
│       ├── app.json
│       ├── src/
│       │   ├── screens/        # Screens khusus mobile
│       │   ├── navigation/     # Navigation mobile
│       │   ├── hooks/          # Hooks khusus mobile
│       │   └── ...
│       └── android/
│       └── ios/
│
└── packages/
    ├── shared-types/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── index.ts        # User, Question, Comment types
    │       └── QuestionStatus.ts
    │
    ├── shared-api/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── types.ts        # ApiError, ValidationError
    │       ├── validators.ts   # validateUsername, validatePassword, etc.
    │       ├── auth.ts         # login, signup, logout
    │       ├── questions.ts    # getQuestions, createQuestion, etc.
    │       └── comments.ts     # addComment, getComments, etc.
    │
    ├── shared-store/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── dataStore.ts    # Shared data store
    │       ├── AuthContext.tsx # Auth context (platform agnostic)
    │       └── index.ts
    │
    └── shared-utils/
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── formatDate.ts
            └── index.ts
```

## Langkah Migrasi

### Step 1: Buat Struktur Folder
- [ ] Buat folder `frontend/stackunderflow-monorepo/`
- [ ] Buat folder `frontend/stackunderflow-monorepo/apps/`
- [ ] Buat folder `frontend/stackunderflow-monorepo/packages/`
- [ ] Buat subfolder untuk setiap package

### Step 2: Setup Shared Packages
- [ ] Setup `packages/shared-types/` dengan types dari web & mobile
- [ ] Setup `packages/shared-api/` dengan validators dan API functions
- [ ] Setup `packages/shared-store/` dengan dataStore
- [ ] Setup `packages/shared-utils/` dengan utilities

### Step 3: Pindah Apps
- [ ] Copy `stack-underflow/` ke `apps/web/`
- [ ] Copy `StackUnderflowMobile/` ke `apps/mobile/`
- [ ] Update imports di app untuk menggunakan packages

### Step 4: Update Configuration
- [ ] Update `tsconfig.json` di setiap app untuk reference packages
- [ ] Update `package.json` di setiap app untuk dependencies

## Code yang Bisa Dihosting

### shared-types
```typescript
// packages/shared-types/src/index.ts
export type QuestionStatus = "open" | "answered" | "closed";

export interface User {
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  questionId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
  username: string;
  createdAt: Date;
  comments: Comment[];
}
```

### shared-api
```typescript
// packages/shared-api/src/types.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const ValidationError = {
  TITLE_REQUIRED: new ApiError("Title is required", "TITLE_REQUIRED"),
  USERNAME_REQUIRED: new ApiError("Username is required", "USERNAME_REQUIRED"),
  PASSWORD_REQUIRED: new ApiError("Password is required", "PASSWORD_REQUIRED"),
  // ... lainnya
};

export function validateUsername(username: string): void { ... }
export function validatePassword(password: string): void { ... }
export function validateTitle(title: string): void { ... }
export function validateDescription(description: string): void { ... }
export function validateComment(content: string): void { ... }
```

### shared-store
```typescript
// packages/shared-store/src/dataStore.ts
// Platform-agnostic data store implementation
```

## Cara Import di Apps

### Web App
```typescript
import { User, Question } from "@stackunderflow/shared-types";
import { login, signup } from "@stackunderflow/shared-api";
import { useAuth } from "@stackunderflow/shared-store";
```

### Mobile App
```typescript
import { User, Question } from "@stackunderflow/shared-types";
import { login, signup } from "@stackunderflow/shared-api";
import { useAuth } from "@stackunderflow/shared-store";
```
