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
      audioSources: ['./static/千住明-涙そうそう.mp3'],
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
