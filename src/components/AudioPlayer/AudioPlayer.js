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
      instruments: 'guitar',
      bloomMenuIsOpen: false,
      bloomItem: []
    }
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
      if (this.$store.state.instuments === 'guitar') {
        this.$store.state.instuments = 'ukulele'
      } else {
        this.$store.state.instuments = 'guitar'
      }
      this.instruments = this.$store.state.instuments
    },
    onHelp () {
      console.log(this.$intro)
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
