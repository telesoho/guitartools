<template>
  <div id="app">
    <AudioPlayer :songSrc="songSrc" :defaultSongId='defaultSongId' :lyricSrc='lyricSrc' :chordSrc='chordSrc'></AudioPlayer>
  </div>
</template>
<script>
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'

export default {
  name: 'app',
  data () {
    return {
      songSrc: [
        'https://raw.githubusercontent.com/telesoho/guitartools/master/docs/static/千住明-涙そうそう.mp3',
        './static/島唄.mp3'],
      lyricSrc: [
        './static/千住明-涙そうそう.lrc',
        './static/島唄.xtrc'
      ],
      chordSrc: [
        './static/千住明-涙そうそう.chord.json',
        './static/島唄.chord.json'
      ]
    }
  },
  computed: {
    defaultSongId () {
      console.log(this.$route.params.songid)
      return parseInt(this.$route.params.songid)
    }
  },
  components: {
    AudioPlayer
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style>
article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 0;
    display: block;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #495060;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
}
</style>
