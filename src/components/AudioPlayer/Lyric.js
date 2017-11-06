import jtab from './jtab'
import axios from 'axios'
import LyricParser from './LyricParser'
import _ from 'underscore'
import * as utils from '../../utils/utils'
import animate from 'velocity-animate'

function getContainTimeAttrElement (targetElement) {
  while (targetElement && !targetElement.getAttribute('time')) {
    targetElement = targetElement.parentElement
  }
  return targetElement
}

export default {
  props: {
    lyricSrc: [String],
    seek: Number
  },
  data () {
    return {
      focusIndex: null,
      lyricData: [{
        time: 0,
        lrcHtml: '',
        focus: false
      }],
      repeat: {
        start: -1,
        end: -1
      }
    }
  },
  created () {
    this.loadLyric(this.lyricSrc)
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
    lyricHtml () {
      return this.lyricData
    }
  },
  watch: {
    // lyricData: {
    //   handle: function (newValue, oldValue) {
    //     console.log('lyricData changed', newValue, oldValue)
    //   },
    //   deep: true
    // },
    seek (newValue, oldValue) {
      if (this.focusIndex === null) {
        return this.focusIn(0)
      }

      /* While time changed bigger than one second trigger scroll */
      var focusTime = this.lyricData[this.focusIndex].time
      if (Math.abs(newValue - focusTime) > 1) {
        for (var i = this.lyricData.length - 1; i > 0; i--) {
          var lrc = this.lyricData[i]
          if (newValue >= lrc.time) {
            return this.focusIn(i)
          }
        }
      }
    }
  },
  updated () {
    if (this.lyricData.length > 0 && this.focusIndex === null) {
      jtab.renderChord(this.$refs.lyric)
      this.iscroll.refresh()
    }
  },
  methods: {
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
      if (!showTime) {
        return
      }
      var qs = `.lyricRow[time='${showTime}']`
      var e = this.$refs.lyric.querySelector(qs)
      this.iscroll.scrollToElement(e, 1000, null, true)
    },
    focusIn (index) {
      if (index < 0 || index >= this.lyricData.length ||
        this.focusIndex === index) {
        return
      }
      console.log(this.focusIndex, index)
      if (this.focusIndex !== null) {
        this.lyricData[this.focusIndex].focus = false
        var e = this.getElementByTime(this.lyricData[this.focusIndex].time)
        animate(e,
          {scale: 1}, 200
        )
      }
      this.lyricData[index].focus = true
      this.focusIndex = index
      this.scrollTo(this.lyricData[index].time)
      e = this.getElementByTime(this.lyricData[this.focusIndex].time)
      animate(e,
        {scale: 1.05}, 500
      )
    },
    loadLyric (uri) {
      return axios.get(uri)
        .then(response => {
          var lyricContent = response.data
          this.focusIndex = null
          this.lyricData = LyricParser.parse(lyricContent)
        })
        .catch(error => {
          console.log('ERROR: load lyric failed', error)
          var lyricContent = '[00:00.00]Not available'
          this.lyricData = LyricParser.parse(lyricContent)
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
      if (this.repeat.start === -1) {
        return
      }
      if (this.repeat.end === -1) {
        // draw one line of start
        this.setAttributeByTime(this.repeat.start, 'repeat', false)
        return
      }
      for (var i = 0; i < this.lyricData.length; i++) {
        var theTime = this.lyricData[i].time
        if (theTime > this.repeat.end) {
          break
        } else if (theTime >= this.repeat.start) {
          this.setAttributeByTime(theTime, 'repeat', true)
        }
      }
    },
    setNewRepeat (newRepeat) {
      this.clearAttrib('repeat')
      this.repeat = newRepeat
      this.showRepeat()
    },
    onSwipeRight (ev) {
      console.log('swipe right to mark for repeating')
      var timeElement = getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      var theTime = Number(timeElement.getAttribute('time'))
      var indexOfStart = _.findIndex(this.lyricData, {time: theTime})
      if (indexOfStart === -1) {
        console.log('ERROR: Cannot found index of element time')
        return
      }
      var newRepeat = this.repeat
      if (newRepeat.start === -1) {
        newRepeat.start = theTime
      } else if (theTime === newRepeat.start || theTime === newRepeat.end) {
        // Same of start and end repeat time will do nothing.
        return
      } else if (newRepeat.end === -1) {
        newRepeat.end = theTime
        if (newRepeat.end < newRepeat.start) {
          newRepeat.end = newRepeat.start
          newRepeat.start = theTime
        }
      } else {
        // 保证连续区域为优先策略，减轻用户记忆
        if (theTime < newRepeat.start) {
          newRepeat.start = theTime
        } else if (theTime > newRepeat.end) {
          newRepeat.end = theTime
        } else if (theTime < newRepeat.end) {
          newRepeat.start = theTime
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
      console.log('swipe left to clean repeat')
      this.clearAttrib('repeat')
      this.repeat.start = -1
      this.repeat.end = -1
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
    }
  }
}
