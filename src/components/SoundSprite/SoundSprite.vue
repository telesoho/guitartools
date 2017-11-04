<template>
<div class="MusicSprite" v-on:click="play()">
  {{sprite}}
</div>
</template>

<script>

import SoundSprite from './SoundSprite.js'

export default {
  mixins: [SoundSprite]
}
</script>
