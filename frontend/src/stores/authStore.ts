// src/stores/authStore.ts

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { authService, type UserInfo } from "../services/authService"
import { ApiError, getErrorMessage } from "../utils/apiErrorHandler"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserInfo | null>(null)
  const loading = ref(false)
  const error = ref<string>("")
  const isInitialized = ref(false)

  // ✅ FIX: isAuthenticated prüft nur Token, nicht User-Daten
  const isAuthenticated = computed(() => {
    return authService.isAuthenticated()
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

  // ✅ LOGIN - Optimiert für Performance
  async function login(email: string, password: string): Promise<UserInfo> {
    loading.value = true
    error.value = ""

    try {
      // Login API gibt User-Daten direkt zurück
      const response = await authService.login({ email, password })
      // Speichere User-Daten sofort (kein Extra-Request nötig!)
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

  // ✅ LOGOUT - Optimiert für Performance
  async function logout(): Promise<void> {
    loading.value = true
    error.value = ""

    try {
      // Logout API-Call ist optional (Token wird sowieso gelöscht)
      // Aber wir versuchen es trotzdem (non-blocking)
      await authService.logout()
    } catch (err) {
      // Logout-Fehler können ignoriert werden
      console.warn("Logout API error (ignored):", err)
    } finally {
      // IMMER lokale Daten löschen - egal ob API-Call erfolgreich war
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
