// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
const easingEquations: { [key: string]: Function } = {
  easeOutSine: (pos: number) => Math.sin(pos * (Math.PI / 2)),
  easeInOutSine: (pos: number) => -0.5 * (Math.cos(Math.PI * pos) - 1),
  easeInOutQuint: (pos: number) => {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5)
    }
    return 0.5 * (Math.pow(pos - 2, 5) + 2)
  },
}

// from http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
const scrollKeys: { [key: string]: Boolean } = {
  37: true, // left
  38: true, // up
  39: true, // right
  40: true, // down
  32: true, // spacebar
  33: true, // pageup
  34: true, // pagedown
  35: true, // end
  36: true, // home
}

function preventDefaultForScrollKeys(e: KeyboardEvent) {
  if (scrollKeys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

function preventDefault(e = window.event) {
  if (e.preventDefault) {
    e.preventDefault()
  }

  e.returnValue = false
}

export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false)

  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false)

  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}

//from http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
// finalDelta: the total amount to change the value (final - initial)
// speed: time in pixels per second
// easing: easing equation to use
function tweenValue(finalDelta: number, callback: Function, speed = 2000, easing = 'easeInOutQuint') {
  const startTime = window.performance.now()

  // min time 100ms, max time 800ms
  const time =
    Math.max(0.1, Math.min(Math.abs(finalDelta) / speed, 0.8)) * 1000

  function tick(currentTime: number) {
    const elapsedTime = currentTime - startTime
    const progress = elapsedTime / time

    const t = easingEquations[easing](progress)

    if (progress < 1) {
      window.requestAnimationFrame(tick)

      callback(finalDelta * t)
    }
    else {
      callback(finalDelta)
    }
  }

  // call it once to get started
  window.requestAnimationFrame(tick)
}

export function scrollToY(endY = 0, speed = 2000, easing = 'easeInOutQuint', element = window.document.scrollingElement) {
  const startY = element.scrollTop

  function scrollMove(movement: number) {
    element.scrollTop = startY + movement
  }

  tweenValue(endY - startY, scrollMove, speed, easing)
}

export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

export function getElementOffsetTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + getScrollTop()
}
