// src/services/authService.ts

export type UserInfo = {
  id: number
  name: string
  email: string
  role: "ADMIN" | "USER"
}

/**
 * Einfacher Mock-Auth-Service über localStorage.
 */
const authService = {
  isAuthenticated(): boolean {
    const stored = localStorage.getItem("auth_user")
    return !!stored
  },

  async getCurrentUser(): Promise<UserInfo> {
    const stored = localStorage.getItem("auth_user")
    if (!stored) {
      throw new Error("Not authenticated")
    }
    return JSON.parse(stored) as UserInfo
  },

  async login(payload: {
    email: string
    password: string
  }): Promise<{ user: UserInfo }> {
    const user: UserInfo = {
      id: 1,
      name: "Demo User",
      email: payload.email,
      role: "USER"
    }
    localStorage.setItem("auth_user", JSON.stringify(user))
    return { user }
  },

  async register(payload: {
    email: string
    password: string
    name: string
  }): Promise<{ user: UserInfo }> {
    const user: UserInfo = {
      id: 1,
      name: payload.name,
      email: payload.email,
      role: "USER"
    }
    localStorage.setItem("auth_user", JSON.stringify(user))
    return { user }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("auth_user")
  },

  async updateProfile(data: Partial<UserInfo>): Promise<UserInfo> {
    const stored = localStorage.getItem("auth_user")
    if (!stored) {
      throw new Error("Not authenticated")
    }
    const current = JSON.parse(stored) as UserInfo
    const updated: UserInfo = { ...current, ...data }
    localStorage.setItem("auth_user", JSON.stringify(updated))
    return updated
  }
}

export default authService
