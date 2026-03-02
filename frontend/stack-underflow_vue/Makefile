# Vue.js Frontend Makefile

.PHONY: help install dev build test lint clean

PORT ?= 5173

help: ## Show this help message
	@echo "Vue.js Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server (mock API)"
	@echo "  dev:mock      Start development server with mock API"
	@echo "  dev:fake      Start development server with fake API"
	@echo "  dev:api       Start development server with real API"
	@echo "  build         Build for production"
	@echo "  build:mock    Build with mock API"
	@echo "  build:fake    Build with fake API"
	@echo "  build:api     Build with real API"
	@echo "  preview       Preview production build"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"

install: ## Install dependencies
	npm install

dev: ## Start development server (mock API - default)
dev:mock: ## Start development server with mock API
	npm run dev

dev:fake: ## Start development server with fake API
	npm run dev:fake

dev:api: ## Start development server with real API
	npm run dev:api

build: ## Build for production (mock API)
build:mock: ## Build with mock API
	npm run build

build:fake: ## Build with fake API
	npm run build:fake

build:api: ## Build with real API
	npm run build:api

preview: ## Preview production build
preview:mock: ## Preview mock build
preview:fake: ## Preview fake API build
preview:api: ## Preview real API build
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
