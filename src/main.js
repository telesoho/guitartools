// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import telesoho from './components'
import Vuex from 'vuex'
import iview from 'iview'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(telesoho)
Vue.use(iview)

// Prevents "elastic scrolling" on Safari
document.addEventListener('touchmove', function (event) {
  'use strict'
  event.preventDefault()
})

const store = new Vuex.Store({
  state: {
    muted: false,
    beLoop: false,
    instruments: 'guitar'
  },
  mutations: {
    setMuted (state, muted) {
      this.state.muted = muted
    },
    setLoop (state, loop) {
      this.state.beLoop = loop
    }
  }
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
