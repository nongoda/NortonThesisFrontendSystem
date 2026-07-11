<template>
    <div class="row setting">
        <div class="col-3">
            <SettingSidebar />
        </div>
        <div class="col-9 general password">
            <div class="title-form">Active Devices & Sessions</div>
            <small class="short-desc mb-3 d-flex">View and manage devices that are signed in to your
            account.</small>
            <div v-if="loading" class="text-center py-5">
                    Loading devices...
            </div>
            <div class="" v-else-if="devices.length > 0">
                <div class="device-wrapper " v-for="device in devices" :key="device.id">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="device">
                                <component :is="getDeviceIcon(device.device_name)" :size="28" />
                            </div>
                            <div class="ms-2">
                                <div class="name-device">{{ device.device_name }} <span class="active status"
                                        v-if="device.is_current_device">Active Now</span></div>
                                <div class="d-flex align-items-center">
                                    <div class="info">IP address: <span class="val">{{ device.ip_address }}</span>
                                    </div>
                                    <div class="line-mid"></div>
                                    <div class="info">Last login at: <span class="val">{{
                                            formatDate(device.last_login_at) }}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="" style="width: fit-content!important;">
                            <button class="btn-official btn-color-text-warning rounded-pill" @click="openTerminateModal('single', device)"
                                :disabled="openingDeviceId === device.id">
                                Terminate Session
                            </button>
                        </div>
                    </div>
                </div>
                <button v-if="devices.length > 1" class="w-100 btn btn-full-width-del" @click="openTerminateModal('all')"
                    :disabled="openingDeviceId === 'all'">
                    <Hand :stroke-width="1.5" :size="20" style="margin-right: 4px;"/>                        
                    Terminate all sessions
                </button>
            </div>
            <!-- <button key="btn" type="button"
                    class="d-flex flex-row justify-content-between align-items-center w-100 btn-dropwdown"
                    @click="openPasswordModal">
                    <div>
                        <span class="label-dropdown">Current password</span>

                        <span class="dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </span>
                    </div>
                    <Pencil stroke-width="1.75" />
            </button> -->
        </div>
    </div>
    <div class="modal fade" tabindex="-1" 
        ref="terminateModalRef" id="terminateModal">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 600px!important; height: fit-content!important;">
            <div class="modal-content lacima-modal-style">
                    <div class="modal-title">
                        {{ terminateType === 'all'
                            ? 'Terminate All Sessions'
                            : 'Terminate Session'
                        }}
                    </div>
                    <template v-if="terminateType === 'single'">
                        <span class="short-desc">
                            Are you sure you want to terminate this session?
                        </span>
                        <div class="device-confirm mt-3">
                            <div class="name-device">
                                {{ selectedDevice?.device_name }}
                            </div>
                            <div class="d-flex">
                                <div class="info">
                                    IP address:
                                    {{ selectedDevice?.ip_address }}
                                </div> 
                                <div class="mx-2">-</div>
                                <div class="info">
                                    Last login at: {{ formatDate(selectedDevice?.last_login_at) }}
                                </div>

                            </div>
                        </div>

                        <span class="short-desc mt-3 mb-0" style="color: rgb(216, 2, 2)!important;">
                            This device will be signed out.
                        </span>
                    </template>

               <template v-else>
                    <span class="short-desc">
                        The following sessions will be terminated:
                    </span>
                    <div v-for="device in devices" :key="device.id" class="device-confirm mt-2">
                        <div class="name-device">
                            {{ device.device_name }}
                            <span v-if="device.is_current_device" class="active status ms-2">
                                Current Device
                            </span>
                        </div>

                        <div class="d-flex flex-wrap">
                            <div class="info">
                                IP: {{ device.ip_address }}
                            </div>

                            <div class="mx-2">-</div>

                            <div class="info">
                                Last login:
                                {{ formatDate(device.last_login_at) }}
                            </div>
                        </div>
                    </div>

                    <span class="short-desc mt-3"
                        style="color: rgb(216, 2, 2)!important; font-weight: 400; line-height: 18px;">
                        This will sign you out from all devices, including this current device.
                        You will need to log in again.
                    </span>
                </template>


                <div class="d-flex align-items-center justify-content-between mt-3">
                    <button class="btn btn-official btn-color-cancel rounded-pill" @click="closeTerminateModal">
                        Cancel
                    </button>
                    <button class="btn btn-official btn-color-warning rounded-pill" @click="confirmTerminate">
                        {{ terminateType === 'all'
                            ? 'Terminate All'
                            : 'Terminate Session'
                        }}
                    </button>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
// import Aurora from '../elements/Aurora.vue';
import { AuthStore } from '@/stores/AuthStore';
// import Sidebar from './Sidebar.vue';
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SettingStore } from '@/stores/SettingStore'
import { useToast } from 'primevue/usetoast'
// import SpotlightCard from "../elements/SpotlightCard.vue";
import {
    Laptop,
    Monitor,
    Smartphone,
    Tablet,
} from "lucide-vue-next";
import SettingSidebar from './SettingSidebar.vue';

const terminateModalRef = ref(null)
let terminateModal = null
const loadingModal = ref(false)
const devices = ref([])
const loading = ref(false)
const settingStore = SettingStore()
const authStore = AuthStore()
const route = useRoute()
const toast = useToast()

const showTerminateModal = ref(false)
const terminateType = ref('single')
const selectedDevice = ref(null)
const openingDeviceId = ref(null)

const openTerminateModal = (type, device = null) => {
    terminateType.value = type
    selectedDevice.value = device

    terminateModal.show()
}

const closeTerminateModal = () => {
    terminateModal.hide()

    selectedDevice.value = null
}
const getDeviceIcon = (deviceName) => {
    const name = deviceName.toLowerCase();

    if (
        name.includes("windows") ||
        name.includes("mac") ||
        name.includes("linux") ||
        name.includes("desktop") ||
        name.includes("laptop") ||
        name.includes("pc")
    ) {
        return Laptop;
    }

    if (
        name.includes("android") ||
        name.includes("iphone") ||
        name.includes("mobile") ||
        name.includes("phone")
    ) {
        return Smartphone;
    }

    if (
        name.includes("ipad") ||
        name.includes("tablet")
    ) {
        return Tablet;
    }

    return Monitor; // fallback
};
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
const fetchDevices = async () => {
    loading.value = true
    try {
        const token = authStore.token
        const currentFingerprint =authStore.user?.current_device?.device_fingerprint
        const res = await settingStore.getDevices(token, currentFingerprint)

        if (res.result) {
            devices.value = res.data
        }
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load devices.',
            life: 3000
        })
    } finally {
        loading.value = false
    }
}
const confirmTerminate = async () => {
    try {

        if (terminateType.value === 'single') {

            const res = await settingStore.revokeDevice(
                authStore.token,
                selectedDevice.value.id
            )

            if (res.result) {
                fetchDevices()
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Session terminated successfully.',
                    life: 3000
                })

                // remove from UI immediately
                devices.value = devices.value.filter(
                    device => device.id !== selectedDevice.value.id
                )
            }


        } else {
            const token = localStorage.getItem('auth_token')
            const res = await settingStore.revokeAllDevices(
                token
            )

            if (res.result) {

                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'All sessions have been terminated.',
                    life: 3000
                })


                // logout current user
                await authStore.logout()

                // redirect login page
                router.push('/login')
            }
        }


    } catch (err) {

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to terminate session.',
            life: 3000
        })

    } finally {

        closeTerminateModal()

    }
}
onMounted(async () => {
    await authStore.getCurrentUser();
    await fetchDevices()
    terminateModal = new Modal(terminateModalRef.value)

    terminateModalRef.value.addEventListener('hidden.bs.modal', () => {
        selectedDevice.value = null
        terminateType.value = 'single'
    })

});
</script>

<style scoped>
.cropper {
    height: 400px;
    width: 100%;
    background: #111;
}
</style>