<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from "radix-vue"
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ScrollAreaRoot
    v-bind="$attrs"
    data-slot="scroll-area"
    :class="cn('relative', props.class)"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
    >
      <slot />
    </ScrollAreaViewport>

    <ScrollBar />

    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const ScrollBar = defineComponent({
  name: "ScrollBar",
  props: {
    class: String,
    orientation: {
      type: String as () => "vertical" | "horizontal",
      default: "vertical",
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        ScrollAreaScrollbar,
        {
          ...attrs,
          "data-slot": "scroll-area-scrollbar",
          orientation: props.orientation,
          class: cn(
            "flex touch-none p-px transition-colors select-none",
            props.orientation === "vertical" &&
              "h-full w-2.5 border-l border-l-transparent",
            props.orientation === "horizontal" &&
              "h-2.5 flex-col border-t border-t-transparent",
            props.class,
          ),
        },
        [
          h(ScrollAreaThumb, {
            "data-slot": "scroll-area-thumb",
            class: "bg-border relative flex-1 rounded-full",
          }),
        ],
      )
  },
})
</script>
