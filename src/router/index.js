import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
import SignedIn from '../views/signedin.vue'
import Userinfo from '../views/Info.vue'
=======
>>>>>>> parent of 486d6bb... min fixes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
<<<<<<< HEAD
      path: '/signedin',
      name: 'signedin',
      component: SignedIn
    },
    {
      path: '/info',
      name: 'info',
      component: Userinfo
    }
=======
      path: '/signin',
      name: 'signin',
      component: () => import("../views/signin.vue")
    },
>>>>>>> parent of 486d6bb... min fixes
  ]
})

export default router
