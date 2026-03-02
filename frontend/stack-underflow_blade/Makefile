# Laravel Blade Frontend Makefile

.PHONY: help install dev build test lint clean

PORT ?= 8000

help: ## Show this help message
	@echo "Laravel Blade Frontend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server"
	@echo "  build         Build for production"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  clean         Clean build artifacts"
	@echo "  key-generate  Generate app key"
	@echo "  optimize      Optimize Laravel"

install: ## Install dependencies
	composer install
	npm install

dev: ## Start development server
	php artisan serve --host=0.0.0.0 --port=$(PORT)
	@echo "Also run Vite in another terminal:"
	@echo "  npm run dev"

build: ## Build for production
	npm run build
	composer install --no-dev --optimize-autoloader

test: ## Run tests
	php artisan test

lint: ## Run linter
	./vendor/bin/pint

clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf bootstrap/cache/*
	rm -rf storage/logs/*

key-generate: ## Generate app key
	php artisan key:generate

optimize: ## Optimize Laravel
	php artisan optimize:clear
	php artisan optimize
