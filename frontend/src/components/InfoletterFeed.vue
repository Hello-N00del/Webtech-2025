<template>
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
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p class="mt-3 text-slate-600">Wird geladen...</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-if="!loading && infoletters.length === 0" class="text-center py-12 bg-slate-50 rounded-lg">
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

    <!-- Infoletter Grid -->
    <div v-if="!loading && infoletters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="infoletter in infoletters"
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
            @click="deleteInfoletter(infoletter.id)"
            class="px-3 py-2 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition inline-flex items-center gap-2"
          >
            <Trash2 class="size-4" />
            Löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Mail, Users, Edit3, Trash2 } from 'lucide-vue-next'
import { infoletterService } from '../services/infoletterService'
import StatusBadge from './StatusBadge.vue'

interface Infoletter {
  id: string
  title: string
  content: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  versions?: any[]
  collaborators?: any[]
}

const infoletters = ref<Infoletter[]>([])
const loading = ref(false)
const error = ref('')

const loadInfoletters = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await infoletterService.getAll()
    infoletters.value = data
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Laden der Infoletter'
    console.error('Error loading infoletters:', err)
  } finally {
    loading.value = false
  }
}

const deleteInfoletter = async (id: string) => {
  if (!confirm('Bist du sicher, dass du diesen Infoletter löschen möchtest?')) {
    return
  }

  try {
    await infoletterService.delete(id)
    infoletters.value = infoletters.value.filter(i => i.id !== id)
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Löschen'
    console.error('Error deleting infoletter:', err)
  }
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
  loadInfoletters()
})
</script>
