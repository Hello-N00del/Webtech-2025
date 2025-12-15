import { defineStore } from "pinia"
import type { User } from "../models/types"
import { authService } from "../services/authService"

type Thread = {
  title: string
  content: string
  category: string
}

export const useAppStore = defineStore("app", {
  state: () => ({
    currentUser: null as User | null,
    isAuthenticated: false,
    loading: false,
    threads: [] as Thread[],
  }),

  actions: {
    async login(username: string, password: string) {
      if (!authService.validateCredentials(username, password)) {
        return
      }
      this.loading = true
      try {
        const user = await authService.login({ username, password })
        if (user) {
          this.currentUser = user
          this.isAuthenticated = true
        }
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
