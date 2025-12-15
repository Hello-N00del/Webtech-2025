// src/router/index.ts
/**
 * Vue Router Configuration with Authentication Guards
 */

import { createRouter, createWebHistory } from "vue-router"
import type { Router, RouteRecordRaw } from "vue-router"
import type { CustomRouteMeta } from "../types/router"
import { useRouterGuards } from "../composables/useRouterGuards"

import HelloWorld from "../components/HelloWorld.vue"
import InfoletterFeed from "../components/InfoletterFeed.vue"
import InfoletterForm from "../components/InfoletterForm.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/public",
    meta: {
      title: "Home"
    } as CustomRouteMeta
  },
  {
    path: "/public",
    component: HelloWorld,
    meta: {
      title: "Welcome",
      description: "Öffentliche Landing Page",
      layout: "default"
    } as CustomRouteMeta
  },
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
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
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
