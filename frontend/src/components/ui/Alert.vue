<template>
  <div
    data-slot="alert"
    role="alert"
    :class="[
      'relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing,1rem)*4)_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start',
      '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
      variant === 'destructive'
        ? 'bg-white text-red-700 border-red-200 [&_*[data-slot=alert-description]]:text-red-600'
        : 'bg-white text-slate-900 border-slate-200',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'default' | 'destructive'
  className?: string
}>()

const { variant = 'default', className } = props
</script>
