<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 border border-indigo-100">
      <h2 class="text-3xl font-bold text-slate-900 mb-2">Willkommen, {{ authStore.userName }}! 👋</h2>
      <p class="text-slate-600 text-lg">
        Verwalte deine Newsletter und arbeite mit deinem Team zusammen
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon="FileText"
        title="Infoletter insgesamt"
        :value="stats.totalInfoletters.toString()"
        color="indigo"
      />
      <StatCard
        icon="CheckCircle"
        title="Veröffentlicht"
        :value="stats.publishedInfoletters.toString()"
        color="green"
      />
      <StatCard
        icon="Clock"
        title="Entwürfe"
        :value="stats.draftInfoletters.toString()"
        color="yellow"
      />
    </div>

    <!-- Recent Infoletters -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-bold text-slate-900">Zuletzt aktualisiert</h3>
        <router-link
          to="/infoletter"
          class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
        >
          Alle anzeigen →
        </router-link>
      </div>

      <div v-if="loading" class="flex justify-center py-8">
        <div class="text-slate-600">Lädt...</div>
      </div>

      <div v-if="!loading && recentInfoletters.length === 0" class="text-center py-8 bg-slate-50 rounded-lg">
        <p class="text-slate-600 mb-4">Noch keine Infoletter vorhanden</p>
        <router-link
          to="/infoletter/create"
          class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Ersten Infoletter erstellen
        </router-link>
      </div>

      <div v-if="!loading && recentInfoletters.length > 0" class="space-y-3">
        <div
          v-for="infoletter in recentInfoletters"
          :key="infoletter.id"
          class="bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-200 hover:shadow-md transition"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="font-semibold text-slate-900 mb-1">{{ infoletter.title }}</h4>
              <p class="text-sm text-slate-600 line-clamp-1">{{ infoletter.content }}</p>
            </div>
            <StatusBadge :status="infoletter.status" />
          </div>
          <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>{{ formatDate(infoletter.createdAt) }}</span>
            <router-link
              :to="`/infoletter/${infoletter.id}/edit`"
              class="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Bearbeiten
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-3">🚀 Schnellstart</h3>
      <ul class="space-y-2 text-sm text-blue-800">
        <li class="flex items-center gap-2">
          <span class="text-blue-600">→</span>
          Gehe zu "Meine Infoletter" um deine Newsletter zu verwalten
        </li>
        <li class="flex items-center gap-2">
          <span class="text-blue-600">→</span>
          Klicke "Neuer Infoletter" um einen Newsletter zu erstellen
        </li>
        <li class="flex items-center gap-2">
          <span class="text-blue-600">→</span>
          Teile deinen Newsletter mit Mitarbeitern und arbeite zusammen
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { infoletterService } from '../services/infoletterService'
import StatusBadge from './StatusBadge.vue'
import StatCard from './StatCard.vue'

interface Infoletter {
  id: string
  title: string
  content: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
}

const authStore = useAuthStore()
const loading = ref(false)
const recentInfoletters = ref<Infoletter[]>([])
const stats = ref({
  totalInfoletters: 0,
  publishedInfoletters: 0,
  draftInfoletters: 0
})

const loadData = async () => {
  loading.value = true
  try {
    const infoletters = await infoletterService.getAll()
    recentInfoletters.value = infoletters.slice(0, 5)
    stats.value = {
      totalInfoletters: infoletters.length,
      publishedInfoletters: infoletters.filter(i => i.status === 'PUBLISHED').length,
      draftInfoletters: infoletters.filter(i => i.status === 'DRAFT').length
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadData()
})
</script>
