import VueHowler from './VueHowler.js'
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
    songSrc: {
      type: Array,
      required: true,
      validator (sources) {
        // Every source must be a non-empty string
        return sources.every(
          source => typeof source === 'string' && source.length > 0
        )
      }
    },
    lyricSrc: [Array],
    chordSrc: [Array],
    defaultSongId: {
      type: Number,
      default: 0
    }
  },
  mixins: [VueHowler],
  components: {Lyric,
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
      songId: this.defaultSongId,
      bloomItem: []
    }
  },
  mounted () {
    this.sources = [this.songSrc[this.songId]]
  },
  computed: {
    chordRendering () {
      return this.$store.state.chordRendering
    }
  },
  watch: {
    songId (newValue, oldValue) {
      // var leafname = decodeURI(this.songSrc[this.songId]).split('\\').pop().split('/').pop()
      // document.title = leafname
      this.sources = [this.songSrc[this.songId]]
    },
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
