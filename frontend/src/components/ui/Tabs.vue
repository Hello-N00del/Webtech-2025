<script setup lang="ts">
import {
  TabsRoot,
  TabsList as RadixTabsList,
  TabsTrigger as RadixTabsTrigger,
  TabsContent as RadixTabsContent,
  type TabsRootProps,
} from "radix-vue"
import { cn } from "./utils"

const props = defineProps<TabsRootProps & { class?: string }>()
</script>

<template>
  <TabsRoot
    v-bind="props"
    data-slot="tabs"
    :class="cn('flex flex-col gap-2', props.class)"
  >
    <slot />
  </TabsRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"
import { cn } from "./utils"
import {
  TabsList as RadixTabsList,
  TabsTrigger as RadixTabsTrigger,
  TabsContent as RadixTabsContent,
} from "radix-vue"

export const TabsList = defineComponent({
  name: "TabsList",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        RadixTabsList,
        {
          ...(attrs as any),
          "data-slot": "tabs-list",
          class: cn(
            "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TabsTrigger = defineComponent({
  name: "TabsTrigger",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        RadixTabsTrigger,
        {
          ...(attrs as any),
          "data-slot": "tabs-trigger",
          class: cn(
            "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const TabsContent = defineComponent({
  name: "TabsContent",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        RadixTabsContent,
        {
          ...(attrs as any),
          "data-slot": "tabs-content",
          class: cn("flex-1 outline-none", props.class),
        },
        slots,
      )
  },
})
</script>
