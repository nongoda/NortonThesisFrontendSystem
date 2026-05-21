<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="display-1 fw-bold">404</h1>

    <p class="fs-5 text-secondary">
      Page not found
    </p>

    <button @click="goBack" class="btn btn-dark mt-3">
      Go Back
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>