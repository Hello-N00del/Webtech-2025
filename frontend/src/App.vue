<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Login-Screen -->
    <HelloWorld v-if="!store.isAuthenticated" />

    <!-- App nur wenn eingeloggt -->
    <div v-else class="min-h-screen bg-slate-50">
      <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
                Webtech-2025 Forum
              </h1>
              <p class="text-sm md:text-base text-white/90">
                Community Diskussionen und Support
              </p>
            </div>

            <div class="flex items-center gap-4">
              <nav class="flex items-center gap-2">
                <button
                  @click="currentView = 'dashboard'"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  <Home class="size-5" />
                  <span>Home</span>
                </button>
                <button
                  @click="currentView = 'forum'"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  <MessageSquare class="size-5" />
                  <span>Forum</span>
                </button>
              </nav>

              <!-- Abmelden -->
              <button
                @click="store.logout()"
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
          <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[520px] relative">
            <!-- Icon-Ecke -->
            <div class="absolute -top-6 left-6">
              <div class="relative">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <MessageSquare class="size-6 text-white" />
                </div>
                <div
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                />
              </div>
            </div>

            <div class="pt-6 md:pt-8">
              <Dashboard
                v-if="currentView === 'dashboard'"
                @open-new-thread="showNewThread = true"
                @navigate-forum="() => (currentView = 'forum')"
              />

              <div v-else-if="currentView === 'forum'">
                <InfoletterFeed />
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Zentrales Neuer-Thread-Modal -->
      <InfoletterForm v-if="showNewThread" @close="showNewThread = false" />
    </div>
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
