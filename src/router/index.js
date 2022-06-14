import Vue from 'vue'
import VueRouter from 'vue-router'
import Agenda from '../views/Agenda.vue'
import Citas from '../views/Citas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'agenda',
    component: Agenda
  },
  {
    path: '/citas',
    name: 'citas',
    component: Citas
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
