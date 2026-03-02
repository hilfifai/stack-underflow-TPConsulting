# Rust Backend Makefile

.PHONY: help install dev build start test lint clean

PORT ?= 8080

help: ## Show this help message
	@echo "Rust Backend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server"
	@echo "  build         Build for development"
	@echo "  build-release Build for production (release mode)"
	@echo "  start         Start production server"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  lint-fix      Run linter and fix issues"
	@echo "  clean         Clean build artifacts"
	@echo "  db-create     Create database"
	@echo "  db-migrate    Run database migrations"
	@echo "  check         Check for compilation errors"

install: ## Install dependencies
	cargo build

dev: ## Start development server
	cargo run

build: ## Build for development
	cargo build

build-release: ## Build for production (release mode)
	cargo build --release

start: ## Start production server
	./target/release/api-stack-underflow

test: ## Run tests
	cargo test

test-coverage: ## Run tests with coverage
	cargo tarpaulin --out Html

lint: ## Run linter
	cargo clippy --all-targets --all-features -- -D warnings

lint-fix: ## Run linter and fix issues
	cargo clippy --fix

check: ## Check for compilation errors
	cargo check
	cargo check --tests
	cargo check --doc

clean: ## Clean build artifacts
	cargo clean
	rm -rf target

db-create: ## Create database
	sqlx database create

db-migrate: ## Run database migrations
	sqlx migrate run

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-rust .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) --env-file .env stack-underflow-rust
