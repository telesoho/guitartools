<template>
    <div>
        <div class="chord current" 
            :start='chord.start' 
            :end='chord.end' 
            :chord="chord.chord"
            :style="{backgroundPosition: getStyle + '%'}"
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
      return '50.2'
    }
  }
}
</script>

<style lang='scss'>
.chord.current{
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1 10' xmlns='http://www.w3.org/2000/svg'><path stroke='red' fill='transparent' d='M 0 0 l 0 10' stroke-width='1'/></svg>");
    background-repeat: no-repeat;
    background-origin: padding-box;
}
</style>