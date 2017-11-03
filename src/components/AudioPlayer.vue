<script>
  import VueHowler from '../class/VueHowler'
  import Lyric from './Lyric.vue'

  export default {
    props: {
      'lyricFile': ''
    },
    mixins: [VueHowler],
    components: { Lyric },
    data () {
      return {
        lyric: ''
      }
    },
    created () {
      console.log('created')
    },
    watch: {
    },
    computed: {
      songTitle () {
        return this.sources[0]
      }
    },
    updated () {
    },
    mounted () {
      console.log('mounted')
    },
    methods: {
      playFromHere (time) {
        this.setSeek(time)
        this.play()
      }
    }
  }
</script>

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
  </div>

</template>
