# Angular Frontend Makefile

.PHONY: help install dev build test lint clean

PORT ?= 4200

help: ## Show this help message
	@echo "Angular Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server (mock API)"
	@echo "  start:mock    Start development server with mock API"
	@echo "  start:fake    Start development server with fake API"
	@echo "  start:real    Start development server with real API"
	@echo "  build         Build for production (mock API)"
	@echo "  build:mock    Build with mock API"
	@echo "  build:fake    Build with fake API"
	@echo "  build:real    Build with real API"
	@echo "  test          Run tests"
	@echo "  test:coverage Run tests with coverage"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"
	@echo "  generate      Generate components/services"

install: ## Install dependencies
	npm install

dev: ## Start development server (mock API - default)
start:mock: ## Start development server with mock API
	npm start

start:fake: ## Start development server with fake API
	npm run start:fake

start:real: ## Start development server with real API
	npm run start:real

build: ## Build for production (mock API)
build:mock: ## Build with mock API
	npm run build

build:fake: ## Build with fake API
	npm run build:fake

build:real: ## Build with real API
	npm run build:real

test: ## Run tests
	npm test

test:coverage: ## Run tests with coverage
	npm run test:coverage

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf dist

generate: ## Generate components/services
	@echo "Use ng generate command:"
	@echo "  npm run ng -- generate component components/my-component"
	@echo "  npm run ng -- generate service services/my-service"
