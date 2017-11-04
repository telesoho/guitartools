// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Demo from './Demo'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import vutil from './class/vutil'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vutil, { someOption: true })

// Prevents "elastic scrolling" on Safari
document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Demo/>',
  components: { Demo }
})
