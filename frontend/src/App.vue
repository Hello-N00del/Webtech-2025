<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Top-Navigation -->
    <header class="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand -->
          <div class="flex flex-col">
            <span class="font-semibold text-sm sm:text-base">
              Webtech-2025 Forum
            </span>
            <span class="text-xs sm:text-sm text-purple-100">
              Community Diskussionen und Support
            </span>
          </div>

          <!-- Navigation links (Desktop) -->
          <div class="hidden md:flex items-center gap-8">
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-purple-100 hover:text-white"
            >
              <span class="mr-2 text-lg">🏠</span>
              Home
            </button>
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-purple-100 hover:text-white"
            >
              <span class="mr-2 text-lg">💬</span>
              Forum
            </button>
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-purple-100 hover:text-white"
            >
              <span class="mr-2 text-lg">✉️</span>
              Newsletter
            </button>
          </div>

          <!-- Rechts: User + Logout (Desktop) -->
          <div class="hidden md:flex items-center gap-6 text-sm">
            <div class="inline-flex items-center gap-2 text-purple-100">
              <span class="text-lg">👤</span>
              <span>123@g</span>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-2 text-purple-100 hover:text-white font-medium"
            >
              <span class="text-lg">↪</span>
              <span>Logout</span>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-purple-100 hover:bg-purple-500/40 focus:outline-none focus:ring-2 focus:ring-white"
            @click="mobileOpen = !mobileOpen"
          >
            <span class="sr-only">Menü öffnen</span>
            <span v-if="!mobileOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>

        <!-- Mobile Nav -->
        <div
          v-if="mobileOpen"
          class="md:hidden pb-4 space-y-3 text-sm border-t border-purple-400/40 mt-2"
        >
          <button
            type="button"
            class="flex items-center gap-2 pt-3 text-purple-100 hover:text-white"
          >
            <span class="text-lg">🏠</span>
            Home
          </button>
          <button
            type="button"
            class="flex items-center gap-2 text-purple-100 hover:text-white"
          >
            <span class="text-lg">💬</span>
            Forum
          </button>
          <button
            type="button"
            class="flex items-center gap-2 text-purple-100 hover:text-white"
          >
            <span class="text-lg">✉️</span>
            Newsletter
          </button>

          <div class="flex items-center justify-between pt-3 border-top border-purple-400/40 mt-2">
            <div class="inline-flex items-center gap-2 text-purple-100">
              <span class="text-lg">👤</span>
              <span>123@g</span>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-2 text-purple-100 hover:text-white font-medium"
            >
              <span class="text-lg">↪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Content-Bereich: Dashboard -->
    <main class="flex-1">
      <Dashboard />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dashboard from './components/Dashboard.vue'

const mobileOpen = ref(false)
</script>
