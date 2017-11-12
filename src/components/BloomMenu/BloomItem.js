import Emitter from '../../mixins/emitter'
import * as utils from '../../utils/utils'
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
      state: 'close',
      anime: ''
    }
  },
  beforeCreate () {
    console.log('BloomItem.beforCreate', this)
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
    },
    handleClick () {
      if (this.disabled) return

      let parent = this.$parent
      let name = parent.$options.name
      while (parent && (!name || name !== 'Submenu')) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
      }

      if (parent) {
        this.dispatch('Submenu', 'on-menu-item-select', this.name)
      } else {
        this.dispatch('Menu', 'on-menu-item-select', this.name)
      }
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
      var item = this.$el
      if (isOpen) {
        console.log(this.anime)
        anime(this.anime.expand)
        utils.setAttribute(item, 'state', 'expand')
      } else {
        anime(this.anime.fold)
        utils.setAttribute(item, 'state', 'fold')
      }
    })
    this.$on('setAnime', animeParams => {
      console.log('setAnime event')
      for (var key in animeParams) {
        console.log(animeParams)
        animeParams[key].targets = this.$el
      }
      this.anime = animeParams
    })
  }
}
