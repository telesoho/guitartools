import VueHowler from './VueHowler.js'
import ChordStrip from './ChordStrip.vue'
import Lyric from './Lyric.vue'
import BloomMenu from '../BloomMenu'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-modern.css'

export default {
  name: 'AudioPlayer',
  props: {
    lyricSrc: [String],
    chordSrc: [String]
  },
  mixins: [VueHowler],
  components: {Lyric,
    ChordStrip,
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
  computed: {
  },
  mounted () {
    var leafname = this.sources[0].split('\\').pop().split('/').pop()
    document.title = leafname
  },
  methods: {
    playFromHere (time) {
      this.setSeek(time)
    },
    onChangeInstruments () {
      if (this.$store.state.instruments === 'guitar') {
        this.$store.commit('setInstruments', 'ukulele')
      } else if (this.$store.state.instruments === 'ukulele') {
        this.$store.commit('setInstruments', 'guitar')
      }
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
