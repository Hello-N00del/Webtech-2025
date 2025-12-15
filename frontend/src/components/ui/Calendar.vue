<template>
  <div class="p-3">
    <div class="flex justify-center pt-1 relative items-center w-full mb-2">
      <div class="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          class="size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          @click="prevMonth"
        >
          ‹
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          @click="nextMonth"
        >
          ›
        </Button>
      </div>
      <span class="text-sm font-medium">
        {{ monthLabel }}
      </span>
    </div>

    <div class="w-full border-collapse space-x-1">
      <div class="flex text-[0.8rem]">
        <div
          v-for="d in weekdays"
          :key="d"
          class="text-slate-400 rounded-md w-8 font-normal text-[0.8rem] text-center"
        >
          {{ d }}
        </div>
      </div>

      <div
        v-for="(week, wi) in weeks"
        :key="wi"
        class="flex w-full mt-2"
      >
        <div
          v-for="(day, di) in week"
          :key="di"
          class="relative p-0 text-center text-sm"
        >
          <button
            v-if="day"
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-normal transition-all size-8 p-0 aria-selected:opacity-100"
            :class="dayClass(day)"
            :aria-selected="isSelected(day) ? 'true' : undefined"
            @click="select(day)"
          >
            {{ day.getDate() }}
          </button>
          <div v-else class="w-8 h-8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from './Button.vue'

const props = defineProps<{
  modelValue?: Date | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
}>()

const today = new Date()
const current = ref(
  props.modelValue ? new Date(props.modelValue) : new Date(today)
)

const monthLabel = computed(() =>
  current.value.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
)

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const weeks = computed(() => {
  const start = new Date(current.value.getFullYear(), current.value.getMonth(), 1)
  const end = new Date(current.value.getFullYear(), current.value.getMonth() + 1, 0)
  const firstWeekday = (start.getDay() + 6) % 7 // Mo=0
  const days: (Date | null)[] = []

  for (let i = 0; i < firstWeekday; i++) days.push(null)
  for (let d = 1; d <= end.getDate(); d++) {
    days.push(new Date(current.value.getFullYear(), current.value.getMonth(), d))
  }

  const res: (Date | null)[][] = []
  for (let i = 0; i < days.length; i += 7) {
    res.push(days.slice(i, i + 7))
  }
  return res
})

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const isSelected = (d: Date) =>
  props.modelValue ? isSameDay(d, props.modelValue) : false

const isToday = (d: Date) => isSameDay(d, today)

const dayClass = (d: Date) => {
  if (isSelected(d)) {
    return 'bg-purple-600 text-white hover:bg-purple-700'
  }
  if (isToday(d)) {
    return 'bg-slate-100 text-slate-900'
  }
  return 'hover:bg-slate-100 text-slate-800'
}

const select = (d: Date) => {
  emit('update:modelValue', d)
}

const prevMonth = () => {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() + 1,
    1
  )
}
</script>
