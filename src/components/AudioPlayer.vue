<script>
  import jtab from 'jtab'
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
      jtab.renderChord(this.$refs.lyc)
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
  <div ref='lyc'>
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
        <Scroll :height="400">
           <p v-for="value in lyric" v-bind:key="value[0]">
            {{ value[1] }}
          </p>
          <div class='chord' chord='C'></div>
        </Scroll>
      </Col>
    </Row>
  </div>

</template>