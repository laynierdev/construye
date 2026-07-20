# 🎨 Construye - Frontend

Frontend de la plataforma **Construye** construido con **Vue.js 3**, **Vite** y **W3.CSS**.

## 📋 Características

- ✅ Vue.js 3 con Composition API
- ✅ Vite para desarrollo rápido
- ✅ TypeScript
- ✅ W3.CSS para estilos ligeros
- ✅ Responsive design
- ✅ Componentes modulares

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Preview de Build

```bash
npm run preview
```

## 📂 Estructura de Carpetas

```
src/
├── components/          # Componentes Vue
│   └── ResultadosFase1.vue
├── types/              # Definiciones TypeScript
│   └── index.ts
├── utils/              # Funciones utilitarias
│   └── api.ts         # Llamadas HTTP
├── App.vue            # Componente raíz
└── main.ts            # Punto de entrada

public/               # Archivos estáticos
index.html           # HTML principal
```

## 🎯 Componentes

### App.vue
**Componente principal** con:
- Formulario de selección de especialidad
- Campos dinámicos según especialidad
- Envío de solicitud a servidor
- Manejo de errores y estado de carga

### ResultadosFase1.vue
**Componente de resultados** que muestra:
- Lista de piezas requeridas en tabla
- Instrucciones de instalación
- Esquema conceptual/diagrama
- Botón de buscar piezas (deshabilitado en Fase 1)

## 🔌 API Integration

### `src/utils/api.ts`

Función principal: `enviarSolicitudFase1(data: FormData)`

```typescript
const respuesta = await enviarSolicitudFase1({
  especialidad: 'plomeria',
  distancia: 10,
  calibre: '1/2"',
  cantidadEsquinas: 0,
  cantidadDerivaciones: 2
});
```

## 🎨 Estilos (W3.CSS)

Se utiliza **W3.CSS** (https://www.w3schools.com/w3css/) para:
- Layout responsivo
- Componentes predefinidos
- Sin dependencias pesadas
- Tamaño mínimo

**Colores principales:**
- Teal (`w3-teal`): Acciones principales
- Green (`w3-light-green`): Éxito
- Blue (`w3-light-blue`): Información
- Yellow (`w3-light-yellow`): Advertencias
- Red (`w3-red`): Errores

## 🌐 Configuración de CORS

En `vite.config.ts`, las llamadas a `/api/*` se redirigen automáticamente a `http://localhost:3000`:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

## 📦 Dependencias

- `vue@^3.4.0`: Framework reactivo
- `vite@^5.0.0`: Build tool
- `typescript@^5.0.0`: Type checking

## 🚀 Workflow Típico

1. Usuario selecciona especialidad en dropdown
2. Campos dinámicos se mostrar según especialidad
3. Usuario completa formulario
4. Click en "Generar Asistencia"
5. Request POST a `/api/v1/fase1/asistente`
6. Respuesta se muestra en tabla de piezas + instrucciones
7. Usuario puede hacer click en "Volver" para nuevo cálculo

## 🔄 Próximos Pasos (Fase 2)

- [ ] Habilitar botón "Buscar Piezas y Calcular Presupuesto"
- [ ] Mostrar mapeo de tiendas cercanas
- [ ] Integración con sistema de checkout
- [ ] Autenticación de usuarios
- [ ] Historial de proyectos

## 📝 Variables de Entorno

Crear `.env` (o usar `.env.example`):

```
VITE_API_URL=http://localhost:3000
```

## 🛠️ Troubleshooting

### El servidor no se conecta
- Verificar que backend está corriendo en `http://localhost:3000`
- Revisar consola del navegador para CORS issues

### Estilos no se cargan
- Asegurarse que W3.CSS está siendo importado en `index.html`

---

**Última actualización:** Julio 2026
