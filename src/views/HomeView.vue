<template>
    <AppHeader />
    <div style="width: 100px;"></div>
    <div style="height: 50000px;"></div>
</template>
<script setup>
    import { AuthStore } from '@/stores/AuthStore';
    import AppHeader from '@/components/header/AppHeader.vue';
    const authStore = AuthStore()

</script>