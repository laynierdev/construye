<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 600px; margin: 0 auto;">
      <header class="w3-container w3-teal">
        <div class="w3-right">
          <label class="w3-text-white" style="font-size: 12px; margin-right: 6px;">{{ t('languageLabel') }}</label>
          <select v-model="language" class="w3-select w3-border w3-white" style="width: auto; min-width: 90px;">
            <option value="en">{{ t('languageEnglish') }}</option>
            <option value="es">{{ t('languageSpanish') }}</option>
          </select>
        </div>
        <h1>🏠 Construye</h1>
        <p class="w3-large">{{ t('appTitle') }}</p>
      </header>

      <div class="w3-container">
        <form @submit.prevent="handleSubmit">
          <div class="w3-section">
            <label class="w3-text-teal">
              <b>{{ t('selectSpecialty') }}</b>
            </label>
            <select
              v-model="formData.specialty"
              class="w3-select w3-border"
              required
              @change="resetFields"
            >
              <option value="">{{ t('chooseOption') }}</option>
              <option value="plumbing">{{ t('specialties.plumbing') }}</option>
              <option value="masonry">{{ t('specialties.masonry') }}</option>
              <option value="electrical">{{ t('specialties.electrical') }}</option>
            </select>
          </div>

          <template v-if="formData.specialty">
            <div class="w3-section">
              <label class="w3-text-teal">
                <b>{{ t('distanceLabel') }}</b>
              </label>
              <input
                v-model.number="formData.distance"
                type="number"
                class="w3-input w3-border"
                :placeholder="t('placeholderExample')"
                min="1"
                required
              />
            </div>

            <div class="w3-section">
              <label class="w3-text-teal">
                <b>{{ t('gaugeLabel') }}</b>
              </label>
              <input
                v-model="formData.gauge"
                type="text"
                class="w3-input w3-border"
                :placeholder="getGaugePlaceholder()"
              />
            </div>

            <div class="w3-section">
              <label class="w3-text-teal">
                <b>{{ t('descriptionLabel') }}</b>
              </label>
              <textarea
                v-model="formData.description"
                class="w3-input w3-border"
                rows="3"
                :placeholder="t('descriptionPlaceholder')"
              ></textarea>
            </div>

            <div v-if="formData.specialty === 'masonry'" class="w3-section">
              <label class="w3-text-teal">
                <b>{{ t('cornerCountLabel') }}</b>
              </label>
              <input
                v-model.number="formData.cornerCount"
                type="number"
                class="w3-input w3-border"
                :placeholder="t('placeholderExample')"
                min="0"
              />
            </div>

            <div v-if="['plumbing', 'electrical'].includes(formData.specialty)" class="w3-section">
              <label class="w3-text-teal">
                <b>{{ t('connectionCountLabel') }}</b>
              </label>
              <input
                v-model.number="formData.connectionCount"
                type="number"
                class="w3-input w3-border"
                :placeholder="t('placeholderExample')"
                min="0"
              />
            </div>

            <div class="w3-section">
              <button
                type="submit"
                class="w3-button w3-teal w3-block"
                :disabled="isLoading"
              >
                {{ isLoading ? t('submittingButton') : t('submitButton') }}
              </button>
            </div>
          </template>
        </form>

        <div v-if="error" class="w3-panel w3-red w3-margin-top">
          <span @click="error = null" class="w3-closebtn">&times;</span>
          <p><b>⚠️ {{ t('errorTitle') }}:</b> {{ error }}</p>
        </div>
      </div>
    </div>

    <Phase1Results
      v-if="apiResponse"
      :response="apiResponse"
      :language="language"
      @goBack="apiResponse = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import type { FormData } from './types';
import { sendPhase1Request } from './utils/api';
import Phase1Results from './components/Phase1Results.vue';
import { translations, type Language } from './i18n/translations';

const STORAGE_KEY = 'construye-language';

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'es' ? 'es' : 'en';
};

const language = ref<Language>(getStoredLanguage());
const formData = reactive<FormData>({
  specialty: '',
  distance: 10,
  gauge: '',
  description: '',
  cornerCount: 0,
  connectionCount: 0,
});

const apiResponse = ref(null);
const isLoading = ref(false);
const error = ref('');

const persistLanguage = (value: Language) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
};

const t = (key: string): string => {
  const parts = key.split('.');
  let value: unknown = translations[language.value];

  for (const part of parts) {
    if (typeof value !== 'object' || value === null || !(part in value)) {
      return key;
    }
    value = (value as Record<string, unknown>)[part];
  }

  return typeof value === 'string' ? value : key;
};

watchLanguage();

function watchLanguage() {
  language.value = getStoredLanguage();
  persistLanguage(language.value);
}

function getGaugePlaceholder(): string {
  const placeholders = {
    en: {
      plumbing: 'Example: 1/2", 3/4"',
      masonry: 'Example: #4, #6',
      electrical: 'Example: 14 AWG, 12 AWG'
    },
    es: {
      plumbing: 'Ejemplo: 1/2", 3/4"',
      masonry: 'Ejemplo: #4, #6',
      electrical: 'Ejemplo: 14 AWG, 12 AWG'
    }
  };

  const current = placeholders[language.value];
  switch (formData.specialty) {
    case 'plumbing':
      return current.plumbing;
    case 'masonry':
      return current.masonry;
    case 'electrical':
      return current.electrical;
    default:
      return t('placeholderGauge');
  }
}

function resetFields() {
  formData.distance = 10;
  formData.gauge = '';
  formData.description = '';
  formData.cornerCount = 0;
  formData.connectionCount = 0;
  error.value = '';
}

watchEffect(() => {
  persistLanguage(language.value);
});

async function handleSubmit() {
  if (!formData.specialty) {
    error.value = t('errorSelectSpecialty');
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await sendPhase1Request(formData);
    apiResponse.value = response;
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('errorUnknown');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.w3-container {
  background-color: #f5f5f5;
}

header {
  position: relative;
}
</style>
