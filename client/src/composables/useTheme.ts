import { ref, watchEffect } from 'vue'

type Theme = 'dark' | 'light'

function readStored(): Theme {
  try {
    const v = localStorage.getItem('construye-theme')
    if (v === 'light' || v === 'dark') return v
  } catch {}
  return 'dark'
}

// Module-level singleton so all components share one state
const theme = ref<Theme>(readStored())

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
  try { localStorage.setItem('construye-theme', theme.value) } catch {}
})

export function useTheme() {
  function setTheme(t: Theme) { theme.value = t }
  function toggle() { theme.value = theme.value === 'dark' ? 'light' : 'dark' }
  return { theme, setTheme, toggle }
}
