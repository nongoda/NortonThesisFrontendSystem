<template>
    <div class="row setting">
        <div class="pf d-flex align-items-center mb-4">
            <img :src="authStore.user.avatar" alt="">
            <div class="d-flex flex-column ms-2">
                <span class="fw-medium name">{{ authStore.user.name }} <span class="role rounded-pill">{{
                    authStore.user.role }}</span>/{{ currentSettingPage }}</span>
                <span class="email">Update your profile information and manage your account</span>
            </div>
        </div>
        <div class="col-3">
            <SettingSidebar />
        </div>
        <div class="col-9 general password">
            <div class="title-form">Change Password</div>
            <small class="short-desc mb-2">Update your password to keep your account secure.</small>
            <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster">

                <!-- BUTTON -->
                <button v-if="!showPasswordForm" key="btn" type="button"
                    class="d-flex flex-row justify-content-between align-items-center w-100 btn-dropwdown"
                    @click="showPasswordForm = true">
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

                    <ChevronRight stroke-width="1.75" />
                </button>

                <form v-else @submit.prevent="submitPassword" key="form" style="margin-top: 15px;">

                    <!-- CURRENT PASSWORD -->
                    <div>
                        <label>Current password</label>

                        <input type="password" class="form-control" v-model="form.current_password"
                            placeholder="Enter your current password" :class="{
                                'form-control-err':
                                    v$.current_password.$error ||
                                    backendErrors.current_password
                            }">
                        <!-- <input type="password" class="form-control" v-model="form.current_password"
                            placeholder="Enter your current password"
                            :class="{ 'form-control-err': v$.current_password.$error }"> -->

                        <span class="warning-msg-input" v-for="err in v$.current_password.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.current_password">
                            {{ backendErrors.current_password }}
                        </span>
                    </div>

                    <!-- NEW PASSWORD -->
                    <div class="mt-3">
                        <label>New password</label>

                        <input type="password" class="form-control" v-model="form.new_password"
                            placeholder="Enter your new password" :class="{
                                'form-control-err':
                                    v$.new_password.$error ||
                                    backendErrors.new_password
                            }">
                        <!-- <input type="password" class="form-control" v-model="form.new_password"
                            placeholder="Enter your new password"
                            :class="{ 'form-control-err': v$.new_password.$error }"> -->

                        <span class="warning-msg-input" v-for="err in v$.new_password.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.new_password">
                            {{ backendErrors.new_password }}
                        </span>
                    </div>

                    <!-- CONFIRM PASSWORD -->
                    <div class="mt-3">
                        <label>Confirmation password</label>

                        <input type="password" class="form-control" v-model="form.new_password_confirmation"
                            placeholder="Confirm your new password" :class="{
                                'form-control-err':
                                    v$.new_password_confirmation.$error ||
                                    backendErrors.new_password_confirmation
                            }">

                        <!-- <input type="password" class="form-control" v-model="form.new_password_confirmation"
                            placeholder="Confirm your new password"
                            :class="{ 'form-control-err': v$.new_password_confirmation.$error }"> -->

                        <span class="warning-msg-input" v-for="err in v$.new_password_confirmation.$errors"
                            :key="err.$uid">
                            {{ err.$message }}
                        </span>
                        <span class="warning-msg-input" v-if="backendErrors.new_password_confirmation">
                            {{ backendErrors.new_password_confirmation }}
                        </span>

                    </div>
                    <!-- <div v-if="serverError" class="warning-msg-input mt-2">
                        {{ serverError }}
                    </div> -->

                    <!-- SUCCESS MESSAGE -->
                    <!-- <div v-if="successMessage" class="success-msg mt-2">
                        {{ successMessage }}
                    </div> -->

                    <!-- ACTION BUTTONS -->
                    <div class="d-flex mt-3">
                        <button type="button" class="btn btn-official btn-color-cancel rounded-pill me-2"
                            @click="resetPasswordForm">
                            <!-- @click="showPasswordForm = false"> -->
                            Cancel
                        </button>

                        <button class="btn btn-official btn-color rounded-pill" type="submit">
                            Update password
                        </button>
                    </div>

                </form>

            </transition>
        </div>
    </div>
</template>

<script setup>
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
</script>