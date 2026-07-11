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
                        <button type="submit" class="btn-official btn-color w-100 mb-3 mt-4">Send OTP</button>
                    </form>
                    <div class="d-flex align-items-center justify-content-center mt-3">
                        <a href="#" class="text-decoration-none btn btn-official back text-black" @click.prevent="$router.back()">
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
    import Lightfall from '@/components/elements/Lightfall.vue';
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

    // localStorage.setItem('otp_email', email);
    localStorage.setItem('forgotPasswordProcess', 'true');

    try {
        const res = await authStore.forgotPasswordSendPin();

        // optional: still log response
        console.log('OTP response:', res);

    } catch (err) {
        console.log('ignored backend error:', err);
    }

    nprogress.done();

    router.push('/verify-otp');

    authStore.emailForgotpassword.email = '';
    authStore.v.$reset();
};

    // ========================
  
</script>
