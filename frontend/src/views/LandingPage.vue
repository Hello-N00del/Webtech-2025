<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
    <!-- Navigation -->
    <nav class="fixed w-full top-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">W</span>
          </div>
          <h1 class="text-xl font-bold text-white">Webtech-2025</h1>
        </div>
        <router-link
          to="/login"
          class="px-6 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition"
        >
          Anmelden
        </router-link>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="min-h-screen flex items-center justify-center px-4 pt-20">
      <div class="max-w-2xl text-center text-white">
        <!-- Main Title -->
        <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Erstelle Infoletter<br />
          <span class="bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            gemeinsam mit deinem Team
          </span>
        </h2>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-white/80 mb-8">
          Das moderne Newsletter-Management-System für Teams, die zusammenarbeiten
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <router-link
            to="/login"
            class="px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition shadow-lg hover:shadow-xl"
          >
            Jetzt anmelden
          </router-link>
          <router-link
            to="/register"
            class="px-8 py-4 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/50 shadow-lg hover:shadow-xl"
          >
            Kostenlos registrieren
          </router-link>
        </div>

        <!-- Feature Highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-4xl mb-4">✍️</div>
            <h3 class="text-lg font-semibold text-white mb-2">Einfaches Erstellen</h3>
            <p class="text-white/70">Intuitive Editor mit Echtzeit-Vorschau</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-lg font-semibold text-white mb-2">Team-Zusammenarbeit</h3>
            <p class="text-white/70">Arbeite mit deinem Team in Echtzeit</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="text-lg font-semibold text-white mb-2">Verwaltung</h3>
            <p class="text-white/70">Verwalte alle deine Newsletter zentral</p>
          </div>
        </div>
      </div>
    </div>

    <!-- How it works Section -->
    <div class="bg-white/5 backdrop-blur-md border-t border-white/10 py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-white text-center mb-16">So funktioniert's</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Registrieren</h3>
            <p class="text-white/70">Erstelle dein kostenloses Konto</p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Team einladen</h3>
            <p class="text-white/70">Lade Mitarbeiter zum Newsletter ein</p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Zusammenarbeiten</h3>
            <p class="text-white/70">Arbeite gemeinsam am Newsletter</p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">4</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Veröffentlichen</h3>
            <p class="text-white/70">Veröffentliche deinen Newsletter</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="max-w-4xl mx-auto px-4 py-20 text-center">
      <h2 class="text-4xl font-bold text-white mb-6">Bereit zu starten?</h2>
      <p class="text-xl text-white/80 mb-8">
        Erstelle kostenlosen Account und verwalte deine Newsletter wie ein Profi
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/login"
          class="px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition shadow-lg hover:shadow-xl"
        >
          Anmelden
        </router-link>
        <router-link
          to="/register"
          class="px-8 py-4 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/50 shadow-lg hover:shadow-xl"
        >
          Kostenlos registrieren
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-white/10 bg-black/20 backdrop-blur-md py-12 px-4">
      <div class="max-w-6xl mx-auto text-center text-white/60">
        <p>© 2025 Webtech-2025. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No script needed - simple landing page
</script>
