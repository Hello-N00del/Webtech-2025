import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"

export const useAppStore = defineStore("app", () => {
  const auth = useAuthStore()

  return {
    // Auth-Store durchreichen
    auth,

    // Falls du später noch globale Sachen brauchst (z.B. UI-Settings),
    // kannst du sie hier ergänzen.
  }
})
