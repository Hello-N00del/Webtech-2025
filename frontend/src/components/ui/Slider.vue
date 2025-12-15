<script setup lang="ts">
import { computed } from "vue"
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
  type SliderRootProps,
} from "radix-vue"
import { cn } from "./utils"

const props = withDefaults(defineProps<SliderRootProps & { class?: string }>(), {
  min: 0,
  max: 100,
})

const values = computed(() => {
  if (Array.isArray(props.value)) return props.value
  if (Array.isArray(props.defaultValue)) return props.defaultValue
  return [props.min ?? 0, props.max ?? 100]
})
</script>

<template>
  <SliderRoot
    v-bind="props"
    data-slot="slider"
    :class="
      cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        props.class,
      )
    "
  >
    <SliderTrack
      data-slot="slider-track"
      class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
    >
      <SliderRange
        data-slot="slider-range"
        class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, index) in values"
      :key="index"
      data-slot="slider-thumb"
      class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
