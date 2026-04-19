<template>
    
    <header class="authHeader">
        <div class="container py-4 d-flex align-self-center justify-content-between">
            <div class="d-flex align-self-center">
                <img src="../../assets/images/LA CIMA CARTEL.svg" style="height: 22px;" alt="">
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <RouterLink to="/" class="text-decoration-none btn btn-offcial back">
                    <MoveLeft class="me-2 icon"/> Back to landing
                </RouterLink>
                <RouterLink to="register" class="btn btn-offcial btn-color d-flex rounded-pill">Register now</RouterLink>
            </div>
        </div>
    </header>
    <LoginComponent/>
    <footer class="no-link-footer" style="z-index: 1000;">
        <small>Copyright © 2025 UI Initiative by Lacima Cartel</small>
    </footer>

</template>
<script setup>
import Particles from '@/components/elements/Particles.vue';
    import { RouterLink } from 'vue-router';
    import LoginComponent from '@/components/auth/LoginComponent.vue';
</script>