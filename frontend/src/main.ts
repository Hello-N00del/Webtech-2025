// src/main.ts
//
// 🎯 TECHNOLOGY STACK:
// - Vue 3 (UI framework)
// - Pinia (state management)
// - Vue Router (routing)
// - TypeScript (type safety)
//
// 🔐 INITIALIZATION FLOW:
// This file is the entry point for the frontend application.
// It sets up the entire app BEFORE rendering the first component.
//
// Key principle: Initialize auth state BEFORE mounting the app
// Why? This ensures:
// 1. Token is loaded from localStorage
// 2. User data is fetched if token exists
// 3. Header shows correct state from the start
// 4. No "loading state" flicker on page load
// 5. Hard refresh (F5) works correctly

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  // 🔧 State management setup
app.use(router)  // 🔧 Routing setup

// 🔐 CRITICAL: Initialize auth BEFORE mounting app
//
// Why async initialization?
// - authStore.initializeAuth() is async (checks localStorage + API)
// - We MUST wait for it to complete before rendering
// - This ensures app.isInitialized = true when App.vue renders
// - Header will show correct state immediately (no re-renders needed)
//
// What does initializeAuth() do?
// 1. Check if token exists in localStorage
// 2. If YES: Fetch user data from /auth/me endpoint
// 3. If NO: Skip (user not authenticated)
// 4. Set isInitialized = true
// 5. Return to caller
//
// Flow:
// 1. Create Pinia store instance
// 2. Call authStore.initializeAuth()
// 3. Wait for completion (token loaded, user fetched if exists)
// 4. THEN mount the app (#app)
// 5. App.vue checks isInitialized and renders with correct state
// 6. Header shows "Anmelden" or "Dashboard" based on auth status
//
// Benefit: No need for loading spinners, header is correct immediately!
const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  // ✅ Auth initialization complete
  app.mount('#app')
  console.log('✅ App mounted, isInitialized:', authStore.isInitialized)
  console.log('✅ isAuthenticated:', authStore.isAuthenticated)
}).catch((error) => {
  // ❌ Auth initialization failed (e.g., API error)
  console.error('❌ Auth initialization failed:', error)
  // Mount anyway to show login screen
  // This ensures the app is always accessible
  app.mount('#app')
})
