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
                    <span class="subTitle text-center">Verify to Reset Password</span>
                    <span class="desc mt-1 d-flex align-items-center text-center justify-content-center">We’ve sent
                        a one-time code to
                        <ShinyText :text="maskEmail(email)" :speed="2" :delay="0.5" :disabled="false"
                            :color="'#110c17'" :shine-color="'#b5b5b5'" :spread="100" :direction="'left'"
                            :yoyo="false" :pause-on-hover="false" class="fw-medium ps-1" />
                    </span>
                    <form class="mt-3 OTP">
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
                            
                            <span v-if="resendTimer > 0" class="smalltxt">
                                Resend available in {{ resendTimer }} seconds.
                            </span>

                            <!-- AFTER TIMER ENDS -->
                            <span v-else class="smalltxt">
                                Didn’t receive the code?
                            </span>
                            <button type="button" class="link bg-transparent text-decoration-underline ms-1"
                                style="font-size: 14px;" :disabled="resendTimer > 0 || resendBlocked"
                                @click="resendOtp">
                                Click here to resend
                            </button>
                        </div>
                        <button type="button" @click="verifyOtp"
                            class="btn btn-official btn-color rounded-pill w-100">Verify</button>
                    </form>
                    <div class="d-flex align-items-center justify-content-center mt-3">
                        <a href="#" class="text-decoration-none btn btn-official back" @click.prevent="$router.back()">
                            <MoveLeft class="me-2 icon" /> Back to previous
                        </a>
                    </div>
                </div>
            </div>
            <!-- ================= -->
        </div>
    </div>
</template>
<script setup>
import Vue3OtpInput from 'vue3-otp-input';
import Lightfall from '@/components/elements/Lightfall.vue';
import ShinyText from '@/components/elements/ShinyText.vue';
import { AuthStore } from '@/stores/AuthStore.js';
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
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


const resendBlocked = ref(false)
onBeforeRouteLeave((to, from, next) => {

    if (to.path === '/') {
        authStore.clearOtpTimer()
    }

    next()
})
onMounted(() => {
    const storedEmail = localStorage.getItem('otpEmail')
    const process = localStorage.getItem('forgotPasswordProcess')

    if (!storedEmail || process !== 'true') {
        router.replace('/send-otp')
        return
    }
    email.value = storedEmail
    const hasValidTimer = authStore.loadOtpTimer()

    if (!hasValidTimer) {
        router.replace('/send-otp')
        return
    }
    timer.value = authStore.getRemainingOtpSeconds()
    resendTimer.value = authStore.getRemainingResendSeconds()

    startCountdown()
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

const verifyOtp = async () => {
    // alert('hello')
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
        const res = await authStore.forgotPasswordVerifyOTP(email.value, otp.value)
        nprogress.done()
        
        if (!res?.result) {
            otpError.value = true
            otpMessage.value = res?.message || 'Invalid OTP'
            return
        }

        // localStorage.removeItem('otpEmail')
        localStorage.removeItem('otpStartTime')
        localStorage.removeItem('otpExpiresAt')
        localStorage.removeItem('otpResendAt')
        localStorage.removeItem('loginVerifyProcess')
        localStorage.removeItem('verify_token')
        localStorage.removeItem('forgotPasswordProcess')
        localStorage.removeItem('otp_issued')
        // authStore.clearOtpTimer()
        localStorage.setItem('reset_token', res.data.reset_token)
        router.push('/reset-password')
        
    } catch (err) {
        nprogress.done()
        otpError.value = true
        otpMessage.value = err?.response?.data?.message || 'Invalid OTP'
        // otpMessage.value = res?.message || 'Invalid OTP'
    } finally {
        isVerifying.value = false
    }
}

onUnmounted(() => {
    localStorage.removeItem('forgotPasswordProcess')
})

// const resendOtp = async () => {
//     if (resendTimer.value > 0) return

//     try {
//         const userEmail = email.value

//         const res = await authStore.forgotPasswordResendOTP(userEmail)

//         if (!res?.result) {
//             otpMessage.value = res?.message || 'Failed to resend OTP'
//             return
//         }

//         // update timer ONLY if backend success
//         // authStore.otpExpiresAt = res.data.expires_at

//         timer.value = authStore.getRemainingOtpSeconds()
//         resendTimer.value = authStore.getRemainingResendSeconds()

//         startCountdown()

//         otp.value = ''
//         otpKey.value++

//     } catch (err) {
//         otpError.value = true
//         otpError.value = 'Failed to resend OTP'
//     }
// }


// const resendOtp = async () => {
//     if (resendTimer.value > 0) return

//     const userEmail = email.value

//     await authStore.forgotPasswordResendOTP(userEmail)

//     // ALWAYS reset locally (fake-safe UI)
//     const now = Date.now()

//     authStore.otpTime.startAt = now
//     authStore.otpTime.expiresAt = now + 5 * 60 * 1000
//     authStore.otpTime.resendAt = now + 60 * 1000

//     timer.value = authStore.getRemainingOtpSeconds()
//     resendTimer.value = authStore.getRemainingResendSeconds()

//     startCountdown()

//     otp.value = ''
//     otpKey.value++
// }

// const resendOtp = async () => {
//     if (resendTimer.value > 0 || resendBlocked.value) return

//     const userEmail = email.value

//     try {
//         const res = await authStore.forgotPasswordResendOTP(userEmail)

//         if (!res?.result) {
//             otpError.value = true
//             otpMessage.value = res?.message || 'Please wait before retrying.'

//             resendBlocked.value = true
//             return
//         }

//         resendBlocked.value = false

//         const now = Date.now()

//         authStore.otpTime.startAt = now
//         authStore.otpTime.expiresAt = now + 5 * 60 * 1000
//         authStore.otpTime.resendAt = now + 60 * 1000

//         timer.value = authStore.getRemainingOtpSeconds()
//         resendTimer.value = authStore.getRemainingResendSeconds()

//         startCountdown()

//         otp.value = ''
//         otpKey.value++

//     } catch (err) {
//         otpError.value = true
//         otpMessage.value = 'Failed to resend OTP'
//     }
// }

const resendOtp = async () => {
    if (resendTimer.value > 0 || resendBlocked.value) return

    const userEmail = email.value

    try {
        const res = await authStore.forgotPasswordResendOTP(userEmail)
        const now = Date.now()
        authStore.otpTime.startAt = now
        authStore.otpTime.expiresAt = now + 5 * 60 * 1000
        authStore.otpTime.resendAt = now + 60 * 1000

        timer.value = authStore.getRemainingOtpSeconds()
        resendTimer.value = authStore.getRemainingResendSeconds()

        startCountdown()

        otp.value = ''
        otpKey.value++

        // show message if backend blocked
        if (!res?.result) {
            otpError.value = true
            otpMessage.value = res?.message || 'Please wait before retrying.'
        } else {
            // otpMessage.value = 'OTP resent successfully'
        }

    } catch (err) {
        otpError.value = true
        otpMessage.value = 'Failed to resend OTP'
    }
}

</script>