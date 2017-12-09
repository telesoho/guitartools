import renderUkuleleChord from '../../class/ukulele_chart'
import renderGuitarChord from '../../class/guitar_chart'
import axios from 'axios'
import LyricParser from './LyricParser'
import _ from 'underscore'
import * as utils from '../../utils/utils'
import LyricRow from './LyricRow.vue'
import Vue from 'vue'
// import anime from 'animejs'

function getContainTimeAttrElement (targetElement) {
  while (targetElement && !targetElement.getAttribute('time')) {
    targetElement = targetElement.parentElement
  }
  return targetElement
}

export default {
  props: {
    lyricSrc: [String],
    chordSrc: [String],
    seek: Number,
    duration: Number,
    height: {
      type: Number,
      default: screen.height
    }
  },
  components: {
    LyricRow
  },
  data () {
    return {
      focusIndex: 0,
      lyricData: [{
        time: 0,
        chords: [],
        lrcText: '',
        focus: false
      }],
      repeat: {
        startIndex: -1,
        endIndex: -1
      }
    }
  },
  created () {
    this.loadLyric(this.lyricSrc, this.chordSrc)
  },
  mounted () {
    if (!this.iscroll) {
      const IScroll = this.$IScroll
      this.iscroll = new IScroll(this.$refs.lyric, {
        mouseWheel: true,
        scrollbars: true
      })
    }
  },
  computed: {
    instruments () {
      return this.$store.state.instruments
    },
    lyricHtml () {
      return this.lyricData
    },
    lyricHeight () {
      return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
    }
  },
  watch: {
    instruments (newValue, oldValue) {
      this.renderChords(true)
      Vue.store.commit('setChordRendering', false)
    },
    seek (newValue, oldValue) {
      if (this.focusIndex === null) {
        this.focusIndex = 0
      }
      /* While time changed bigger than one second trigger scroll */
      var focusTime = this.lyricData[this.focusIndex].time
      if (this.repeat.endIndex !== -1 && this.repeat.startIndex !== -1) {
        if (this.focusIndex < this.repeat.startIndex || this.focusIndex > this.repeat.endIndex) {
          this.focusIn(this.repeat.startIndex)
          this.$emit('playFromHere', this.lyricData[this.repeat.startIndex].time)
          return
        }
      }

      if (Math.abs(newValue - focusTime) > 1) {
        for (var i = this.lyricData.length - 1; i >= 0; i--) {
          var lrc = this.lyricData[i]
          if (newValue >= lrc.time) {
            return this.focusIn(i)
          }
        }
      }
    }
  },
  updated () {
    this.renderChords()
  },
  methods: {
    getNextLyricTime (currentTime) {
      for (var i = this.lyricData.length - 1; i > 0; i--) {
        var lrc = this.lyricData[i]
        if (currentTime >= lrc.time) {
          var next = i + 1
          if (next === this.lyricDat.length) {
            return this.duration
          }
          return this.lyricData[i].time
        }
      }
    },
    getElementByTime (time) {
      var qs = `.lyricRow[time='${time}']`
      var e = this.$refs.lyric.querySelector(qs)
      if (!e) {
        console.log('ERROR: Cannot find the time in lyric')
        return null
      }
      return e
    },
    scrollTo (showTime) {
      if (showTime === null) {
        return
      }
      var e = this.getElementByTime(showTime)
      this.iscroll.scrollToElement(e, 1000, null, -100, this.$IScroll.utils.ease.circular)
    },
    focusIn (index) {
      if (index < 0 || index >= this.lyricData.length ||
        this.focusIndex === index) {
        return
      }
      if (this.focusIndex !== null) {
        this.lyricData[this.focusIndex].focus = false
      }
      this.lyricData[index].focus = true
      this.focusIndex = index
      this.scrollTo(this.lyricData[index].time)
    },
    loadLyric (lyricSrc, chordSrc) {
      return axios.get(lyricSrc)
        .then(response => {
          var lyricContent = response.data
          this.focusIndex = null
          axios.get(chordSrc).then(response => {
            this.lyricData = LyricParser.parse(lyricContent, response.data)
          }).catch(error => {
            console.log('ERROR: load chord failed', error)
            this.lyricData = LyricParser.parse(lyricContent, '')
          })
        })
        .catch(error => {
          console.log('ERROR: load lyric failed', error)
          var lyricContent = '[00:00.00]Not available'
          this.lyricData = LyricParser.parse(lyricContent, '')
        })
    },
    setAttributeByTime (time, attr, value) {
      var qs = `.lyricRow[time='${time}']`
      var e = this.$refs.lyric.querySelector(qs)
      if (!e) {
        console.log('ERROR: Cannot find the time in lyric')
        return
      }
      utils.setAttribute(e, attr, value)
    },
    removeAttributeByTime (time, attr) {
      var qs = `.lyricRow[time='${time}']`
      var e = this.$refs.lyric.querySelector(qs)
      if (!e) {
        console.log('ERROR: Cannot find the time in lyric')
        return
      }
      utils.removeAttribute(e, attr)
    },
    showRepeat () {
      if (this.repeat.startIndex === -1) {
        return
      }
      if (this.repeat.endIndex === -1) {
        // draw one line of start
        this.setAttributeByTime(this.lyricData[this.repeat.startIndex].time, 'repeat', false)
        return
      }
      for (var i = this.repeat.startIndex; i <= this.repeat.endIndex; i++) {
        this.setAttributeByTime(this.lyricData[i].time, 'repeat', true)
      }
    },
    setNewRepeat (newRepeat) {
      this.clearAttrib('repeat')
      this.repeat = newRepeat
      this.showRepeat()
    },
    onSwipeRight (ev) {
      var timeElement = getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      var theTime = Number(timeElement.getAttribute('time'))
      var indexOfSwipLyric = _.findIndex(this.lyricData, {time: theTime})
      if (indexOfSwipLyric === -1) {
        console.log('ERROR: Cannot found index of element time')
        return
      }
      var newRepeat = this.repeat
      if (newRepeat.startIndex === -1) {
        /* repeat start index has not been set */
        newRepeat.startIndex = indexOfSwipLyric
      } else if (newRepeat.endIndex === -1) {
        /* repeat end index has not been set */
        newRepeat.endIndex = indexOfSwipLyric
        if (newRepeat.endIndex < newRepeat.startIndex) {
          /* endIndex <=> startIndex */
          newRepeat.endIndex = newRepeat.startIndex
          newRepeat.startIndex = indexOfSwipLyric
        }
      } else {
        /* startIndex and endIndex has been set */
        // 保证连续区域为优先策略，减轻用户记忆
        if (indexOfSwipLyric < newRepeat.startIndex) {
          newRepeat.startIndex = indexOfSwipLyric
        } else if (indexOfSwipLyric > newRepeat.endIndex) {
          newRepeat.endIndex = indexOfSwipLyric
        } else if (indexOfSwipLyric <= newRepeat.endIndex) {
          newRepeat.startIndex = indexOfSwipLyric
        }
      }
      this.setNewRepeat(newRepeat)
    },
    clearAttrib  (attrib) {
      for (var i = 0; i < this.lyricData.length; i++) {
        var theTime = this.lyricData[i].time
        this.removeAttributeByTime(theTime, attrib)
      }
    },
    onSwipeLeft (ev) {
      this.clearAttrib('repeat')
      this.repeat.startIndex = -1
      this.repeat.endIndex = -1
    },
    playFromHere (ev) {
      // 寻找包含time属性的节点
      var timeElement = getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      var strTime = timeElement.getAttribute('time')
      var time = Number(strTime)
      this.$emit('playFromHere', time)
    },
    renderChords (rerender = false) {
      if (this.lyricData.length > 0) {
        if (this.$store.state.instruments === 'ukulele') {
          renderUkuleleChord(this.$refs.lyric, rerender)
        } else if (this.$store.state.instruments === 'guitar') {
          renderGuitarChord(this.$refs.lyric, rerender)
        }
        this.iscroll.refresh()
      }
    }
  }
}
