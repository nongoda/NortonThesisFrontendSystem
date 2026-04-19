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
        <div class="row mt-4 mb-4 pb-5 justify-content-between">
            <div class="col-6 pt-5">
                <ShinyText 
                      text="Begin Your Place in a Collective That Elevates Sound and Culture"
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
                <!-- <div class="title">Begin Your Place in a Collective That Elevates Sound and Culture</div> -->
                <div class="desc text-start mt-2">Create your account to join a creative space for artists, listeners, and visionaries. La Cima Cartel connects people through bold music and original expression beyond the ordinary.</div>
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
            <div class="col-5">
                <div class="card">
                    <span class="subTitle text-center">Start Your Journey</span>
                    <span class="desc mt-2">Discover new releases, connect with emerging, join a community of music lovers, and experience music.</span>
                    <RouterLink to="" class="text-decoration-none btn btn-offcial btn-no-color rounded-pill mt-4">
                        <img src="../../assets/images/google.png" style="height: 23px; margin-right: 10px;" alt=""> Continue with Google
                    </RouterLink>
                    <div class="or-line mb-3 mt-3">
                        <span>Or</span>
                    </div>
                    <form action="" @submit.prevent="register()">
                        <div>
                            <label for="">Full name</label>
                            <input type="text" v-model="registerForm.name" class="form-control" :class="{ 'form-control-err': authStore.v.name.$error }" placeholder="Type your full name here">
                            <span class="warning-msg-input" v-if="authStore.v.name.$error">{{ authStore.v.name.$errors[0].$message }}</span>
                        </div>
                        <div class="my-3">
                            <label for="">Email address</label>
                            <input type="text" v-model="registerForm.email" class="form-control":class="{ 'form-control-err': authStore.v.email.$error || authStore.errorFields.email }" placeholder="Type your email here">
                            <!-- <span class="warning-msg-input" v-if="emailError">{{ emailError  }}</span> -->
                            <span 
                                v-if="authStore.v.email.$error || authStore.errorFields.email" 
                                class="warning-msg-input"
                                >
                                {{
                                    authStore.v.email.$error
                                    ? authStore.v.email.$errors[0].$message
                                    : authStore.errorFields.email
                                }}
                                </span>
                        </div>
                        <div class="mb-3">
                            <label for="">Password</label>
                            <input type="text" v-model="registerForm.password" class="form-control" :class="{ 'form-control-err': authStore.v.password.$error }" placeholder="Type your password here">
                            <span class="warning-msg-input" v-if="authStore.v.password.$error">{{ authStore.v.password.$errors[0].$message }}</span>
                        </div>
                        <div>
                            <label for="">Confirmation password</label>
                            <input type="text" v-model="registerForm.password_confirmation" class="form-control"  placeholder="Type your confirmation password here">
                            <span class="warning-msg-input" v-if="authStore.v.password_confirmation.$error">{{ authStore.v.password_confirmation.$errors[0].$message }}</span>
                        </div>
                        <div class="mt-4 mb-4 d-flex align-items-center">
                            <label class="mb-0 d-flex">
                                <input type="checkbox" class="input">
                                <span class="custom-checkbox"></span>
                            </label>
                            <label for="" class="ms-2 mb-0 normal">I agree to <span style="text-decoration: underline;">Terms & Conditions</span> and <span style="text-decoration: underline;">Privacy Policy</span></label>
                        </div>
                        <button type="submit" class="btn-offcial btn-color w-100 my-3">Create account</button>
                    </form>
                    <div class="m-auto">
                        <span class="smalltxt">Already have an account? </span>
                        <RouterLink to="login" class="link" style="font-size: 14px;">Click here</RouterLink>
                    </div>
                    
                </div>
                <!-- ================= -->
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
import { RouterLink, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import '@/assets/styles/oda.style.css'
import { AuthStore } from '@/stores/AuthStore';
import nprogress from 'nprogress';
import Particles from '../elements/Particles.vue';


const router = useRouter();
const authStore = AuthStore();
const registerForm = authStore.registerForm;
import { required, email, minLength, maxLength, helpers, sameAs } from '@vuelidate/validators';
import ShinyText from '../elements/ShinyText.vue';
// =====================================================
const passwordComplexity = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/)
const rules = {
    name: {
        required: helpers.withMessage('Full name is required.', required),
        minLength: helpers.withMessage('Full name must be at least 3 characters.', minLength(3)),
        maxLength: helpers.withMessage('Full name cannot exceed 100 characters.', maxLength(100)),
    },

    email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Please enter a valid email address.', email),
        maxLength: helpers.withMessage('Email cannot exceed 254 characters.', maxLength(254)),
    },

    password: {
        required: helpers.withMessage('Password is required.', required),
        minLength: helpers.withMessage('Password must be at least 8 characters.', minLength(8)),
        maxLength: helpers.withMessage('Password cannot exceed 254 characters.', maxLength(254)),
        complexity: helpers.withMessage(
            'Password must include uppercase, lowercase, number, and a special character.',
            passwordComplexity
        ),
    },

    password_confirmation: {
        required: helpers.withMessage('Password confirmation is required.', required),
        // sameAsPassword: helpers.withMessage(
        //     'Password confirmation does not match.',
        //     sameAs(() => authStore.registerForm.password)
        // ),
        samePassword: helpers.withMessage(
            'Passwords do not match.',
            (value, vm) => !value || value === vm.password
        ),
    },
}
authStore.v = useVuelidate(rules, authStore.registerForm)
// =====================================================
const register = async () => {
    authStore.errorFields = {}
    
    authStore.v.$validate()
    if (authStore.v.$error) return
    try {
        nprogress.start()
        const res = await authStore.register()
        // if (!res.result) {
        //     authStore.errorFields.email = true
        //     authStore.errorFields.password = true
        //     return
        // }
        // if (res.message && res.message.includes('email')) {
        //     authStore.errorFields = {}
        //     authStore.errorFields.email = res.message
        //     return
        // }
        
        localStorage.setItem('verify_token', res.data.verify_token)
        localStorage.setItem('loginVerifyProcess', 'true')

        await authStore.sendAccessPin(authStore.registerForm.email, 'email_verification',localStorage.getItem('verify_token'))
        router.push('/verify-access')

        authStore.registerForm.name = ''
        authStore.registerForm.email = ''
        authStore.registerForm.password = ''
        authStore.registerForm.password_confirmation = ''
        authStore.v.$reset();
        

    } catch (error) {
    if (error.response?.status === 422) {
        const errors = error.response.data.errors

        authStore.errorFields = {}

        Object.keys(errors).forEach((field) => {
            authStore.errorFields[field] = errors[field][0]
        })
    }
    }finally{
            nprogress.done();
        }
    }

// const setValidationErrors = (errors) => {
//     authStore.errorFields = {}

//     Object.keys(errors).forEach((field) => {
//         authStore.errorFields[field] = errors[field][0]
//     })
// }

</script>
