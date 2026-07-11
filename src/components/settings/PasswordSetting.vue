<template>
    <div class="row setting">
        <div class="col-3">
            <SettingSidebar />
        </div>
        <div class="col-9 general password">
            <div class="title-form">Change Password</div>
            <small class="short-desc mb-2">Update your password to keep your account secure.</small>
            <button key="btn" type="button"
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
                </button>
        </div>
    </div>
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 45%!important;">
            <div class="modal-content lacima-modal-style">
                <div class="modal-title">Change Password</div>
                <small class="short-desc">Make sure your new password is strong and different from your current
                    one.</small>
                <form @submit.prevent="submitPassword" key="form" style="margin-top: 10px;">
                    <div>
                        <label>Current password</label>

                        <input type="password" class="form-control" v-model="form.current_password"
                            placeholder="Enter your current password" :class="{
                                'form-control-err':
                                    v$.current_password.$error ||
                                    backendErrors.current_password
                            }">
                        <span class="warning-msg-input" v-for="err in v$.current_password.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.current_password">
                            {{ backendErrors.current_password }}
                        </span>
                    </div>
                    <div class="mt-3">
                        <label>New password</label>

                        <input type="password" class="form-control" v-model="form.new_password"
                            placeholder="Enter your new password" :class="{
                                'form-control-err':
                                    v$.new_password.$error ||
                                    backendErrors.new_password
                            }">

                        <span class="warning-msg-input" v-for="err in v$.new_password.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.new_password">
                            {{ backendErrors.new_password }}
                        </span>
                    </div>
                    <div class="mt-3">
                        <label>Confirmation password</label>

                        <input type="password" class="form-control" v-model="form.new_password_confirmation"
                            placeholder="Confirm your new password" :class="{
                                'form-control-err':
                                    v$.new_password_confirmation.$error ||
                                    backendErrors.new_password_confirmation
                            }">
                        <span class="warning-msg-input" v-for="err in v$.new_password_confirmation.$errors"
                            :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.new_password_confirmation">
                            {{ backendErrors.new_password_confirmation }}
                        </span>
                    </div>
                </form>
                <div class="mt-4 d-flex justify-content-between align-items-start">
                    <button @click="handleForgotPassword" :disabled="resendCountdown > 0"
                        class="text-decoration-none btn btn-no-color px-0 forgot text-end text-end bg-transparent" :class="{'text-decoration-underline' : resendCountdown < 0}">
                        {{ resendCountdown > 0
                            ? `Forgot password available in ${resendCountdown}s`
                            : 'Forgot password?'
                        }}    
                    </button>
                    <div class="d-flex ">
                        <button type="button" class="btn btn-official btn-color-cancel rounded-pill me-2"
                            @click="closePasswordModal">
                            Cancel
                        </button>

                        <button class="btn btn-official btn-color rounded-pill" type="submit" @click="submitPassword">
                            Update password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="otpModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 45%;">
            <div class="modal-content lacima-modal-style">

                <div class="modal-title">Verify OTP</div>
                <small class="short-desc">
                    Enter the 6-digit code sent to your email.
                </small>

                <form @submit.prevent="verifyOtp" class="mt-2">
                    <label v-if="otpCountdown > 0" class="">
                        OTP (Expires in {{ formatOtpCountdown }}s)
                    </label>
                    <label v-else class="text-danger">
                        OTP (Expired)
                    </label>
                    <input type="text" class="form-control" v-model="otp" placeholder="Enter the OTP here" :class="{'form-control-err' : otpError}"/>
                    <span v-if="otpError" class="warning-msg-input">
                        {{ otpError }}
                    </span>
                    
                </form>
                <div class="d-flex justify-content-between align-items-start mt-3">
                    <button @click="resendOtp" :disabled="resendCountdown > 0"
                        class="text-decoration-none btn btn-no-color px-0 forgot text-end text-end bg-transparent py-0">
                        {{ resendCountdown > 0
                            ? `Resend available in ${resendCountdown }s`
                            : 'Resend OTP'
                        }}    
                    </button>
                    <div class="d-flex justify-content-start">
                        <button type="button" class="btn btn-official btn-color-cancel rounded-pill me-2 me-2"
                            @click="closeOtpModal">
                            Cancel
                        </button>

                        <button type="submit" @click="verifyOtp" class="btn btn-official btn-color rounded-pill">
                            Verify
                        </button>

                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="modal fade" id="resetPasswordModal">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 45%;">
            <div class="modal-content lacima-modal-style">

            <div class="modal-title">Set New Password</div>

            <form @submit.prevent="submitResetPassword">
                <div class="mt-4">
                    <label for="">
                        New password
                    </label>
                    <input class="form-control" v-model="resetForm.password" type="password" placeholder="New password" />
                </div>
                <div class="mt-3">
                    <label for="">Confirmation new password</label>
                    <input class="form-control" v-model="resetForm.password_confirmation" type="password" placeholder="Confirm password" />
                </div>

                <button class="btn btn-official btn-color mt-4" type="submit">Update Password</button>

            </form>

            </div>
        </div>
    </div>
</template>

<script setup>
// import Aurora from '../elements/Aurora.vue';
import { AuthStore } from '@/stores/AuthStore';
// import Sidebar from './Sidebar.vue';
import { Modal } from 'bootstrap'
import { computed, onMounted, ref, reactive, onUnmounted  } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import { SettingStore } from '@/stores/SettingStore'
import { nextTick } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import SettingSidebar from './SettingSidebar.vue'

const resetPasswordModal = ref(null)
const resetForm = reactive({
    password: '',
    password_confirmation: ''
})
const passwordModal = ref(null)
const otpModal = ref(null)
const settingStore = SettingStore()
const authStore = AuthStore()
const route = useRoute()
const toast = useToast()
const otp = ref('')
const otpCountdown = ref(0)
const resendCountdown = ref(0)

let otpTimer = null
let resendTimer = null

const otpError = ref('')
const closeOtpModal = () => {
    clearOtpState()
    otpModal.value.hide()
}
const startResendCountdown = (retryAfter) => {

    if (resendTimer) clearInterval(resendTimer)

    const update = () => {
        resendCountdown.value = Math.max(
            0,
            Math.floor((new Date(retryAfter) - new Date()) / 1000)
        )

        if (resendCountdown.value <= 0) {
            clearInterval(resendTimer)
        }
    }

    update()

    resendTimer = setInterval(update, 1000)
}
const startOtpCountdown = (expiresAt) => {

    if (otpTimer) clearInterval(otpTimer)

    const update = () => {
        otpCountdown.value = Math.max(
            0,
            Math.floor((new Date(expiresAt) - new Date()) / 1000)
        )

        if (otpCountdown.value <= 0) {
            clearInterval(otpTimer)
        }
    }

    update()

    otpTimer = setInterval(update, 1000)
}

const resetPasswordForm = async () => {
    // showPasswordForm.value = false

    await nextTick()

    form.current_password = ''
    form.new_password = ''
    form.new_password_confirmation = ''

    backendErrors.current_password = ''
    backendErrors.new_password = ''
    backendErrors.new_password_confirmation = ''

    v$.value.$reset()
}
const closePasswordModal = async () => {
    resetPasswordForm()

    await nextTick()

    const modalEl = document.getElementById('passwordModal')
    const modalInstance = Modal.getInstance(modalEl)

    if (modalInstance) {
        modalInstance.hide()
    }
}
// FORM STATE
const form = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})

const backendErrors = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})
// VALIDATION RULES
const rules = computed(() => ({
    current_password: {
        required: helpers.withMessage(
            'Current password is required',
            required
        )
    },

    new_password: {

        required: helpers.withMessage(
            'New password is required',
            required
        ),

        strongPassword: helpers.withMessage(
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
            value => {
                if (!value) return true

                const hasLower = /[a-z]/.test(value)
                const hasUpper = /[A-Z]/.test(value)
                const hasNumber = /[0-9]/.test(value)
                const hasSpecial = /[@$!%*#?&]/.test(value)
                const hasMinLength = value.length >= 8

                return hasLower && hasUpper && hasNumber && hasSpecial && hasMinLength
            }
        )
    },

    new_password_confirmation: {

        required: helpers.withMessage(
            'Confirmation password is required',
            required
        ),

        sameAs: helpers.withMessage(
            'Password confirmation does not match',
            sameAs(form.new_password)
        )
    }
}))

const v$ = useVuelidate(rules, form)

onMounted(async () => {
    await authStore.getCurrentUser();
    const auth = await authStore.fetchUser()
    console.log(auth)
    passwordModal.value = new Modal(document.getElementById('passwordModal'));
    otpModal.value = new Modal(document.getElementById('otpModal'));
    resetPasswordModal.value = new Modal(document.getElementById('resetPasswordModal'));

    const savedExpiry = localStorage.getItem("otp_expires_at")
    if (savedExpiry) {
        startOtpCountdown(savedExpiry)
    }

    const savedRetry = localStorage.getItem("otp_retry_after")
    if (savedRetry) {
        startResendCountdown(savedRetry)
    }
});
const openPasswordModal = () => {
    v$.value.$reset()
    passwordModal.value.show()
}
const submitPassword = async () => {

    // successMessage.value = ''

    backendErrors.current_password = ''
    backendErrors.new_password = ''
    backendErrors.new_password_confirmation = ''

    const isValid = await v$.value.$validate()

    if (!isValid) return

    try {

        const token = authStore.token

        const res = await settingStore.updatePassword(token, {
            current_password: form.current_password,
            new_password: form.new_password,
            new_password_confirmation: form.new_password_confirmation
        })

        if (!res.result) {

            if (res.message.includes('Current password')) {
                backendErrors.current_password = res.message
            }

            else if (res.message.includes('New password')) {
                backendErrors.new_password = res.message
            }

            return
        }
        if (res.data.token) {
            alert(res.data.token)
            authStore.token = res.data.token
            localStorage.setItem('auth_token',res.data.token)
        }

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message || 'Password updated successfully',
            life: 3000
        })

        form.current_password = ''
        form.new_password = ''
        form.new_password_confirmation = ''

        backendErrors.current_password = ''
        backendErrors.new_password = ''
        backendErrors.new_password_confirmation = ''

        v$.value.$reset()

        showPasswordForm.value = false

    } catch (err) {

        if (err.response?.status === 422) {

            const errors = err.response.data.errors

            if (errors.current_password) {
                backendErrors.current_password = errors.current_password[0]
            }

            if (errors.new_password) {
                backendErrors.new_password = errors.new_password[0]
            }

            if (errors.new_password_confirmation) {
                backendErrors.new_password_confirmation =
                    errors.new_password_confirmation[0]
            }
        }
    }
}

const handleForgotPassword = async () => {
    resetPasswordForm()
    passwordModal.value.hide()

    const token = authStore.token
    const res = await settingStore.sendChangePasswordOtp(token)

    if (!res.result) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
            life: 3000
        })
        return
    }

    otpModal.value.show()

    localStorage.setItem("otp_expires_at", res.data.expires_at)
    startOtpCountdown(res.data.expires_at)

    localStorage.setItem("otp_retry_after", res.data.retry_after)
    startResendCountdown(res.data.retry_after)
}
const resendOtp = async () => {
    if (resendCountdown.value > 0) return

    const token = authStore.token
    const res = await settingStore.sendChangePasswordOtp(token)

    if (!res.result) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
            life: 3000
        })
        return
    }

    toast.add({
        severity: 'success',
        summary: 'OTP Sent',
        detail: 'New OTP has been sent',
        life: 3000
    })

    localStorage.setItem("otp_expires_at", res.data.expires_at)
    startOtpCountdown(res.data.expires_at)

    localStorage.setItem("otp_retry_after", res.data.retry_after)
    startResendCountdown(res.data.retry_after)
}
const verifyOtp = async () => {
    otpError.value = ''

    try {
        const token = authStore.token

        const res = await axios.post(
            '/change-password/verify-otp',
            { pin: otp.value },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        if (!res.data.result) {
            otpError.value = res.data.message || 'Invalid OTP'
            return
        }
        otpModal.value.hide()
        await nextTick()
        otp.value = ''
        otpError.value = ''
        resetPasswordModal.value.show()

    } catch (err) {
        otpError.value =
            err.response?.data?.message || 'Something went wrong'
    }
}
const submitResetPassword = async () => {
    try {
        const token = authStore.token

        const res = await axios.put(
            '/change-password/reset',
            {
                password: resetForm.password,
                password_confirmation: resetForm.password_confirmation
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        if (res.data.result) {
            if (res.data.data?.token) {
                authStore.token = res.data.data.token

                localStorage.setItem(
                    'auth_token',
                    res.data.data.token
                )
            }
            resetForm.password = ''
            resetForm.password_confirmation = ''

            resetPasswordModal.value.hide()

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: res.data.message || 'Password updated successfully',
                life: 3000
            })
        }

    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err.response?.data?.message || 'Failed to reset password',
            life: 3000
        })
    }
}
const formatOtpCountdown = computed(() => {
    const total = otpCountdown.value

    const minutes = Math.floor(total / 60)
    const seconds = total % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
const clearOtpState = () => {
    localStorage.removeItem("otp_expires_at")
    localStorage.removeItem("otp_retry_after")

    if (otpTimer) clearInterval(otpTimer)
    if (resendTimer) clearInterval(resendTimer)
}
onUnmounted(() => {
    localStorage.removeItem("otp_expires_at")
    localStorage.removeItem("otp_retry_after")
    if (otpTimer) clearInterval(otpTimer)
    if (resendTimer) clearInterval(resendTimer)
})
</script>



<!-- <script setup>
import SettingSidebar from './SettingSidebar.vue'
import { computed, onMounted, ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
import { AuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'
import { SettingStore } from '@/stores/SettingStore'
import { nextTick } from 'vue'
import { useToast } from 'primevue/usetoast'

// =====================

// =====================


const settingStore = SettingStore()
const authStore = AuthStore()
const route = useRoute()
const showPasswordForm = ref(false)
const toast = useToast()
const successMessage = ref('')
const hasLowercase = helpers.regex(/[a-z]/)
const hasUppercase = helpers.regex(/[A-Z]/)
const hasNumber = helpers.regex(/[0-9]/)
const hasSpecialChar = helpers.regex(/[@$!%*#?&]/)

const resetPasswordForm = async () => {
    showPasswordForm.value = false

    await nextTick()

    form.current_password = ''
    form.new_password = ''
    form.new_password_confirmation = ''

    backendErrors.current_password = ''
    backendErrors.new_password = ''
    backendErrors.new_password_confirmation = ''

    v$.value.$reset()
}

// FORM STATE
const form = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})

const backendErrors = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})
// VALIDATION RULES
const rules = computed(() => ({
    current_password: {
        required: helpers.withMessage(
            'Current password is required',
            required
        )
    },

    new_password: {

        required: helpers.withMessage(
            'New password is required',
            required
        ),

        strongPassword: helpers.withMessage(
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
            value => {
                if (!value) return true

                const hasLower = /[a-z]/.test(value)
                const hasUpper = /[A-Z]/.test(value)
                const hasNumber = /[0-9]/.test(value)
                const hasSpecial = /[@$!%*#?&]/.test(value)
                const hasMinLength = value.length >= 8

                return hasLower && hasUpper && hasNumber && hasSpecial && hasMinLength
            }
        )
    },

    new_password_confirmation: {

        required: helpers.withMessage(
            'Confirmation password is required',
            required
        ),

        sameAs: helpers.withMessage(
            'Password confirmation does not match',
            sameAs(form.new_password)
        )
    }
}))

const v$ = useVuelidate(rules, form)

// FETCH USER
onMounted(async () => {
    await authStore.getCurrentUser()
})

// PAGE TITLE
const currentSettingPage = computed(() => {
    const pages = {
        '/setting-general': 'General',
        '/setting-password': 'Password',
        '/setting-notification': 'Notifications',
        '/setting-logout': 'Logout'
    }
    return pages[route.path] || 'Settings'
})

const submitPassword = async () => {

    successMessage.value = ''

    backendErrors.current_password = ''
    backendErrors.new_password = ''
    backendErrors.new_password_confirmation = ''

    const isValid = await v$.value.$validate()

    if (!isValid) return

    try {

        const token = authStore.token

        const res = await settingStore.updatePassword(token, {
            current_password: form.current_password,
            new_password: form.new_password,
            new_password_confirmation: form.new_password_confirmation
        })

        // IMPORTANT
        if (!res.result) {

            if (res.message.includes('Current password')) {
                backendErrors.current_password = res.message
            }

            else if (res.message.includes('New password')) {
                backendErrors.new_password = res.message
            }

            return
        }

        successMessage.value = res.message

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message || 'Password updated successfully',
            life: 3000
        })

        form.current_password = ''
        form.new_password = ''
        form.new_password_confirmation = ''

        backendErrors.current_password = ''
        backendErrors.new_password = ''
        backendErrors.new_password_confirmation = ''

        v$.value.$reset()

        showPasswordForm.value = false

    } catch (err) {

        if (err.response?.status === 422) {

            const errors = err.response.data.errors

            if (errors.current_password) {
                backendErrors.current_password = errors.current_password[0]
            }

            if (errors.new_password) {
                backendErrors.new_password = errors.new_password[0]
            }

            if (errors.new_password_confirmation) {
                backendErrors.new_password_confirmation =
                    errors.new_password_confirmation[0]
            }
        }
    }
}
</script> -->