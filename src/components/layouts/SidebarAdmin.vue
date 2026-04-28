<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header w-100 d-flex justify-content-between align-self-center" style="height: 72.8px;">
        <transition name="logo-anim" class="align-self-center">
        <img v-if="!isCollapsed" src="../../assets/images/LA CIMA CARTEL_light_mode.svg" class="logo" height="20"
          alt="">
      </transition>
      <button class="sidebar-toggle" @click="$emit('toggle')">☰</button>
    </div>

    <ul class="menu">

      <li>
        <router-link to="/dashboard" class="menu-link">
          
            <LayoutDashboard  class="icon" />
          <span class="label">Dashboard</span>
        </router-link>
      </li>

      <li>
        <router-link to="/events" class="menu-link">        
          <CalendarDays  class="icon"/>
          <span class="label">Events</span>
        </router-link>
      </li>

      <li>
        <router-link to="/tickets" class="menu-link">
            <Ticket   class="icon"/>
          <span class="label">Tickets</span>
        </router-link>
      </li>

      <li>
        <router-link to="/orders" class="menu-link">
          
            <ShoppingCart  class="icon"/>
          <span class="label">Orders</span>
        </router-link>
      </li>

      <li>
        <router-link to="/customers" class="menu-link">        
            <Users  class="icon"/>
          <span class="label">Customers</span>
        </router-link>
      </li>

      <li>
        <router-link to="/payments" class="menu-link">
          
            <CreditCard  class="icon"/>
          
          <span class="label">Payments</span>
        </router-link>
      </li>

      <li>
        <router-link to="/check-in" class="menu-link">
          
            <ScanLine  class="icon" />
          <span class="label">Check-in</span>
        </router-link>
      </li>

      <li>
        <router-link to="/reports" class="menu-link">
          
            <BarChart3  class="icon"/>
          <span class="label">Reports</span>
        </router-link>
      </li>

      <li>
        <router-link to="/promotions" class="menu-link">          
          <Tag  class="icon" />
          <span class="label">Promotions</span>
        </router-link>
      </li>

      <li>
        <router-link to="/user-management" class="menu-link">        
            <UsersRound  class="icon" />
          <span class="label">User Management</span>
        </router-link>
      </li>

      <li>
        <router-link to="/settings" class="menu-link">
          
            <Settings  class="icon" />
          <span class="label">Settings</span>
        </router-link>
      </li>

    </ul>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { AuthStore } from '@/stores/AuthStore'
import { helpers } from '@vuelidate/validators';

defineProps({
  isCollapsed: Boolean
})


</script>
