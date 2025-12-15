<template>
  <button
    data-slot="button"
    :class="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\"size-\"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px]',
      variantClass,
      sizeClass,
      className,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}>()

const { variant = 'default', size = 'default', className } = props

const variantClass = computed(() => {
  switch (variant) {
    case 'destructive':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'outline':
      return 'border bg-white text-slate-900 hover:bg-slate-50'
    case 'secondary':
      return 'bg-slate-100 text-slate-900 hover:bg-slate-200'
    case 'ghost':
      return 'hover:bg-slate-100 hover:text-slate-900'
    case 'link':
      return 'text-purple-600 underline-offset-4 hover:underline'
    default:
      return 'bg-purple-600 text-white hover:bg-purple-700'
  }
})

const sizeClass = computed(() => {
  switch (size) {
    case 'sm':
      return 'h-8 rounded-md gap-1.5 px-3'
    case 'lg':
      return 'h-10 rounded-md px-6'
    case 'icon':
      return 'size-9 rounded-md'
    default:
      return 'h-9 px-4 py-2'
  }
})
</script>
