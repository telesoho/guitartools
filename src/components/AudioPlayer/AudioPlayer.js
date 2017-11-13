import VueHowler from './VueHowler.js'
import Lyric from './Lyric.vue'
import BloomMenu from '../BloomMenu'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-modern.css'

export default {
  name: 'AudioPlayer',
  props: {
    'lyricFile': ''
  },
  mixins: [VueHowler],
  components: {Lyric,
    BloomMenu: BloomMenu,
    BloomItem: BloomMenu.Item
  },
  data () {
    return {
      lyric: '',
      isHelp: false,
      bloomMenuIsOpen: false,
      bloomItem: [
        {
          name: 'muted',
          icon: this.$store.state.muted ? 'android-volume-off' : 'android-volume-up',
          onTap: this.toggleMute
        },
        {
          name: 'loop',
          icon: this.$store.state.beLoop ? 'loop' : 'refresh',
          onTap: this.toggleLoop
        }
      ]
    }
  },
  computed: {
    songTitle () {
      return this.sources[0]
    }
  },
  methods: {
    playFromHere (time) {
      console.log(time)
      this.setSeek(time)
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
