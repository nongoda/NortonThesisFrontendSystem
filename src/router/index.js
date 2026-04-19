import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import SendOTPView from '@/views/auth/forgotPassword/SendOTPView.vue'
import VerifyOTPView from '@/views/auth/forgotPassword/VerifyOTPView.vue'
import ResetPasswordView from '@/views/auth/forgotPassword/ResetPasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { AuthStore } from '@/stores/AuthStore'
import VerifyAccessView from '@/views/auth/VerifyAccessView.vue'

nprogress.configure({
  showSpinner: false, 
  tickleSpeed: 500, minimum: 0.2
})


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: {title: 'Welcome', guestOnly: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {title: 'Login', guestOnly: true}
    },
    {
      path: '/verify-access',
      name: 'verify-access',
      component: VerifyAccessView,
      meta: {title: 'Verify Access', guestOnly: true, requiresOtp: true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {title: 'Register', guestOnly: true}
    },
    {
      path: '/send-otp',
      name: 'sendOTP',
      component: SendOTPView,
      meta: {title: 'Send OTP', guestOnly: true}
    },
    {
      path: '/verify-otp',
      name: 'verifyOTP',
      component: VerifyOTPView,
      meta: {title: 'Send OTP', guestOnly: true, requiresForgotOtp: true}
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: {title: 'Reset Password', guestOnly: true, requiresForgotOtp: true}
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {title: 'Home'}
    },
  ],
})

router.beforeEach((to) => {
  const authStore = AuthStore();

  const loginVerifyProcess = localStorage.getItem('loginVerifyProcess') === 'true'
  if (to.meta.requiresOtp && !loginVerifyProcess) {
    return '/login'
  }

  const defaultTitle = 'La Cima Cartel'
  document.title = to.meta.title ? `${to.meta.title} | La Cima` : defaultTitle
  // scroll to top on route change
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  // -----------------
  nprogress.start();
  // -------------------
  // if (to.meta.guestOnly && !authStore.token) {
  //   return '/'
  // }
  if (!to.meta.guestOnly && !authStore.token) {
    return '/'
  }

  if (to.meta.guestOnly && authStore.token) {
    alert('You are already logged in. Please logout first to access this page.');
    const currentPath = router.currentRoute.value.fullPath || '/home';
    return '/home'; 
  }

  return true

})
router.afterEach(() => {
  nprogress.done()
})

export default router