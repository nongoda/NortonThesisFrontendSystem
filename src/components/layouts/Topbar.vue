<template>
  <header class="topbar">
    <h1>{{ routeTitle }}</h1>

    <div class="profile-group">
      <img class="avatar" src="https://i.pinimg.com/1200x/d2/fd/e8/d2fde841ae080f87b5fab0e144da4281.jpg"
        alt="profile" />

      <div class="hover-bridge"></div>

      <ul class="dropdown">
        <li class="dropdown-item">
          <img class="avatar" src="https://i.pinimg.com/1200x/d2/fd/e8/d2fde841ae080f87b5fab0e144da4281.jpg">
          <div>

          </div>
        </li>
        <li class="dropdown-item">
          <router-link to="/" class="link-dashboard">
            <Settings stroke-width="1.75" size="18" class="icon" />
            Settings
          </router-link>
          <router-link to="/" class="link-dashboard">
            <LogOut stroke-width="1.75" size="18" class="icon"/>
            Logout
          </router-link>  
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AuthStore } from '@/stores/AuthStore';
const authStore = AuthStore();
const route = useRoute()

</script>

<style scoped>
.topbar {
  background: white;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #ddd;
}

.profile-group {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 40px;
  height: 40px;

  border-radius: 50%;
  object-fit: cover;

  border: 2px solid #eee;

  transition: transform 0.2s ease;
}

.profile-group:hover .avatar {
  transform: scale(1.05);
}

.hover-bridge {
  position: absolute;
  top: 40px;
  right: 0;
  width: 160px;
  height: 15px;
  background: transparent;
}

.dropdown {
  padding: 5px;
  position: absolute;
  top: 55px;
  right: 0;

  width: 230px;
  background: white;

  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);

  overflow: hidden;

  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;

  transition: opacity 0.25s ease, transform 0.25s ease;
}

.profile-group:hover .dropdown,
.profile-group:hover .hover-bridge,
.dropdown {
/* .dropdown:hover { */
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-item {
  padding: 0;
}

.dropdown .dropdown-item .link-dashboard{
  display: block;        
  width: 100%;           
  padding: 10px;         
  text-decoration: none;
  color: #373138!important;
  box-sizing: border-box;
  border-radius: 10px!important;
  font-weight: 450!important;
  font-size: 15px!important;
  transition: 0.5s!important;
}
.dropdown .dropdown-item .link-dashboard:hover{
  background-color: #e7e1e85f;
  color: #7e05a3!important;
}
.dropdown .dropdown-item .link-dashboard .icon{
  stroke: #373138;
  margin-right: 7px;
  transition: 0.5s!important;
}
.dropdown .dropdown-item .link-dashboard:hover .icon{
  stroke: #7e05a3!important;
}
</style>