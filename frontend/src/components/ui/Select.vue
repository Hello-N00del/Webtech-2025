<script setup lang="ts">
import {
  SelectRoot,
  SelectGroup as RadixSelectGroup,
  SelectValue as RadixSelectValue,
  SelectTrigger as RadixSelectTrigger,
  SelectContent as RadixSelectContent,
  SelectLabel as RadixSelectLabel,
  SelectItem as RadixSelectItem,
  SelectSeparator as RadixSelectSeparator,
  SelectScrollUpButton as RadixSelectScrollUpButton,
  SelectScrollDownButton as RadixSelectScrollDownButton,
  SelectPortal,
  SelectViewport,
  SelectIcon,
  SelectItemIndicator,
  SelectItemText,
} from "radix-vue"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-vue-next"
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectRoot
    v-bind="$attrs"
    data-slot="select"
  >
    <slot />
  </SelectRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const SelectGroup = defineComponent({
  name: "SelectGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        RadixSelectGroup,
        { ...attrs, "data-slot": "select-group" },
        slots,
      )
  },
})

export const SelectValue = defineComponent({
  name: "SelectValue",
  setup(_, { attrs }) {
    return () =>
      h(RadixSelectValue, {
        ...attrs,
        "data-slot": "select-value",
      })
  },
})

export const SelectTrigger = defineComponent({
  name: "SelectTrigger",
  props: {
    class: String,
    size: {
      type: String as () => "sm" | "default",
      default: "default",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixSelectTrigger,
        {
          ...attrs,
          "data-slot": "select-trigger",
          "data-size": props.size,
          class: cn(
            "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            props.class,
          ),
        },
        {
          default: () => [
            slots.default?.(),
            h(
              SelectIcon,
              { asChild: true },
              {
                default: () =>
                  h(ChevronDownIcon, {
                    class: "size-4 opacity-50",
                  }),
              },
            ),
          ],
        },
      )
  },
})

export const SelectContent = defineComponent({
  name: "SelectContent",
  props: {
    class: String,
    position: {
      type: String as () => "item-aligned" | "popper",
      default: "popper",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        SelectPortal,
        null,
        {
          default: () =>
            h(
              RadixSelectContent,
              {
                ...attrs,
                position: props.position,
                "data-slot": "select-content",
                class: cn(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
                  props.position === "popper" &&
                    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                  props.class,
                ),
              },
              {
                default: () => [
                  h(SelectScrollUpButton),
                  h(
                    SelectViewport,
                    {
                      class: cn(
                        "p-1",
                        props.position === "popper" &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
                      ),
                    },
                    slots,
                  ),
                  h(SelectScrollDownButton),
                ],
              },
            ),
        },
      )
  },
})

export const SelectLabel = defineComponent({
  name: "SelectLabel",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixSelectLabel,
        {
          ...attrs,
          "data-slot": "select-label",
          class: cn(
            "text-muted-foreground px-2 py-1.5 text-xs",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const SelectItem = defineComponent({
  name: "SelectItem",
  props: { class: String, value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixSelectItem,
        {
          ...attrs,
          value: props.value,
          "data-slot": "select-item",
          class: cn(
            "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            props.class,
          ),
        },
        {
          default: () => [
            h(
              "span",
              {
                class:
                  "absolute right-2 flex size-3.5 items-center justify-center",
              },
              [
                h(
                  SelectItemIndicator,
                  null,
                  { default: () => h(CheckIcon, { class: "size-4" }) },
                ),
              ],
            ),
            h(
              SelectItemText,
              null,
              { default: () => slots.default?.() },
            ),
          ],
        },
      )
  },
})

export const SelectSeparator = defineComponent({
  name: "SelectSeparator",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        RadixSelectSeparator,
        {
          ...attrs,
          "data-slot": "select-separator",
          class: cn(
            "bg-border pointer-events-none -mx-1 my-1 h-px",
            props.class,
          ),
        },
      )
  },
})

export const SelectScrollUpButton = defineComponent({
  name: "SelectScrollUpButton",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        RadixSelectScrollUpButton,
        {
          ...attrs,
          "data-slot": "select-scroll-up-button",
          class: cn(
            "flex cursor-default items-center justify-center py-1",
            props.class,
          ),
        },
        [h(ChevronUpIcon, { class: "size-4" })],
      )
  },
})

export const SelectScrollDownButton = defineComponent({
  name: "SelectScrollDownButton",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        RadixSelectScrollDownButton,
        {
          ...attrs,
          "data-slot": "select-scroll-down-button",
          class: cn(
            "flex cursor-default items-center justify-center py-1",
            props.class,
          ),
        },
        [h(ChevronDownIcon, { class: "size-4" })],
      )
  },
})
</script>
