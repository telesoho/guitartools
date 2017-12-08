<template>
    <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
        <Icon class="ivu-load-loop" type="load-c" v-if="loading"></Icon>
        <Icon :type="icon" v-if="icon && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<style lang="scss">

.ivu-btn-circle-outline.ivu-btn-icon-only, .ivu-btn-circle.ivu-btn-icon-only {
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 16px;
    border-radius: 50%;
}

.ivu-btn-circle, .ivu-btn-circle-outline {
    border-radius: 32px;
}

.ivu-btn-ghost {
    // color: #495060;
    background-color: transparent;
    border-color: #dddee1;
}

.ivu-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear;
    color: #495060;
    border-color: #dddee1;
}

.ivu-btn:before {
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    background: #fff;
    opacity: .35;
    content: '';
    border-radius: inherit;
    z-index: 1;
    transition: opacity .2s;
    pointer-events: none;
    display: none;
}
</style>
<script src='./Button.js'></script>