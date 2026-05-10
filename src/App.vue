<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast'
</script>

<template>
  <Toast position="bottom-right"/>
  <RouterView />
</template>