<template>
  <div
    data-slot="avatar"
    class="relative flex size-10 shrink-0 overflow-hidden rounded-full"
    :class="className"
  >
    <img
      v-if="src && !error"
      :src="src"
      :alt="alt"
      data-slot="avatar-image"
      class="aspect-square size-full object-cover"
      @error="error = true"
    />
    <div
      v-else
      data-slot="avatar-fallback"
      class="bg-slate-200 flex size-full items-center justify-center rounded-full text-sm font-medium text-slate-600"
    >
      <slot name="fallback">
        {{ initials }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  name?: string
  className?: string
}>()

const error = ref(false)

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>
