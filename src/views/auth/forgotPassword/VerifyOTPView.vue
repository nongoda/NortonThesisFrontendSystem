<template>
    <header class="authHeader">
        <div class="container py-4 d-flex align-self-center justify-content-between">
            <div class="d-flex align-self-center">
                <img src="../../../assets/images/LA CIMA CARTEL.svg" style="height: 22px;" alt="">
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <!-- <RouterLink to="login" class="text-decoration-none btn btn-offcial back">
                    <MoveLeft class="me-2 icon"/> Back to login
                </RouterLink> -->
               <a href="#" class="text-decoration-none btn btn-offcial back" @click.prevent="$router.back()">
                    <MoveLeft class="me-2 icon" /> Back to previous
                </a>
            </div>
        </div>
    </header>
    <VerifyOTPForm/>
    <footer class="no-link-footer">
        <small>Copyright © 2025 UI Initiative by Lacima Cartel</small>
    </footer>
</template>
<script setup>
    import { useRouter } from 'vue-router';    
    import VerifyOTPForm from '@/components/auth/forgotPassword/VerifyOTPForm.vue';
    const router = useRouter();
</script>

