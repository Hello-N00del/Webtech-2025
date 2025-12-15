<script setup lang="ts">
import { Separator as RadixSeparator } from "radix-vue"
import { cn } from "./utils"

const props = withDefaults(
  defineProps<{
    class?: string
    orientation?: "horizontal" | "vertical"
    decorative?: boolean
  }>(),
  {
    orientation: "horizontal",
    decorative: true,
  },
)
</script>

<template>
  <RadixSeparator
    v-bind="$attrs"
    :orientation="props.orientation"
    :decorative="props.decorative"
    data-slot="separator-root"
    :class="
      cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        props.class,
      )
    "
  />
</template>
