<template>
  <div
    class="relative"
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
  >
    <div class="overflow-hidden" data-slot="carousel-content">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="min-w-0 shrink-0 grow-0 basis-full"
          role="group"
          aria-roledescription="slide"
          data-slot="carousel-item"
        >
          <slot :item="item" :index="index" />
        </div>
      </div>
    </div>

    <!-- Prev -->
    <button
      type="button"
      class="absolute size-8 rounded-full bg-white border flex items-center justify-center top-1/2 -left-4 -translate-y-1/2 shadow-sm disabled:opacity-40"
      data-slot="carousel-previous"
      :disabled="currentIndex === 0"
      @click="prev"
    >
      ‹
      <span class="sr-only">Previous slide</span>
    </button>

    <!-- Next -->
    <button
      type="button"
      class="absolute size-8 rounded-full bg-white border flex items-center justify-center top-1/2 -right-4 -translate-y-1/2 shadow-sm disabled:opacity-40"
      data-slot="carousel-next"
      :disabled="currentIndex === items.length - 1"
      @click="next"
    >
      ›
      <span class="sr-only">Next slide</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  items: unknown[]
  modelValue?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const currentIndex = ref(props.modelValue ?? 0)

watch(
  () => props.modelValue,
  (val) => {
    if (typeof val === 'number') currentIndex.value = val
  }
)

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    emit('update:modelValue', currentIndex.value)
  }
}

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++
    emit('update:modelValue', currentIndex.value)
  }
}
</script>


