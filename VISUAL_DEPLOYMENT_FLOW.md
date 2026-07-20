# 🎨 VISUAL: Cómo Tu Monorepo se Despliega en Diferentes Plataformas

## Tu Pregunta

> "¿Una cosa quizás en Vercel y la otra en Netlify o en un App Service de Azure cómo los separo?"

## La Respuesta Visual

### Escenario Recomendado: Vercel + Railway

```
┌─────────────────────────────────────────────────────────────────┐
│                       TU COMPUTADORA                             │
│                       (Desarrollo)                               │
│                                                                   │
│  Carpeta: c:\Users\admin\Documents\Proyectos\Construye\         │
│  │                                                               │
│  ├── package.json ← npm install                                 │
│  ├── server/      ← npm run dev:server                          │
│  │   └── :3000                                                   │
│  └── client/      ← npm run dev:client                          │
│      └── :5173                                                   │
│                                                                   │
│  Browser: http://localhost:5173                                 │
│           ↓ conecta a ↓                                         │
│           http://localhost:3000                                 │
└─────────────────────────────────────────────────────────────────┘
                             │
                   git push origin main
                             │
┌────────────────────────────┴──────────────────────────────────┐
│                       GITHUB                                  │
│          Repository: construye (monorepo)                    │
│          Branch: main                                        │
│          │                                                  │
│          ├── client/                                        │
│          ├── server/                                        │
│          └── package.json                                   │
└────────┬─────────────────────────────┬──────────────────────┘
         │                             │
         │ Webhook                     │ Webhook
         │                             │
         ▼                             ▼
┌─────────────────┐         ┌──────────────────┐
│    VERCEL.COM   │         │  RAILWAY.APP     │
│                 │         │                  │
│ 1. Clone repo   │         │ 1. Clone repo    │
│ 2. cd client/   │         │ 2. cd server/    │
│ 3. npm install  │         │ 3. npm install   │
│ 4. npm build    │         │ 4. npm build     │
│ 5. Upload dist/ │         │ 5. npm start     │
│                 │         │                  │
│ Frontend Only   │         │ Backend Only     │
│ ✓ Vue.js        │         │ ✓ Node.js/Hono   │
│ ✓ Vite          │         │ ✓ Prisma/MySQL   │
│ ✗ Hono          │         │ ✗ Vue.js         │
│ ✗ Prisma        │         │ ✗ Vite           │
│                 │         │                  │
│ Env: VITE_API   │         │ Env: DATABASE    │
│ _URL=...-api    │         │ _URL + PORT      │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
         │                           │
         │ HTTPS                     │ HTTPS
         │                           │
         ▼                           ▼
   🌍 INTERNET                  🌍 INTERNET
   │                            │
   └─────────┬──────────────────┘
             │
      ┌──────▼──────┐
      │   USER      │
      │  Browser    │
      └──────┬──────┘
             │
      https://construye.vercel.app (Frontend)
             │
             ├─→ Carga HTML/CSS/JS
             │
             └─→ XHR a https://construye-api.railway.app
                 (Obtiene datos)
```

---

## Alternativa: Vercel + Azure

```
┌─────────────────────────────────────────────────────────────────┐
│                       TU COMPUTADORA                             │
│                       (Desarrollo)                               │
│                                                                   │
│  npm run dev:server  │  npm run dev:client                       │
│       :3000          │         :5173                             │
└─────────────────────────────────────────────────────────────────┘
                             │
                   git push origin main
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                       GITHUB                                    │
│          Repository: construye (monorepo)                       │
└────────┬─────────────────────────────┬──────────────────────────┘
         │                             │
         ▼                             ▼
┌─────────────────────┐      ┌──────────────────────────┐
│     VERCEL.COM      │      │    AZURE PORTAL          │
│                     │      │                          │
│  Frontend           │      │  ┌────────────────────┐  │
│  (client/)          │      │  │  Static Web App    │  │
│                     │      │  │  (client/)         │  │
│  https://...        │      │  │                    │  │
│  .vercel.app        │      │  │ + App Service      │  │
│                     │      │  │   (server/)        │  │
│                     │      │  │                    │  │
│                     │      │  │ + MySQL Database   │  │
│                     │      │  └────────────────────┘  │
│                     │      │                          │
│                     │      │  https://...-api         │
│                     │      │  .azurewebsites.net      │
└─────────────────────┘      └──────────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    │
              🌐 INTERNET
                    │
              ┌─────▼─────┐
              │   USUARIO │
              └─────┬─────┘
                    │
          https://construye.vercel.app
              ↓ XHR ↓
          https://...azurewebsites.net/api
```

---

## Alternativa: Todo en Azure

```
┌─────────────────────────────────────────────────────────────────┐
│                       TU COMPUTADORA                             │
│                       (Desarrollo)                               │
│                                                                   │
│  npm run dev:server  │  npm run dev:client                       │
│       :3000          │         :5173                             │
└─────────────────────────────────────────────────────────────────┘
                             │
                   git push origin main
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                       GITHUB                                    │
│          Repository: construye (monorepo)                       │
└────────┬─────────────────────────────┬──────────────────────────┘
         │                             │
         ▼                             ▼
   ┌─────────────────────────────────────────────────┐
   │          MICROSOFT AZURE PORTAL                  │
   │                                                   │
   │  Proyecto: construye-rg                          │
   │  │                                               │
   │  ├── Static Web Apps (frontend)                 │
   │  │   ├── client/                                │
   │  │   └── https://construye.azurewebsites.net    │
   │  │                                               │
   │  ├── App Service (backend)                      │
   │  │   ├── server/                                │
   │  │   └── https://construye-api.azurewebsites... │
   │  │                                               │
   │  └── Azure Database for MySQL                   │
   │      └── construye_db                           │
   │                                                   │
   │  TODO BAJO UN SOLO PANEL                        │
   └─────────────────────────────────────────────────┘
         │
         └──→ 🌐 INTERNET
              │
         ┌────▼────┐
         │ USUARIO │
         └────┬────┘
              │
         https://construye.azurewebsites.net
```

---

## Comparativa Visual: Costos

```
┌─────────────────────────────────────────────────────────────────┐
│              OPCIÓN 1: Vercel + Railway ⭐ RECOMENDADO           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  💰 GRATIS            💰 $5/mes          💰 GRATIS              │
│  ┌───────────┐       ┌────────┐         ┌────────┐             │
│  │   Vercel  │       │Railway │         │Railway │             │
│  │ Frontend  │       │Backend │         │MySQL   │             │
│  └───────────┘       └────────┘         └────────┘             │
│                                                                   │
│                    TOTAL: ~$5-12/mes                             │
│                    ✅ Incluye: 1000 deploys/mes                │
│                    ✅ Incluye: API automático                   │
│                    ✅ Incluye: Bases de datos MySQL             │
│                    ✅ Setup: 10 minutos                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              OPCIÓN 2: Vercel + Netlify                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  💰 GRATIS            💰 GRATIS                                  │
│  ┌───────────┐       ┌────────┐                                 │
│  │   Vercel  │       │Netlify │                                 │
│  │ Frontend  │       │Frontend│  ← NO, se duplica              │
│  └───────────┘       └────────┘                                 │
│                                                                   │
│  ❌ ¿Y el Backend? Necesitas Railway igual = +$5/mes            │
│  ❌ Confuso tener frontend en 2 plataformas                     │
│                                                                   │
│                    TOTAL: ~$5-12/mes (+ confusión)              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              OPCIÓN 3: Todo en Azure                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  💰 GRATIS 12 MESES   💰 $13/mes         💰 $25-50/mes          │
│  ┌─────────┐         ┌──────────┐       ┌──────────┐           │
│  │ Trial   │         │App Srv   │       │  MySQL   │           │
│  │Azure    │         │Backend   │       │Database  │           │
│  └─────────┘         └──────────┘       └──────────┘           │
│                                                                   │
│                    TOTAL: GRATIS ahora, ~$38/mes después        │
│                    ✅ Integración Microsoft                     │
│                    ✅ 12 meses sin pagar                        │
│                    ❌ Más caro después                          │
│                    ❌ Setup más complejo                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Flow Actual (Lo que Ya Funciona)

```
┌──────────────────────────────────────────────────────────────┐
│ Tu Carpeta: c:\Users\admin\Documents\Proyectos\Construye     │
│                                                              │
│ npm install  → Instala AMBOS (monorepo)                      │
│                                                              │
│ Terminal 1:  npm run dev:server → http://localhost:3000     │
│ Terminal 2:  npm run dev:client → http://localhost:5173     │
│                                                              │
│ Navegador:   http://localhost:5173                          │
│              ↓ XHR ↓                                        │
│              http://localhost:3000/api/v1/...               │
│                                                              │
│ ✅ Funciona perfectamente en local                          │
└──────────────────────────────────────────────────────────────┘

                          ↓↓↓ CUANDO ESTÉS LISTO ↓↓↓

┌──────────────────────────────────────────────────────────────┐
│ DEPLOYMENT (Sin cambios en tu código)                        │
│                                                              │
│ 1. git push origin main                                     │
│                                                              │
│ 2. Vercel automáticamente:                                  │
│    - Detecta cambios en client/                             │
│    - npm run build en client/                               │
│    - Publica dist/ en: https://construye.vercel.app         │
│                                                              │
│ 3. Railway automáticamente:                                 │
│    - Detecta cambios en server/                             │
│    - npm run build en server/                               │
│    - npm start en: https://construye-api.railway.app        │
│                                                              │
│ 4. Usuario finalmente accede:                               │
│    https://construye.vercel.app                             │
│    (que hace XHR a https://construye-api.railway.app)       │
│                                                              │
│ ✅ Completamente automático, cero intervención             │
└──────────────────────────────────────────────────────────────┘
```

---

## 📍 Mapa: Dónde va cada cosa

```
TU CÓDIGO           DESARROLLO              PRODUCTION
─────────────────────────────────────────────────────────────
client/             localhost:5173          Vercel
├── App.vue         ↓ XHR ↓                 ↓ XHR ↓
├── components/     localhost:3000          Railway
└── utils/api.ts
                    
server/             localhost:3000          Railway
├── index.ts        (GET /health)           (GET /health)
├── prisma/         (POST /api/...)         (POST /api/...)
└── package.json    (local MySQL)           (Railway MySQL)

─────────────────────────────────────────────────────────────
Resultado:
  Local: Ambos en tu máquina
  Prod:  Frontend en Vercel, Backend en Railway
─────────────────────────────────────────────────────────────
```

---

## ✨ Conclusión: No Necesitas Hacer Nada

```
┌────────────────────────────────────────────────────────────┐
│  Tu pregunta: "¿Cómo los separo cuando despliego?"         │
│                                                            │
│  Respuesta: NO TIENES QUE HACER NADA                      │
│                                                            │
│  1. Vercel automáticamente toma solo client/              │
│  2. Railway automáticamente toma solo server/             │
│  3. Cada push → ambos se actualizan                       │
│  4. Listo!                                                │
│                                                            │
│  Es "magia" de configuración:                             │
│  - Vercel: Root Directory = "client/"                     │
│  - Railway: Root Directory = "server/"                    │
└────────────────────────────────────────────────────────────┘
```

---

**¡Ahora entiendas cómo tu monorepo se despliega de forma independiente!** 🚀
