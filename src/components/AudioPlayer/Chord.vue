<template>
    <div>
        <div class="chord"
            :current='isCurrent'
            :start='chord.start' 
            :end='chord.end' 
            :chord="chord.chord"
            :style="getStyle"
            >
        </div>
    </div>
</template>

<script>
export default {
  props: {
    chord: {}
  },
  computed: {
    getStyle () {
      var seek100 = this.$store.state.seek * 100
      if (seek100 > this.chord.start && seek100 <= this.chord.end) {
        var percent = (seek100 - this.chord.start) / (this.chord.end - this.chord.start)
        var style = {
          backgroundPosition: (percent * 100).toString() + '%'
        }
        return style
      }
      return {}
    },
    isCurrent () {
      var seek100 = this.$store.state.seek * 100
      return seek100 > this.chord.start && seek100 <= this.chord.end
    }
  }
}
</script>

<style lang='scss'>
.chord[current]{
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1 10' xmlns='http://www.w3.org/2000/svg'><path stroke='red' fill='transparent' d='M 0 0 l 0 10' stroke-width='1'/></svg>");
    background-repeat: no-repeat;
    background-origin: padding-box;
}
</style>