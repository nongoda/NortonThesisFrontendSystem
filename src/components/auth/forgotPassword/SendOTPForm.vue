<template>
    <div class="container auth forgotPassword">
        <div class="particles-container">
            <Particles :particle-count="400" :particle-spread="10" :speed="0.1" :particle-colors="['#e8ccff']"
                :move-particles-on-hover="false" :particle-hover-factor="0.8" :alpha-particles="false"
                :particle-base-size="70" :size-randomness="1" :camera-distance="20" :disable-rotation="false"
                class="h-full" />
        </div>
        <div class="row justify-content-center">
            <div class="col-5 mt-5">
                <div class="card one">
                    <span class="subTitle text-center">Forgot Your Password?</span>
                    <span class="desc mt-2">Enter your email to receive a PIN to reset your password.</span>                    
                    <form action="" @submit.prevent="sendOTP()" class="mt-3">
                        <div class="">
                            <label for="">Email address</label>
                            <input type="text" class="form-control" placeholder="Type your email here" v-model="authStore.emailForgotpassword.email" :class="{'form-control-err' : authStore.v.email.$error}">
                            <span class="warning-msg-input" v-for="err in authStore.v.email.$errors">{{ err.$message }}</span>
                        </div>
                        <button type="submit" class="btn-offcial btn-color w-100 mb-3 mt-4">Send OTP</button>
                    </form>
                    <div class="m-auto">
                        <span class="smalltxt">Don’t have an account yet? </span>
                        <RouterLink to="register" class="link" style="font-size: 14px;">Signup now, it’s free!</RouterLink>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
    import Particles from '@/components/elements/Particles.vue';
    import nprogress from 'nprogress';
    import { RouterLink } from 'vue-router';
    import '@/assets/styles/oda.style.css'
    import useVuelidate from '@vuelidate/core';
    import { required, email, helpers } from '@vuelidate/validators';
    import { AuthStore } from '@/stores/AuthStore';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const authStore = AuthStore();
    const rule = {
        email: {
            required: helpers.withMessage('Email is required.', required),
            email: helpers.withMessage('Please enter a valid email address', email)
        }
    }
    authStore.v = useVuelidate(rule, authStore.emailForgotpassword)
    // ========================
    const sendOTP = async () => {
        authStore.v.$validate();
        if (authStore.v.$error) return;

        try {
            nprogress.start()

            const email = authStore.emailForgotpassword.email

            // store email for next step
            localStorage.setItem('otp_email', email)
            localStorage.setItem('forgotPasswordProcess', 'true')

            // optional: try sending OTP (but don't depend on result)
            await authStore.forgotPasswordSendPin()

            nprogress.done()

            // ALWAYS move forward
            router.push('/verify-otp')

            authStore.emailForgotpassword.email = ''
            authStore.v.$reset()

        } catch (error) {
            nprogress.done()

            // STILL go to verify page even if backend fails (important for security)
            router.push('/verify-otp')
        }
    }

    // ========================
  
</script>
