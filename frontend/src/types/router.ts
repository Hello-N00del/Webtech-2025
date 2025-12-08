/**
 * Router Meta Type Definitions
 * Erweitert Vue Router mit Custom Meta Properties
 */

import type { RouteMeta } from 'vue-router'

/**
 * Custom RouteMeta Interface
 */
export interface CustomRouteMeta extends RouteMeta {
  /**
   * Benötigt Authentifizierung?
   * true = User muss angemeldet sein
   * false oder undefined = Öffentlich zugänglich
   */
  requiresAuth?: boolean

  /**
   * Benötigte Rollen
   * undefined = keine spezifische Rolle notwendig
   * ['ADMIN'] = nur Admins dürfen zugreifen
   * ['ADMIN', 'USER'] = Admins und User dürfen zugreifen
   */
  requiredRoles?: ('ADMIN' | 'USER')[]

  /**
   * Titel der Seite (für SEO/Browser Tab)
   */
  title?: string

  /**
   * Beschreibung (für Dokumentation)
   */
  description?: string

  /**
   * Layout-Komponente die verwendet werden soll
   * 'default', 'auth', 'minimal', etc.
   */
  layout?: 'default' | 'auth' | 'minimal'
}
