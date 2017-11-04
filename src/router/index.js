import Vue from 'vue'
import Router from 'vue-router'
import BloomMenu from '@/components/BloomMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Menu',
      name: 'Menu',
      component: BloomMenu
    }
  ]
})
