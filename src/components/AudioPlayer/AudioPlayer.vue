
<template>
  <div>
    <div class="left-corner">telesoho</div>
    <Lyric data-intro='长按歌词：跳转到该歌词处<br>右划歌词一次：选择重复播放范围的起始歌词<br>右划歌词二次：选择重复播放范围的结束歌词<br>左划歌词：取消播放范围' 
      :chordSrc='this.chordSrc[this.songId].src' :defaultCapo='this.chordSrc[this.songId].capo'
      :lyricSrc='this.lyricSrc[this.songId]'
      :seek='seek' 
      :duration='duration' 
      v-on:playFromHere="playFromHere"></Lyric>
    <BloomMenu ref='menu'>
      <TCircle slot='main'
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
            <Icon :class="this.duration===0?'fa-spin':''" :size="20" :type="playing ? 'pause' : 'play'"></Icon>
      </TCircle>
      <BloomItem ref='loop' slot='BloomItems' name='loop' data-intro='循环方式按钮<BR>点击：循环播放/单曲播放' data-tooltipClass='intro-tooltip-loop'>
        <TButton slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'stop'"></TButton>
      </BloomItem>
      <BloomItem ref='muted' slot='BloomItems' name='muted' data-intro='静音按钮<BR>点击：静音/非静音' data-tooltipClass='intro-tooltip-muted'>
        <TButton slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="toggleMute" :icon="this.$store.state.muted ? 'volume-off' : 'volume-on'"></TButton>
      </BloomItem>
      <BloomItem ref='instruments' slot='BloomItems' name='instruments' data-intro='乐器切换按钮<BR>点击：切换和弦显示方式为吉他或尤克里里' data-tooltipClass='intro-tooltip-instruments'>
        <TButton slot='button' class='blooming-menu__item-btn' ref='instrumentsBtn' type="ghost" shape="circle" v-touch:tap="onChangeInstruments" :icon='this.$store.state.instruments'></TButton>
      </BloomItem>
      <BloomItem ref='help' slot='BloomItems' name='help' data-intro='帮助按钮<BR>点击：显示帮助' data-tooltipClass='intro-tooltip-help'>
        <TButton slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" v-touch:tap="onHelp" icon="help"></TButton>
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


@font-face {font-family: "guitartool";
  src: url('../../assets/iconfont.eot?t=1512737848205'); /* IE9*/
  src: url('../../assets/iconfont.eot?t=1512737848205#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('../../assets/iconfont.ttf?t=1512737848205') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../../assets/iconfont.svg?t=1512737848205#guitartool') format('svg'); /* iOS 4.1- */
}

.icon {
  font-family:"guitartool" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-guitar:before { content: "\e601"; }

.icon-ukulele:before { content: "\e602"; }

.icon-loop:before { content: "\e603"; }

.icon-pause:before { content: "\e604"; }

.icon-play:before { content: "\e605"; }

.icon-volume-off:before { content: "\e606"; }

.icon-volume-on:before { content: "\e607"; }

.icon-stop:before { content: "\e608"; }

.icon-help:before { content: "\e609"; }

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8);
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>

<script src="./AudioPlayer.js"></script>
