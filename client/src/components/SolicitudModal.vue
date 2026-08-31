<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="backdrop" @click.self="handleClose">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

          <div class="modal-header">
            <h2 id="modal-title" class="modal-title">Solicitar materiales</h2>
            <button class="close-btn" @click="handleClose" aria-label="Cerrar">✕</button>
          </div>

          <!-- Success state -->
          <div v-if="success" class="success-block">
            <span class="success-icon">✅</span>
            <p class="success-text">¡Solicitud enviada! Los vendedores podrán contactarte pronto.</p>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submit" class="modal-form">
            <div v-if="errorMsg" class="error-banner">⚠️ {{ errorMsg }}</div>

            <div class="field-group">
              <label class="field-label">¿Qué necesitas? <span class="req">*</span></label>
              <input
                v-model="form.piezaNombre"
                class="field-input"
                type="text"
                placeholder="Ej: Tubo PVC 1/2 pulgada, cable 14 AWG..."
                required
                autofocus
              />
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">Calibre / Grosor</label>
                <input
                  v-model="form.calibre"
                  class="field-input"
                  type="text"
                  placeholder='Ej: 1/2", 14 AWG'
                />
              </div>
              <div class="field-group">
                <label class="field-label">Cantidad <span class="req">*</span></label>
                <input
                  v-model.number="form.cantidad"
                  class="field-input"
                  type="number"
                  min="1"
                  placeholder="Ej: 5"
                  required
                />
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Nota adicional</label>
              <textarea
                v-model="form.nota"
                class="field-input"
                rows="2"
                placeholder="Información extra, preferencias de marca, etc."
              ></textarea>
            </div>

            <div class="field-group">
              <label class="field-label">Tu teléfono de contacto <span class="req">*</span></label>
              <input
                v-model="form.telefonoCliente"
                class="field-input"
                type="tel"
                placeholder="Ej: 55551234"
                required
              />
            </div>

            <label class="checkbox-label">
              <input v-model="form.prefiereMensajeria" type="checkbox" />
              <span>Prefiero que me contacten por mensajería</span>
            </label>

            <button type="submit" class="submit-btn" :disabled="sending">
              <span v-if="sending" class="spinner"></span>
              {{ sending ? 'Enviando...' : '📨 Enviar solicitud' }}
            </button>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { isOpen, prefill, closeSolicitudModal } from '../composables/useSolicitudModal'
import { postSolicitud } from '../utils/api'

const EMPTY_FORM = () => ({
  piezaNombre: '',
  calibre: '',
  cantidad: 1,
  nota: '',
  telefonoCliente: '',
  prefiereMensajeria: false,
})

const form = ref(EMPTY_FORM())
const sending = ref(false)
const success = ref(false)
const errorMsg = ref('')

// Apply prefill whenever modal opens
watch(isOpen, (open) => {
  if (open) {
    form.value = {
      ...EMPTY_FORM(),
      piezaNombre: prefill.value.piezaNombre ?? '',
      calibre: prefill.value.calibre ?? '',
    }
    success.value = false
    errorMsg.value = ''
  }
})

function handleClose() {
  if (success.value) {
    form.value = EMPTY_FORM()
  }
  closeSolicitudModal()
}

async function submit() {
  sending.value = true
  errorMsg.value = ''
  try {
    await postSolicitud({
      piezaNombre: form.value.piezaNombre,
      calibre: form.value.calibre || undefined,
      cantidad: form.value.cantidad,
      nota: form.value.nota || undefined,
      telefonoCliente: form.value.telefonoCliente,
      prefiereMensajeria: form.value.prefiereMensajeria,
    })
    success.value = true
    setTimeout(() => {
      closeSolicitudModal()
      form.value = EMPTY_FORM()
    }, 2000)
  } catch (err) {
    errorMsg.value = err instanceof Error ? err.message : 'Error al enviar la solicitud'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 1rem;
}

.modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.3px;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  line-height: 1;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;
  font-family: inherit;
}

.close-btn:hover {
  color: var(--text);
  background: var(--bg-card-hover);
}

/* Success */
.success-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  text-align: center;
}

.success-icon { font-size: 2.5rem; }

.success-text {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Form */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 420px) {
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
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  resize: vertical;
}

.field-input::placeholder { color: var(--text-faint); }

.field-input:focus {
  outline: none;
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px var(--accent-subtle);
  background: var(--bg-card-hover);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem;
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
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-banner {
  background: rgba(224, 82, 82, 0.1);
  border: 1px solid rgba(224, 82, 82, 0.3);
  color: #c0392b;
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.9rem;
  font-size: 0.85rem;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(-12px) scale(0.97);
  opacity: 0;
}
</style>
