/**
 * Vue Router Configuration with Authentication Guards
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { CustomRouteMeta } from '@/types/router'
import { useRouterGuards } from '@/composables/useRouterGuards'

// Import Components
import HelloWorld from '../components/HelloWorld.vue'
import InfoletterFeed from '../components/InfoletterFeed.vue'
import InfoletterForm from '../components/InfoletterForm.vue'

/**
 * Route Definitions
 * Nutzt CustomRouteMeta für Authentication
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/public',
    meta: {
      title: 'Home'
    } as CustomRouteMeta
  },
  {
    path: '/public',
    component: HelloWorld,
    meta: {
      title: 'Welcome',
      description: 'Öffentliche Landing Page',
      layout: 'default',
      // requiresAuth undefined = öffentliche Route
    } as CustomRouteMeta
  },
  {
    path: '/infoletter',
    component: InfoletterFeed,
    meta: {
      title: 'Infoletters',
      description: 'Meine Infoletters',
      requiresAuth: true,
      layout: 'default'
    } as CustomRouteMeta
  },
  {
    path: '/infoletter/create',
    component: InfoletterForm,
    meta: {
      title: 'Neuer Infoletter',
      description: 'Erstelle einen neuen Infoletter',
      requiresAuth: true,
      layout: 'default'
    } as CustomRouteMeta
  },
  {
    path: '/infoletter/:id/edit',
    component: InfoletterForm,
    meta: {
      title: 'Infoletter bearbeiten',
      description: 'Bearbeite einen Infoletter',
      requiresAuth: true,
      layout: 'default'
    } as CustomRouteMeta
  }
  // TODO: Login Page hinzufügen
  // TODO: Register Page hinzufügen
  // TODO: 404 Not Found Page hinzufügen
]

/**
 * Erstelle Router-Instanz
 */
const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * ROUTER GUARDS - beforeEach
 * Führt vor jedem Route-Wechsel diese Checks durch
 */
router.beforeEach((to, from, next) => {
  const { checkRouteAccess } = useRouterGuards()

  // Check ob Route Access erlaubt ist
  const result = checkRouteAccess(to.meta as CustomRouteMeta)

  if (!result.allowed) {
    console.warn(`Access denied to route ${to.path}:`, result.reason)

    if (result.redirectTo) {
      // Redirect zu Login bei Auth-Fehler
      next({
        path: result.redirectTo,
        query: { redirect: to.fullPath } // Speichere Ziel-Route für Post-Login Redirect
      })
      return
    }

    // Fallback: Blockiere Navigation
    next(false)
    return
  }

  // Access erlaubt - fahre fort
  next()
})

/**
 * ROUTER GUARDS - afterEach
 * Nach erfolgreicher Navigation
 */
router.afterEach((to) => {
  // Update Page Title
  const title = (to.meta as CustomRouteMeta)?.title || 'Webtech-2025'
  document.title = `${title} - Webtech-2025`

  // Optional: Scrolle oben
  window.scrollTo(0, 0)
})

/**
 * ERROR HANDLER
 * Behandelt Router-Fehler
 */
router.onError((error) => {
  console.error('Router Error:', error)
  // Hier könnten Error-Tracking Services wie Sentry integriert werden
})

export default router
