# Índice de Documentación — Construye

## ¿Por dónde empiezo?

### Si es tu primera vez

Lee en este orden:

1. **[QUICK_START.md](./QUICK_START.md)** (5 min)
   - Instalación en 5 pasos
   - Verificar que todo funciona localmente

2. **[README.md](./README.md)** (10 min)
   - Descripción general del proyecto
   - Stack tecnológico y rutas del cliente
   - Variables de entorno y endpoints

3. **[DEVELOPMENT.md](./DEVELOPMENT.md)** (5 min)
   - Cómo ejecutar backend + frontend en paralelo
   - Scripts disponibles

---

### Si quieres entender la arquitectura

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** (15 min)
   - Diagrama general cliente ↔ servidor ↔ MySQL ↔ Gemini
   - Capas del servidor (routes → controllers → services → repositories)
   - Modelos de base de datos (Vendedor, Pieza, Solicitud)
   - Flujos de datos: calcular materiales, publicar pieza, modal de solicitud
   - Estado global del cliente (useTheme, useSolicitudModal)
   - Tema dark/light y decisiones de diseño

---

### Documentación específica de cada carpeta

- **[server/README.md](./server/README.md)** — Backend (Hono + Prisma + MySQL)
  - Rutas de API, modelos, variables de entorno, scripts

- **[client/README.md](./client/README.md)** — Frontend (Vue 3 + Vite)
  - Componentes, composables, llamadas HTTP, estilos

---

## Referencia rápida — Archivos del proyecto

```
Construye/
│
├── README.md                  ← Descripción general, stack, rutas, endpoints
├── QUICK_START.md             ← Instalación en 5 minutos
├── DEVELOPMENT.md             ← Comandos de desarrollo
├── ARCHITECTURE.md            ← Diagramas técnicos y decisiones
├── SCRIPTS.md                 ← Scripts npm disponibles
├── DOCUMENTATION_INDEX.md    ← Este archivo
│
├── server/
│   ├── README.md
│   ├── prisma/schema.prisma   ← Modelos Vendedor, Pieza, Solicitud
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       └── repositories/
│
└── client/
    ├── README.md
    └── src/
        ├── views/             ← LandingPage, ClientApp, ClientPiezas, VendorPage
        ├── components/        ← ThemeToggle, Phase1Results, SolicitudModal
        ├── composables/       ← useTheme, useSolicitudModal
        ├── data/              ← ubicaciones.ts (provincias y municipios)
        ├── router/
        └── utils/api.ts       ← Todas las llamadas HTTP centralizadas
```

---

## Preguntas frecuentes

### "¿Cómo conecto frontend con backend?"

→ Lee **[ARCHITECTURE.md](./ARCHITECTURE.md)**

Respuesta corta: la variable `VITE_API_URL` en `client/.env` apunta al servidor. Todas las llamadas pasan por `utils/api.ts`.

---

### "¿Cómo abro el modal de solicitud desde cualquier vista?"

```typescript
import { openSolicitudModal } from '@/composables/useSolicitudModal'

// Sin prefill
openSolicitudModal()

// Con prefill (desde una pieza)
openSolicitudModal({ piezaNombre: 'Tubo 3/4"', calibre: '3/4"' })
```

El modal está montado en `App.vue` y está disponible en todas las rutas.

---

### "¿Cómo agrego una provincia o municipio?"

→ Edita `client/src/data/ubicaciones.ts`. El array `UBICACIONES` tiene el formato `{ provincia, municipios[] }`. Los selects en `ClientPiezas` y `VendorPage` lo consumen automáticamente.

---

### "¿Cómo agrego un endpoint nuevo al servidor?"

Sigue el patrón de capas estricto:

1. `server/src/repositories/` — query Prisma
2. `server/src/services/` — lógica de negocio, llama al repository
3. `server/src/controllers/` — valida el body, llama al service, forma la respuesta
4. `server/src/routes/` — monta el handler Hono
5. `server/src/index.ts` — registra el router con `app.route()`

---

## Inicio rápido (TL;DR)

```bash
# Terminal 1 — servidor
cd server && npm install && npx prisma migrate dev && npm run dev

# Terminal 2 — cliente
cd client && npm install && npm run dev
```

Cliente en http://localhost:5173 · API en http://localhost:3000

---

## Tabla de documentos

| Documento | Para quién |
|-----------|-----------|
| **QUICK_START.md** | Quiero empezar ya |
| **README.md** | Quiero entender qué es el proyecto |
| **ARCHITECTURE.md** | Quiero entender cómo funciona todo |
| **DEVELOPMENT.md** | Quiero saber los comandos de desarrollo |
| **SCRIPTS.md** | Quiero ver todos los scripts npm |
| **server/README.md** | Documentación específica del backend |
| **client/README.md** | Documentación específica del frontend |

---

*Última actualización: agosto 2025*
