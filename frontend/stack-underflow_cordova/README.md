# Stack Underflow - Apache Cordova Mobile App

A mobile Q&A application built with Apache Cordova, similar to Stack Overflow.

## Features

- User authentication (login/register)
- Browse questions feed
- View question details
- Ask questions
- Search functionality
- Vote on questions and answers
- Comments system
- User profiles
- Offline-first with local caching
- Native mobile app experience

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Apache Cordova CLI (`npm install -g cordova`)
- Platform-specific SDKs:
  - Android Studio (for Android)
  - Xcode (for iOS)

## Installation

```bash
# Clone the repository
cd frontend/stack-underflow_cordova

# Install dependencies
npm install

# Add platforms
cordova platform add android
cordova platform add ios

# Build for specific platform
cordova build android
cordova build ios

# Run on device/emulator
cordova run android
cordova run ios
```

## Project Structure

```
stack-underflow_cordova/
├── config.xml          # Cordova configuration
├── package.json        # npm dependencies
├── www/
│   ├── index.html      # Main HTML file
│   ├── css/            # Stylesheets
│   │   ├── style.css   # Main styles
│   │   ├── components/  # Component styles
│   │   └── pages/      # Page-specific styles
│   └── js/
│       ├── app.js      # Main application
│       ├── config.js   # App configuration
│       ├── services/   # API & Auth services
│       ├── utils/      # Utility functions
│       ├── components/ # UI components
│       └── pages/      # Page logic
└── res/                # Resources (icons, splash screens)
```

## API Configuration

The app connects to the backend API. Configure the API URL in `www/js/config.js`:

```javascript
api: {
    baseUrl: 'http://localhost:8080/api'
}
```

For mobile devices, use the appropriate IP address or hostname.

## Available Scripts

```bash
# Build for all platforms
npm run build

# Build for Android
npm run cordova:build:android

# Build for iOS
npm run cordova:build:ios

# Run on Android device/emulator
npm run cordova:run:android

# Run on iOS device/emulator
npm run cordova:run:ios

# Serve in browser (for development)
npm run cordova:serve
```

## Technologies Used

- **Apache Cordova** - Mobile framework
- **HTML5/CSS3** - UI markup and styling
- **JavaScript (ES6+)** - Application logic
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## Supported Platforms

- Android 5.1+ (API 22+)
- iOS 11.0+
- Browser (development)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
