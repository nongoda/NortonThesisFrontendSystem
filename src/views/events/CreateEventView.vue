<template>
  <div class="layout">
    <SidebarAdmin :isCollapsed="isCollapsed" @toggle="toggleSidebar" />

    <div class="main">
      <Topbar />

      <div class="content">
        <router-view />
        <CreateEvent />
        <!-- <CreateEventForm /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarAdmin from '@/components/layouts/SidebarAdmin.vue';
import Topbar from '@/components/layouts/Topbar.vue'
import CreateEvent from '@/components/events/CreateEvent.vue';
import CreateEventForm from '@/components/events/CreateEventForm.vue';
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
