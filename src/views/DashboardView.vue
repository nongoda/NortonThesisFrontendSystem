<template>
  <div class="layout">
    <SidebarAdmin :isCollapsed="isCollapsed" @toggle="toggleSidebar" />

    <div class="main">
      <Topbar/>

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarAdmin from '@/components/layouts/SidebarAdmin.vue';
import Topbar from '@/components/layouts/Topbar.vue'
import { AuthStore } from '@/stores/AuthStore';
const authStore = AuthStore();
console.log(authStore.user)
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main {
  flex: 1;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.content {
  padding: 20px;
}
</style>