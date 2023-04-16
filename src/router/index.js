import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Userinfo from '../views/Info.vue'
import AddTrip from '../views/AddTrip.vue'
import TripDetails from '../views/TripDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    },
    {
<<<<<<< HEAD
      path: '/signin',
      name: 'signin',
      component: () => import("../views/signedin.vue")
    },
=======
      path: '/trips/:id',
      name: 'viewTrip',
      component: TripDetails,
    }
>>>>>>> 45a525a914cf5ecc218fd9ea53afc54ef8f489a8
  ]
})

export default router
