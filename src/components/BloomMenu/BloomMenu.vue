<template>
<div class="blooming-menu__container">
  <div v-touch:press="open" class="blooming-menu__main-container">
    <button class="blooming-menu__main is-inactive">
      <span class="blooming-menu__main-content">
        <slot name='main'>+</slot>
      </span>
    </button>
  </div>
  <ul class="blooming-menu__items">
    <slot name='item'>
      <li class="blooming-menu__item" style="opacity: 1; display: block;">
        <div class="blooming-menu__item-btn-wrapper">
          <button class="blooming-menu__item-btn"></button>
        </div>
      </li>
    </slot>
  </ul>
</div>
</template>

<script>
import BloomMenu from './BloomMenu.js'

export default {
  name: 'BloomMenu',
  mixins: [BloomMenu]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./BloomMenu.scss";
</style>