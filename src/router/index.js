import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import SendOTPView from '@/views/auth/forgotPassword/SendOTPView.vue'
import VerifyOTPView from '@/views/auth/forgotPassword/VerifyOTPView.vue'
import ResetPasswordView from '@/views/auth/forgotPassword/ResetPasswordView.vue'
import nprogress from 'nprogress'
import DashboardView from '@/views/DashboardView.vue'
import 'nprogress/nprogress.css'
import { AuthStore } from '@/stores/AuthStore'
import PasswordView from '@/views/settings/PasswordView.vue'
import VerifyAccessView from '@/views/auth/VerifyAccessView.vue'
import GeneralView from '@/views/settings/GeneralView.vue'
nprogress.configure({
  showSpinner: false, 
  tickleSpeed: 500, minimum: 0.2
})


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {title: 'Dashboard', roles: ['admin'] }
    },
    {
      path: '/setting-general',
      name: 'setting-general',
      component: GeneralView,
      meta: {title: 'Settings', roles: ['admin', 'manager', 'staff'] }
    },
    {
      path: '/setting-password',
      name: 'setting-password',
      component: PasswordView,
      meta: {title: 'Settings', roles: ['admin', 'manager', 'staff'] }
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = AuthStore();
  const user = await authStore.getCurrentUser()

  const loginVerifyProcess = localStorage.getItem('loginVerifyProcess') === 'true'
  // if (to.meta.requiresOtp && !loginVerifyProcess) {
  //   return '/login'
  // }

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
    return '/dashboard'; 
  }

  if (to.meta.roles && user) {
    if (!to.meta.roles.includes(user.role)) {
      return '/dashboard'
    }
  }

  return true

})
router.afterEach(() => {
  nprogress.done()
})

export default router