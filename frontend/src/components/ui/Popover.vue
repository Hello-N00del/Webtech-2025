<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger as RadixPopoverTrigger,
  PopoverContent as RadixPopoverContent,
  PopoverPortal as RadixPopoverPortal,
  PopoverAnchor as RadixPopoverAnchor,
} from "radix-vue"
import { cn } from "./utils"

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {},
)
</script>

<template>
  <PopoverRoot
    v-bind="$attrs"
    data-slot="popover"
  >
    <slot />
  </PopoverRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const PopoverTrigger = defineComponent({
  name: "PopoverTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixPopoverTrigger,
        { ...attrs, "data-slot": "popover-trigger" },
        slots,
      )
  },
})

export const PopoverContent = defineComponent({
  name: "PopoverContent",
  props: {
    class: String,
    align: {
      type: String as () => "start" | "center" | "end",
      default: "center",
    },
    sideOffset: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixPopoverPortal,
        null,
        {
          default: () =>
            h(
              RadixPopoverContent,
              {
                ...attrs,
                "data-slot": "popover-content",
                align: props.align,
                sideOffset: props.sideOffset,
                class: cn(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-hidden",
                  props.class,
                ),
              },
              slots,
            ),
        },
      )
  },
})

export const PopoverAnchor = defineComponent({
  name: "PopoverAnchor",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixPopoverAnchor,
        { ...attrs, "data-slot": "popover-anchor" },
        slots,
      )
  },
})
</script>
