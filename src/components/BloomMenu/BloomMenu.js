// import * as BloomMenu from '../class/bloom-menu'

const cssClassPrefix = 'blooming-menu__'

export default {
  name: 'BloomMenu',
  props: {
    startAngle: 90,
    endAngle: 0,
    radius: 80,
    itemAnimationDelay: 0.04,
    animationDuration: 0.4,
    elements: {},
    itemWidth: 50
  },
  data () {
    return {
      state: {
        isOpen: false,
        isBeingAnimated: false
      }
    }
  },
  created () {
    // if (!this.bloomingMenu) {
    //   this.bloomingMenu = new BloomMenu({
    //     startAngle: 180,
    //     endAngle: 180 + 90,
    //     radius: 80,
    //     itemsNum: 4,
    //     itemAnimationDelay: 0.08
    //   })
    //   this.bloomingMenu.render()
    // }
  },
  mounted () {
    if (!this.$slots.item) {
      console.log('ERROR: you must define some item.')
      return
    }
    this.setAnimation(this.$props)
    // this.$slots.default.forEach(vnode => {
    //   // if (vnode.tag.indexOf('a-child-component') > -1) {
    //   //    vnode.elm.addEventListener('click', this.handleClick, true) // <-- NATIVE event :-(
    //   // }
    //   console.log(vnode)
    // })
  },
  methods: {
    setAnimation (props) {
      function toRadians (angle) {
        return angle * (Math.PI / 180)
      }
      props = this.$props
      props.itemsNum = this.$slots.item.length

      var ITEM_CSS_CLASS = 'item'
      var ITEM_BTN_WRAPPER_CSS_CLASS = 'item-btn-wrapper'

      var angleStep =
        (props.endAngle - props.startAngle) / (props.itemsNum - 1)
      var angleCur = props.startAngle
      var cssRules = ''

      this.$slots.item.forEach(function (item, index) {
        var x = props.radius * Math.cos(toRadians(angleCur))
        var y = props.radius * Math.sin(toRadians(angleCur))
        var x3 = Number((x).toFixed(2))
        var y3 = Number((y).toFixed(2))
        var x2 = x3 * 1.2
        var y2 = y3 * 1.2
        // var x1 = x3 * 0.7
        // var y1 = y3 * 0.7
        var x0 = 0
        var y0 = 0

        //
        cssRules +=
          '@keyframes ' + cssClassPrefix + 'expand-item-' + index + ' {' +
            '0% {' +
              'transform: translate(' + x0 + 'px, ' + y0 + 'px)' +
            '}' +
            '70% {' +
              'transform: translate(' + x2 + 'px, ' + y2 + 'px)' +
            '}' +
            '100% {' +
              'transform: translate(' + x3 + 'px, ' + y3 + 'px)' +
            '}' +
          '}' +
          '@-webkit-keyframes ' + cssClassPrefix + 'expand-item-' + index + ' {' +
            '0% {' +
              '-webkit-transform: translate(' + x0 + 'px, ' + y0 + 'px)' +
            '}' +
            '70% {' +
              '-webkit-transform: translate(' + x2 + 'px, ' + y2 + 'px)' +
            '}' +
            '100% {' +
              '-webkit-transform: translate(' + x3 + 'px, ' + y3 + 'px)' +
            '}' +
          '}'

        //
        cssRules +=
          '@keyframes ' + cssClassPrefix + 'contract-item-' + index + ' {' +
            '100% {' +
              'transform: translate(' + x0 + 'px, ' + y0 + 'px)' +
            '}' +
            '30% {' +
              'transform: translate(' + x2 + 'px, ' + y2 + 'px)' +
            '}' +
            '0% {' +
              'transform: translate(' + x3 + 'px, ' + y3 + 'px)' +
            '}' +
          '}' +
          '@-webkit-keyframes ' + cssClassPrefix + 'contract-item-' + index + ' {' +
            '100% {' +
              '-webkit-transform: translate(' + x0 + 'px, ' + y0 + 'px)' +
            '}' +
            '30% {' +
              '-webkit-transform: translate(' + x2 + 'px, ' + y2 + 'px)' +
            '}' +
            '0% {' +
              '-webkit-transform: translate(' + x3 + 'px, ' + y3 + 'px)' +
            '}' +
          '}'

        //
        cssRules +=
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ') {' +
            'animation-delay: ' + (index * props.itemAnimationDelay) + 's;' +
            'animation-duration: ' + props.animationDuration + 's;' +
            'animation-timing-function: ease-out;' +
            'animation-name: ' + cssClassPrefix + 'contract-item-' + index + ';' +
            'animation-fill-mode: backwards;' +
          '}' +
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ') {' +
            '-webkit-animation-delay: ' + (index * props.itemAnimationDelay) + 's;' +
            '-webkit-animation-duration: ' + props.animationDuration + 's;' +
            '-webkit-animation-timing-function: ease-out;' +
            '-webkit-animation-name: ' + cssClassPrefix + 'contract-item-' + index + ';' +
            '-webkit-animation-fill-mode: backwards;' +
          '}'

        //
        cssRules +=
          '.' + cssClassPrefix + ITEM_CSS_CLASS + '.is-active:nth-of-type(' + (index + 1) + ') {' +
            'animation-name: ' + cssClassPrefix + 'expand-item-' + index + ';' +
            'animation-fill-mode: forwards;' +
          '}' +
          '.' + cssClassPrefix + ITEM_CSS_CLASS + '.is-active:nth-of-type(' + (index + 1) + ') {' +
            '-webkit-animation-name: ' + cssClassPrefix + 'expand-item-' + index + ';' +
            '-webkit-animation-fill-mode: forwards;' +
          '}'

        //
        cssRules +=
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ').is-selected .' + cssClassPrefix + ITEM_BTN_WRAPPER_CSS_CLASS + ' {' +
            'animation-name: ' + cssClassPrefix + 'select-item;' +
            'animation-fill-mode: forwards;' +
            'animation-duration: ' + props.animationDuration + 's;' +
            'animation-timing-function: ease-out;' +
          '}' +
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ').is-selected .' + cssClassPrefix + ITEM_BTN_WRAPPER_CSS_CLASS + ' {' +
            '-webkit-animation-name: ' + cssClassPrefix + 'select-item;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-duration: ' + props.animationDuration + 's;' +
            '-webkit-animation-timing-function: ease-out;' +
          '}'

        cssRules +=
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ').is-not-selected .' + cssClassPrefix + ITEM_BTN_WRAPPER_CSS_CLASS + ' {' +
            'animation-name: ' + cssClassPrefix + 'not-select-item;' +
            'animation-fill-mode: forwards;' +
            'animation-duration: ' + props.animationDuration + 's;' +
            'animation-timing-function: ease-out;' +
          '}' +
          '.' + cssClassPrefix + ITEM_CSS_CLASS + ':nth-of-type(' + (index + 1) + ').is-not-selected .' + cssClassPrefix + ITEM_BTN_WRAPPER_CSS_CLASS + ' {' +
            '-webkit-animation-name: ' + cssClassPrefix + 'not-select-item;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-duration: ' + props.animationDuration + 's;' +
            '-webkit-animation-timing-function: ease-out;' +
          '}'

        angleCur += angleStep
      })

      //
      cssRules +=
        '@keyframes ' + cssClassPrefix + 'select-item {' +
          '0% {' +
            'transform: scale(1);' +
            'opacity: 1;' +
          '}' +
          '100% {' +
            'transform: scale(2);' +
            'opacity: 0;' +
          '}' +
        '}' +
        '@-webkit-keyframes ' + cssClassPrefix + 'select-item {' +
          '0% {' +
            '-webkit-transform: scale(1);' +
            'opacity: 1;' +
          '}' +
          '100% {' +
            '-webkit-transform: scale(2);' +
            'opacity: 0;' +
          '}' +
        '}'

      //
      cssRules +=
        '@keyframes ' + cssClassPrefix + 'not-select-item {' +
          '0% {' +
            'transform: scale(1);' +
            'opacity: 1;' +
          '}' +
          '100% {' +
            'transform: scale(0);' +
            'opacity: 0;' +
          '}' +
        '}' +
        '@-webkit-keyframes ' + cssClassPrefix + 'not-select-item {' +
          '0% {' +
            '-webkit-transform: scale(1);' +
            'opacity: 1;' +
          '}' +
          '100% {' +
            '-webkit-transform: scale(0);' +
            'opacity: 0;' +
          '}' +
        '}'

      // console.log('cssRules\r\n', cssRules)
      console.log(this.$slots.item)
      this.$slots.item.styleSheet += cssRules
    },
    open () {
      console.log('open items')
      this.$slots.top.main.classList.add('is-active')
      this.props.elements.items.forEach(function (item) {
        item.style.display = 'block'
        item.classList.remove('is-selected')
        item.classList.add('is-active')
      })
      this.state.isOpen = true
      return this
    }
  }
}
