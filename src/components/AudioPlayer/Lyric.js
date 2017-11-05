import jtab from './jtab'
import axios from 'axios'
import LyricParser from './LyricParser'
import _ from 'underscore'
import * as utils from '../../utils/utils'

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
      lyricData: [{
        time: 0,
        lrcHtml: ''
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
    seek (newValue, oldValue) {
      var self = this
      var getTime = function (index) {
        if (index >= self.lyricData.length) {
          index = self.lyricData.length - 1
        }
        return self.lyricData[index].time
      }

      var scrollTo = function (showTime) {
        if (!showTime) {
          return
        }
        var qs = `.lyricRow[time='${showTime}']`
        var e = self.$refs.lyric.querySelector(qs)
        self.iscroll.scrollToElement(e, 1000, null, true)
      }

      if (!this.showingTime) {
        this.showingTime = getTime(0)
      }

      if (Math.abs(newValue - this.showingTime) > 1) {
        for (var i = this.lyricData.length - 1; i > 0; i--) {
          var lrc = this.lyricData[i]
          if (newValue >= lrc.time) {
            var newShowingTime = getTime(i)
            if (newShowingTime !== this.showingTime) {
              this.showingTime = newShowingTime
              scrollTo(newShowingTime)
            }
            return
          }
        }
      }
    }
  },
  updated () {
    if (this.lyricData.length > 0) {
      jtab.renderChord(this.$refs.lyric)
      this.iscroll.refresh()
    }
  },
  methods: {
    loadLyric (uri) {
      return axios.get(uri)
        .then(response => {
          var lyricContent = response.data
          this.lyricData = LyricParser.parse(lyricContent)
        })
        .catch(error => {
          console.log(error)
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
      this.clearRepeat(this.repeat)
      this.repeat = newRepeat
      this.showRepeat()
    },
    onPanRight (ev) {
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
      console.log('onPanRight', newRepeat.start, newRepeat.end)
      this.setNewRepeat(newRepeat)
    },
    clearRepeat (range) {
      if (range.start === -1) {
        return
      }
      if (range.end === -1) {
        // Only one line for prepare to repeat
        this.removeAttributeByTime(range.start, 'repeat')
        return
      }
      for (var i = 0; i < this.lyricData.length; i++) {
        var theTime = this.lyricData[i].time
        if (theTime > range.end) {
          break
        } else if (theTime >= range.start) {
          this.removeAttributeByTime(theTime, 'repeat')
        }
      }
    },
    onPanLeft (ev) {
      console.log('swipe left to clean repeat')
      this.clearRepeat(this.repeat)
      this.repeat.start = -1
      this.repeat.end = -1
    },
    playFromHere (ev) {
      // 寻找包含time属性的节点
      var timeElement = this.getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      var strTime = timeElement.getAttribute('time')
      var time = Number(strTime)
      this.$emit('playFromHere', time)
    }
  }
}
