<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 600px; margin: 0 auto;">
      <header class="w3-container w3-teal">
        <h1>🏠 Construye</h1>
        <p class="w3-large">Technical Assistance for Home Projects</p>
      </header>

      <div class="w3-container">
        <form @submit.prevent="handleSubmit">
          <div class="w3-section">
            <label class="w3-text-teal">
              <b>Select a specialty:</b>
            </label>
            <select
              v-model="formData.specialty"
              class="w3-select w3-border"
              required
              @change="resetFields"
            >
              <option value="">-- Choose an option --</option>
              <option value="plumbing">🔧 Plumbing</option>
              <option value="masonry">🧱 Masonry</option>
              <option value="electrical">⚡ Electrical</option>
            </select>
          </div>

          <template v-if="formData.specialty">
            <div class="w3-section">
              <label class="w3-text-teal">
                <b>Distance (meters):</b>
              </label>
              <input
                v-model.number="formData.distance"
                type="number"
                class="w3-input w3-border"
                placeholder="Example: 10"
                min="1"
                required
              />
            </div>

            <div class="w3-section">
              <label class="w3-text-teal">
                <b>Gauge/Thickness:</b>
              </label>
              <input
                v-model="formData.gauge"
                type="text"
                class="w3-input w3-border"
                :placeholder="getGaugePlaceholder()"
              />
            </div>

            <div v-if="formData.specialty === 'masonry'" class="w3-section">
              <label class="w3-text-teal">
                <b>Corner count:</b>
              </label>
              <input
                v-model.number="formData.cornerCount"
                type="number"
                class="w3-input w3-border"
                placeholder="Example: 4"
                min="0"
              />
            </div>

            <div v-if="['plumbing', 'electrical'].includes(formData.specialty)" class="w3-section">
              <label class="w3-text-teal">
                <b>Connection count:</b>
              </label>
              <input
                v-model.number="formData.connectionCount"
                type="number"
                class="w3-input w3-border"
                placeholder="Example: 2"
                min="0"
              />
            </div>

            <div class="w3-section">
              <button
                type="submit"
                class="w3-button w3-teal w3-block"
                :disabled="isLoading"
              >
                {{ isLoading ? '⏳ Processing...' : '📋 Generate Assistance' }}
              </button>
            </div>
          </template>
        </form>

        <div v-if="error" class="w3-panel w3-red w3-margin-top">
          <span @click="error = null" class="w3-closebtn">&times;</span>
          <p><b>⚠️ Error:</b> {{ error }}</p>
        </div>
      </div>
    </div>

    <Phase1Results
      v-if="apiResponse"
      :response="apiResponse"
      @goBack="apiResponse = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormData } from './types';
import { sendPhase1Request } from './utils/api';
import Phase1Results from './components/Phase1Results.vue';

const formData = reactive<FormData>({
  specialty: '',
  distance: 10,
  gauge: '',
  cornerCount: 0,
  connectionCount: 0,
});

const apiResponse = ref(null);
const isLoading = ref(false);
const error = ref('');

function getGaugePlaceholder(): string {
  switch (formData.specialty) {
    case 'plumbing':
      return 'Example: 1/2", 3/4"';
    case 'masonry':
      return 'Example: #4, #6';
    case 'electrical':
      return 'Example: 14 AWG, 12 AWG';
    default:
      return 'Specification';
  }
}

function resetFields() {
  formData.distance = 10;
  formData.gauge = '';
  formData.cornerCount = 0;
  formData.connectionCount = 0;
  error.value = '';
}

async function handleSubmit() {
  if (!formData.specialty) {
    error.value = 'Please select a specialty';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await sendPhase1Request(formData);
    apiResponse.value = response;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error while processing the request';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.w3-container {
  background-color: #f5f5f5;
}
</style>
