<template>
  <div class="theme-toggle" role="group" aria-label="Seleccionar tema">
    <button
      class="toggle-opt"
      :class="{ active: theme === 'light' }"
      @click="setTheme('light')"
      :aria-pressed="theme === 'light'"
    >
      ☀️ Claro
    </button>
    <button
      class="toggle-opt"
      :class="{ active: theme === 'dark' }"
      @click="setTheme('dark')"
      :aria-pressed="theme === 'dark'"
    >
      🌙 Oscuro
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
const { theme, setTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 3px;
  gap: 2px;
  flex-shrink: 0;
}

.toggle-opt {
  padding: 0.3rem 0.85rem;
  border-radius: 100px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s, color 0.18s;
  white-space: nowrap;
  line-height: 1.4;
}

.toggle-opt:hover:not(.active) {
  color: var(--text);
  background: var(--bg-card-hover);
}

.toggle-opt.active {
  background: var(--accent-btn);
  color: var(--text-on-accent);
}
</style>
