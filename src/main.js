//Style file
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura' 
import PrimeVue from 'primevue/config'
import '../node_modules/animate.css'
import './assets/styles/main.css'
import './assets/styles/oda.style.css'


// ======================================
import jquery from 'jquery'

window.$ = window.jQuery = jquery

import 'fomantic-ui-css/semantic.min.css'
await import('fomantic-ui-css/semantic.min.js')
// ======================================


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// =========================================================================================
// Make global
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
// =========================================================================================

//Import Bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(ToastService)
app.mount('#app')

// =====================================================================================
//Lucide icon
import * as LucideIcons from 'lucide-vue-next'
for (const [key, component] of Object.entries(LucideIcons)) {
  app.component(key, component)
}
// =====================================================================================
import { AuthStore } from './stores/AuthStore'
const auth = AuthStore()
auth.loadSession()