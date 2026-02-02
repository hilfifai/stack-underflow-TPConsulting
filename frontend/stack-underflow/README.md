# Stack Underflow

A lightweight, frontend-only Q&A web application inspired by Stack Overflow. Built with React, TypeScript, and Vite.

## Features

- **Mock Authentication**: Simple login flow that accepts any username/password
- **Question Management**: Browse, create, and edit questions
- **Question Status**: Track question status (open, answered, closed)
- **Comments**: Add and edit comments on questions
- **Single Page Application**: Smooth navigation without page reloads
- **In-Memory Data**: All data is managed in memory (no backend required)
- **React Query Integration**: Uses TanStack Query for efficient data fetching and caching with query keys
- **Robust Error Handling**: Comprehensive validation and error logging for all operations
- **Internationalization**: Support for English and Indonesian languages

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **i18next** - Internationalization

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
   ```bash
   cd stack-underflow
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
stack-underflow/
├── src/
│   ├── api/             # API layer with fake API functions
│   │   ├── constants.ts  # Query keys constants
│   │   ├── types.ts     # Shared types and validation errors
│   │   ├── questions.ts # Question API functions
│   │   ├── comments.ts  # Comment API functions
│   │   └── auth.ts      # Auth API functions
│   ├── hooks/           # React Query hooks
│   │   ├── useQuestions.ts # Question hooks (useQuestions)
│   │   ├── useComments.ts  # Comment hooks (useComments)
│   │   └── useAuth.ts      # Auth hooks (useAuth)
│   ├── components/       
│   │   ├── CreateQuestion.tsx
│   │   ├── Header.tsx
│   │   ├── Login.tsx
│   │   ├── QuestionDetail.tsx
│   │   └── QuestionList.tsx
│   ├── pages/           # Page components
│   │   ├── CreateQuestionPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── QuestionDetailPage.tsx
│   ├── store/           # State management
│   │   ├── AuthContext.tsx
│   │   └── dataStore.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── formatDate.ts
│   ├── locales/         # Internationalization
│   │   ├── en.json
│   │   └── id.json
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   ├── i18n.ts          # i18next configuration
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Approach

### Architecture

The application follows a component-based architecture with clear separation of concerns:

1. **Components**: Reusable UI components that handle presentation and user interactions
2. **Pages**: Route-level components that compose multiple components
3. **Store**: Centralized state management using React Context API
4. **Types**: Shared TypeScript interfaces for type safety
5. **Utils**: Helper functions for common operations

### State Management

- **Authentication**: Managed through `AuthContext` using React Context API
- **Data Fetching**: TanStack Query (React Query) for efficient data fetching, caching, and synchronization
  - Query keys for cache management (`["questions"]`, `["question", id]`, etc.)
  - `useMutation` for write operations (create, update)
  - Automatic cache invalidation on mutations
- **Data Storage**: In-memory data store (`dataStore`) that persists during the session
- **Component State**: Local state for UI interactions using React hooks

### React Hooks Usage

The application utilizes various React hooks for managing component behavior and side effects. In [`QuestionList.tsx`](src/components/Question/QuestionList.tsx):

- **`useRef`**: Creates a mutable reference to DOM elements (e.g., search input) that persists across renders without triggering re-renders
- **`useEffect`**: Handles side effects like focusing elements on mount or resetting page state when filters change

```typescript
// Create ref and handle side effects
const searchInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();  // Focus on mount
  }
}, []);

useEffect(() => {
  setCurrentPage(1);  // Reset page when filters change
}, [searchQuery, statusFilter]);
```

### API Layer

The application uses a fake API layer that simulates async operations with TanStack Query to demonstrate:
- Proper separation between UI and data layer
- Handling of async states (loading, error, success)
- Cache management and invalidation
- Scalable architecture ready for real API integration

**API Files** (`src/api/`):
- `constants.ts` - Query keys constants for cache management
- `types.ts` - Shared types, validation errors, and validation functions
- `questions.ts` - Question API functions (fetchQuestions, fetchQuestionById, createQuestion, updateQuestion)
- `comments.ts` - Comment API functions (addComment, updateComment)
- `auth.ts` - Auth API functions (login, signup, logout, getCurrentUser)

**Hooks Files** (`src/hooks/`):
- `useQuestions.ts` - Question hooks: `useQuestions()` (returns questions, loading, error, refetchQuestions, createQuestionMutation, updateQuestionMutation, getQuestion)
- `useComments.ts` - Comment hooks: `useComments()` (returns addCommentMutation, updateCommentMutation)
- `useAuth.ts` - Auth hooks: `useAuth()` (returns currentUser, loading, error, refetchCurrentUser, loginMutation, signupMutation, logoutMutation)

**Features**:
- **Query Keys**: Organized query keys for cache management (`["questions"]`, `["question", id]`, etc.)
- **Validation**: Robust input validation with clear error messages
- **Error Handling**: Comprehensive error logging with timestamps and error codes
- **Loading States**: Built-in loading states for better UX
- **Automatic Cache Invalidation**: Mutations automatically invalidate relevant queries

### Error Handling

The application implements robust error handling:

- **Validation Errors**: 
  - Title: Required, min 5 chars, max 200 chars
  - Description: Required, min 10 chars, max 5000 chars
  - Comment: Required, min 3 chars, max 1000 chars
- **Authorization Errors**: Checks user permissions before allowing edits
- **Not Found Errors**: Handles missing questions and comments
- **Error Logging**: All errors are logged to console with detailed information (code, message, details, timestamp)
- **User-Friendly Messages**: Error codes are mapped to localized user-friendly messages



### Routing

Client-side routing using React Router with the following routes:
- `/` - Home page (question list)
- `/questions/:id` - Question detail page
- `/questions/new` - Create new question (requires authentication)
- `/login` - Login page

### Styling

Pure CSS with a clean, modern design. No external CSS frameworks are used, keeping the project lightweight and easy to customize. Includes styles for:
- Error messages with clear visual feedback
- Loading states with spinner animations
- Form validation hints
- Responsive layout

## Assumptions & Limitations


### Authentication Flow

Authentication is mocked using React Context.
- Logged-in user is stored in memory only
- Session is lost on page refresh
- No tokens or persistent storage are used


### Assumptions

1. Users will access the application through a modern web browser
2. The application will be used for demonstration/learning purposes
3. No persistent data storage is required for the use case

### Limitations

1. **No Backend**: All data is stored in memory and will be lost on page refresh
2. **No Real Authentication**: Login is mocked - any username/password combination works
3. **No Data Persistence**: Questions and comments are not saved to a database
4. **No Voting**: Questions and comments cannot be upvoted or downvoted
5. **No Tags**: Questions cannot be categorized with tags
6. **No User Profiles**: No user profile pages or history
7. **Fake API**: API calls are simulated with delays and in-memory operations

## Future Enhancements

Potential improvements for a production-ready application:

1. Add a real backend with database (PostgreSQL, MongoDB, etc.)
2. Implement proper authentication (JWT, OAuth, etc.)
3. Add data persistence
4. Implement search and filtering functionality
5. Add voting system for questions and answers
6. Implement tags and categories
7. Add user profiles and activity history
8. Add real-time updates using WebSockets
9. Implement pagination for large question lists
10. Add dark mode support
11. Replace fake API with real REST/GraphQL endpoints
12. Add server-side validation
13. Implement rate limiting
14. Add email notifications
15. Add file upload support for images/documents

## License

MIT
