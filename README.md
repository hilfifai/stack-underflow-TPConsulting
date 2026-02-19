# StackUnderflow

A multi-stack Q&A application inspired by Stack Overflow. This project implements the same application using various technology stacks for both backend and frontend.

## 🏗️ Project Architecture

This monorepo contains multiple implementations of the same StackOverflow-like Q&A platform:

### Backend Stacks
| Stack | Framework | ORM | Database | Port |
|-------|-----------|-----|----------|------|
| [Go + Gin + SQLX](backend/go-gin-sqlx) | Gin | SQLX | PostgreSQL | 8080 |
| [Node.js + Express + Prisma](backend/node-express) | Express | Prisma | PostgreSQL | 3000 |
| [Python + FastAPI + SQLAlchemy](backend/python-fastapi) | FastAPI | SQLAlchemy | PostgreSQL | 8000 |
| [PHP + Laravel + Eloquent](backend/laravel) | Laravel | Eloquent | MySQL | 8000 |
| [Java + Spring Boot + JPA](backend/java-springbot) | Spring Boot | JPA | MySQL | 8080 |
| [C# + .NET 8 + EF Core](backend/dot-net) | ASP.NET Core | Entity Framework | PostgreSQL | 5000 |
| [Rust + Actix-web + SQLx](backend/rust) | Actix-web | SQLx | PostgreSQL | 8080 |

### Frontend Stacks
| Stack | Framework | Type | API Layers |
|-------|-----------|------|------------|
| [React + TypeScript + Vite](frontend/stack-underflow_react) | React | Web | Mock |
| [Vue 3 + TypeScript + Vite](frontend/stack-underflow_vue) | Vue 3 | Web | Mock, Fake, Real |
| [Angular 18+](frontend/stack-underflow_angular) | Angular | Web | Mock, Fake, Real |
| [Next.js 14](frontend/stack-underflow-nextjs) | Next.js | Web | Mock, Fake, Real |
| [Svelte 5 + SvelteKit](frontend/stack-underflow_svelte) | Svelte 5 | Web | Real |
| [Nuxt 3](frontend/stack-underflow-nuxt) | Nuxt 3 | Web | Real |
| [Flutter](frontend/stack_underflow_flutter) | Flutter | Mobile | Mock |
| [React Native + Expo](frontend/Stack-Underflow_reactNativeMobile) | React Native | Mobile | Mock |
| [Apache Cordova](frontend/stack-underflow_cordova) | Cordova | Mobile | Real |
| [Laravel Livewire](frontend/stack-underflow_livewire) | Livewire | Web | Real |
| [Laravel Blade](frontend/stack-underflow_blade) | Blade | Web | Real |

---

## 📋 Prerequisites

Before running any stack, ensure you have the following software installed on your system.

### 🖥️ System Requirements

| OS | Minimum Version | Recommended |
|----|-----------------|-------------|
| **macOS** | Ventura 13.0+ | Sonoma 14.0+ |
| **Windows** | Windows 10 | Windows 11 |
| **Linux** | Ubuntu 20.04+ | Ubuntu 22.04+ |

---

## 🔧 Installation Guide

### 1. Git

**Required for:** All stacks (version control)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://git-scm.com/download/mac | `brew install git` or download installer |
| Windows | https://git-scm.com/download/win | Download installer (.exe) |
| Linux | https://git-scm.com/download/linux | `sudo apt install git` (Ubuntu/Debian) |

**Verify installation:**
```bash
git --version
```

---

### 2. Make

**Required for:** All stacks (build automation)

| OS | Installation |
|----|--------------|
| macOS | `xcode-select --install` (comes with Xcode Command Line Tools) |
| Windows | Install via https://gnuwin32.sourceforge.net/packages/make.htm or use WSL |
| Linux | `sudo apt install build-essential` (Ubuntu/Debian) |

**Verify installation:**
```bash
make --version
```

---

### 3. Docker & Docker Compose

**Required for:** Database (PostgreSQL, MySQL) - Optional but recommended

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://docs.docker.com/desktop/install/mac-install/ | Docker Desktop for Mac |
| Windows | https://docs.docker.com/desktop/install/windows-install/ | Docker Desktop for Windows |
| Linux | https://docs.docker.com/engine/install/ | Docker Engine + Docker Compose Plugin |

**Verify installation:**
```bash
docker --version
docker compose version
```

---

## 🐍 Backend Prerequisites

### Go (Golang)

**Required for:** [Go + Gin + SQLX](backend/go-gin-sqlx)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://go.dev/dl/go1.21.darwin-amd64.pkg | Download .pkg installer or `brew install go` |
| Windows | https://go.dev/dl/go1.21.windows-amd64.msi | Download .msi installer |
| Linux | https://go.dev/dl/go1.21.linux-amd64.tar.gz | `wget https://go.dev/dl/go1.21.linux-amd64.tar.gz && sudo tar -C /usr/local -xzf go1.21.linux-amd64.tar.gz` |

**Verify installation:**
```bash
go version
```

**Add to PATH (if not already):**
```bash
# macOS/Linux - Add to ~/.zshrc or ~/.bashrc
export PATH=$PATH:/usr/local/go/bin
```

---

### Node.js

**Required for:** [Node.js + Express + Prisma](backend/node-express), [React](frontend/stack-underflow_react), [Vue](frontend/stack-underflow_vue), [Angular](frontend/stack-underflow_angular), [Next.js](frontend/stack-underflow-nextjs), [Svelte](frontend/stack-underflow_svelte), [Nuxt](frontend/stack-underflow-nuxt), [React Native](frontend/Stack-Underflow_reactNativeMobile), [Cordova](frontend/stack-underflow_cordova)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://nodejs.org/dist/v20.10.0/node-v20.10.0.pkg | Download LTS .pkg installer or `brew install node` |
| Windows | https://nodejs.org/dist/v20.10.0/node-v20.10.0-x86.msi | Download LTS .msi installer |
| Linux | https://github.com/nodesource/distributions | Use NodeSource PPA: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -` |

**Verify installation:**
```bash
node --version
npm --version
```

**Package managers:**
```bash
# npm (comes with Node.js)
npm install -g npm@latest

# pnpm (optional)
npm install -g pnpm

# yarn (optional)
npm install -g yarn
```

---

### Python

**Required for:** [Python + FastAPI](backend/python-fastapi)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://www.python.org/downloads/release/python-3110/ | Download .pkg installer or `brew install python@3.11` |
| Windows | https://www.python.org/downloads/release/python-3110/ | Download .exe installer (CHECK "Add to PATH") |
| Linux | https://www.python.org/downloads/source/ | `sudo apt install python3.11 python3.11-venv python3-pip` (Ubuntu/Debian) |

**Verify installation:**
```bash
python3 --version
pip3 --version
```

---

### PHP

**Required for:** [Laravel Backend](backend/laravel), [Livewire Frontend](frontend/stack-underflow_livewire), [Blade Frontend](frontend/stack-underflow_blade)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://www.php.net/downloads | `brew install php@8.2` (use Homebrew) |
| Windows | https://windows.php.net/download/ | Download PHP 8.2 Thread Safe .zip |
| Linux | https://www.php.net/manual/en/install.php | `sudo apt install php8.2 php8.2-cli php8.2-fpm` (Ubuntu/Debian) |

**Verify installation:**
```bash
php --version
```

**Required PHP Extensions for Laravel:**
- OpenSSL
- PDO
- Mbstring
- Tokenizer
- XML
- Ctype
- JSON
- BCMath

---

### Composer (PHP Package Manager)

**Required for:** Laravel stacks

| OS | Download Link | Installation |
|----|---------------|--------------|
| All | https://getcomposer.org/download/ | Download and run installer script |

**Installation:**
```bash
# macOS/Linux
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer

# Windows
# Download and run Composer-Setup.exe
```

**Verify installation:**
```bash
composer --version
```

---

### Java JDK 17+

**Required for:** [Java + Spring Boot](backend/java-springbot)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://download.oracle.com/java/17/latest/jdk-17_macos-x64_bin.dmg | Download .dmg installer or `brew install openjdk@17` |
| Windows | https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe | Download .exe installer |
| Linux | https://jdk.java.net/17/ | `sudo apt install openjdk-17-jdk` (Ubuntu/Debian) |

**Verify installation:**
```bash
java --version
javac --version
```

**Set JAVA_HOME:**
```bash
# macOS/Linux - Add to ~/.zshrc or ~/.bashrc
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

---

### .NET 8 SDK

**Required for:** [C# + .NET 8](backend/dot-net)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://dotnet.microsoft.com/download/dotnet/8.0 | Download .pkg installer |
| Windows | https://dotnet.microsoft.com/download/dotnet/8.0 | Download .exe installer |
| Linux | https://dotnet.microsoft.com/download/dotnet/8.0 | Follow https://docs.microsoft.com/en-us/dotnet/core/install/linux |

**Installation (macOS/Linux):**
```bash
# macOS
brew install dotnet-sdk@8.0

# Ubuntu/Debian
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update
sudo apt install dotnet-sdk-8.0
```

**Verify installation:**
```bash
dotnet --list-sdks
dotnet --version
```

---

### Rust & Cargo

**Required for:** [Rust + Actix-web](backend/rust)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://www.rust-lang.org/tools/install | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` |
| Windows | https://www.rust-lang.org/tools/install | Download and run rustup-init.exe |
| Linux | https://www.rust-lang.org/tools/install | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` |

**Additional tools for Rust:**
```bash
# Install sqlx-cli for database migrations
cargo install sqlx-cli --no-default-features --features postgres
```

**Verify installation:**
```bash
rustc --version
cargo --version
```

---

### Maven

**Required for:** [Java Spring Boot](backend/java-springbot) - (Optional, comes with some IDEs)

| OS | Download Link | Installation |
|----|---------------|--------------|
| All | https://maven.apache.org/download.cgi | Download .tar.gz and add to PATH |

**Verify installation:**
```bash
mvn --version
```

---

## 💻 Frontend Prerequisites

### Node.js

See [Node.js section](#nodejs) above.

---

### Flutter SDK

**Required for:** [Flutter Mobile App](frontend/stack_underflow_flutter)

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://docs.flutter.dev/get-started/install/macos | Download .zip and extract to ~/development |
| Windows | https://docs.flutter.dev/get-started/install/windows | Download .zip and extract to C:\src\flutter |
| Linux | https://docs.flutter.dev/get-started/install/linux | `git clone https://github.com/flutter/flutter.git -b stable` |

**Installation (macOS):**
```bash
# Download and extract
cd ~/development
unzip flutter_macos_3.16.0-stable.zip

# Add to PATH
echo "export PATH=\$PATH:\$HOME/development/flutter/bin" >> ~/.zshrc
source ~/.zshrc

# Verify
flutter doctor
```

**Installation (Windows):**
1. Download Flutter SDK from https://docs.flutter.dev/get-started/install/windows
2. Extract to `C:\src\flutter`
3. Add `C:\src\flutter\bin` to User PATH environment variable
4. Run `flutter doctor` in Command Prompt

**Verify installation:**
```bash
flutter --version
flutter doctor
```

---

### Xcode

**Required for:** iOS development on macOS ([React Native](frontend/Stack-Underflow_reactNativeMobile), [Flutter](frontend/stack_underflow_flutter))

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://developer.apple.com/xcode/ | Download from Mac App Store (FREE) |

**Installation:**
1. Open **App Store** on macOS
2. Search for **Xcode**
3. Click **Get/Install**
4. Open Xcode and accept license agreement

**Command Line Tools:**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Accept license
sudo xcodebuild -license

# Verify
xcodebuild --version
```

**Verify installation:**
```bash
xcode-select --version
xcrun simctl list devices available
```

---

### Android Studio

**Required for:** Android development on all OS ([React Native](frontend/Stack-Underflow_reactNativeMobile), [Flutter](frontend/stack_underflow_flutter), [Cordova](frontend/stack-underflow_cordova))

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://developer.android.com/studio/archive | Download .dmg (Apple Silicon) or .dmg (Intel) |
| Windows | https://developer.android.com/studio/archive | Download .exe installer |
| Linux | https://developer.android.com/studio/archive | Download .tar.gz |

**Installation (macOS):**
```bash
# Download Android Studio
# https://developer.android.com/studio/install#mac

# Or using Homebrew
brew install --cask android-studio
```

**Installation (Windows):**
1. Download Android Studio installer from https://developer.android.com/studio/
2. Run the installer (.exe)
3. Follow the setup wizard
4. Make sure to install:
   - Android SDK
   - Android SDK Platform
   - Performance (Intel HAXM)
   - Android Virtual Device

**Environment Variables (Windows):**
```powershell
# Add to User Environment Variables
ANDROID_HOME = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
```

**Verify installation:**
```bash
# macOS/Linux
echo $ANDROID_HOME
ls $ANDROID_HOME

# Windows
echo %ANDROID_HOME%
dir %ANDROID_HOME%
```

---

### React Native CLI

**Required for:** [React Native Mobile App](frontend/Stack-Underflow_reactNativeMobile)

| OS | Installation |
|----|--------------|
| macOS | `npm install -g react-native-cli` or `brew install react-native-cli` |
| Windows | `npm install -g react-native-cli` |
| Linux | `npm install -g react-native-cli` |

**Additional setup for macOS:**
```bash
# Install CocoaPods
sudo gem install cocoapods

# Or using Homebrew
brew install cocoapods
```

**Verify installation:**
```bash
react-native --version
```

---

### Cordova CLI

**Required for:** [Apache Cordova Mobile App](frontend/stack-underflow_cordova)

| OS | Installation |
|----|--------------|
| All | `npm install -g cordova` |

**Platform-specific setup:**
```bash
# iOS (macOS only)
npm install -g ios-deploy
sudo npm install -g ios-sim

# Android (all platforms)
cordova platform add android
```

**Verify installation:**
```bash
cordova --version
```

---

### Expo CLI

**Alternative for:** [React Native with Expo](frontend/Stack-Underflow_reactNativeMobile)

| OS | Installation |
|----|--------------|
| All | `npm install -g expo-cli` |

**Verify installation:**
```bash
expo --version
```

---

## 🗄️ Database Prerequisites

### PostgreSQL

**Required for:** Go, Node.js, Python, .NET, Rust stacks

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://www.postgresql.org/download/macos/ | `brew install postgresql@15` or download Postgres.app |
| Windows | https://www.postgresql.org/download/windows/ | Download .exe installer |
| Linux | https://www.postgresql.org/download/linux/ | `sudo apt install postgresql postgresql-contrib` |

**Using Docker (Recommended):**
```bash
# Run PostgreSQL in container
docker run --name stackunderflow-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=stackunderflow \
  -p 5432:5432 \
  -d postgres

# Stop/Start container
docker stop stackunderflow-postgres
docker start stackunderflow-postgres
```

**Manual Installation (macOS):**
```bash
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb stackunderflow
```

**Verify installation:**
```bash
psql --version
psql -h localhost -U postgres -c '\l'
```

---

### MySQL

**Required for:** Laravel, Java Spring Boot stacks

| OS | Download Link | Installation |
|----|---------------|--------------|
| macOS | https://www.mysql.com/downloads/mysql/ | `brew install mysql@8.0` |
| Windows | https://dev.mysql.com/downloads/mysql/ | Download .msi installer |
| Linux | https://dev.mysql.com/downloads/repo/apt/ | `sudo apt install mysql-server` |

**Using Docker (Recommended):**
```bash
# Run MySQL in container
docker run --name stackunderflow-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=stackunderflow \
  -p 3306:3306 \
  -d mysql:8.0

# Stop/Start container
docker stop stackunderflow-mysql
docker start stackunderflow-mysql
```

**Verify installation:**
```bash
mysql --version
mysql -h localhost -u root -p -e "SHOW DATABASES;"
```

---

## 🛠️ Additional Tools

### Visual Studio Code (Recommended IDE)

| OS | Download Link |
|----|---------------|
| macOS | https://code.visualstudio.com/download |
| Windows | https://code.visualstudio.com/download |
| Linux | https://code.visualstudio.com/download |

**Recommended Extensions:**
- ESLint
- Prettier
- GitLens
- Docker
- Live Server
- Vetur (Vue)
- ESLint (TypeScript/React)

---

### Postman (API Testing)

| OS | Download Link |
|----|---------------|
| All | https://www.postman.com/downloads/ |

---

## 🚀 Quick Start

### Installation

#### Using the Root Makefile

```bash
# Show help
make help

# Install backend dependencies
make install/backend/go-gin-sqlx
make install/backend/node-express
make install/backend/python-fastapi
make install/backend/laravel
make install/backend/java-springbot
make install/backend/dot-net
make install/backend/rust

# Install frontend dependencies
make install/frontend/react
make install/frontend/vue
make install/frontend/angular
make install/frontend/nextjs
make install/frontend/svelte
make install/frontend/nuxt
make install/frontend/flutter
make install/frontend/react-native
make install/frontend/cordova
make install/frontend/livewire
make install/frontend/blade
```

#### Individual Stack Installation

**Go + Gin + SQLX:**
```bash
cd backend/go-gin-sqlx
make install
make run
```

**Node.js + Express + Prisma:**
```bash
cd backend/node-express
make install
make dev
```

**Python + FastAPI:**
```bash
cd backend/python-fastapi
make install
make dev
```

**PHP + Laravel:**
```bash
cd backend/laravel
make install
make dev
```

**Java + Spring Boot:**
```bash
cd backend/java-springbot
make install
make dev
```

**.NET 8:**
```bash
cd backend/dot-net
make install
make dev
```

**Rust:**
```bash
cd backend/rust
make install
make dev
```

**React:**
```bash
cd frontend/stack-underflow_react
make install
make dev
```

**Vue 3:**
```bash
cd frontend/stack-underflow_vue
make install
make dev     # Mock API (default)
make dev:fake  # Fake API with delays
make dev:api   # Real backend API
```

**Angular:**
```bash
cd frontend/stack-underflow_angular
make install
make dev  # Mock API (default)
make start:fake  # Fake API
make start:real  # Real backend API
```

**Next.js:**
```bash
cd frontend/stack-underflow-nextjs
make install
make dev
```

**Svelte:**
```bash
cd frontend/stack-underflow_svelte
make install
make dev
```

**Nuxt:**
```bash
cd frontend/stack-underflow-nuxt
make install
make dev
```

**Flutter:**
```bash
cd frontend/stack_underflow_flutter
make install
make dev  # Run on connected device/emulator
```

**React Native:**
```bash
cd frontend/Stack-Underflow_reactNativeMobile
make install
make ios      # iOS simulator
make android  # Android emulator
```

**Cordova:**
```bash
cd frontend/stack-underflow_cordova
make install
make dev  # Browser development
make build:android  # Build Android APK
make build:ios      # Build iOS
```

**Laravel Livewire:**
```bash
cd frontend/stack-underflow_livewire
make install
make dev
```

**Laravel Blade:**
```bash
cd frontend/stack-underflow_blade
make install
make dev
```

---

## 📁 Project Structure

```
TPConsulting/
├── Makefile                    # Root Makefile for all stacks
├── README.md                   # This file
│
├── backend/
│   ├── go-gin-sqlx/           # Go implementation
│   ├── node-express/           # Node.js implementation
│   ├── python-fastapi/         # Python implementation
│   ├── laravel/                # PHP/Laravel implementation
│   ├── java-springbot/         # Java implementation
│   ├── dot-net/                # .NET implementation
│   └── rust/                   # Rust implementation
│
└── frontend/
    ├── stack-underflow_react/           # React implementation
    ├── stack-underflow_vue/             # Vue 3 implementation
    ├── stack-underflow_angular/         # Angular implementation
    ├── stack-underflow-nextjs/          # Next.js implementation
    ├── stack-underflow_svelte/          # Svelte implementation
    ├── stack-underflow-nuxt/            # Nuxt implementation
    ├── stack_underflow_flutter/         # Flutter implementation
    ├── Stack-Underflow_reactNativeMobile/ # React Native implementation
    ├── stack-underflow_cordova/         # Cordova implementation
    ├── stack-underflow_livewire/        # Livewire implementation
    └── stack-underflow_blade/           # Blade implementation
```

---

## 📦 Building for Production

```bash
# Backend
cd backend/go-gin-sqlx && make build

# Frontend
cd frontend/stack-underflow_react && make build
```

---

## 🧪 Testing

Each stack has its own test commands:

```bash
# Run tests for a specific stack
cd backend/go-gin-sqlx && make test
cd frontend/stack-underflow_react && make test
```

---

## 🤝 Contributing

1. Choose a stack you want to work on
2. Create a new branch for your feature
3. Make your changes following the stack's coding conventions
4. Run tests and linters before submitting
5. Submit a pull request

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- Inspired by Stack Overflow
- Built with various modern technologies
- Thanks to all contributors
