<script setup lang="ts">
import { inject, provide } from "vue"
import {
  ToggleGroupRoot,
  ToggleGroupItem as RadixToggleGroupItem,
  type ToggleGroupRootProps,
  type ToggleGroupItemProps,
} from "radix-vue"
import type { VariantProps } from "class-variance-authority"

import { cn } from "./utils"
import { toggleVariants } from "./toggle"

type ToggleVariantProps = VariantProps<typeof toggleVariants>

const TOGGLE_GROUP_CTX = Symbol("ToggleGroupContext")

const props = defineProps<
  ToggleGroupRootProps & ToggleVariantProps & { class?: string }
>()
</script>

<template>
  <ToggleGroupRoot
    v-bind="props"
    data-slot="toggle-group"
    :data-variant="props.variant"
    :data-size="props.size"
    :class="
      cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
        props.class,
      )
    "
  >
    <ToggleGroupProvider
      :variant="props.variant"
      :size="props.size"
    >
      <slot />
    </ToggleGroupProvider>
  </ToggleGroupRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

// Context-Provider für Variant/Size
const ToggleGroupProvider = defineComponent({
  name: "ToggleGroupProvider",
  props: {
    variant: String,
    size: String,
  },
  setup(props, { slots }) {
    provide(TOGGLE_GROUP_CTX, {
      variant: props.variant,
      size: props.size,
    } as ToggleVariantProps)

    return () => slots.default?.()
  },
})

export const ToggleGroupItem = defineComponent({
  name: "ToggleGroupItem",
  props: {
    class: String,
    variant: String,
    size: String,
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const ctx = inject<ToggleVariantProps | null>(TOGGLE_GROUP_CTX, null)

    const variant = ctx?.variant ?? (props.variant as any)
    const size = ctx?.size ?? (props.size as any)

    return () =>
      h(
        RadixToggleGroupItem,
        {
          ...(attrs as ToggleGroupItemProps),
          value: props.value,
          "data-slot": "toggle-group-item",
          "data-variant": variant,
          "data-size": size,
          class: cn(
            toggleVariants({ variant, size }),
            "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
            props.class,
          ),
        },
        slots,
      )
  },
})
</script>
