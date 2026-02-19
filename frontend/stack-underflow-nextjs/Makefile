# Next.js Frontend Makefile

.PHONY: help install dev build test lint clean

PORT ?= 3000

help: ## Show this help message
	@echo "Next.js Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server"
	@echo "  build         Build for production"
	@echo "  start         Start production server"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

start: ## Start production server
	npm run start

test: ## Run tests
	npm test

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf .next
	rm -rf out
