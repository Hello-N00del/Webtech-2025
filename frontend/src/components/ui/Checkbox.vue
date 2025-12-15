<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    data-slot="checkbox"
    :class="[
      'border bg-white size-4 shrink-0 rounded-[4px] border-slate-300 shadow-xs transition-shadow outline-none flex items-center justify-center',
      'focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      checked && 'bg-purple-600 text-white border-purple-600',
      className,
    ]"
    :disabled="disabled"
    @click="toggle"
  >
    <span
      v-if="checked"
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current"
    >
      <!-- einfacher Check-Icon -->
      <svg
        class="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  className?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checked = computed({
  get: () => props.modelValue ?? false,
  set: (val: boolean) => emit('update:modelValue', val),
})

const toggle = () => {
  if (props.disabled) return
  checked.value = !checked.value
}
</script>
