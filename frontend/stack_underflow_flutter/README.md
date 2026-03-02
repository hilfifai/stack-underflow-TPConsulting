# Stack Underflow Flutter

A Flutter implementation of the Stack Underflow Q&A platform, following the same structure and patterns as the existing React/TypeScript codebase.

## Project Structure

```
lib/
├── main.dart                    # App entry point
├── api/
│   ├── api_error.dart          # API error types
│   ├── validators.dart          # Input validation functions
│   ├── auth_service.dart       # Authentication API
│   ├── questions_service.dart   # Questions API
│   └── comments_service.dart   # Comments API
├── models/
│   ├── user.dart               # User model
│   ├── question.dart           # Question model
│   ├── comment.dart           # Comment model
│   └── question_status.dart    # Question status enum
├── store/
│   ├── auth_provider.dart      # Auth state management
│   └── data_store.dart         # In-memory data store
├── screens/
│   ├── login_screen.dart       # Login screen
│   ├── signup_screen.dart      # Signup screen
│   ├── home_screen.dart        # Questions list screen
│   ├── question_detail_screen.dart  # Question detail screen
│   ├── create_question_screen.dart  # Create question screen
│   └── edit_question_screen.dart    # Edit question screen
├── navigation/
│   └── app_router.dart         # GoRouter navigation
├── utils/
│   └── format_date.dart        # Date formatting utility
└── l10n/
    ├── app_en.arb              # English translations
    ├── app_id.arb              # Indonesian translations
    └── l10n.dart               # Localization config
```

## Features

- User authentication (login/signup)
- Questions list with search and filter
- Create, view, and edit questions
- Add comments to questions
- i18n support (English & Indonesian)
- State management with Provider

## Prerequisites

Flutter must be installed on your system. If you don't have Flutter installed:

### Install Flutter (macOS)

1. Download Flutter SDK from [flutter.dev](https://flutter.dev/docs/get-started/install/macos)
2. Extract the SDK to a folder (e.g., `~/development`)
3. Add Flutter to your PATH:
   ```bash
   echo "export PATH=\"\$PATH:\$HOME/development/flutter/bin\"" >> ~/.zshrc
   source ~/.zshrc
   ```

4. Verify installation:
   ```bash
   flutter doctor
   ```

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd frontend/stack_underflow_flutter
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Generate localization files:
   ```bash
   flutter gen-l10n
   ```

4. Run the app:
   ```bash
   flutter run
   ```

## Dependencies

- `provider` - State management
- `go_router` - Navigation
- `flutter_localizations` - Internationalization
- `intl` - Date/number formatting

## Building for Release

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ipa --release
```

### Web
```bash
flutter build web --release
```
