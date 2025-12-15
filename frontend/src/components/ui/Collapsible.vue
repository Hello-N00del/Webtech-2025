<template>
  <div data-slot="collapsible">
    <button
      type="button"
      data-slot="collapsible-trigger"
      class="inline-flex items-center gap-2"
      @click="open = !open"
    >
      <slot name="trigger" :open="open" />
    </button>

    <transition
      enter-active-class="transition-[max-height,opacity] duration-200 ease-out"
      leave-active-class="transition-[max-height,opacity] duration-150 ease-in"
    >
      <div
        v-show="open"
        data-slot="collapsible-content"
        class="overflow-hidden"
      >
        <slot :open="open" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const open = ref(props.modelValue ?? false)

watch(
  () => props.modelValue,
  (v) => {
    if (typeof v === 'boolean') open.value = v
  }
)

watch(open, (v) => emit('update:modelValue', v))
</script>
