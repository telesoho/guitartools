import jtab from './jtab'
import axios from 'axios'
import LyricParser from './LyricParser'

export default {
  props: {
    lyricSrc: [String],
    seek: Number
  },
  data () {
    return {
      lyricData: []
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
    getContainTimeAttrElement (targetElement) {
      while (targetElement && !targetElement.getAttribute('time')) {
        targetElement = targetElement.parentElement
      }
      return targetElement
    },
    onPanRight (ev) {
      console.log(ev)
      var timeElement = this.getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      this.$toggleClass(timeElement, 'repeat')
    },
    onPanLeft (ev) {
      console.log(ev)
      var timeElement = this.getContainTimeAttrElement(ev.target)
      if (!timeElement) {
        return
      }
      this.$toggleClass(timeElement, 'repeat')
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
