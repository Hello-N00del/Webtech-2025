// src/composables/useRouterGuards.ts

import { useAuthStore } from "../stores/authStore"
import type { CustomRouteMeta } from "../types/router"

export function useRouterGuards() {
  const authStore = useAuthStore()

  const checkRouteAccess = (meta: CustomRouteMeta) => {
    if (meta.requiresAuth && !authStore.isAuthenticated) {
      return {
        allowed: false,
        reason: "AUTH_REQUIRED",
        redirectTo: "/public"
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
