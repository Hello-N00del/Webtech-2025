<!-- src/components/ui/Dialog.vue -->
<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger as RadixDialogTrigger,
  DialogPortal as RadixDialogPortal,
  DialogOverlay as RadixDialogOverlay,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogDescription as RadixDialogDescription,
  DialogClose as RadixDialogClose,
} from "radix-vue"
import { X as XIcon } from "lucide-vue-next"
import { cn } from "./utils"
</script>

<template>
  <!-- Root -->
  <DialogRoot data-slot="dialog">
    <slot />
  </DialogRoot>
</template>

<!-- Trigger -->
<script lang="ts">
import { defineComponent, h } from "vue"

export const DialogTrigger = defineComponent({
  name: "DialogTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogTrigger,
        { ...attrs, "data-slot": "dialog-trigger" },
        slots,
      )
  },
})

export const DialogPortal = defineComponent({
  name: "DialogPortal",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogPortal,
        { ...attrs, "data-slot": "dialog-portal" },
        slots,
      )
  },
})

export const DialogOverlay = defineComponent({
  name: "DialogOverlay",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogOverlay,
        {
          ...attrs,
          "data-slot": "dialog-overlay",
          class: cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DialogContent = defineComponent({
  name: "DialogContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogPortal,
        { "data-slot": "dialog-portal" },
        {
          default: () => [
            h(DialogOverlay),
            h(
              RadixDialogContent,
              {
                ...attrs,
                "data-slot": "dialog-content",
                class: cn(
                  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                  attrs.class as string | undefined,
                ),
              },
              {
                default: () => [
                  slots.default?.(),
                  h(
                    RadixDialogClose,
                    {
                      "data-slot": "dialog-close",
                      class:
                        "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                    },
                    {
                      default: () => [
                        h(XIcon),
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

export const DialogHeader = defineComponent({
  name: "DialogHeader",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "dialog-header",
          class: cn(
            "flex flex-col gap-2 text-center sm:text-left",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DialogFooter = defineComponent({
  name: "DialogFooter",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "dialog-footer",
          class: cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DialogTitle = defineComponent({
  name: "DialogTitle",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogTitle,
        {
          ...attrs,
          "data-slot": "dialog-title",
          class: cn(
            "text-lg leading-none font-semibold",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DialogDescription = defineComponent({
  name: "DialogDescription",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDialogDescription,
        {
          ...attrs,
          "data-slot": "dialog-description",
          class: cn(
            "text-muted-foreground text-sm",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DialogClose = RadixDialogClose
</script>
