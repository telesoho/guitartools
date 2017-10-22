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
          one: [0, 450],
          two: [2000, 250],
          three: [4000, 350],
          four: [6000, 380],
          five: [8000, 340],
          beat: [10000, 11163]
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
