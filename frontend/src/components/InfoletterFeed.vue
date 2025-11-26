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
import { storeToRefs } from 'pinia';
import { useInfoletterStore } from '../stores/infoletter';

const infoletterStore = useInfoletterStore();
const { infoletters } = storeToRefs(infoletterStore);

// Optional: Infoletter beim Laden abrufen, später mit Service/API
</script>