import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ()=>import("@/views/HomeView.vue")
  },
  {
    path: '/contact',
    component: ()=>import("@/views/ContactView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
