<template>
  <div class="results">
    <!-- Header -->
    <div class="results-header" :class="`specialty-${response.specialty}`">
      <div class="results-header-content">
        <div class="results-title-row">
          <span class="results-specialty-icon">{{ specialtyIcon }}</span>
          <div>
            <h2 class="results-title">Lista de Materiales</h2>
            <p class="results-subtitle">{{ specialtyName }} · {{ response.parts.length }} tipos de piezas</p>
          </div>
        </div>
        <div class="results-badges">
          <span class="badge" :class="response.aiGenerated ? 'badge-ai' : 'badge-fallback'">
            {{ response.aiGenerated ? '✨ Generado por IA' : '📋 Cálculo estándar' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Parts table -->
    <div class="card">
      <h3 class="card-title">📦 Piezas Requeridas</h3>
      <div class="table-wrapper">
        <table class="parts-table">
          <thead>
            <tr>
              <th>Pieza</th>
              <th class="col-qty">Cantidad</th>
              <th class="col-unit">Unidad</th>
              <th class="col-gauge">Calibre / Grosor</th>
              <th class="col-notes">Notas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(part, i) in response.parts" :key="i">
              <td class="part-name">{{ part.name }}</td>
              <td class="col-qty quantity">{{ part.quantity }}</td>
              <td class="col-unit">{{ part.unit }}</td>
              <td class="col-gauge">
                <span v-if="part.gauge" class="gauge-badge">{{ part.gauge }}</span>
                <span v-else class="text-muted">—</span>
              </td>
              <td class="col-notes text-muted">{{ part.notes || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Instructions -->
    <div class="card">
      <h3 class="card-title">📋 Pasos de Instalación</h3>
      <ol class="steps-list">
        <li
          v-for="(step, i) in cleanedInstructions"
          :key="i"
          class="step-item"
        >
          <span class="step-number">{{ i + 1 }}</span>
          <span class="step-text">{{ step }}</span>
        </li>
      </ol>
    </div>

    <!-- Tips -->
    <div v-if="response.tips && response.tips.length" class="card">
      <h3 class="card-title">💡 Consejos Importantes</h3>
      <div class="tips-grid">
        <div v-for="(tip, i) in response.tips" :key="i" class="tip-card">
          <span class="tip-dot"></span>
          <span>{{ tip }}</span>
        </div>
      </div>
    </div>

    <!-- Diagram -->
    <div v-if="response.conceptualDiagram" class="card">
      <h3 class="card-title">🔌 Esquema del Sistema</h3>
      <div class="diagram-box">{{ response.conceptualDiagram }}</div>
    </div>

    <!-- Next phases -->
    <div class="card card-next">
      <h3 class="card-title">🚀 Próximas Fases</h3>
      <p class="next-phases-text">{{ response.nextPhases }}</p>
      <button disabled class="btn-phase2">
        🔍 Buscar Piezas y Calcular Presupuesto (Fase 2 — Próximamente)
      </button>
    </div>

    <!-- Actions -->
    <div class="actions">
      <button class="btn-back" @click="$emit('goBack')">
        ← Volver al formulario
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Phase1Response } from '../types';

const props = defineProps<{
  response: Phase1Response;
}>();

defineEmits<{ goBack: [] }>();

const SPECIALTY_ICONS: Record<string, string> = {
  plumbing: '🔧',
  masonry: '🧱',
  electrical: '⚡'
};

const SPECIALTY_NAMES: Record<string, string> = {
  plumbing: 'Plomería',
  masonry: 'Albañilería',
  electrical: 'Electricidad'
};

const specialtyIcon = computed(() => SPECIALTY_ICONS[props.response.specialty] ?? '🏗️');
const specialtyName = computed(() => SPECIALTY_NAMES[props.response.specialty] ?? props.response.specialty);

// Strip "Paso N:" prefix if the AI already included it, to avoid showing "1. Paso 1: ..."
const cleanedInstructions = computed(() =>
  props.response.instructions.map((step) => step.replace(/^Paso\s+\d+[:.]\s*/i, '').trim())
);
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ─── Header ─── */
.results-header {
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.specialty-plumbing   { background: var(--sp-plumbing-bg);   border: 1px solid var(--sp-plumbing-border); }
.specialty-masonry    { background: var(--sp-masonry-bg);    border: 1px solid var(--sp-masonry-border); }
.specialty-electrical { background: var(--sp-electrical-bg); border: 1px solid var(--sp-electrical-border); }

.results-header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.results-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.results-specialty-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.results-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--sp-text);
}

.results-subtitle {
  font-size: 0.85rem;
  opacity: 0.65;
  margin-top: 2px;
  color: var(--sp-text);
}

.results-badges {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.badge {
  font-size: 0.73rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
}

.badge-ai {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.2);
}

.badge-fallback {
  background: rgba(0,0,0,0.25);
  color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.1);
}

/* ─── Cards ─── */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.1rem;
}

/* ─── Parts table ─── */
.table-wrapper {
  overflow-x: auto;
}

.parts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.parts-table th {
  background: var(--bg-elevated);
  color: var(--text-muted);
  padding: 0.6rem 1rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  white-space: nowrap;
  border-bottom: 1px solid var(--border-subtle);
}

.parts-table td {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  color: var(--text-muted);
}

.parts-table tbody tr:last-child td {
  border-bottom: none;
}

.parts-table tbody tr:hover td {
  background: var(--bg-card-hover);
}

.part-name {
  font-weight: 600;
  color: var(--text);
}

.col-qty   { text-align: center; width: 80px; }
.col-unit  { width: 110px; }
.col-gauge { width: 130px; }
.col-notes { font-size: 0.82rem; }

.quantity {
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--accent);
}

.gauge-badge {
  background: rgba(59,150,212,0.15);
  color: #6ab8e8;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  white-space: nowrap;
  border: 1px solid rgba(59,150,212,0.2);
}

.text-muted {
  color: var(--text-faint);
  font-size: 0.85rem;
}

/* ─── Steps ─── */
.steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card-hover);
  transition: border-color 0.2s;
}

.step-item:hover {
  border-color: var(--accent-border);
}

.step-number {
  background: var(--accent);
  color: white;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ─── Tips ─── */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
}

.tip-card {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: var(--accent-subtle);
  border-left: 3px solid var(--accent);
  padding: 0.85rem 1rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.tip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 5px;
}

/* ─── Diagram ─── */
.diagram-box {
  background: rgba(10,20,35,0.8);
  color: #7ecbe8;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(59,150,212,0.15);
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 0.88rem;
  line-height: 1.75;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ─── Next phases ─── */
.card-next {
  border: 1px dashed var(--border);
  background: var(--bg-card);
}

.next-phases-text {
  font-size: 0.875rem;
  color: var(--text-faint);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.btn-phase2 {
  width: 100%;
  padding: 0.8rem;
  background: var(--bg-card-hover);
  color: var(--text-faint);
  border: 1px dashed var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: not-allowed;
  font-family: inherit;
}

/* ─── Actions ─── */
.actions {
  padding-bottom: 1rem;
}

.btn-back {
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-back:hover {
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--bg-card-hover);
}
</style>
