<template>
  <div ref='lyric' class='lyricWrap' :style="{'height': lyricHeight + 'px'}">
    <ul class='scroller' >
      <LyricRow class="lyricRow"
        v-touch:press="playFromHere" 
        v-touch:swipeleft="onSwipeLeft" 
        v-touch:swiperight="onSwipeRight" 
        v-for="lrc in lyricHtml" 
        :key="lrc.time"
        :lyricData="lrc"
        >
        </LyricRow>
        <p class="lyricRow">-- 让子弹先飞一会儿 --</p>
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

  .lyricRow {
    line-height: 10px;
    font-weight: bold;
    color: #b22222;
    // margin-left: 34px;
    padding-top: 20px;
    // padding-left: 34px;
    transform: scale(0.9);
  }

  .lyricRow[focus=true] {
    transform: scale(1);
  }

  .lyricRow[repeat=true] {
    background-color: lightskyblue;
  }

  .lyricRow[repeat=false] {
    background-color: lightseagreen;
  }



</style>

<script src='./Lyric.js'></script>
