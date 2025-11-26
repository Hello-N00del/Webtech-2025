import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import InfoletterFeed from '../components/InfoletterFeed.vue'
import InfoletterForm from '../components/InfoletterForm.vue'  // neu importieren

const routes: Array<RouteRecordRaw> = [
  { path: '/public/', component: HelloWorld },
  { path: '/infoletter', component: InfoletterFeed },
  { path: '/infoletter/create', component: InfoletterForm },  // neue Route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router