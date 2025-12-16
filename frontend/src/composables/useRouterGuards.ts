// src/composables/useRouterGuards.ts
//
// 🔑 TECHNOLOGY: Vue Router Guards + Auth Protection
// 
// What are Router Guards?
// - Middleware that runs before/after route changes
// - Protects routes from unauthorized access
// - Handles redirects for failed auth checks
//
// Why in a composable?
// - Reusable logic in beforeEach/afterEach hooks
// - Easier to test and mock
// - Separation of concerns (auth logic separate from router config)

import { useAuthStore } from "../stores/authStore"
import type { CustomRouteMeta } from "../types/router"

export function useRouterGuards() {
  const authStore = useAuthStore()

  // 🔑 SECURITY: Check if route requires auth
  // Called in router.beforeEach() before navigation
  //
  // Why check !!authStore.user instead of isAuthenticated?
  // - Direct ref check (user.value) is faster
  // - Vue tracks user.value immediately
  // - More reactive than computed property check
  // - Sufficient for guard logic (still double-checked with token)
  const checkRouteAccess = (meta: CustomRouteMeta) => {
    // Determine if user is authenticated
    const isAuth = !!authStore.user

    // Check if route requires authentication
    if (meta.requiresAuth && !isAuth) {
      console.log('🔐 Auth required but not authenticated, user:', authStore.user)
      return {
        allowed: false,
        reason: "AUTH_REQUIRED",
        redirectTo: "/login"  // Redirect to login page
      }
    }

    // Route is either public or user is authenticated
    return {
      allowed: true,
      reason: null,
      redirectTo: null
    }
  }

  return { checkRouteAccess }
}
