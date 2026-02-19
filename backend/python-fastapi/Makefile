# Python FastAPI Backend Makefile

.PHONY: help install dev build start test lint clean venv

PORT ?= 8000

help: ## Show this help message
	@echo "Python FastAPI Backend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  venv          Create virtual environment"
	@echo "  install       Install dependencies"
	@echo "  dev           Start development server with reload"
	@echo "  build         Build for production"
	@echo "  start         Start production server"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  clean         Clean build artifacts"
	@echo "  migrate       Run database migrations"

venv: ## Create virtual environment
	python -m venv venv
	@echo "Virtual environment created. Activate with: source venv/bin/activate"

install: ## Install dependencies
	@if [ ! -d "venv" ]; then make venv; fi
	. venv/bin/activate && pip install -r requirements.txt

dev: ## Start development server
	. venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port $(PORT)

build: ## Build for production
	@echo "FastAPI doesn't require a build step. Use 'make start' to run."

start: ## Start production server
	. venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port $(PORT)

test: ## Run tests
	. venv/bin/activate && pytest -v

lint: ## Run linter
	. venv/bin/activate && ruff check .

clean: ## Clean build artifacts
	rm -rf venv
	rm -rf __pycache__
	rm -rf *.pyc

migrate: ## Run database migrations
	@echo "SQLAlchemy auto-creates tables on startup. No migrations needed."

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-fastapi .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) --env-file .env stack-underflow-fastapi
