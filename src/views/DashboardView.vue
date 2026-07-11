<template>
  <div class="layout">
    <Sidebar :isCollapsed="isCollapsed" @toggle="toggleSidebar" />

    <div class="main">
      <Topbar />

      <div class="content">
        <StaffDashboard v-if="role === 'staff'" />
        <ManagerDashboard v-if="role === 'manager'" />
        <AdminDashboard v-if="role === 'admin'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Sidebar from '@/components/layouts/Sidebar.vue';
import Topbar from '@/components/layouts/Topbar.vue'
import StaffDashboard from '@/components/dashboards/StaffDashboard.vue';
import ManagerDashboard from '@/components/dashboards/ManagerDashboard.vue';
import AdminDashboard from '@/components/dashboards/AdminDashboard.vue';
import { AuthStore } from '@/stores/AuthStore'

const authStore = AuthStore()
const role = computed(() => authStore.user?.role)

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
