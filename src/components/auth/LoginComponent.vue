<template>
    <div class="container auth verify">
        <div class="particles-container">
            <Particles
                :particle-count="400"
                :particle-spread="10"
                :speed="0.1"
                :particle-colors="['#e8ccff']"
                :move-particles-on-hover="true"
                :particle-hover-factor="0.8"
                :alpha-particles="false"
                :particle-base-size="70"
                :size-randomness="1"
                :camera-distance="20"
                :disable-rotation="false"
                class="h-full"
            />
        </div>
        <div class="row mt-4 justify-content-between pb-5 mb-3">
            <div class="col-6 pt-5">
                <div class="z-1">
                    <ShinyText 
                      text="Welcome to La Cima Cartel! Get ready to explore beats!"
                      :speed="2"
                      :delay="0.5"
                      :disabled="false"
                      :color="'#ffffff'"
                      :shine-color="'#b5b5b5'"
                      :spread="200"
                      :direction="'left'"
                      :yoyo="false"
                      :pause-on-hover="false"
                      class="title"
                  />
                  <!-- <div class="title">Welcome to La Cima Cartel! Get ready to explore beats!</div> -->
                  <div class="desc text-start mt-2">Experience the energy, passion, and creativity of La Cima Cartel as we
                      bring you the beats, stories, and performances that are shaping the future of Cambodian hip-hop.
                  </div>
                  <div class=" mt-3 d-flex">
                      <span class="">Contact us:</span>
                      <a class="text-decoration-none ps-2 d-flex align-items-center justify-content-center" href="mailto:odanongpf@gmail.com?subject=Support Request&body=Hello, I need help with...">
                          <!-- <AtSign size="16"/>  -->
                           <Mail size="16" class="me-1"/>
                           <ShinyText 
                                text="odanongpf@gmail.com"
                                :speed="2"
                                :delay="0.5"
                                :disabled="false"
                                :color="'#ffffff'"
                                :shine-color="'#b5b5b5'"
                                :spread="100"
                                :direction="'left'"
                                :yoyo="false"
                                :pause-on-hover="false"
                                class="fw-medium"
                            />
                           
                      </a>
                  </div>
                </div>

            </div>
            <div class="col-5">
                <div class="card">
                    <span class="subTitle text-center">Join the Movement</span>
                    <span class="desc mt-2">Your journey into beats, creativity, and passion starts here.</span>
                    <RouterLink to="" class="text-decoration-none btn btn-offcial btn-no-color rounded-pill mt-4">
                        <img src="../../assets/images/google.png" style="height: 23px; margin-right: 10px;" alt="">
                        Continue with Google
                    </RouterLink>
                    <div class="or-line mb-3 mt-3">
                        <span>Or</span>
                    </div>
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
                            <input type="text" id="password" v-model="authStore.loginForm.password" class="form-control"
                                :class="{ 'form-control-err': authStore.v.password.$error || authStore.errorFields.password }"
                                placeholder="Type your password here">
                            <span class="warning-msg-input" v-for="err in authStore.v.password.$errors">
                                {{ err.$message }}
                            </span>
                            <span v-if="authStore.errorFields.password && !authStore.errorFields.email" class="warning-msg-input" >
                                Invalid password
                            </span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <RouterLink to="send-otp" class="text-decoration-none forgot text-end text-end">Forgot
                                password?</RouterLink>
                        </div>
                        <button type="submit" class="btn-offcial btn-color w-100 mb-3 mt-4">Login now</button>
                    </form>
                    <div class="m-auto">
                        <span class="smalltxt">Don’t have an account yet? </span>
                        <RouterLink to="register" class="link" style="font-size: 14px;">Signup now, it’s free!
                        </RouterLink>
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
    z-index: -1!important;
    overflow: visible;
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

const router = useRouter()
const authStore = AuthStore();
import { required, email, maxLength, helpers } from '@vuelidate/validators';
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
            return
        }

        localStorage.setItem('verify_token', res.data.verify_token)
        localStorage.setItem('loginVerifyProcess', 'true')
        
        await authStore.sendAccessPin(authStore.loginForm.email, 'email_verification',localStorage.getItem('verify_token'))
        router.push('/verify-access')

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
