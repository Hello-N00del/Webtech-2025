<script setup lang="ts">
import {
  NavigationMenuRoot,
  NavigationMenuList as RadixNavigationMenuList,
  NavigationMenuItem as RadixNavigationMenuItem,
  NavigationMenuContent as RadixNavigationMenuContent,
  NavigationMenuTrigger as RadixNavigationMenuTrigger,
  NavigationMenuLink as RadixNavigationMenuLink,
  NavigationMenuViewport as RadixNavigationMenuViewport,
  NavigationMenuIndicator as RadixNavigationMenuIndicator,
} from "radix-vue"
import { ChevronDownIcon } from "lucide-vue-next"
import { cva } from "class-variance-authority"
import { cn } from "./utils"

const props = withDefaults(
  defineProps<{
    class?: string
    viewport?: boolean
  }>(),
  {
    viewport: true,
  },
)
</script>

<template>
  <NavigationMenuRoot
    v-bind="$attrs"
    data-slot="navigation-menu"
    :data-viewport="props.viewport"
    :class="cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', props.class)"
  >
    <slot />
    <NavigationMenuViewport v-if="props.viewport" />
  </NavigationMenuRoot>
</template>

<script lang="ts">
import { defineComponent, h, type HTMLAttributes } from "vue"

export const NavigationMenuList = defineComponent({
  name: "NavigationMenuList",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuList,
        {
          ...attrs,
          "data-slot": "navigation-menu-list",
          class: cn(
            "group flex flex-1 list-none items-center justify-center gap-1",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const NavigationMenuItem = defineComponent({
  name: "NavigationMenuItem",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuItem,
        {
          ...attrs,
          "data-slot": "navigation-menu-item",
          class: cn("relative", props.class),
        },
        slots,
      )
  },
})

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
)

export const NavigationMenuTrigger = defineComponent({
  name: "NavigationMenuTrigger",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuTrigger,
        {
          ...attrs,
          "data-slot": "navigation-menu-trigger",
          class: cn(navigationMenuTriggerStyle(), "group", props.class),
        },
        {
          default: () => [
            slots.default?.(),
            h(ChevronDownIcon, {
              class:
                "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
              "aria-hidden": "true",
            }),
          ],
        },
      )
  },
})

export const NavigationMenuContent = defineComponent({
  name: "NavigationMenuContent",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuContent,
        {
          ...attrs,
          "data-slot": "navigation-menu-content",
          class: cn(
            "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
            "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const NavigationMenuViewport = defineComponent({
  name: "NavigationMenuViewport",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        "div",
        {
          class:
            "absolute top-full left-0 isolate z-50 flex justify-center",
        },
        [
          h(RadixNavigationMenuViewport, {
            ...attrs,
            "data-slot": "navigation-menu-viewport",
            class: cn(
              "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
              props.class,
            ),
          }),
        ],
      )
  },
})

export const NavigationMenuLink = defineComponent({
  name: "NavigationMenuLink",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuLink,
        {
          ...attrs,
          "data-slot": "navigation-menu-link",
          class: cn(
            "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const NavigationMenuIndicator = defineComponent({
  name: "NavigationMenuIndicator",
  props: { class: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RadixNavigationMenuIndicator,
        {
          ...attrs,
          "data-slot": "navigation-menu-indicator",
          class: cn(
            "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
            props.class,
          ),
        },
        {
          default: () => [
            h("div", {
              class:
                "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md",
            }),
            slots.default?.(),
          ],
        },
      )
  },
})
</script>
