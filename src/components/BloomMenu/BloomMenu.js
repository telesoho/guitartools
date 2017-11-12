// import * as BloomMenu from '../class/bloom-menu'
// import velocity from 'velocity-animate'

function toRadians (angle) {
  return angle * (Math.PI / 180)
}

export default {
  name: 'BloomMenu',
  props: {
    startAngle: {
      type: Number,
      default: 180
    },
    endAngle: {
      type: Number,
      default: 270
    },
    radius: {
      type: Number,
      default: 80
    },
    itemAnimationDelay: {
      type: Number,
      default: 40
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    itemWidth: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      state: {
        isOpen: false,
        isBeingAnimated: false
      }
    }
  },
  beforeCreate () {
    console.log('BloomMenu.beforCreate', this)
    // var item1 = this.$slots.BloomItems[0].componentInstance
    // item1.$options.propsData.name = 'abc'
  },
  created () {
    console.log('BloomMenu.created', this)
    // console.log(this.$slots.BloomItems[0].componentInstance)
    // var item1 = this.$slots.BloomItems[0].componentInstance
  },
  beforeMount () {
    console.log('BloomMenu.beforeMount', this)
  },
  mounted () {
    console.log('mounted', this.$options.name)
    if (!this.$slots.BloomItems) {
      console.log('ERROR: you must define some item.')
      return
    }

    var angleStep =
    (this.endAngle - this.startAngle) / (this.$slots.BloomItems.length - 1)
    var angleCur = this.startAngle

    for (var i = 0; i < this.$slots.BloomItems.length; i++) {
      var x = this.radius * Math.cos(toRadians(angleCur))
      var y = this.radius * Math.sin(toRadians(angleCur))
      var x3 = Number((x).toFixed(2))
      var y3 = Number((y).toFixed(2))
      var x2 = x3 * 1.2
      var y2 = y3 * 1.2
      var x0 = 0
      var y0 = 0
      var expandTranslateX = [
        {value: x0},
        {value: x2},
        {value: x3, easing: 'easeOutBack'}
      ]
      var expandTranslateY = [
        {value: y0},
        {value: y2},
        {value: y3, easing: 'easeOutBack'}
      ]

      var foldTranslateX = [
        {value: x3},
        {value: x2},
        {value: x0, easing: 'easeOutBack'}
      ]
      var foldTranslateY = [
        {value: y3},
        {value: y2},
        {value: y0, easing: 'easeOutBack'}
      ]

      this.$emit.apply(this.$slots.BloomItems[i].componentInstance, ['setAnime'].concat({
        expand: {
          translateX: expandTranslateX,
          translateY: expandTranslateY,
          delay: i * this.itemAnimationDelay,
          duration: this.animationDuration
        },
        fold: {
          translateX: foldTranslateX,
          translateY: foldTranslateY,
          delay: i * this.itemAnimationDelay,
          duration: this.animationDuration
        }
      }))
      angleCur += angleStep
    }
  },
  updated () {
    // console.log('updated', this.$slots.main[0])
  },
  methods: {
    onOpen () {
      this.state.isOpen = !this.state.isOpen
      this.broadcast('BloomItem', 'onOpenStateChanged', this.state.isOpen)
    }
  }
}
