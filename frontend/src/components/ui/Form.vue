<script setup lang="ts">
import { computed, inject, provide, type InjectionKey } from "vue"
import {
  Form as VvForm,
  Field,
  useForm,
  useField,
  type FormContext,
} from "vee-validate"
import type { AnyObjectSchema } from "yup" // oder zod-typed schema, falls du toTypedSchema nutzt
import { cn } from "./utils"

// ----- Form Root -----
const props = defineProps<{
  /** Optional: Validation-Schema von zod/@vee-validate/zod oder yup */
  validationSchema?: AnyObjectSchema | any
}>()

const form = useForm({
  validationSchema: props.validationSchema,
})
</script>

<template>
  <VvForm v-bind="form">
    <slot />
  </VvForm>
</template>

<script lang="ts">
// ----- Shared Types/Keys -----
import { defineComponent, h } from "vue"

type FormFieldContext = {
  name: string
}

const FormFieldSymbol: InjectionKey<FormFieldContext> = Symbol("FormField")
const FormItemSymbol: InjectionKey<{ id: string }> = Symbol("FormItem")

// ----- FormField -----
export const FormField = defineComponent({
  name: "FormField",
  props: {
    name: { type: String, required: true },
  },
  setup(props, { slots }) {
    provide(FormFieldSymbol, { name: props.name })
    return () =>
      h(
        Field,
        {
          name: props.name,
          // VeeValidate <Field> mit scoped slot
        },
        {
          default: (slotProps: any) =>
            slots.default?.({
              field: slotProps.field,
              error: slotProps.meta?.touched ? slotProps.meta.error : "",
              meta: slotProps.meta,
            }),
        },
      )
  },
})

// ----- useFormField (Hook-Äquivalent) -----
export const useFormField = () => {
  const field = inject(FormFieldSymbol)
  const item = inject(FormItemSymbol)
  if (!field || !item) {
    throw new Error("useFormField must be used inside <FormField> and <FormItem>")
  }

  const id = computed(() => item.id)
  const formItemId = computed(() => `${id.value}-form-item`)
  const formDescriptionId = computed(() => `${id.value}-form-item-description`)
  const formMessageId = computed(() => `${id.value}-form-item-message`)

  return {
    name: field.name,
    id,
    formItemId,
    formDescriptionId,
    formMessageId,
  }
}

// ----- FormItem -----
export const FormItem = defineComponent({
  name: "FormItem",
  props: {
    class: String,
  },
  setup(props, { slots, attrs }) {
    const id = `form-item-${Math.random().toString(36).slice(2, 9)}`
    provide(FormItemSymbol, { id })

    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-slot": "form-item",
          class: cn("grid gap-2", props.class),
        },
        slots,
      )
  },
})

// ----- FormLabel -----
import { Label } from "./label"

export const FormLabel = defineComponent({
  name: "FormLabel",
  props: {
    class: String,
  },
  setup(props, { slots, attrs }) {
    const { formItemId } = useFormField()
    const form = useForm()
    const field = inject(FormFieldSymbol)!

    const error = computed(
      () => (form.meta.value as any)?.errors?.[field.name] ?? "",
    )

    return () =>
      h(
        Label,
        {
          ...attrs,
          "data-slot": "form-label",
          "data-error": !!error.value,
          class: cn(
            "data-[error=true]:text-destructive",
            props.class,
          ),
          for: formItemId.value,
        },
        slots,
      )
  },
})

// ----- FormControl -----
export const FormControl = defineComponent({
  name: "FormControl",
  setup(_, { slots, attrs }) {
    const { formItemId, formDescriptionId, formMessageId } = useFormField()
    const form = useForm()
    const field = inject(FormFieldSymbol)!

    const error = computed(
      () => (form.meta.value as any)?.errors?.[field.name] ?? "",
    )

    return () =>
      h(
        "div",
        {
          "data-slot": "form-control",
        },
        [
          slots.default?.({
            id: formItemId.value,
            "aria-describedby": !error.value
              ? formDescriptionId.value
              : `${formDescriptionId.value} ${formMessageId.value}`,
            "aria-invalid": !!error.value,
          }),
        ],
      )
  },
})

// ----- FormDescription -----
export const FormDescription = defineComponent({
  name: "FormDescription",
  props: {
    class: String,
  },
  setup(props, { slots, attrs }) {
    const { formDescriptionId } = useFormField()

    return () =>
      h(
        "p",
        {
          ...attrs,
          id: formDescriptionId.value,
          "data-slot": "form-description",
          class: cn("text-muted-foreground text-sm", props.class),
        },
        slots,
      )
  },
})

// ----- FormMessage -----
export const FormMessage = defineComponent({
  name: "FormMessage",
  props: {
    class: String,
  },
  setup(props, { slots, attrs }) {
    const { formMessageId } = useFormField()
    const form = useForm()
    const field = inject(FormFieldSymbol)!

    const error = computed(
      () => (form.meta.value as any)?.errors?.[field.name] ?? "",
    )

    return () => {
      const body = error.value || slots.default?.()
      if (!body) return null

      return h(
        "p",
        {
          ...attrs,
          id: formMessageId.value,
          "data-slot": "form-message",
          class: cn("text-destructive text-sm", props.class),
        },
        body,
      )
    }
  },
})
</script>
