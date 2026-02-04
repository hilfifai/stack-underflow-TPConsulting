# StackUnderflow

A Q&A application inspired by Stack Overflow.

## Project Structure

### Web & Desktop Application
The web and desktop (Electron) application is located in the [`frontend/stack-underflow`](frontend/stack-underflow) directory.

**To run the web app:**
```bash
cd frontend/stack-underflow
npm install
npm run dev
```

**To run the Electron desktop app:**
```bash
cd frontend/stack-underflow
npm install
npm run electron:dev
```

### Mobile Application
The React Native mobile application is located in the [`frontend/StackUnderflowMobile`](frontend/StackUnderflowMobile) directory.

**To run the mobile app:**
```bash
cd frontend/StackUnderflowMobile
npm install
# For iOS
cd ios && pod install && cd ..
npx react-native run-ios
# For Android
npx react-native run-android
```
