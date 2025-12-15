<script setup lang="ts">
import {
  HoverCardRoot,
  HoverCardTrigger as RadixHoverCardTrigger,
  HoverCardPortal as RadixHoverCardPortal,
  HoverCardContent as RadixHoverCardContent,
} from "radix-vue"
import { cn } from "./utils"
</script>

<template>
  <!-- Root -->
  <HoverCardRoot data-slot="hover-card">
    <slot />
  </HoverCardRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const HoverCardTrigger = defineComponent({
  name: "HoverCardTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixHoverCardTrigger,
        { ...attrs, "data-slot": "hover-card-trigger" },
        slots,
      )
  },
})

export const HoverCardContent = defineComponent({
  name: "HoverCardContent",
  props: {
    align: {
      type: String as () => "start" | "center" | "end",
      default: "center",
    },
    sideOffset: {
      type: Number,
      default: 4,
    },
    class: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixHoverCardPortal,
        { "data-slot": "hover-card-portal" },
        {
          default: () =>
            h(
              RadixHoverCardContent,
              {
                ...attrs,
                align: props.align,
                sideOffset: props.sideOffset,
                "data-slot": "hover-card-content",
                class: cn(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-[--radix-hover-card-content-transform-origin] rounded-md border p-4 shadow-md outline-hidden",
                  props.class,
                ),
              },
              slots,
            ),
        },
      )
  },
})
</script>
