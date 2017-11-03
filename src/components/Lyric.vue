
<template>
  <div ref='lyric'>
    <ul class="lyricRow" v-for="lrc in lyricHtml" :key="lrc.time" v-html="lrc.lrcHtml">
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
        lyricContent: ''
      }
    },
    created () {
      axios.get(this.lyricSrc)
        .then(response => {
          this.lyricContent = response.data
        })
        .catch(error => {
          console.log(error)
          this.lyricContent = '[00:00.00]Not available'
        })
    },
    computed: {
      lyricHtml () {
        var html = LyricParser.parse(this.lyricContent)
        return html
      }
    },
    updated () {
      console.log('lyric updated')
      if (this.lyricContent.length > 0) {
        jtab.renderChord(this.$refs.lyric)
      }
    },
    method: {
      loadLyric (uri) {
        return axios.get(uri)
          .then(response => {
            this.lyricContent = response.data
          })
          .catch(error => {
            console.log(error)
            this.lyricContent = '[00:00.00]Not available'
          })
      }
    }
  }
</script>


<style>
    .lyricRow {
        line-height:75px;
        font-weight: bold;
        color: #b22222;
        margin-top: 20px;
        margin-left: 34px;
    }

    .chordWrap {
        position:relative;
        top:-20px;color: black;
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