<template>
  <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-[calc(100vh-80px)]">
    <!-- AUTHENTICATED USER - Dashboard View -->
    <template v-if="authStore.isAuthenticated">
      <div class="py-10 md:py-20">
        <!-- Welcome Section -->
        <div class="max-w-6xl mx-auto px-4 md:px-6 text-white text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Willkommen zurück! 👋
          </h2>
          <p class="text-lg md:text-xl text-white/80">
            Deine Newsletter auf einen Blick
          </p>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 md:px-6 mb-12">
          <router-link
            to="/infoletter"
            class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105 cursor-pointer"
          >
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-xl font-semibold text-white mb-2">Meine Newsletter</h3>
            <p class="text-white/70">Verwalte deine Projekte</p>
          </router-link>

          <a
            href="#featured"
            class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105 cursor-pointer"
          >
            <div class="text-4xl mb-4">👁️</div>
            <h3 class="text-xl font-semibold text-white mb-2">Entdecken</h3>
            <p class="text-white/70">Andere Newsletter</p>
          </a>
        </div>

        <!-- Featured Section -->
        <div id="featured" class="bg-white/5 backdrop-blur-md border-t border-white/10 py-12">
          <div class="max-w-6xl mx-auto px-4 md:px-6">
            <h2 class="text-3xl font-bold text-white text-center mb-4">📰 Neu veröffentlichte Newsletter</h2>
            <p class="text-center text-white/70 mb-8">Schaue dir die neuesten Newsletter an</p>

            <!-- Loading -->
            <div v-if="loadingInfoletters" class="flex justify-center py-12">
              <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p class="mt-4 text-white">Newsletter werden geladen...</p>
              </div>
            </div>

            <!-- Grid -->
            <div v-else-if="publishedInfolettters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <router-link
                v-for="infoletter in publishedInfolettters.slice(0, 6)"
                :key="infoletter.id"
                :to="`/infoletter/${infoletter.id}/view`"
                class="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105"
              >
                <h4 class="text-lg font-bold text-white line-clamp-2">{{ infoletter.title }}</h4>
                <p class="text-sm text-white/60 mt-2">{{ formatDate(infoletter.publishedAt) }}</p>
                <p class="text-white/70 text-sm mt-3 line-clamp-2">{{ stripHtml(infoletter.content) }}</p>
              </router-link>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-white/70 py-8">
              <p class="text-lg">Noch keine Newsletter veröffentlicht</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- UNAUTHENTICATED USER - Marketing Landing Page -->
    <template v-else>
      <!-- Hero -->
      <div class="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div class="max-w-2xl text-center text-white">
          <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Erstelle Infoletter<br />
            <span class="bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              gemeinsam mit deinem Team
            </span>
          </h2>
          <p class="text-xl md:text-2xl text-white/80 mb-8">
            Das moderne Newsletter-Management-System für Teams
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/login"
              class="px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition shadow-lg hover:shadow-xl"
            >
              Jetzt anmelden
            </router-link>
          </div>
        </div>
      </div>

      <!-- Featured Section -->
      <div class="bg-white/5 backdrop-blur-md border-t border-white/10 py-16 px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-white text-center mb-4">📰 Aktuelle Newsletter</h2>
          <p class="text-center text-white/70 mb-12">Schaue dir Beispiele von veröffentlichten Newslettern an</p>

          <!-- Loading -->
          <div v-if="loadingInfoletters" class="flex justify-center py-12">
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p class="mt-4 text-white">Newsletter werden geladen...</p>
            </div>
          </div>

          <!-- Grid -->
          <div v-else-if="publishedInfolettters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link
              v-for="infoletter in publishedInfolettters.slice(0, 6)"
              :key="infoletter.id"
              :to="`/infoletter/${infoletter.id}/view`"
              class="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105"
            >
              <h3 class="text-xl font-bold text-white line-clamp-2">{{ infoletter.title }}</h3>
              <p class="text-sm text-white/60 mt-2">{{ formatDate(infoletter.publishedAt) }}</p>
              <div class="flex items-center gap-3 my-4 pb-4 border-b border-white/10">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {{ infoletter.owner.name?.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-white truncate">{{ infoletter.owner.name }}</p>
                </div>
              </div>
              <p class="text-white/70 text-sm line-clamp-2">{{ stripHtml(infoletter.content) }}</p>
            </router-link>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center text-white/70">
            <p class="text-lg">Noch keine Newsletter veröffentlicht</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-white/10 bg-black/20 backdrop-blur-md py-8 px-4">
        <div class="max-w-6xl mx-auto text-center text-white/60 text-sm">
          <p>© 2025 Webtech-2025. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { infoletterService } from '../services/infoletterService'

interface Infoletter {
  id: string
  title: string
  content: string
  publishedAt: string
  owner: {
    id: string
    name: string
    email: string
  }
  images?: Array<{
    id: string
    filename: string
    filepath: string
    url?: string
  }>
}

const authStore = useAuthStore()
const publishedInfolettters = ref<Infoletter[]>([])
const loadingInfoletters = ref(false)

const loadPublishedInfolettters = async () => {
  loadingInfoletters.value = true
  try {
    const data = await infoletterService.getPublished()
    publishedInfolettters.value = data as Infoletter[]
  } catch (err) {
    console.error('Error loading published infoletters:', err)
  } finally {
    loadingInfoletters.value = false
  }
}

const stripHtml = (html: string): string => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return (tmp.textContent || tmp.innerText || '').substring(0, 100) + '...'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadPublishedInfolettters()
})
</script>
