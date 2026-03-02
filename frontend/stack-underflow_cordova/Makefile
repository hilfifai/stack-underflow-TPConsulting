# Apache Cordova Mobile Frontend Makefile

.PHONY: help install dev build test clean

help: ## Show this help message
	@echo "Apache Cordova Mobile Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Serve in browser (development)"
	@echo "  build         Build for all platforms"
	@echo "  build:android Build for Android"
	@echo "  build:ios     Build for iOS"
	@echo "  run           Run on device/emulator"
	@echo "  run:android   Run on Android device/emulator"
	@echo "  run:ios       Run on iOS device/emulator"
	@echo "  clean         Clean build artifacts"
	@echo "  platform-add  Add platform"

install: ## Install dependencies
	npm install
	npm install -g cordova

dev: ## Serve in browser (development)
	npm run cordova:serve

build: ## Build for all platforms
	npm run cordova:build

build:android: ## Build for Android
	npm run cordova:build:android

build:ios: ## Build for iOS
	npm run cordova:build:ios

run: ## Run on connected device/emulator
run:android: ## Run on Android device/emulator
	npm run cordova:run:android

run:ios: ## Run on iOS device/emulator
	npm run cordova:run:ios

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf platforms
	rm -rf plugins
	rm -rf www

platform-add: ## Add platform
	@echo "Usage: make platform-add PLATFORM=android"
	@echo "       make platform-add PLATFORM=ios"
	cordova platform add $(PLATFORM)

# Platform-specific targets
add-android: ## Add Android platform
	cordova platform add android

add-ios: ## Add iOS platform
	cordova platform add ios
