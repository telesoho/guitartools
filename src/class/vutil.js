import IScroll from 'iscroll'

var devicePixelRatio = window.devicePixelRatio ||
(window.matchMedia &&
  window.matchMedia('(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches ? 2 : 1) ||
   1
var Hammer = typeof require === 'function' ? require('hammerjs') : window.Hammer
var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
// var customEvents = {}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function guardDirections (options) {
  var dir = options.direction
  if (typeof dir === 'string') {
    var hammerDirection = 'DIRECTION_' + dir.toUpperCase()
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection]
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir)
    }
  }
}
export default {
  install (Vue, options) {
    console.log('install plugin')

    // 1. 添加全局方法或属性
    Vue.calc = function (px) {
      console.log('vue.calc')
      return px * devicePixelRatio
    }
    // 2. 添加全局资源
    Vue.directive('touch', {
      bind (el, binding, vnode, oldVnode) {
        // console.log('bind', el, binding, vnode, oldVnode)
        // 逻辑...
        if (!el.hammer) {
          el.hammer = new Hammer.Manager(el)
        }
        var mc = el.hammer
        // determine event type
        var event = binding.arg
        if (!event) {
          console.warn('[vue-touch] event type argument is required.')
        }
        // built-in event
        for (var i = 0; i < gestures.length; i++) {
          if (event.indexOf(gestures[i]) === 0) {
            var recognizerType = gestures[i]
            break
          }
        }
        if (!recognizerType) {
          console.warn('[vue-touch] invalid event type: ' + event)
          return
        }
        var recognizer = mc.get(recognizerType)
        if (!recognizer) {
          // add recognizer
          recognizer = new Hammer[capitalize(recognizerType)]()
          // make sure multiple recognizers work together...
          recognizer.recognizeWith(mc.recognizers)
          mc.add(recognizer)
        }
        // apply local options
        var localOptions = el.hammerOptions && el.hammerOptions[recognizerType]
        if (localOptions) {
          guardDirections(localOptions)
          recognizer.set(localOptions)
        }

        if (el.handler) {
          mc.off(event, el.handler)
        }
        if (typeof binding.value !== 'function') {
          el.handler = null
          console.warn(
            '[vue-touch] invalid handler function for v-touch: ', binding.value
          )
        } else {
          mc.on(event, (el.handler = binding.value))
        }
      },
      inserted (el, binding) {
      },
      update (el, binding, vnode, oldVnode) {
        console.log('update', el, binding, vnode, oldVnode)
        var mc = el.mc
        var event = binding.arg
        // teardown old handler
        if (el.handler) {
          mc.off(event, el.handler)
        }
        if (typeof binding.value !== 'function') {
          el.handler = null
          console.warn(
            '[vue-touch] invalid handler function for v-touch: ' +
            binding.arg + '="' + binding.rawName
          )
        } else {
          mc.on(event, (el.handler = binding.value))
        }
      },
      unbind (el, binding) {
        // console.log('unbind', el, binding)
        if (el.hammer) {
          el.hammer.destroy()
        }
      }
    })
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

    Vue.prototype.$IScroll = IScroll
  }
}
