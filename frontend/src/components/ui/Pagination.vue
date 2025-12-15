<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-vue-next"
import { cn } from "./utils"
import { buttonVariants } from "./button"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <slot />
  </nav>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const PaginationContent = defineComponent({
  name: "PaginationContent",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "ul",
        {
          ...attrs,
          "data-slot": "pagination-content",
          class: cn("flex flex-row items-center gap-1", props.class),
        },
        slots,
      )
  },
})

export const PaginationItem = defineComponent({
  name: "PaginationItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "li",
        {
          ...attrs,
          "data-slot": "pagination-item",
        },
        slots,
      )
  },
})

type LinkVariantSize = "default" | "icon"

export const PaginationLink = defineComponent({
  name: "PaginationLink",
  props: {
    href: { type: String, default: "#" },
    isActive: { type: Boolean, default: false },
    size: {
      type: String as () => LinkVariantSize,
      default: "icon",
    },
    class: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "a",
        {
          ...attrs,
          href: props.href,
          "aria-current": props.isActive ? "page" : undefined,
          "data-slot": "pagination-link",
          "data-active": props.isActive,
          class: cn(
            buttonVariants({
              variant: props.isActive ? "outline" : "ghost",
              size: props.size as any,
            }),
            props.class,
          ),
        },
        slots,
      )
  },
})

export const PaginationPrevious = defineComponent({
  name: "PaginationPrevious",
  props: { class: String, href: { type: String, default: "#" } },
  setup(props, { attrs }) {
    return () =>
      h(
        PaginationLink,
        {
          ...attrs,
          href: props.href,
          "aria-label": "Go to previous page",
          size: "default",
          class: cn("gap-1 px-2.5 sm:pl-2.5", props.class),
        },
        {
          default: () => [
            h(ChevronLeftIcon),
            h("span", { class: "hidden sm:block" }, "Previous"),
          ],
        },
      )
  },
})

export const PaginationNext = defineComponent({
  name: "PaginationNext",
  props: { class: String, href: { type: String, default: "#" } },
  setup(props, { attrs }) {
    return () =>
      h(
        PaginationLink,
        {
          ...attrs,
          href: props.href,
          "aria-label": "Go to next page",
          size: "default",
          class: cn("gap-1 px-2.5 sm:pr-2.5", props.class),
        },
        {
          default: () => [
            h("span", { class: "hidden sm:block" }, "Next"),
            h(ChevronRightIcon),
          ],
        },
      )
  },
})

export const PaginationEllipsis = defineComponent({
  name: "PaginationEllipsis",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "aria-hidden": true,
          "data-slot": "pagination-ellipsis",
          class: cn("flex size-9 items-center justify-center", props.class),
        },
        [
          h(MoreHorizontalIcon, { class: "size-4" }),
          h("span", { class: "sr-only" }, "More pages"),
        ],
      )
  },
})
</script>
