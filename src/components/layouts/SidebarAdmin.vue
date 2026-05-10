<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header w-100 d-flex justify-content-between align-items-center" style="height: 72.8px;">
      <transition name="logo-anim" class="align-self-center">
        <img v-if="!isCollapsed" src="../../assets/images/LA CIMA CARTEL_light_mode.svg" class="logo" height="20"
          alt="" />
      </transition>
      <button class="sidebar-toggle" @click="$emit('toggle')"><PanelRight size="20" class="collapse-icon"/></button>
    </div>

    <ul class="menu">
      <li v-for="group in menuGroups" :key="group.title" class="menu-group">

        <!-- Group Title -->
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
import { LayoutDashboard, CalendarDays, Ticket, ShoppingCart, Users, CreditCard, ScanLine, BarChart3, Tag, UsersRound, Settings } from 'lucide-vue-next'

defineProps({
  isCollapsed: Boolean
})

const menuGroups = [
  {
    title: 'Main Menu',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Event Management',
    items: [
      { name: 'Events', path: '/events', icon: CalendarDays },
      { name: 'Tickets', path: '/tickets', icon: Ticket },
      { name: 'Orders', path: '/orders', icon: ShoppingCart },
      { name: 'Check-in', path: '/check-in', icon: ScanLine },
    ]
  },
  {
    title: 'User Management',
    items: [
      { name: 'Customers', path: '/customers', icon: Users },
      { name: 'User Management', path: '/user-management', icon: UsersRound },
    ]
  },
  {
    title: 'Finance & Reports',
    items: [
      { name: 'Payments', path: '/payments', icon: CreditCard },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
      { name: 'Promotions', path: '/promotions', icon: Tag },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Settings', path: '/setting-general', icon: Settings },
    ]
  }
]
</script>