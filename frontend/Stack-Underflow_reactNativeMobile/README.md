# Stack Underflow Mobile

A lightweight, mobile Q&A application inspired by Stack Overflow. Built with React Native, TypeScript, and Expo.

## Features

- **Mock Authentication**: Simple login flow that accepts any username/password
- **Question Management**: Browse, create, and edit questions
- **Question Status**: Track question status (open, answered, closed)
- **Comments**: Add and edit comments on questions
- **Cross-Platform**: Works on both iOS and Android
- **In-Memory Data**: All data is managed in memory (no backend required)
- **Robust Error Handling**: Comprehensive validation and error logging for all operations
- **Native Experience**: Optimized for mobile with touch-friendly UI

## Tech Stack

- **React Native** - Mobile UI framework
- **TypeScript** - Type safety
- **Expo** - Development platform and build tool
- **React Navigation** - Native navigation
- **React Context** - State management
- **Async Storage** - Data persistence (session storage)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- **Expo Go** app installed on your mobile device (iOS/Android)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

1. Navigate to the project directory:
   ```bash
   cd StackUnderflowMobile
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
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

4. Scan the QR code with your mobile device using:
   - **iOS**: Camera app (requires Expo Go)
   - **Android**: Expo Go app

### Running on Emulator/Simulator

**iOS Simulator:**
```bash
npm run ios
# or
yarn ios
```

**Android Emulator:**
```bash
npm run android
# or
yarn android
```

### Build for Production

**iOS (requires Apple Developer account):**
```bash
eas build --platform ios
```

**Android:**
```bash
eas build --platform android
```

## Project Structure

```
StackUnderflowMobile/
├── src/
│   ├── api/              # API layer with type definitions
│   │   └── types.ts      # Shared types and validation errors
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── QuestionDetailScreen.tsx
│   │   ├── CreateQuestionScreen.tsx
│   │   └── EditQuestionScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   ├── index.tsx     # Navigation setup
│   │   └── types.ts      # Navigation types
│   ├── services/         # Service layer
│   │   ├── auth.ts       # Auth service functions
│   │   ├── questions.ts   # Question service functions
│   │   └── comments.ts   # Comment service functions
│   ├── store/            # State management
│   │   ├── AuthContext.tsx
│   │   └── dataStore.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── formatDate.ts
│   ├── App.tsx           # Main app component
│   └── index.js          # Entry point
├── ios/                  # iOS native code
├── android/              # Android native code
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── babel.config.js      # Babel configuration
└── README.md            # This file
```

## Approach

### Architecture

The application follows a component-based architecture with clear separation of concerns:

1. **Screens**: Route-level components that handle page-level logic and UI
2. **Services**: Business logic and data operations
3. **Store**: Centralized state management using React Context API
4. **Types**: Shared TypeScript interfaces for type safety
5. **Utils**: Helper functions for common operations

### State Management

- **Authentication**: Managed through `AuthContext` using React Context API
- **Data Storage**: In-memory data store (`dataStore`) that persists during the session
- **Component State**: Local state for UI interactions using React hooks
- **Navigation State**: Managed by React Navigation

### Service Layer

The application uses a service layer that simulates async operations to demonstrate:

- Proper separation between UI and data layer
- Handling of async states (loading, error, success)
- Scalable architecture ready for real API integration

**Service Files** (`src/services/`):
- `auth.ts` - Auth service functions (login, signup, logout, getCurrentUser)
- `questions.ts` - Question service functions (fetchQuestions, fetchQuestionById, createQuestion, updateQuestion)
- `comments.ts` - Comment service functions (addComment, updateComment)

**API Files** (`src/api/`):
- `types.ts` - Shared types, validation errors, and validation functions

### Navigation

Native navigation using React Navigation with the following screens:
- `Home` - Question list
- `QuestionDetail` - Question detail with comments
- `CreateQuestion` - Create new question (requires authentication)
- `EditQuestion` - Edit existing question (requires authentication)
- `Login` - Login screen
- `Signup` - Signup screen

### Error Handling

The application implements robust error handling:

- **Validation Errors**:
  - Title: Required, min 5 chars, max 200 chars
  - Description: Required, min 10 chars, max 5000 chars
  - Comment: Required, min 3 chars, max 1000 chars
- **Authorization Errors**: Checks user permissions before allowing edits
- **Not Found Errors**: Handles missing questions and comments
- **Error Logging**: All errors are logged with detailed information
- **User-Friendly Messages**: Error messages displayed in alerts

### Styling

React Native styling using StyleSheet. Clean, modern design with:
- Touch-friendly UI elements
- Consistent spacing and typography
- Visual feedback for interactions
- Loading states with activity indicators
- Error messages with clear visual feedback

## Assumptions & Limitations

### Authentication Flow

Authentication is mocked using React Context.
- Logged-in user is stored in memory only
- Session is lost on app restart
- No tokens or persistent storage are used

### Assumptions

1. Users will access the application through a mobile device
2. The application will be used for demonstration/learning purposes
3. No persistent data storage is required for the use case

### Limitations

1. **No Backend**: All data is stored in memory and will be lost on app restart
2. **No Real Authentication**: Login is mocked - any username/password combination works
3. **No Data Persistence**: Questions and comments are not saved to a database
4. **No Voting**: Questions and comments cannot be upvoted or downvoted
5. **No Tags**: Questions cannot be categorized with tags
6. **No User Profiles**: No user profile pages or history
7. **Fake Service**: Service calls are simulated with delays and in-memory operations
8. **No Real-time Updates**: Changes require manual refresh

## Future Enhancements

Potential improvements for a production-ready application:

1. Add a real backend with database (PostgreSQL, MongoDB, etc.)
2. Implement proper authentication (JWT, OAuth, etc.)
3. Add data persistence (Async Storage, SQLite, etc.)
4. Implement search and filtering functionality
5. Add voting system for questions and answers
6. Implement tags and categories
7. Add user profiles and activity history
8. Add real-time updates using WebSockets
9. Implement pagination for large question lists
10. Add dark mode support
11. Replace fake service with real REST/GraphQL endpoints
12. Add server-side validation
13. Implement rate limiting
14. Add email notifications
15. Add file upload support for images/documents
16. Implement push notifications
17. Add biometric authentication
18. Add offline support with sync

## License

MIT
