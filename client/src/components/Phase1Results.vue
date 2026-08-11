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
  gap: 1.25rem;
}

/* ─── Header ─── */
.results-header {
  border-radius: var(--radius);
  padding: 1.5rem;
  color: white;
}

.specialty-plumbing  { background: linear-gradient(135deg, #1a5276, #2980b9); }
.specialty-masonry   { background: linear-gradient(135deg, #4a4a4a, #7f8c8d); }
.specialty-electrical { background: linear-gradient(135deg, #9a6b00, #f39c12); }

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
  font-weight: 700;
  letter-spacing: -0.3px;
}

.results-subtitle {
  font-size: 0.875rem;
  opacity: 0.85;
  margin-top: 2px;
}

.results-badges {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}

.badge-ai {
  background: rgba(255,255,255,0.25);
  color: white;
  border: 1px solid rgba(255,255,255,0.4);
}

.badge-fallback {
  background: rgba(0,0,0,0.2);
  color: rgba(255,255,255,0.9);
}

/* ─── Cards ─── */
.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.1rem;
}

/* ─── Parts table ─── */
.table-wrapper {
  overflow-x: auto;
}

.parts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.parts-table th {
  background: var(--primary);
  color: white;
  padding: 0.65rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.parts-table td {
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.parts-table tbody tr:nth-child(even) td {
  background: #f8f9fa;
}

.parts-table tbody tr:hover td {
  background: #f0f4f8;
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
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--primary);
}

.gauge-badge {
  background: #e8f0fb;
  color: #2471a3;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.text-muted {
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* ─── Steps ─── */
.steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: #fafbfc;
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
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-text {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text);
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
  background: #fff8f0;
  border-left: 3px solid var(--accent);
  padding: 0.75rem 1rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text);
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
  background: #1a2f4a;
  color: #a8d8ea;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-sm);
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ─── Next phases ─── */
.card-next {
  border: 1px dashed var(--border);
  background: #fafbfc;
}

.next-phases-text {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.btn-phase2 {
  width: 100%;
  padding: 0.8rem;
  background: #dde1e7;
  color: #9aa3af;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
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
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-back:hover {
  background: var(--primary);
  color: white;
}
</style>
