import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store before mounting
const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  app.mount('#app')
  console.log('✅ App mounted, isInitialized:', authStore.isInitialized)
  console.log('✅ isAuthenticated:', authStore.isAuthenticated)
}).catch((error) => {
  console.error('❌ Auth initialization failed:', error)
  // Mount anyway to show login screen
  app.mount('#app')
})
