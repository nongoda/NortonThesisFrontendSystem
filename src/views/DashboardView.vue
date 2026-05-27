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
import SidebarAdmin from '@/components/layouts/Sidebar.vue';
import Topbar from '@/components/layouts/Topbar.vue'
import { AuthStore } from '@/stores/AuthStore';

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
