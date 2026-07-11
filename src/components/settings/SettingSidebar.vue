<template>
    <div class="pf d-flex align-items-center mb-4">
        <img :src="authStore.user.avatar" alt="">
        <div class="d-flex flex-column ms-2">
            <span class="fw-medium name">{{ authStore.user.name }} <span class="role rounded-pill">{{
                authStore.user.role }}</span></span>
            <span class="email">{{ authStore.user.email }}</span>
        </div>
    </div>
    <div class="setting-sidebar">

        <ul class="list-unstyled text-decoration-none list-setting">

            <li>
                <router-link to="/setting-general">
                    <UserRoundPen :stroke-width="1.75" size="19" class="icon me-2" />
                    General
                </router-link>
            </li>

            <li>
                <router-link to="/setting-password">
                    <Lock :stroke-width="1.75" size="19" class="icon me-2" />
                    Password
                </router-link>
            </li>

            <li>
                <router-link to="/manage-devices">
                    <MonitorSmartphone :stroke-width="1.75" size="19" class="icon me-2" />
                    Manage Devices
                </router-link>
            </li>

            <li>
                <a href="#" @click.prevent="openLogoutModal">
                    <LogOut :stroke-width="1.75" size="19" class="icon me-2" />
                    Logout
                </a>
            </li>
        </ul>
    </div>
    <div class="modal fade" tabindex="-1" ref="logoutModalEl">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-4 d-flex flex-column align-items-center justify-content-center">
                    <div class="logo-wrap">
                        <LogOut :stroke-width="2" size="35" class="i"/>
                    </div>
                    <h5 class="modal-title logout">Logout Confirmation</h5>
                    <span class="ask">Are you sure you want to logout from your account?</span>
                    <div class="d-flex w-100 mt-3">
                        <button class="w-50 me-2 btn btn-official btn-color-cancel rounded-pill" @click="hideModal">
                            Cancel
                        </button>
                        <button class="w-50 ms-2 btn btn-official btn-color-warning rounded-pill" @click="confirmLogout">
                            Yes, log me out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AuthStore } from '@/stores/AuthStore'
import * as bootstrap from 'bootstrap'

const authStore = AuthStore()
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