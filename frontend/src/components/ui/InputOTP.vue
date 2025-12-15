<script setup lang="ts">
import {
  PinInputRoot,
  PinInputInput,
} from "radix-vue"
import { MinusIcon } from "lucide-vue-next"
import { cn } from "./utils"
</script>

<template>
  <!-- Root: entspricht InputOTP -->
  <PinInputRoot
    v-bind="$attrs"
    data-slot="input-otp"
    class="flex items-center gap-2 has-disabled:opacity-50"
  >
    <slot />
  </PinInputRoot>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

export const InputOTPGroup = defineComponent({
  name: "InputOTPGroup",
  props: {
    class: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "input-otp-group",
          class: cn("flex items-center gap-1", props.class),
        },
        slots,
      )
  },
})

export const InputOTPSlot = defineComponent({
  name: "InputOTPSlot",
  props: {
    index: { type: Number, required: true },
    class: String,
  },
  setup(props, { attrs }) {
    return () =>
      h(PinInputInput, {
        ...attrs,
        index: props.index,
        "data-slot": "input-otp-slot",
        class: cn(
          "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
          props.class,
        ),
      })
  },
})

export const InputOTPSeparator = defineComponent({
  name: "InputOTPSeparator",
  setup(_, { attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "input-otp-separator",
          role: "separator",
        },
        [h(MinusIcon)],
      )
  },
})
</script>
