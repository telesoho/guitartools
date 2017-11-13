
<template>
  <div>
    <div class="left-corner">telesoho</div>

    <Lyric data-intro='长按歌词：跳转到该歌词处<br>右划歌词一次：选择重复播放范围的起始歌词<br>右划歌词二次：选择重复播放范围的结束歌词<br>左划歌词：取消播放范围' :lyricSrc='this.lyricFile' :seek='seek' :duration='duration' v-on:playFromHere="playFromHere"></Lyric>
    <BloomMenu ref='menu'>
      <i-circle slot='main'
          :percent="progress*100" 
          :size='50'
          :trail-width="10"
          :stroke-width="10"
          v-touch:tap="togglePlayback"
          data-disable-interaction='false'
          data-highlightClass='intro-highlight'
          data-tooltipClass='intro-tooltip-play'
          data-intro='长按：显示/隐藏菜单<br>点击：播放/暂停'
          >
            <Icon :size="20" :type="playing ? 'pause' : 'play'"></Icon>
      </i-circle>
      <BloomItem ref='loop' slot='BloomItems' name='loop' data-intro='点击：循环播放/单曲播放' data-tooltipClass='intro-tooltip-loop'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'refresh'"></Button>
      </BloomItem>
      <BloomItem ref='muted' slot='BloomItems' name='muted' data-intro='点击：静音/非静音' data-tooltipClass='intro-tooltip-muted'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleMute" :icon="this.$store.state.muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </BloomItem>
      <BloomItem ref='help' slot='BloomItems' name='help' data-intro='点击：显示帮助' data-tooltipClass='intro-tooltip-help'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="onHelp" icon="help"></Button>
      </BloomItem>
    </BloomMenu>
  </div>
</template>

<style lang='scss'>
.left-corner {
  font-size: 10px;
  line-height: 1.5em;
  width: 7em;
  background: orange;
  position: absolute;
  left: 0;
  top: 0;
  z-Index: 2;
  transform-origin: right bottom;
  transform: translate(-29.29%,-100%) rotate(-45deg);
  text-indent: 0;
  text-align: center;  
}

.blooming-menu__item-btn {
  color: white
}

.intro-highlight {
  display: none
}

.intro-tooltip-play {
  transform: translate(-10px, -10px)
}

.intro-tooltip-loop {
  transform: translate(-50px, 0px)
}

.intro-tooltip-muted {
  transform: translate(-35px, -35px)
}

.intro-tooltip-help {
  transform: translate(0px, -50px)
}

.introjs-helperLayer {
  display: none
}
</style>

<script src="./AudioPlayer.js"></script>
