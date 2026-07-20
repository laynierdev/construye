# 🏠 Construye - Plataforma de Asistencia Técnica para Proyectos de Hogar

Una plataforma innovadora que utiliza inteligencia artificial para asistir en proyectos técnicos de hogar (plomería, albañilería, electricidad). Ayuda a usuarios a identificar materiales necesarios, obtener instrucciones de instalación y conectarlos con proveedores locales.

## 📋 Descripción General

**Construye** es un monorepo dividido en dos componentes principales:

- **Frontend (`/client`):** SPA con Vue.js 3 (Composition API) + W3.CSS
- **Backend (`/server`):** API REST con Hono (framework ultraligero) + Prisma ORM + MySQL

## 🚀 Fases del Proyecto

### ✅ Fase 1 (Actual)
- **Objetivo:** Asistencia técnica básica con motor de IA
- **Funcionalidad:**
  - Formulario dinámico de selección de especialidad (Plomería, Albañilería, Electricidad)
  - Backend que construye prompts técnicos para un LLM
  - Respuesta mockeada con lista cuantitativa de piezas
  - Esquema conceptual e instrucciones de instalación
  - **Alcance:** Sin autenticación, sin búsqueda de inventario, sin cálculo de presupuesto

### 🔄 Fase 2 (Próxima)
- **Objetivo:** Integración con inventarios y presupuestación
- **Funcionalidad:**
  - Búsqueda de piezas en base de datos (Prisma + MySQL)
  - Cálculo de presupuesto según disponibilidad de vendedores
  - Geolocalización de tiendas cercanas
  - Integración de precios en tiempo real

## 📂 Estructura del Proyecto

```
Construye/
├── server/                    # Backend Node.js + Hono
│   ├── src/
│   │   └── index.ts          # Servidor principal con endpoint /api/v1/fase1/asistente
│   ├── prisma/
│   │   └── schema.prisma     # Modelos de base de datos
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── client/                    # Frontend Vue.js 3
│   ├── src/
│   │   ├── components/       # Componentes Vue
│   │   │   └── ResultadosFase1.vue
│   │   ├── types/            # Definiciones TypeScript
│   │   │   └── index.ts
│   │   ├── utils/            # Funciones utilitarias
│   │   │   └── api.ts
│   │   ├── App.vue           # Componente raíz
│   │   └── main.ts           # Punto de entrada
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tsconfig.node.json
│
├── README.md                 # Este archivo
└── .gitignore               # Archivos a ignorar en Git
```

## 🛠️ Instalación y Configuración

### Requisitos
- **Node.js 18+**
- **npm o yarn**
- **MySQL 8.0+** (para Fase 2 en adelante)

### Instalación del Servidor

```bash
cd server
npm install

# Generar cliente Prisma
npm run prisma:generate

# (Opcional) Crear/migrar base de datos
npm run prisma:migrate
```

**Variables de entorno** (`.env`):
```
DATABASE_URL="mysql://user:password@localhost:3306/construye_db"
PORT=3000
```

### Instalación del Cliente

```bash
cd client
npm install
```

## 🚀 Ejecutar el Proyecto

### Servidor (Backend)
```bash
cd server
npm run dev
```
Disponible en: `http://localhost:3000`

### Cliente (Frontend)
```bash
cd client
npm run dev
```
Disponible en: `http://localhost:5173`

## 📡 API REST - Fase 1

### Endpoint Principal

**POST** `/api/v1/fase1/asistente`

#### Request Body
```json
{
  "especialidad": "plomeria|albanileria|electricidad",
  "distancia": 10,
  "calibre": "1/2\"",
  "cantidadEsquinas": 0,
  "cantidadDerivaciones": 2
}
```

#### Response
```json
{
  "especialidad": "plomeria",
  "piezas": [
    {
      "nombre": "Tubería PVC",
      "cantidad": 3,
      "calibre": "1/2\"",
      "unidad": "metros"
    },
    ...
  ],
  "instrucciones": "1. Verificar presión del sistema...",
  "esquemaConceptual": "┌─────┐\n│Fuente│\n└──┬──┘\n   │",
  "proximasFases": "En la Fase 2 buscaremos piezas..."
}
```

## 🗄️ Modelos de Base de Datos (Prisma)

### Categoria
- `id`: Identificador único
- `nombre`: Nombre de la especialidad (Plomería, Albañilería, Electricidad)
- `descripcion`: Descripción detallada
- Relación: `1:N` con Pieza

### Pieza
- `id`: Identificador único
- `nombre`: Nombre del material/pieza
- `descripcion`: Detalles
- `calibre`: Especificación técnica
- `unidad`: Unidad de medida
- Relación: `N:1` con Categoria, `1:N` con Inventario

### Vendedor
- `id`: Identificador único
- `nombre`: Nombre de la tienda/proveedor
- `ubicacion`: Dirección
- `latitud`, `longitud`: Coordenadas (para Fase 2)
- `telefono`: Contacto
- Relación: `1:N` con Inventario

### Inventario
- `id`: Identificador único
- `piezaId`, `vendedorId`: Claves foráneas
- `cantidad`: Stock disponible
- `precio`: Precio unitario
- Relación: `N:1` con Pieza y Vendedor

## 🔐 Seguridad (Fase 1)

⚠️ **Fase 1 no incluye autenticación.** Es una plataforma "Free-for-all" para demostración. La seguridad se implementará en fases posteriores.

## 📦 Dependencias Principales

### Backend
- **hono**: Framework HTTP ultraligero
- **@prisma/client**: ORM para base de datos
- **prisma**: CLI para gestionar migraciones

### Frontend
- **vue**: Framework reactivo
- **w3.css**: Framework CSS ligero
- **vite**: Build tool rápido

## 🎨 Estilos (W3.CSS)

Se utiliza **W3.CSS** en lugar de Tailwind/Bootstrap para mantener el proyecto ligero y sin dependencias de utilidades pesadas. Los colores y componentes están basados en la paleta estándar de W3.CSS.

## 📝 Notas de Desarrollo

- El backend genera lógica de construcción de prompts (preparado para integración con Claude, GPT, etc.)
- Las respuestas de Fase 1 son mockeadas; Fase 2 integrará llamadas reales a LLM y base de datos
- Cada especialidad (Plomería, Albañilería, Electricidad) tiene generadores propios de piezas
- El botón "Buscar Piezas y Calcular Presupuesto" está inactivo en Fase 1 como marcador para Fase 2

## 🤝 Contribuciones

Para contribuir:
1. Crea una rama desde `main`
2. Realiza tus cambios
3. Envía un Pull Request

## 📄 Licencia

MIT - Ver archivo LICENSE para detalles.

---

**Última actualización:** Julio 2026
