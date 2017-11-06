<template>
  <div ref='lyric' class='lyricWrap'>
    <ul class='scroller'>
      <p class="lyricRow" v-touch:press="playFromHere" 
        v-touch:swipeleft="onSwipeLeft" 
        v-touch:swiperight="onSwipeRight" 
        :time='lrc.time' 
        v-for="lrc in lyricHtml" 
        :key="lrc.time"
        v-html="lrc.lrcHtml"
        :focus="lrc.focus"
        ></p>
    </ul>
  </div>
</template>

<style lang='scss'>
  .lyricWrap {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    /* -- Attention-- */
    height: 500px; /* 必须要设定该值，否则滚动条不起作用 */
    overflow: hidden;
  }

  .lyricRow {
    line-height:75px;
    font-weight: bold;
    color: #b22222;
    margin-top: 20px;
    margin-left: 34px;
    padding-top: 20px;
    padding-left: 34px;
  }

  .lyricRow[repeat=true] {
    background-color: lightskyblue;
  }

  .lyricRow[repeat=false] {
    background-color: lightseagreen;
  }

  .chordWrap {
      position:relative;
      top:-20px;
      color: black;
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

<script>
import Lyric from './Lyric'

export default {
  mixins: [Lyric]
}
</script>
