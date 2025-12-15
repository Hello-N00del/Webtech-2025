<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">
      <h1 class="text-3xl font-bold text-slate-900 mb-3">
        Webtech-2025 Forum
      </h1>
      <p class="text-slate-600 mb-8">
        Melde dich an, um auf das Forum und neue Threads zuzugreifen.
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

        <button
          type="submit"
          class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Anmelden
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/authStore" // Pfad ggf. anpassen

const authStore = useAuthStore()

const email = ref("")
const password = ref("")

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
}
</script>
