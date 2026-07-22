<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 900px; margin: 0 auto;">
      <header class="w3-container w3-light-green">
        <h2>✅ {{ t('resultsTitle') }}</h2>
      </header>

      <div class="w3-container w3-padding">
        <div class="w3-panel w3-light-blue">
          <h3 class="w3-text-teal">{{ t('resultsSpecialty') }}: <b>{{ getSpecialtyName(response.specialty) }}</b></h3>
        </div>

        <h3 class="w3-text-teal">📦 {{ t('requiredParts') }}</h3>
        <table class="w3-table w3-striped w3-bordered w3-margin-bottom">
          <thead>
            <tr class="w3-teal">
              <th>{{ t('part') }}</th>
              <th>{{ t('quantity') }}</th>
              <th>{{ t('unit') }}</th>
              <th>{{ t('gauge') }}</th>
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

        <h3 class="w3-text-teal">📋 {{ t('installationInstructions') }}</h3>
        <div class="w3-panel w3-light-yellow w3-padding">
          <pre style="white-space: pre-wrap; font-family: monospace;">{{ response.instructions }}</pre>
        </div>

        <h3 class="w3-text-teal">🔌 {{ t('conceptualDiagram') }}</h3>
        <div class="w3-panel w3-light-gray w3-padding">
          <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; background-color: #f9f9f9; padding: 10px;">{{ response.conceptualDiagram }}</pre>
        </div>

        <h3 class="w3-text-teal">🚀 {{ t('nextPhases') }}</h3>
        <div class="w3-panel w3-light-green">
          <p>{{ response.nextPhases }}</p>
        </div>

        <div class="w3-section">
          <button
            disabled
            class="w3-button w3-gray w3-block w3-margin-bottom"
            :title="t('phase2Description')"
          >
            {{ t('phase2Button') }}
          </button>
          <p class="w3-text-gray w3-small">
            <i>{{ t('phase2Description') }}</i>
          </p>
        </div>

        <button
          @click="$emit('goBack')"
          class="w3-button w3-teal w3-block"
        >
          {{ t('returnToForm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Phase1Response } from '../types';
import { translations, type Language } from '../i18n/translations';

const props = defineProps<{
  response: Phase1Response;
  language: Language;
}>();

defineEmits<{
  goBack: [];
}>();

const t = (key: keyof typeof translations.en) => translations[props.language][key] as string;

function getSpecialtyName(code: string): string {
  const map: Record<string, string> = {
    plumbing: translations[props.language].specialties.plumbing,
    masonry: translations[props.language].specialties.masonry,
    electrical: translations[props.language].specialties.electrical,
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
