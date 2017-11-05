<template>
  <transition name="blooming" >
    <div class="blooming-menu__item-btn-wrapper" v-show="state!=='close'">
      <button class="blooming-menu__item-btn">
        <slot name='button'></slot>
      </button>
    </div>
  </transition>
</template>

<style>
.blooming-enter-active {
  animation: blooming-menu__expand-item .5s;
  background-color: red;
}

.blooming-leave-active {
  animation: blooming-menu__contract-item .5s;
  background-color: green;
}


@keyframes blooming-menu__expand-item {
  0% {
    transform: translate(0px, 0px)
  }
  70% {
    transform: translate(-100px, -100px)
  }
  100% {
    transform: translate(-50px, -50px)
  }
}

@keyframes blooming-menu__contract-item {
  100% {
    transform: translate(0px, 0px)
  }
  30% {
    transform: translate(-50px, -50px)
  }
  0% {
    transform: translate(-20px, -90px)
  }
}

.blooming-menu__item-btn:hover {
  box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);
  opacity: 1;
}

.blooming-menu__item-btn-wrapper.is-active:nth-of-type(1) {
  animation-name: blooming-menu__expand-item;
  animation-fill-mode: forwards;
}

.blooming-menu__item-btn-wrapper.is-active:nth-of-type(2) {
  animation-name: blooming-menu__expand-item;
  animation-fill-mode: forwards;
}

</style>

<script>
import BloomItem from './BloomItem.js'
import Emmiters from '../../mixins/emitter'

export default {
  name: 'BloomItem',
  mixins: [BloomItem, Emmiters]
}
</script>
