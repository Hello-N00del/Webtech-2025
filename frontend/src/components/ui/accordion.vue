<template>
  <div class="divide-y rounded-md border" data-slot="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.id ?? index"
      class="border-b last:border-b-0"
      data-slot="accordion-item"
    >
      <button
        type="button"
        class="focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
        :class="item.triggerClass"
        @click="toggle(index)"
      >
        <span>
          <slot name="trigger" :item="item">
            {{ item.label }}
          </slot>
        </span>
        <svg
          class="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 text-slate-500"
          :class="{ 'rotate-180': isOpen(index) }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <transition
        enter-active-class="transition-[max-height] duration-200 ease-out"
        leave-active-class="transition-[max-height] duration-200 ease-in"
      >
        <div
          v-show="isOpen(index)"
          class="overflow-hidden text-sm"
          data-slot="accordion-content"
        >
          <div class="pb-4 pt-0" :class="item.contentClass">
            <slot name="content" :item="item">
              {{ item.content }}
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type AccordionItem = {
  id?: string | number
  label?: string
  content?: string
  triggerClass?: string
  contentClass?: string
}

const props = defineProps<{
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpenIndices?: number[]
}>()

const openIndices = ref<Set<number>>(new Set(props.defaultOpenIndices ?? []))

const isOpen = (index: number) => openIndices.value.has(index)

const toggle = (index: number) => {
  const next = new Set(openIndices.value)

  if (props.type === 'single' || props.type === undefined) {
    next.clear()
    if (!openIndices.value.has(index)) {
      next.add(index)
    }
  } else {
    if (next.has(index)) next.delete(index)
    else next.add(index)
  }

  openIndices.value = next
}
</script>
