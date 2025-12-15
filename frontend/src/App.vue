<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Fallback loading state -->
    <div v-if="!authStore.isInitialized" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p class="mt-4 text-slate-600">Wird geladen...</p>
      </div>
    </div>

    <!-- Unauthenticated: Show Login Page -->
    <HelloWorld v-else-if="!authStore.isAuthenticated" />

    <!-- Authenticated: Show App with Router -->
    <div v-else class="min-h-screen bg-slate-50">
      <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
                Webtech-2025 Infoletter
              </h1>
              <p class="text-sm md:text-base text-white/90">
                Gemeinsam Newsletter erstellen
              </p>
            </div>

            <div class="flex items-center gap-4">
              <nav class="flex items-center gap-2">
                <router-link
                  to="/dashboard"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                  active-class="bg-white/20"
                >
                  <Home class="size-5" />
                  <span class="hidden md:inline">Dashboard</span>
                </router-link>
                <router-link
                  to="/infoletter"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                  active-class="bg-white/20"
                >
                  <Mail class="size-5" />
                  <span class="hidden md:inline">Meine Infoletter</span>
                </router-link>
              </nav>

              <!-- Logout Button -->
              <button
                @click="handleLogout"
                class="px-4 py-2 rounded-lg text-sm font-medium bg-white text-indigo-700 hover:bg-slate-100 transition"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "./stores/authStore"
import HelloWorld from "./components/HelloWorld.vue"
import { Home, Mail } from "lucide-vue-next"

const router = useRouter()
const authStore = useAuthStore()

// Initialize auth state when app loads
onMounted(async () => {
  try {
    await authStore.initializeAuth()
    
    // Wenn nicht authentifiziert, kann Router zu Login leiten
    if (!authStore.isAuthenticated) {
      router.push('/login')
    }
  } catch (error) {
    console.error('Auth initialization failed:', error)
  }
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
