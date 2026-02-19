# Laravel Backend Makefile

.PHONY: help install dev build start test lint clean migrate seed

PORT ?= 8000

help: ## Show this help message
	@echo "Laravel Backend - StackUnderflow"
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
	@echo "  clean         Clean build artifacts"
	@echo "  migrate       Run database migrations"
	@echo "  seed          Seed database"
	@echo "  key-generate  Generate app key"
	@echo "  jwt-secret    Generate JWT secret"
	@echo "  optimize      Optimize Laravel"

install: ## Install dependencies
	composer install
	npm install

dev: ## Start development server
	php artisan serve --host=0.0.0.0 --port=$(PORT)

build: ## Build for production
	npm run build
	composer install --no-dev --optimize-autoloader

start: ## Start production server
	php artisan serve --host=0.0.0.0 --port=$(PORT)

test: ## Run tests
	php artisan test

lint: ## Run linter
	./vendor/bin/pint

clean: ## Clean build artifacts
	rm -rf bootstrap/cache/*
	rm -rf storage/logs/*
	rm -rf node_modules

migrate: ## Run database migrations
	php artisan migrate

migrate-fresh: ## Fresh migrate (drops all tables and re-runs)
	php artisan migrate:fresh

seed: ## Seed database
	php artisan db:seed

key-generate: ## Generate app key
	php artisan key:generate

jwt-secret: ## Generate JWT secret
	php artisan jwt:secret

optimize: ## Optimize Laravel
	php artisan optimize:clear
	php artisan optimize

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-laravel .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) --env-file .env stack-underflow-laravel
