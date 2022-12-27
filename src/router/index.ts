import { getCookie } from '@/method/cookie';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:"/home"
  },
  {
    path: '/login',
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: '/home',
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: '/commodity',
    component: () => import("@/views/CommodityView.vue")
  },
  {
    path: '/order',
    component: () => import("@/views/OrderView.vue")
  },
  {
    name: "detail",
    path: '/detail',
    component: () => import("@/views/OrderDetailView.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const time = Date.now();
  if (time - Number(getCookie("token")) < 1000 * 3600 * 4 || to.fullPath == "/login") {
    document.cookie = `token=${time}`;
    return true
  } else {
    return { path: "/login" }
  }
})

export default router
