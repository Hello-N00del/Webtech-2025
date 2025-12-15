// src/stores/AppStore.ts
import { defineStore } from "pinia"
import { ref } from "vue"

export type Thread = {
  title: string
  content: string
  category: string
}

export const useAppStore = defineStore("app", () => {
  const threads = ref<Thread[]>([])

  const addThread = (title: string, content: string, category: string) => {
    threads.value.push({
      title,
      content,
      category
    })
  }

  return {
    threads,
    addThread
  }
})
