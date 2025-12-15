<script setup lang="ts">
import { ProgressRoot, ProgressIndicator } from "radix-vue"
import { cn } from "./utils"

const props = defineProps<{
  class?: string
  modelValue?: number | null
}>()
</script>

<template>
  <ProgressRoot
    v-bind="$attrs"
    :model-value="props.modelValue ?? 0"
    data-slot="progress"
    :class="cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', props.class)"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      class="bg-primary h-full w-full flex-1 transition-all"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%)`"
    />
  </ProgressRoot>
</template>
