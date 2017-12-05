<template>
    <p :time='this.lyricData.time' :focus='this.lyricData.focus'>
        <span class="chordWrap" >
            <Chord v-for="chord in lyricData.chords" :key="chord.start" :chord='chord'></Chord>
        </span>
        <span class="lyric" v-html='this.lyricData.lrcText'></span>
    </p>
</template>

<script>
import Chord from './Chord.vue'

export default {
  props: {
    lyricData: {}
  },
  components: {
    'Chord': Chord
  }
}
</script>

<style lang='scss'>

  .chordWrap {
      display: flex;
      position:relative;
      top:-20px;
      color: black;
      flex-wrap:wrap;
      // line-height:40px;
  }

  .lyric {
      position:relative;
      font-weight: bold;
      font-size:1.0em;
      margin-right:15px;
  }  
</style>

