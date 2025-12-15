<script setup lang="ts">
import {
  DrawerRoot,
  DrawerTrigger as VaulDrawerTrigger,
  DrawerPortal as VaulDrawerPortal,
  DrawerOverlay as VaulDrawerOverlay,
  DrawerContent as VaulDrawerContent,
  DrawerTitle as VaulDrawerTitle,
  DrawerDescription as VaulDrawerDescription,
  DrawerClose as VaulDrawerClose,
} from "vaul-vue"
import { cn } from "./utils"
</script>

<template>
  <!-- Root -->
  <DrawerRoot data-slot="drawer">
    <slot />
  </DrawerRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const DrawerTrigger = defineComponent({
  name: "DrawerTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerTrigger,
        { ...attrs, "data-slot": "drawer-trigger" },
        slots,
      )
  },
})

export const DrawerPortal = defineComponent({
  name: "DrawerPortal",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerPortal,
        { ...attrs, "data-slot": "drawer-portal" },
        slots,
      )
  },
})

export const DrawerClose = defineComponent({
  name: "DrawerClose",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerClose,
        { ...attrs, "data-slot": "drawer-close" },
        slots,
      )
  },
})

export const DrawerOverlay = defineComponent({
  name: "DrawerOverlay",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerOverlay,
        {
          ...attrs,
          "data-slot": "drawer-overlay",
          class: cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DrawerContent = defineComponent({
  name: "DrawerContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerPortal,
        { "data-slot": "drawer-portal" },
        {
          default: () => [
            h(DrawerOverlay),
            h(
              VaulDrawerContent,
              {
                ...attrs,
                "data-slot": "drawer-content",
                class: cn(
                  "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
                  "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
                  "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
                  "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
                  "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
                  attrs.class as string | undefined,
                ),
              },
              {
                default: () => [
                  h("div", {
                    class:
                      "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block",
                  }),
                  slots.default?.(),
                ],
              },
            ),
          ],
        },
      )
  },
})

export const DrawerHeader = defineComponent({
  name: "DrawerHeader",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "drawer-header",
          class: cn(
            "flex flex-col gap-1.5 p-4",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DrawerFooter = defineComponent({
  name: "DrawerFooter",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "drawer-footer",
          class: cn(
            "mt-auto flex flex-col gap-2 p-4",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DrawerTitle = defineComponent({
  name: "DrawerTitle",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerTitle,
        {
          ...attrs,
          "data-slot": "drawer-title",
          class: cn(
            "text-foreground font-semibold",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DrawerDescription = defineComponent({
  name: "DrawerDescription",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        VaulDrawerDescription,
        {
          ...attrs,
          "data-slot": "drawer-description",
          class: cn(
            "text-muted-foreground text-sm",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})
</script>
