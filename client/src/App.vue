<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 600px; margin: 0 auto;">
      <header class="w3-container w3-teal">
        <h1>🏠 Construye</h1>
        <p class="w3-large">Asistencia Técnica para Proyectos de Hogar</p>
      </header>

      <div class="w3-container">
        <!-- Selección de especialidad -->
        <form @submit.prevent="handleSubmit">
          <div class="w3-section">
            <label class="w3-text-teal">
              <b>Selecciona una especialidad:</b>
            </label>
            <select
              v-model="formData.especialidad"
              class="w3-select w3-border"
              required
              @change="resetFields"
            >
              <option value="">-- Elige una opción --</option>
              <option value="plomeria">🔧 Plomería</option>
              <option value="albanileria">🧱 Albañilería</option>
              <option value="electricidad">⚡ Electricidad</option>
            </select>
          </div>

          <!-- Campos dinámicos según especialidad -->
          <template v-if="formData.especialidad">
            <!-- Campo de distancia (común a todas) -->
            <div class="w3-section">
              <label class="w3-text-teal">
                <b>Distancia (metros):</b>
              </label>
              <input
                v-model.number="formData.distancia"
                type="number"
                class="w3-input w3-border"
                placeholder="Ej: 10"
                min="1"
                required
              />
            </div>

            <!-- Calibre/Grosor -->
            <div class="w3-section">
              <label class="w3-text-teal">
                <b>Calibre/Grosor:</b>
              </label>
              <input
                v-model="formData.calibre"
                type="text"
                class="w3-input w3-border"
                :placeholder="getCalibrePlaceholder()"
              />
            </div>

            <!-- Cantidad de esquinas (Albañilería) -->
            <div v-if="formData.especialidad === 'albanileria'" class="w3-section">
              <label class="w3-text-teal">
                <b>Cantidad de esquinas:</b>
              </label>
              <input
                v-model.number="formData.cantidadEsquinas"
                type="number"
                class="w3-input w3-border"
                placeholder="Ej: 4"
                min="0"
              />
            </div>

            <!-- Cantidad de derivaciones (Plomería y Electricidad) -->
            <div v-if="['plomeria', 'electricidad'].includes(formData.especialidad)" class="w3-section">
              <label class="w3-text-teal">
                <b>Cantidad de derivaciones/conexiones:</b>
              </label>
              <input
                v-model.number="formData.cantidadDerivaciones"
                type="number"
                class="w3-input w3-border"
                placeholder="Ej: 2"
                min="0"
              />
            </div>

            <!-- Botón de envío -->
            <div class="w3-section">
              <button
                type="submit"
                class="w3-button w3-teal w3-block"
                :disabled="isLoading"
              >
                {{ isLoading ? '⏳ Procesando...' : '📋 Generar Asistencia' }}
              </button>
            </div>
          </template>
        </form>

        <!-- Mostrar error si hay -->
        <div v-if="error" class="w3-panel w3-red w3-margin-top">
          <span @click="error = null" class="w3-closebtn">&times;</span>
          <p><b>⚠️ Error:</b> {{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Componente de resultados -->
    <ResultadosFase1
      v-if="respuestaAPI"
      :respuesta="respuestaAPI"
      @volver="respuestaAPI = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormData } from './types';
import { enviarSolicitudFase1 } from './utils/api';
import ResultadosFase1 from './components/ResultadosFase1.vue';

const formData = reactive<FormData>({
  especialidad: '',
  distancia: 10,
  calibre: '',
  cantidadEsquinas: 0,
  cantidadDerivaciones: 0,
});

const respuestaAPI = ref(null);
const isLoading = ref(false);
const error = ref('');

function getCalibrePlaceholder(): string {
  switch (formData.especialidad) {
    case 'plomeria':
      return 'Ej: 1/2", 3/4"';
    case 'albanileria':
      return 'Ej: #4, #6';
    case 'electricidad':
      return 'Ej: 14 AWG, 12 AWG';
    default:
      return 'Especificación';
  }
}

function resetFields() {
  formData.distancia = 10;
  formData.calibre = '';
  formData.cantidadEsquinas = 0;
  formData.cantidadDerivaciones = 0;
  error.value = '';
}

async function handleSubmit() {
  if (!formData.especialidad) {
    error.value = 'Por favor selecciona una especialidad';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const respuesta = await enviarSolicitudFase1(formData);
    respuestaAPI.value = respuesta;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido al procesar la solicitud';
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
