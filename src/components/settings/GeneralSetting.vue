<template>
    <div class="row setting">
        <div class="pf d-flex align-items-center mb-4">
            <img :src="user.avatar" alt="">
            <div class="d-flex flex-column ms-2">
                <span class="fw-medium name">{{ user.name }} <span class="role rounded-pill">{{ user.role}}</span>/{{ currentSettingPage }}</span>
                <span class="email">Update your profile information and manage your account</span>
            </div>
        </div>
        <div class="col-3">
            <SettingSidebar />
        </div>
        <div class="col-9 general">
            <div class="d-flex align-items-center">
                <input ref="fileInput" type="file" class="d-none" accept="image/png,image/jpeg,image/jpg,image/webp"
                    @change="handleFileChange" />
                <button class="position-relative avatar-btn" @click="openPicker">
                    <img :src="previewAvatar || user.avatar" class="avatar z-2" alt="">
                    <div class="icon-wrapper position-absolute end-0 bottom-0">
                        <SwitchCamera size="22" class="icon " />
                    </div>
                </button>
                <div class="ms-3">
                    <div class="d-flex flex-column">
                        <span class="title-form">Upload new picture</span>
                        <small class="short-desc">Supported formats: PNG, JPG, JPEG, WEBP • Maximum file size:
                            2MB</small>
                    </div>
                    <div class="d-flex mt-2">
                        <button class="btn btn-offcial btn-color rounded-pill" @click="openPicker">
                            Upload picture
                        </button>
                        <button class="btn btn-offcial btn-color-cancel rounded-pill ms-2"  @click="removeAvatar">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <form @submit.prevent="updateProfile()" class="mt-4">
                <div class="title-form mb-2">Personal Information</div>

                <div class="d-flex w-100">
                    <!-- Full Name -->
                    <div class="w-50 pe-3">
                        <label for="fullname">Full name</label>

                        <input type="text" id="fullname" v-model="settingStore.profileForm.name" class="form-control"
                            :class="{ 'form-control-err': settingStore.v.name.$error }"
                            placeholder="Type your full name">

                        <span class="warning-msg-input" v-for="err in settingStore.v.name.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                    </div>

                    <!-- Gender -->
                    <div class="w-50 ps-3">
                        <label>Gender</label>

                        <div class="d-flex gap-3 mt-2">
                            <div>
                                <input type="radio" id="male" value="male" v-model="settingStore.profileForm.gender">
                                <label for="male" class="ms-1">Male</label>
                            </div>

                            <div>
                                <input type="radio" id="female" value="female"
                                    v-model="settingStore.profileForm.gender">
                                <label for="female" class="ms-1">Female</label>
                            </div>

                            <div>
                                <input type="radio" id="other" value="other" v-model="settingStore.profileForm.gender">
                                <label for="other" class="ms-1">Other</label>
                            </div>
                        </div>

                        <span class="warning-msg-input" v-for="err in settingStore.v.gender.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                    </div>
                </div>

                <!-- Email -->
                <div class="mt-3">
                    <label for="email">Email address</label>

                    <input type="text" id="email" class="form-control disabled" v-model="settingStore.profileForm.email"
                        disabled>
                </div>

                <!-- Phone -->
                <div class="mt-3">
                    <label for="phone">Phone number</label>
                    <input type="text" id="phone" v-model="settingStore.profileForm.phone" class="form-control"
                        :class="{ 'form-control-err': settingStore.v.phone.$error }"
                        placeholder="Type your phone number" inputmode="numeric" />
                    <span class="warning-msg-input" v-for="err in settingStore.v.phone.$errors" :key="err.$uid">
                        {{ err.$message }}
                    </span>
                </div>
                <button type="submit" class="btn btn-offcial btn-color rounded-pill mt-3" :disabled="!isProfileChanged">
                    Update information
                </button>
            </form>
        </div>
    </div>

    <div class="modal fade" id="cropModal" tabindex="-1" ref="cropModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header d-flex">
                    <span class="modal-title-sm">
                        Crop Avatar
                    </span>
                </div>
                <div class="modal-body p-0">
                    <Cropper ref="cropper" :src="selectedImage" :stencil-component="CircleStencil" :stencil-props="{
                        aspectRatio: 1
                    }" :image-restriction="'fit-area'" :default-boundaries="'fit'"
                        :default-size="{ width: 250, height: 250 }" :resize-image="true" :transitions="true"
                        class="cropper" />

                </div>
                <div class="modal-footer flex-column d-flex align-items-center justify-content-center">
                    <small class="mb-2 d-flex align-items-center justify-content-center">
                        <Info :stroke-width="1.75" size="15" class="me-1" />Once uploaded, your new avatar will be
                        public.
                    </small>
                    <div class="d-flex">
                        <button class="btn btn-offcial btn-color-cancel rounded-pill me-2" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button class="btn btn-offcial btn-color rounded-pill" @click="saveCrop">
                            Update profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import SettingSidebar from './SettingSidebar.vue';
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { AuthStore } from '@/stores/AuthStore';
import { useRoute } from 'vue-router';
import '@/assets/styles/oda.style.css'
import 'vue-advanced-cropper/dist/style.css';
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import { SettingStore } from '@/stores/SettingStore';
import * as bootstrap from 'bootstrap'
import { helpers, required, maxLength  } from '@vuelidate/validators';
import nprogress from 'nprogress';
const originalProfile = ref({})
const settingStore = SettingStore()
const authStore = AuthStore();
const route = useRoute();

const isProfileChanged = computed(() => {
    return (
        settingStore.profileForm.name !== originalProfile.value.name ||
        settingStore.profileForm.gender !== originalProfile.value.gender ||
        settingStore.profileForm.phone !== originalProfile.value.phone
    )
})
onMounted(async () => {
    await authStore.getCurrentUser();

    settingStore.profileForm.name = authStore.user?.name || ''
    settingStore.profileForm.email = authStore.user?.email || ''
    settingStore.profileForm.phone = authStore.user?.phone || ''
    settingStore.profileForm.gender = authStore.user?.gender?.toLowerCase() || 'other'

    // original form snapshot
    originalProfile.value = {
        name: settingStore.profileForm.name,
        gender: settingStore.profileForm.gender,
        phone: settingStore.profileForm.phone
    }
})
const currentSettingPage = computed(() => {
    const pages = {
        '/setting-general': 'General',
        '/setting-password': 'Password',
        '/setting-notification': 'Notifications',
        '/setting-logout': 'Logout'
    }

    return pages[route.path] || 'Settings'
})
const user = computed(() => authStore.user)

// ---------------------------------
// Crop image process
const fileInput = ref(null)
const cropper = ref(null)
const cropModal = ref(null)

const selectedImage = ref(null)
const previewAvatar = ref(null)

const MAX_SIZE = 2 * 1024 * 1024

const openPicker = () => {
    fileInput.value.click()
}

const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const allowed = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp'
    ]

    if (!allowed.includes(file.type)) {
        alert('Only PNG, JPG, JPEG, WEBP allowed')
        return
    }

    if (file.size > MAX_SIZE) {
        alert('Image max size is 2MB')
        return
    }

    selectedImage.value = URL.createObjectURL(file)

    const modal = new bootstrap.Modal(cropModal.value)
    modal.show()
}

const saveCrop = async () => {
    const result = cropper.value?.getResult()
    if (!result || !result.canvas) {
        alert('Crop failed')
        return
    }
    const canvas = result.canvas
    canvas.toBlob(async (blob) => {
        if (!blob) return

        const formData = new FormData()
        formData.append('avatar', blob, 'avatar.png')

        try {
            const res = await settingStore.updateAvatar(
                authStore.token,
                formData
            )

            // update local user immediately (better UX)
            authStore.user.avatar = res.data.avatar

            await authStore.getCurrentUser()

            bootstrap.Modal
                .getInstance(cropModal.value)
                .hide()

        } catch (err) {
            console.error(err)
        }

    }, 'image/png')
}
// -------------------------------------------------------------
// Update profile form
const phoneNumber = helpers.regex(
    'phoneNumber',
    /^[0-9]{9,15}$/
)
const rules = {
    name: {
        required: helpers.withMessage(
            'Full name is required.',
            required
        ),

        maxLength: helpers.withMessage(
            'Full name must not exceed 100 characters.',
            maxLength(100)
        )
    },

    gender: {
        required: helpers.withMessage(
            'Gender is required.',
            required
        )
    },
    phone: {
        phoneNumber: helpers.withMessage(
            'Phone number must contain only numbers and be between 9 to 15 digits.',
            helpers.regex(/^[0-9]{9,15}$/)
        )
    }
}

settingStore.v = useVuelidate(
    rules,
    settingStore.profileForm
)

const updateProfile = async () => {
    settingStore.v.$validate()

    if (settingStore.v.$error) return

    try {
        const token = localStorage.getItem('auth_token')

        nprogress.start()

        await settingStore.updateProfile(
            token,
            settingStore.profileForm
        )

        authStore.user.name = settingStore.profileForm.name
        originalProfile.value = {
            name: settingStore.profileForm.name,
            gender: settingStore.profileForm.gender,
            phone: settingStore.profileForm.phone
        }
        nprogress.done()

    } catch (error) {
        nprogress.done()
    }
}

const removeAvatar = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        nprogress.start()
        const res = await settingStore.removeAvatar(token)
        authStore.user.avatar = res.data.avatar
        previewAvatar.value = null
        nprogress.done()
    } catch (error) {
        console.log(error)
    }
}

</script>
<style scoped>
.cropper {
    height: 400px;
    width: 100%;
    background: #111;
}
</style>