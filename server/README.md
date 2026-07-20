# 🚀 Construye - Backend API

Backend de la plataforma **Construye** construido con **Hono**, **Prisma** y **MySQL**.

## 📋 Características

- ✅ Framework HTTP ultraligero (Hono)
- ✅ ORM moderno (Prisma)
- ✅ Soporte para MySQL
- ✅ TypeScript
- ✅ CORS habilitado
- ✅ Motor de construcción de prompts para LLM

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Configuración de Base de Datos

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Actualizar `DATABASE_URL` en `.env` con tus credenciales de MySQL

3. Generar cliente Prisma:
```bash
npm run prisma:generate
```

4. (Opcional) Ejecutar migraciones:
```bash
npm run prisma:migrate
```

### Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Build para Producción

```bash
npm run build
npm start
```

## 📡 Rutas API (Fase 1)

### Health Check
```
GET /health
```
Respuesta:
```json
{
  "status": "ok",
  "message": "Servidor Construye API funcionando"
}
```

### Asistente Fase 1
```
POST /api/v1/fase1/asistente
```

**Body:**
```json
{
  "especialidad": "plomeria|albanileria|electricidad",
  "distancia": 10,
  "calibre": "1/2\"",
  "cantidadEsquinas": 0,
  "cantidadDerivaciones": 2
}
```

**Respuesta Exitosa (200):**
```json
{
  "especialidad": "plomeria",
  "piezas": [
    {
      "nombre": "Tubería PVC",
      "cantidad": 3,
      "calibre": "1/2\"",
      "unidad": "metros"
    }
  ],
  "instrucciones": "1. Verificar presión del sistema...",
  "esquemaConceptual": "...",
  "proximasFases": "..."
}
```

**Respuesta de Error (400):**
```json
{
  "error": "Especialidad inválida. Debe ser: plomeria, albanileria o electricidad"
}
```

## 🗄️ Base de Datos

Ver `prisma/schema.prisma` para la definición completa de modelos.

### Modelos
- **Categoria**: Especialidades técnicas
- **Pieza**: Materiales/componentes
- **Vendedor**: Tiendas/proveedores
- **Inventario**: Stock y precios

## 🛠️ Scripts disponibles

- `npm run dev`: Inicia servidor en modo desarrollo con hot-reload
- `npm run build`: Compila TypeScript a JavaScript
- `npm start`: Inicia servidor compilado en producción
- `npm run prisma:generate`: Genera cliente Prisma
- `npm run prisma:migrate`: Ejecuta migraciones de BD
- `npm run prisma:studio`: Abre interfaz gráfica de Prisma

## 🏗️ Estructura de Carpetas

```
src/
└── index.ts          # Servidor principal y rutas
prisma/
├── schema.prisma    # Modelos de base de datos
└── migrations/      # Historial de migraciones (generado)
```

## 📚 Recursos

- [Documentación Hono](https://hono.dev)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Documentación MySQL](https://dev.mysql.com/doc/)

## 🔄 Próximos Pasos (Fase 2)

- [ ] Integración con LLM real
- [ ] Endpoints para consultar inventario
- [ ] Cálculo de presupuestos
- [ ] Autenticación y autorización
- [ ] Geolocalización

---

**Última actualización:** Julio 2026
