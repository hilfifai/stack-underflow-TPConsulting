# Java Spring Boot Backend Makefile

.PHONY: help install dev build start test lint clean

PORT ?= 8080

help: ## Show this help message
	@echo "Java Spring Boot Backend - StackUnderflow"
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
	@echo "  lint          Run linter (checkstyle)"
	@echo "  clean         Clean build artifacts"
	@echo "  spring-shell  Start Spring Boot Shell"

install: ## Install dependencies
	mvn clean install -DskipTests

dev: ## Start development server
	mvn spring-boot:run

build: ## Build for production
	mvn clean package -DskipTests

build-jar: ## Build JAR file
	mvn clean package -DskipTests -jar

start: ## Start production server
	java -jar target/backend-0.0.1-SNAPSHOT.jar

test: ## Run tests
	mvn test

test-coverage: ## Run tests with coverage
	mvn test jacoco:report

lint: ## Run linter (checkstyle)
	mvn checkstyle:check

lint-fix: ## Run linter and fix issues
	mvn checkstyle:checkstyle

clean: ## Clean build artifacts
	mvn clean
	rm -rf target

# Docker targets
docker-build: ## Build Docker image
	docker build -t stack-underflow-springboot .

docker-run: ## Run Docker container
	docker run -p $(PORT):$(PORT) stack-underflow-springboot
