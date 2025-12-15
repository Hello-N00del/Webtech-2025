<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">
      <h1 class="text-3xl font-bold text-slate-900 mb-3">
        Webtech-2025 Infoletter
      </h1>
      <p class="text-slate-600 mb-8">
        Melde dich an, um auf deine Infoletter zuzugreifen.
      </p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            E‑Mail
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Passwort
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div v-if="authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          ❌ {{ authStore.error }}
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          {{ authStore.loading ? 'Wird angemeldet...' : 'Anmelden' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        Noch kein Account?
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-700 font-medium">
          Jetzt registrieren
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    // Nach erfolgreichem Login zu Infoletter-Liste navigieren
    router.push('/infoletter')
  } catch (error) {
    console.error('Login failed:', error)
    // Fehler wird bereits im authStore gesetzt
  }
}
</script>
