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
    },
    updated () {
    },
    mounted () {
      console.log('mounted')
    },
    methods: {
    }
  }
</script>

<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col class='playBtn'>
        <i-circle 
          :percent="progress*100" 
          :size='this.GLOBAL.calc(30)'
          :trail-width="this.GLOBAL.calc(10)"
          :stroke-width="this.GLOBAL.calc(10)"
          @click.native="togglePlayback"
          >
            <Icon :size="this.GLOBAL.calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
        </i-circle>
      </Col>
      <Col>{{sources[0]}}</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
        <Lyric :lyricSrc='this.lyricFile' ></Lyric>
      </Col>
    </Row>
  </div>

</template>
