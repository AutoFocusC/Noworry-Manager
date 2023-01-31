import { getCookie } from "@/method/cookie";import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/commodity",
    component: () => import("@/views/CommodityView.vue"),
  },
  {
    path: "/order",
    component: () =>
      import(/* webpackPrefetch: true */ "@/views/OrderView.vue"),
  },
  {
    name: "detail",
    path: "/detail",
    component: () => import("@/views/OrderDetailView.vue"),
  },
  {
    name: "favOff",
    path: "/favoff",
    component: () => import(/* webpackPrefetch: true */ "@/views/FavOff.vue"),
  },
  {
    name: "Carouse",
    path: "/carouse",
    component: () =>
      import(/* webpackPrefetch: true */ "@/views/CarouseManga.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const time = Date.now();
  if (time - Number(getCookie("timer")) < 1000 * 3600 * 4) {
    document.cookie = `timer=${time}`;
  } else if (to.fullPath == "/login") {
    return true;
  } else {
    return { path: "/login" };
  }
});

export default router;
