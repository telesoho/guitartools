import VueHowler from './VueHowler.js'
import Lyric from './Lyric.vue'
import BloomMenu from '../BloomMenu'

export default {
  name: 'AudioPlayer',
  props: {
    'lyricFile': ''
  },
  mixins: [VueHowler],
  components: {Lyric, BloomMenu: BloomMenu, BloomItem: BloomMenu.Item},
  data () {
    return {
      lyric: '',
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
  beforeCreate () {
    console.log('AudioPlayer.beforeCreate', this)
  },
  created () {
    console.log('AudioPlayer.created', this)
  },
  beforeMount () {
    console.log('AudioPlayer.beforeMount', this)
  },
  computed: {
    songTitle () {
      return this.sources[0]
    }
  },
  updated () {
  },
  mounted () {
    console.log('mounted', this.$options.name)
  },
  methods: {
    playFromHere (time) {
      console.log(time)
      this.setSeek(time)
    }
  }
}
