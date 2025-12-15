<template>
  <div class="bg-white rounded-lg shadow border border-slate-200 p-6 hover:shadow-lg transition">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-slate-600 text-sm font-medium mb-1">{{ title }}</p>
        <p :class="['text-4xl font-bold', colorClass]">{{ value }}</p>
      </div>
      <div :class="['p-3 rounded-lg', bgColorClass]">
        <component :is="iconComponent" :class="['size-6', colorClass]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FileText, CheckCircle, Clock } from 'lucide-vue-next'

type IconType = 'FileText' | 'CheckCircle' | 'Clock'
type ColorType = 'indigo' | 'green' | 'yellow'

interface Props {
  title: string
  value: string
  icon: IconType
  color: ColorType
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'FileText':
      return FileText
    case 'CheckCircle':
      return CheckCircle
    case 'Clock':
      return Clock
    default:
      return FileText
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'indigo':
      return 'text-indigo-600'
    case 'green':
      return 'text-green-600'
    case 'yellow':
      return 'text-yellow-600'
    default:
      return 'text-indigo-600'
  }
})

const bgColorClass = computed(() => {
  switch (props.color) {
    case 'indigo':
      return 'bg-indigo-50'
    case 'green':
      return 'bg-green-50'
    case 'yellow':
      return 'bg-yellow-50'
    default:
      return 'bg-indigo-50'
  }
})
</script>
