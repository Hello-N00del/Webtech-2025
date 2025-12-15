<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Haupt-Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Kopfbereich mit Icon und Text -->
      <section class="bg-white rounded-3xl shadow-sm border border-slate-100 px-6 sm:px-10 py-10">
        <div class="flex items-start gap-4 mb-10">
          <!-- Icon links -->
          <div
            class="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg relative"
          >
            <span class="text-white text-2xl">💬</span>
            <span class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white"></span>
          </div>

          <div>
            <h1 class="text-2xl sm:text-3xl font-semibold text-slate-900">
              Willkommen im Webtech-2025 Forum!
            </h1>
            <p class="mt-2 text-slate-500 max-w-2xl">
              Tausche dich mit anderen Entwicklern aus, stelle Fragen und teile dein Wissen über moderne Webtechnologien.
            </p>
          </div>
        </div>

        <!-- Karten-Bereich -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Forum-Karte -->
          <article
            class="rounded-3xl bg-gradient-to-b from-blue-50 to-slate-50 border border-blue-100 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl shadow-md"
              >
                💬
              </div>
              <h2 class="text-lg font-semibold text-slate-900">
                Forum
              </h2>
            </div>
            <p class="text-sm text-slate-500 mb-6">
              4 aktive Diskussionen
            </p>
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              Zum Forum
              <span class="ml-1 text-base">→</span>
            </button>
          </article>

          <!-- Newsletter-Karte -->
          <article
            class="rounded-3xl bg-gradient-to-b from-fuchsia-50 to-slate-50 border border-fuchsia-100 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="h-12 w-12 rounded-2xl bg-fuchsia-600 flex items-center justify-center text-white text-2xl shadow-md"
              >
                ✉️
              </div>
              <h2 class="text-lg font-semibold text-slate-900">
                Newsletter
              </h2>
            </div>
            <p class="text-sm text-slate-500 mb-6">
              3 verfügbare Ausgaben
            </p>
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-fuchsia-700 hover:text-fuchsia-800"
            >
              Newsletter ansehen
              <span class="ml-1 text-base">→</span>
            </button>
          </article>

          <!-- Community-Karte -->
          <article
            class="rounded-3xl bg-gradient-to-b from-emerald-50 to-slate-50 border border-emerald-100 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-md"
              >
                👥
              </div>
              <h2 class="text-lg font-semibold text-slate-900">
                Community
              </h2>
            </div>
            <p class="text-sm text-slate-500 mb-6">
              Werde Teil unserer Community
            </p>
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Mitmachen
              <span class="ml-1 text-base">→</span>
            </button>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * Dieses Dashboard ist statisch.
 * Falls du später echte Daten (z.B. Anzahl Diskussionen) einbindest,
 * kannst du Props oder einen Store nutzen.
 */
</script>

<style scoped>
/* Feine Anpassung für große Screens, ohne mobile zu brechen */
@media (min-width: 1024px) {
  main {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
</style>
