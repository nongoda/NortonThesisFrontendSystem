<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <button @click="$emit('toggle')">☰</button>
    </div>

    <ul class="menu">
      <li>
        <router-link to="/user-management" class="menu-link">
          <span class="icon">
            <UsersRound :is="item.icon" size="18" />
          </span>
          <span class="label">User management</span>
        </router-link>
      </li>
      <li>
        <router-link to="/user-management" class="menu-link">
          <span class="icon">
            <UsersRound :is="item.icon" size="18" stroke-width="2" />
          </span>
          <span class="label">User management</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { AuthStore } from '@/stores/AuthStore'

defineProps({
  isCollapsed: Boolean
})
</script>
