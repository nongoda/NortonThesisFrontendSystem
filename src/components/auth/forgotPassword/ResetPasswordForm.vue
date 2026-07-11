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
        <div class="row justify-content-center">
            <div class="col-5 my-4">
                <div class="card one">
                    <span class="subTitle text-center">Set Your New Password</span>
                    <span class="desc mt-2">Enter a new password for your account. Make sure it’s strong and unique to keep your La Cima Cartel profile secure.</span>                    
                    <form action="" @submit.prevent="resetPassword()" class="mt-3">
                        <div class="failed-message-box mb-3" v-if="resetError">
                            <CircleAlert class="icon" /> {{ resetError }}
                        </div>
                        <div class="">
                            <label for="">New passsword</label>
                            <input type="text" class="form-control" placeholder="Type your new password here" v-model="authStore.resetPasswordForm.password" :class="{'form-control-err' : authStore.v.password.$error}">
                            <span class="warning-msg-input" v-if="authStore.v.password.$error">{{ authStore.v.password.$errors[0].$message }}</span>
                        </div>
                        <div class="mt-3">
                            <label for="">Confirm password</label>
                            <input type="text" class="form-control" placeholder="Type confirmation password" v-model="authStore.resetPasswordForm.password_confirmation" :class="{'form-control-err' : authStore.v.password_confirmation.$error}">
                            <span class="warning-msg-input" v-if="authStore.v.password_confirmation.$error">{{ authStore.v.password_confirmation.$errors[0].$message }}</span>
                        </div>
                        <button type="submit" class="btn-official btn-color w-100 mb-3 mt-4">Reset password</button>
                    </form>
                    <!-- <div class="m-auto">
                        <span class="smalltxt">Don’t have an account yet? </span>
                        <RouterLink to="register" class="link" style="font-size: 14px;">Signup now, it’s free!</RouterLink>
                    </div> -->
                    
                </div>
                <!-- ================= -->
                 <div ref="ctnDom1" class="ogl position-absolute" ></div>
                 <div ref="ctnDom2" class="ogl-second position-absolute"></div>
            </div>
        </div>
    </div>

</template>
<script setup>
    import Lightfall from '@/components/elements/Lightfall.vue';
    import nprogress from 'nprogress';
    import { RouterLink } from 'vue-router';
    import '@/assets/styles/oda.style.css'
    import useVuelidate from '@vuelidate/core';
    import { required, helpers, maxLength, minLength } from '@vuelidate/validators';
    import { useRouter } from 'vue-router';
    import { onMounted, onUnmounted, ref } from 'vue';
    import { AuthStore } from '@/stores/AuthStore.js';
    const authStore = AuthStore();
    const passwordComplexity = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/)
    const resetError = ref('')
    const router = useRouter()

    onMounted(() => {
        const token = localStorage.getItem('reset_token')

        if (!token) {
            router.replace('/send-otp') 
        }
    })

    authStore.v = useVuelidate ({
        // helpers.withMessage('Passwords do not match.', (value) => value === passwordRef.value)
            password: {
                required: helpers.withMessage('Password is required.', required),
                maxLength: helpers.withMessage('Password cannot exceed 254 characters.', maxLength(254)),
                complexity: helpers.withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.', passwordComplexity)
            },
            password_confirmation: {
                required: helpers.withMessage('Password is required.', required),
                maxLength: helpers.withMessage('Password cannot exceed 254 characters.', maxLength(254)),
                complexity: helpers.withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.', passwordComplexity),
                samePassword: helpers.withMessage('Passwords do not match.', (value, vm) => value === vm.password)
        }
    }, authStore.resetPasswordForm)

    const resetPassword = async () => {
        resetError.value = ''

        authStore.v.$validate()
        if (authStore.v.$error) return

        try {
            nprogress.start()

            const res = await authStore.forgotPasswordResetPassword()

            nprogress.done()

            if (res?.result) {

                authStore.saveLoginSession(res)

                localStorage.removeItem('reset_token')
                localStorage.removeItem('otpEmail')

                authStore.clearOtpTimer()

                authStore.resetPasswordForm.password = ''
                authStore.resetPasswordForm.password_confirmation = ''

                authStore.v.$reset()

                router.push('/dashboard')

            } else {
                resetError.value = res?.message || 'Reset failed'
            }

        } catch (error) {
            resetError.value =
                error?.response?.data?.message || 'Something went wrong'
        }
    }

    // =========================
</script>
