import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import Dashboard from "../components/Dashboard.vue"
import InfoletterFeed from "../components/InfoletterFeed.vue"
import InfoletterForm from "../components/InfoletterForm.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Dashboard },
  { path: "/infoletter", component: InfoletterFeed },
  { path: "/infoletter/create", component: InfoletterForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
