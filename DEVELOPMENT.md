# Guía de Desarrollo

## Requisitos

- Node.js 18+
- MySQL 8 corriendo en el puerto 3308

## Poner en marcha

Abre dos terminales:

**Terminal 1 — servidor**
```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

**Terminal 2 — cliente**
```bash
cd client
npm install
npm run dev
```

- Cliente: http://localhost:5173
- API: http://localhost:3000

## Variables de entorno

**`server/.env`**
```
DATABASE_URL="mysql://root:root@localhost:3308/construyedb"
PORT=3000
GOOGLE_GENERATIVE_AI_API_KEY=<tu_api_key>
GOOGLE_GENERATIVE_AI_MODEL=gemini-2.5-flash
PROMPT_TEMPERATURE=0.2
AI_MAX_OUTPUT_TOKENS=2048
```

**`client/.env`**
```
VITE_API_URL=http://localhost:3000
```

## Estructura de código

### Backend (`server/src/`)

```
index.ts              Servidor Hono — registra routers
routes/               Monta handlers, sin lógica de negocio
controllers/          Valida body, forma respuesta HTTP
services/             Lógica de negocio (única capa que toma decisiones)
repositories/         Queries Prisma — única capa que toca la base de datos
lib/prisma.ts         Singleton del PrismaClient
```

Endpoints disponibles:

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/v1/phase1/assistant` | IA calcula lista de materiales (Gemini) |
| `POST` | `/piezas` | Publicar pieza disponible |
| `GET`  | `/piezas?provincia=X&municipio=Y` | Buscar piezas por ubicación |
| `POST` | `/solicitudes` | Crear solicitud de material |
| `GET`  | `/solicitudes` | Listar todas las solicitudes |

### Frontend (`client/src/`)

```
views/
  LandingPage.vue     Página de marketing con nav dropdown y footer
  ClientApp.vue       Calculadora de materiales con IA (/client)
  ClientPiezas.vue    Buscar piezas disponibles (/buscar)
  VendorPage.vue      Portal del vendedor — publicar y ver solicitudes (/vendedor)

components/
  ThemeToggle.vue     Switcher dark/light
  Phase1Results.vue   Tabla de materiales generados por IA
  SolicitudModal.vue  Modal global de solicitud (montado en App.vue)

composables/
  useTheme.ts         Estado del tema — singleton de módulo, persiste en localStorage
  useSolicitudModal.ts Estado del modal — singleton de módulo, prefill opcional

data/
  ubicaciones.ts      15 provincias cubanas con sus municipios

utils/api.ts          Todas las llamadas HTTP centralizadas (usa VITE_API_URL)
router/index.ts       Vue Router 4 — rutas /, /client, /buscar, /vendedor
```

## Base de datos

El schema está en `server/prisma/schema.prisma`. Para aplicar cambios:

```bash
cd server
npx prisma migrate dev --name <nombre_del_cambio>
```

Para inspeccionar la base de datos:

```bash
npx prisma studio
```

## Build de producción

```bash
# Servidor
cd server && npm run build

# Cliente
cd client && npm run build
```

---

*Última actualización: agosto 2025*
