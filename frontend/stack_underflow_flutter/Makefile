# Flutter Frontend Makefile

.PHONY: help install dev build test clean format

help: ## Show this help message
	@echo "Flutter Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server"
	@echo "  build         Build for production"
	@echo "  build:android Build Android APK"
	@echo "  build:ios     Build iOS IPA"
	@echo "  build:web     Build web app"
	@echo "  test          Run tests"
	@echo "  format        Format code"
	@echo "  clean         Clean build artifacts"
	@echo "  analyze       Analyze code"
	@echo "  l10n          Generate localization files"

install: ## Install dependencies
	flutter pub get

dev: ## Start development server
	flutter run

build: ## Build for production
	flutter build apk --release

build:android: ## Build Android APK
	flutter build apk --release

build:ios: ## Build iOS IPA
	flutter build ipa --release

build:web: ## Build web app
	flutter build web --release

test: ## Run tests
	flutter test

format: ## Format code
	flutter format .

clean: ## Clean build artifacts
	flutter clean

analyze: ## Analyze code
	flutter analyze

l10n: ## Generate localization files
	flutter gen-l10n

# Run on specific platforms
run:android: ## Run on Android
	flutter run -d android

run:ios: ## Run on iOS
	flutter run -d ios

run:web: ## Run on web browser
	flutter run -d chrome
