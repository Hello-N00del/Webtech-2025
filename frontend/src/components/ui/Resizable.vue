<script setup lang="ts">
import { GripVerticalIcon } from "lucide-vue-next"
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "vue-resizable-panels"
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <PanelGroup
    v-bind="$attrs"
    data-slot="resizable-panel-group"
    :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', props.class)"
  >
    <slot />
  </PanelGroup>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const ResizablePanel = defineComponent({
  name: "ResizablePanel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        Panel,
        {
          ...attrs,
          "data-slot": "resizable-panel",
        },
        slots,
      )
  },
})

export const ResizableHandle = defineComponent({
  name: "ResizableHandle",
  props: {
    withHandle: { type: Boolean, default: false },
    class: String,
  },
  setup(props, { attrs }) {
    return () =>
      h(
        PanelResizeHandle,
        {
          ...attrs,
          "data-slot": "resizable-handle",
          class: cn(
            "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
            props.class,
          ),
        },
        props.withHandle
          ? [
              h(
                "div",
                {
                  class:
                    "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border",
                },
                [h(GripVerticalIcon, { class: "size-2.5" })],
              ),
            ]
          : [],
      )
  },
})
</script>
