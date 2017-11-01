var dppx = window.devicePixelRatio ||
(window.matchMedia &&
  window.matchMedia('(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches ? 2 : 1) ||
   1

function calc (px) {
  return px * dppx
}
export default{
  calc,
  dppx
}
