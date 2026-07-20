# 🏗️ Arquitectura del Proyecto Construye

## Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (NAVEGADOR)                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            Vue.js 3 - SPA (5173)                   │    │
│  │                                                    │    │
│  │  ┌──────────────────┐    ┌──────────────────────┐ │    │
│  │  │  Formulario      │    │  ResultadosFase1.vue │ │    │
│  │  │  (App.vue)       │───▶│                      │ │    │
│  │  │                  │    │ - Tabla de piezas   │ │    │
│  │  │ - Especialidad   │    │ - Instrucciones    │ │    │
│  │  │ - Distancia      │    │ - Esquema diagramas │ │    │
│  │  │ - Calibre        │    │ - Botón Fase 2     │ │    │
│  │  │ - Esquinas       │    │                      │ │    │
│  │  │ - Derivaciones   │    └──────────────────────┘ │    │
│  │  └──────────────────┘                              │    │
│  │          │                                          │    │
│  │          │ HTTP POST                                │    │
│  │          ▼                                          │    │
│  │  ┌─────────────────────────┐                       │    │
│  │  │   api.ts                │                       │    │
│  │  │ Gestiona llamadas HTTP  │                       │    │
│  │  └─────────────────────────┘                       │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          │ Proxy CORS                       │
│                          ▼                                  │
└─────────────────────────────────────────────────────────────┘
                          │
                          │
┌─────────────────────────────────────────────────────────────┐
│                    SERVIDOR (BACKEND)                       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │        Hono Framework (Puerto 3000)                │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │  POST /api/v1/fase1/asistente               │ │    │
│  │  │                                              │ │    │
│  │  │  1. Validar especialidad                    │ │    │
│  │  │  2. Construir prompt técnico                │ │    │
│  │  │  3. Procesar según especialidad:            │ │    │
│  │  │     - Plomería → piezasPlomeria()           │ │    │
│  │  │     - Albañilería → piezasAlbanileria()     │ │    │
│  │  │     - Electricidad → piezasElectricidad()   │ │    │
│  │  │  4. Retornar respuesta mockeada             │ │    │
│  │  │                                              │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │                      │                             │    │
│  │                      ▼                             │    │
│  │  ┌────────────────────────────────────────────┐   │    │
│  │  │  Prisma Client (ORM)                       │   │    │
│  │  │  [Preparado para Fase 2]                   │   │    │
│  │  │  - Consultas a Categoria                   │   │    │
│  │  │  - Búsqueda de Pieza                       │   │    │
│  │  │  - Inventario por Vendedor                 │   │    │
│  │  └────────────────────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────┘    │
│                      │                                     │
│                      ▼                                     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │            MySQL Database                          │  │
│  │  ┌──────────┐ ┌──────┐ ┌──────────┐ ┌──────────┐  │  │
│  │  │Categoria │ │Pieza │ │Vendedor  │ │Inventario│  │  │
│  │  └──────────┘ └──────┘ └──────────┘ └──────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Flujo de Datos - Fase 1

```
1. ENTRADA DEL USUARIO
   ┌──────────────────────────────────┐
   │ Selecciona especialidad          │
   │ Ingresa parámetros técnicos      │
   │ Click "Generar Asistencia"       │
   └──────────────────────────────────┘
                    │
                    ▼
2. VALIDACIÓN EN CLIENTE
   ┌──────────────────────────────────┐
   │ Verificar campos obligatorios     │
   │ Validar especialidad              │
   │ Preparar payload JSON             │
   └──────────────────────────────────┘
                    │
                    ▼
3. ENVÍO HTTP
   ┌──────────────────────────────────┐
   │ POST /api/v1/fase1/asistente     │
   │ Body: { especialidad, distancia, │
   │         calibre, esquinas,       │
   │         derivaciones }            │
   └──────────────────────────────────┘
                    │
                    ▼
4. PROCESAMIENTO EN SERVIDOR
   ┌──────────────────────────────────┐
   │ a) Validar especialidad           │
   │ b) Mapear a función generadora    │
   │ c) Calcular piezas requeridas     │
   │ d) Construir instrucciones        │
   │ e) Generar esquema conceptual     │
   └──────────────────────────────────┘
                    │
                    ├─────────────────┬────────────────┐
                    │                 │                │
         Especialidad = Plomería │Albañilería    │Electricidad
                    │                 │                │
                    ▼                 ▼                ▼
            generarPiezas      generarPiezas      generarPiezas
             Plomeria()         Albanileria()      Electricidad()
                    │                 │                │
                    └─────────────────┴────────────────┘
                                │
                                ▼
5. RESPUESTA DEL SERVIDOR
   ┌──────────────────────────────────┐
   │ {                                │
   │   especialidad: string           │
   │   piezas: Pieza[]                │
   │   instrucciones: string          │
   │   esquemaConceptual: string      │
   │   proximasFases: string          │
   │ }                                │
   └──────────────────────────────────┘
                    │
                    ▼
6. RENDERIZADO EN CLIENTE
   ┌──────────────────────────────────┐
   │ Mostrar ResultadosFase1.vue       │
   │ - Tabla con materiales           │
   │ - Instrucciones paso a paso      │
   │ - Diagrama ASCII                 │
   │ - Info sobre Fase 2 (próxima)    │
   └──────────────────────────────────┘
```

## Especialidades - Generadores de Piezas

### 🔧 PLOMERÍA
```
Input: distancia (metros), calibre, derivaciones
Output:
  └─ Tubería PVC (cantidad calculada)
  └─ Codos 90° (según distancia)
  └─ Tés de derivación (según derivaciones)
  └─ Válvula de compuerta (1 unidad)
  └─ Empaques de teflón (rollo)
  └─ Pegamento PVC (bote)

Instrucciones: Verificar presión, cortar tuberías, instalar conexiones
```

### 🧱 ALBAÑILERÍA
```
Input: distancia (metros), calibre, esquinas
Output:
  └─ Varillas de acero (según esquinas)
  └─ Bolsas de cemento (según área)
  └─ Arena para mortero (m³)
  └─ Grava/Piedra (m³)
  └─ Alambre de amarre (kg)
  └─ Madera de encofrado (metros)

Instrucciones: Nivelar, preparar varillas, verter concreto, curar
```

### ⚡ ELECTRICIDAD
```
Input: distancia (metros), calibre, derivaciones
Output:
  └─ Cable conductor (según distancia)
  └─ Cajas de conexión (cada 1.5m)
  └─ Conectores tipo tuerca
  └─ Breakers/Interruptores (según derivaciones)
  └─ Canaleta/Tubo conduit (metros)
  └─ Placas de cubierta (unidades)

Instrucciones: Verificar carga, tender cables, instalar cajas, probar
```

## Modelos de Base de Datos

```
Categoria
├─ id (PK)
├─ nombre (UNIQUE)
└─ descripcion
   │
   └──▶ Pieza (1:N)
        ├─ id (PK)
        ├─ nombre
        ├─ calibre
        ├─ unidad
        └─ categoriaId (FK)
           │
           └──▶ Inventario (1:N)
                ├─ id (PK)
                ├─ cantidad
                ├─ precio
                ├─ piezaId (FK)
                └─ vendedorId (FK)
                       │
                       └──▶ Vendedor
                            ├─ id (PK)
                            ├─ nombre
                            ├─ ubicacion
                            ├─ latitud
                            ├─ longitud
                            └─ telefono
```

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | Vue.js 3 | 3.4+ |
| Build Tool | Vite | 5.0+ |
| Styling | W3.CSS | 4 |
| Backend | Hono | 4.0+ |
| ORM | Prisma | 5.0+ |
| Database | MySQL | 8.0+ |
| Language | TypeScript | 5.0+ |
| Runtime | Node.js | 18+ |

## Patrones y Decisiones

1. **Monorepo**: `client/` y `server/` separados pero en mismo repo
2. **SPA**: Vue.js 3 con Composition API
3. **Componentes**: Reutilizables, tipados, ligeros
4. **Llamadas HTTP**: Centralizado en `utils/api.ts`
5. **Lógica de negocio**: En servidor (motor de IA mockeado en Fase 1)
6. **Estilos**: W3.CSS para mantener proyecto ligero
7. **Tipos**: TypeScript en todo el stack

## Preparación para Fase 2

- ✅ Modelos Prisma listos (Categoria, Pieza, Vendedor, Inventario)
- ✅ Botón "Buscar Piezas" inactivo (listo para conectar)
- ✅ Estructura de endpoint preparada para integración con LLM
- ✅ Tipos TypeScript escalables
- ✅ API REST RESTful lista para expandir

---

**Última actualización:** Julio 2026
