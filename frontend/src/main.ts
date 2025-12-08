/**
 * Vue App Entry Point
 * Initialisiert Pinia, Router und Auth
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { useAuthStore } from './stores/authStore'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

// Registriere Pinia
app.use(pinia)

// Registriere Router
app.use(router)

// Initialisiere Auth beim App-Start
// Dies prüft ob ein User bereits angemeldet ist
const authStore = useAuthStore()
await authStore.initializeAuth()

// Mounte App
app.mount('#app')
