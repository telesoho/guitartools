<template>
<div class="blooming-menu__container">
  <div v-touch:press="onOpen" class="blooming-menu__main-container">
    <button class="blooming-menu__main is-inactive">
      <span class="blooming-menu__main-content">
        <slot name='main'></slot>
      </span>
    </button>
  </div>
  <ul class="blooming-menu__items">
    <slot name='BloomItems'></slot>
  </ul>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./BloomMenu.scss";

.blooming-menu__item:nth-of-type(1) {
  animation-delay: NaNs;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
  animation-name: blooming-menu__contract-item-0;
  animation-fill-mode: backwards;
}

.blooming-menu__item.is-active:nth-of-type(1) {
  animation-name: blooming-menu__expand-item-0;
  animation-fill-mode: forwards;
}

.blooming-menu__item:nth-of-type(1).is-selected .blooming-menu__item-btn-wrapper {
  animation-name: blooming-menu__select-item;
  animation-fill-mode: forwards;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
}

.blooming-menu__item:nth-of-type(1).is-not-selected .blooming-menu__item-btn-wrapper {
  animation-name: blooming-menu__not-select-item;
  animation-fill-mode: forwards;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
}

@keyframes blooming-menu__expand-item-1 {
  0% {
    transform: translate(0px, 0px)
  }
  70% {
    transform: translate(NaNpx, NaNpx)
  }
  100% {
    transform: translate(NaNpx, NaNpx)
  }
}

@keyframes blooming-menu__contract-item-1 {
  100% {
    transform: translate(0px, 0px)
  }
  30% {
    transform: translate(NaNpx, NaNpx)
  }
  0% {
    transform: translate(NaNpx, NaNpx)
  }
}

.blooming-menu__item:nth-of-type(2) {
  animation-delay: NaNs;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
  animation-name: blooming-menu__contract-item-1;
  animation-fill-mode: backwards;
}


.blooming-menu__item.is-active:nth-of-type(2) {
  animation-name: blooming-menu__expand-item-1;
  animation-fill-mode: forwards;
}


.blooming-menu__item:nth-of-type(2).is-selected .blooming-menu__item-btn-wrapper {
  animation-name: blooming-menu__select-item;
  animation-fill-mode: forwards;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
}

.blooming-menu__item:nth-of-type(2).is-not-selected .blooming-menu__item-btn-wrapper {
  animation-name: blooming-menu__not-select-item;
  animation-fill-mode: forwards;
  animation-duration: undefineds;
  animation-timing-function: ease-out;
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
import BloomMenu from './BloomMenu.js'
import Emmiters from '../../mixins/emitter'

export default {
  name: 'BloomMenu',
  mixins: [BloomMenu, Emmiters]
}
</script>
