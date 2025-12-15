<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogDescription as RadixDialogDescription,
  DialogClose as RadixDialogClose,
} from "radix-vue"
import { XIcon } from "lucide-vue-next"
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <DialogRoot
    v-bind="$attrs"
    data-slot="sheet"
  >
    <slot />
  </DialogRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const SheetTrigger = defineComponent({
  name: "SheetTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        DialogTrigger,
        { ...attrs, "data-slot": "sheet-trigger" },
        slots,
      )
  },
})

export const SheetClose = defineComponent({
  name: "SheetClose",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        DialogClose,
        { ...attrs, "data-slot": "sheet-close" },
        slots,
      )
  },
})

export const SheetPortal = defineComponent({
  name: "SheetPortal",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        DialogPortal,
        { ...attrs, "data-slot": "sheet-portal" },
        slots,
      )
  },
})

export const SheetOverlay = defineComponent({
  name: "SheetOverlay",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(DialogOverlay, {
        ...attrs,
        "data-slot": "sheet-overlay",
        class: cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          props.class,
        ),
      })
  },
})

export const SheetContent = defineComponent({
  name: "SheetContent",
  props: {
    class: String,
    side: {
      type: String as () => "top" | "right" | "bottom" | "left",
      default: "right",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        SheetPortal,
        null,
        {
          default: () => [
            h(SheetOverlay),
            h(
              RadixDialogContent,
              {
                ...attrs,
                "data-slot": "sheet-content",
                class: cn(
                  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                  props.side === "right" &&
                    "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
                  props.side === "left" &&
                    "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
                  props.side === "top" &&
                    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
                  props.side === "bottom" &&
                    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
                  props.class,
                ),
              },
              {
                default: () => [
                  slots.default?.(),
                  h(
                    RadixDialogClose,
                    {
                      "data-slot": "sheet-close",
                      class:
                        "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                    },
                    {
                      default: () => [
                        h(XIcon, { class: "size-4" }),
                        h("span", { class: "sr-only" }, "Close"),
                      ],
                    },
                  ),
                ],
              },
            ),
          ],
        },
      )
  },
})

export const SheetHeader = defineComponent({
  name: "SheetHeader",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "sheet-header",
          class: cn("flex flex-col gap-1.5 p-4", props.class),
        },
        slots,
      )
  },
})

export const SheetFooter = defineComponent({
  name: "SheetFooter",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "sheet-footer",
          class: cn("mt-auto flex flex-col gap-2 p-4", props.class),
        },
        slots,
      )
  },
})

export const SheetTitle = defineComponent({
  name: "SheetTitle",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDialogTitle,
        {
          ...attrs,
          "data-slot": "sheet-title",
          class: cn("text-foreground font-semibold", props.class),
        },
        slots,
      )
  },
})

export const SheetDescription = defineComponent({
  name: "SheetDescription",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDialogDescription,
        {
          ...attrs,
          "data-slot": "sheet-description",
          class: cn("text-muted-foreground text-sm", props.class),
        },
        slots,
      )
  },
})
</script>
