# 🏗️ Arquitectura de Workspaces - Explicación Completa

## ¿Por qué hay un package.json en la raíz?

### Monorepo con npm Workspaces

El `package.json` raíz es el **coordinador** de los workspaces. Permite:

```json
{
  "name": "construye",
  "workspaces": ["client", "server"]
}
```

**Esto significa:**
- `npm install` en la raíz instala deps de AMBOS proyectos
- Cada carpeta (`client/`, `server/`) es independiente con su propio `package.json`
- Pueden tener tecnologías diferentes

### Estructura Real:

```
Construye/                      ← Monorepo coordinador
├── package.json               ← Define workspaces (NO es del proyecto)
│
├── server/                    ← PROYECTO 1 (Node.js/Hono)
│   ├── package.json          ← Dependencias del servidor
│   ├── src/
│   ├── prisma/
│   └── tsconfig.json
│
└── client/                    ← PROYECTO 2 (Vue.js/Vite)
    ├── package.json          ← Dependencias del cliente
    ├── src/
    ├── vite.config.ts
    └── tsconfig.json
```

**Importante:** El `package.json` raíz es SOLO para coordinar. Cuando deployes, **CADA proyecto se despliega por separado**.

---

## 🚀 Deployment Independiente

### Opción 1: Deployment Completamente Separado

```
Frontend (Cliente)              Backend (Servidor)
├── URL: vercel.app            ├── URL: railway.app
├── Desplegado en: Vercel       ├── Desplegado en: Railway/Azure
└── npm run build               └── npm run build
```

Para esto, **copia los carpetas** en repositorios separados:

```bash
# Repositorio 1: construye-backend
.
├── src/
├── prisma/
├── package.json
├── tsconfig.json
└── .env

# Repositorio 2: construye-frontend
.
├── src/
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

### Opción 2: Monorepo con Deployment Dual (RECOMENDADO)

Mantiene un solo repositorio pero con scripts que permiten deployment independiente:

**package.json raíz:**
```json
{
  "name": "construye",
  "workspaces": ["client", "server"],
  "scripts": {
    "install:all": "npm install",
    "dev": "npm run dev --workspaces",
    "build:server": "npm run build --workspace=server",
    "build:client": "npm run build --workspace=client",
    "build:all": "npm run build:server && npm run build:client"
  }
}
```

---

## 📦 Deployment por Plataforma

### 🌐 FRONTEND (Cliente Vue.js)

#### Opción A: Vercel (Recomendado para Vue/Vite)

1. **Crear repositorio en GitHub** con solo la carpeta `client/`
   ```bash
   git init
   cp -r ../Construye/client/* .
   ```

2. **Conectar en Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Click "New Project"
   - Seleccionar repo
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Variables de entorno:**
   ```
   VITE_API_URL=https://tu-api.app.com
   ```

#### Opción B: Netlify

1. **Crear repositorio GitHub** (solo `client/`)

2. **Conectar en Netlify:**
   - Ir a [netlify.com](https://netlify.com)
   - "New site from Git"
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Variables de entorno:**
   ```
   VITE_API_URL=https://tu-api.app.com
   ```

#### Opción C: Azure Static Web Apps

1. **Crear repositorio GitHub** (solo `client/`)

2. **En Azure Portal:**
   - Crear "Static Web Apps"
   - Conectar GitHub
   - Framework: **Vue**
   - Build Location: `/client`
   - App Location: `/client`
   - Output Location: `dist`

---

### 🔧 BACKEND (Servidor Node.js/Hono)

#### Opción A: Railway (Recomendado para Node)

1. **Crear repositorio GitHub** con solo `server/`
   ```bash
   git init
   cp -r ../Construye/server/* .
   ```

2. **En Railway.app:**
   - Click "New Project"
   - Conectar GitHub repo
   - Auto-detecta Node.js
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Variables de entorno:**
   ```
   DATABASE_URL=mysql://...
   PORT=3000
   ```

#### Opción B: Azure App Service

1. **Crear repositorio GitHub** (solo `server/`)

2. **En Azure Portal:**
   - Crear "App Service"
   - Runtime: **Node.js 18 LTS**
   - Conectar GitHub
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Environment Variables (Configuración):**
   ```
   DATABASE_URL
   PORT (Opcional, Azure asigna auto)
   ```

#### Opción C: Render.com

1. **Crear repositorio GitHub** (solo `server/`)

2. **En Render.com:**
   - Click "New Web Service"
   - Conectar GitHub
   - Runtime: **Node**
   - Build Command: `npm run build`
   - Start Command: `npm start`

---

## 🔄 Workflow Recomendado

### 1️⃣ Desarrollo Local (Todo en un repo)

```bash
# Clonar monorepo
git clone https://github.com/tu-usuario/construye.git
cd construye

# Instalar todo
npm install

# Ejecutar ambos (en terminales separadas)
npm run dev:server
npm run dev:client
```

### 2️⃣ Preparar para Production

```bash
# Compilar ambos
npm run build:all

# Testear builds
npm run preview:server
npm run preview:client
```

### 3️⃣ Deployment Separado

**Opción A: Dos repositorios (Lo más simple)**

```bash
# Crear repo para backend
mkdir construye-backend
cp -r server/* construye-backend/
cd construye-backend
git init && git add . && git commit -m "Init"
git push origin main

# Crear repo para frontend
mkdir construye-frontend
cp -r client/* construye-frontend/
cd construye-frontend
git init && git add . && git commit -m "Init"
git push origin main

# Desplegar cada uno independientemente
# Backend → Railway/Azure
# Frontend → Vercel/Netlify
```

**Opción B: Un repo con workflows (Más avanzado)**

Usar GitHub Actions para deployar automáticamente:

```yaml
# .github/workflows/deploy-server.yml
name: Deploy Server

on:
  push:
    branches: [main]
    paths:
      - 'server/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          cd server
          npm install
          npm run build
          # Deploy command específico
```

---

## 📋 Resumen de Opciones

| Componente | Plataforma | Ventajas | Costo |
|-----------|-----------|----------|-------|
| **Frontend** | Vercel | Optimizado para Vite, deploy automático | Free |
| **Frontend** | Netlify | UI intuitiva, buena comunidad | Free |
| **Frontend** | Azure Static Web Apps | Integración Azure, CDN global | Free |
| **Backend** | Railway | Simple, buena DX, MySQL incluido | $5/mes |
| **Backend** | Azure App Service | Escalable, bases de datos integradas | $10+/mes |
| **Backend** | Render | Gratis con limitaciones | Free/$7 |

---

## ✅ Flujo de Variables de Entorno

```
Local (.env)
    ↓
├─ Backend: DATABASE_URL, PORT
└─ Frontend: VITE_API_URL

Production
    ↓
├─ Backend (Railway): DATABASE_URL, PORT (env vars)
└─ Frontend (Vercel): VITE_API_URL (env vars)
    └─ Debe apuntar a: https://api.tu-backend.com
```

---

## 🔗 Conexión Frontend ↔ Backend

### En Desarrollo:
```typescript
// client/src/utils/api.ts
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000';
```

### En Production:
```
Frontend: https://construye.vercel.app
Backend: https://construye-api.railway.app

VITE_API_URL=https://construye-api.railway.app
```

---

## 🎯 Mi Recomendación

Para tu caso específico, sugiero:

### Opción Recomendada: Monorepo en GitHub + Deployment Dual

```
GitHub Repo: construye (principal)
    ├── server/  → Deploy en Railway.app (Node.js)
    └── client/  → Deploy en Vercel.app (Vue.js)
```

**Ventajas:**
- ✅ Un solo repositorio para mantener
- ✅ Deployment automático en cada push
- ✅ Fácil de versionar juntos
- ✅ Separados completamente en deploy
- ✅ Bajo costo (ambos tienen free tier)

**Pasos:**

1. Mantener estructura actual (monorepo)
2. Conectar repo a GitHub
3. En Railway: conectar solo carpeta `server/`
4. En Vercel: conectar solo carpeta `client/`
5. Variables de entorno en cada plataforma
6. Done! Cada push deploya automáticamente

---

**¿Cuál opción prefieres?** Puedo preparar los archivos de configuración.
