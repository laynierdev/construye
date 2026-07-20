# 🏗️ Arquitectura de Monorepo vs Deployment

## El Problema que Tenías Razón

Dijiste: "¿Por qué hay un package.json afuera si deberían ser dos proyectos independientes?"

**Respuesta:** En **desarrollo local**, es conveniente un monorepo. En **deployment**, se separan completamente.

---

## Diagrama: Desarrollo vs Production

```
═══════════════════════════════════════════════════════════════════════

                    DESARROLLO LOCAL
                    
   Construye/  (npm workspaces coordinator)
   │
   ├── package.json     ← "npm install" instala AMBOS
   │   {
   │     "workspaces": ["client", "server"]
   │   }
   │
   ├── server/
   │   ├── package.json (dependencias del server)
   │   ├── src/
   │   └── prisma/
   │
   └── client/
       ├── package.json (dependencias del client)
       ├── src/
       └── vite.config.ts
       
   Terminal 1:  cd server && npm run dev
   Terminal 2:  cd client && npm run dev
   
   Resultado: http://localhost:5173 ← Frontend
              http://localhost:3000  ← Backend

═══════════════════════════════════════════════════════════════════════

                    PRODUCTION (Deployment)
                    
   GitHub Repo Único → construye (monorepo)
   
   ┌─────────────────────────────┐
   │  GitHub Push a rama main    │
   │  (contiene: server/ client/) │
   └──────────┬──────────────────┘
              │
              ├─────────────────────────────────┬──────────────────────────────┐
              │                                 │                              │
              ▼                                 ▼                              ▼
    
   ┌──────────────────┐         ┌──────────────────┐       ┌──────────────────┐
   │   Vercel.app     │         │   Railway.app    │       │   Netlify.app    │
   │                  │         │                  │       │                  │
   │  Deploys:        │         │  Deploys:        │       │  Deploys:        │
   │  ✓ client/       │         │  ✓ server/       │       │  ✓ client/       │
   │  ✓ SOLO Frontend │         │  ✓ SOLO Backend  │       │  ✓ SOLO Frontend │
   │                  │         │  ✓ + MySQL       │       │                  │
   │  URL:            │         │  URL:            │       │  URL:            │
   │  construye-web   │         │  construye-api   │       │  construye-web   │
   │  .vercel.app     │         │  .railway.app    │       │  .netlify.app    │
   │                  │         │                  │       │                  │
   │  NODE_ENV:       │         │  NODE_ENV:       │       │  NODE_ENV:       │
   │  production      │         │  production      │       │  production      │
   └──────────────────┘         └──────────────────┘       └──────────────────┘
              │                         │                         │
              │ env: VITE_API_URL       │ env: DATABASE_URL       │ env: VITE_API_URL
              │ = https://api.rail...  │ = mysql://...           │ = https://api.rail...
              │                         │                         │
              └─────────────┬───────────┴───────────┬─────────────┘
                            │                       │
                            └───────────┬───────────┘
                                        │
                          Ambos se comunican
                          entre ellos vía APIs
                          
═══════════════════════════════════════════════════════════════════════
```

---

## 🔀 Cómo Funciona el Monorepo

### Estructura de Carpetas

```
construye/
│
├── package.json                          ← COORDINADOR de workspaces
│   {
│     "workspaces": ["client", "server"]
│   }
│
├── server/
│   ├── package.json                      ← INDEPENDIENTE
│   │   {
│   │     "dependencies": { "hono": "...", "@prisma/client": "..." }
│   │   }
│   ├── src/index.ts
│   ├── prisma/schema.prisma
│   └── tsconfig.json
│
└── client/
    ├── package.json                      ← INDEPENDIENTE
    │   {
    │     "dependencies": { "vue": "...", "vite": "..." }
    │   }
    ├── src/App.vue
    ├── vite.config.ts
    └── tsconfig.json
```

### El `npm install` en la Raíz

```bash
cd construye
npm install

# Esto hace:
1. Lee package.json raíz → ve "workspaces": ["client", "server"]
2. Instala node_modules en client/ (dependencias Vue)
3. Instala node_modules en server/ (dependencias Hono/Prisma)
4. Crea carpeta global node_modules en raíz (para herramientas compartidas si las hay)

# Resultado:
construye/
├── node_modules/          ← Opcional, usado si hay herramientas compartidas
├── client/
│   └── node_modules/      ← Dependencias específicas de Vue
├── server/
│   └── node_modules/      ← Dependencias específicas de Hono
```

### Ejecutar Ambos Proyectos

```bash
# Opción 1: En dos terminales separadas
Terminal 1:  npm run dev:server  # Ejecuta "npm run dev" en server/
Terminal 2:  npm run dev:client  # Ejecuta "npm run dev" en client/

# Opción 2: Ambos a la vez (pero output mezclado)
npm run dev              # Ejecuta "npm run dev" en AMBAS carpetas
```

---

## 🚀 Deployment Independiente - Paso a Paso

### Escenario: Desplegar en Vercel + Railway

#### PASO 1: Subir a GitHub (Un solo repositorio)

```bash
git init
git add .
git commit -m "Initial commit - Construye Phase 1"
git remote add origin https://github.com/tu-usuario/construye
git push -u origin main

# GitHub ahora tiene:
construye/
├── server/
├── client/
├── package.json
└── ...
```

#### PASO 2: Configurar Backend en Railway

1. Ir a [railway.app](https://railway.app)
2. Crear nuevo proyecto
3. Conectar GitHub repo `construye`
4. Railway automáticamente detecta Node.js
5. **Configurar "Root Directory":** `server/`
6. **Build Command:** `npm run build`
7. **Start Command:** `npm start`

**Resultado:** Railway clona SOLO la carpeta `server/`, instala dependencias, y corre

```bash
# Lo que Railway hace internamente:
git clone https://github.com/tu-usuario/construye
cd construye/server
npm install
npm run build
npm start  # Escucha en https://construye-api.railway.app
```

#### PASO 3: Configurar Frontend en Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Crear nuevo proyecto
3. Conectar GitHub repo `construye`
4. Vercel automáticamente detecta Vite + Vue
5. **Configurar "Root Directory":** `client/`
6. **Build Command:** `npm run build`
7. **Output Directory:** `dist`
8. **Environment Variable:** `VITE_API_URL=https://construye-api.railway.app`

**Resultado:** Vercel clona SOLO la carpeta `client/`, instala dependencias, y compila

```bash
# Lo que Vercel hace internamente:
git clone https://github.com/tu-usuario/construye
cd construye/client
npm install
npm run build      # Genera dist/
# Sube dist/ a CDN global

# Resultado: https://construye-web.vercel.app
```

#### PASO 4: Auto-deployment en cada Push

```bash
# Haces cambios en el código
git add .
git commit -m "Fix bug en API"
git push origin main

# Automáticamente:
# 1. GitHub recibe el push
# 2. Railway webhook disparado → redeploy server/
# 3. Vercel webhook disparado → rebuild+deploy client/
# 4. En 2 minutos, ambos están actualizados en production
```

---

## 📦 Alternativa: Dos Repositorios Completamente Separados

Si prefieres total independencia (no usar monorepo):

```bash
# Opción A: Separar repositorios desde GitHub

Repositorio 1: construye-server
├── src/
├── prisma/
├── package.json
├── tsconfig.json
└── README.md

Repositorio 2: construye-client
├── src/
├── public/
├── package.json
├── vite.config.ts
└── README.md

# Deployar:
# - construye-server → Railway/Azure
# - construye-client → Vercel/Netlify

# Ventaja: Total independencia
# Desventaja: Duplicación de código, difícil sincronizar versiones
```

---

## 🎯 Conclusión

### ¿Monorepo o Separados?

**MONOREPO (Lo que hicimos) es MEJOR porque:**

✅ Una sola fuente de verdad (un repo)
✅ Fácil versionar en conjunto
✅ Cambios sincronizados
✅ Documentación centralizada
✅ Mismo flujo de desarrollo
❌ Deployment "ligeramente" más complejo (pero sigue siendo simple)

**SEPARADOS es mejor si:**

✅ Equipos completamente independientes
✅ Ciclos de release diferentes
✅ Tecnologías radicalmente diferentes
❌ Difícil mantener sincronización
❌ Duplicación de código

---

## 📊 Ejemplo Real: Tu Flujo Diario

### Desarrollo Local

```bash
# Día 1: Clonar proyecto
git clone https://github.com/tu-usuario/construye
cd construye
npm install  # ← Instala AMBOS (client + server)

# Abrir 2 terminales:
Terminal 1:  npm run dev:server  # Escucha en :3000
Terminal 2:  npm run dev:client  # Abre http://localhost:5173

# Editar código en VS Code
# Los cambios se reflejan en tiempo real en ambos

# Día 1: Hacer push cuando terminas
git add .
git commit -m "Add feature X"
git push origin main

# Automáticamente en < 2 minutos:
# - Railway redeploy de server/ (https://...-api.railway.app)
# - Vercel rebuild de client/ (https://...-web.vercel.app)
```

---

**¿Preguntas?** Ahora entiendes cómo:

1. ✅ Monorepo se usa en desarrollo
2. ✅ Se separa completamente en deployment
3. ✅ Cada plataforma toma solo su carpeta
4. ✅ Auto-deploy con cada push

¡Esto es lo mejor de ambos mundos! 🚀
