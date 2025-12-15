<template>
  <div>
    <h2>Infoletter Feed</h2>
    <div v-for="letter in infoletters" :key="letter.id" class="infoletter">
      <h3>{{ letter.title }}</h3>
      <p>{{ letter.content }}</p>
      <small>Erstellt am {{ letter.createdAt }}</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useInfoletterStore } from '../stores/infoletter'
import type { Infoletter } from '../models/Infoletter'

const infoletterStore = useInfoletterStore()
const { infoletters } = storeToRefs(infoletterStore)
// infoletters ist jetzt ein ref<Infoletter[]>
</script>

<style scoped>
.infoletter {
  border: 1px solid #ddd;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 4px;
}
</style>
