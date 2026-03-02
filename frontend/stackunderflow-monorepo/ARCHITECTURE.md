# Arsitektur Monorepo

## Diagram Struktur

```mermaid
graph TD
    subgraph "apps/"
        A[web/] --> W[React Web Browser]
        A --> D[Electron Desktop]
        B[mobile/] --> M[React Native iOS/Android]
    end

    subgraph "packages/"
        T[shared-types/] --> W
        T --> D
        T --> M
        
        API[shared-api/] --> W
        API --> D
        API --> M
        
        S[shared-store/] --> W
        S --> D
        S --> M
        
        U[shared-utils/] --> W
        U --> D
        U --> M
    end

    style A fill:#e1f5fe
    style B fill:#fce4ec
    style T fill:#fff3e0
    style API fill:#e8f5e9
    style S fill:#f3e5f5
    style U fill:#fff8e1
```

## Alur Data

```mermaid
sequenceDiagram
    participant User
    participant App as Web/Mobile App
    participant Context as AuthContext
    participant Store as dataStore
    participant API as shared-api
    
    User->>App: Login
    App->>API: login(username, password)
    API->>API: validateUsername, validatePassword
    API->>Store: login(username, password)
    Store-->>API: User object
    API-->>App: User object
    App->>Context: setUser(User)
    Context-->>User: Authenticated
```

## Shared Components

| Package | Contents | Used By |
|---------|----------|---------|
| `shared-types` | User, Question, Comment, QuestionStatus | web, desktop, mobile |
| `shared-api` | ApiError, validators, auth, questions, comments | web, desktop, mobile |
| `shared-store` | dataStore, AuthContext | web, desktop, mobile |
| `shared-utils` | formatDate | web, desktop, mobile |

## Platform-Specific Components

| App | Components | Notes |
|-----|------------|-------|
| `web` | React components, Vite config, i18n | Browser-only features |
| `desktop` | Electron main, preload | Desktop-only features |
| `mobile` | React Native screens, navigation | Mobile-only features |
