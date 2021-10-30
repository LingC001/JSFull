import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/',
    component: () => import('@/views/index/index'),
    children:[
      {
        path:'index',
        component:() => import('@/views/calculate/calculate')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/calculate/calculate')
  }
]

const router = new VueRouter({
  routes
})

export default router
