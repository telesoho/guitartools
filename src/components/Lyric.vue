
<template>
  <div ref='lyric' class='lyricWrap'>
    <ul class='scroller'>
      <p class="lyricRow" v-for="lrc in lyricHtml" :key="lrc.time" v-html="lrc.lrcHtml">
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
      lyricSrc: [String]
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
      }
    }
  }
</script>


<style>
  .lyricWrap {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    /* -- Attention-- */
    height: 400px; /* 必须要设定该值，否则滚动条不起作用 */
    overflow: hidden;
  }

  .lyricRow {
      line-height:75px;
      font-weight: bold;
      color: #b22222;
      margin-top: 20px;
      margin-left: 34px;
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