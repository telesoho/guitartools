<template>
  <div id="app">
    <AudioPlayer :sources="audioSources" :lyricFile='lyricFile'></AudioPlayer>
    <BloomMenu></BloomMenu>
  </div>
</template>
<script>
import AudioPlayer from './components/AudioPlayer.vue'
import BloomMenu from './components/BloomMenu.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      audioSources: ['./static/千住明-涙そうそう.mp3'],
      lyricFile: './static/千住明-涙そうそう.lrc'
    }
  },
  components: {
    AudioPlayer, BloomMenu
  },
  methods: {
  }
}
</script>
