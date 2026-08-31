import { ref } from 'vue'

interface Prefill {
  piezaNombre?: string
  calibre?: string
}

const isOpen = ref(false)
const prefill = ref<Prefill>({})

function openSolicitudModal(data?: Prefill) {
  prefill.value = data ?? {}
  isOpen.value = true
}

function closeSolicitudModal() {
  isOpen.value = false
}

export { isOpen, prefill, openSolicitudModal, closeSolicitudModal }
