import VueHowler from './VueHowler.js'
import Lyric from './Lyric.vue'
import BloomMenu from '../BloomMenu'

export default {
  props: {
    'lyricFile': ''
  },
  mixins: [VueHowler],
  components: {Lyric, BloomMenu},
  data () {
    return {
      lyric: ''
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
