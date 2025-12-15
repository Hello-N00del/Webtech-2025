// src/router/index.ts
/**
 * Vue Router Configuration with Authentication Guards
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { CustomRouteMeta } from '../types/router'
import { useRouterGuards } from '../composables/useRouterGuards'

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
    redirect: '/dashboard',
    meta: {
      title: 'Home'
    } as CustomRouteMeta
  },
  {
    path: '/dashboard',
    component: HelloWorld,
    meta: {
      title: 'Dashboard',
      description: 'Dashboard',
      requiresAuth: true,
      layout: 'default'
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
  },
  // Fallback für 404 - MUSS LETZTER EINTRAG SEIN!
  {
    path: '/:pathMatch(.*)*',
    component: HelloWorld,
    meta: {
      title: '404 - Nicht gefunden',
      layout: 'default'
    } as CustomRouteMeta
  }
  // TODO: Login Page hinzufügen
  // TODO: Register Page hinzufügen
]

/**
 * Erstelle Router-Instanz
 */
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  sensitive: false
})

/**
 * ROUTER GUARDS - beforeEach
 * Führt vor jedem Route-Wechsel diese Checks durch
 */
router.beforeEach((to, from, next) => {
  const { checkRouteAccess } = useRouterGuards()

  const result = checkRouteAccess(to.meta as CustomRouteMeta)

  if (!result.allowed) {
    console.warn(`Access denied to route ${to.path}:`, result.reason)

    if (result.redirectTo) {
      next({
        path: result.redirectTo,
        query: { redirect: to.fullPath }
      })
      return
    }

    next(false)
    return
  }

  next()
})

/**
 * ROUTER GUARDS - afterEach
 * Nach erfolgreicher Navigation
 */
router.afterEach((to) => {
  const title = (to.meta as CustomRouteMeta)?.title || 'Webtech-2025'
  document.title = `${title} - Webtech-2025`
  window.scrollTo(0, 0)
})

/**
 * ERROR HANDLER
 */
router.onError((error) => {
  console.error('Router Error:', error)
})

export default router
