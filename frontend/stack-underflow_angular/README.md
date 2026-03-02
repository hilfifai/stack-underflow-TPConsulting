# Stack Underflow - Angular

Angular version of Stack Underflow Q&A Platform with the same structure as the React and Vue versions.

## Features

- **Three API Layers**: Mock (in-memory), Fake (simulated), Real (backend REST API)
- **Standalone Components**: Modern Angular with standalone components
- **Services-based State Management**: Using Angular Signals
- **i18n Support**: English and Indonesian translations
- **Responsive Design**: CSS styling matching React/Vue versions

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── mock/         # Mock API implementations
│   │   ├── fake/         # Fake API with simulated delays
│   │   └── real/         # Real backend API calls
│   ├── components/
│   │   ├── header/       # Header navigation component
│   │   ├── login/        # Login form component
│   │   ├── signup/       # Signup form component
│   │   ├── question-list/# Question list with search/filter
│   │   ├── create-question/# Create question form
│   │   └── question-detail/# Question detail with comments
│   ├── pages/
│   │   ├── home-page/        # Home page with question list
│   │   ├── login-page/       # Login page
│   │   ├── signup-page/      # Signup page
│   │   ├── create-question-page/
│   │   └── question-detail-page/
│   ├── services/
│   │   ├── auth.service.ts   # Authentication service
│   │   ├── questions.service.ts # Questions API service
│   │   ├── comments.service.ts # Comments API service
│   │   └── i18n.service.ts   # Internationalization service
│   ├── store/
│   │   └── data.store.ts     # In-memory data store
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── utils/
│       └── format-date.ts    # Date formatting utility
├── environments/
│   ├── environment.ts         # Default (mock)
│   ├── environment.mock.ts    # Mock configuration
│   ├── environment.fake.ts    # Fake configuration
│   └── environment.real.ts    # Real API configuration
├── styles.css                 # Global styles
└── index.html                # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend/stack-underflow_angular
npm install
```

### Development Servers

The app supports three API layers:

```bash
# Mock API (default - in-memory data store)
npm start
# or
ng serve

# Fake API (simulated responses with delays)
npm run start:fake
# or
ng serve --configuration=fake

# Real API (backend REST API)
npm run start:real
# or
ng serve --configuration=real
```

The app will be available at `http://localhost:4200`

### Build

```bash
# Build for mock
npm run build

# Build for fake
npm run build:fake

# Build for real
npm run build:real
```

## API Layers

### Mock Layer (`mock`)
- In-memory data store
- No network delays
- Pre-populated with sample questions
- Perfect for development without backend

### Fake Layer (`fake`)
- Simulated API responses
- Random network delays (100-600ms)
- Occasional simulated errors (5% chance)
- Good for testing loading states and error handling

### Real Layer (`real`)
- Connects to actual backend API
- Requires backend server running at `http://localhost:8080/api`
- JWT authentication via localStorage
- Full CRUD operations

## Technology Stack

- **Angular 18** - Framework
- **TypeScript** - Language
- **Angular Signals** - State management
- **RxJS** - Reactive programming
- **Angular Router** - Navigation

## Internationalization

Supported languages:
- English (en) - Default
- Indonesian (id)

Switch languages using the header buttons.

## License

MIT
