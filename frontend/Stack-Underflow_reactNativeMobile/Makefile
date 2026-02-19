# React Native Mobile Frontend Makefile

.PHONY: help install dev build test clean

help: ## Show this help message
	@echo "React Native Mobile Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server"
	@echo "  start         Start Metro bundler"
	@echo "  ios           Run on iOS simulator"
	@echo "  android       Run on Android emulator"
	@echo "  build         Build for production"
	@echo "  build:android Build Android APK"
	@echo "  build:ios     Build iOS IPA"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"

install: ## Install dependencies
	npm install
	cd ios && pod install && cd ..

dev: ## Start development server
	npm start

start: ## Start Metro bundler
	npx react-native start

ios: ## Run on iOS simulator
	npx react-native run-ios

android: ## Run on Android emulator
	npx react-native run-android

build: ## Build for production (requires EAS)
	@echo "Use EAS Build for production builds:"
	@echo "  eas build --platform ios"
	@echo "  eas build --platform android"

build:android: ## Build Android APK
	eas build --platform android

build:ios: ## Build iOS IPA
	eas build --platform ios

test: ## Run tests
	npm test

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf ios/Pods
	rm -rf ios/build
	rm -rf android/build
	rm -rf android/app/build
	rm -rf .expo

# Expo targets
expo-install: ## Install Expo CLI
	npm install -g expo-cli

expo-start: ## Start Expo development server
	expo start

expo-build-android: ## Build Android with Expo
	expo build:android

expo-build-ios: ## Build iOS with Expo
	expo build:ios
