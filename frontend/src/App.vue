<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="!authStore.isInitialized" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p class="mt-4 text-slate-600">Wird geladen...</p>
      </div>
    </div>

    <!-- Router Content -->
    <template v-else>
      <!-- ✅ HEADER - Always visible EXCEPT on public routes (Landing, Login, Register, Public View) -->
      <header v-if="!isPublicView" class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo/Branding -->
            <router-link to="/" class="flex items-center gap-3 hover:opacity-90 transition">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 class="text-xl font-bold tracking-tight">Webtech-2025</h1>
                <p class="text-xs text-white/80">Newsletter Management</p>
              </div>
            </router-link>

            <!-- Navigation -->
            <nav class="flex items-center gap-2 md:gap-3">
              <!-- 📰 Newsletter - Always visible in header -->
              <router-link
                to="/"
                class="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition"
                :class="isHome ? 'bg-white/30 border border-white/40' : 'bg-white/10 border border-white/20 hover:bg-white/20'"
              >
                <span class="text-base md:text-lg">📰</span>
                <span class="hidden md:inline">Newsletter</span>
              </router-link>

              <!-- ✅ AUTHENTICATED ONLY -->
              <template v-if="authStore.isAuthenticated">
                <!-- Dashboard Link -->
                <router-link
                  to="/infoletter"
                  class="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-700 hover:bg-slate-100 transition"
                  active-class="bg-slate-200"
                >
                  <Home class="size-5" />
                  <span class="hidden md:inline">Dashboard</span>
                </router-link>

                <!-- Logout Button -->
                <button
                  @click="handleLogout"
                  class="px-3 md:px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/80 text-white hover:bg-red-600 transition"
                >
                  <span class="hidden md:inline">Abmelden</span>
                  <span class="md:hidden">🚪</span>
                </button>
              </template>

              <!-- ✅ UNAUTHENTICATED ONLY -->
              <template v-else>
                <!-- Login Button -->
                <router-link
                  to="/login"
                  class="px-3 md:px-4 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-600 hover:bg-slate-100 transition"
                  active-class="bg-slate-200"
                >
                  <span class="hidden md:inline">Anmelden</span>
                  <span class="md:hidden">Login</span>
                </router-link>
              </template>
            </nav>
          </div>
        </div>
      </header>

      <!-- Page Content - WITH padding for authenticated pages -->
      <main v-if="!isPublicView" class="py-10">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <!-- Dashboard/App Content -->
          <router-view :key="routeKey" />
        </div>
      </main>

      <!-- Full Screen Content (Public View, Landing, Login, Register) -->
      <template v-else>
        <router-view :key="routeKey" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { Home } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// ✅ Force re-render on route change
const routeKey = computed(() => route.fullPath)

// ✅ Determine if this is a PUBLIC route (no header, full screen)
// PUBLIC routes: Landing (/), Login (/login), Register (/register), Public View (/infoletter/:id/view)
// PROTECTED routes: Dashboard (/infoletter), Edit (/infoletter/:id/edit), etc.
const isPublicView = computed(() => {
  // These routes should be full-screen (no header)
  const fullScreenRoutes = ['/', '/login', '/register']
  
  // Check if it's one of the full-screen routes
  if (fullScreenRoutes.includes(route.path)) {
    console.log('📄 Public full-screen route:', route.path)
    return true
  }
  
  // Check if it's a public newsletter view
  if (route.path.includes('/view')) {
    console.log('📄 Public newsletter view:', route.path)
    return true
  }
  
  // Otherwise it's a protected route (show header)
  console.log('🔒 Protected route with header:', route.path)
  return false
})

// Check if current route is home
const isHome = computed(() => {
  return route.path === '/'
})

const handleLogout = async () => {
  try {
    console.log('🚪 Starting logout...')
    await authStore.logout()
    console.log('✅ Logout complete')
    await router.push('/')
    console.log('✅ Redirected to home')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// ✅ Watch for auth changes and redirect if needed
watch(
  () => authStore.isAuthenticated,
  async (isAuthenticated) => {
    console.log('🔄 Auth status changed to:', isAuthenticated)
    console.log('📍 Current route:', route.path)
    
    // If user just logged in and is on login/register page, redirect to dashboard
    if (isAuthenticated && (route.path === '/login' || route.path === '/register')) {
      console.log('✅ User logged in, redirecting to dashboard...')
      try {
        // Small delay to ensure all state updates are processed
        await new Promise(resolve => setTimeout(resolve, 100))
        await router.push('/infoletter')
        console.log('✅ Redirected to /infoletter')
      } catch (err) {
        console.error('Redirect failed:', err)
      }
    }
  }
)

// Debug logging
console.log('🚀 App.vue loaded')
console.log('Auth store isInitialized:', authStore.isInitialized)
console.log('Auth store isAuthenticated:', authStore.isAuthenticated)
console.log('Current route:', route.path)
</script>
