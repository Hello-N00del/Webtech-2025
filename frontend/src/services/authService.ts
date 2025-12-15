import type { LoginCredentials, User } from "../models/types"

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            id: Date.now().toString(),
            username: credentials.username,
            email: `${credentials.username}@example.com`,
          })
        } else {
          resolve(null)
        }
      }, 500)
    })
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200)
    })
  },

  validateCredentials: (username: string, password: string): boolean => {
    return username.length >= 3 && password.length >= 3
  },
}
