<script setup lang="ts">
import { cn } from "./utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="table-container"
    class="relative w-full overflow-x-auto"
  >
    <table
      v-bind="$attrs"
      data-slot="table"
      :class="cn('w-full caption-bottom text-sm', props.class)"
    >
      <slot />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"
import { cn } from "./utils"

export const TableHeader = defineComponent({
  name: "TableHeader",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "thead",
        {
          ...(attrs as any),
          "data-slot": "table-header",
          class: cn("[&_tr]:border-b", props.class),
        },
        slots,
      )
  },
})

export const TableBody = defineComponent({
  name: "TableBody",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "tbody",
        {
          ...(attrs as any),
          "data-slot": "table-body",
          class: cn("[&_tr:last-child]:border-0", props.class),
        },
        slots,
      )
  },
})

export const TableFooter = defineComponent({
  name: "TableFooter",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "tfoot",
        {
          ...(attrs as any),
          "data-slot": "table-footer",
          class: cn(
            "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TableRow = defineComponent({
  name: "TableRow",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "tr",
        {
          ...(attrs as any),
          "data-slot": "table-row",
          class: cn(
            "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TableHead = defineComponent({
  name: "TableHead",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "th",
        {
          ...(attrs as any),
          "data-slot": "table-head",
          class: cn(
            "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TableCell = defineComponent({
  name: "TableCell",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "td",
        {
          ...(attrs as any),
          "data-slot": "table-cell",
          class: cn(
            "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TableCaption = defineComponent({
  name: "TableCaption",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "caption",
        {
          ...(attrs as any),
          "data-slot": "table-caption",
          class: cn("text-muted-foreground mt-4 text-sm", props.class),
        },
        slots,
      )
  },
})
</script>
