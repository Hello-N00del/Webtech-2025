<template>
  <nav aria-label="breadcrumb" data-slot="breadcrumb">
    <ol
      data-slot="breadcrumb-list"
      class="text-slate-500 flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"
    >
      <slot />
    </ol>
  </nav>
</template>

<script setup lang="ts">
</script>

<!-- BreadcrumbItem.vue -->
<template>
  <li
    data-slot="breadcrumb-item"
    class="inline-flex items-center gap-1.5"
  >
    <slot />
  </li>
</template>

<script setup lang="ts"></script>

<!-- BreadcrumbLink.vue -->
<template>
  <a
    data-slot="breadcrumb-link"
    class="transition-colors hover:text-slate-900"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup lang="ts"></script>

<!-- BreadcrumbPage.vue -->
<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="font-normal text-slate-900"
  >
    <slot />
  </span>
</template>

<script setup lang="ts"></script>

<!-- BreadcrumbSeparator.vue -->
<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    class="[&>svg]:size-3.5"
  >
    <slot>
      <svg
        viewBox="0 0 24 24"
        class="size-3.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </slot>
  </li>
</template>

<script setup lang="ts"></script>

<!-- BreadcrumbEllipsis.vue -->
<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    class="flex size-9 items-center justify-center"
  >
    <slot>
      <svg
        viewBox="0 0 24 24"
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="5" cy="12" r="1"></circle>
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
      </svg>
      <span class="sr-only">More</span>
    </slot>
  </span>
</template>

<script setup lang="ts"></script>
