// src/stores/AppStore.ts
import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"

export const useAppStore = defineStore("app", () => {
  const auth = useAuthStore()

  return {
    auth,
  }
})
