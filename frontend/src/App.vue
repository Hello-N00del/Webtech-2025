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
      <!-- Authenticated User Layout -->
      <template v-if="authStore.isAuthenticated">
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
      </template>

      <!-- Unauthenticated Layout (Login/Register) -->
      <template v-else>
        <router-view />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "./stores/authStore" // Pfad ggf. anpassen
import HelloWorld from "./components/HelloWorld.vue"
import Dashboard from "./components/Dashboard.vue"
import InfoletterFeed from "./components/InfoletterFeed.vue"
import InfoletterForm from "./components/InfoletterForm.vue"
import { Home, MessageSquare } from "lucide-vue-next"

type View = "dashboard" | "forum"

const store = useAuthStore()
const currentView = ref<View>("dashboard")
const showNewThread = ref(false)
</script>
