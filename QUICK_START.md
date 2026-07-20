# ⚡ Quick Start - Construye

Guía rápida para tener **Construye** funcionando en 5 minutos.

## 📋 Requisitos

- **Node.js 18+** ([descargar](https://nodejs.org/))
- **npm 9+** (viene con Node.js)
- **MySQL 8.0+** (opcional para Fase 1, necesario para Fase 2)

## 🚀 Instalación Rápida (Sin Base de Datos)

### 1️⃣ Instalar Dependencias

```bash
# Instalar todas las dependencias (cliente + servidor)
npm install

# O instalarlas por separado:
# cd server && npm install
# cd client && npm install
```

### 2️⃣ Iniciar Servidor Backend

Abre una terminal:

```bash
cd server
npm run dev
```

Verás algo como:
```
🚀 Servidor Construye ejecutándose en puerto 3000
```

### 3️⃣ Iniciar Cliente Frontend

Abre otra terminal:

```bash
cd client
npm run dev
```

Verás algo como:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

### 4️⃣ Abrir en Navegador

Haz click en `http://localhost:5173/` o cópialo en tu navegador.

## ✅ Prueba Rápida

1. **Selecciona una especialidad**: Plomería, Albañilería o Electricidad
2. **Ingresa valores**: Distancia (10m), calibre (opcional)
3. **Click en "Generar Asistencia"**
4. Deberías ver:
   - ✅ Tabla con piezas requeridas
   - ✅ Instrucciones de instalación
   - ✅ Esquema conceptual ASCII
   - ✅ Botón "Buscar Piezas" (deshabilitado - Fase 2)

## 🔧 Configuración con Base de Datos (Opcional)

Si quieres configurar MySQL para futuras fases:

### 1. Crear Base de Datos

```sql
CREATE DATABASE construye_db;
```

### 2. Configurar Conexión

Editar `server/.env`:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/construye_db"
PORT=3000
```

### 3. Generar Cliente Prisma

```bash
cd server
npm run prisma:generate
```

### 4. Ejecutar Migraciones (Opcional)

```bash
npm run prisma:migrate
```

## 📂 Estructura Generada

```
Construye/
├── server/                    # Backend (Hono + Prisma)
│   ├── src/index.ts          # API principal
│   ├── prisma/schema.prisma  # Modelos BD
│   ├── .env.example          # Configuración
│   └── package.json
│
├── client/                    # Frontend (Vue 3 + Vite)
│   ├── src/App.vue          # Componente principal
│   ├── src/components/      # Componentes Vue
│   ├── .env.example         # Configuración
│   └── package.json
│
├── README.md                # Documentación completa
├── DEVELOPMENT.md           # Guía de desarrollo
├── ARCHITECTURE.md          # Diagrama de arquitectura
└── QUICK_START.md          # Este archivo
```

## 🆘 Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Cambiar puerto en server/.env
PORT=3001
```

### Error: "Cannot find module 'hono'"
```bash
cd server && npm install
```

### Frontend no se conecta a Backend
- Verificar que backend está corriendo en `http://localhost:3000`
- Revisar consola del navegador (F12) para CORS errors
- En `client/vite.config.ts` hay proxy configurado

### MySQL connection error
- Verificar que MySQL está corriendo
- Validar credenciales en `.env`
- Crear base de datos: `CREATE DATABASE construye_db;`

## 📖 Documentación

- **[README.md](./README.md)** - Descripción general
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guía detallada de desarrollo
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Diagrama de arquitectura
- **[server/README.md](./server/README.md)** - Documentación backend
- **[client/README.md](./client/README.md)** - Documentación frontend

## 🎯 Próximos Pasos

1. ✅ Fase 1: Asistencia técnica (COMPLETADA)
2. 🔄 Fase 2: Búsqueda de inventario (próxima)
   - Integrar búsqueda en MySQL
   - Calcular presupuesto
   - Mostrar tiendas cercanas

## 🤝 Feedback

Para reportar bugs o sugerencias:
- Abre un issue en GitHub
- Crea un pull request con mejoras

---

**¡Listo!** Ahora puedes comenzar a desarrollar con **Construye**. 🎉
