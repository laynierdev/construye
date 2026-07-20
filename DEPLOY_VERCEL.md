# Deployment en Vercel (Frontend)

## 📋 Requisitos

- Cuenta en [vercel.com](https://vercel.com)
- Repositorio en GitHub (solo carpeta `client/` o monorepo con `client/`)

## 🚀 Pasos de Instalación

### 1. Conectar Repositorio a Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Click en "Add New..." → "Project"
3. Importar repositorio GitHub
4. Seleccionar el repositorio `construye`

### 2. Configurar Build Settings

```
Framework Preset:    Vite
Build Command:       npm run build
Output Directory:    dist
Install Command:     npm install
```

**Si usas monorepo, especifica la raíz:**

```
Root Directory:      client/
Build Command:       npm run build
Output Directory:    dist
```

### 3. Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL = https://tu-api-backend.com
```

Donde `tu-api-backend.com` es tu servidor desplegado (Railway, Azure, etc).

### 4. Hacer Deploy

```bash
git push origin main
```

Vercel automáticamente detectará cambios en `client/` y desplegará.

## 🔗 Variables de Entorno Dinámicas

Para diferentes ambientes (desarrollo, staging, producción):

**Production:**
```
VITE_API_URL=https://api.construye.com
```

**Preview (rama `develop`):**
```
VITE_API_URL=https://api-staging.construye.com
```

## 📊 Optimizaciones

### 1. Caching Automático
Vercel cachea automáticamente archivos `.js`, `.css`, etc.

### 2. Edge Caching
Configurar en `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/dist/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. Redirects API

Para redirigir llamadas `/api/*` al backend:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://tu-api.railway.app/api/$1"
    }
  ]
}
```

## 🔍 Troubleshooting

**Error: "Cannot find module 'vue'"**
```bash
npm install
npm run build
```

**CORS Error en Frontend**
- Verificar que backend tiene CORS habilitado
- Verificar `VITE_API_URL` en production

**Build falla**
```bash
# Limpiar y reintentar
rm -rf node_modules
npm install
npm run build
```

## ✅ Verificación

Después del deploy:

```bash
# Verificar que tu app está en línea
curl https://tu-app.vercel.app

# Verificar variables de entorno
curl https://tu-app.vercel.app/api/health
```

---

**Próximo paso:** Configurar backend en Railway o Azure
