<template>
<div class="blooming-menu__container">
  <div v-touch:press="onOpen" class="blooming-menu__main-container">
    <slot name='main'></slot>
  </div>
  <ul class="blooming-menu__items">
    <slot name='BloomItems'></slot>
  </ul>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.blooming-menu__container,
.blooming-menu__container * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
  margin: 0;
  padding: 0;
}

.blooming-menu__container {
  position: absolute;
  left: 90%;
  top: 90%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.blooming-menu__container {
  transition: box-shadow .28s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  list-style-type: none;  
}

.blooming-menu__main-container {
  display: flex;
  justify-content: center;
  align-items: center;  
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  transition: all .28s cubic-bezier(.4, 0, .2, 1);
  border: none;
  background-color: #A974A2;
  color: white;
}
</style>

<script>
import BloomMenu from './BloomMenu.js'
import Emmiters from '../../mixins/emitter'

export default {
  name: 'BloomMenu',
  mixins: [BloomMenu, Emmiters]
}
</script>
