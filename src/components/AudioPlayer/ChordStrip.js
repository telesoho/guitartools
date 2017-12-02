import axios from 'axios'
import _ from 'underscore'
import * as utils from '../../utils/utils'

export default {
  name: 'ChordStrip',
  props: {
    chordSrc: [String],
    seek: Number,
    width: {
      type: Number,
      default: screen.width
    }
  },
  data() {
    return {
      focusIndex: 0,
      transformX: 0,
      duration: 0,
      chordData: [{
        start: 0,
        end: 0,
        chord: '',
        chordName: '',
        focus: false
      }]
    }
  },
  created() {
    this.loadChords(this.chordSrc)
  },
  mounted() {
    if (!this.iscroll) {
      const IScroll = this.$IScroll
      this.iscroll = new IScroll(this.$refs.ChordStrip, {
        scrollX: true,
        scrollY: false,
        mouseWheel: false,
      })
    }
  },
  computed: {
    chordStripStyle() {
      return {
        width: this.duration * 1000 + 'px',
        transform: 'translateX(-' + this.seek * 100 + 'px)'
      }
    },
    position () {
      return this.seek * 100
    },
    chordHtml() {
      return this.chordData
    },
    chordWidth() {
      return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth
    }
  },
  watch: {},
  updated() {
    // if (this.chordData.length > 0 && this.focusIndex === null) {
    //   renderChord(this.$refs.chord_list)
    //   this.iscroll.refresh()
    // }
  },
  methods: {

    ParseChordData(content) {
        // 根据变调夹位置，推算出对应和弦
        function CapoKey(key, capo) {
          var ChordKey = ['C', 'C#/Bb', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
          var lens = ChordKey.length
          for (var i = 0; i < lens; i++) {
            if (key === ChordKey[i]) {
              break
            } else if (key.length === 2 && ChordKey[i].search(key) !== -1) {
              break
            }
          }
          i = i - capo
          if (i < 0) {
            i = lens + i
          }
          var retKey = ChordKey[i]
          return retKey.length === 1 ? retKey : retKey.substr(0, 2)
        }
      
        function GetChordName(chord) {
          if (chord === 'N') {
            return 'Intro'
          }
      
          var chordArray = chord.split(":")
          var chordKey = CapoKey(chordArray[0], 3)
          var chordShap = chordArray[1]
          chordShap = chordShap.replace("maj", "").replace("min", "m")
          return chordKey + chordShap
        }
      
        var jsonObj = null
        if (typeof content === 'string') {
          jsonObj = JSON.parse(content)
        } else {
          jsonObj = content
        }
        this.duration = 0
        for (var key in jsonObj) {
          var item = jsonObj[key]
          item.name = GetChordName(item.chord)
          item.width = item.end - item.start
          this.duration += item.width
        }
        return jsonObj
      },

    focusIn(index) {
      if (index < 0 || index >= this.lyricData.length ||
        this.focusIndex === index) {
        return
      }
      console.log(this.focusIndex, index)
      if (this.focusIndex !== null) {
        this.lyricData[this.focusIndex].focus = false
      }
      this.lyricData[index].focus = true
      this.focusIndex = index
      this.scrollTo(this.lyricData[index].time)
    },
    loadChords(uri) {
      return axios.get(uri)
        .then(response => {
          this.focusIndex = null
          this.chordData = this.ParseChordData(response.data)
        })
        .catch(error => {
          console.log('ERROR: load chord failed', error)
          var emptyContent = '[{"chord": "N", "start": 0, "end": 0}]'
          this.chordData = JSON.parse(emptyContent)
        })
    }
  }
}