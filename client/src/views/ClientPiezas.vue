<template>
  <div class="client-piezas">

    <header class="app-header">
      <div class="header-content">
        <RouterLink to="/" class="brand-link">
          <span class="header-icon">🏗️</span>
          <div>
            <h1 class="header-title">Construye</h1>
            <p class="header-subtitle">Buscar piezas disponibles</p>
          </div>
        </RouterLink>
        <ThemeToggle />
      </div>
    </header>

    <main class="main">

      <!-- Solicitar materiales CTA -->
      <div class="solicitar-cta">
        <div class="solicitar-cta-text">
          <strong>¿No encuentras lo que necesitas?</strong>
          <span>Publica una solicitud y los vendedores te contactarán.</span>
        </div>
        <button class="solicitar-cta-btn" @click="openSolicitudModal()">
          📨 Solicitar materiales
        </button>
      </div>

      <!-- Filter bar -->
      <div class="filter-card">
        <h2 class="filter-title">¿Qué estás buscando?</h2>
        <div class="filter-row">
          <div class="field-group">
            <label class="field-label">Provincia <span class="req">*</span></label>
            <select v-model="filtro.provincia" class="field-input" @change="filtro.municipio = ''">
              <option value="" disabled>Seleccionar provincia...</option>
              <option v-for="p in PROVINCIAS" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Municipio</label>
            <select v-model="filtro.municipio" class="field-input" :disabled="!filtro.provincia">
              <option value="">Todos los municipios</option>
              <option v-for="m in municipiosFiltro" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <button class="search-btn" :disabled="!filtro.provincia || searching" @click="buscar">
            <span v-if="searching" class="spinner"></span>
            {{ searching ? 'Buscando...' : '🔍 Buscar' }}
          </button>
        </div>
        <div v-if="searchError" class="error-banner">⚠️ {{ searchError }}</div>
      </div>

      <!-- Results -->
      <div v-if="searched">
        <p class="results-count">
          <template v-if="piezas.length === 0">Sin resultados para los filtros seleccionados.</template>
          <template v-else>{{ piezas.length }} pieza{{ piezas.length !== 1 ? 's' : '' }} encontrada{{ piezas.length !== 1 ? 's' : '' }}</template>
        </p>
        <div class="cards-grid">
          <div v-for="p in piezas" :key="p.id" class="pieza-card">
            <div class="pieza-header">
              <span class="pieza-nombre">{{ p.nombre }}</span>
              <span v-if="p.calibre" class="calibre-badge">{{ p.calibre }}</span>
            </div>
            <div class="pieza-meta">
              <span class="meta-item">📦 Stock: <strong>{{ p.stock }}</strong></span>
              <span class="meta-item">📍 {{ p.municipio }}, {{ p.provincia }}</span>
            </div>
            <div class="pieza-vendedor">
              <span class="vendedor-name">{{ p.vendedor.nombre ?? 'Vendedor' }}</span>
              <span class="vendedor-tel">📞 {{ p.vendedor.telefono }}</span>
            </div>
            <button class="solicitar-btn" @click="openSolicitudModal({ piezaNombre: p.nombre, calibre: p.calibre ?? '' })">
              Solicitar →
            </button>
          </div>
        </div>
      </div>

    </main>


  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import { PROVINCIAS, getMunicipios } from '../data/ubicaciones';
import { fetchPiezas, type Pieza } from '../utils/api';
import { openSolicitudModal } from '../composables/useSolicitudModal';

// ── Filter ──────────────────────────────────────────────
const filtro = ref({ provincia: '', municipio: '' });
const piezas = ref<Pieza[]>([]);
const searching = ref(false);
const searched = ref(false);
const searchError = ref('');

const municipiosFiltro = computed(() => getMunicipios(filtro.value.provincia));

async function buscar() {
  if (!filtro.value.provincia) return;
  searching.value = true;
  searched.value = false;
  searchError.value = '';
  try {
    piezas.value = await fetchPiezas(filtro.value.provincia, filtro.value.municipio || undefined);
    searched.value = true;
  } catch (err) {
    searchError.value = err instanceof Error ? err.message : 'Error al buscar';
  } finally {
    searching.value = false;
  }
}

</script>

<style scoped>
.client-piezas {
  min-height: 100vh;
  background-color: var(--bg-base);
  color: var(--text);
}

/* Header */
.app-header {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--nav-border);
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.header-icon { font-size: 1.8rem; }

.header-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.5px;
}

.header-subtitle {
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 1px;
}

/* Main */
.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
}

/* Filter card */
.filter-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.filter-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-row .field-group { flex: 1; min-width: 160px; }

.field-group { display: flex; flex-direction: column; gap: 0.35rem; }

.field-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
}

.req { color: #e05252; }

.field-input {
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-input::placeholder { color: var(--text-faint); }
.field-input:focus {
  outline: none;
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.field-input:disabled { opacity: 0.5; cursor: not-allowed; }

select.field-input {
  background-color: var(--bg-elevated);
  color: var(--text);
}
select.field-input option {
  background-color: var(--bg-elevated);
  color: var(--text);
}

.search-btn {
  padding: 0.6rem 1.5rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;
  align-self: flex-end;
}

.search-btn:hover:not(:disabled) { background: var(--accent-hover); }
.search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Results */
.results-count {
  font-size: 0.82rem;
  color: var(--text-faint);
  margin-bottom: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1rem;
}

.pieza-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: border-color 0.2s, transform 0.15s;
}

.pieza-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.pieza-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pieza-nombre {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.calibre-badge {
  background: rgba(59,150,212,0.15);
  color: #6ab8e8;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 5px;
  border: 1px solid rgba(59,150,212,0.2);
  white-space: nowrap;
}

.pieza-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.pieza-vendedor {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-subtle);
}

.vendedor-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
}

.vendedor-tel {
  font-size: 0.78rem;
  color: var(--text-faint);
}

.solicitar-btn {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.25rem;
  background: var(--accent-subtle);
  color: var(--accent-text);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}

.solicitar-btn:hover {
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border-color: var(--accent-btn);
}

/* Solicitar CTA bar */
.solicitar-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.solicitar-cta-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.solicitar-cta-text strong {
  color: var(--text);
  font-weight: 700;
}

.solicitar-cta-btn {
  padding: 0.6rem 1.25rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: none;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.2s;
}

.solicitar-cta-btn:hover { background: var(--accent-hover); }

/* Modal (removed — now global via SolicitudModal.vue) */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.modal-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.3px;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.15s;
}

.modal-close:hover { color: var(--text); }

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .field-row { grid-template-columns: 1fr; }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) { background: var(--accent-hover); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.modal-done-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: var(--bg-card-hover);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}

.modal-done-btn:hover { background: var(--bg-elevated); }

/* Shared banners */
.success-banner {
  background: rgba(39,174,96,0.12);
  border: 1px solid rgba(39,174,96,0.3);
  color: #27ae60;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.error-banner {
  background: rgba(224,82,82,0.1);
  border: 1px solid rgba(224,82,82,0.3);
  color: #c0392b;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
