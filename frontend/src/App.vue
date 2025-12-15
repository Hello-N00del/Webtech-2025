<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="!authStore.isInitialized" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p class="mt-4 text-slate-600">Wird geladen...</p>
      </div>
    </div>

    <!-- App Content -->
    <template v-else>
      <!-- ✅ GLOBAL HEADER - On ALL pages -->
      <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
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
              <!-- 📰 Newsletter - Always visible -->
              <router-link
                to="/"
                class="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition"
                :class="route.path === '/' ? 'bg-white/30 border border-white/40' : 'bg-white/10 border border-white/20 hover:bg-white/20'"
              >
                <span class="text-base md:text-lg">📰</span>
                <span class="hidden md:inline">Newsletter</span>
              </router-link>

              <!-- Authenticated Navigation -->
              <template v-if="authStore.isAuthenticated">
                <!-- Dashboard Link -->
                <router-link
                  to="/infoletter"
                  class="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-700 hover:bg-slate-100 transition"
                  :class="route.path === '/infoletter' ? 'bg-slate-200' : ''"
                >
                  <span class="text-lg">🏠</span>
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

              <!-- Unauthenticated Navigation -->
              <template v-else>
                <!-- Login Button -->
                <router-link
                  to="/login"
                  class="px-3 md:px-4 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-600 hover:bg-slate-100 transition"
                  :class="route.path === '/login' ? 'bg-slate-200' : ''"
                >
                  Anmelden
                </router-link>
              </template>
            </nav>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="py-10">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <router-view />
        </div>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const handleLogout = async () => {
  try {
    console.log('🚪 Logging out...')
    await authStore.logout()
    console.log('✅ Logout complete')
    await router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

console.log('✅ App.vue loaded')
</script>
