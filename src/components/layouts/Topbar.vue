<template>
    <header class="topbar">
        <span class="title-topbar">{{ routeTitle }}</span>

        <div class="d-flex">
            <!-- <router-link to="" class="link-page">
        <Bell size="21" class="icon" />
      </router-link> -->
            <div class="profile-group">
                <div class="avatar d-flex align-items-center">
                    <img class="" :src="user?.avatar || 'https://via.placeholder.com/40'" alt="profile" />
                    <div class="user-info-wrapper">
                        <div class="name">{{ user.name }}</div>
                        <div class="email">{{ user.email }}</div>
                    </div>
                </div>

                <div class="hover-bridge"></div>
                <ul class="dropdown">
                    <li class="dropdown-item d-flex align-items-center name py-2 ps-1">
                        <img class="avatar" :src="user?.avatar || 'https://via.placeholder.com/40'" />
                        <div class="user-info-wrapper d-flex flex-column ps-1">
                            <div class="name">{{ user.name }}</div>
                            <div class="email" style="font-size: 14px;">{{ user.email }}</div>
                        </div>
                    </li>
                    <li class="dropdown-item">
                        <router-link to="setting-general" class="link-dashboard">
                            <Settings stroke-width="1.75" size="18" class="icon" />
                            Settings
                        </router-link>
                        <a class="link-dashboard" href="#" @click.prevent="openLogoutModal">
                            <LogOut stroke-width="1.75" size="18" class="icon" />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <div class="modal fade" tabindex="-1" ref="logoutModalEl">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-4 d-flex flex-column align-items-center justify-content-center">
                    <div class="logo-wrap">
                        <LogOut :stroke-width="2" size="35" class="i" />
                    </div>
                    <h5 class="modal-title logout">Logout Confirmation</h5>
                    <span class="ask">Are you sure you want to logout from your account?</span>
                    <div class="d-flex w-100 mt-3">
                        <button class="w-50 me-2 btn btn-official btn-color-cancel rounded-pill" @click="hideModal">
                            Cancel
                        </button>
                        <button class="w-50 ms-2 btn btn-official btn-color-warning rounded-pill"
                            @click="confirmLogout">
                            Yes, log me out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthStore } from '@/stores/AuthStore'
import { CalendarDays } from 'lucide-vue-next'
import * as bootstrap from 'bootstrap'
const authStore = AuthStore()
const route = useRoute()
onMounted(async () => {
    await authStore.getCurrentUser()
})

const routeTitle = computed(() => route.meta.title || 'No Title')
const user = computed(() => authStore.user)
const router = useRouter()

const logoutModalEl = ref(null)
let logoutModal = null

onMounted(() => {
    logoutModal = new bootstrap.Modal(logoutModalEl.value)
})

const openLogoutModal = () => {
    logoutModal.show()
}

const hideModal = () => {
    logoutModal.hide()
}

const confirmLogout = () => {
    authStore.clearSession()
    logoutModal.hide()
    router.push('/login')
}
</script>

<style scoped>
.link-page:hover .icon {
    stroke: #7e05a3 !important;
}

.link-page:hover {
    background-color: #e7e1e85f;
}
.user-info-wrapper{
    margin-left: 5px;
    .name{
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
    }
    .email{
        font-size: 14px;
        line-height: 14px;
        color: #666;
        font-weight: 400;
    }
}
.link-page {
    margin-right: 10px;
    border-radius: 8px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-topbar {
    font-weight: 500;
    font-size: 18px;
}

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
    object-fit: cover;
    /* border: 2px solid #eee; */
    transition: transform 0.2s ease;
    
    img{
        border-radius: 50%;
        width: 35px;
        height: 35px;
    }

}
img.avatar{
    border-radius: 50%;
    width: 35px;
    height: 35px;
}
.profile-group:hover .avatar {
    /* transform: scale(1.05); */
}

.profile-group:hover .hover-bridge {
    display: block;
}

.hover-bridge {
    display: none;
    position: absolute;
    top: 35px;
    right: 0;
    width: 160px;
    height: 20px;
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

    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

/* .profile-group:hover .dropdown,
.profile-group:hover .hover-bridge,
.dropdown:hover {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
} */

.profile-group:hover .hover-bridge {
    opacity: 1 !important;
}

.profile-group:hover .dropdown {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.dropdown-item {
    padding: 0;
}

.dropdown-item span.name {
    font-weight: 450;
    line-height: 12px;
}

.dropdown .dropdown-item .link-dashboard {
    display: block;
    width: 100%;
    padding: 10px;
    text-decoration: none;
    color: #373138 !important;
    box-sizing: border-box;
    border-radius: 10px !important;
    font-weight: 450 !important;
    font-size: 15px !important;
    transition: 0.5s !important;
}

.dropdown .dropdown-item .link-dashboard:hover {
    background-color: #e7e1e85f;
    color: #7e05a3 !important;
}

.dropdown .dropdown-item .link-dashboard .icon {
    stroke: #373138;
    margin-right: 7px;
    transition: 0.5s !important;
}

.dropdown .dropdown-item .link-dashboard:hover .icon {
    stroke: #7e05a3 !important;
}
</style>
