# Node.js Express Backend Makefile

.PHONY: help install dev build start test lint clean

BINARY_NAME=api-stack-underflow
PORT ?= 3000

help: ## Show this help message
	@echo "Node.js Express Backend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server with nodemon"
	@echo "  build         Build for production"
	@echo "  start         Start production server"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"
	@echo "  migrate       Run database migrations"
	@echo "  generate      Generate Prisma client"
	@echo "  db-reset      Reset database"

install: ## Install dependencies
	npm install
	npm run generate

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

start: ## Start production server
	npm start

test: ## Run tests
	npm test

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

clean: ## Clean build artifacts
	rm -rf dist
	rm -rf node_modules

migrate: ## Run database migrations
	npm run migrate

generate: ## Generate Prisma client
	npm run generate

db-reset: ## Reset database
	npm run db:reset

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-node .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) --env-file .env stack-underflow-node
