// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import telesoho from './components'

Vue.config.productionTip = false
Vue.use(telesoho)
Vue.store = store

// Prevents "elastic scrolling" on Safari
document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
