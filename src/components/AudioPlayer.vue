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
      jtab.init()
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
          <p class="atfolhyds" v-for="value in lyric" v-bind:key="value[0]">
            {{ value[1] }}
          </p>
          <p class="atfolhyds">
              <span class="krijcheug">
                  <ruby>
                    <span class="chord" chord="C"></span>
                    <span style="display: none;">C</span>
                  </ruby>
              </span>
              <span class="mejiowvnz">願</span>
              <span class="krijcheug" >
                  <ruby>
                      <span class="chord" chord="A"></span>
                      <span style="display: none;">A</span>
                  </ruby>
              </span>
              <span class="mejiowvnz">叶いやしないさ</span>
          </p>
        </Scroll>
      </Col>
    </Row>
  </div>

</template>

<style>
    .atfolhyds {
        line-height:75px;font-weight: bold;color: #b22222;width: 90%;
    }

    .krijcheug {
        position:relative;top:-20px;color: black;line-height:40px;
    }

    .mejiowvnz {
        position:relative;margin-left:-34px;font-weight: bold;margin-right:5px;
    }

</style>