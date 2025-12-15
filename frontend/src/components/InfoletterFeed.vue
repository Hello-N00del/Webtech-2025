<template>
  <div class="space-y-8">
    <!-- MY INFOLETTERS SECTION -->
    <section>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-2">Meine Infoletter</h2>
            <p class="text-slate-600">Verwalte, bearbeite und veröffentliche deine Newsletter</p>
          </div>
          <router-link
            to="/infoletter/create"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition inline-flex items-center gap-2"
          >
            <Plus class="size-5" />
            Neuer Infoletter
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loadingMine" class="flex justify-center items-center h-64">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p class="mt-3 text-slate-600">Wird geladen...</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMine" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {{ errorMine }}
        </div>

        <!-- Empty State -->
        <div v-if="!loadingMine && myInfoletters.length === 0" class="text-center py-12 bg-slate-50 rounded-lg">
          <Mail class="size-12 text-slate-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-slate-900 mb-2">Keine Infoletter vorhanden</h3>
          <p class="text-slate-600 mb-6">Erstelle deinen ersten Infoletter und beginne, Newsletter zu verwalten</p>
          <router-link
            to="/infoletter/create"
            class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Jetzt erstellen
          </router-link>
        </div>

        <!-- My Infoletter Grid -->
        <div v-if="!loadingMine && myInfoletters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="infoletter in myInfoletters"
            :key="infoletter.id"
            class="bg-white rounded-lg shadow hover:shadow-lg transition border border-slate-200 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b border-slate-200">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-900 flex-1 line-clamp-2">
                  {{ infoletter.title }}
                </h3>
                <StatusBadge :status="infoletter.status" />
              </div>
              <p class="text-sm text-slate-600">{{ formatDate(infoletter.createdAt) }}</p>
            </div>

            <!-- Card Body -->
            <div class="p-4 space-y-3">
              <!-- Content Preview -->
              <p class="text-slate-600 text-sm line-clamp-3">
                {{ infoletter.content || 'Kein Inhalt vorhanden' }}
              </p>

              <!-- Metadata -->
              <div class="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded">
                <span>{{ infoletter.versions?.length || 0 }} Versionen</span>
                <span v-if="infoletter.collaborators?.length" class="flex items-center gap-1">
                  <Users class="size-4" />
                  {{ infoletter.collaborators.length }} Mitarbeiter
                </span>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-4 py-3 bg-slate-50 border-t border-slate-200 flex gap-2">
              <router-link
                :to="`/infoletter/${infoletter.id}/edit`"
                class="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded text-sm font-medium hover:bg-indigo-200 transition text-center inline-flex items-center justify-center gap-2"
              >
                <Edit3 class="size-4" />
                Bearbeiten
              </router-link>
              <button
                @click="deleteMine(infoletter.id)"
                class="px-3 py-2 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition inline-flex items-center gap-2"
              >
                <Trash2 class="size-4" />
                Löschen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIVIDER -->
    <div v-if="publishedInfoletters.length > 0" class="border-t-2 border-slate-200 pt-8">
      <!-- PUBLIC INFOLETTERS SECTION -->
      <section>
        <div class="space-y-6">
          <!-- Header -->
          <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-2">📰 Öffentliche Infoletter</h2>
            <p class="text-slate-600">Entdecke veröffentlichte Newsletter von anderen Nutzern</p>
          </div>

          <!-- Loading State -->
          <div v-if="loadingPublished" class="flex justify-center items-center h-64">
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
              <p class="mt-3 text-slate-600">Wird geladen...</p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorPublished" class="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            {{ errorPublished }}
          </div>

          <!-- Published Infoletter Grid -->
          <div v-if="!loadingPublished && publishedInfoletters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="infoletter in publishedInfoletters"
              :key="infoletter.id"
              class="bg-white rounded-lg shadow hover:shadow-lg transition border border-purple-200 overflow-hidden group"
            >
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-purple-200">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg font-semibold text-slate-900 flex-1 line-clamp-2">
                    {{ infoletter.title }}
                  </h3>
                  <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    ✓ Veröffentlicht
                  </span>
                </div>
                <p class="text-sm text-slate-600">{{ formatDate(infoletter.publishedAt) }}</p>
              </div>

              <!-- Card Body -->
              <div class="p-4 space-y-3">
                <!-- Author Info -->
                <div class="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {{ infoletter.owner.name?.charAt(0).toUpperCase() }}
                  </div>
                  <div class="text-sm">
                    <p class="font-medium text-slate-900">{{ infoletter.owner.name }}</p>
                    <p class="text-xs text-slate-500">{{ infoletter.owner.email }}</p>
                  </div>
                </div>

                <!-- Content Preview -->
                <p class="text-slate-600 text-sm line-clamp-3">
                  {{ infoletter.content || 'Kein Inhalt vorhanden' }}
                </p>
              </div>

              <!-- Card Footer -->
              <div class="px-4 py-3 bg-purple-50 border-t border-purple-200">
                <button
                  @click="viewPublished(infoletter.id)"
                  class="w-full px-3 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 transition inline-flex items-center justify-center gap-2"
                >
                  <Eye class="size-4" />
                  Ansehen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Mail, Users, Edit3, Trash2, Eye } from 'lucide-vue-next'
import { infoletterService } from '../services/infoletterService'
import StatusBadge from './StatusBadge.vue'

interface Infoletter {
  id: string
  title: string
  content: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  publishedAt?: string
  owner: {
    id: string
    name: string
    email: string
    profileImageUrl?: string
  }
  versions?: any[]
  collaborators?: any[]
}

const router = useRouter()

// My Infoletters
const myInfoletters = ref<Infoletter[]>([])
const loadingMine = ref(false)
const errorMine = ref('')

// Published Infoletters
const publishedInfoletters = ref<Infoletter[]>([])
const loadingPublished = ref(false)
const errorPublished = ref('')

const loadMyInfoletters = async () => {
  loadingMine.value = true
  errorMine.value = ''

  try {
    const data = await infoletterService.getAll()
    myInfoletters.value = data
  } catch (err: any) {
    errorMine.value = err.message || 'Fehler beim Laden der Infoletter'
    console.error('Error loading my infoletters:', err)
  } finally {
    loadingMine.value = false
  }
}

const loadPublishedInfoletters = async () => {
  loadingPublished.value = true
  errorPublished.value = ''

  try {
    const data = await infoletterService.getPublished()
    publishedInfoletters.value = data
  } catch (err: any) {
    errorPublished.value = err.message || 'Fehler beim Laden der öffentlichen Infoletter'
    console.error('Error loading published infoletters:', err)
  } finally {
    loadingPublished.value = false
  }
}

const deleteMine = async (id: string) => {
  if (!confirm('Bist du sicher, dass du diesen Infoletter löschen möchtest?')) {
    return
  }

  try {
    await infoletterService.delete(id)
    myInfoletters.value = myInfoletters.value.filter(i => i.id !== id)
  } catch (err: any) {
    errorMine.value = err.message || 'Fehler beim Löschen'
    console.error('Error deleting infoletter:', err)
  }
}

const viewPublished = (id: string) => {
  router.push(`/infoletter/${id}/view`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  console.log('🔑 InfoletterFeed mounted, loading both datasets in parallel...')
  
  // ✅ Load BOTH in parallel with Promise.allSettled
  // This is faster than loading sequentially
  const results = await Promise.allSettled([
    loadMyInfoletters(),
    loadPublishedInfoletters()
  ])
  
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`❌ Load ${index === 0 ? 'mine' : 'published'} failed:`, result.reason)
    }
  })
  
  console.log('✅ InfoletterFeed data loaded')
})
</script>
