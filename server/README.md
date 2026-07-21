# 🚀 Construye - Backend API

Backend for the **Construye** platform built with **Hono**, **Prisma**, and **MySQL**.

## 📋 Features

- ✅ Lightweight HTTP framework (Hono)
- ✅ Modern ORM (Prisma)
- ✅ MySQL support
- ✅ TypeScript
- ✅ CORS enabled
- ✅ Prompt-building engine for LLMs

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Database Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `DATABASE_URL` in `.env` with your MySQL credentials

3. Generate the Prisma client:
```bash
npm run prisma:generate
```

4. (Optional) Run migrations:
```bash
npm run prisma:migrate
```

### Development

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📡 API Routes (Phase 1)

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "ok",
  "message": "Servidor Construye API funcionando"
}
```

### Phase 1 Assistant
```
POST /api/v1/phase1/assistant
```

**Body:**
```json
{
  "specialty": "plumbing|masonry|electrical",
  "distance": 10,
  "gauge": "1/2\"",
  "cornerCount": 0,
  "connectionCount": 2
}
```

**Successful Response (200):**
```json
{
  "specialty": "plumbing",
  "parts": [
    {
      "name": "PVC Pipe",
      "quantity": 3,
      "gauge": "1/2\"",
      "unit": "meters"
    }
  ],
  "instructions": "1. Verify system pressure...",
  "conceptualDiagram": "...",
  "nextPhases": "..."
}
```

**Error Response (400):**
```json
{
  "error": "Invalid specialty. Expected: plumbing, masonry, or electrical"
}
```

## 🗄️ Database

See `prisma/schema.prisma` for the full model definition.

### Models
- **Category**: Technical specialties
- **Part**: Materials/components
- **Vendor**: Stores/suppliers
- **Inventory**: Stock and pricing

## 🛠️ Available Scripts

- `npm run dev`: Start the server in development mode with hot-reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start the compiled server in production mode
- `npm run prisma:generate`: Generate the Prisma client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open the Prisma GUI

## 🏗️ Folder Structure

```
src/
└── index.ts          # Servidor principal y rutas
prisma/
├── schema.prisma    # Modelos de base de datos
└── migrations/      # Historial de migraciones (generado)
```

## 📚 Recursos

- [Hono documentation](https://hono.dev)
- [Prisma documentation](https://www.prisma.io/docs)
- [MySQL documentation](https://dev.mysql.com/doc/)

## 🔄 Next Steps (Phase 2)

- [ ] Real LLM integration
- [ ] Inventory query endpoints
- [ ] Budget calculation
- [ ] Authentication and authorization
- [ ] Geolocation

---

**Last updated:** July 2026
