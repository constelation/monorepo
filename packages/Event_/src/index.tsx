/*
 * Credits: fork of Jed Watson's react-hammerjs
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { View } from 'constelation-view'

export interface IProps {
  action?: Function,
  hitSlop?: number | string,
  hitSlopVertical?: number | string,
  hitSlopHorizontal?: number | string,
  hitSlopTop?: number | string,
  hitSlopRight?: number | string,
  hitSlopBottom?: number | string,
  hitSlopLeft?: number | string,
  onClick?: Function,
  onHover?: Function,
  onDoubleTap?: Function,
  onPan?: Function,
  onPanCancel?: Function,
  onPanEnd?: Function,
  onPanStart?: Function,
  onPinch?: Function,
  onPinchCancel?: Function,
  onPinchEnd?: Function,
  onPinchIn?: Function,
  onPinchOut?: Function,
  onPinchStart?: Function,
  onPress?: Function,
  onPressUp?: Function,
  onRotate?: Function,
  onRotateCancel?: Function,
  onRotateEnd?: Function,
  onRotateMove?: Function,
  onRotateStart?: Function,
  onSwipe?: Function,
  onTap?: Function,
  direction?: 'DIRECTION_ALL' | 'DIRECTION_VERTICAL' | 'DIRECTION_HORIZONTAL' | 'DIRECTION_DOWN' | 'DIRECTION_UP' | 'DIRECTION_RIGHT' | 'DIRECTION_LEFT' | 'DIRECTION_NONE',
  options?: Object,
  recognizeWith?: Object,
}

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
  return Object.keys(props).some(function (prop) {
    return typeof handlerToEvent[prop] === 'string'
  })
}

function updateHammer(hammer, props) {
  // if (props.hasOwnProperty('vertical')) {
  //   console.warn('vertical is deprecated, please use `direction` instead')
  // }

  // if (directionProp || props.hasOwnProperty('vertical')) {
  //   direction = directionProp ? directionProp : (props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL')
  if (props.direction) {
    const direction = Hammer[props.direction]
    hammer.get('pan').set({ direction })
    hammer.get('swipe').set({ direction })
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

export class Event_ extends React.PureComponent<IProps, void> {
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

export class Event extends React.PureComponent<IProps, void> {
  render() {
    const { children, ...props } = this.props

    return (
      <Event_ {...props}>
        <View>{children}</View>
      </Event_>
    )
  }
}

export default Event_