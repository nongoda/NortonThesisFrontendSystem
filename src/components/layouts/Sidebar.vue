<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header w-100 d-flex justify-content-between align-items-center" style="height: 72.8px;">
      <transition name="logo-anim" class="align-self-center">
        <img v-if="!isCollapsed" src="../../assets/images/LA CIMA CARTEL_light_mode.svg" class="logo" height="20"
          alt="" />
      </transition>
      <button class="sidebar-toggle" @click="$emit('toggle')">
        <PanelRight size="20" class="collapse-icon" />
      </button>
    </div>

    <ul class="menu">
      <li v-for="group in filteredMenuGroups" :key="group.title" class="menu-group">

        <transition name="group-title-anim">
          <p v-if="!isCollapsed" class="group-title">
            {{ group.title }}
          </p>
        </transition>

        <!-- Items -->
        <ul class="menu-inside">
          <li v-for="item in group.items" :key="item.path">
            <router-link :to="item.path" class="menu-link">
              <component :is="item.icon" class="icon" />
              <span class="label">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>

      </li>
    </ul>
  </aside>
</template>

<script setup>
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Users,
  CreditCard,
  ScanLine,
  BarChart3,
  Tag,
  UsersRound,
  Settings,
  AudioLines,
  Music
} from 'lucide-vue-next'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { AuthStore } from '@/stores/AuthStore'

defineProps({
  isCollapsed: Boolean
})

/*
|--------------------------------------------------------------------------
| Auth Store
|--------------------------------------------------------------------------
*/

const authStore = AuthStore()

const { user } = storeToRefs(authStore)

/*
|--------------------------------------------------------------------------
| Current User Role
|--------------------------------------------------------------------------
*/

const userRole = computed(() => user.value?.role || '')
console.log(userRole.value)
/*
|--------------------------------------------------------------------------
| Menu
|--------------------------------------------------------------------------
*/

const menuGroups = [
  {
    title: 'Main Menu',
    items: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        roles: ['admin', 'manager', 'staff']
      },
    ]
  },
  {
    title: 'Event Management',
    items: [
      {
        name: 'Events',
        path: '/events',
        icon: CalendarDays,
        roles: ['admin', 'manager']
      },
      {
        // Staff only
        name: 'Tickets',
        path: '/tickets',
        icon: Ticket,
        roles: ['staff']
      },
      {
        name: 'Check-in',
        path: '/check-in',
        icon: ScanLine,
        roles: ['staff']
      },
    ]
  },

  {
    title: 'Music Management',
    items: [
      {
        name: 'Artists',
        path: '/artists',
        icon: AudioLines,
        roles: ['admin', 'manager']
      },
      {
        name: 'Songs',
        path: '/songs',
        icon: Music,
        roles: ['admin', 'manager']
      },

    ]
  },
    {
    title: 'User Management',
    items: [
      {
        name: 'Customers',
        path: '/customer-management',
        icon: Users,
        roles: ['admin']
      },
      {
        name: 'User Management',
        path: '/user-management',
        icon: UsersRound,
        roles: ['admin']
      },
    ]
  },

  {
    title: 'Finance & Reports',
    items: [
      {
        name: 'Payments',
        path: '/payments',
        icon: CreditCard,
        roles: ['admin', 'manager']
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: BarChart3,
        roles: ['admin', 'manager']
      },
    ]
  },

  {
    title: 'System',
    items: [
      {
        name: 'Settings',
        path: '/setting-general',
        icon: Settings,
        roles: ['admin', 'manager', 'staff']
      },
    ]
  }
]

/*
|--------------------------------------------------------------------------
| Filter Menu By Current User Role
|--------------------------------------------------------------------------
*/

const filteredMenuGroups = computed(() => {
  return menuGroups
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.roles.includes(userRole.value)
      )
    }))
    .filter(group => group.items.length > 0)
})
</script>