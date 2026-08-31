<template>
  <RouterView />
  <SolicitudModal />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import SolicitudModal from './components/SolicitudModal.vue';
</script>
