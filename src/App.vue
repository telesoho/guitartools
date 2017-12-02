<template>
  <div id="app">
    <AudioPlayer :sources="audioSources" :lyricFile='lyricFile' :chordFile='chordFile'></AudioPlayer>
  </div>
</template>
<script>
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'

export default {
  name: 'app',
  data () {
    return {
      audioSources: ['https://raw.githubusercontent.com/telesoho/guitartools/hscroll/static/%E5%8D%83%E4%BD%8F%E6%98%8E-%E6%B6%99%E3%81%9D%E3%81%86%E3%81%9D%E3%81%86.mp3'],
      lyricFile: './static/千住明-涙そうそう.1.lrc',
      chordFile: './static/song.chord.json'
    }
  },
  components: {
    AudioPlayer
  },
  methods: {
  }
}
</script>

<style>
body {
user-select: none;
}

</style>
