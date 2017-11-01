<template>
  <div id="app">
    <AudioPlayer :sources="audioSources" :lyricFile='lyricFile'></AudioPlayer>
  </div>
</template>
<script>
import AudioPlayer from './components/AudioPlayer.vue'

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
    AudioPlayer
  },
  methods: {
  }
}
</script>
