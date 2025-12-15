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
      <!-- Public Routes (Landing, Login, Register, Public Infoletter View) -->
      <template v-if="isPublicRoute">
        <!-- Full screen router view for public pages (no header/footer) -->
        <router-view />
      </template>

      <!-- Authenticated User Layout (with header) -->
      <template v-else-if="authStore.isAuthenticated">
        <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
                  Webtech-2025 Infoletter
                </h1>
                <p class="text-sm md:text-base text-white/90">
                  Gemeinsam Newsletter erstellen
                </p>
              </div>

              <div class="flex items-center gap-3">
                <!-- Navigation Links -->
                <nav class="flex items-center gap-2">
                  <!-- 📰 Öffentliche Infoletter Link -->
                  <router-link
                    to="/"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white/20 text-white hover:bg-white/30 transition border border-white/30"
                    active-class="bg-white/40 border-white/50"
                  >
                    <span class="text-lg">📰</span>
                    <span class="hidden md:inline">Öffentliche</span>
                  </router-link>

                  <!-- Dashboard Link -->
                  <router-link
                    to="/infoletter"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-700 hover:bg-slate-100 transition"
                    active-class="bg-slate-200"
                  >
                    <Home class="size-5" />
                    <span class="hidden md:inline">Dashboard</span>
                  </router-link>
                </nav>

                <!-- Logout Button -->
                <button
                  @click="handleLogout"
                  class="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/80 text-white hover:bg-red-600 transition"
                >
                  Abmelden
                </button>
              </div>
            </div>
          </div>
        </header>

        <main class="py-10">
          <div class="max-w-7xl mx-auto px-4 md:px-6">
            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[520px]">
              <!-- Router View - alle Seiten werden hier angezeigt -->
              <router-view />
            </div>
          </div>
        </main>
      </template>

      <!-- Fallback: Redirect to login if not authenticated and not public route -->
      <template v-else>
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <p class="text-slate-600 mb-4">Leiterschaft wird umgeleitet...</p>
            <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-medium">
              Oder hier klicken zum Anmelden
            </router-link>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { Home } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// ✅ Check if current route is public (no auth required)
// Includes: Landing page, Login, Register, AND Public Infoletter Views
const isPublicRoute = computed(() => {
  const publicRoutes = ['/', '/login', '/register', '/public']
  // Also check for view routes (infoletter/:id/view is public)
  if (route.path.includes('/view')) return true
  return publicRoutes.includes(route.path)
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Debug logging
onMounted(() => {
  console.log('🏠 App.vue mounted')
  console.log('isInitialized:', authStore.isInitialized)
  console.log('isAuthenticated:', authStore.isAuthenticated)
  console.log('Current route:', router.currentRoute.value.path)
})

watch(() => authStore.isInitialized, (newVal) => {
  console.log('🔄 isInitialized changed to:', newVal)
})

watch(() => authStore.isAuthenticated, (newVal) => {
  console.log('🔄 isAuthenticated changed to:', newVal)
})
</script>
