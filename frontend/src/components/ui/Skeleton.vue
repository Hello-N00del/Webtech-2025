<script setup lang="ts">
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="skeleton"
    :class="cn('bg-accent animate-pulse rounded-md', props.class)"
  />
</template>
