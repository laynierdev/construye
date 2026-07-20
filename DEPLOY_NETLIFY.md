# Deployment en Netlify (Frontend)

## 📋 Requisitos

- Cuenta en [netlify.com](https://netlify.com)
- Repositorio en GitHub

## 🚀 Pasos de Instalación

### 1. Conectar a Netlify

1. Ir a [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Seleccionar GitHub
4. Autorizar Netlify en GitHub
5. Seleccionar repositorio `construye`

### 2. Configurar Build Settings

```
Base directory:      client/
Build command:       npm run build
Publish directory:   client/dist
```

### 3. Variables de Entorno

Dashboard → Settings → Build & Deploy → Environment:

```
VITE_API_URL = https://tu-api-backend.com
```

### 4. Hacer Deploy

```bash
git push origin main
# Netlify automáticamente detecta cambios y deploya
```

## 🔗 API Redirects

Para evitar CORS issues, configurar `netlify.toml` en la raíz:

```toml
[[redirects]]
from = "/api/*"
to = "https://tu-api.railway.app/api/:splat"
status = 200
force = false
```

O crear `client/netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://tu-api.railway.app"

[[redirects]]
from = "/api/*"
to = "https://tu-api.railway.app/api/:splat"
status = 200
force = false

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

## 📊 Comparativa: Vercel vs Netlify

| Característica | Vercel | Netlify |
|---|---|---|
| Deploy automático | ✅ | ✅ |
| Dominios custom | ✅ | ✅ |
| Preview builds | ✅ | ✅ |
| Edge Functions | ✅ | ✅ |
| Free tier | ✅ | ✅ |
| Mejor para Vite | Vercel | Netlify |

## ✅ Checklist

- [ ] Repository conectado a Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] VITE_API_URL configurada
- [ ] Redirects configurados en `netlify.toml`
- [ ] Deploy exitoso

---

**Recomendación:** Vercel es ligeramente mejor para Vite + Vue.js
