<template>
    <header class="authHeader">
        <div class="container py-4 d-flex align-self-center justify-content-between">
            <div class="d-flex align-self-center">
                <img src="../../assets/images/LA CIMA CARTEL.svg" style="height: 22px;" alt="">
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <RouterLink to="/" class="text-decoration-none btn btn-offcial back">
                    <MoveLeft class="me-2 icon" /> Back to landing
                </RouterLink>
                <RouterLink to="login" class="btn btn-offcial btn-color d-flex rounded-pill">Login now</RouterLink>
            </div>
        </div>
    </header>
    <RegisterComponent />
    <footer class="no-link-footer">
        <small>Copyright © 2025 UI Initiative by Lacima Cartel</small>
    </footer>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import '@/assets/styles/oda.style.css'
// import RegisterComponent from '@/components/auth/RegisterComponent.vue'
import RegisterComponent from '@/components/auth/RegisterComponent.vue';
</script>
