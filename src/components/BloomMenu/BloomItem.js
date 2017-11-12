import Emitter from '../../mixins/emitter'
import anime from 'animejs'

export default {
  name: 'MenuItem',
  mixins: [Emitter],
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false,
      state: 'close'
    }
  },
  beforeCreate () {
    console.log('BloomItem.beforeCreate', this)
  },
  created () {
    console.log('BloomItem.created', this)
  },
  beforeMount () {
    console.log('BloomItem.beforeMount', this)
  },
  computed: {
  },
  methods: {
    setAnime (anime) {
      this.anime = anime
    }
  },
  mounted () {
    console.log('mounted', this.$options.name)
    this.$on('on-update-active-name', name => {
      if (this.name === name) {
        this.active = true
      } else {
        this.active = false
      }
    })
    this.$on('onOpenStateChanged', isOpen => {
      this.state = isOpen ? 'open' : 'close'
      if (isOpen) {
        anime(this.animeParams.expand)
      } else {
        anime(this.animeParams.fold)
      }
    })
    this.$on('setAnime', animeParams => {
      console.log('setAnime event', animeParams)
      for (var key in animeParams) {
        animeParams[key].targets = this.$el
      }
      this.animeParams = animeParams
    })
  }
}
