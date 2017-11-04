import Hammer from 'hammerjs'

var gestures = [
  'tap',
  'pinch', /* 'pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout', */
  'press', 'pressup',
  'rotate', /* 'rotatestart', 'rotatemove', 'rotateend', 'rotatecancel', */
  'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
  'pan', 'panleft', 'panright', 'panup', 'pandown'
]
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
  bind (el, binding, vnode, oldVnode) {
    // console.log('bind', el, binding, vnode, oldVnode)
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
    // console.log('update', el, binding, vnode, oldVnode)
    // var mc = el.mc
    // var event = binding.arg
    // // teardown old handler
    // if (el.handler) {
    //   mc.off(event, el.handler)
    // }
    // if (typeof binding.value !== 'function') {
    //   el.handler = null
    //   console.warn(
    //     '[vue-touch] invalid handler function for v-touch: ' +
    //     binding.arg + '="' + binding.rawName
    //   )
    // } else {
    //   mc.on(event, (el.handler = binding.value))
    // }
  },
  unbind (el, binding) {
    // console.log('unbind', el, binding)
    if (el.hammer) {
      el.hammer.destroy()
    }
  }
}
