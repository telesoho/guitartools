// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Demo from './Demo'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import util from './class/util.js'
import IScroll from 'iscroll'

Vue.config.productionTip = false
Vue.use(iView)

Vue.prototype.$util = util
Vue.prototype.$IScroll = IScroll

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Demo/>',
  components: { Demo }
})
