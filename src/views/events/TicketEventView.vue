<template>
  <div class="layout">
    <SidebarAdmin :isCollapsed="isCollapsed" @toggle="toggleSidebar" />

    <div class="main">
      <Topbar />

      <div class="content">
        <TicketEvent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarAdmin from '@/components/layouts/Sidebar.vue';
import Topbar from '@/components/layouts/Topbar.vue'
import TicketEvent from '@/components/events/TicketEvent.vue';

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
