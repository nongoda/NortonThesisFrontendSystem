<template>
    <div class="container auth forgotPassword">
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
        <div class="row justify-content-center">        
            <div class="col-5">
                <div class="card one" style="z-index: 4;">
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
                    <div class="d-flex align-items-center justify-content-center">
                        <a href="#" class="text-decoration-none btn btn-offcial back text-black" @click.prevent="$router.back()">
                            <MoveLeft class="me-2 icon" /> Back to previous page
                        </a>
                    </div>
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
</style>

<script setup>
    import Particles from '@/components/elements/Particles.vue';
    import nprogress from 'nprogress';
    import { RouterLink } from 'vue-router';
    import '@/assets/styles/oda.style.css'
    import useVuelidate from '@vuelidate/core';
    import { required, email, helpers } from '@vuelidate/validators';
    import { AuthStore } from '@/stores/AuthStore';
    import { useRouter } from 'vue-router';
    import { onMounted } from 'vue';

    onMounted(() => {
        authStore.clearOtpTimer()
    })

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

    nprogress.start();

    const email = authStore.emailForgotpassword.email;

    localStorage.setItem('otp_email', email);
    localStorage.setItem('forgotPasswordProcess', 'true');

    try {
        const res = await authStore.forgotPasswordSendPin();

        // optional: still log response
        console.log('OTP response:', res);

    } catch (err) {
        console.log('ignored backend error:', err);
    }

    nprogress.done();

    // 🔥 ALWAYS GO NEXT
    router.push('/verify-otp');

    authStore.emailForgotpassword.email = '';
    authStore.v.$reset();
};

    // ========================
  
</script>
