
<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col class='playBtn'>
        <i-circle 
          :percent="progress*100" 
          :size='this.$calc(30)'
          :trail-width="this.$calc(10)"
          :stroke-width="this.$calc(10)"
          @click.native="togglePlayback"
          >
            <Icon :size="this.$calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
        </i-circle>
        <Button type="ghost" shape="circle" @click.native="toggleLoop" :icon="beLoop ? 'loop' : 'refresh'"></Button>
        <Button type="ghost" shape="circle" @click.native="toggleMute" :icon="muted ? 'android-volume-off' : 'android-volume-up'"></Button>
      </Col>
      <Col>{{songTitle}}</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
        <Lyric :lyricSrc='this.lyricFile' :seek='seek' v-on:playFromHere="playFromHere"></Lyric>
      </Col>
    </Row>
    <BloomMenu>
      <i-circle slot='main'
          :percent="progress*100" 
          :size='this.$calc(30)'
          :trail-width="this.$calc(10)"
          :stroke-width="this.$calc(10)"
          v-touch:tap="togglePlayback"
          >
            <Icon :size="this.$calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
      </i-circle>
      <li slot='item' class="blooming-menu__item" style="opacity: 1; display: block;">
        <div class="blooming-menu__item-btn-wrapper">
          <button class="blooming-menu__item-btn"></button>
        </div>
      </li>
      <li slot='item' class="blooming-menu__item" style="opacity: 1; display: block;">
        <div class="blooming-menu__item-btn-wrapper">
          <button class="blooming-menu__item-btn"></button>
        </div>
      </li>
    </BloomMenu>
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer.js'

export default {
  mixins: [AudioPlayer]
}
</script>


<style lang='scss'>
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body .blooming-menu__container {
    left: 90%;
    top: 90%;
    bottom: 0px;
    position: absolute;
  }
  .blooming-menu__item:nth-of-type(1) .blooming-menu__item-btn {
    background-image: url(/static/get-app.svg);
    background-size: 35%;
  }
  .blooming-menu__item:nth-of-type(2) .blooming-menu__item-btn {
    background-image: url(/static/grade.svg);
  }
  .blooming-menu__item:nth-of-type(3) .blooming-menu__item-btn {
    background-image: url(/static/home.svg);
  }
  .blooming-menu__item:nth-of-type(4) .blooming-menu__item-btn {
    background-image: url(/static/lock.svg);
    background-size: 35%;
  }
  .blooming-menu__item-btn:hover {
    box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);
    opacity: 1;
  }
</style>