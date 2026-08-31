# Construye — Plataforma de Asistencia Técnica para el Hogar

Plataforma web que conecta a clientes con materiales de construcción usando Inteligencia Artificial. Los usuarios describen su proyecto (plomería, albañilería o electricidad) y obtienen al instante la lista exacta de materiales, instrucciones de instalación y consejos de profesionales. Los vendedores publican su inventario disponible y reciben solicitudes directas de clientes vía WhatsApp.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Vue 3 + TypeScript + Vite |
| Estilos | CSS custom properties (dark/light theme) |
| Routing | Vue Router 4 |
| Backend | Hono 4 + Node.js |
| ORM | Prisma 5 |
| Base de datos | MySQL 8 |
| IA | Google Gemini 2.5 Flash (API REST) |

## Estructura del monorepo

```
Construye/
├── client/          # SPA Vue 3 (puerto 5173)
│   └── src/
│       ├── views/           # LandingPage, ClientApp, ClientPiezas, VendorPage
│       ├── components/      # ThemeToggle, Phase1Results, SolicitudModal
│       ├── composables/     # useTheme, useSolicitudModal
│       ├── data/            # ubicaciones.ts (15 provincias cubanas)
│       ├── router/          # Vue Router
│       └── utils/api.ts     # Todas las llamadas HTTP centralizadas
│
└── server/          # API REST Hono (puerto 3000)
    └── src/
        ├── routes/          # Definición de rutas Hono
        ├── controllers/     # Manejo de request/response
        ├── services/        # Lógica de negocio
        ├── repositories/    # Acceso a Prisma (única capa que toca DB)
        └── lib/prisma.ts    # Singleton del cliente Prisma
```

## Rutas del cliente

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | LandingPage | Marketing: hero, features, reseñas |
| `/client` | ClientApp | Formulario IA para calcular materiales |
| `/buscar` | ClientPiezas | Buscar piezas disponibles por provincia |
| `/vendedor` | VendorPage | Portal del vendedor (publicar + ver solicitudes) |

## API endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/v1/phase1/assistant` | IA genera lista de materiales (Gemini) |
| `POST` | `/piezas` | Publicar pieza disponible |
| `GET` | `/piezas?provincia=X&municipio=Y` | Buscar piezas por ubicación |
| `POST` | `/solicitudes` | Crear solicitud de material |
| `GET` | `/solicitudes` | Listar todas las solicitudes |

## Poner en marcha

### Requisitos

- Node.js 18+
- MySQL 8 corriendo en el puerto configurado en `.env`

### Variables de entorno

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

### Servidor

```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

### Cliente

```bash
cd client
npm install
npm run dev
```

## Funcionalidades implementadas (MVP)

### Landing page
- Hero animado con card stack de especialidades
- Sección "Cómo funciona" y grid de características
- Reseñas de usuarios con avatares CSS
- Menú "Para Clientes" con dropdown: Calcular materiales / Buscar piezas / Solicitar materiales
- Toggle Claro / Oscuro (WCAG AA en ambos modos)
- Responsive mobile

### Calculadora de materiales IA (`/client`)
- Selección de especialidad: Plomería, Albañilería, Electricidad
- Formulario con parámetros técnicos (longitud, calibre, derivaciones, descripción libre)
- Llama a Google Gemini 2.5 Flash; fallback matemático si la API falla
- Resultados: tabla de piezas, pasos de instalación, diagrama textual, consejos
- Botón flotante "Solicitar materiales" (FAB, esquina inferior derecha)

### Buscar piezas (`/buscar`)
- Filtro por provincia y municipio (15 provincias cubanas completas)
- Cards con nombre, calibre, stock, vendedor y teléfono
- Botón "Solicitar →" pre-rellena el modal global con la pieza seleccionada
- Banner CTA para solicitar sin pieza preseleccionada

### Portal de vendedor (`/vendedor`)
- **Tab Publicar pieza**: formulario con provincia/municipio, teléfono como identificador del vendedor, nombre auto-generado (`vendedor_0001`) si se omite
- **Tab Solicitudes**: lista de todas las solicitudes de clientes con badge de preferencia de contacto y botón WhatsApp directo

### Modal de solicitud global (`SolicitudModal`)
- Disponible en toda la app (montado en `App.vue`)
- Acepta prefill opcional (pieza y calibre)
- Confirmación visual + cierre automático a los 2 segundos
- Accesible desde: dropdown del nav, FAB en `/client`, banner en `/buscar`

## Arquitectura del servidor (capas)

```
routes → controllers → services → repositories → Prisma → MySQL
```

Cada capa solo importa la inmediatamente inferior. Los servicios nunca tocan Prisma directamente.

## Base de datos

```
Vendedor (id, nombre?, telefono, provincia, municipio)
    └── Pieza (id, nombre, calibre?, stock, provincia, municipio, vendedorId)

Solicitud (id, piezaNombre, calibre?, cantidad, nota?,
           telefonoCliente, prefiereMensajeria, vendedorId?, createdAt)
```

---

*Autor: Laynier · Agosto 2025*
