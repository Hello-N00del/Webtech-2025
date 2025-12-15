<template>
  <div data-slot="alert-dialog">
    <!-- Trigger -->
    <button
      v-bind="triggerProps"
      type="button"
      @click="open = true"
      data-slot="alert-dialog-trigger"
    >
      <slot name="trigger">Öffnen</slot>
    </button>

    <!-- Portal + Overlay + Content -->
    <teleport to="body">
      <transition
        enter-active-class="duration-200 ease-out"
        leave-active-class="duration-150 ease-in"
      >
        <div
          v-if="open"
          class="fixed inset-0 z-50 flex items-center justify-center"
          data-slot="alert-dialog-portal"
        >
          <!-- Overlay -->
          <div
            data-slot="alert-dialog-overlay"
            class="fixed inset-0 bg-black/50"
            @click="onCancel"
          ></div>

          <!-- Content -->
          <div
            data-slot="alert-dialog-content"
            class="bg-white fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg"
          >
            <!-- Header -->
            <div
              data-slot="alert-dialog-header"
              class="flex flex-col gap-2 text-center sm:text-left"
            >
              <h2
                data-slot="alert-dialog-title"
                class="text-lg font-semibold"
              >
                <slot name="title">Titel</slot>
              </h2>
              <p
                data-slot="alert-dialog-description"
                class="text-sm text-slate-500"
              >
                <slot name="description">Beschreibung</slot>
              </p>
            </div>

            <!-- Body -->
            <div>
              <slot />
            </div>

            <!-- Footer -->
            <div
              data-slot="alert-dialog-footer"
              class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
            >
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                @click="onCancel"
                data-slot="alert-dialog-cancel"
              >
                <slot name="cancel">Abbrechen</slot>
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                @click="onConfirm"
                data-slot="alert-dialog-action"
              >
                <slot name="action">Bestätigen</slot>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  triggerProps?: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const open = ref(false)

const onCancel = () => {
  open.value = false
  emit('cancel')
}

const onConfirm = () => {
  open.value = false
  emit('confirm')
}
</script>
