<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div
        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl"
      >
        <h2 class="text-gray-900">Neuer Thread</h2>
        <button
          type="button"
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
        >
          <X class="size-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <div>
            <label for="category" class="block text-gray-700 mb-2">
              Kategorie
            </label>
            <select
              id="category"
              v-model="category"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            >
              <option value="Allgemein">Allgemein</option>
              <option value="Wichtig">Wichtig</option>
              <option value="Neuigkeiten">Neuigkeiten</option>
              <option value="Werbung">Werbung</option>
            </select>
          </div>

          <div>
            <label for="title" class="block text-gray-700 mb-2">
              Titel
            </label>
            <input
              id="title"
              type="text"
              v-model="title"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Gib einen Titel ein"
              required
            />
          </div>

          <div>
            <label for="content" class="block text-gray-700 mb-2">
              Inhalt
            </label>
            <textarea
              id="content"
              v-model="content"
              rows="10"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Schreibe deinen Thread..."
              required
            />
          </div>

          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
          >
            {{ error }}
          </div>

          <div class="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="emit('close')"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              <Send class="size-4" />
              {{ isSubmitting ? "Wird veröffentlicht..." : "Veröffentlichen" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue"
import { useAppStore } from "../stores/AppStore" // ggf. in Thread-Store umbenennen
import { Send, X } from "lucide-vue-next"

const emit = defineEmits<{
  (e: "close"): void
}>()

const store = useAppStore()

const title = ref("")
const content = ref("")
const category = ref("Allgemein")
const error = ref("")
const isSubmitting = ref(false)

const handleSubmit = () => {
  error.value = ""

  if (!title.value.trim() || !content.value.trim()) {
    error.value = "Bitte fülle alle Felder aus."
    return
  }

  isSubmitting.value = true

  setTimeout(() => {
    store.addThread(title.value, content.value, category.value)
    isSubmitting.value = false
    title.value = ""
    content.value = ""
    category.value = "Allgemein"
    emit("close")
  }, 300)
}
</script>
