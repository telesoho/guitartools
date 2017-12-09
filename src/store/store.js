import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    seek: 0,
    muted: false,
    beLoop: false,
    instruments: 'guitar',
    chordRendering: false
  },
  mutations: {
    setChordRendering (state, rendering) {
      this.state.chordRendering = rendering
    },
    setInstruments (state, instruments) {
      this.state.instruments = instruments
    },
    setSeek (state, seek) {
      this.state.seek = seek
    },
    setMuted (state, muted) {
      this.state.muted = muted
    },
    setLoop (state, loop) {
      this.state.beLoop = loop
    }
  }
})

export default store
