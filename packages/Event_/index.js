/*
 * Credits: fork of Jed Watson's react-hammerjs
 */

'use strict';

var React = require('react')
var ReactDOM = require('react-dom');

// require('hammerjs') when in a browser. This is safe because Hammer is only
// invoked in componentDidMount, which is not executed on the server.
var Hammer = (typeof window !== 'undefined') ? require('hammerjs') : undefined

var privateProps = {
  children: true,
  direction: true,
  options: true,
  recognizeWith: true,
  // vertical: true,
    onHover: true, // added from react-hammerjs clone
}

/**
 * Hammer Component
 * ================
 */

var handlerToEvent = {
  action: 'tap press',
  onDoubleTap: 'doubletap',
  onPan: 'pan',
  onPanCancel: 'pancancel',
  onPanEnd: 'panend',
  onPanStart: 'panstart',
  onPinch: 'pinch',
  onPinchCancel: 'pinchcancel',
  onPinchEnd: 'pinchend',
  onPinchIn: 'pinchin',
  onPinchOut: 'pinchout',
  onPinchStart: 'pinchstart',
  onPress: 'press',
  onPressUp: 'pressup',
  onRotate: 'rotate',
  onRotateCancel: 'rotatecancel',
  onRotateEnd: 'rotateend',
  onRotateMove: 'rotatemove',
  onRotateStart: 'rotatestart',
  onSwipe: 'swipe',
  onTap: 'tap',
}

Object.keys(handlerToEvent).forEach(function (i) {
  privateProps[i] = true
})

function hasHammerEventProp(props) {
  return Object.keys(props).some(function(prop) {
    return typeof handlerToEvent[prop] === 'string'
  })
}

function updateHammer (hammer, props) {
  // if (props.hasOwnProperty('vertical')) {
  //   console.warn('vertical is deprecated, please use `direction` instead')
  // }

  var directionProp = props.direction
  // if (directionProp || props.hasOwnProperty('vertical')) {
  //   direction = directionProp ? directionProp : (props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL')
  if (directionProp) {
    direction = directionProp ? directionProp : 'DIRECTION_HORIZONTAL'
    hammer.get('pan').set({ direction: Hammer[direction] })
    hammer.get('swipe').set({ direction: Hammer[direction] })
  }

  if (props.options) {
    Object.keys(props.options).forEach(function (option) {
      if (option === 'recognizers') {
        Object.keys(props.options.recognizers).forEach(function (gesture) {
          var recognizer = hammer.get(gesture)
          recognizer.set(props.options.recognizers[gesture])
        }, this)
      } else {
        var key = option
        var optionObj = {}
        optionObj[key] = props.options[option]
        hammer.set(optionObj)
      }
    }, this)
  }

  if (props.recognizeWith) {
    Object.keys(props.recognizeWith).forEach(function (gesture) {
      var recognizer = hammer.get(gesture)
      recognizer.recognizeWith(props.recognizeWith[gesture])
    }, this)
  }

  Object.keys(props).forEach(function (p) {
    var e = handlerToEvent[p]
    if (e) {
      hammer.off(e)
      hammer.on(e, props[p])
    }
  })
}

class Event_ extends React.PureComponent {
  constructor() {
    super()

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    if (hasHammerEventProp(this.props)) {
      this.hammer = new Hammer(ReactDOM.findDOMNode(this))
      updateHammer(this.hammer, this.props)
    }
  }

  componentDidUpdate() {
    if (this.hammer) {
      updateHammer(this.hammer, this.props)
    }
    else if (hasHammerEventProp(this.props)) {
      this.hammer = new Hammer(ReactDOM.findDOMNode(this))
      updateHammer(this.hammer, this.props)
    }
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop()
      this.hammer.destroy()
    }
    this.hammer = null
  }

  handleMouseEnter() {
    this.props.onHover(true)
  }

  handleMouseLeave() {
    this.props.onHover(false)
  }

  render() {
    var props = {};

    Object.keys(this.props).forEach(function (i) {
      if (!privateProps[i]) {
        props[i] = this.props[i];
      }
    }, this);

    if (this.props.onHover) {
      props.onMouseEnter = this.handleMouseEnter
      props.onMouseLeave = this.handleMouseLeave
    }

    return React.cloneElement(React.Children.only(this.props.children), props);
  }
}

module.exports = Event_
