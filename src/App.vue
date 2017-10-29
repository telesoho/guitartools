<template>
  <div id="app">
    <MusicSprite sprite='one'></MusicSprite>
    <MusicSprite sprite='two'></MusicSprite>
    <MusicSprite sprite='three'></MusicSprite>
    <MusicSprite sprite='four'></MusicSprite>
    <MusicSprite sprite='five'></MusicSprite>
    <MusicSprite sprite='beat'></MusicSprite>

    <AudioPlayer :sources="audioSources"></AudioPlayer>
  </div>


</template>

<script>
import MusicSprite from './components/MusicSprite.vue'
import AudioPlayer from './components/AudioPlayer.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      audioSources: [
        './static/Idina Menzel - Let It Go.mp3'
      ]
    }
  },
  components: {
    MusicSprite, AudioPlayer
  },
  methods: {
    say (message) {
      alert(message)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
