# React Frontend Makefile

.PHONY: help install dev dev-mock dev-fake dev-real build test lint clean electron-dev electron-build

PORT ?= 3000

help: ## Show this help message
	@echo "React Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help           Show this help message"
	@echo "  install        Install dependencies"
	@echo "  dev            Start development server (default - uses real API)"
	@echo "  dev-mock       Start development server with mock data"
	@echo "  dev-fake       Start development server with fake data"
	@echo "  dev-real       Start development server with real API"
	@echo "  build          Build for production"
	@echo "  preview        Preview production build"
	@echo "  test           Run tests"
	@echo "  lint           Run linter"
	@echo "  lint-fix       Run linter and fix issues"
	@echo "  clean          Clean build artifacts"
	@echo "  electron-dev   Start Electron desktop app in dev mode"
	@echo "  electron-build Build Electron desktop app"

install: ## Install dependencies
	npm install

dev: ## Start development server (default - uses real API)
	@echo "Using real API by default. Use 'make dev-mock' or 'make dev-fake' for mock/fake data."
	npm run dev

dev-mock: ## Start development server with mock data
	@echo "Starting with mock data..."
	npm run dev:mock

dev-fake: ## Start development server with fake data
	@echo "Starting with fake data..."
	npm run dev:fake

dev-real: ## Start development server with real API
	@echo "Starting with real API..."
	npm run dev:real

build: ## Build for production
	npm run build

preview: ## Preview production build
	npm run preview

test: ## Run tests
	npm test

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf dist
	rm -rf dist-electron

# Electron targets
electron-dev: ## Start Electron desktop app in dev mode
	npm run electron:dev

electron-build: ## Build Electron desktop app
	npm run electron:build

electron-build-win: ## Build Electron desktop app for Windows
	npm run electron:build:win

electron-build-mac: ## Build Electron desktop app for macOS
	npm run electron:build:mac
