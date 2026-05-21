<template>
    <div class="container auth verify">
        <div class="particles-container">
            <Particles
                :particle-count="700"
                :particle-spread="15"
                :speed="0.1"
                :particle-colors="['#7e05a3']"
                :move-particles-on-hover="true"
                :particle-hover-factor="0.8"
                :alpha-particles="false"
                :particle-base-size="70"
                :size-randomness="4"
                :camera-distance="2"                
                :disable-rotation="false"
                class="h-full"
            />
        </div>
        <div class="row mt-4 justify-content-center">
            <div class="col-5">
                <div class="card" style="z-index: 2;">
                    <img src="../../assets/images/LA CIMA CARTEL_light_mode.svg" alt="" height="25px" class="mb-2">
                    <span class="subTitle text-center">Join the Movement</span>
                    <span class="desc mt-1 mb-3">Your journey into beats, creativity, and passion starts here.</span>                    
                    <form action="" @submit.prevent="loginUser()">
                        <div class="failed-message-box mb-3"
                            v-if="authStore.errorFields.email && authStore.errorFields.password">
                            <CircleAlert class="icon" /> Invalid email or password
                        </div>
                        <div class="">
                            <label for="email">Email address</label>
                            <input type="text" id="email" v-model="authStore.loginForm.email" class="form-control"
                                :class="{ 'form-control-err': authStore.v.email.$error || authStore.errorFields.email }"
                                placeholder="Type your email here">
                            <span class="warning-msg-input" v-for="err in authStore.v.email.$errors">
                                {{ err.$message }}
                            </span>
                        </div>
                        <div class="mt-3 mb-3">
                            <label for="password">Password</label>

                            <div class="password-wrapper">
                                <input :type="showPassword ? 'text' : 'password'" id="password"
                                    v-model="authStore.loginForm.password" class="form-control" :class="{
                                        'form-control-err': authStore.v.password.$error || authStore.errorFields.password
                                    }" placeholder="Type your password here" />

                                <!-- Eye Toggle -->
                                <span class="eye-icon" @click="showPassword = !showPassword">
                                    <Eye v-if="!showPassword" size="18" />
                                    <EyeOff v-else size="18" />
                                </span>
                            </div>

                            <span class="warning-msg-input" v-for="err in authStore.v.password.$errors">
                                {{ err.$message }}
                            </span>

                            <span v-if="authStore.errorFields.password && !authStore.errorFields.email"
                                class="warning-msg-input">
                                Invalid password
                            </span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <RouterLink to="send-otp" class="text-decoration-none forgot text-end text-end">Forgot
                                password?</RouterLink>
                        </div>
                        <button type="submit" class="btn-offcial btn-color w-100 mt-4">Login now</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .particles-container {
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1!important;
    overflow: visible;
  }
  .password-wrapper {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>

<script setup>
import ShinyText from '../elements/ShinyText.vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import '@/assets/styles/oda.style.css'
import Particles from '../elements/Particles.vue';
import { onMounted, onUnmounted, watch, useTemplateRef, ref, computed } from 'vue';
import nprogress from 'nprogress';
import { AuthStore } from '@/stores/AuthStore.js';
const showPassword = ref(false)
import { required, email, maxLength, helpers } from '@vuelidate/validators';
const router = useRouter()
const authStore = AuthStore();

// =====================================================
const passwordComplexity = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/)
const rules = {
    email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Please enter a valid email address', email)
    },
    password: {
        required: helpers.withMessage('Password is required.', required),
        maxLength: helpers.withMessage('Password cannot exceed 254 characters.', maxLength(254)),
        complexity: helpers.withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.', passwordComplexity)
    }
}
authStore.v = useVuelidate(rules, authStore.loginForm)

const loginUser = async () => {
    authStore.v.$validate()
    if (authStore.v.$error) return

    try {
        nprogress.start()

        const res = await authStore.login(
            authStore.loginForm.email,
            authStore.loginForm.password
        )
        if (!res.result) {
            authStore.errorFields.email = true
            authStore.errorFields.password = true
            nprogress.done()
            return
        }
        
        localStorage.setItem('verify_token', res.data.verify_token)
        localStorage.setItem('loginVerifyProcess', 'true')
        
        await authStore.sendAccessPin(authStore.loginForm.email, 'email_verification',localStorage.getItem('verify_token'))
        router.push('/verify-access')
        nprogress.done()

        authStore.loginForm.email = ''
        authStore.loginForm.password = ''
        authStore.v.$reset()

    } catch (error) {
        nprogress.done()
        // console.error(error.response?.data || error.message)
    } finally {
    }
}
// ========================
</script>
