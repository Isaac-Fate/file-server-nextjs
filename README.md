# Simple File Server with Next.js

A simple file server with API access, containerized for easy deployment.

## Features

- 🐳 Docker-ready with multi-platform support
- 🔐 API key authentication
- 📁 File browsing and downloading
- 📦 Pre-built images available on Docker Hub

## Installation

### Option 1: Build from Source

```bash
git clone https://github.com/Isaac-Fate/file-server-nextjs.git
git checkout v0.1.0
cp .env.example .env.production
cp docker-compose.example.yml docker-compose.yml
```

Edit both files with your configuration, then:
```bash
docker-compose up -d
```

### Option 2: Use Pre-Built Image

Modify `docker-compose.yml`:
```yaml
services:
  app:
    image: isaacfei/file-server-nextjs:0.1.0
    # Keep other configurations
```

Then run:
```bash
docker-compose up -d
```

## API Reference

### Authentication
Include in headers:
```http
Authorization: Bearer <API_KEY>
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/files?path=<DIR>` | List directory contents |
| `GET`  | `/api/download/<PATH>` | Download a file |

## Examples

**Directory Structure:**
```
data/
├── hello.txt
└── logs/
    └── abc.log
```

**List root directory:**
```http
GET /api/files HTTP/1.1
Host: localhost:3000
```

**List logs directory:**
```http
GET /api/files?path=logs HTTP/1.1
Host: localhost:3000
```

**Download a file:**
```http
GET /api/download/logs/abc.log HTTP/1.1
Host: localhost:3000
```

## Configuration

Required environment variables (set in `.env.production`):

```ini
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret
FILE_STORAGE_ROOT_DIR=/app/file-storage
```

