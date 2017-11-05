export function toggleAttribute (el, attr) {
  if (el.hasAttribute(attr)) {
    el.removeAttribute(attr)
    return false
  } else {
    var attrNode = document.createAttribute(attr)
    el.setAttributeNode(attrNode)
    return true
  }
}

export function removeAttribute (el, attr) {
  if (el.hasAttribute(attr)) {
    el.removeAttribute(attr)
    return false
  }
}

export function setAttribute (el, attr, value) {
  if (el.hasAttribute(attr)) {
    el.setAttribute(attr, value)
  } else {
    var attrNode = document.createAttribute(attr)
    attrNode.value = value
    el.setAttributeNode(attrNode)
  }
  return el.getAttribute(attr)
}
