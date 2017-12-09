import IScroll from 'iscroll'
import touch from '../directives/touch'
import IntroJs from 'intro.js'

var devicePixelRatio = window.devicePixelRatio ||
(window.matchMedia &&
  window.matchMedia('(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches ? 2 : 1) ||
   1

export default {
  install (Vue, options) {
    console.log('install components', screen.height)

    // Object.keys(iviewComponents).forEach(key => {
    //   Vue.component(key, iviewComponents[key])
    // })

    // 1. 添加全局方法或属性

    // 2. 添加全局资源
    Vue.directive('touch', touch)
    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$calc = function (px) {
      return px * devicePixelRatio
    }

    Vue.prototype.$screenHeight = function () {
      return Screen.height
    }

    Vue.prototype.$screenWidth = function () {
      return Screen.width
    }

    Vue.prototype.$IScroll = IScroll

    Vue.prototype.$intro = (...args) => {
      return IntroJs.introJs(...args)
    }
  }
}
