<script>
  import jtab from '../class/jtab'
  import VueHowler from '../class/VueHowler'
  import Lyric from '../class/Lyric'
  import axios from 'axios'

  export default {
    props: {
      'lyricFile': ''
    },
    mixins: [VueHowler],
    data () {
      return {
        lyric: ''
      }
    },
    created () {
      console.log('created')
      this.parseURI(this.lyricFile)
    },
    watch: {
    },
    computed: {
      lyricHtml () {
        console.log('computed')
        return Lyric.parse(this.lyric)
      }
    },
    updated () {
      console.log('update')
      if (this.lyric.length > 0) {
        jtab.renderChord(this.$refs.lyric)
      }
    },
    mounted () {
      console.log('mounted')
      console.log(this.GLOBAL.calc(10))
    },
    methods: {
      parseURI (uri) {
        return axios.get(uri)
          .then(response => {
            this.lyric = response.data
          })
          .catch(error => {
            console.log(error)
            this.lyric = '[00:00.00]Not available'
          })
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
          :size='this.GLOBAL.calc(30)'
          :trail-width="this.GLOBAL.calc(10)"
          :stroke-width="this.GLOBAL.calc(10)"
          stroke-linecap="round"
          @click.native="togglePlayback"
          >
            <Icon :size="this.GLOBAL.calc(10)" :type="playing ? 'pause' : 'play'" ></Icon>
        </i-circle>
      </Col>
      <Col>{{sources[0]}}</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
      <div ref='lyric'>
          <ul class="lyricRow" v-for="lrc in lyricHtml" :key="lrc.time" v-html="lrc.lrcHtml">
          </ul>
      </div>
      </Col>
    </Row>
  </div>

</template>

<style>
    .lyricRow {
        line-height:75px;
        font-weight: bold;
        color: #b22222;
        margin-top: 20px;
        margin-left: 34px;
    }

    .chordWrap {
        position:relative;
        top:-20px;color: black;
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