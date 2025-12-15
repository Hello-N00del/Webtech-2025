<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-gray-900 mb-2">Willkommen im Webtech-2025 Forum!</h1>
      <p class="text-gray-600">
        Tausche dich mit anderen Entwicklern aus, stelle Fragen und teile dein Wissen über moderne Webtechnologien.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Forum Card -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <MessageSquare class="size-6 text-white" />
          </div>
          <h2 class="text-gray-900">Forum</h2>
        </div>
        <p class="text-gray-700 mb-4">4 aktive Diskussionen</p>
        <button
          @click="$emit('navigate', 'forum')"
          class="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
        >
          Zum Forum <ArrowRight class="size-4" />
        </button>
      </div>

      <!-- Newsletter Card -->
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <Mail class="size-6 text-white" />
          </div>
          <h2 class="text-gray-900">Newsletter</h2>
        </div>
        <p class="text-gray-700 mb-4">3 verfügbare Ausgaben</p>
        <button
          @click="$emit('navigate', 'newsletter')"
          class="text-purple-600 hover:text-purple-700 inline-flex items-center gap-2"
        >
          Newsletter ansehen <ArrowRight class="size-4" />
        </button>
      </div>

      <!-- Community Card -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <Users class="size-6 text-white" />
          </div>
          <h2 class="text-gray-900">Community</h2>
        </div>
        <p class="text-gray-700 mb-4">Werde Teil unserer Community</p>
        <button class="text-green-600 hover:text-green-700 inline-flex items-center gap-2">
          Mitmachen <ArrowRight class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageSquare, Mail, Users, ArrowRight } from 'lucide-vue-next';

defineEmits<{
  navigate: [view: 'forum' | 'newsletter']
}>();
</script>
