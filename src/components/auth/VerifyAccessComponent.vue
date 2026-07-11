<template>
    <div class="lighfall-container" style="z-index: -1;">
        <div class="lighfall-wrapper">
            <Lightfall
              :colors="['#ffffff', '#ffffff', '#FF9FFC']"
              background-color="#7C3AED"
              :speed="0.2"
              :streak-count="2"
              :streak-width="0.5"
              :streak-length="1"
              :glow="0.2"
              :density="1"
              :twinkle="1"
              :zoom="1.2"
              :background-glow="0.5"
              :opacity="1"
              :mouse-interaction="false"
              :mouse-strength="1"
              :mouse-radius="0.6"
            />

        </div>
    </div>
    <div class="container auth forgotPassword login">

            <div class="row justify-content-center pt-2">
                <div class="col-5 mt-3">
                    <div class="card one second">
                        <span class="subTitle text-center">OTP Verification</span>
                        <span class="desc mt-2 d-flex align-items-center text-center justify-content-center">We’ve sent
                            a one-time code to
                            <ShinyText :text="maskEmail(email)" :speed="2" :delay="0.5" :disabled="false"
                                :color="'#110c17'" :shine-color="'#b5b5b5'" :spread="100" :direction="'left'"
                                :yoyo="false" :pause-on-hover="false" class="fw-medium ps-1" />
                        </span>
                        <!-- <form class="mt-3 OTP"  @submit.prevent="() => { console.log('submit triggered'); verifyOtp() }"> -->
                        <form class="mt-3 OTP">
                            <!-- <form class="mt-3 OTP" @submit.prevent="verifyOtp"> -->
                            <div class="">
                                <label for="" class="d-flex align-items-center justify-content-start">OTP Verification
                                    <small class="desc text-start d-flex ps-1">( Expires in: {{ formatTime }}
                                        )</small></label>
                                <Vue3OtpInput :key="otpKey" v-model="otp" :num-inputs="6" input-type="number"
                                    separator=" " @on-complete="onOtpComplete" :is-disabled="timer === 0"
                                    class="otp-input"
                                    :class="{ 'otp-input-err': otpError, 'otp-input-disabled': timer === 0 }" />
                            </div>
                            <span class="text-start warning-msg-input" style="font-size: 14px!important;">{{ otpMessage
                                }}</span>
                            <div class="d-flex align-items-center justify-content-start my-3">
                                <!-- <span class="smalltxt">Resend available in {{ resendTimer }} seconds.</span>
                                <button type="button" class="link bg-transparent text-decoration-underline ms-1"
                                    style="font-size: 14px;" :disabled="resendTimer > 0" @click="resendOtp">
                                    Resend code
                                </button> -->
                                <span v-if="resendTimer > 0" class="smalltxt">
                                    Resend available in {{ resendTimer }} seconds.
                                </span>

                                <!-- AFTER TIMER ENDS -->
                                <span v-else class="smalltxt">
                                    Didn’t receive the code?
                                </span>

                                <!-- LINK BUTTON -->
                                <button type="button" class="link bg-transparent text-decoration-underline ms-1"
                                    style="font-size: 14px;" :disabled="resendTimer > 0" @click="resendOtp">
                                    Click here to resend
                                </button>
                            </div>
                            <button type="button" @click="verifyOtp"
                                class="btn btn-official btn-color rounded-pill w-100">Verify</button>
                            <router-link to="/" class="back-page m-auto w-100 d-flex align-items-center justify-content-center mt-3">
                                <ArrowLeft :size="18" :stroke-width="1.75" /> Back to pervious
                            </router-link>
                        </form>
                    </div>
                </div>
                <!-- ================= -->
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
    z-index: -1 !important;
    overflow: visible;
}
</style>
<script setup>
import Vue3OtpInput from 'vue3-otp-input';
import Particles from '../elements/Particles.vue';
import ShinyText from '../elements/ShinyText.vue';
import Lightfall from '../elements/Lightfall.vue';
import { AuthStore } from '@/stores/AuthStore.js';
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import nprogress from 'nprogress';
import { onBeforeRouteLeave } from 'vue-router'
const router = useRouter()

const authStore = AuthStore();
const email = ref('')
const otp = ref('')
const otpKey = ref(0)
const otpError = ref(false)
const otpMessage = ref('')
const isVerifying = ref(false)

const timer = ref(0)
const resendTimer = ref(0)

let intervalId = null
// =================================================
onMounted(() => {
    const storedEmail = localStorage.getItem('otpEmail')

    if (!storedEmail) {
        otpMessage.value = 'Session expired. Please login again.'
        return
    }

    email.value = storedEmail

    const ok = authStore.loadOtpTimer()

    if (!ok) {
        timer.value = 0
        resendTimer.value = 0
        return
    }

    timer.value = authStore.getRemainingOtpSeconds()
    resendTimer.value = authStore.getRemainingResendSeconds()

    startCountdown()
})

onBeforeRouteLeave((to, from, next) => {

    if (to.path === '/') {
        authStore.clearOtpTimer()
    }

    next()
})
const startCountdown = () => {
    if (intervalId) clearInterval(intervalId)

    intervalId = setInterval(() => {
        timer.value = authStore.getRemainingOtpSeconds()
        resendTimer.value = authStore.getRemainingResendSeconds()

        if (timer.value <= 0 && resendTimer.value <= 0) {
            clearInterval(intervalId)
        }
    }, 1000)
}

const maskEmail = (val) => {
    if (!val || !val.includes('@')) return val
    const [name, domain] = val.split('@')
    return name.slice(0, 2) + '****@' + domain
}

const formatTime = computed(() => {
    const m = String(Math.floor(timer.value / 60)).padStart(2, '0')
    const s = String(timer.value % 60).padStart(2, '0')
    return `${m}:${s}`
})

const onOtpComplete = (value) => {
    otp.value = value

    otpError.value = false
    otpMessage.value = ''

    if (value.length === 6) {
        verifyOtp()
    }
}
watch(otp, () => {
    otpError.value = false
    otpMessage.value = ''
})
const roleRedirect = {
  admin: '/dashboard',     // admin → dashboard
  manager: '/home',        // manager → home
  staff: '/home-page'     // staff → sample page
}
const verifyOtp = async () => {

    otpError.value = false
    otpMessage.value = ''

    if (!otp.value || otp.value.length !== 6) {
        otpError.value = true
        otpMessage.value = 'Please enter full 6-digit OTP'
        return
    }

    isVerifying.value = true

    try {
        nprogress.start()
        const res = await authStore.verifyAccessPin({
            email: email.value,
            pin: otp.value,
            device: navigator.userAgent,
            verify_token: localStorage.getItem('verify_token')
        })
        nprogress.done()

        if (res?.result) {
            authStore.saveLoginSession(res)
            authStore.clearOtpTimer()
            router.push('/dashboard')
        } else {
            otpError.value = true
            otpMessage.value = res?.message || 'Invalid OTP'
        }

    } catch (err) {
    } finally {
        isVerifying.value = false
    }
}

const resendOtp = async () => {
    if (resendTimer.value > 0) return

    try {
        const userEmail = email.value || localStorage.getItem('otpEmail')

        // const res = await authStore.sendAccessPin(userEmail)
        const res = await authStore.sendAccessPin(
            userEmail,
            'email_verification',
            localStorage.getItem('verify_token')
        )

        if (!res?.result) {
            otpMessage.value = res?.message || 'Failed to resend OTP'
            return
        }

        // update timer ONLY if backend success
        authStore.otpExpiresAt = res.data.expires_at

        timer.value = authStore.getRemainingOtpSeconds()
        resendTimer.value = authStore.getRemainingResendSeconds()

        startCountdown()

        otp.value = ''
        otpKey.value++

    } catch (err) {
        otpError.value = 'Failed to resend OTP'
    }
}
</script>