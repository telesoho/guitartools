import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/:songid?',
      name: 'songid',
      component: App
    }
  ]
})

export default router
