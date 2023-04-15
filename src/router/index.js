import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import("../views/signin.vue")
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import("../views/feed.vue")
    }
  ]
})

export default router
