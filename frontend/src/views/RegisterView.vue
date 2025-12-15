<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          Webtech-2025
        </h1>
        <p class="text-slate-600">
          Erstelle deinen Account
        </p>
      </div>

      <!-- Register Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">
          Registrieren
        </h2>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Name
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Max Mustermann"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              minlength="2"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              E-Mail
            </label>
            <input
              v-model="form.email"
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
              v-model="form.password"
              type="password"
              placeholder="Mindestens 8 Zeichen"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              minlength="8"
            />
            <p class="text-xs text-slate-500 mt-1">Mindestens 8 Zeichen</p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Passwort bestätigen
            </label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="Passwort wiederholen"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              minlength="8"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ❌ {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            {{ loading ? 'Wird registriert...' : 'Jetzt registrieren' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center text-sm text-slate-600">
          Bereits ein Account?
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-medium">
            Jetzt anmelden
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

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  // Validierung
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwörter stimmen nicht überein'
    return
  }

  if (form.value.password.length < 8) {
    error.value = 'Passwort muss mindestens 8 Zeichen lang sein'
    return
  }

  if (form.value.name.length < 2) {
    error.value = 'Name muss mindestens 2 Zeichen lang sein'
    return
  }

  loading.value = true

  try {
    await authStore.register(
      form.value.email,
      form.value.password,
      form.value.name
    )
    // Nach erfolgreicher Registrierung zur Infoletter-Liste
    router.push('/infoletter')
  } catch (err: any) {
    error.value = err.message || authStore.error || 'Registrierung fehlgeschlagen'
    console.error('Registration failed:', err)
  } finally {
    loading.value = false
  }
}
</script>
