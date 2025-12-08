/**
 * Router Guards Composable
 * Wiederverwendbare Guards-Logik für Auth-Checks
 */

import { authService } from '../services/authService'
import type { CustomRouteMeta } from '../types/router'

export interface GuardCheckResult {
  allowed: boolean
  reason?: string
  redirectTo?: string
}

/**
 * Router Guards Hook
 */
export function useRouterGuards() {
  /**
   * Prüft ob User zur Route Zugriff hat
   */
  function checkRouteAccess(meta: CustomRouteMeta | undefined): GuardCheckResult {
    // Keine Meta = öffentliche Route
    if (!meta) {
      return { allowed: true }
    }

    // Authentifizierung erforderlich?
    if (meta.requiresAuth) {
      if (!authService.isAuthenticated()) {
        return {
          allowed: false,
          reason: 'Authentication required',
          redirectTo: '/login'
        }
      }
    }

    // Rollen-Check
    if (meta.requiredRoles && meta.requiredRoles.length > 0) {
      // Für Role-Check müssten wir User-Info haben
      // Das wird mit Pinia Store gelöst - hier nur Struktur
      // TODO: Mit authStore.user.role checken wenn Store verfügbar
      console.warn(
        'Role-based access control not fully implemented yet. Use Pinia store for user role checks.'
      )
    }

    return { allowed: true }
  }

  /**
   * Prüft ob User angemeldet ist
   */
  function isUserAuthenticated(): boolean {
    return authService.isAuthenticated()
  }

  /**
   * Gibt den aktuellen Authentifizierungsstatus zurück
   */
  function getAuthStatus(): {
    isAuthenticated: boolean
    hasToken: boolean
    tokenExpired: boolean
  } {
    return {
      isAuthenticated: authService.isAuthenticated(),
      hasToken: !!authService.getAccessToken(),
      tokenExpired: false // Wird durch tokenManager.isTokenExpired() geprüft
    }
  }

  return {
    checkRouteAccess,
    isUserAuthenticated,
    getAuthStatus
  }
}
