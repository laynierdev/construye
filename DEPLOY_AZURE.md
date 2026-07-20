# Deployment en Azure (Backend + Frontend)

## 📋 Requisitos

- Cuenta Azure (con créditos Free Tier)
- Repositorio en GitHub
- Azure CLI (opcional pero recomendado)

## 🔧 BACKEND - Azure App Service

### 1. Crear App Service para Node.js

```bash
# Crear resource group
az group create --name construye-rg --location eastus

# Crear App Service Plan
az appservice plan create \
  --name construye-plan \
  --resource-group construye-rg \
  --sku B1 \
  --is-linux

# Crear App Service (Node.js 18)
az webapp create \
  --resource-group construye-rg \
  --plan construye-plan \
  --name construye-api \
  --runtime "NODE:18-lts"
```

### 2. Conectar GitHub Repository

1. En Azure Portal → Tu App Service
2. Click "Deployment Center"
3. Seleccionar "GitHub"
4. Autorizar y seleccionar repo
5. Configurar:
   ```
   Organization:  tu-usuario
   Repository:    construye
   Branch:        main
   ```

### 3. Configurar Build Settings

1. Click "Build → Configure"
2. GitHub Actions automáticamente crea workflow
3. Especificar carpeta:
   ```
   Working Directory: server
   Build Command:     npm run build
   ```

### 4. Variables de Entorno

En Azure Portal → App Service → Configuration:

```
DATABASE_URL = mysql://user:pass@host:port/db
PORT = 3000
NODE_ENV = production
```

### 5. MySQL Database

Opción A: Azure Database for MySQL
```bash
az mysql server create \
  --resource-group construye-rg \
  --name construye-db \
  --admin-user adminuser \
  --admin-password P@ssw0rd123
```

Opción B: Usar MySQL existente o en otro host

## 🌐 FRONTEND - Azure Static Web Apps

### 1. Crear Static Web App

```bash
az staticwebapp create \
  --name construye-web \
  --resource-group construye-rg \
  --location eastus \
  --source https://github.com/tu-usuario/construye \
  --branch main \
  --github-token <tu-token-github>
```

### 2. Configurar Build

1. Azure Portal → Static Web App
2. Configuration → Build Details
   ```
   Build Presets:        Vue (3)
   Build Location:       client
   App Location:         client
   Output Location:      dist
   Build Command:        npm run build
   ```

### 3. Variables de Entorno

En Azure Portal → Settings → Configuration:

```
VITE_API_URL = https://construye-api.azurewebsites.net
```

### 4. Revisar `.staticwebapp.config.json`

Azure crea automáticamente este archivo. Configurar API proxy:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "rewrite": "https://construye-api.azurewebsites.net/api/*"
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/api/*"]
  },
  "mimeTypes": {
    ".json": "application/json"
  }
}
```

## 🔄 GitHub Actions Workflow (Automático)

Azure crea automáticamente workflows en `.github/workflows/`:

```yaml
# azure_static_web_apps_[name].yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches: [ main ]
    paths:
      - 'client/**'

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "client"
          output_location: "dist"
          build_command: "npm run build"
```

## 📊 Costos Estimados

| Servicio | Plan | Costo/Mes |
|----------|------|-----------|
| App Service | B1 | $7 |
| MySQL Server | Basic | $25-50 |
| Static Web Apps | Free | $0 |
| **Total** | | $32-57 |

**Beneficio:** 12 meses gratis con Free Trial de Azure

## ✅ Verificación Post-Deploy

```bash
# Backend
curl https://construye-api.azurewebsites.net/health

# Frontend
curl https://construye-web.azurewebsites.net/

# Verificar variable de entorno
# En Frontend, revisar Network tab → XHR requests
```

## 🔐 Gestión de Secretos

Para datos sensibles (contraseñas, tokens):

1. **NO** comitear en GitHub
2. Usar Azure Key Vault:
   ```bash
   az keyvault create \
     --resource-group construye-rg \
     --name construye-kv
   
   az keyvault secret set \
     --vault-name construye-kv \
     --name "DB-PASSWORD" \
     --value "tu-password"
   ```

3. En App Service, referenciar:
   ```
   DATABASE_URL = @Microsoft.KeyVault(SecretUri=https://construye-kv.vault.azure.net/secrets/DB-PASSWORD/)
   ```

## 🔄 CI/CD Automático

Cada push a `main`:

1. GitHub Actions detecta cambios
2. Si cambios en `server/`: redeploy backend
3. Si cambios en `client/`: redeploy frontend
4. Ambos se actualizan automáticamente

## 📡 Dominios Custom

1. Azure Portal → Static Web App → Custom Domains
2. Agregar tu dominio (ej: `construye.com`)
3. Agregar record CNAME en tu DNS registrar
4. Azure proporciona certificado SSL automático

## 🛠️ Troubleshooting

**Build falla**
```bash
# Ver logs en Azure Portal → Deployment Center → Logs
# O ejecutar localmente:
npm run build
```

**Frontend no se conecta a Backend**
- Verificar `VITE_API_URL` en Azure
- Asegurar que CORS está habilitado en backend
- Revisar Network tab en DevTools

**Database connection error**
- Verificar `DATABASE_URL` en Azure
- Asegurar que MySQL está corriendo
- Comprobar firewall rules en Azure

---

**Próximos pasos:**
1. Configurar ambos servicios en Azure
2. Hacer push a GitHub
3. Azure automáticamente deploya
4. Verificar endpoints
