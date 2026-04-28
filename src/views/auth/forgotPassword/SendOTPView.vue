<template>
    <SendOTPForm/>
    <footer class="no-link-footer">
        Copyright © 2025 UI Initiative by Lacima Cartel
    </footer>
</template>
<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    import SendOTPForm from '@/components/auth/forgotPassword/SendOTPForm.vue';    
    const router = useRouter()
</script>