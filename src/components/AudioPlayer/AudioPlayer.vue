
<template>
  <div>
    <div class="left-corner">telesoho</div>

    <Lyric :lyricSrc='this.lyricFile' :seek='seek' v-on:playFromHere="playFromHere"></Lyric>
    <BloomMenu ref='menu'>
      <i-circle slot='main'
          :percent="progress*100" 
          :size='50'
          :trail-width="10"
          :stroke-width="10"
          v-touch:tap="togglePlayback"
          >
            <Icon :size="20" :type="playing ? 'pause' : 'play'" ></Icon>
      </i-circle>
      <BloomItem ref='loop' slot='BloomItems' name='loop'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'refresh'"></Button>
      </BloomItem>
      <BloomItem ref='muted' slot='BloomItems' name='muted'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleMute" :icon="this.$store.state.muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </BloomItem>
      <BloomItem ref='help' slot='BloomItems' name='help'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" icon="help"></Button>
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
</style>

<script>
import AudioPlayer from './AudioPlayer.js'

export default {
  mixins: [AudioPlayer]
}
</script>

