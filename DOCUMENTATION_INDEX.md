# 📚 Índice de Documentación - Construye

## 🎯 ¿Por dónde empiezo?

### 1️⃣ Si es tu PRIMERA VEZ

Lee en este orden:

1. **[QUICK_START.md](./QUICK_START.md)** (5 min)
   - Instalación en 5 pasos
   - Verificar que todo funciona localmente
   - ¿Qué ves en pantalla?

2. **[README.md](./README.md)** (10 min)
   - Descripción general del proyecto
   - Stack tecnológico
   - Estructura de carpetas

3. **[DEVELOPMENT.md](./DEVELOPMENT.md)** (5 min)
   - Cómo ejecutar backend + frontend
   - Variables de entorno
   - Próximos pasos

---

### 2️⃣ Si quieres ENTENDER LA ARQUITECTURA

Lee:

1. **[MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md)** ⭐ (TÚ PREGUNTASTE ESTO)
   - ¿Por qué hay package.json en la raíz?
   - Cómo funciona npm workspaces
   - Diferencia entre desarrollo y deployment
   - Diagramas visuales

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** (15 min)
   - Diagrama del flujo de datos
   - Cómo se comunican frontend ↔ backend
   - Modelos de base de datos (Prisma)
   - Stack tecnológico explicado

---

### 3️⃣ Si quieres DESPLEGAR A PRODUCCIÓN

Lee en orden:

1. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** ⭐ COMIENZA AQUÍ (15 min)
   - Matriz de decisión (¿Cuál opción elegir?)
   - Comparativa de costos
   - **MI RECOMENDACIÓN:** Vercel + Railway
   - Checklist de deployment

2. **Luego, ELIGE UNO:**
   - **[DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)** - Frontend en Vercel
   - **[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)** - Frontend en Netlify
   - **[DEPLOY_RAILWAY.md](./DEPLOY_RAILWAY.md)** - Backend en Railway
   - **[DEPLOY_AZURE.md](./DEPLOY_AZURE.md)** - Todo en Azure

---

### 4️⃣ DOCUMENTACIÓN ESPECÍFICA DE CADA CARPETA

- **[server/README.md](./server/README.md)** - Backend (Hono + Prisma)
  - Rutas de API
  - Base de datos
  - Variables de entorno
  - Scripts disponibles

- **[client/README.md](./client/README.md)** - Frontend (Vue 3 + Vite)
  - Componentes
  - Llamadas HTTP
  - Estilos (W3.CSS)
  - Troubleshooting

---

## 📖 Referencia Rápida

### Archivos del Proyecto

```
Construye/
│
├── README.md                      ← EMPEZAR AQUÍ (descripción general)
├── QUICK_START.md                 ← Instalación 5 min
├── DEVELOPMENT.md                 ← Cómo desarrollar
├── ARCHITECTURE.md                ← Diagramas técnicos
├── MONOREPO_EXPLAINED.md          ← TÚ PREGUNTASTE ESTO ⭐
│
├── DEPLOYMENT.md                  ← Estrategias de deployment
├── DEPLOYMENT_GUIDE.md            ← COMIENZA AQUÍ para deployment
├── DEPLOY_VERCEL.md               ← Frontend en Vercel
├── DEPLOY_NETLIFY.md              ← Frontend en Netlify
├── DEPLOY_RAILWAY.md              ← Backend en Railway
├── DEPLOY_AZURE.md                ← Todo en Azure
│
├── SCRIPTS.md                     ← Scripts de npm disponibles
├── DOCUMENTATION_INDEX.md         ← Este archivo
│
├── server/
│   ├── README.md                  ← Docs del servidor
│   ├── package.json
│   ├── src/index.ts
│   └── prisma/schema.prisma
│
└── client/
    ├── README.md                  ← Docs del cliente
    ├── package.json
    ├── src/App.vue
    └── vite.config.ts
```

---

## 🎯 Preguntas Frecuentes

### "¿Por qué hay dos package.json?"

→ Lee **[MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md)**

Respuesta corta: Es monorepo en desarrollo, pero se separan completamente en deployment.

---

### "¿Cómo separo los proyectos para desplegar?"

→ Lee **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** + **[MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md)**

Respuesta corta: Cada plataforma (Vercel, Railway) toma solo su carpeta automáticamente.

---

### "¿Cuál es la mejor forma de desplegar?"

→ Lee **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

**Mi recomendación:** Vercel (frontend) + Railway (backend)
- ✅ Simple (10 min setup)
- ✅ Gratis con limits generosos
- ✅ Auto-deploy con git push
- 💰 ~$12/mes después (vs $38 en Azure)

---

### "¿Cómo funcionan los workspaces de npm?"

→ Lee **[MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md)**

Respuesta corta: El package.json raíz coordina las dependencias de ambas carpetas.

---

### "¿Cómo conecto frontend con backend?"

→ Lee **[ARCHITECTURE.md](./ARCHITECTURE.md)** → Sección "Flujo de Datos"

Respuesta corta: Variable de entorno `VITE_API_URL` apunta a la URL del backend.

---

### "¿Qué pasa cuando hago `git push`?"

→ Lee **[MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md)** → Sección "Auto-deployment"

Respuesta corta:
1. GitHub recibe cambios
2. Railway redeploy de `server/`
3. Vercel rebuild de `client/`
4. Todo se actualiza en ~2 minutos

---

## 🏃 Inicio Rápido (TL;DR)

```bash
# 1. Instalar
npm install

# 2. Desarrollar (2 terminales)
npm run dev:server  # Terminal 1
npm run dev:client  # Terminal 2

# 3. Desplegar (cuando estés listo)
# Lee DEPLOYMENT_GUIDE.md primero

# 4. Elegir plataforma
# Recomendación: Vercel + Railway
# Lee DEPLOY_VERCEL.md + DEPLOY_RAILWAY.md
```

---

## 📚 Tabla Rápida de Contenidos

| Documento | Duración | Para Quién |
|-----------|----------|-----------|
| **QUICK_START.md** | 5 min | Quiero empezar YA |
| **README.md** | 10 min | Quiero entender qué es |
| **MONOREPO_EXPLAINED.md** | 15 min | Quiero entender la arquitectura |
| **ARCHITECTURE.md** | 15 min | Quiero saber cómo funciona todo |
| **DEPLOYMENT_GUIDE.md** | 10 min | Quiero elegir dónde desplegar |
| **DEPLOY_VERCEL.md** | 10 min | Voy a desplegar en Vercel |
| **DEPLOY_RAILWAY.md** | 10 min | Voy a desplegar en Railway |
| **DEPLOY_AZURE.md** | 15 min | Voy a desplegar en Azure |

---

## 🎓 Curva de Aprendizaje

```
Horas      Documentación
─────────────────────────────────────────
0 min      QUICK_START.md ← EMPEZAR
│          
5 min      ↓ npm install & run
│          
10 min     README.md
│          
20 min     DEVELOPMENT.md
│          
30 min     ↓ Entiendo el proyecto
│          
40 min     MONOREPO_EXPLAINED.md
│          ↓ Entiendo separación
50 min     
│          
60 min     ARCHITECTURE.md ← Ahora eres expert
│          DEPLOYMENT_GUIDE.md
│          
120 min    DEPLOY_*.md (elige uno)
│          ↓ Desplegado a producción
│          
...        ¡Desarrollando Fase 2! 🚀
```

---

## 💡 Pro Tips

1. **Usa Ctrl+F (Find)** en los archivos para buscar palabras clave
2. **Copia los comandos exactamente** como aparecen
3. **Sigue los checklists** paso a paso
4. **Verifica cada comando** localmente antes de desplegar
5. **Guarda este índice** en tu navegador para referencia rápida

---

## 🚀 Próximos Pasos

### Hoy (Fase 1)
- [x] Instalación y setup
- [x] Entender arquitectura
- [x] Correr localmente
- [ ] **(TÚ ESTÁS AQUÍ)** Decidir estrategia de deployment

### Mañana (Fase 2)
- [ ] Integración con base de datos real
- [ ] Búsqueda de inventario
- [ ] Cálculo de presupuesto

### Luego (Fase 3)
- [ ] Autenticación de usuarios
- [ ] Geolocalización de tiendas
- [ ] Sistema de checkout

---

**¿Perdido?** Empieza con [QUICK_START.md](./QUICK_START.md) 🚀

**¿Necesitas responder tu pregunta sobre workspaces?** Lee [MONOREPO_EXPLAINED.md](./MONOREPO_EXPLAINED.md) ⭐
