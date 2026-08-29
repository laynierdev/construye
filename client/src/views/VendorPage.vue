<template>
  <div class="vendor-page">

    <nav class="nav">
      <RouterLink to="/" class="nav-brand">
        <span class="nav-icon">🏗️</span>
        <span class="nav-logo">Construye</span>
      </RouterLink>
      <ThemeToggle />
    </nav>

    <div class="page-content">

      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'publicar' }"
          @click="switchTab('publicar')"
        >
          📦 Publicar pieza
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'solicitudes' }"
          @click="switchTab('solicitudes')"
        >
          📋 Solicitudes
        </button>
      </div>

      <!-- ── PUBLICAR PIEZA ─────────────────────────── -->
      <section v-if="activeTab === 'publicar'" class="section">
        <h2 class="section-title">Publicar pieza disponible</h2>

        <div v-if="publishSuccess" class="success-banner">
          ✅ Pieza publicada correctamente.
        </div>
        <div v-if="publishError" class="error-banner">⚠️ {{ publishError }}</div>

        <form class="form-card" @submit.prevent="handlePublish">
          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Nombre de la pieza <span class="req">*</span></label>
              <input v-model="form.nombre" class="field-input" type="text" placeholder="Ej: Tubo PVC" required />
            </div>
            <div class="field-group">
              <label class="field-label">Calibre / Grosor</label>
              <input v-model="form.calibre" class="field-input" type="text" placeholder='Ej: 1/2", 14 AWG' />
            </div>
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Stock disponible <span class="req">*</span></label>
              <input v-model.number="form.stock" class="field-input" type="number" min="1" placeholder="Ej: 50" required />
            </div>
            <div class="field-group">
              <label class="field-label">Provincia <span class="req">*</span></label>
              <select v-model="form.provincia" class="field-input" required @change="form.municipio = ''">
                <option value="" disabled>Seleccionar...</option>
                <option v-for="p in PROVINCIAS" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Municipio <span class="req">*</span></label>
              <select v-model="form.municipio" class="field-input" required :disabled="!form.provincia">
                <option value="" disabled>{{ form.provincia ? 'Seleccionar...' : 'Primero elige provincia' }}</option>
                <option v-for="m in municipiosForm" :key="m" :value="m">{{ m }}</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Teléfono del vendedor <span class="req">*</span></label>
              <input v-model="form.telefonoVendedor" class="field-input" type="tel" placeholder="Ej: 55551234" required />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Nombre del vendedor</label>
            <input
              v-model="form.nombreVendedor"
              class="field-input"
              type="text"
              placeholder="Se mostrará como vendedor_0001 si se deja vacío"
            />
          </div>

          <button type="submit" class="submit-btn" :disabled="publishing">
            <span v-if="publishing" class="spinner"></span>
            {{ publishing ? 'Publicando...' : '📦 Publicar pieza' }}
          </button>
        </form>
      </section>

      <!-- ── SOLICITUDES ────────────────────────────── -->
      <section v-else class="section">
        <h2 class="section-title">Solicitudes de clientes</h2>

        <div v-if="loadingSolicitudes" class="loading-msg">Cargando solicitudes...</div>
        <div v-else-if="solicitudesError" class="error-banner">⚠️ {{ solicitudesError }}</div>
        <div v-else-if="solicitudes.length === 0" class="empty-msg">
          No hay solicitudes registradas aún.
        </div>
        <div v-else class="cards-grid">
          <div v-for="s in solicitudes" :key="s.id" class="sol-card">
            <div class="sol-header">
              <span class="sol-pieza">{{ s.piezaNombre }}</span>
              <span class="badge" :class="s.prefiereMensajeria ? 'badge-msg' : 'badge-pickup'">
                {{ s.prefiereMensajeria ? '💬 Prefiere mensajería' : '🤝 Puede recoger' }}
              </span>
            </div>
            <div class="sol-meta">
              <span v-if="s.calibre" class="meta-item">Calibre: <strong>{{ s.calibre }}</strong></span>
              <span class="meta-item">Cantidad: <strong>{{ s.cantidad }}</strong></span>
            </div>
            <p v-if="s.nota" class="sol-nota">{{ s.nota }}</p>
            <div class="sol-footer">
              <span class="sol-date">{{ formatDate(s.createdAt) }}</span>
              <a
                :href="`https://wa.me/${s.telefonoCliente}?text=Hola%2C%20vi%20tu%20solicitud%20en%20Construye...`"
                target="_blank"
                rel="noopener"
                class="wa-btn"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import { PROVINCIAS, getMunicipios } from '../data/ubicaciones';
import { postPieza, fetchSolicitudes, type Solicitud } from '../utils/api';

const activeTab = ref<'publicar' | 'solicitudes'>('publicar');

// ── Form state ──────────────────────────────────────────
const form = ref({
  nombre: '',
  calibre: '',
  stock: null as number | null,
  provincia: '',
  municipio: '',
  telefonoVendedor: '',
  nombreVendedor: '',
});

const publishing = ref(false);
const publishSuccess = ref(false);
const publishError = ref('');

const municipiosForm = computed(() => getMunicipios(form.value.provincia));

async function handlePublish() {
  publishing.value = true;
  publishSuccess.value = false;
  publishError.value = '';
  try {
    await postPieza({
      nombre: form.value.nombre,
      calibre: form.value.calibre || undefined,
      stock: form.value.stock ?? 0,
      provincia: form.value.provincia,
      municipio: form.value.municipio,
      telefonoVendedor: form.value.telefonoVendedor,
      nombreVendedor: form.value.nombreVendedor || undefined,
    });
    publishSuccess.value = true;
    form.value = { nombre: '', calibre: '', stock: null, provincia: '', municipio: '', telefonoVendedor: '', nombreVendedor: '' };
  } catch (err) {
    publishError.value = err instanceof Error ? err.message : 'Error desconocido';
  } finally {
    publishing.value = false;
  }
}

// ── Solicitudes state ───────────────────────────────────
const solicitudes = ref<Solicitud[]>([]);
const loadingSolicitudes = ref(false);
const solicitudesError = ref('');

async function loadSolicitudes() {
  loadingSolicitudes.value = true;
  solicitudesError.value = '';
  try {
    solicitudes.value = await fetchSolicitudes();
  } catch (err) {
    solicitudesError.value = err instanceof Error ? err.message : 'Error al cargar solicitudes';
  } finally {
    loadingSolicitudes.value = false;
  }
}

function switchTab(tab: 'publicar' | 'solicitudes') {
  activeTab.value = tab;
  if (tab === 'solicitudes' && solicitudes.value.length === 0) {
    loadSolicitudes();
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CU', { day: 'numeric', month: 'short', year: 'numeric' });
}

onMounted(() => {
  // Pre-load solicitudes in background
  loadSolicitudes();
});
</script>

<style scoped>
.vendor-page {
  min-height: 100vh;
  background-color: var(--bg-base);
  color: var(--text);
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 40;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.nav-icon { font-size: 1.5rem; }

.nav-logo {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.3px;
}

/* Page layout */
.page-content {
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0;
}

.tab {
  padding: 0.65rem 1.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  margin-bottom: -1px;
}

.tab:hover { color: var(--text); }
.tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* Section */
.section-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1.5rem;
  letter-spacing: -0.3px;
}

/* Form */
.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 580px) {
  .field-row { grid-template-columns: 1fr; }
}

.field-group { display: flex; flex-direction: column; gap: 0.35rem; }

.field-label {
  font-size: 0.8rem;
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

.submit-btn {
  width: 100%;
  padding: 0.85rem;
  margin-top: 1.25rem;
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
  transition: background 0.2s, transform 0.15s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Banners */
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
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

/* Solicitudes */
.loading-msg, .empty-msg {
  text-align: center;
  padding: 3rem;
  color: var(--text-faint);
  font-size: 0.95rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.sol-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.sol-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sol-pieza {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  white-space: nowrap;
}

.badge-msg {
  background: var(--accent-subtle);
  color: var(--accent-text);
  border: 1px solid var(--accent-border);
}

.badge-pickup {
  background: rgba(39,174,96,0.1);
  color: #27ae60;
  border: 1px solid rgba(39,174,96,0.25);
}

.sol-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.sol-nota {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
  background: var(--bg-card-hover);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  border-left: 3px solid var(--accent-border);
}

.sol-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.sol-date {
  font-size: 0.75rem;
  color: var(--text-faint);
}

.wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: #25d366;
  color: #fff;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.wa-btn:hover { background: #1daa52; }
</style>
