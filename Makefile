# StackUnderflow - Main Makefile
# A multi-stack Q&A platform project

.PHONY: help install-all backend frontend test clean dev dev-mock dev-fake dev-real \
  dev/backend/go-gin-sqlx dev/backend/node-express dev/backend/python-fastapi \
  dev/backend/laravel dev/backend/java-springbot dev/backend/dot-net dev/backend/rust \
  dev/frontend/react dev/frontend/react-mock dev/frontend/react-fake dev/frontend/react-real \
  dev/frontend/vue dev/frontend/vue-mock dev/frontend/vue-fake dev/frontend/vue-real \
  dev/frontend/angular dev/frontend/angular-mock dev/frontend/angular-fake dev/frontend/angular-real \
  dev/frontend/nextjs dev/frontend/nextjs-mock dev/frontend/nextjs-fake dev/frontend/nextjs-real \
  dev/frontend/svelte dev/frontend/svelte-mock dev/frontend/svelte-fake dev/frontend/svelte-real \
  dev/frontend/nuxt dev/frontend/nuxt-mock dev/frontend/nuxt-fake dev/frontend/nuxt-real \
  dev/frontend/flutter dev/frontend/flutter-mock dev/frontend/flutter-fake dev/frontend/flutter-real \
  dev/frontend/react-native dev/frontend/react-native-mock dev/frontend/react-native-fake dev/frontend/react-native-real \
  dev/frontend/cordova dev/frontend/cordova-mock dev/frontend/cordova-fake dev/frontend/cordova-real \
  dev/frontend/livewire dev/frontend/livewire-mock dev/frontend/livewire-fake dev/frontend/livewire-real \
  dev/frontend/blade dev/frontend/blade-mock dev/frontend/blade-fake dev/frontend/blade-real

help: ## Show this help message
	@echo "StackUnderflow - Multi-Stack Q&A Platform"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help              Show this help message"
	@echo "  install-all       Install all dependencies for all stacks"
	@echo "  install-backend   Install backend dependencies"
	@echo "  install-frontend  Install frontend dependencies"
	@echo "  dev               Start development (default - real API)"
	@echo "  dev-mock          Start frontend with mock data"
	@echo "  dev-fake          Start frontend with fake data"
	@echo "  dev-real          Start frontend with real API"
	@echo "  test              Run all tests"
	@echo "  clean             Clean all build artifacts"
	@echo ""
	@echo "Backend Stacks:"
	@echo "  dev/backend/go-gin-sqlx     - Go + Gin + SQLX"
	@echo "  dev/backend/node-express    - Node.js + Express + Prisma"
	@echo "  dev/backend/python-fastapi - Python + FastAPI + SQLAlchemy"
	@echo "  dev/backend/laravel         - PHP + Laravel + JWT"
	@echo "  dev/backend/java-springbot - Java + Spring Boot + JPA"
	@echo "  dev/backend/dot-net        - C# + .NET 8 + EF Core"
	@echo "  dev/backend/rust           - Rust + Actix-web + SQLx"
	@echo ""
	@echo "Frontend Stacks:"
	@echo "  dev/frontend/react         - React + TypeScript + Vite"
	@echo "  dev/frontend/react-mock   - React with mock data"
	@echo "  dev/frontend/react-fake   - React with fake data"
	@echo "  dev/frontend/react-real   - React with real API"
	@echo "  dev/frontend/vue          - Vue 3 + TypeScript + Vite"
	@echo "  dev/frontend/vue-mock    - Vue with mock data"
	@echo "  dev/frontend/vue-fake    - Vue with fake data"
	@echo "  dev/frontend/vue-real    - Vue with real API"
	@echo "  dev/frontend/angular     - Angular 18+"
	@echo "  dev/frontend/angular-mock - Angular with mock data"
	@echo "  dev/frontend/angular-fake - Angular with fake data"
	@echo "  dev/frontend/angular-real - Angular with real API"
	@echo "  dev/frontend/nextjs      - Next.js 14"
	@echo "  dev/frontend/nextjs-mock - Next.js with mock data"
	@echo "  dev/frontend/nextjs-fake - Next.js with fake data"
	@echo "  dev/frontend/nextjs-real - Next.js with real API"
	@echo "  dev/frontend/svelte      - Svelte 5 + SvelteKit"
	@echo "  dev/frontend/svelte-mock - Svelte with mock data"
	@echo "  dev/frontend/svelte-fake - Svelte with fake data"
	@echo "  dev/frontend/svelte-real - Svelte with real API"
	@echo "  dev/frontend/nuxt        - Nuxt 3"
	@echo "  dev/frontend/nuxt-mock  - Nuxt with mock data"
	@echo "  dev/frontend/nuxt-fake   - Nuxt with fake data"
	@echo "  dev/frontend/nuxt-real   - Nuxt with real API"
	@echo "  dev/frontend/flutter     - Flutter (Mobile)"
	@echo "  dev/frontend/flutter-mock - Flutter with mock data"
	@echo "  dev/frontend/flutter-fake - Flutter with fake data"
	@echo "  dev/frontend/flutter-real - Flutter with real API"
	@echo "  dev/frontend/react-native - React Native + Expo"
	@echo "  dev/frontend/react-native-mock - React Native with mock data"
	@echo "  dev/frontend/react-native-fake - React Native with fake data"
	@echo "  dev/frontend/react-native-real - React Native with real API"
	@echo "  dev/frontend/cordova     - Apache Cordova"
	@echo "  dev/frontend/cordova-mock - Cordova with mock data"
	@echo "  dev/frontend/cordova-fake - Cordova with fake data"
	@echo "  dev/frontend/cordova-real - Cordova with real API"
	@echo "  dev/frontend/livewire    - Laravel Livewire"
	@echo "  dev/frontend/livewire-mock - Livewire with mock data"
	@echo "  dev/frontend/livewire-fake - Livewire with fake data"
	@echo "  dev/frontend/livewire-real - Livewire with real API"
	@echo "  dev/frontend/blade       - Laravel Blade"
	@echo "  dev/frontend/blade-mock  - Blade with mock data"
	@echo "  dev/frontend/blade-fake  - Blade with fake data"
	@echo "  dev/frontend/blade-real  - Blade with real API"
	@echo "  dev/frontend/blade        - Laravel Blade"

install-all: install-backend install-frontend ## Install all dependencies

install-backend: ## Install backend dependencies
	@echo "Installing backend dependencies..."
	@echo "Note: Please install each backend stack individually"
	@echo "  make install/backend/go-gin-sqlx"
	@echo "  make install/backend/node-express"
	@echo "  make install/backend/python-fastapi"
	@echo "  make install/backend/laravel"
	@echo "  make install/backend/java-springbot"
	@echo "  make install/backend/dot-net"
	@echo "  make install/backend/rust"

install-frontend: ## Install frontend dependencies
	@echo "Installing frontend dependencies..."
	@echo "Note: Please install each frontend stack individually"
	@echo "  make install/frontend/react"
	@echo "  make install/frontend/vue"
	@echo "  make install/frontend/angular"
	@echo "  make install/frontend/nextjs"
	@echo "  make install/frontend/svelte"
	@echo "  make install/frontend/nuxt"
	@echo "  make install/frontend/flutter"
	@echo "  make install/frontend/react-native"
	@echo "  make install/frontend/cordova"
	@echo "  make install/frontend/livewire"
	@echo "  make install/frontend/blade"

# Backend Install Targets
install/backend/go-gin-sqlx:
	@echo "Installing Go + Gin + SQLX..."
	cd backend/go-gin-sqlx && make install

install/backend/node-express:
	@echo "Installing Node.js + Express..."
	cd backend/node-express && npm install

install/backend/python-fastapi:
	@echo "Installing Python + FastAPI..."
	cd backend/python-fastapi && pip install -r requirements.txt

install/backend/laravel:
	@echo "Installing PHP + Laravel..."
	cd backend/laravel && composer install

install/backend/java-springbot:
	@echo "Installing Java + Spring Boot..."
	cd backend/java-springbot && mvn clean install

install/backend/dot-net:
	@echo "Installing .NET 8..."
	cd backend/dot-net && dotnet restore

install/backend/rust:
	@echo "Installing Rust..."
	cd backend/rust && cargo build

# Frontend Install Targets
install/frontend/react:
	@echo "Installing React..."
	cd frontend/stack-underflow_react && npm install

install/frontend/vue:
	@echo "Installing Vue 3..."
	cd frontend/stack-underflow_vue && npm install

install/frontend/angular:
	@echo "Installing Angular..."
	cd frontend/stack-underflow_angular && npm install

install/frontend/nextjs:
	@echo "Installing Next.js..."
	cd frontend/stack-underflow-nextjs && npm install

install/frontend/svelte:
	@echo "Installing Svelte..."
	cd frontend/stack-underflow_svelte && npm install

install/frontend/nuxt:
	@echo "Installing Nuxt..."
	cd frontend/stack-underflow-nuxt && npm install

install/frontend/flutter:
	@echo "Installing Flutter..."
	cd frontend/stack_underflow_flutter && flutter pub get

install/frontend/react-native:
	@echo "Installing React Native..."
	cd frontend/Stack-Underflow_reactNativeMobile && npm install

install/frontend/cordova:
	@echo "Installing Cordova..."
	cd frontend/stack-underflow_cordova && npm install

install/frontend/livewire:
	@echo "Installing Laravel Livewire..."
	cd frontend/stack-underflow_livewire && composer install && npm install

install/frontend/blade:
	@echo "Installing Laravel Blade..."
	cd frontend/stack-underflow_blade && composer install && npm install

test: ## Run all tests
	@echo "Running all tests..."
	@echo "Note: Please run tests for each stack individually"

clean: ## Clean all build artifacts
	@echo "Cleaning all build artifacts..."
	@echo "Note: Please clean each stack individually"

# =============================================================================
# Development Targets
# =============================================================================

dev: ## Start development (default - uses real API)
	@echo "Starting development with real API..."
	@echo "Use 'make dev-mock' for mock data or 'make dev-fake' for fake data"
	make dev-real

dev-mock: ## Start development with mock data (frontend only)
	@echo "Starting React frontend with mock data..."
	cd frontend/stack-underflow_react && npm run dev:mock

dev-fake: ## Start development with fake data (frontend only)
	@echo "Starting React frontend with fake data..."
	cd frontend/stack-underflow_react && npm run dev:fake

dev-real: ## Start development with real API (frontend only)
	@echo "Starting React frontend with real API..."
	cd frontend/stack-underflow_react && npm run dev:real

# Backend Development Targets
dev/backend/go-gin-sqlx: ## Start Go + Gin + SQLX development server
	cd backend/go-gin-sqlx && make dev

dev/backend/node-express: ## Start Node.js + Express development server
	cd backend/node-express && npm run dev

dev/backend/python-fastapi: ## Start Python + FastAPI development server
	cd backend/python-fastapi && make dev

dev/backend/laravel: ## Start PHP + Laravel development server
	cd backend/laravel && make dev

dev/backend/java-springbot: ## Start Java + Spring Boot development server
	cd backend/java-springbot && make dev

dev/backend/dot-net: ## Start .NET 8 development server
	cd backend/dot-net && make dev

dev/backend/rust: ## Start Rust development server
	cd backend/rust && make dev

# Frontend Development Targets
dev/frontend/react: ## Start React development server
	cd frontend/stack-underflow_react && npm run dev

dev/frontend/react-mock: ## Start React with mock data
	cd frontend/stack-underflow_react && npm run dev:mock

dev/frontend/react-fake: ## Start React with fake data
	cd frontend/stack-underflow_react && npm run dev:fake

dev/frontend/react-real: ## Start React with real API
	cd frontend/stack-underflow_react && npm run dev:real

dev/frontend/vue: ## Start Vue 3 development server
	cd frontend/stack-underflow_vue && npm run dev

dev/frontend/vue-mock: ## Start Vue 3 with mock data
	cd frontend/stack-underflow_vue && npm run dev:mock

dev/frontend/vue-fake: ## Start Vue 3 with fake data
	cd frontend/stack-underflow_vue && npm run dev:fake

dev/frontend/vue-real: ## Start Vue 3 with real API
	cd frontend/stack-underflow_vue && npm run dev:real

dev/frontend/angular: ## Start Angular development server
	cd frontend/stack-underflow_angular && npm run dev

dev/frontend/angular-mock: ## Start Angular with mock data
	cd frontend/stack-underflow_angular && npm run dev:mock

dev/frontend/angular-fake: ## Start Angular with fake data
	cd frontend/stack-underflow_angular && npm run dev:fake

dev/frontend/angular-real: ## Start Angular with real API
	cd frontend/stack-underflow_angular && npm run dev:real

dev/frontend/nextjs: ## Start Next.js development server
	cd frontend/stack-underflow-nextjs && npm run dev

dev/frontend/nextjs-mock: ## Start Next.js with mock data
	cd frontend/stack-underflow-nextjs && npm run dev:mock

dev/frontend/nextjs-fake: ## Start Next.js with fake data
	cd frontend/stack-underflow-nextjs && npm run dev:fake

dev/frontend/nextjs-real: ## Start Next.js with real API
	cd frontend/stack-underflow-nextjs && npm run dev:real

dev/frontend/svelte: ## Start Svelte development server
	cd frontend/stack-underflow_svelte && npm run dev

dev/frontend/svelte-mock: ## Start Svelte with mock data
	cd frontend/stack-underflow_svelte && npm run dev:mock

dev/frontend/svelte-fake: ## Start Svelte with fake data
	cd frontend/stack-underflow_svelte && npm run dev:fake

dev/frontend/svelte-real: ## Start Svelte with real API
	cd frontend/stack-underflow_svelte && npm run dev:real

dev/frontend/nuxt: ## Start Nuxt development server
	cd frontend/stack-underflow-nuxt && npm run dev

dev/frontend/nuxt-mock: ## Start Nuxt with mock data
	cd frontend/stack-underflow-nuxt && npm run dev:mock

dev/frontend/nuxt-fake: ## Start Nuxt with fake data
	cd frontend/stack-underflow-nuxt && npm run dev:fake

dev/frontend/nuxt-real: ## Start Nuxt with real API
	cd frontend/stack-underflow-nuxt && npm run dev:real

dev/frontend/flutter: ## Start Flutter development server
	cd frontend/stack_underflow_flutter && flutter run

dev/frontend/flutter-mock: ## Start Flutter with mock data
	cd frontend/stack_underflow_flutter && flutter run --dart-define=API_MODE=mock

dev/frontend/flutter-fake: ## Start Flutter with fake data
	cd frontend/stack_underflow_flutter && flutter run --dart-define=API_MODE=fake

dev/frontend/flutter-real: ## Start Flutter with real API
	cd frontend/stack_underflow_flutter && flutter run --dart-define=API_MODE=real

dev/frontend/react-native: ## Start React Native development server
	cd frontend/Stack-Underflow_reactNativeMobile && npm start

dev/frontend/react-native-mock: ## Start React Native with mock data
	cd frontend/Stack-Underflow_reactNativeMobile && npm run dev:mock

dev/frontend/react-native-fake: ## Start React Native with fake data
	cd frontend/Stack-Underflow_reactNativeMobile && npm run dev:fake

dev/frontend/react-native-real: ## Start React Native with real API
	cd frontend/Stack-Underflow_reactNativeMobile && npm run dev:real

dev/frontend/cordova: ## Start Cordova development server
	cd frontend/stack-underflow_cordova && npm run dev

dev/frontend/cordova-mock: ## Start Cordova with mock data
	cd frontend/stack-underflow_cordova && npm run dev:mock

dev/frontend/cordova-fake: ## Start Cordova with fake data
	cd frontend/stack-underflow_cordova && npm run dev:fake

dev/frontend/cordova-real: ## Start Cordova with real API
	cd frontend/stack-underflow_cordova && npm run dev:real

dev/frontend/livewire: ## Start Laravel Livewire development server
	cd frontend/stack-underflow_livewire && make dev

dev/frontend/livewire-mock: ## Start Laravel Livewire with mock data
	cd frontend/stack-underflow_livewire && make dev:mock

dev/frontend/livewire-fake: ## Start Laravel Livewire with fake data
	cd frontend/stack-underflow_livewire && make dev:fake

dev/frontend/livewire-real: ## Start Laravel Livewire with real API
	cd frontend/stack-underflow_livewire && make dev:real

dev/frontend/blade: ## Start Laravel Blade development server
	cd frontend/stack-underflow_blade && make dev

dev/frontend/blade-mock: ## Start Laravel Blade with mock data
	cd frontend/stack-underflow_blade && make dev:mock

dev/frontend/blade-fake: ## Start Laravel Blade with fake data
	cd frontend/stack-underflow_blade && make dev:fake

dev/frontend/blade-real: ## Start Laravel Blade with real API
	cd frontend/stack-underflow_blade && make dev:real
