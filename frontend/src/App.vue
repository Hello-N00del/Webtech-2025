<template>
  <div v-if="!store.isAuthenticated">
    <HelloWorld />
  </div>

  <div v-else class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Title - Left -->
          <div>
            <h1 class="text-white">Webtech-2025 Forum</h1>
            <p class="text-white text-opacity-90 text-sm">Community Diskussionen und Support</p>
          </div>

          <!-- Navigation - Center -->
          <nav class="flex items-center gap-2">
            <button
              @click="currentView = 'dashboard'"
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition"
            >
              <Home class="size-5" />
              <span>Home</span>
            </button>
            <button
              @click="currentView = 'forum'"
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition"
            >
              <MessageSquare class="size-5" />
              <span>Forum</span>
            </button>
            <button
              @click="currentView = 'newsletter'"
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition"
            >
              <Mail class="size-5" />
              <span>Newsletter</span>
            </button>
          </nav>

          <!-- User Menu - Right -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 px-3 py-2">
              <User class="size-5" />
              <span>{{ store.currentUser?.username || 'Gast' }}</span>
            </div>
            <button
              @click="store.logout()"
              class="flex items-center gap-2 px-3 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition"
            >
              <LogOut class="size-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content - White Container -->
    <main class="py-8">
      <div class="max-w-7xl mx-auto px-6">
        <div class="bg-white rounded-2xl shadow-lg p-8 min-h-[600px] relative">
          <!-- Speech Bubble Icon - Top Left Corner -->
          <div class="absolute top-6 left-6">
            <div class="relative">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare class="size-6 text-white" />
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <!-- Content with padding to avoid overlap -->
          <div class="pt-12">
            <Dashboard v-if="currentView === 'dashboard'" @navigate="(view) => currentView = view" />

            <div v-if="currentView === 'forum'">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h1 class="text-gray-900 mb-1">Alle Threads</h1>
                  <p class="text-gray-600">{{ store.infoletters.length }} Diskussionen</p>
                </div>
                <button
                  @click="showForm = true"
                  class="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                >
                  <Plus class="size-5" />
                  Neuer Thread
                </button>
              </div>
              <InfoletterFeed />
            </div>

            <div v-if="currentView === 'newsletter'">
              <div class="mb-6">
                <h1 class="text-gray-900 mb-2">Newsletter</h1>
                <p class="text-gray-600">Alle Newsletter-Ausgaben im Überblick</p>
              </div>
              <div class="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                <Mail class="size-16 text-purple-600 mx-auto mb-4" />
                <h2 class="text-gray-900 mb-2">Newsletter-Bereich</h2>
                <p class="text-gray-600">
                  Hier können Sie Newsletter verwalten und versenden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Form Modal -->
    <InfoletterForm v-if="showForm" @close="showForm = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from './stores/AppStore';
import HelloWorld from './components/HelloWorld.vue';
import Dashboard from './components/Dashboard.vue';
import InfoletterFeed from './components/InfoletterFeed.vue';
import InfoletterForm from './components/InfoletterForm.vue';
import { MessageSquare, Home, Mail, User, LogOut, Plus } from 'lucide-vue-next';

type View = 'dashboard' | 'forum' | 'newsletter';

const store = useAppStore();
const currentView = ref<View>('dashboard');
const showForm = ref(false);
</script>
