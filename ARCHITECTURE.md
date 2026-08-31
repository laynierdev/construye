# Arquitectura — Construye

## Diagrama general

```
┌─────────────────────────────────────────────────────────────────┐
│  CLIENTE  Vue 3 SPA · puerto 5173                               │
│                                                                  │
│  ┌──────────────┐   ┌────────────────┐   ┌──────────────────┐  │
│  │ LandingPage  │   │  ClientApp     │   │  ClientPiezas    │  │
│  │  /           │   │  /client       │   │  /buscar         │  │
│  └──────────────┘   └───────┬────────┘   └────────┬─────────┘  │
│                             │                      │             │
│  ┌──────────────┐           │           ┌──────────▼─────────┐  │
│  │  VendorPage  │           │           │  SolicitudModal     │  │
│  │  /vendedor   │           │           │  (global, App.vue)  │  │
│  └──────────────┘           │           └────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────▼─────────────────────────────────┐ │
│  │  utils/api.ts  — única fuente de fetch                     │ │
│  │  VITE_API_URL = http://localhost:3000                       │ │
│  └──────────────────────────┬─────────────────────────────────┘ │
└─────────────────────────────│───────────────────────────────────┘
                              │ HTTP / JSON
┌─────────────────────────────▼───────────────────────────────────┐
│  SERVIDOR  Hono · puerto 3000                                   │
│                                                                  │
│  routes/ ──► controllers/ ──► services/ ──► repositories/      │
│                                                   │              │
│  Endpoints:                                        │              │
│  POST /api/v1/phase1/assistant  (IA Gemini)       │              │
│  POST /piezas                                     │              │
│  GET  /piezas?provincia=X&municipio=Y             │              │
│  POST /solicitudes                                │              │
│  GET  /solicitudes                                │              │
│                                               Prisma Client      │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
┌───────────────────────────────────────────────────▼─────────────┐
│  MySQL · puerto 3308 · base de datos: construyedb               │
│                                                                  │
│  Vendedor ──► Pieza                                             │
│  Solicitud (vendedorId nullable — MVP público)                  │
└─────────────────────────────────────────────────────────────────┘

                              │  (servicio externo)
┌─────────────────────────────▼───────────────────────────────────┐
│  Google Gemini 2.5 Flash API                                    │
│  generativelanguage.googleapis.com                              │
│  Fallback matemático si la API no está disponible               │
└─────────────────────────────────────────────────────────────────┘
```

## Capas del servidor

```
src/routes/          Hono router — solo monta handlers, sin lógica
       │
       ▼
src/controllers/     Valida body, llama al service, forma la respuesta HTTP
       │
       ▼
src/services/        Lógica de negocio (ej: buscar/crear vendedor, calcular nombre)
       │
       ▼
src/repositories/    Única capa que importa PrismaClient — queries a MySQL
       │
       ▼
lib/prisma.ts        Singleton del PrismaClient
```

**Regla estricta:** cada capa solo importa la inmediatamente inferior. Los services nunca tocan Prisma directamente; los controllers nunca importan repositories.

## Modelos de base de datos

```
Vendedor
├── id            Int (PK, autoincrement)
├── nombre        String?   auto-generado como "vendedor_0001" si se omite
├── telefono      String    identificador único del vendedor en MVP
├── provincia     String
├── municipio     String
└── piezas        Pieza[]

Pieza
├── id            Int (PK, autoincrement)
├── nombre        String
├── calibre       String?
├── stock         Int
├── provincia     String
├── municipio     String
├── vendedorId    Int (FK → Vendedor)
└── vendedor      Vendedor

Solicitud
├── id                 Int (PK, autoincrement)
├── piezaNombre        String
├── calibre            String?
├── cantidad           Int
├── nota               String?
├── telefonoCliente    String
├── prefiereMensajeria Boolean (default false)
├── vendedorId         Int?    null en MVP — todas las solicitudes son públicas
└── createdAt          DateTime (default now)
```

## Flujo: calcular materiales con IA

```
ClientApp
  └── handleSubmit()
        └── api.ts · POST /api/v1/phase1/assistant
              └── phase1Controller
                    └── phase1Service
                          ├── buildPhase1Prompt()   — promptBuilder.ts
                          ├── generateAIResponse()  — aiService.ts → Gemini API
                          │     └── si falla → fallback matemático por especialidad
                          └── devuelve Phase1Response { parts, instructions, tips, ... }
```

## Flujo: publicar pieza

```
VendorPage (form)
  └── postPieza()  — api.ts · POST /piezas
        └── piezasController
              └── piezasService
                    ├── vendedoresRepo.findByTelefono()   — ¿ya existe?
                    │     ├── SÍ  → reusar vendedor existente
                    │     └── NO  → vendedoresRepo.countAll() → generar nombre
                    │               vendedoresRepo.create()
                    └── piezasRepo.create()  → { pieza + vendedor }
```

## Flujo: solicitar material (modal global)

```
Cualquier página
  └── openSolicitudModal(prefill?)   — useSolicitudModal.ts (singleton)
        └── SolicitudModal.vue (Teleport → body)
              └── submit() → api.ts · POST /solicitudes
                    └── solicitudesController
                          └── solicitudesService
                                └── solicitudesRepo.create({ vendedorId: null })
```

## Estado global del cliente

```
useTheme.ts          ref<'dark'|'light'>   persiste en localStorage
useSolicitudModal.ts ref<boolean> + prefill  abre/cierra el modal desde cualquier ruta
```

Ambos son singletons a nivel de módulo (state fuera del setup) — no requieren Pinia.

## Tema dark/light

Las variables CSS se definen en `client/index.html`:

```
:root               → dark (default)
[data-theme="light"] → overrides
```

`useTheme.ts` escribe `data-theme` en `<html>` y persiste la preferencia. Un script inline en `<head>` previene FOUC (flash of unstyled content) al cargar la página.

Todos los colores usan `var(--*)`. WCAG AA verificado en ambos modos:
- Texto principal: ≥ 16:1
- Texto secundario: ≥ 5:1
- Botones de acción (naranja): ≥ 4.5:1

## Decisiones de diseño

| Decisión | Alternativa descartada | Razón |
|----------|----------------------|-------|
| CSS custom properties para tema | Pinia store | Más simple, sin dependencia externa |
| Singleton de módulo para estado global | Pinia | MVP sin complejidad extra |
| Gemini REST directo con fetch | SDK oficial | Sin bloques de compatibilidad ESM |
| Fallback matemático en IA | Solo IA | Resiliencia sin degradar UX |
| `vendedorId: null` en Solicitud | Relación obligatoria | MVP público — cualquier vendedor puede responder |
| Teléfono como ID del vendedor | Email/usuario | Menor fricción en registro |

---

*Última actualización: agosto 2025*
