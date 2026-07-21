<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 900px; margin: 0 auto;">
      <header class="w3-container w3-light-green">
        <h2>✅ Assistant Results</h2>
      </header>

      <div class="w3-container w3-padding">
        <div class="w3-panel w3-light-blue">
          <h3 class="w3-text-teal">Specialty: <b>{{ getSpecialtyName(response.specialty) }}</b></h3>
        </div>

        <h3 class="w3-text-teal">📦 Required Parts</h3>
        <table class="w3-table w3-striped w3-bordered w3-margin-bottom">
          <thead>
            <tr class="w3-teal">
              <th>Part</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Gauge/Specification</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(part, index) in response.parts" :key="index">
              <td>{{ part.name }}</td>
              <td class="w3-center">{{ part.quantity }}</td>
              <td>{{ part.unit }}</td>
              <td>{{ part.gauge }}</td>
            </tr>
          </tbody>
        </table>

        <h3 class="w3-text-teal">📋 Installation Instructions</h3>
        <div class="w3-panel w3-light-yellow w3-padding">
          <pre style="white-space: pre-wrap; font-family: monospace;">{{ response.instructions }}</pre>
        </div>

        <h3 class="w3-text-teal">🔌 Conceptual Diagram</h3>
        <div class="w3-panel w3-light-gray w3-padding">
          <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; background-color: #f9f9f9; padding: 10px;">{{ response.conceptualDiagram }}</pre>
        </div>

        <h3 class="w3-text-teal">🚀 Next Phases</h3>
        <div class="w3-panel w3-light-green">
          <p>{{ response.nextPhases }}</p>
        </div>

        <div class="w3-section">
          <button
            disabled
            class="w3-button w3-gray w3-block w3-margin-bottom"
            title="This feature will be available in Phase 2"
          >
            🔍 Search Parts and Calculate Budget (Phase 2)
          </button>
          <p class="w3-text-gray w3-small">
            <i>This functionality will be enabled in Phase 2, where parts will be searched in nearby inventories, budgets will be calculated, and nearby stores will be displayed.</i>
          </p>
        </div>

        <button
          @click="$emit('goBack')"
          class="w3-button w3-teal w3-block"
        >
          ← Return to Form
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Phase1Response } from '../types';

defineProps<{
  response: Phase1Response;
}>();

defineEmits<{
  goBack: [];
}>();

function getSpecialtyName(code: string): string {
  const map: Record<string, string> = {
    plumbing: '🔧 Plumbing',
    masonry: '🧱 Masonry',
    electrical: '⚡ Electrical',
  };
  return map[code] || code;
}
</script>

<style scoped>
pre {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
