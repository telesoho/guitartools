<template>
    <div :style="circleSize" :class="wrapClasses">
        <svg viewBox="0 0 100 100">
            <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0"/>
            <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="strokeWidth" fill-opacity="0" 
              :style="pathStyle"/>
        </svg>
        <div :class="innerClasses">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
.ivu-chart-circle-inner {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    line-height: 1;
}
</style>

<script src="./Circle.js"></script>