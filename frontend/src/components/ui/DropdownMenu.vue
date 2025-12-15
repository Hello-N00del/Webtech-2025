<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger as RadixDropdownMenuTrigger,
  DropdownMenuPortal as RadixDropdownMenuPortal,
  DropdownMenuContent as RadixDropdownMenuContent,
  DropdownMenuGroup as RadixDropdownMenuGroup,
  DropdownMenuItem as RadixDropdownMenuItem,
  DropdownMenuCheckboxItem as RadixDropdownMenuCheckboxItem,
  DropdownMenuRadioGroup as RadixDropdownMenuRadioGroup,
  DropdownMenuRadioItem as RadixDropdownMenuRadioItem,
  DropdownMenuSeparator as RadixDropdownMenuSeparator,
  DropdownMenuLabel as RadixDropdownMenuLabel,
  DropdownMenuSub as RadixDropdownMenuSub,
  DropdownMenuSubTrigger as RadixDropdownMenuSubTrigger,
  DropdownMenuSubContent as RadixDropdownMenuSubContent,
  DropdownMenuItemIndicator,
} from "radix-vue"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-vue-next"
import { cn } from "./utils"
</script>

<template>
  <!-- Root -->
  <DropdownMenuRoot data-slot="dropdown-menu">
    <slot />
  </DropdownMenuRoot>
</template>

<script lang="ts">
import { defineComponent, h, type HTMLAttributes } from "vue"

export const DropdownMenuPortal = defineComponent({
  name: "DropdownMenuPortal",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuPortal,
        { ...attrs, "data-slot": "dropdown-menu-portal" },
        slots,
      )
  },
})

export const DropdownMenuTrigger = defineComponent({
  name: "DropdownMenuTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuTrigger,
        { ...attrs, "data-slot": "dropdown-menu-trigger" },
        slots,
      )
  },
})

export const DropdownMenuContent = defineComponent({
  name: "DropdownMenuContent",
  props: {
    sideOffset: { type: Number, default: 4 },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuPortal,
        null,
        {
          default: () =>
            h(
              RadixDropdownMenuContent,
              {
                ...attrs,
                sideOffset: props.sideOffset,
                "data-slot": "dropdown-menu-content",
                class: cn(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[--radix-dropdown-menu-content-available-height] min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
                  attrs.class as string | undefined,
                ),
              },
              slots,
            ),
        },
      )
  },
})

export const DropdownMenuGroup = defineComponent({
  name: "DropdownMenuGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuGroup,
        { ...attrs, "data-slot": "dropdown-menu-group" },
        slots,
      )
  },
})

export const DropdownMenuItem = defineComponent({
  name: "DropdownMenuItem",
  props: {
    inset: { type: Boolean, default: false },
    variant: {
      type: String as () => "default" | "destructive",
      default: "default",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuItem,
        {
          ...attrs,
          "data-slot": "dropdown-menu-item",
          "data-inset": props.inset,
          "data-variant": props.variant,
          class: cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DropdownMenuCheckboxItem = defineComponent({
  name: "DropdownMenuCheckboxItem",
  props: {
    checked: { type: [Boolean, String] as any, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuCheckboxItem,
        {
          ...attrs,
          checked: props.checked,
          "data-slot": "dropdown-menu-checkbox-item",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            attrs.class as string | undefined,
          ),
        },
        {
          default: () => [
            h(
              "span",
              {
                class:
                  "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
              },
              [
                h(
                  DropdownMenuItemIndicator,
                  null,
                  { default: () => h(CheckIcon, { class: "size-4" }) },
                ),
              ],
            ),
            slots.default?.(),
          ],
        },
      )
  },
})

export const DropdownMenuRadioGroup = defineComponent({
  name: "DropdownMenuRadioGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuRadioGroup,
        { ...attrs, "data-slot": "dropdown-menu-radio-group" },
        slots,
      )
  },
})

export const DropdownMenuRadioItem = defineComponent({
  name: "DropdownMenuRadioItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuRadioItem,
        {
          ...attrs,
          "data-slot": "dropdown-menu-radio-item",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            attrs.class as string | undefined,
          ),
        },
        {
          default: () => [
            h(
              "span",
              {
                class:
                  "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
              },
              [h(CircleIcon, { class: "size-2 fill-current" })],
            ),
            slots.default?.(),
          ],
        },
      )
  },
})

export const DropdownMenuLabel = defineComponent({
  name: "DropdownMenuLabel",
  props: {
    inset: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuLabel,
        {
          ...attrs,
          "data-slot": "dropdown-menu-label",
          "data-inset": props.inset,
          class: cn(
            "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DropdownMenuSeparator = defineComponent({
  name: "DropdownMenuSeparator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuSeparator,
        {
          ...attrs,
          "data-slot": "dropdown-menu-separator",
          class: cn(
            "bg-border -mx-1 my-1 h-px",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DropdownMenuShortcut = defineComponent({
  name: "DropdownMenuShortcut",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...(attrs as HTMLAttributes),
          "data-slot": "dropdown-menu-shortcut",
          class: cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})

export const DropdownMenuSub = defineComponent({
  name: "DropdownMenuSub",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuSub,
        { ...attrs, "data-slot": "dropdown-menu-sub" },
        slots,
      )
  },
})

export const DropdownMenuSubTrigger = defineComponent({
  name: "DropdownMenuSubTrigger",
  props: {
    inset: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuSubTrigger,
        {
          ...attrs,
          "data-slot": "dropdown-menu-sub-trigger",
          "data-inset": props.inset,
          class: cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
            attrs.class as string | undefined,
          ),
        },
        {
          default: () => [
            slots.default?.(),
            h(ChevronRightIcon, { class: "ml-auto size-4" }),
          ],
        },
      )
  },
})

export const DropdownMenuSubContent = defineComponent({
  name: "DropdownMenuSubContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixDropdownMenuSubContent,
        {
          ...attrs,
          "data-slot": "dropdown-menu-sub-content",
          class: cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-lg",
            attrs.class as string | undefined,
          ),
        },
        slots,
      )
  },
})
</script>
