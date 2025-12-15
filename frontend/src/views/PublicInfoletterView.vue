<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div class="max-w-4xl mx-auto px-4 md:px-6 py-6">
        <div class="flex items-center justify-between">
          <div>
            <router-link to="/infoletter" class="text-white/80 hover:text-white transition text-sm flex items-center gap-2">
              <ArrowLeft class="size-4" />
              Zurück zum Dashboard
            </router-link>
            <h1 class="text-3xl font-bold mt-2">{{ infoletter?.title || 'Newsletter' }}</h1>
            <p class="text-white/90 text-sm mt-1" v-if="infoletter?.publishedAt">
              Veröffentlicht am {{ formatDate(infoletter.publishedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-96">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p class="mt-4 text-slate-600">Wird geladen...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
        <h2 class="text-lg font-bold text-red-900 mb-2">😞 Fehler beim Laden</h2>
        <p class="text-red-700 mb-4">{{ error }}</p>
        <router-link to="/infoletter" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition inline-flex items-center gap-2">
          <ArrowLeft class="size-4" />
          Zurück zum Dashboard
        </router-link>
      </div>

      <!-- Content -->
      <div v-else-if="infoletter" class="space-y-8">
        <!-- Author Card -->
        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
          <h3 class="text-sm font-semibold text-slate-500 uppercase mb-3">Verfasser</h3>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ infoletter.owner.name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h4 class="text-lg font-bold text-slate-900">{{ infoletter.owner.name }}</h4>
              <p class="text-slate-600">{{ infoletter.owner.email }}</p>
            </div>
          </div>
        </div>

        <!-- Newsletter Content -->
        <div class="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">📄 Newsletter Inhalt</h2>
          
          <!-- Content with sanitized HTML -->
          <div class="prose prose-slate max-w-none" v-html="infoletter.content"></div>

          <!-- Images Gallery -->
          <div v-if="infoletter.images && infoletter.images.length > 0" class="mt-8 pt-8 border-t-2 border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-4">🖼️ Bilder</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="image in infoletter.images"
                :key="image.id"
                class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  :src="image.filepath || image.url"
                  :alt="image.filename"
                  class="w-full h-48 object-cover hover:scale-105 transition"
                />
              </div>
            </div>
          </div>

          <!-- Versions History -->
          <div v-if="infoletter.versions && infoletter.versions.length > 0" class="mt-8 pt-8 border-t-2 border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-4">📚 Versionshistorie</h3>
            <div class="space-y-2">
              <div
                v-for="(version, index) in infoletter.versions"
                :key="version.id"
                class="p-3 bg-slate-50 rounded-lg text-sm"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium text-slate-900">Version {{ version.versionNumber }}</span>
                  <span class="text-slate-500">{{ formatDate(version.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metadata Card -->
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 border border-purple-200">
          <h3 class="text-sm font-semibold text-slate-500 uppercase mb-4">ℹ️ Informationen</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs text-slate-500 uppercase font-semibold">Status</p>
              <p class="text-lg font-bold text-slate-900 mt-1">
                <span class="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">✓ Veröffentlicht</span>
              </p>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase font-semibold">Mitarbeiter</p>
              <p class="text-lg font-bold text-slate-900 mt-1">
                {{ (infoletter.collaborators?.length || 0) + 1 }} Person{{ (infoletter.collaborators?.length || 0) !== 0 ? 'en' : '' }}
              </p>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase font-semibold">Versionen</p>
              <p class="text-lg font-bold text-slate-900 mt-1">{{ infoletter.versions?.length || 0 }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase font-semibold">Bilder</p>
              <p class="text-lg font-bold text-slate-900 mt-1">{{ infoletter.images?.length || 0 }}</p>
            </div>
          </div>
        </div>

        <!-- Collaborators -->
        <div v-if="infoletter.collaborators && infoletter.collaborators.length > 0" class="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
          <h3 class="text-lg font-bold text-slate-900 mb-4">👥 Mitarbeiter</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="collab in infoletter.collaborators"
              :key="collab.id"
              class="p-4 bg-slate-50 rounded-lg flex items-center gap-3"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                {{ collab.user.name?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-medium text-slate-900">{{ collab.user.name }}</p>
                <p class="text-xs text-slate-500">{{ collab.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { infoletterService } from '../services/infoletterService'
import { ArrowLeft } from 'lucide-vue-next'

interface Infoletter {
  id: string
  title: string
  content: string
  status: string
  publishedAt: string
  owner: {
    id: string
    name: string
    email: string
    profileImageUrl?: string
  }
  images?: Array<{
    id: string
    filename: string
    filepath: string
    url?: string
  }>
  versions?: Array<{
    id: string
    versionNumber: number
    createdAt: string
  }>
  collaborators?: Array<{
    id: string
    role: string
    user: {
      id: string
      name: string
      email: string
    }
  }>
}

const route = useRoute()
const router = useRouter()

const infoletter = ref<Infoletter | null>(null)
const loading = ref(false)
const error = ref('')

const loadInfoletter = async () => {
  loading.value = true
  error.value = ''

  try {
    const id = route.params.id as string
    if (!id) {
      error.value = 'Keine Infoletter-ID gefunden'
      return
    }

    // Try to fetch from API
    const data = await infoletterService.getById(id)
    infoletter.value = data as Infoletter
  } catch (err: any) {
    console.error('Error loading infoletter:', err)
    error.value = err.message || 'Fehler beim Laden des Infoletter'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadInfoletter()
})
</script>

<style scoped>
/* Prose styling for newsletter content */
:deep(.prose) {
  @apply text-slate-700;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  @apply text-slate-900 font-bold;
}

:deep(.prose p) {
  @apply text-slate-700 leading-relaxed;
}

:deep(.prose a) {
  @apply text-purple-600 hover:text-purple-700 font-medium;
}

:deep(.prose img) {
  @apply rounded-lg shadow-md;
}

:deep(.prose ul),
:deep(.prose ol) {
  @apply text-slate-700;
}
</style>
