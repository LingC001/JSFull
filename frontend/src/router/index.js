import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/calculate')
  },
  {
    path: '*',
    component: () => import('@/views/calculate')
  }
]

const router = new VueRouter({
  routes
})

export default router
