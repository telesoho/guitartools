<template>
  <div ref='lyric' class='lyricWrap' :style="{'height': lyricHeight + 'px'}">
    <ul class='scroller' >
      <p class="lyricRow" v-touch:press="playFromHere" 
        v-touch:swipeleft="onSwipeLeft" 
        v-touch:swiperight="onSwipeRight" 
        :time='lrc.time' 
        v-for="lrc in lyricHtml" 
        :key="lrc.time"
        v-html="lrc.lrcHtml"
        :focus="lrc.focus"
        ></p>
        <p class="lyricRow">-- 让子弹飞一会儿 --</p>
    </ul>
  </div>
</template>

<style lang='scss'>
  .lyricWrap {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    /* -- Attention-- */
    overflow: hidden;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .scroller {
    // padding-bottom: 350px;
  }  

  .lyricRow {
    line-height: 10px;
    font-weight: bold;
    color: #b22222;
    // margin-left: 34px;
    margin-bottom: -10px;
    padding-top: 20px;
    padding-left: 34px;
    transform: scale(0.8);
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
