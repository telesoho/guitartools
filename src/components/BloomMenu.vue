<template>
<div>
<!-- <div class="blooming-menu__container">
  <div class="blooming-menu__main-container">
    <button class="blooming-menu__main is-inactive">
      <span class="blooming-menu__main-content">+</span>
    </button>
  </div>
  <ul class="blooming-menu__items">
    <li class="blooming-menu__item" style="opacity: 1; display: block;">
      <div class="blooming-menu__item-btn-wrapper">
        <button class="blooming-menu__item-btn"></button>
      </div>
    </li>
  </ul>
</div> -->
</div>
</template>

<script>
import * as BloomMenu from '../class/bloom-menu'

export default {
  name: 'BloomMenu',
  data () {
    return {
    }
  },
  created () {
    console.log('created')
    if (!this.bloomingMenu) {
      this.bloomingMenu = new BloomMenu({
        startAngle: 180,
        endAngle: 180 + 90,
        radius: 80,
        itemsNum: 4,
        itemAnimationDelay: 0.08
      })
      this.bloomingMenu.render()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body .blooming-menu__container {
    left: 90%;
    top: 90%;
    bottom: 0px;
    top: auto;
    position: absolute;
  }
  .blooming-menu__item:nth-of-type(1) .blooming-menu__item-btn {
    background-image: url(/static/get-app.svg);
    background-size: 35%;
  }
  .blooming-menu__item:nth-of-type(2) .blooming-menu__item-btn {
    background-image: url(/static/grade.svg);
  }
  .blooming-menu__item:nth-of-type(3) .blooming-menu__item-btn {
    background-image: url(/static/home.svg);
  }
  .blooming-menu__item:nth-of-type(4) .blooming-menu__item-btn {
    background-image: url(/static/lock.svg);
    background-size: 35%;
  }
  .blooming-menu__item-btn:hover {
    box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);
    opacity: 1;
  }
</style>