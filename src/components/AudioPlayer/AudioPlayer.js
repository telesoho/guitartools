import VueHowler from './VueHowler.js'
import Lyric from './Lyric.vue'
import BloomMenu from '../BloomMenu'

export default {
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
          icon: this.muted ? 'android-volume-off' : 'android-volume-up',
          onTap: this.toggleMute
        },
        {
          name: 'loop',
          icon: this.beLoop ? 'loop' : 'refresh',
          onTap: this.toggleLoop
        }
      ]
    }
  },
  created () {
    console.log('created')
  },
  watch: {
  },
  computed: {
    songTitle () {
      return this.sources[0]
    }
  },
  updated () {
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    playFromHere (time) {
      console.log(time)
      this.setSeek(time)
    }
  }
}
