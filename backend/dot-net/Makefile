# .NET 8 Backend Makefile

.PHONY: help install dev build start test lint clean

PORT ?= 5000

help: ## Show this help message
	@echo ".NET 8 Backend - StackUnderflow"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help          Show this help message"
	@echo "  install       Restore dependencies"
	@echo "  dev           Start development server with hot reload"
	@echo "  build         Build for production"
	@echo "  start         Start production server"
	@echo "  test          Run tests"
	@echo "  lint          Run linter"
	@echo "  clean         Clean build artifacts"
	@echo "  swagger       Generate Swagger documentation"

install: ## Restore dependencies
	dotnet restore

dev: ## Start development server with hot reload
	dotnet watch run --urls=http://0.0.0.0:$(PORT)

build: ## Build for production
	dotnet build --configuration Release

build-standalone: ## Build standalone executable
	dotnet publish --configuration Release --runtime osx-x64 --self-contained false -o publish

start: ## Start production server
	dotnet run --configuration Release

test: ## Run tests
	dotnet test

lint: ## Run linter
	dotnet format --verify-no-changes

clean: ## Clean build artifacts
	dotnet clean
	rm -rf bin obj

swagger: ## Generate Swagger documentation
	@echo "Swagger UI available at http://localhost:$(PORT)/swagger"

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-dotnet .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) stack-underflow-dotnet
