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

// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
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

export function toggleClass (element, className) {
  if (element === null) {
    console.log('ERROR: element is empty.')
    return
  }
  var classList = element.className.split(/\s+/)
  var index = classList.indexOf(className)
  if (index === -1) {
    classList.push(className)
  } else {
    classList.splice(index)
  }
  element.className = classList.join(' ')
}

export function addClass (element, className) {
  if (element === null) {
    console.log('ERROR: element is empty.')
    return
  }
  var classList = element.className.split(/\s+/)
  var index = classList.indexOf(className)
  if (index === -1) {
    classList.push(className)
    element.className = classList.join(' ')
  }
}

export function removeClass (element, className) {
  if (element === null) {
    console.log('ERROR: element is empty.')
    return
  }
  var classList = element.className.split(/\s+/)
  var index = classList.indexOf(className)
  if (index !== -1) {
    classList.splice(index)
    element.className = classList.join(' ')
  }
}
