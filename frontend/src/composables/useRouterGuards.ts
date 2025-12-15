// src/composables/useRouterGuards.ts

import { useAuthStore } from "../stores/authStore"
import type { CustomRouteMeta } from "../types/router"

export function useRouterGuards() {
  const authStore = useAuthStore()

  const checkRouteAccess = (meta: CustomRouteMeta) => {
    // ✅ NEW: Check if user is set (more reliable than isAuthenticated)
    // User is set immediately after login in authStore.login()
    const isAuth = !!authStore.user

    if (meta.requiresAuth && !isAuth) {
      console.log('🔐 Auth required but not authenticated, user:', authStore.user)
      return {
        allowed: false,
        reason: "AUTH_REQUIRED",
        redirectTo: "/login"
      }
    }

    return {
      allowed: true,
      reason: null,
      redirectTo: null
    }
  }

  return { checkRouteAccess }
}
