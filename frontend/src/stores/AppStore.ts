import { defineStore } from "pinia"
import { authService } from "../services/authService"
import type { AuthResponse, LoginRequest } from "../types/api"

type Thread = {
  title: string
  content: string
  category: string
}

export const useAppStore = defineStore("app", {
  state: () => ({
    currentUser: null as AuthResponse | null,
    isAuthenticated: false,
    loading: false,
    threads: [] as Thread[],
  }),

  actions: {
    async login(username: string, password: string) {
      // Request-Objekt passend zum Auth-Service bauen
      const credentials: LoginRequest = { username, password }

      this.loading = true
      try {
        const authData = await authService.login(credentials)
        // Wenn kein Fehler fliegt, bist du eingeloggt
        this.currentUser = authData
        this.isAuthenticated = true
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await authService.logout()
      } finally {
        this.currentUser = null
        this.isAuthenticated = false
        this.loading = false
      }
    },

    addThread(title: string, content: string, category: string) {
      this.threads.push({ title, content, category })
    },
  },
})
