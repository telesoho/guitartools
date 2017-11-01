<script>
  import jtab from '../class/jtab'
  import VueHowler from '../class/VueHowler'
  import Lyric from '../class/Lyric'
  import axios from 'axios'

  export default {
    mixins: [VueHowler],
    data () {
      return {
        lyric: ''
      }
    },
    mounted () {
      this.parseURI('/static/千住明-涙そうそう.lrc')
      jtab.init(this.$refs.lyric)
    },
    ready () {
    },
    methods: {
      parseURI (uri) {
        return axios.get(uri)
          .then(response => {
            this.lyric = Lyric.parse(response.data)
          })
          .catch(error => {
            console.log(error)
            this.lyric = Lyric.parse('[00:00.00]Not available')
          })
      }
    }
  }
</script>

<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="1" :sm="1" :md="1" :lg="1">
        <i-circle 
          :percent="progress*100" 
          :size="30"
          :trail-width="15"
          :stroke-width="15"
          stroke-linecap="round"
          @click.native="togglePlayback"
          >
            <Icon :type="playing ? 'pause' : 'play'" ></Icon>
        </i-circle>
      </Col>
      <Col :xs="22" :sm="22" :md="22" :lg="22">千住明-涙そうそう</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
      <Scroll :height=600 ref='lyric'>
          <p class="lyricRow" v-for="lrc in lyric" v-bind:key="lrc.time" v-html="lrc.lrcHtml">
          </p>
      </Scroll>
      </Col>
    </Row>
  </div>

</template>

<style>
    .lyricRow {
        line-height:75px;font-weight: bold;color: #b22222;
        margin-top: 20px;
        margin-left: 34px;
    }

    .chordWrap {
        position:relative;top:-20px;color: black;line-height:40px;
    }

    .lyric {
        position:relative;
        margin-left:-34px;
        font-weight: bold;
        font-size:1.5em;
        margin-right:5px;
    }

</style>