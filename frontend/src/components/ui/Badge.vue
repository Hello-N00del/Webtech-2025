<template>
  <component
    :is="asChild ? 'span' : 'span'"
    data-slot="badge"
    :class="[
      'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden transition-[color,box-shadow]',
      variantClass,
      className,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  asChild?: boolean
  className?: string
}>()

const { variant = 'default', asChild = false, className } = props

const variantClass = computed(() => {
  switch (variant) {
    case 'secondary':
      return 'border-transparent bg-slate-100 text-slate-800'
    case 'destructive':
      return 'border-transparent bg-red-600 text-white'
    case 'outline':
      return 'border-slate-300 text-slate-900'
    default:
      return 'border-transparent bg-purple-600 text-white'
  }
})
</script>
