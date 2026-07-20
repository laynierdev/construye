# Scripts mejorados para desarrollo y deployment

En `package.json` raíz, reemplaza `scripts` con:

```json
"scripts": {
  "install:all": "npm install",
  
  "dev": "npm run dev --workspaces",
  "dev:server": "npm run dev --workspace=server",
  "dev:client": "npm run dev --workspace=client",
  
  "build": "npm run build --workspaces",
  "build:server": "npm run build --workspace=server",
  "build:client": "npm run build --workspace=client",
  
  "preview:server": "npm run preview --workspace=server",
  "preview:client": "npm run preview --workspace=client",
  
  "start": "npm start --workspace=server",
  "start:client": "npm run preview --workspace=client"
}
```

Con esto puedes:
```bash
npm run dev              # Ambos (necesita dos terminales)
npm run dev:server      # Solo backend
npm run dev:client      # Solo frontend

npm run build:all       # Compilar ambos para producción
npm start               # Iniciar servidor (producción)
```
