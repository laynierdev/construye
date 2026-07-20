# Deployment en Railway (Backend)

## 📋 Requisitos

- Cuenta en [railway.app](https://railway.app)
- Repositorio en GitHub (solo carpeta `server/` o monorepo con `server/`)
- MySQL database (Railway lo proporciona automáticamente)

## 🚀 Pasos de Instalación

### 1. Conectar Repositorio a Railway

1. Ir a [railway.app](https://railway.app)
2. Click en "New Project"
3. Seleccionar "GitHub Repo"
4. Autorizar GitHub y seleccionar repositorio `construye`

### 2. Configurar Servicio

**Railway auto-detectará Node.js**, pero configura manualmente:

```
Service Name:        construye-api
Build Command:       npm run build
Start Command:       npm start
Root Directory:      server/  (si es monorepo)
```

### 3. Provisionar MySQL

1. En tu Proyecto Railway, click "New"
2. Seleccionar "MySQL"
3. Railway crea automáticamente base de datos

### 4. Variables de Entorno

Railway automáticamente detecta la base de datos MySQL y crea:

```
DATABASE_URL = mysql://user:pass@host:port/db
PORT = 3000
```

Pero necesitas actualizar el URL si usas otro host:

```
DATABASE_URL = mysql://usuario:password@localhost:3306/construye_db
PORT = 3000
```

### 5. Configurar Prisma

Antes del deploy, ejecutar migraciones localmente:

```bash
cd server
npm run prisma:generate
npm run prisma:migrate -- --name init
```

## 🗄️ Setup de Base de Datos

### Opción A: MySQL en Railway (Automático)

Railway incluye MySQL. Solo necesitas:

1. **Crear la base de datos** desde Railway Dashboard
2. **Obtener connection string** desde Variables
3. **Usar en `server/.env`:**
   ```
   DATABASE_URL="mysql://user:pass@host:port/construye_db"
   ```

### Opción B: MySQL Externo (Azure Database, etc)

Si prefieres usar tu propio MySQL:

1. Crear base de datos en tu proveedor
2. Obtener connection string
3. Agregar a Railway → Variables:
   ```
   DATABASE_URL=mysql://user:pass@host:port/db
   ```

## 🔧 Primeros Pasos

### 1. Conectar y Hacer Push

```bash
git push origin main
```

Railway automáticamente:
- Detecta cambios en `server/`
- Ejecuta `npm install`
- Ejecuta `npm run build`
- Inicia con `npm start`

### 2. Ver Logs

```bash
# En Railway Dashboard, ir a "Logs"
# O usar Railway CLI:
railway logs
```

### 3. Probar Endpoint

```bash
curl https://tu-api.railway.app/health

# Respuesta esperada:
# {"status":"ok","message":"Servidor Construye API funcionando"}
```

## 🌍 URL Público

Después del deploy, tu API estará en:

```
https://construye-api-production.railway.app
```

o un dominio custom si lo configuraste.

## 📦 Prisma en Production

Railway ejecuta automáticamente:

```bash
npm install
npm run build
```

Pero si necesitas ejecutar migraciones:

1. Conectar a Railway MySQL:
   ```bash
   npm run prisma:migrate -- --name init
   ```

2. O usar Prisma Studio para verificar:
   ```bash
   npm run prisma:studio
   ```

## 🔄 Auto-Deployments

Railway redeploy automáticamente cada vez que haces push:

```bash
git add .
git commit -m "Update API"
git push origin main
# Railway automáticamente redeploya!
```

## 🔐 Secretos y Variables

Para información sensible (contraseñas, tokens):

```
Ir a Project → Variables
Agregar:
  DATABASE_URL (obtenida de MySQL en Railway)
  PORT = 3000
  NODE_ENV = production
```

## ✅ Checklist Final

- [ ] Repositorio conectado a Railway
- [ ] MySQL database creada
- [ ] `DATABASE_URL` configurada
- [ ] `npm run build` funciona localmente
- [ ] `npm start` inicia sin errores
- [ ] Endpoint `/health` responde
- [ ] Variables de entorno seteadas

## 🚨 Troubleshooting

**Error: "Cannot connect to MySQL"**
```bash
# Verificar connection string
echo $DATABASE_URL

# Intentar conectar directamente
mysql -h host -u user -p
```

**Build falla**
```bash
# Ver logs en Railway Dashboard → Logs
# Ejecutar build localmente primero:
npm run build
```

**Servidor no inicia**
```bash
# Verificar que package.json tiene "start" script:
"start": "node dist/index.js"
```

---

**Próximo paso:** Conectar Frontend a este Backend
