import IScroll from 'iscroll'
import touch from '../directives/touch'

var devicePixelRatio = window.devicePixelRatio ||
(window.matchMedia &&
  window.matchMedia('(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches ? 2 : 1) ||
   1

export default {
  install (Vue, options) {
    console.log('install components', screen.height)

    // 1. 添加全局方法或属性
    Vue.calc = function (px) {
      console.log('vue.calc')
      return px * devicePixelRatio
    }
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

    Vue.prototype.$toggleClass = function (element, className) {
      var classList = element.className.split(/\s+/)
      var index = classList.indexOf(className)
      if (index === -1) {
        classList.push(className)
      } else {
        classList.splice(index)
      }
      element.className = classList.join(' ')
    }

    Vue.prototype.$IScroll = IScroll
  }
}
