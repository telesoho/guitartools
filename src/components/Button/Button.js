import Icon from '../Icon/Icon.vue'
import {
  oneOf
} from '../../utils/utils.js'

const prefixCls = 'ivu-btn'
export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default'])
      }
    },
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'circle-outline'])
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      }
    },
    icon: String,
    long: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showSlot: true
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
        }
      ]
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  },
  mounted () {
    this.showSlot = this.$slots.default !== undefined
  }
}
