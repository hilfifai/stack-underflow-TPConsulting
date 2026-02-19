# 🧠 Backend API

A clean, modular backend API built with **Go**, using the **Gin** framework and **SQLX** ORM. The project follows layered architecture (Handler → Service → Repository)

---

## 🧬 Project Structure

```bash
.
├── cmd/                      # App entrypoint
│   └── api/
│       ├── docs/             # Swagger auto-generated docs
│       └── main.go           # Application bootstrap
├── internal/
│   ├── config/               # Config loader
│   ├── common/               # Enums & common types
│   ├── entity/               # Database models
│   ├── dto/                  # Request & response DTOs
│   ├── handler/              # Route handlers
│   ├── service/              # Business logic layer
│   ├── repository/           # Repository
│   ├── pkg/                  # Helper & utility packages
│   └── server/               # HTTP server setup
├── go.mod
├── go.sum
├── .env.example              # Environment variable example
├── Makefile
└── README.md
```


## Getting Started

```bash
make install
make docs # for build doc swagger
make run_api
```