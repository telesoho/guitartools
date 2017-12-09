import VueHowler from './VueHowler.js'
import ChordStrip from './ChordStrip.vue'
import Lyric from './Lyric.vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import BloomMenu from '../BloomMenu'
import Circle from '../Circle/Circle.vue'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-modern.css'
import {addClass, removeClass} from '../../utils/utils'
import Vue from 'vue'

export default {
  name: 'AudioPlayer',
  props: {
    lyricSrc: [String],
    chordSrc: [String]
  },
  mixins: [VueHowler],
  components: {Lyric,
    ChordStrip,
    'TCircle': Circle,
    'TButton': Button,
    Icon,
    BloomMenu: BloomMenu,
    BloomItem: BloomMenu.Item
  },
  data () {
    return {
      lyric: '',
      isHelp: false,
      bloomMenuIsOpen: false,
      bloomItem: []
    }
  },
  mounted () {
    var leafname = decodeURI(this.sources[0]).split('\\').pop().split('/').pop()
    document.title = leafname
  },
  computed: {
    chordRendering () {
      return this.$store.state.chordRendering
    }
  },
  watch: {
    chordRendering (newValue, oldValue) {
      if (newValue === true) {
        addClass(this.$refs.instrumentsBtn.$el, 'fa-spin')
      } else {
        removeClass(this.$refs.instrumentsBtn.$el, 'fa-spin')
      }
    }
  },
  methods: {
    playFromHere (time) {
      this.setSeek(time)
    },
    onChangeInstruments () {
      Vue.store.commit('setChordRendering', true)
      setTimeout(function () {
        if (Vue.store.state.instruments === 'guitar') {
          Vue.store.commit('setInstruments', 'ukulele')
        } else if (Vue.store.state.instruments === 'ukulele') {
          Vue.store.commit('setInstruments', 'guitar')
        }
      }, 1000)
    },
    onHelp () {
      this.$intro().setOptions(
        {
          showStepNumbers: false,
          showProgress: false,
          showBullets: false,
          hidePrev: true,
          hideNext: true,
          nextLabel: '>',
          prevLabel: '<',
          doneLabel: '完成',
          skipLabel: '取消'
        }
      ).start()
    }
  }
}
