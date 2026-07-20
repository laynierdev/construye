# Guía de Desarrollo

## Estructura General

Este proyecto utiliza una estructura de **monorepo** con dos espacios de trabajo independientes:
- `client/`: Aplicación Vue.js 3
- `server/`: API Hono + Prisma

## Ejecutar Ambos Servicios Simultáneamente

Si tienes npm workspaces configurado, desde la raíz:

```bash
npm install
npm run dev
```

Para ejecutarlos de forma independiente, abre dos terminales:

**Terminal 1 (Servidor):**
```bash
cd server
npm run dev
```

**Terminal 2 (Cliente):**
```bash
cd client
npm run dev
```

## Variables de Entorno

### Servidor
Crear `server/.env`:
```
DATABASE_URL="mysql://root:password@localhost:3306/construye_db"
PORT=3000
```

### Cliente
El cliente está configurado para hacer proxy de `/api` a `http://localhost:3000` en desarrollo.

## Estructura de Código

### Backend (`/server`)
- `src/index.ts`: Servidor principal con rutas
- `prisma/schema.prisma`: Definición de modelos
- Endpoint actual: `POST /api/v1/fase1/asistente`

### Frontend (`/client`)
- `src/App.vue`: Componente principal con formulario
- `src/components/ResultadosFase1.vue`: Muestra resultados
- `src/utils/api.ts`: Funciones para llamadas HTTP
- `src/types/`: Definiciones TypeScript compartidas

## Flujo de Datos Fase 1

1. Usuario selecciona especialidad y parámetros en `App.vue`
2. Llamada HTTP POST a `/api/v1/fase1/asistente`
3. Backend procesa datos y genera lista de piezas
4. Respuesta se muestra en `ResultadosFase1.vue`

## Próximos Pasos (Fase 2)

- [ ] Integración real con LLM (Claude/GPT)
- [ ] Búsqueda en base de datos MySQL
- [ ] Cálculo de presupuesto
- [ ] Geolocalización de tiendas
- [ ] Sistema de autenticación

---

**Nota:** Este proyecto está en desarrollo activo. Reporta issues o contribuye con PRs.
