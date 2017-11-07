<template>
  <transition name="blooming" >
    <li class="blooming-menu__item-btn-wrapper" state='fold' v-show="state!=='close'">
      <slot name='button'></slot>
    </li>
  </transition>
</template>

<style>
.blooming-enter-active:nth-of-type(1) {
  animation: blooming-menu__expand-item-1 .5s;
}

.blooming-leave-active:nth-of-type(1) {
  animation: blooming-menu__fold-item-1 .5s;
}

.blooming-enter-active:nth-of-type(2) {
  animation: blooming-menu__expand-item-2 .5s;
}

.blooming-leave-active:nth-of-type(2) {
  animation: blooming-menu__fold-item-2 .5s;
}

.blooming-menu__item-btn-wrapper {
  background-color: lightblue;
  border-radius: 50%;
  position: absolute;
  transition: transform .28s cubic-bezier(.4, 0, .2, 1), box-shadow .28s cubic-bezier(.4, 0, .2, 1), opacity .28s cubic-bezier(.4, 0, .2, 1);
  border-radius: 50%;
  color: white;
}

.blooming-menu__item-btn-wrapper:nth-of-type(1)[state='expand'] {
  animation-name: blooming-menu__expand-item-1;
  animation-fill-mode: forwards;
}

.blooming-menu__item-btn-wrapper:nth-of-type(2)[state='expand'] {
  animation-name: blooming-menu__expand-item-2;
  animation-fill-mode: forwards;
}


.blooming-menu__item-btn-wrapper:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2);
}

.blooming-menu__item-btn-wrapper {
  cursor: pointer;
}

@keyframes blooming-menu__expand-item-1 {
  0% {
    transform: translate(0px, 0px)
  }
  70% {
    transform: translate(-84.85199999999999px, -84.85199999999999px);
  }
  100% {
    transform: translate(-50.71px, -50.71px)
  }
}

@keyframes blooming-menu__fold-item-1 {
  0% {
    transform: translate(-50.71px, -50.71px)
  }
  70% {
    transform: translate(-84.85199999999999px, -84.85199999999999px);
  }
  100% {
    transform: translate(0px, 0px)
  }
}

@keyframes blooming-menu__expand-item-2 {
  0% {
    transform: translate(0px, 0px)
  }
  70% {
    transform: translate(-120px, 0px);
  }
  100% {
    transform: translate(-70px, 0px);
  }
}

@keyframes blooming-menu__fold-item-2 {
  0% {
    transform: translate(-70px, 0px);
  }
  70% {
    transform: translate(-120px, 0px);
  }
  100% {
    transform: translate(0px, 0px)
  }
}

@keyframes blooming-menu__select-item {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes blooming-menu__not-select-item {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
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
