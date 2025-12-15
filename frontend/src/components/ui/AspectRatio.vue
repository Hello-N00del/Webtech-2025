<template>
  <div
    data-slot="aspect-ratio"
    class="relative w-full"
    :style="{ paddingTop: paddingTop }"
  >
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** Verhältnis Breite:Höhe, z.B. 16/9 oder 1 */
  ratio?: number
}>()

const paddingTop = computed(() => {
  const r = props.ratio && props.ratio > 0 ? props.ratio : 1
  return `${100 / r}%`
})
</script>
