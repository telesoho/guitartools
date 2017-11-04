<template>
  <li :class="classes" @click.stop="handleClick"><slot></slot></li>
</template>
<script>
import BloomItem from './BloomItem.js'

export default {
  name: 'BloomItem',
  mixins: [BloomItem]
}
</script>
