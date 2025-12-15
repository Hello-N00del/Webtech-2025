// src/composables/useRouterGuards.ts

import { useAuthStore } from "../stores/authStore"
import type { CustomRouteMeta } from "../types/router"

export function useRouterGuards() {
  const authStore = useAuthStore()

  // ✅ NEW: Async version that waits for auth state
  const checkRouteAccessAsync = async (meta: CustomRouteMeta) => {
    // Give auth state a moment to update
    // This is crucial for post-login redirects
    await new Promise(resolve => setTimeout(resolve, 50))
    
    if (meta.requiresAuth && !authStore.isAuthenticated) {
      return {
        allowed: false,
        reason: "AUTH_REQUIRED",
        redirectTo: "/login"  // Changed from "/public" to "/login"
      }
    }

    return {
      allowed: true,
      reason: null,
      redirectTo: null
    }
  }

  // Keep old sync version for backwards compatibility
  const checkRouteAccess = (meta: CustomRouteMeta) => {
    if (meta.requiresAuth && !authStore.isAuthenticated) {
      console.log('🔐 Auth required but not authenticated')
      return {
        allowed: false,
        reason: "AUTH_REQUIRED",
        redirectTo: "/login"  // Changed from "/public"
      }
    }

    return {
      allowed: true,
      reason: null,
      redirectTo: null
    }
  }

  return { checkRouteAccess, checkRouteAccessAsync }
}
