# Stack Underflow

A lightweight, frontend-only Q&A web application inspired by Stack Overflow. Built with React, TypeScript, and Vite.

## Features

- **Mock Authentication**: Simple login flow that accepts any username/password
- **Question Management**: Browse, create, and edit questions
- **Question Status**: Track question status (open, answered, closed)
- **Comments**: Add and edit comments on questions
- **Single Page Application**: Smooth navigation without page reloads
- **In-Memory Data**: All data is managed in memory (no backend required)

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

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
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
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
- **Data**: In-memory data store (`dataStore`) that persists during the session
- **Component State**: Local state for UI interactions using React hooks

### Routing

Client-side routing using React Router with the following routes:
- `/` - Home page (question list)
- `/questions/:id` - Question detail page
- `/questions/new` - Create new question (requires authentication)
- `/login` - Login page

### Styling

Pure CSS with a clean, modern design. No external CSS frameworks are used, keeping the project lightweight and easy to customize.

## Assumptions & Limitations

### Assumptions

1. Users will access the application through a modern web browser
2. The application will be used for demonstration/learning purposes
3. No persistent data storage is required for the use case

### Limitations

1. **No Backend**: All data is stored in memory and will be lost on page refresh
2. **No Real Authentication**: Login is mocked - any username/password combination works
3. **No Data Persistence**: Questions and comments are not saved to a database
4. **No User Registration**: Users cannot create accounts - they simply "login" with any username
5. **No Search/Filter**: Questions are displayed in chronological order only
6. **No Voting**: Questions and comments cannot be upvoted or downvoted
7. **No Tags**: Questions cannot be categorized with tags
8. **No User Profiles**: No user profile pages or history

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

## License

MIT
