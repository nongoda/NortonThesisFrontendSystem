<template>
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

