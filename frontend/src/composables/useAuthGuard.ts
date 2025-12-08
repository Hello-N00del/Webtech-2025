/**
 * Auth Guard Composable
 * Für die Verwendung direkt in Vue Components
 * Vereinfacht den Zugriff auf Auth-State und Guard-Logik
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useRouterGuards } from './useRouterGuards'

export function useAuthGuard() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { checkRouteAccess, isUserAuthenticated } = useRouterGuards()

  // Computed
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isAdmin = computed(() => authStore.isAdmin)
  const isUser = computed(() => authStore.isUser)
  const user = computed(() => authStore.user)
  const userName = computed(() => authStore.userName)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)

  // Actions

  /**
   * Leite zu Login weiter
   */
  function redirectToLogin(returnUrl?: string): void {
    router.push({
      name: 'Login',
      query: returnUrl ? { redirect: returnUrl } : {}
    })
  }

  /**
   * Leite zu Dashboard weiter (nach Login)
   */
  function redirectToDashboard(): void {
    router.push({ name: 'Dashboard' })
  }

  /**
   * Prüfe ob User diese Route zugreifen darf
   */
  function canAccessRoute(routeName: string): boolean {
    const route = router.getRoutes().find((r) => r.name === routeName)
    if (!route) return false
    const result = checkRouteAccess(route.meta)
    return result.allowed
  }

  /**
   * Meldet User ab
   */
  async function logout(): Promise<void> {
    try {
      await authStore.logout()
      redirectToLogin()
    } catch (err) {
      console.error('Logout failed:', err)
      // Trotzdem zu Login
      redirectToLogin()
    }
  }

  /**
   * Meldet User an
   */
  async function login(email: string, password: string): Promise<void> {
    try {
      await authStore.login(email, password)
      redirectToDashboard()
    } catch (err) {
      // Error wird in authStore.error gespeichert
      throw err
    }
  }

  /**
   * Registriert User
   */
  async function register(
    email: string,
    password: string,
    name: string
  ): Promise<void> {
    try {
      await authStore.register(email, password, name)
      redirectToDashboard()
    } catch (err) {
      // Error wird in authStore.error gespeichert
      throw err
    }
  }

  /**
   * Gibt den aktuellen User zurück
   */
  function getCurrentUser() {
    return authStore.user
  }

  /**
   * Prüfe ob User angemeldet ist
   */
  function checkIfAuthenticated(): boolean {
    return isUserAuthenticated()
  }

  /**
   * Lade User-Daten neu
   */
  async function reloadUser(): Promise<void> {
    try {
      await authStore.loadUser()
    } catch (err) {
      console.error('Failed to reload user:', err)
    }
  }

  return {
    // Computed
    isAuthenticated,
    isAdmin,
    isUser,
    user,
    userName,
    loading,
    error,
    // Methods
    redirectToLogin,
    redirectToDashboard,
    canAccessRoute,
    logout,
    login,
    register,
    getCurrentUser,
    checkIfAuthenticated,
    reloadUser
  }
}
