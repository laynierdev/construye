# 🎨 Construye - Frontend

Frontend for the **Construye** platform built with **Vue.js 3**, **Vite**, and **W3.CSS**.

## 📋 Features

- ✅ Vue.js 3 with the Composition API
- ✅ Vite for fast development
- ✅ TypeScript
- ✅ W3.CSS for lightweight styling
- ✅ Responsive design
- ✅ Modular components

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

The compiled files will be in the `dist/` folder

### Preview de Build

```bash
npm run preview
```

## 📂 Folder Structure

```
src/
├── components/          # Vue components
│   └── ResultadosFase1.vue
├── types/              # TypeScript definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── api.ts         # HTTP calls
├── App.vue            # Root component
└── main.ts            # Entry point

public/               # Static files
index.html           # Main HTML file
```

## 🎯 Components

### App.vue
**Main component** with:
- Specialty selection form
- Dynamic fields based on the specialty
- Request submission to the server
- Error handling and loading state

### ResultadosFase1.vue
**Results component** that shows:
- A table of required parts
- Installation instructions
- The conceptual diagram
- The search-parts button (disabled in Phase 1)

## 🔌 API Integration

### `src/utils/api.ts`

Main function: `sendPhase1Request(data: FormData)`

```typescript
const response = await sendPhase1Request({
  specialty: 'plumbing',
  distance: 10,
  gauge: '1/2"',
  cornerCount: 0,
  connectionCount: 2
});
```

## 🎨 Styles (W3.CSS)

**W3.CSS** (https://www.w3schools.com/w3css/) is used for:
- Responsive layout
- Predefined components
- No heavy dependencies
- Small footprint

**Main colors:**
- Teal (`w3-teal`): primary actions
- Green (`w3-light-green`): success
- Blue (`w3-light-blue`): information
- Yellow (`w3-light-yellow`): warnings
- Red (`w3-red`): errors

## 🌐 CORS Configuration

In `vite.config.ts`, calls to `/api/*` are automatically redirected to `http://localhost:3000`:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

## 📦 Dependencies

- `vue@^3.4.0`: reactive framework
- `vite@^5.0.0`: build tool
- `typescript@^5.0.0`: type checking

## 🚀 Typical Workflow

1. User selects a specialty from the dropdown
2. Dynamic fields appear based on the specialty
3. User completes the form
4. Clicks "Generate Assistance"
5. Sends a POST request to `/api/v1/phase1/assistant`
6. The response is shown in a parts table with instructions
7. User can click "Back" for a new calculation

## 🔄 Next Steps (Phase 2)

- [ ] Enable the "Search Parts and Calculate Budget" button
- [ ] Show nearby store mapping
- [ ] Integrate the checkout system
- [ ] User authentication
- [ ] Project history

## 📝 Variables de Entorno

Crear `.env` (o usar `.env.example`):

```
VITE_API_URL=http://localhost:3000
```

## 🛠️ Troubleshooting

### The server is not connecting
- Verify that the backend is running at `http://localhost:3000`
- Check the browser console for CORS issues

### Styles are not loading
- Make sure W3.CSS is imported in `index.html`

---

**Last updated:** July 2026
