<template>
    <header class="authHeader">
        <div class="container py-4 d-flex align-self-center justify-content-between">
            <div class="d-flex align-self-center">
                <RouterLink to="/">
                    <img src="../../../assets/images/LA CIMA CARTEL.svg" style="height: 22px;" alt="">
                </RouterLink>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="text-decoration-none btn btn-offcial back" @click.prevent="$router.back()">
                    <MoveLeft class="me-2 icon" /> Back to previous
                </a>
            </div>
        </div>
    </header>
    <ResetPasswordForm/>
    <footer class="no-link-footer">
        <small>Copyright © 2025 UI Initiative by Lacima Cartel</small>
    </footer>
</template>
<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    import ResetPasswordForm from '@/components/auth/forgotPassword/ResetPasswordForm.vue';  
    const router = useRouter()
</script>