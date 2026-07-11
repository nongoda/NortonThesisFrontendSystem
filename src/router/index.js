import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import SendOTPView from '@/views/auth/forgotPassword/SendOTPView.vue'
import VerifyOTPView from '@/views/auth/forgotPassword/VerifyOTPView.vue'
import ResetPasswordView from '@/views/auth/forgotPassword/ResetPasswordView.vue'
import nprogress from 'nprogress'
import DashboardView from '@/views/DashboardView.vue'
import HomeView from '@/views/manager/HomeView.vue'
import 'nprogress/nprogress.css'
import { AuthStore } from '@/stores/AuthStore'
import PasswordView from '@/views/settings/PasswordView.vue'
import VerifyAccessView from '@/views/auth/VerifyAccessView.vue'
import GeneralView from '@/views/settings/GeneralView.vue'
import DashboardEventView from '@/views/events/DashboardEventView.vue'
// import HomePageView from '@/views/staff/HomePageView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import CreateEventView from '@/views/events/CreateEventView.vue'
import PreviewEventView from '@/views/events/PreviewEventView.vue'
import UpdateEventView from '@/views/events/UpdateEventView.vue'
import TicketEventView from '@/views/events/TicketEventView.vue'
import PromotionView from '@/views/events/PromotionView.vue'
import DashboardUserManagmentView from '@/views/admin/userManagement/DashboardUserManagmentView.vue'
import CreateAccountUserView from '@/views/admin/userManagement/CreateAccountUserView.vue'
import DashboardCustomerView from '@/views/admin/customer/DashboardCustomerView.vue'
import DashboardArtistView from '@/views/artists-management/DashboardArtistView.vue'
import CreateArtistView from '@/views/artists-management/CreateArtistView.vue'
import ArtistSongView from '@/views/artists-management/ArtistSongView.vue'
import ArtistPreviewInformationView from '@/views/artists-management/ArtistPreviewInformationView.vue'
import UpdateArtistView from '@/views/artists-management/UpdateArtistView.vue'
import DashboardSongView from '@/views/songs/DashboardSongView.vue'
import CreateSongView from '@/views/songs/CreateSongView.vue'
import PreviewSongView from '@/views/songs/PreviewSongView.vue'
import UpdateSongView from '@/views/songs/UpdateSongView.vue'
import ReportDashboardView from '@/views/reports/ReportDashboardView.vue'
import AllPaymentView from '@/views/payments/AllPaymentView.vue'
import DashboardTicketView from '@/views/tickets/DashboardTicketView.vue'
import ViewTicketInforView from '@/views/tickets/ViewTicketInforView.vue'
import CheckInTicketView from '@/views/tickets/CheckInTicketView.vue'

import { EventStore } from '@/stores/EventStore';
import ManageDevicesView from '@/views/settings/ManageDevicesView.vue'



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
      meta: { title: 'Login', guestOnly: true },
    },
    {
      path: '/verify-access',
      name: 'verify-access',
      component: VerifyAccessView,
      meta: { title: 'Verify Access', guestOnly: true, requiresOtp: true },
    },
    {
      path: '/send-otp',
      name: 'sendOTP',
      component: SendOTPView,
      meta: { title: 'Send OTP', guestOnly: true },
    },
    {
      path: '/verify-otp',
      name: 'verifyOTP',
      component: VerifyOTPView,
      meta: { title: 'Send OTP', guestOnly: true, requiresForgotOtp: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { title: 'Reset Password', guestOnly: true, requiresForgotOtp: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard', roles: ['admin', 'manager', 'staff'] },
    },
    {
      path: '/setting-general',
      name: 'setting-general',
      component: GeneralView,
      meta: { title: 'Settings', roles: ['admin', 'manager', 'staff'] },
    },
    {
      path: '/manage-devices',
      name: 'manage-devices',
      component: ManageDevicesView,
      meta: { title: 'Manage Device', roles: ['admin', 'manager', 'staff'] },
    },
    {
      path: '/setting-password',
      name: 'setting-password',
      component: PasswordView,
      meta: { title: 'Settings', roles: ['admin', 'manager', 'staff'] },
    },
    {
      path: '/events',
      name: 'events',
      component: DashboardEventView,
      meta: { title: 'Events', roles: ['admin', 'manager'] },
    },
    {
      path: '/events/create',
      name: 'create-event',
      component: CreateEventView,
      meta: { title: 'Create Event', roles: ['manager'] },
    },
    {
      path: '/events/preview/information/:slug',
      name: 'preview-event',
      component: PreviewEventView,
      meta: { title: 'Preview Event', roles: ['admin', 'manager'] },
    },
    {
      path: '/events/preview/update/:slug',
      name: 'update-event',
      component: UpdateEventView,
      meta: {
        title: 'Update Event',
        roles: ['manager'],
      },
      beforeEnter: async (to) => {
        const eventStore = EventStore()
        const token = localStorage.getItem('auth_token')

        try {
          const res = await eventStore.getEventBySlug(token, to.params.slug)

          if (res.data.status !== 'published') {
            return '/404'
          }

          return true
        } catch (error) {
          return '/404'
        }
      },
    },
    // {
    //   path: '/events/preview/update/:slug',
    //   name: 'update-event',
    //   component: UpdateEventView,
    //   meta: {title: 'Update Event', roles: ['manager'] }
    // },
    {
      path: '/events/preview/tickets/:slug',
      name: 'ticket-event',
      component: TicketEventView,
      meta: { title: 'Ticket Event', roles: ['admin', 'manager'] },
    },
    {
      path: '/events/preview/promotion/:slug',
      name: 'promotion-event',
      component: PromotionView,
      meta: { title: 'Promotion Event', roles: ['admin', 'manager'] },
    },
    {
      path: '/user-management',
      name: 'user-management',
      component: DashboardUserManagmentView,
      meta: { title: 'User Management', roles: ['admin'] },
    },
    {
      path: '/customer-management',
      name: 'customer-management',
      component: DashboardCustomerView,
      meta: { title: 'Customer Management', roles: ['admin'] },
    },
    {
      path: '/artists',
      name: 'artists',
      component: DashboardArtistView,
      meta: { title: 'Artist Management', roles: ['admin', 'manager'] },
    },
    {
      path: '/songs/create',
      name: 'create',
      component: CreateSongView,
      meta: { title: 'Songs Creation', roles: ['admin', 'manager'] },
    },
    {
      path: '/songs/preview/:slug',
      name: 'song-preview',
      component: PreviewSongView,
      meta: { title: 'Preview Song Information', roles: ['admin', 'manager'] },
    },
    {
      path: '/songs/update/:slug',
      name: 'song-update',
      component: UpdateSongView,
      meta: { title: 'Update Song Information', roles: ['admin', 'manager'] },
    },
    {
      path: '/reports',
      name: 'report',
      component: ReportDashboardView,
      meta: { title: 'Report Dashbaord', roles: ['admin', 'manager'] },
    },
    {
      path: '/payments',
      name: 'payments',
      component: AllPaymentView,
      meta: { title: 'Payment Dashboard', roles: ['admin', 'manager'] },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: DashboardTicketView,
      // staff only
      meta: { title: 'Tickets Management', roles: ['staff'] },
    },
    {
      path: '/tickets/:ticket_code',
      name: 'tickets info',
      component: ViewTicketInforView,
      meta: { title: 'Tickets Information', roles: ['admin', 'manager', 'staff'] },
    },
    {
      path: '/check-in',
      name: 'check in',
      component: CheckInTicketView,
      // staff only
      meta: { title: 'Check In', roles: ['staff'] },
    },
    {
      path: '/songs',
      name: 'songs',
      component: DashboardSongView,
      meta: { title: 'Songs Management', roles: ['admin', 'manager'] },
    },
    {
      path: '/artists/create',
      name: 'create-artist',
      component: CreateArtistView,
      meta: { title: 'Create Artist', roles: ['admin', 'manager'] },
    },
    {
      path: '/artists/preview/:slug',
      name: 'preview-artist',
      component: ArtistPreviewInformationView,
      meta: { title: 'Artist Information', roles: ['admin', 'manager'] },
    },
    {
      path: '/artists/songs/:slug',
      name: 'artist-songs',
      component: ArtistSongView,
      meta: { title: 'Artist Songs', roles: ['admin', 'manager'] },
    },
    {
      path: '/artists/update/:slug',
      name: 'update-artist',
      component: UpdateArtistView,
      meta: { title: 'Update Information', roles: ['admin', 'manager'] },
    },
    {
      path: '/user-management/create-account',
      name: 'create-account-user',
      component: CreateAccountUserView,
      meta: { title: 'Create Account', roles: ['admin'] },
    },
    {
      path: '/404',
      name: '404',
      component: PageNotFoundView,
      meta: { title: '404 Not Found' },
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = AuthStore();
  const user = await authStore.getCurrentUser()
  

  const loginVerifyProcess = localStorage.getItem('loginVerifyProcess') === 'true'

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
    const role = user.role?.toLowerCase()

    if (!to.meta.roles.includes(role)) {
      return '/404'
    }
  }

  return true

})
router.afterEach(() => {
  nprogress.done()
})

export default router