
<template>
  <div ref='lyric' class='lyricWrap'>
    <ul class='scroller'>
      <p class="lyricRow" v-touch:press="playFromHere" v-touch:swipeleft="onPanLeft" v-touch:swiperight="onPanRight" :time='lrc.time' v-for="lrc in lyricHtml" :key="lrc.time" v-html="lrc.lrcHtml">
      </p>
    </ul>
  </div>
</template>

<script>
  import jtab from '../class/jtab'
  import axios from 'axios'
  import LyricParser from '../class/LyricParser'

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
</script>

<style lang='scss'>
  .lyricWrap {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    /* -- Attention-- */
    height: 500px; /* 必须要设定该值，否则滚动条不起作用 */
    overflow: hidden;
  }

  .lyricRow {
    line-height:75px;
    font-weight: bold;
    color: #b22222;
    margin-top: 20px;
    margin-left: 34px;
  }

  .repeat {
    background-color: lightskyblue;
  }

  .chordWrap {
      position:relative;
      top:-20px;
      color: black;
      line-height:40px;
  }

  .lyric {
      position:relative;
      margin-left:-30px;
      font-weight: bold;
      font-size:1.0em;
      margin-right:15px;
  }

</style>