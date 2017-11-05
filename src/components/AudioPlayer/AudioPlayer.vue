
<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col class='playBtn'>
        <!-- <i-circle 
          :percent="progress*100" 
          :size='this.$calc(30)'
          :trail-width="this.$calc(10)"
          :stroke-width="this.$calc(10)"
          @click.native="togglePlayback"
          >
            <Icon :size="this.$calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
        </i-circle> -->
        <Button type="ghost" shape="circle" @click.native="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'refresh'"></Button>
        <Button type="ghost" shape="circle" @click.native="toggleMute" :icon="this.$store.state.muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </Col>
      <Col>{{songTitle}}</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
        <Lyric :lyricSrc='this.lyricFile' :seek='seek' v-on:playFromHere="playFromHere"></Lyric>
      </Col>
    </Row>
    <BloomMenu style=".blooming-menu">
      <i-circle slot='main'
          :percent="progress*100" 
          :size='this.$calc(30)'
          :trail-width="this.$calc(10)"
          :stroke-width="this.$calc(10)"
          v-touch:tap="togglePlayback"
          >
            <Icon :size="this.$calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
      </i-circle>
      <BloomItem slot='BloomItems' name='loop'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleLoop" :icon="this.$store.state.beLoop ? 'loop' : 'refresh'"></Button>
      </BloomItem>
      <BloomItem slot='BloomItems' name='muted'>
        <Button slot='button' class='blooming-menu__item-btn' type="ghost" shape="circle" @click.native="toggleMute" :icon="this.$store.state.muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </BloomItem>
    </BloomMenu>
  </div>
</template>

<style lang='scss'>
  .blooming-menu {
    left: 90%;
    top: 90%;
    bottom: 0px;
    position: absolute;
  }
</style>

<script>
import AudioPlayer from './AudioPlayer.js'

export default {
  mixins: [AudioPlayer]
}
</script>

