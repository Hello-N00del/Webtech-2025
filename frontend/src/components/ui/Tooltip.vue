<script setup lang="ts">
import {
  TooltipProvider as RadixTooltipProvider,
  TooltipRoot,
  TooltipTrigger as RadixTooltipTrigger,
  TooltipContent as RadixTooltipContent,
  TooltipPortal,
  TooltipArrow,
  type TooltipProviderProps,
  type TooltipRootProps,
  type TooltipContentProps,
} from "radix-vue"
import { cn } from "./utils"

// Provider
const providerProps = withDefaults(
  defineProps<TooltipProviderProps>(),
  {
    delayDuration: 0,
  },
)
</script>

<template>
  <RadixTooltipProvider
    v-bind="providerProps"
    data-slot="tooltip-provider"
  >
    <slot />
  </RadixTooltipProvider>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"
import { cn } from "./utils"
import {
  TooltipRoot,
  TooltipTrigger as RadixTooltipTrigger,
  TooltipContent as RadixTooltipContent,
  TooltipPortal,
  TooltipArrow,
  type TooltipRootProps,
  type TooltipContentProps,
} from "radix-vue"

export const Tooltip = defineComponent({
  name: "Tooltip",
  props: {} as TooltipRootProps,
  setup(props, { attrs, slots }) {
    return () =>
      h(
        TooltipRoot,
        {
          ...(attrs as any),
          ...props,
          "data-slot": "tooltip",
        },
        slots,
      )
  },
})

export const TooltipTrigger = defineComponent({
  name: "TooltipTrigger",
  setup(_, { attrs, slots }) {
    return () =>
      h(
        RadixTooltipTrigger,
        {
          ...(attrs as any),
          "data-slot": "tooltip-trigger",
        },
        slots,
      )
  },
})

export const TooltipContent = defineComponent({
  name: "TooltipContent",
  props: {
    class: String,
    sideOffset: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        TooltipPortal,
        null,
        {
          default: () =>
            h(
              RadixTooltipContent,
              {
                ...(attrs as TooltipContentProps),
                "data-slot": "tooltip-content",
                sideOffset: props.sideOffset,
                class: cn(
                  "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-[--radix-tooltip-content-transform-origin] rounded-md px-3 py-1.5 text-xs text-balance",
                  props.class,
                ),
              },
              {
                default: () => [
                  slots.default?.(),
                  h(TooltipArrow, {
                    class:
                      "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
                  }),
                ],
              },
            ),
        },
      )
  },
})
</script>
