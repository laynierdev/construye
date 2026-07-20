<template>
  <div class="w3-container w3-margin-top">
    <div class="w3-card-4" style="max-width: 900px; margin: 0 auto;">
      <header class="w3-container w3-light-green">
        <h2>✅ Resultados del Asistente</h2>
      </header>

      <div class="w3-container w3-padding">
        <!-- Información general -->
        <div class="w3-panel w3-light-blue">
          <h3 class="w3-text-teal">Especialidad: <b>{{ getNombreEspecialidad(respuesta.especialidad) }}</b></h3>
        </div>

        <!-- Lista de piezas requeridas -->
        <h3 class="w3-text-teal">📦 Piezas Requeridas</h3>
        <table class="w3-table w3-striped w3-bordered w3-margin-bottom">
          <thead>
            <tr class="w3-teal">
              <th>Pieza</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Calibre/Especificación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pieza, index) in respuesta.piezas" :key="index">
              <td>{{ pieza.nombre }}</td>
              <td class="w3-center">{{ pieza.cantidad }}</td>
              <td>{{ pieza.unidad }}</td>
              <td>{{ pieza.calibre }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Instrucciones -->
        <h3 class="w3-text-teal">📋 Instrucciones de Instalación</h3>
        <div class="w3-panel w3-light-yellow w3-padding">
          <pre style="white-space: pre-wrap; font-family: monospace;">{{ respuesta.instrucciones }}</pre>
        </div>

        <!-- Esquema conceptual -->
        <h3 class="w3-text-teal">🔌 Esquema Conceptual</h3>
        <div class="w3-panel w3-light-gray w3-padding">
          <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; background-color: #f9f9f9; padding: 10px;">{{ respuesta.esquemaConceptual }}</pre>
        </div>

        <!-- Próximas fases -->
        <h3 class="w3-text-teal">🚀 Próximas Fases</h3>
        <div class="w3-panel w3-light-green">
          <p>{{ respuesta.proximasFases }}</p>
        </div>

        <!-- Botón para buscar piezas (Fase 2) - Deshabilitado -->
        <div class="w3-section">
          <button
            disabled
            class="w3-button w3-gray w3-block w3-margin-bottom"
            title="Esta funcionalidad estará disponible en la Fase 2"
          >
            🔍 Buscar Piezas y Calcular Presupuesto (Fase 2)
          </button>
          <p class="w3-text-gray w3-small">
            <i>Esta funcionalidad se habilitará en la Fase 2, donde se buscarán piezas en inventarios, se calculará el presupuesto y se mostrarán tiendas cercanas.</i>
          </p>
        </div>

        <!-- Botón de regreso -->
        <button
          @click="$emit('volver')"
          class="w3-button w3-teal w3-block"
        >
          ← Volver al Formulario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fase1Response } from '../types';

defineProps<{
  respuesta: Fase1Response;
}>();

defineEmits<{
  volver: [];
}>();

function getNombreEspecialidad(code: string): string {
  const map: Record<string, string> = {
    plomeria: '🔧 Plomería',
    albanileria: '🧱 Albañilería',
    electricidad: '⚡ Electricidad',
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
