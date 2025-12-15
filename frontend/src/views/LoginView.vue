<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Logo/Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Webtech-2025</h1>
          <p class="text-slate-600">Infoletter Management System</p>
        </div>

        <!-- Mode Toggle -->
        <div class="flex gap-2 mb-8 bg-slate-100 p-1 rounded-lg">
          <button
            @click="mode = 'login'"
            :class="[
              'flex-1 py-2 px-4 rounded-md font-medium transition-all',
              mode === 'login'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Anmelden
          </button>
          <button
            @click="mode = 'register'"
            :class="[
              'flex-1 py-2 px-4 rounded-md font-medium transition-all',
              mode === 'register'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Registrieren
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">E-Mail</label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="deine@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Passwort</label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Wird angemeldet...' : 'Anmelden' }}
          </button>

          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input
              v-model="registerForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">E-Mail</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="deine@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Passwort</label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Wird registriert...' : 'Registrieren' }}
          </button>

          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

type Mode = 'login' | 'register'

const router = useRouter()
const authStore = useAuthStore()

const mode = ref<Mode>('login')
const loading = ref(false)
const error = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const { email, password } = loginForm.value
    if (!email || !password) {
      error.value = 'Bitte alle Felder ausfüllen'
      return
    }

    console.log('🔑 Logging in...')
    await authStore.login(email, password)
    console.log('✅ Login successful, waiting for redirect...')
    // 🚀 NO router.push() here - let App.vue handle the redirect!
    // This ensures the auth state is properly updated first
  } catch (err: any) {
    console.error('❌ Login error:', err)
    error.value = err.message || 'Anmeldung fehlgeschlagen'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  try {
    const { email, password, name } = registerForm.value
    if (!email || !password || !name) {
      error.value = 'Bitte alle Felder ausfüllen'
      return
    }

    if (password.length < 8) {
      error.value = 'Passwort muss mindestens 8 Zeichen lang sein'
      return
    }

    console.log('📝 Registering...')
    await authStore.register(email, password, name)
    console.log('✅ Registration successful, waiting for redirect...')
    // 🚀 NO router.push() here - let App.vue handle the redirect!
  } catch (err: any) {
    console.error('❌ Registration error:', err)
    error.value = err.message || 'Registrierung fehlgeschlagen'
  } finally {
    loading.value = false
  }
}
</script>
