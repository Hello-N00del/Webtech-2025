<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
    <!-- AUTHENTICATED USER - Dashboard View -->
    <template v-if="authStore.isAuthenticated">
      <!-- Hero Section for Authenticated Users -->
      <div class="min-h-screen flex items-center justify-center px-4 pt-20">
        <div class="max-w-2xl text-center text-white">
          <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Willkommen zurück! 👋
          </h2>
          <p class="text-xl md:text-2xl text-white/80 mb-12">
            Erstelle und verwalte Newsletter mit deinem Team
          </p>

          <!-- Quick Actions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <router-link
              to="/infoletter"
              class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105"
            >
              <div class="text-4xl mb-4">📝</div>
              <h3 class="text-lg font-semibold text-white mb-2">Meine Newsletter</h3>
              <p class="text-white/70">Verwalte deine Projekte</p>
            </router-link>

            <a
              href="#featured"
              class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105 cursor-pointer"
            >
              <div class="text-4xl mb-4">👁️</div>
              <h3 class="text-lg font-semibold text-white mb-2">Entdecken</h3>
              <p class="text-white/70">Andere Newsletter</p>
            </a>

            <router-link
              to="/infoletter"
              class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105"
            >
              <div class="text-4xl mb-4">✨</div>
              <h3 class="text-lg font-semibold text-white mb-2">Neu erstellen</h3>
              <p class="text-white/70">Starten Sie jetzt</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Featured Infoletters Section -->
      <div id="featured" class="bg-white/5 backdrop-blur-md border-t border-white/10 py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-white text-center mb-4">📰 Neu veröffentlichte Newsletter</h2>
          <p class="text-center text-white/70 mb-16">Schaue dir die neuesten Newsletter an</p>

          <!-- Loading State -->
          <div v-if="loadingInfoletters" class="flex justify-center items-center h-64">
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
              <h4 class="text-lg font-bold text-white line-clamp-2 group-hover:line-clamp-none">{{ infoletter.title }}</h4>
              <p class="text-sm text-white/60 mt-1">{{ formatDate(infoletter.publishedAt) }}</p>
              <p class="text-white/70 text-sm mt-3 line-clamp-2">{{ stripHtml(infoletter.content) }}</p>
            </router-link>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center text-white/70 py-8">
            <p class="text-lg">Noch keine Newsletter veröffentlicht</p>
          </div>
        </div>
      </div>
    </template>

    <!-- UNAUTHENTICATED USER - Marketing Landing Page -->
    <template v-else>
      <!-- Hero Section -->
      <div class="min-h-screen flex items-center justify-center px-4 pt-20">
        <div class="max-w-2xl text-center text-white">
          <!-- Main Title -->
          <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Erstelle Infoletter<br />
            <span class="bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              gemeinsam mit deinem Team
            </span>
          </h2>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-white/80 mb-8">
            Das moderne Newsletter-Management-System für Teams, die zusammenarbeiten
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <router-link
              to="/login"
              class="px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition shadow-lg hover:shadow-xl"
            >
              Jetzt anmelden
            </router-link>
            <router-link
              to="/register"
              class="px-8 py-4 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/50 shadow-lg hover:shadow-xl"
            >
              Kostenlos registrieren
            </router-link>
          </div>

          <!-- Feature Highlights -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div class="text-4xl mb-4">✍️</div>
              <h3 class="text-lg font-semibold text-white mb-2">Einfaches Erstellen</h3>
              <p class="text-white/70">Intuitive Editor mit Echtzeit-Vorschau</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div class="text-4xl mb-4">👥</div>
              <h3 class="text-lg font-semibold text-white mb-2">Team-Zusammenarbeit</h3>
              <p class="text-white/70">Arbeite mit deinem Team in Echtzeit</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div class="text-4xl mb-4">📊</div>
              <h3 class="text-lg font-semibold text-white mb-2">Verwaltung</h3>
              <p class="text-white/70">Verwalte alle deine Newsletter zentral</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Infoletters Section -->
      <div class="bg-white/5 backdrop-blur-md border-t border-white/10 py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-white text-center mb-4">📰 Aktuelle Newsletter</h2>
          <p class="text-center text-white/70 mb-16">Schaue dir beispiele von veröffentlichten Newslettern an</p>

          <!-- Loading State -->
          <div v-if="loadingInfoletters" class="flex justify-center items-center h-64">
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p class="mt-4 text-white">Newsletter werden geladen...</p>
            </div>
          </div>

          <!-- Infoletters Grid -->
          <div v-else-if="publishedInfolettters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link
              v-for="infoletter in publishedInfolettters.slice(0, 6)"
              :key="infoletter.id"
              :to="`/infoletter/${infoletter.id}/view`"
              class="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition transform hover:scale-105"
            >
              <!-- Header -->
              <div class="mb-4">
                <h3 class="text-xl font-bold text-white line-clamp-2 group-hover:line-clamp-none">{{ infoletter.title }}</h3>
                <p class="text-sm text-white/60 mt-1">{{ formatDate(infoletter.publishedAt) }}</p>
              </div>

              <!-- Author Info -->
              <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ infoletter.owner.name?.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-white truncate">{{ infoletter.owner.name }}</p>
                  <p class="text-xs text-white/60 truncate">{{ infoletter.owner.email }}</p>
                </div>
              </div>

              <!-- Preview -->
              <p class="text-white/70 text-sm line-clamp-2">{{ stripHtml(infoletter.content) }}</p>

              <!-- Images Preview -->
              <div v-if="infoletter.images && infoletter.images.length > 0" class="mt-4 pt-4 border-t border-white/10">
                <div class="grid grid-cols-3 gap-2">
                  <img
                    v-for="(image, idx) in infoletter.images.slice(0, 3)"
                    :key="image.id"
                    :src="getImageUrl(image)"
                    :alt="image.filename"
                    class="w-full h-16 object-cover rounded group-hover:opacity-75 transition"
                  />
                </div>
                <p v-if="infoletter.images.length > 3" class="text-xs text-white/60 mt-2">
                  +{{ infoletter.images.length - 3 }} weitere Bilder
                </p>
              </div>

              <!-- CTA -->
              <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-white/80 group-hover:text-white transition">
                <span class="text-sm font-medium">Ansehen</span>
                <span>→</span>
              </div>
            </router-link>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center text-white/70">
            <p class="text-lg">Noch keine Newsletter veröffentlicht. Registriere dich, um einen zu erstellen!</p>
          </div>
        </div>
      </div>

      <!-- How it works Section -->
      <div class="bg-white/5 backdrop-blur-md border-t border-white/10 py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-white text-center mb-16">So funktioniert's</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-white">1</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Registrieren</h3>
              <p class="text-white/70">Erstelle dein kostenloses Konto</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-white">2</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Team einladen</h3>
              <p class="text-white/70">Lade Mitarbeiter zum Newsletter ein</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-white">3</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Zusammenarbeiten</h3>
              <p class="text-white/70">Arbeite gemeinsam am Newsletter</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold text-white">4</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Veröffentlichen</h3>
              <p class="text-white/70">Veröffentliche deinen Newsletter</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Bereit zu starten?</h2>
        <p class="text-xl text-white/80 mb-8">
          Erstelle kostenlosen Account und verwalte deine Newsletter wie ein Profi
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/login"
            class="px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition shadow-lg hover:shadow-xl"
          >
            Anmelden
          </router-link>
          <router-link
            to="/register"
            class="px-8 py-4 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/50 shadow-lg hover:shadow-xl"
          >
            Kostenlos registrieren
          </router-link>
        </div>
      </div>
    </template>

    <!-- Footer -->
    <footer class="border-t border-white/10 bg-black/20 backdrop-blur-md py-12 px-4">
      <div class="max-w-6xl mx-auto text-center text-white/60">
        <p>© 2025 Webtech-2025. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
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
    console.log('📰 Loaded published infoletters:', data)
  } catch (err: any) {
    console.error('Error loading published infoletters:', err)
  } finally {
    loadingInfoletters.value = false
  }
}

const getImageUrl = (image: any): string => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
  const backendUrl = apiUrl.replace('/api', '')
  
  let imagePath = image.filepath || image.url || image.filename
  if (!imagePath.startsWith('/')) imagePath = '/' + imagePath
  
  let fullUrl: string
  if (imagePath.startsWith('/uploads')) {
    fullUrl = `${backendUrl}${imagePath}`
  } else if (imagePath.startsWith('/infoletter-images')) {
    fullUrl = `${backendUrl}/uploads${imagePath}`
  } else {
    fullUrl = `${backendUrl}/uploads/infoletter-images/${imagePath}`
  }
  
  return fullUrl
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
