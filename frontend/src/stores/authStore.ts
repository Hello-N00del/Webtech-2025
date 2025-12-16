// src/stores/authStore.ts
// ✨ TECHNOLOGY: Pinia Store
// Why Pinia?
// - Official Vue 3 State Management (successor to Vuex)
// - Composition API support out of the box
// - Better TypeScript integration with auto-generated types
// - Simpler, more intuitive API than Vuex
// - Smaller bundle size (~2KB)
//
// Why useAuthStore with Composition API?
// - Direct ref/computed usage (not nested in modules)
// - Easier to understand and debug
// - Better code splitting
// - Type safety without complex configuration

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { authService, type UserInfo } from "../services/authService"
import { ApiError, getErrorMessage } from "../utils/apiErrorHandler"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserInfo | null>(null)
  const loading = ref(false)
  const error = ref<string>("")
  const isInitialized = ref(false)

  // ✨ REACTIVITY PATTERN: Computed Property with Multiple Checks
  // Why check both user.value AND authService.isAuthenticated()?
  // 1. user.value is a ref - Vue tracks changes immediately
  // 2. authService.isAuthenticated() validates token in localStorage
  // 3. Double-check pattern = more robust authentication
  // 4. Header updates instantly when user.value changes (reactive!)
  //
  // Example flow:
  // - User logs in → authStore.user = response.user (reactive!)
  // - tokenManager.setTokens() (localStorage updated)
  // - isAuthenticated computed property checks: !!user.value → true
  // - Vue detects change → triggers re-render → header updates INSTANTLY
  const isAuthenticated = computed(() => {
    return !!user.value && authService.isAuthenticated()
  })

  const isAdmin = computed(() => user.value?.role === "ADMIN")
  const isUser = computed(() => user.value?.role === "USER")
  const userName = computed(() => user.value?.name || "Guest")
  const userEmail = computed(() => user.value?.email || "")

  async function initializeAuth(): Promise<void> {
    if (isInitialized.value) return

    loading.value = true
    error.value = ""

    try {
      if (authService.isAuthenticated()) {
        await loadUser()
      }
    } catch (err) {
      console.error("Auth initialization failed:", err)
    } finally {
      loading.value = false
      isInitialized.value = true
    }
  }

  async function loadUser(): Promise<void> {
    try {
      user.value = await authService.getCurrentUser()
      error.value = ""
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = "Fehler beim Laden von User-Daten"
      }
      if (err instanceof ApiError && err.statusCode === 401) {
        user.value = null
      }
      throw err
    }
  }

  // ✨ LOGIN - Optimiert für Performance
  // Direct state update instead of complex watch/computed logic
  // Why? Simple, predictable, debuggable
  async function login(email: string, password: string): Promise<UserInfo> {
    loading.value = true
    error.value = ""

    try {
      const response = await authService.login({ email, password })
      // 🔑 CRITICAL: Set user immediately (reactive!)
      // This makes isAuthenticated computed property return true
      // which triggers header re-render instantly
      user.value = response.user
      return response.user
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = "Login fehlgeschlagen"
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // ✨ LOGOUT - Optimiert für Performance
  async function logout(): Promise<void> {
    loading.value = true
    error.value = ""

    try {
      await authService.logout()
    } catch (err) {
      console.warn("Logout API error (ignored):", err)
    } finally {
      // 🔑 CRITICAL: Always clear local state
      // Even if API fails, user is logged out locally
      user.value = null
      loading.value = false
    }
  }

  async function register(
    email: string,
    password: string,
    name: string
  ): Promise<UserInfo> {
    loading.value = true
    error.value = ""

    try {
      const response = await authService.register({
        email,
        password,
        name
      })
      user.value = response.user
      return response.user
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = "Registrierung fehlgeschlagen"
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(data: Partial<UserInfo>): Promise<void> {
    loading.value = true
    error.value = ""

    try {
      const updated = await authService.updateProfile(data)
      user.value = updated
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = "Profil-Update fehlgeschlagen"
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearError(): void {
    error.value = ""
  }

  function setUser(userData: UserInfo | null): void {
    user.value = userData
  }

  return {
    user,
    loading,
    error,
    isInitialized,
    isAuthenticated,
    isAdmin,
    isUser,
    userName,
    userEmail,
    initializeAuth,
    loadUser,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    setUser
  }
})
