<template>
    <p :time='this.lyricData.time' 
       :focus='this.lyricData.focus'
    >
        <span class="chordWrap" >
            <div class="chord" v-for="chord in lyricData.chords" :key="chord.start" :chord="chord.chord"></div>
        </span>
        <span class="lyric" v-html='this.lyricData.lrcText'></span>
    </p>
</template>

<<script>
export default {
  props: {
    lyricData: {}
  }
}
</script>

<<style lang='scss'>

  .chordWrap {
      display: table;
      position:relative;
      top:-20px;
      color: black;
      // line-height:40px;
  }

  .chord {
      display: table-cell;
  }

  .lyric {
      position:relative;
      font-weight: bold;
      font-size:1.0em;
      margin-right:15px;
  }  
</style>

