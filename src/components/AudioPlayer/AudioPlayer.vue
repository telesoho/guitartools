
<template>
  <div>
    <div class="left-corner">telesoho</div>
    <Lyric data-intro='长按歌词：跳转到该歌词处<br>右划歌词一次：选择重复播放范围的起始歌词<br>右划歌词二次：选择重复播放范围的结束歌词<br>左划歌词：取消播放范围' 
      :chordSrc='this.chordSrc' 
      :lyricSrc='this.lyricSrc' 
      :seek='seek' 
      :duration='duration' 
      v-on:playFromHere="playFromHere"></Lyric>
    <BloomMenu ref='menu'>
      <i-circle slot='main'
          :percent="progress * 100" 
          :size='50'
          :trail-width="10"
          :stroke-width="10"
          v-touch:tap="togglePlayback"
          data-disable-interaction='false'
          data-highlightClass='intro-highlight'
          data-tooltipClass='intro-tooltip-play'
          data-intro='播放按钮<BR>长按：显示/隐藏菜单<br>点击：播放/暂停'
          >
            <Icon :size="20" :type="playing ? 'pause' : 'play'"></Icon>
      </i-circle>
      <BloomItem ref='loop' slot='BloomItems' name='loop' data-intro='循环方式按钮<BR>点击：循环播放/单曲播放' data-tooltipClass='intro-tooltip-loop'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'refresh'"></Button>
      </BloomItem>
      <BloomItem ref='muted' slot='BloomItems' name='muted' data-intro='静音按钮<BR>点击：静音/非静音' data-tooltipClass='intro-tooltip-muted'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="toggleMute" :icon="this.$store.state.muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </BloomItem>
      <BloomItem ref='instruments' slot='BloomItems' name='instruments' data-intro='乐器切换按钮<BR>点击：切换和弦显示方式为吉他或尤克里里' data-tooltipClass='intro-tooltip-instruments'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="onChangeInstruments" :icon='this.$store.state.instruments'></Button>
      </BloomItem>
      <BloomItem ref='help' slot='BloomItems' name='help' data-intro='帮助按钮<BR>点击：显示帮助' data-tooltipClass='intro-tooltip-help'>
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
  color: white !important;
}

.intro-highlight {
  display: none;
}

.intro-tooltip-play {
  transform: translate(-10px, -10px)
}

.intro-tooltip-loop {
  transform: translate(-50px, 0px)
}

.intro-tooltip-muted {
  transform: translate(-43px, -25px)
}

.intro-tooltip-instruments {
  transform: translate(-25px, -43px)
}

.intro-tooltip-help {
  transform: translate(0px, -50px)
}

.introjs-helperLayer {
  display: none
}


@font-face {font-family: "iconfont";
  src: url('../../assets/iconfont.eot?t=1512217235554'); /* IE9*/
  src: url('../../assets/iconfont.eot?t=1512217235554#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('../../assets/iconfont.ttf?t=1512217235554') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../../assets/iconfont.svg?t=1512217235554#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ivu-icon-guitar:before { 
  content: "\e613"; 
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
}

.ivu-icon-guitar1:before { 
  content: "\e6bf"; 
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ivu-icon-ukulele1:before {
  content: "\e601";
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ivu-icon-ukulele:before {
  content: "\e9e3"; 
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



</style>

<script src="./AudioPlayer.js"></script>
