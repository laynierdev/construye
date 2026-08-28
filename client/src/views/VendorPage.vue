<template>
  <div class="vendor-page">
    <nav class="nav">
      <RouterLink to="/" class="nav-brand">
        <span class="nav-icon">🏗️</span>
        <span class="nav-logo">Construye</span>
      </RouterLink>
      <ThemeToggle />
    </nav>

    <div class="content">
      <div class="illustration">
        <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="wip-svg">
          <!-- Hard hat -->
          <ellipse cx="140" cy="180" rx="90" ry="18" fill="#FFD600" opacity="0.18"/>
          <rect x="60" y="120" width="160" height="60" rx="8" fill="#FFD600"/>
          <path d="M60 145 Q140 90 220 145" fill="#FFB300"/>
          <rect x="50" y="148" width="180" height="14" rx="7" fill="#FF8F00"/>
          <!-- Brim -->
          <rect x="38" y="154" width="204" height="10" rx="5" fill="#FFB300"/>
          <!-- Hard hat stripe -->
          <rect x="80" y="125" width="120" height="8" rx="4" fill="#fff" opacity="0.25"/>
          <!-- Gear left -->
          <g transform="translate(42,60)">
            <circle cx="28" cy="28" r="20" fill="none" stroke="#E67E22" stroke-width="5"/>
            <circle cx="28" cy="28" r="8" fill="#E67E22"/>
            <rect x="24" y="4" width="8" height="10" rx="4" fill="#E67E22"/>
            <rect x="24" y="42" width="8" height="10" rx="4" fill="#E67E22"/>
            <rect x="4" y="24" width="10" height="8" rx="4" fill="#E67E22"/>
            <rect x="42" y="24" width="10" height="8" rx="4" fill="#E67E22"/>
            <rect x="10" y="10" width="8" height="8" rx="3" fill="#E67E22" transform="rotate(45 14 14)"/>
            <rect x="38" y="10" width="8" height="8" rx="3" fill="#E67E22" transform="rotate(45 42 14)"/>
            <rect x="10" y="38" width="8" height="8" rx="3" fill="#E67E22" transform="rotate(45 14 42)"/>
            <rect x="38" y="38" width="8" height="8" rx="3" fill="#E67E22" transform="rotate(45 42 42)"/>
          </g>
          <!-- Gear right -->
          <g transform="translate(178,48)">
            <circle cx="24" cy="24" r="16" fill="none" stroke="#27AE60" stroke-width="4"/>
            <circle cx="24" cy="24" r="6" fill="#27AE60"/>
            <rect x="20" y="4" width="8" height="8" rx="4" fill="#27AE60"/>
            <rect x="20" y="36" width="8" height="8" rx="4" fill="#27AE60"/>
            <rect x="4" y="20" width="8" height="8" rx="4" fill="#27AE60"/>
            <rect x="36" y="20" width="8" height="8" rx="4" fill="#27AE60"/>
          </g>
          <!-- Wrench -->
          <g transform="translate(130,30) rotate(35)">
            <rect x="0" y="0" width="12" height="55" rx="5" fill="#7F8C8D"/>
            <path d="M-4 0 Q6 -14 16 0" fill="#95A5A6" stroke="#7F8C8D" stroke-width="2"/>
            <path d="M-4 55 Q6 69 16 55" fill="#95A5A6" stroke="#7F8C8D" stroke-width="2"/>
          </g>
          <!-- Dots decoration -->
          <circle cx="72" cy="200" r="5" fill="#E67E22" opacity="0.4"/>
          <circle cx="200" cy="210" r="4" fill="#3498DB" opacity="0.4"/>
          <circle cx="240" cy="85" r="6" fill="#9B59B6" opacity="0.3"/>
          <circle cx="35" cy="155" r="4" fill="#27AE60" opacity="0.4"/>
        </svg>
      </div>

      <div class="text-block">
        <span class="badge">Próximamente</span>
        <h1 class="title">Portal de Vendedores</h1>
        <p class="subtitle">
          Estamos construyendo algo increíble para ti. El acceso para proveedores y tiendas de materiales estará disponible muy pronto.
        </p>
        <div class="features-preview">
          <div class="feature-item">
            <span class="feat-icon">📦</span>
            <span>Gestión de inventario en tiempo real</span>
          </div>
          <div class="feature-item">
            <span class="feat-icon">📊</span>
            <span>Dashboard de ventas y pedidos</span>
          </div>
          <div class="feature-item">
            <span class="feat-icon">🤝</span>
            <span>Conexión directa con clientes</span>
          </div>
        </div>
        <RouterLink to="/" class="back-btn">
          ← Volver al inicio
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
</script>

<style scoped>
.vendor-page {
  min-height: 100vh;
  background-color: var(--bg-base);
  color: var(--text);
  font-family: inherit;
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.nav-icon {
  font-size: 1.6rem;
}

.nav-logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}

/* Content layout */
.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  gap: 5rem;
  min-height: calc(100vh - 80px);
}

@media (max-width: 700px) {
  .content {
    flex-direction: column;
    gap: 2.5rem;
    padding: 2.5rem 1.25rem;
    text-align: center;
  }
}

/* SVG illustration */
.illustration {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.wip-svg {
  width: 240px;
  height: 240px;
  filter: drop-shadow(0 0 40px rgba(230, 126, 34, 0.25));
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* Text block */
.text-block {
  flex: 1;
}

.badge {
  display: inline-block;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  padding: 0.3rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.title {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--text);
}

.subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 420px;
}

/* Feature preview list */
.features-preview {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.feat-icon {
  font-size: 1.1rem;
  width: 28px;
  flex-shrink: 0;
}

/* Back button */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  border: 1.5px solid var(--border-strong);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.back-btn:hover {
  border-color: var(--text);
  color: var(--text);
  background: var(--bg-card-hover);
}
</style>
