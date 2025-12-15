/**
 * Pinia Auth Store
 * Zentraler State Management für Authentifizierung und User-Daten
 */

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import authService, { type UserInfo } from "../services/authService"
import { ApiError, getErrorMessage } from "../utils/apiErrorHandler"

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<UserInfo | null>(null)
  const loading = ref(false)
  const error = ref<string>('')
  const isInitialized = ref(false)

  // Computed
  const isAuthenticated = computed(() => {
    return authService.isAuthenticated() && !!user.value
  })

  const isAdmin = computed(() => {
    return user.value?.role === 'ADMIN'
  })

  const isUser = computed(() => {
    return user.value?.role === 'USER'
  })

  const userName = computed(() => {
    return user.value?.name || 'Guest'
  })

  const userEmail = computed(() => {
    return user.value?.email || ''
  })

  // Actions

  /**
   * Initialisiere Auth State
   * Rufe diese Funktion beim App-Start auf
   */
  async function initializeAuth(): Promise<void> {
    if (isInitialized.value) return

    loading.value = true
    error.value = ''

    try {
      // Prüfe ob User angemeldet ist und lade seine Daten
      if (authService.isAuthenticated()) {
        await loadUser()
      }
    } catch (err) {
      console.error('Auth initialization failed:', err)
      // Nicht kritisch - user wird zu Login geleitet
    } finally {
      loading.value = false
      isInitialized.value = true
    }
  }

  /**
   * Lade aktuelle User-Informationen
   */
  async function loadUser(): Promise<void> {
    try {
      user.value = await authService.getCurrentUser()
      error.value = ''
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = 'Fehler beim Laden von User-Daten'
      }
      // Bei 401: User ist nicht authentifiziert
      if (err instanceof ApiError && err.statusCode === 401) {
        user.value = null
      }
      throw err
    }
  }

  /**
   * User anmelden
   */
  async function login(email: string, password: string): Promise<UserInfo> {
    loading.value = true
    error.value = ''

    try {
      const response = await authService.login({ email, password })
      user.value = response.user
      return response.user
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = 'Login fehlgeschlagen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * User registrieren
   */
  async function register(
    email: string,
    password: string,
    name: string
  ): Promise<UserInfo> {
    loading.value = true
    error.value = ''

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
        error.value = 'Registrierung fehlgeschlagen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * User abmelden
   */
  async function logout(): Promise<void> {
    loading.value = true
    error.value = ''

    try {
      await authService.logout()
      user.value = null
    } catch (err) {
      console.error('Logout error:', err)
      // Trotzdem lokal clearen
      user.value = null
    } finally {
      loading.value = false
    }
  }

  /**
   * Update User-Profil
   */
  async function updateProfile(data: Partial<UserInfo>): Promise<void> {
    loading.value = true
    error.value = ''

    try {
      const updated = await authService.updateProfile(data)
      user.value = updated
    } catch (err) {
      if (err instanceof ApiError) {
        error.value = getErrorMessage(err)
      } else {
        error.value = 'Profil-Update fehlgeschlagen'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Lösche Error Message
   */
  function clearError(): void {
    error.value = ''
  }

  /**
   * Setze User (für Testing)
   */
  function setUser(userData: UserInfo | null): void {
    user.value = userData
  }

  return {
    // State
    user,
    loading,
    error,
    isInitialized,
    // Computed
    isAuthenticated,
    isAdmin,
    isUser,
    userName,
    userEmail,
    // Actions
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
