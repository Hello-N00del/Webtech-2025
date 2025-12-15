<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-slate-900 mb-2">
        {{ isEditing ? 'Infoletter bearbeiten' : 'Neuer Infoletter' }}
      </h2>
      <p class="text-slate-600">
        {{ isEditing ? 'Aktualisiere deinen Newsletter' : 'Erstelle einen neuen Newsletter' }}
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white rounded-lg shadow-lg p-8">
      <!-- Title Field -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Titel *
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="z.B. Newsletter März 2025"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <!-- Content Field -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Inhalt *
        </label>
        <textarea
          v-model="form.content"
          placeholder="Schreibe deinen Newsletter-Inhalt hier..."
          rows="10"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          required
        ></textarea>
        <p v-if="errors.content" class="text-red-600 text-sm mt-1">{{ errors.content }}</p>
      </div>

      <!-- Status Field -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Status
        </label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.status"
              type="radio"
              value="DRAFT"
              class="w-4 h-4"
            />
            <span class="text-slate-700">Entwurf</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.status"
              type="radio"
              value="PUBLISHED"
              class="w-4 h-4"
            />
            <span class="text-slate-700">Veröffentlicht</span>
          </label>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        {{ error }}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          {{ loading ? 'Wird gespeichert...' : (isEditing ? 'Änderungen speichern' : 'Infoletter erstellen') }}
        </button>
        <router-link
          to="/infoletter"
          class="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition text-center"
        >
          Abbrechen
        </router-link>
      </div>
    </form>

    <!-- Collaborators Section (Edit only) -->
    <div v-if="isEditing" class="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">Mitarbeiter</h3>
        <div class="space-y-4">
          <!-- Collaborator List -->
          <div v-if="collaborators.length > 0" class="space-y-2">
            <div
              v-for="collab in collaborators"
              :key="collab.userId"
              class="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-slate-900">{{ collab.user.name }}</p>
                <p class="text-sm text-slate-600">{{ collab.user.email }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  {{ collab.role }}
                </span>
                <button
                  @click="removeCollaborator(collab.userId)"
                  class="text-red-600 hover:text-red-700 transition"
                  type="button"
                >
                  Entfernen
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-slate-600">Keine Mitarbeiter hinzugefügt</p>

          <!-- Add Collaborator Form -->
          <div class="border-t pt-4 mt-4">
            <h4 class="font-semibold text-slate-900 mb-3">Mitarbeiter hinzufügen</h4>
            <div class="flex gap-2">
              <input
                v-model="newCollaborator.email"
                type="email"
                placeholder="Email des Mitarbeiters"
                class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                v-model="newCollaborator.role"
                class="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Betrachter</option>
              </select>
              <button
                @click="addCollaborator"
                type="button"
                :disabled="!newCollaborator.email"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { infoletterService } from '../services/infoletterService'

const router = useRouter()
const route = useRoute()

const isEditing = computed(() => !!route.params.id)

const form = ref({
  title: '',
  content: '',
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED'
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const error = ref('')
const collaborators = ref<any[]>([])
const newCollaborator = ref({
  email: '',
  role: 'EDITOR'
})

const loadInfoletter = async () => {
  if (!isEditing.value || !route.params.id) return

  try {
    const infoletter = await infoletterService.getById(route.params.id as string)
    form.value = {
      title: infoletter.title,
      content: infoletter.content,
      status: infoletter.status
    }
    collaborators.value = infoletter.collaborators || []
  } catch (err: any) {
    error.value = 'Fehler beim Laden des Infoletters'
    console.error('Error loading infoletter:', err)
  }
}

const handleSubmit = async () => {
  errors.value = {}
  error.value = ''
  loading.value = true

  try {
    // Validation
    if (!form.value.title.trim()) {
      errors.value.title = 'Titel ist erforderlich'
    }
    if (!form.value.content.trim()) {
      errors.value.content = 'Inhalt ist erforderlich'
    }

    if (Object.keys(errors.value).length > 0) {
      loading.value = false
      return
    }

    if (isEditing.value && route.params.id) {
      // Update
      await infoletterService.update(route.params.id as string, form.value)
    } else {
      // Create
      await infoletterService.create(form.value)
    }

    router.push('/infoletter')
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Speichern'
    console.error('Error saving infoletter:', err)
  } finally {
    loading.value = false
  }
}

const addCollaborator = async () => {
  if (!newCollaborator.value.email || !isEditing.value || !route.params.id) return

  try {
    // Note: Backend expects userId, not email. This is a simplified version.
    // In production, you'd need to look up the user ID from email first
    // await infoletterService.addCollaborator(
    //   route.params.id as string,
    //   userId,
    //   newCollaborator.value.role
    // )
    console.warn('Collaborator feature requires user lookup - not fully implemented')
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Hinzufügen des Mitarbeiters'
  }
}

const removeCollaborator = async (userId: string) => {
  if (!isEditing.value || !route.params.id) return

  try {
    await infoletterService.removeCollaborator(route.params.id as string, userId)
    collaborators.value = collaborators.value.filter(c => c.userId !== userId)
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Entfernen des Mitarbeiters'
  }
}

onMounted(() => {
  loadInfoletter()
})
</script>
