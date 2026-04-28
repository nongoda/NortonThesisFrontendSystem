<template>
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