<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          Webtech-2025
        </h1>
        <p class="text-slate-600">
          Infoletter Management System
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">
          Anmelden
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              E-Mail
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="beispiel@email.de"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Passwort
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Dein Passwort"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ❌ {{ authStore.error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            {{ authStore.loading ? 'Wird angemeldet...' : 'Anmelden' }}
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center text-sm text-slate-600">
          Noch kein Account?
          <router-link to="/register" class="text-indigo-600 hover:text-indigo-700 font-medium">
            Jetzt registrieren
          </router-link>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-xs text-slate-500">
        <p>© 2025 Webtech-2025. Alle Rechte vorbehalten.</p>
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
