<template>
  <!-- Trigger-Button (optional außerhalb nutzen) -->
  <button
    type="button"
    class="hidden"
    @click="open = true"
  >
    <slot name="trigger">Open Command Palette</slot>
  </button>

  <!-- Dialog -->
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @keydown.esc="close"
    >
      <div
        class="bg-white text-slate-900 flex h-[360px] w-full max-w-lg flex-col overflow-hidden rounded-md shadow-xl"
        data-slot="command"
      >
        <!-- Header (Screenreader, optional) -->
        <div class="sr-only">
          <h2>Command Palette</h2>
          <p>Search for a command to run…</p>
        </div>

        <!-- Input -->
        <div
          data-slot="command-input-wrapper"
          class="flex h-12 items-center gap-2 border-b px-3"
        >
          <svg
            class="size-4 shrink-0 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="query"
            type="text"
            data-slot="command-input"
            class="placeholder:text-slate-400 flex h-10 w-full bg-transparent text-sm outline-none"
            placeholder="Befehl suchen…"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="runSelected"
          />
        </div>

        <!-- Liste -->
        <div
          data-slot="command-list"
          class="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto"
        >
          <div
            v-if="filteredCommands.length === 0"
            data-slot="command-empty"
            class="py-6 text-center text-sm text-slate-500"
          >
            Keine Treffer.
          </div>

          <div
            v-else
            data-slot="command-group"
            class="text-slate-900 p-1"
          >
            <div class="px-2 py-1.5 text-xs font-medium text-slate-400">
              Befehle
            </div>

            <div
              v-for="(cmd, index) in filteredCommands"
              :key="cmd.id"
              data-slot="command-item"
              :data-selected="index === activeIndex"
              class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none
                     data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900"
              @mouseenter="activeIndex = index"
              @click="run(cmd)"
            >
              <span>{{ cmd.label }}</span>
              <span
                v-if="cmd.shortcut"
                data-slot="command-shortcut"
                class="ml-auto text-xs tracking-widest text-slate-400"
              >
                {{ cmd.shortcut }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type CommandItem = {
  id: string
  label: string
  shortcut?: string
  /** Wird ausgeführt, wenn der Befehl gewählt wird */
  action: () => void
}

const props = defineProps<{
  commands: CommandItem[]
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const open = ref(props.modelValue ?? false)
const query = ref('')
const activeIndex = ref(0)

const filteredCommands = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.commands
  return props.commands.filter((c) =>
    c.label.toLowerCase().includes(q)
  )
})

const close = () => {
  open.value = false
  emit('update:modelValue', false)
}

const run = (cmd: CommandItem) => {
  cmd.action()
  close()
}

const runSelected = () => {
  const cmd = filteredCommands.value[activeIndex.value]
  if (cmd) run(cmd)
}

const move = (delta: number) => {
  const len = filteredCommands.value.length
  if (!len) return
  activeIndex.value =
    (activeIndex.value + delta + len) % len
}
</script>
