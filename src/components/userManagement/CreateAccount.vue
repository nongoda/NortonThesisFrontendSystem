<script setup>
import { reactive, onMounted, nextTick, watch  } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { UserManagementStore } from '@/stores/UserManagementStore'
import $ from 'jquery'
import { useRouter } from 'vue-router'

const userStore = UserManagementStore()
const router = useRouter()
const serverErrors = reactive({
    email: [],
    phone: [],
    emailError: false,
    phoneError: false

})
const form = reactive({
    name: '',
    email: '',
    phone: '',
    gender: '',
    role: ''
})

const rules = {
    name: {
        required: helpers.withMessage(
            'Full name is required',
            required
        )
    },

    email: {
        required: helpers.withMessage(
            'Email address is required',
            required
        ),

        email: helpers.withMessage(
            'Invalid email address',
            email
        )
    },

    phone: {
        required: helpers.withMessage(
            'Phone number is required',
            required
        )
    },

    gender: {
        required: helpers.withMessage(
            'Gender is required',
            required
        )
    },

    role: {
        required: helpers.withMessage(
            'Role is required',
            required
        )
    }
}

const v$ = useVuelidate(rules, form)

const initDropdowns = async () => {

    await nextTick()

    $('.gender-dropdown').dropdown({
        onChange(value) {
            form.gender = value
            v$.value.gender.$touch()
        }
    })

    $('.role-dropdown').dropdown({
        onChange(value) {
            form.role = value
            v$.value.role.$touch()
        }
    })

    if (form.gender) {
        $('.gender-dropdown').dropdown('set selected', form.gender)
    }

    if (form.role) {
        $('.role-dropdown').dropdown('set selected', form.role)
    }
}

onMounted(async () => {

    window.$ = window.jQuery = $

    await import('fomantic-ui-css/semantic.min.js')

    await initDropdowns()
})

const submitForm = async () => {

    const result = await v$.value.$validate()
    if (!result) return

    try {

        const formData = new FormData()

        formData.append('name', form.name)
        formData.append('email', form.email)
        formData.append('phone', form.phone)
        formData.append('gender', form.gender)
        formData.append('role', form.role)

        const token = localStorage.getItem('auth_token')

        await userStore.createAccount(token, formData)        
        router.push('/user-management')

    } catch (error) {

        const res = error?.response?.data

        serverErrors.email = []
        serverErrors.phone = []

        serverErrors.emailError = false
        serverErrors.phoneError = false

        if (res?.errors?.email) {
            serverErrors.email = res.errors.email
            serverErrors.emailError = true
        }

        if (res?.errors?.phone) {
            serverErrors.phone = res.errors.phone
            serverErrors.phoneError = true
        }
    }
}

const capitalize = (value) => {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1)
}
watch(() => form.gender, (val) => {
    if (val) {
        $('.gender-dropdown').dropdown('set selected', val)
    }
})

watch(() => form.role, (val) => {
    if (val) {
        $('.role-dropdown').dropdown('set selected', val)
    }
})

watch(() => form.email, () => {
    serverErrors.emailError = false
    serverErrors.email = []
})

watch(() => form.phone, () => {
    serverErrors.phoneError = false
    serverErrors.phone = []
})
</script>

<template>
    <div class="container user-management">
        <div class="table-content mt-0">

            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Create Account</div>

                    <span class="small-detail">
                        Set up a new account and assign the appropriate role and access permissions for the user.
                    </span>
                </div>
            </div>

            <form class="form-create" @submit.prevent="submitForm">

                <div class="row top-border">

                    <!-- LEFT -->
                    <div class="col-7">

                        <div class="wrapper">

                            <div class="title-wrapper">
                                User Information
                            </div>

                            <div class="desc-wrapper">
                                View and manage essential account details and personal information for this user.
                            </div>

                            <!-- FULL NAME -->
                            <div class="mt-4">
                                <label>Full name:</label>

                                <input type="text" placeholder="Enter full name" class="form-control"
                                    v-model="form.name" :class="{ 'form-control-err': v$.name.$error }">

                                <span class="warning-msg-input" v-for="err in v$.name.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>

                            <!-- EMAIL -->
                            <div class="mt-4">
                                <label>Email address:</label>

                                <input type="text" placeholder="Enter email address" class="form-control"
                                    v-model="form.email" :class="{ 'form-control-err': v$.email.$error || serverErrors.emailError}">

                                <span class="warning-msg-input" v-for="err in v$.email.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                                <span class="warning-msg-input" v-for="err in serverErrors.email" :key="err">
                                    {{ err }}
                                </span>
                            </div>

                            <!-- PHONE -->
                            <div class="mt-4">
                                <label>Phone number:</label>

                                <input type="text" placeholder="Enter phone number" class="form-control"
                                    v-model="form.phone" :class="{ 'form-control-err': v$.phone.$error|| serverErrors.phoneError}">

                                <span class="warning-msg-input" v-for="err in v$.phone.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                                <span class="warning-msg-input" v-for="err in serverErrors.phone" :key="err">
                                    {{ err }}
                                </span>
                            </div>

                            <!-- GENDER -->
                            <div class="mt-4">
                                <label>Gender:</label>

                                <div class="ui selection dropdown gender-dropdown form-control"
                                    :class="{ 'form-control-err': v$.gender.$error }">
                                    <input type="hidden">
                                    
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="default text">
                                            {{ capitalize(form.gender) || 'Select gender' }}
                                        </div>
                                        <i class="dropdown icon"></i>                                        
                                    </div>

                                    <div class="menu">
                                        <div class="item" data-value="female">
                                            Female
                                        </div>

                                        <div class="item" data-value="male">
                                            Male
                                        </div>

                                        <div class="item" data-value="other">
                                            Other
                                        </div>
                                    </div>
                                </div>

                                <span class="warning-msg-input" v-for="err in v$.gender.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>

                        </div>

                        <div class="note mt-3">
                            <span>
                                Note: Please check the account information carefully before creating the account.
                                Once created, the admin will not be able to update the account information.
                            </span>
                        </div>

                        <button type="submit" class="btn btn-official btn-color mt-3">
                            Create account
                        </button>

                    </div>

                    <!-- RIGHT -->
                    <div class="col-5">

                        <div class="wrapper left-side h-100">

                            <div class="title-wrapper">
                                Account Role
                            </div>

                            <div class="desc-wrapper">
                                Select the appropriate role to define this user’s access level and responsibilities.
                            </div>

                            <div class="mt-3">

                                <div class="ui fluid selection dropdown role-dropdown form-control"
                                    :class="{ 'form-control-err': v$.role.$error }">
                                    <input type="hidden">

                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="default text">
                                            {{ capitalize(form.role) || 'Select role' }}
                                        </div>
                                        <i class="dropdown icon"></i>
                                    </div>

                                    <div class="menu">

                                        <div class="item" data-value="manager">
                                            Manager
                                        </div>

                                        <div class="item" data-value="staff">
                                            Staff
                                        </div>

                                    </div>
                                </div>

                                <span class="warning-msg-input" v-for="err in v$.role.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </form>
        </div>
    </div>
</template>