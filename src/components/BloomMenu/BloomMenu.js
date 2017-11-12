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
      default: 50
    },
    itemAnimationDelay: {
      type: Number,
      default: 40
    },
    animationDuration: {
      type: Number,
      default: 100
    }
  },
  mounted () {
    console.log('mounted', this.$options.name)
    if (!this.$slots.BloomItems) {
      console.log('ERROR: you must define some item.')
      return
    }

    this.isOpen = false

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
        {value: x0, duration: 0},
        {value: x2, duration: 0.7 * this.animationDuration},
        {value: x3, duration: 0.3 * this.animationDuration, easing: 'easeOutBack'}
      ]
      var expandTranslateY = [
        {value: y0, duration: 0},
        {value: y2, duration: 0.7 * this.animationDuration},
        {value: y3, duration: 0.3 * this.animationDuration, easing: 'easeOutBack'}
      ]

      var foldTranslateX = [
        {value: x3, duration: 0},
        {value: x2, duration: 0.7 * this.animationDuration},
        {value: x0, duration: 0.3 * this.animationDuration, easing: 'easeOutBack'}
      ]
      var foldTranslateY = [
        {value: y3, duration: 0},
        {value: y2, duration: 0.7 * this.animationDuration},
        {value: y0, duration: 0.3 * this.animationDuration, easing: 'easeOutBack'}
      ]

      this.$emit.apply(this.$slots.BloomItems[i].componentInstance, ['setAnime'].concat({
        expand: {
          translateX: expandTranslateX,
          translateY: expandTranslateY,
          delay: i * this.itemAnimationDelay
        },
        fold: {
          translateX: foldTranslateX,
          translateY: foldTranslateY,
          delay: i * this.itemAnimationDelay
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
      if (this.isBeingAnimated) {
        return
      }
      this.isOpen = !this.isOpen
      this.isBeingAnimated = true
      setTimeout(() => {
        this.isBeingAnimated = false
      }, 1000)
      this.broadcast('BloomItem', 'onOpenStateChanged', this.isOpen)
    }
  }
}
