import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
import SignedIn from '../views/signedin.vue'
import Userinfo from '../views/Info.vue'
<<<<<<< HEAD
=======
>>>>>>> parent of 486d6bb... min fixes
=======
import AddTrip from '../views/AddTrip.vue'
>>>>>>> acb9086fd7df822fe359ce504b7e9fe687152b0e

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
    },
    {
      path: '/trips/add',
      name: 'addTrip',
      component: AddTrip,
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
