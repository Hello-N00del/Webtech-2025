<template>
  <form @submit.prevent="submit">
    <label for="title">Titel:</label>
    <input id="title" v-model="title" type="text" />

    <label for="content">Inhalt:</label>
    <textarea id="content" v-model="content"></textarea>

    <button type="submit">Infoletter erstellen</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useInfoletterStore } from '../stores/infoletter';

const title = ref('');
const content = ref('');
const infoletterStore = useInfoletterStore();

function submit() {
  infoletterStore.addInfoletter({
    id: Math.random().toString(36).substring(2, 9), // Dummy-ID
    title: title.value,
    content: content.value,
    createdAt: new Date().toISOString(),
    userId: 'user1'
  });
  title.value = '';
  content.value = '';
}
</script>