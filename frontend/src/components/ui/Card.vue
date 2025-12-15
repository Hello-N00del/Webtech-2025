<template>
  <div
    data-slot="card"
    class="bg-white text-slate-900 flex flex-col gap-6 rounded-xl border shadow-sm"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  className?: string
}>()

const { className } = props
</script>

<!-- Header -->
<template #header>
  <div
    data-slot="card-header"
    class="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6"
  >
    <slot name="header" />
  </div>
</template>

<!-- Action-Bereich im Header -->
<template #action>
  <div
    data-slot="card-action"
    class="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
  >
    <slot name="action" />
  </div>
</template>

<!-- Titel -->
<template #title>
  <h4
    data-slot="card-title"
    class="leading-none"
  >
    <slot name="title" />
  </h4>
</template>

<!-- Beschreibung -->
<template #description>
  <p
    data-slot="card-description"
    class="text-slate-500"
  >
    <slot name="description" />
  </p>
</template>

<!-- Content -->
<template #content>
  <div
    data-slot="card-content"
    class="px-6 last:pb-6"
  >
    <slot name="content" />
  </div>
</template>

<!-- Footer -->
<template #footer>
  <div
    data-slot="card-footer"
    class="flex items-center px-6 pb-6"
  >
    <slot name="footer" />
  </div>
</template>
