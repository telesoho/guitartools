<template>
    <i :class="classes" :style="styles"></i>
</template>
<style lang="scss">
.icon {
    display: inline-block;
    font-family: Ionicons;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.ivu-btn>.icon {
    line-height: 1;
}

li {list-style-type: none;}
</style>
<script src='./Icon.js'></script>