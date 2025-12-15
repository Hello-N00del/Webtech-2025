<script setup lang="ts">
import {
  MenubarRoot,
  MenubarMenu as RadixMenubarMenu,
  MenubarGroup as RadixMenubarGroup,
  MenubarPortal as RadixMenubarPortal,
  MenubarRadioGroup as RadixMenubarRadioGroup,
  MenubarTrigger as RadixMenubarTrigger,
  MenubarContent as RadixMenubarContent,
  MenubarItem as RadixMenubarItem,
  MenubarCheckboxItem as RadixMenubarCheckboxItem,
  MenubarRadioItem as RadixMenubarRadioItem,
  MenubarLabel as RadixMenubarLabel,
  MenubarSeparator as RadixMenubarSeparator,
  MenubarSub as RadixMenubarSub,
  MenubarSubTrigger as RadixMenubarSubTrigger,
  MenubarSubContent as RadixMenubarSubContent,
  MenubarItemIndicator,
} from "radix-vue"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-vue-next"
import { cn } from "./utils"
</script>

<template>
  <!-- Root -->
  <MenubarRoot
    v-bind="$attrs"
    data-slot="menubar"
    :class="cn('bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs', $attrs.class as string)"
  >
    <slot />
  </MenubarRoot>
</template>

<script lang="ts">
import { defineComponent, h, type HTMLAttributes } from "vue"

export const MenubarMenu = defineComponent({
  name: "MenubarMenu",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarMenu,
        { ...attrs, "data-slot": "menubar-menu" },
        slots,
      )
  },
})

export const MenubarGroup = defineComponent({
  name: "MenubarGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarGroup,
        { ...attrs, "data-slot": "menubar-group" },
        slots,
      )
  },
})

export const MenubarPortal = defineComponent({
  name: "MenubarPortal",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarPortal,
        { ...attrs, "data-slot": "menubar-portal" },
        slots,
      )
  },
})

export const MenubarRadioGroup = defineComponent({
  name: "MenubarRadioGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarRadioGroup,
        { ...attrs, "data-slot": "menubar-radio-group" },
        slots,
      )
  },
})

export const MenubarTrigger = defineComponent({
  name: "MenubarTrigger",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarTrigger,
        {
          ...attrs,
          "data-slot": "menubar-trigger",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const MenubarContent = defineComponent({
  name: "MenubarContent",
  props: {
    class: String,
    align: {
      type: String as () => "start" | "center" | "end",
      default: "start",
    },
    alignOffset: { type: Number, default: -4 },
    sideOffset: { type: Number, default: 8 },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        MenubarPortal,
        null,
        {
          default: () =>
            h(
              RadixMenubarContent,
              {
                ...attrs,
                "data-slot": "menubar-content",
                align: props.align,
                alignOffset: props.alignOffset,
                sideOffset: props.sideOffset,
                class: cn(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-[--radix-menubar-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-md",
                  props.class,
                ),
              },
              slots,
            ),
        },
      )
  },
})

export const MenubarItem = defineComponent({
  name: "MenubarItem",
  props: {
    class: String,
    inset: { type: Boolean, default: false },
    variant: {
      type: String as () => "default" | "destructive",
      default: "default",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarItem,
        {
          ...attrs,
          "data-slot": "menubar-item",
          "data-inset": props.inset,
          "data-variant": props.variant,
          class: cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const MenubarCheckboxItem = defineComponent({
  name: "MenubarCheckboxItem",
  props: {
    class: String,
    checked: { type: [Boolean, String] as any, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarCheckboxItem,
        {
          ...attrs,
          checked: props.checked,
          "data-slot": "menubar-checkbox-item",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            props.class,
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
                  MenubarItemIndicator,
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

export const MenubarRadioItem = defineComponent({
  name: "MenubarRadioItem",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarRadioItem,
        {
          ...attrs,
          "data-slot": "menubar-radio-item",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            props.class,
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

export const MenubarLabel = defineComponent({
  name: "MenubarLabel",
  props: { class: String, inset: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarLabel,
        {
          ...attrs,
          "data-slot": "menubar-label",
          "data-inset": props.inset,
          class: cn(
            "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const MenubarSeparator = defineComponent({
  name: "MenubarSeparator",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarSeparator,
        {
          ...attrs,
          "data-slot": "menubar-separator",
          class: cn("bg-border -mx-1 my-1 h-px", props.class),
        },
        slots,
      )
  },
})

export const MenubarShortcut = defineComponent({
  name: "MenubarShortcut",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...(attrs as HTMLAttributes),
          "data-slot": "menubar-shortcut",
          class: cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            (attrs.class as string) || "",
          ),
        },
        slots,
      )
  },
})

export const MenubarSub = defineComponent({
  name: "MenubarSub",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarSub,
        { ...attrs, "data-slot": "menubar-sub" },
        slots,
      )
  },
})

export const MenubarSubTrigger = defineComponent({
  name: "MenubarSubTrigger",
  props: { class: String, inset: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarSubTrigger,
        {
          ...attrs,
          "data-slot": "menubar-sub-trigger",
          "data-inset": props.inset,
          class: cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
            props.class,
          ),
        },
        {
          default: () => [
            slots.default?.(),
            h(ChevronRightIcon, { class: "ml-auto h-4 w-4" }),
          ],
        },
      )
  },
})

export const MenubarSubContent = defineComponent({
  name: "MenubarSubContent",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixMenubarSubContent,
        {
          ...attrs,
          "data-slot": "menubar-sub-content",
          class: cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-menubar-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-lg",
            props.class,
          ),
        },
        slots,
      )
  },
})
</script>
