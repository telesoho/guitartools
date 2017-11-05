import Emitter from '../../mixins/emitter'
const prefixCls = 'blooming-menu__'

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
  computed: {
    classes () {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.active,
          [`${prefixCls}-item-selected`]: this.active,
          [`${prefixCls}-item-disabled`]: this.disabled
        }
      ]
    }
  },
  methods: {
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
        item.classList.remove('is-selected')
        item.classList.add('is-active')
      } else {
        item.classList.remove('is-active')
        item.classList.add('is-selected')
      }
    })
  }
}
