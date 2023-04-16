import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignedIn from '../views/signedin.vue'
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
    },
    {
      path: '/trips/:id',
      name: 'viewTrip',
      component: TripDetails,
    }
  ]
})

export default router
