<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">Forum</h2>
        <p class="text-slate-600">
          Alle Threads im Überblick.
        </p>
      </div>
      <button
        type="button"
        @click="showNewThread = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
      >
        Neuen Thread erstellen
      </button>
    </div>

    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Kategorie
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Titel
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Inhalt
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr v-if="store.threads.length === 0">
            <td colspan="3" class="px-6 py-6 text-slate-500">
              Noch keine Threads vorhanden. Erstelle den ersten Beitrag.
            </td>
          </tr>
          <tr v-for="(thread, index) in store.threads" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
              {{ thread.category }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
              {{ thread.title }}
            </td>
            <td class="px-6 py-4 text-sm text-slate-700">
              {{ thread.content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <InfoletterForm v-if="showNewThread" @close="showNewThread = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAppStore } from "../stores/AppStore" // ggf. auf deinen Thread-Store anpassen
import InfoletterForm from "./InfoletterForm.vue"

const store = useAppStore()
const showNewThread = ref(false)
</script>
