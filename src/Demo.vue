<template>
  <div id="app">
    <AudioPlayer :sources="audioSources"></AudioPlayer>
  </div>
</template>
<script>
import AudioPlayer from './components/AudioPlayer.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      audioSources: [
        // './static/Idina Menzel - Let It Go.mp3',
        './static/千住明-涙そうそう.mp3'
      ]
    }
  },
  components: {
    AudioPlayer
  },
  methods: {
  }
}
</script>
