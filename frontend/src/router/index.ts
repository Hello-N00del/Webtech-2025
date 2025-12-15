// src/router/index.ts
/**
 * Vue Router Configuration with Authentication Guards
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { CustomRouteMeta } from '../types/router'
import { useRouterGuards } from '../composables/useRouterGuards'

// Import Components
import LandingPage from '../views/LandingPage.vue'
import HelloWorld from '../components/HelloWorld.vue'
import InfoletterFeed from '../components/InfoletterFeed.vue'
import InfoletterForm from '../components/InfoletterForm.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

/**
 * Route Definitions
 * Nutzt CustomRouteMeta für Authentication
 */
const routes: Array<RouteRecordRaw> = [
  // Public Routes (no auth required)
  {
    path: '/',
    component: LandingPage,
    meta: {
      title: 'Home',
      layout: 'default'
      // requiresAuth undefined = öffentliche Route
    } as CustomRouteMeta
  },

  // Authentication Routes (no auth required)
  {
    path: '/login',
    component: LoginView,
    meta: {
      title: 'Anmelden',
      layout: 'auth'
    } as CustomRouteMeta
  },
  {
    path: '/register',
    component: RegisterView,
    meta: {
      title: 'Registrieren',
      layout: 'auth'
    } as CustomRouteMeta
  },

  {
    path: '/public',
    component: HelloWorld,
    meta: {
      title: 'Welcome',
      description: 'Öffentliche Landing Page',
      layout: 'default'
      // requiresAuth undefined = öffentliche Route
    } as CustomRouteMeta
  },

  // Protected Routes (require auth)
  {
    path: "/infoletter",
    component: InfoletterFeed,
    meta: {
      title: "Infoletters",
      description: "Meine Infoletters",
      requiresAuth: true,
      layout: "default"
    } as CustomRouteMeta
  },
  {
    path: "/infoletter/create",
    component: InfoletterForm,
    meta: {
      title: "Neuer Infoletter",
      description: "Erstelle einen neuen Infoletter",
      requiresAuth: true,
      layout: "default"
    } as CustomRouteMeta
  },
  {
    path: "/infoletter/:id/edit",
    component: InfoletterForm,
    meta: {
      title: "Infoletter bearbeiten",
      description: "Bearbeite einen Infoletter",
      requiresAuth: true,
      layout: "default"
    } as CustomRouteMeta
  },
  {
    path: '/dashboard',
    redirect: '/infoletter',
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    } as CustomRouteMeta
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  sensitive: false
})

router.beforeEach((to, from, next) => {
  const { checkRouteAccess } = useRouterGuards()
  const result = checkRouteAccess(to.meta as CustomRouteMeta)

  if (!result.allowed) {
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

router.afterEach((to) => {
  const title = (to.meta as CustomRouteMeta)?.title || "Webtech-2025"
  document.title = `${title} - Webtech-2025`
  window.scrollTo(0, 0)
})

router.onError((error) => {
  console.error("Router Error:", error)
})

export default router
