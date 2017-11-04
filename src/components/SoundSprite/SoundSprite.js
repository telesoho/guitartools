import {Howl} from 'howler'

export default {
  props: {
    sprite: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      /**
       * The Howl instance used for playback
       */
      _howl: null
    }
  },
  created () {
    this._initialize()
  },

  beforeDestroy () {
    this._cleanup()
  },
  methods: {
    _initialize () {
      let option = {
        src: ['../static/Idina Menzel - Let It Go.mp3'],
        sprite: {
          one: [0, 5000],
          two: [5000, 10000],
          three: [10000, 15000],
          four: [15000, 20000],
          five: [20000, 25000],
          beat: [25000, 30000]
        }
      }
      this.$data._howl = new Howl(option)
    },
    _cleanup (resetSettings = true) {
      // Stop all playback
      if (this.$data._howl) {
        this.stop()
      }
    },

    play () {
      if (!this.playing) this.$data._howl.play(this.sprite)
    }
  }
}
