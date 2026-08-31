<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <RouterLink to="/" class="brand-link">
          <span class="header-icon">🏗️</span>
          <div>
            <h1 class="header-title">Construye</h1>
            <p class="header-subtitle">Asistencia Técnica para el Hogar</p>
          </div>
        </RouterLink>
        <ThemeToggle />
      </div>
    </header>

    <main class="app-main">
      <div v-if="!apiResponse">
        <section class="section">
          <h2 class="section-title">¿En qué especialidad necesitas ayuda?</h2>
          <div class="specialty-grid">
            <button
              v-for="spec in specialties"
              :key="spec.value"
              type="button"
              class="specialty-card"
              :class="{ active: formData.specialty === spec.value, [`color-${spec.value}`]: true }"
              @click="selectSpecialty(spec.value)"
            >
              <span class="specialty-icon">{{ spec.icon }}</span>
              <span class="specialty-name">{{ spec.name }}</span>
              <span class="specialty-desc">{{ spec.description }}</span>
            </button>
          </div>
        </section>

        <section v-if="formData.specialty" class="section">
          <div class="form-card">
            <form @submit.prevent="handleSubmit">
              <div class="field-group">
                <label class="field-label">
                  ¿Qué trabajo quieres hacer?
                  <span class="required">*</span>
                </label>
                <textarea
                  v-model="formData.description"
                  class="field-input"
                  rows="3"
                  :placeholder="descriptionPlaceholder"
                  required
                ></textarea>
                <span class="field-hint">Cuanto más detallado, mejor será la recomendación de materiales.</span>
              </div>

              <div class="field-row">
                <div class="field-group">
                  <label class="field-label">
                    {{ distanceLabel }}
                    <span class="required">*</span>
                  </label>
                  <div class="input-with-unit">
                    <input
                      v-model.number="formData.distance"
                      type="number"
                      class="field-input"
                      placeholder="Ej: 10"
                      min="0.1"
                      step="0.5"
                      required
                    />
                    <span class="unit-badge">metros</span>
                  </div>
                </div>

                <div class="field-group">
                  <label class="field-label">Calibre / Grosor</label>
                  <input
                    v-model="formData.gauge"
                    type="text"
                    class="field-input"
                    :placeholder="gaugePlaceholder"
                  />
                  <span class="field-hint">Opcional — la IA lo recomendará si no lo especificas.</span>
                </div>
              </div>

              <div class="field-row" v-if="formData.specialty === 'masonry' || ['plumbing', 'electrical'].includes(formData.specialty)">
                <div v-if="formData.specialty === 'masonry'" class="field-group">
                  <label class="field-label">Cantidad de esquinas / ángulos</label>
                  <input
                    v-model.number="formData.cornerCount"
                    type="number"
                    class="field-input"
                    placeholder="Ej: 4"
                    min="0"
                  />
                </div>

                <div v-if="['plumbing', 'electrical'].includes(formData.specialty)" class="field-group">
                  <label class="field-label">{{ connectionLabel }}</label>
                  <input
                    v-model.number="formData.connectionCount"
                    type="number"
                    class="field-input"
                    placeholder="Ej: 3"
                    min="0"
                  />
                </div>
              </div>

              <div v-if="error" class="error-panel">
                <span>⚠️ {{ error }}</span>
                <button type="button" class="error-close" @click="error = ''">×</button>
              </div>

              <button type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="spinner"></span>
                {{ isLoading ? 'Analizando con IA...' : '✨ Generar lista de materiales' }}
              </button>
            </form>
          </div>
        </section>

        <div v-if="!formData.specialty" class="empty-hint">
          <p>👆 Selecciona una especialidad para comenzar</p>
        </div>
      </div>

      <Phase1Results
        v-else
        :response="apiResponse"
        @goBack="apiResponse = null"
      />
    </main>

  <button class="fab" @click="openSolicitudModal()" aria-label="Solicitar materiales">
    <span class="fab-icon">📨</span>
    <span class="fab-label">Solicitar materiales</span>
  </button>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import type { FormData, Phase1Response } from '../types';
import { sendPhase1Request } from '../utils/api';
import Phase1Results from '../components/Phase1Results.vue';
import { openSolicitudModal } from '../composables/useSolicitudModal';

const specialties = [
  {
    value: 'plumbing',
    icon: '🔧',
    name: 'Plomería',
    description: 'Tuberías, válvulas y conexiones de agua'
  },
  {
    value: 'masonry',
    icon: '🧱',
    name: 'Albañilería',
    description: 'Paredes, pisos y estructuras de concreto'
  },
  {
    value: 'electrical',
    icon: '⚡',
    name: 'Electricidad',
    description: 'Cables, circuitos e instalaciones eléctricas'
  }
] as const;

const formData = reactive<FormData>({
  specialty: '',
  distance: 10,
  gauge: '',
  description: '',
  cornerCount: 0,
  connectionCount: 2,
});

const apiResponse = ref<Phase1Response | null>(null);
const isLoading = ref(false);
const error = ref('');

const distanceLabel = computed(() => {
  if (formData.specialty === 'masonry') return 'Longitud del trabajo';
  return 'Longitud / Distancia';
});

const gaugePlaceholder = computed(() => {
  const map: Record<string, string> = {
    plumbing: 'Ej: 1/2", 3/4", 1"',
    masonry: 'Ej: #4, #6 (varilla)',
    electrical: 'Ej: 14 AWG, 12 AWG'
  };
  return map[formData.specialty] ?? 'Especificación técnica';
});

const connectionLabel = computed(() => {
  if (formData.specialty === 'electrical') return 'Cantidad de circuitos / derivaciones';
  return 'Cantidad de derivaciones / salidas';
});

const descriptionPlaceholder = computed(() => {
  const map: Record<string, string> = {
    plumbing: 'Ej: Quiero instalar un fregadero y conectarlo a la tubería principal. El baño está a unos 8 metros de la llave.',
    masonry: 'Ej: Quiero levantar una pared de bloques de 5 metros de largo y 2.5 de alto para separar dos cuartos.',
    electrical: 'Ej: Necesito cablear una habitación con 3 tomas de corriente y 2 puntos de luz desde el panel principal.'
  };
  return map[formData.specialty] ?? 'Describe con tus palabras el trabajo que necesitas hacer...';
});

function selectSpecialty(value: string) {
  formData.specialty = value as FormData['specialty'];
  formData.distance = 10;
  formData.gauge = '';
  formData.description = '';
  formData.cornerCount = 0;
  formData.connectionCount = 2;
  error.value = '';
}

async function handleSubmit() {
  if (!formData.specialty) {
    error.value = 'Selecciona una especialidad.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await sendPhase1Request(formData);
    apiResponse.value = response;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido al procesar la solicitud.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--bg-base);
}

/* ─── Header ─── */
.app-header {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--nav-border);
  padding: 1.1rem 1.5rem;
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

.header-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.5px;
}

.header-subtitle {
  font-size: 0.78rem;
  color: var(--text-faint);
  margin-top: 1px;
}

/* ─── Main ─── */
.app-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem;
}

/* ─── Sections ─── */
.section {
  margin-bottom: 1.75rem;
}

.section-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

/* ─── Specialty cards ─── */
.specialty-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 600px) {
  .specialty-grid { grid-template-columns: 1fr; }
}

.specialty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  gap: 0.4rem;
  font-family: inherit;
  box-shadow: var(--shadow-sm);
}

.specialty-card:hover {
  border-color: var(--accent-border);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}

.specialty-card.active {
  border-color: var(--accent);
  background: var(--accent-subtle);
  box-shadow: 0 0 0 1px var(--accent-border), var(--shadow-md);
}

.specialty-card.color-plumbing.active {
  border-color: var(--plumbing);
  background: var(--accent-subtle);
}
.specialty-card.color-masonry.active {
  border-color: var(--masonry);
  background: var(--bg-card-hover);
}
.specialty-card.color-electrical.active {
  border-color: var(--electrical);
  background: var(--accent-subtle);
}

.specialty-icon {
  font-size: 2rem;
  line-height: 1;
}

.specialty-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.specialty-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* ─── Form card ─── */
.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
}

/* ─── Fields ─── */
.field-group {
  margin-bottom: 1.25rem;
}

.field-label {
  display: block;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.required {
  color: #e05252;
  margin-left: 2px;
}

.field-input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--text);
  background: var(--bg-input);
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  resize: vertical;
}

.field-input::placeholder {
  color: var(--text-faint);
}

.field-input:focus {
  outline: none;
  border-color: var(--accent-border);
  background: var(--bg-card-hover);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.field-hint {
  display: block;
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 0.35rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .field-row { grid-template-columns: 1fr; }
}

.input-with-unit {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-unit .field-input {
  padding-right: 4.5rem;
}

.unit-badge {
  position: absolute;
  right: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-faint);
  pointer-events: none;
}

/* ─── Error ─── */
.error-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: rgba(224,82,82,0.1);
  border: 1px solid rgba(224,82,82,0.3);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #c0392b;
}

.error-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #f08080;
  padding: 0 0.25rem;
  line-height: 1;
  flex-shrink: 0;
}

/* ─── Submit ─── */
.submit-btn {
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: inherit;
  letter-spacing: 0.2px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(230,126,34,0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-hint {
  text-align: center;
  padding: 2.5rem;
  color: var(--text-faint);
  font-size: 0.95rem;
}

/* ─── FAB ─── */
.fab {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: none;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 4px 20px rgba(196, 85, 0, 0.4);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  z-index: 50;
}

.fab:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(196, 85, 0, 0.5);
}

.fab-icon { font-size: 1rem; }

@media (max-width: 500px) {
  .fab-label { display: none; }
  .fab { padding: 0.85rem; border-radius: 50%; }
  .fab-icon { font-size: 1.2rem; }
}
</style>
