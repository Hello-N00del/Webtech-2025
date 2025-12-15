<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
      statusClass
    ]"
  >
    <span
      :class="[
        'size-2 rounded-full mr-2',
        statusDotClass
      ]"
    ></span>
    {{ statusLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Status = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

interface Props {
  status: Status
}

const props = defineProps<Props>()

const statusLabel = computed(() => {
  switch (props.status) {
    case 'DRAFT':
      return 'Entwurf'
    case 'PUBLISHED':
      return 'Veröffentlicht'
    case 'ARCHIVED':
      return 'Archiviert'
    default:
      return props.status
  }
})

const statusClass = computed(() => {
  switch (props.status) {
    case 'DRAFT':
      return 'bg-yellow-100 text-yellow-800'
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800'
    case 'ARCHIVED':
      return 'bg-slate-100 text-slate-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
})

const statusDotClass = computed(() => {
  switch (props.status) {
    case 'DRAFT':
      return 'bg-yellow-500'
    case 'PUBLISHED':
      return 'bg-green-500'
    case 'ARCHIVED':
      return 'bg-slate-500'
    default:
      return 'bg-slate-500'
  }
})
</script>
