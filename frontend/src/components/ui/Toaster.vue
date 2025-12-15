<script setup lang="ts">
import { computed } from "vue"
import { Toaster as SonnerToaster, type ToasterProps } from "vue-sonner"

// hier musst du deine Theme-Quelle einbinden, z.B. aus Pinia oder composable
// als Beispiel ein simples Prop:
const props = withDefaults(
  defineProps<{
    theme?: ToasterProps["theme"]
  }>(),
  {
    theme: "system",
  },
)

const theme = computed<ToasterProps["theme"]>(() => props.theme || "system")
</script>

<template>
  <SonnerToaster
    :theme="theme"
    class="toaster group"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
    }"
  />
</template>
