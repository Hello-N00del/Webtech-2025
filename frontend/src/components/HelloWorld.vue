<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
          <LogIn class="size-12 text-white" :stroke-width="2.5" />
        </div>
        <h1 class="text-gray-900 mb-2">Willkommen zurück!</h1>
        <p class="text-gray-600">Melde dich an, um fortzufahren</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-gray-700 mb-2">
              E-Mail-Adresse
            </label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                id="email"
                type="email"
                v-model="email"
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="deine@email.de"
                required
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-gray-700 mb-2">
              Passwort
            </label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                id="password"
                type="password"
                v-model="password"
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="rememberMe"
                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span class="text-gray-700">Angemeldet bleiben</span>
            </label>
            <button type="button" class="text-indigo-600 hover:text-indigo-700">
              Passwort vergessen?
            </button>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {{ isLoading ? 'Wird geladen...' : 'Anmelden' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Noch kein Account?
            <button class="text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
              <LogIn class="size-4" />
              Jetzt registrieren
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../stores/AppStore';
import { LogIn, Mail, Lock } from 'lucide-vue-next';

const store = useAppStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const isLoading = ref(false);

const handleSubmit = () => {
  error.value = '';

  if (!email.value || !password.value) {
    error.value = 'Bitte füllen Sie alle Felder aus';
    return;
  }

  isLoading.value = true;
  
  // Simuliere Login
  setTimeout(() => {
    const success = store.login(email.value, password.value);
    isLoading.value = false;
    
    if (!success) {
      error.value = 'Login fehlgeschlagen. Bitte versuchen Sie es erneut.';
    }
  }, 500);
};
</script>
