import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignedIn from '../views/signedin.vue'
import Userinfo from '../views/Info.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signedin',
      name: 'signedin',
      component: SignedIn
    },
    {
      path: '/info',
      name: 'info',
      component: Userinfo
    }
  ]
})

export default router
