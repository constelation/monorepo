import {
  Animated,
  Easing,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'
import View from 'constelation-view'
import _omit from 'lodash/omit'

export type PressEffect = 'opacity' | 'drag'

export interface IProps {
  hitSlop?: number,
  hitSlopVertical?: number,
  hitSlopHorizontal?: number,
  hitSlopTop?: number,
  hitSlopRight?: number,
  hitSlopBottom?: number,
  hitSlopLeft?: number,
  onLongPress?: Function,
  onPress?: Function,
  onPressIn?: Function,
  onPressOut?: Function,
  pressEffect?: PressEffect,

  // pan
  onPanReject?: Function,
  onPanGrant?: Function,
  onPanStart?: Function,
  onPanEnd?: Function,
  onPanRelease?: Function,
  onPanMove?: Function,
  onPanTerminate?: Function,
  // onPanTerminationRequest?: Function,
}

// onMoveShouldSetPanResponder: (e, gestureState) => {...}
// onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}
// onStartShouldSetPanResponder: (e, gestureState) => {...}
// onStartShouldSetPanResponderCapture: (e, gestureState) => {...}
// onShouldBlockNativeResponder: (e, gestureState) => {...}



const propsToOmit = [
  'children',
  'hitSlop',
  'hitSlopVertical',
  'hitSlopHorizontal',
  'hitSlopTop',
  'hitSlopRight',
  'hitSlopBottom',
  'hitSlopLeft',
  'pressEffect',
  'onPanReject',
  'onPanGrant',
  'onPanStart',
  'onPanEnd',
  'onPanRelease',
  'onPanMove',
  'onPanTerminate',
  // 'onPanTerminationRequest',
]

function hasTouchableProps(props: IProps) {
  return props.hasOwnProperty('onPress')
    || props.hasOwnProperty('onLongPress')
    || props.hasOwnProperty('onPressIn')
    || props.hasOwnProperty('onPressOut')
}

function hasPanableProps(props: IProps) {
  return props.pressEffect === 'drag'
    || props.hasOwnProperty('onPanReject')
    || props.hasOwnProperty('onPanGrant')
    || props.hasOwnProperty('onPanStart')
    || props.hasOwnProperty('onPanEnd')
    || props.hasOwnProperty('onPanRelease')
    || props.hasOwnProperty('onPanMove')
    || props.hasOwnProperty('onPanTerminate')
  // || props.hasOwnProperty('onPanTerminationRequest')
}

function hasHitSlopProp(props: IProps) {
  return props.hitSlop
    || props.hitSlopVertical
    || props.hitSlopHorizontal
    || props.hitSlopTop
    || props.hitSlopRight
    || props.hitSlopBottom
    || props.hitSlopLeft
}

function buildHitSlop({ hitSlop, ...props }: IProps) {
  //TODO remove accepting hitSlop object in the future
  if (typeof hitSlop === 'object') {
    return hitSlop
  }
  else {
    return {
      top: props.hitSlopTop || props.hitSlopVertical || hitSlop || 0,
      right: props.hitSlopRight || props.hitSlopHorizontal || hitSlop || 0,
      bottom: props.hitSlopBottom || props.hitSlopVertical || hitSlop || 0,
      left: props.hitSlopLeft || props.hitSlopHorizontal || hitSlop || 0
    }
  }
}

/*
 * Most code taken from RN's TouchableOpacity:
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/Touchable/TouchableOpacity.js
 */
class TouchableOpacity extends React.Component<IProps, void> {

  static defaultProps = {
    activeOpacity: 0.2,
  }

  constructor() {
    super()

    this.opacityAnim = new Animated.Value(1)
    this.opacityStyle = { opacity: this.opacityAnim }

    this.handlePressIn = this.handlePressIn.bind(this)
    this.handlePressOut = this.handlePressOut.bind(this)
    this.setOpacityTo = this.setOpacityTo.bind(this)
    this._opacityActive = this._opacityActive.bind(this)
    this._opacityInactive = this._opacityInactive.bind(this)
  }

  handlePressIn(e: any) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0)
    }
    else {
      this._opacityActive(150)
    }
    this.props.onPressIn && this.props.onPressIn(e)
  }

  handlePressOut(e: any) {
    this._opacityInactive(250)
    this.props.onPressOut && this.props.onPressOut(e)
  }

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo(value: number, duration: number) {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: value,
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }
    ).start()
  }

  _opacityActive(duration: number) {
    this.setOpacityTo(this.props.activeOpacity, duration)
  }

  _opacityInactive(duration: number) {
    this.setOpacityTo(1, duration)
  }

  render() {
    const child = React.Children.only(this.props.children)
    // shouldn't need to do this since Event_ is always furthest out from View
    // const style = {...child.props.style, ...this.opacityStyle}

    return (
      <TouchableWithoutFeedback
        {...this.props}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        {
          React.cloneElement(child, {
            animated: true,
            style: this.opacityStyle,
          })
        }
      </TouchableWithoutFeedback>
    )
  }
}

// Note: the way Touchable takes over PanResponder events.
// This means the two can not be combined in one View.
// TODO: throw an error if the two are ever passed in.
export class Event_ extends React.Component<IProps, void> {
  private panResponder
  private animXY

  componentWillMount() {
    if (hasPanableProps(this.props)) {
      let panMove
      if (this.props.pressEffect === 'drag') {
        this.animXY = new Animated.ValueXY({
          x: 0,
          y: 0,
        })

        panMove = (evt, gestureState) => {
          this.props.onPanMove && this.props.onPanMove(evt, gestureState)
          this.animXY.setValue({ x: gestureState.dx, y: gestureState.dy })
        }
      }
      else {
        panMove = this.props.onPanMove
      }

      this.panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderStart: this.props.onPanStart,
        onPanResponderEnd: this.props.onPanEnd,

        onPanResponderGrant: this.props.onPanGrant,
        onPanResponderMove: panMove,
        onPanResponderRelease: this.props.onPanRelease,
        onPanResponderTerminate: this.props.onPanTerminate,
      })
    }
  }

  get propsToPass() {
    const propsToPass = _omit(this.props, propsToOmit)

    if (hasHitSlopProp(this.props)) {
      propsToPass.hitSlop = buildHitSlop(this.props)
    }

    if (this.panResponder !== undefined) {
      if (this.props.pressEffect === 'drag') {
        return { ...propsToPass, ...this.panResponder.panHandlers, ...{ animated: true, left: this.animXY.x, top: this.animXY.y } }
      }

      return { ...propsToPass, ...this.panResponder.panHandlers }
    }

    return propsToPass
  }

  render() {
    if (hasTouchableProps(this.props)) {
      if (this.props.pressEffect === 'opacity') {
        return <TouchableOpacity {...this.propsToPass}>{this.props.children}</TouchableOpacity>
      }

      return <TouchableWithoutFeedback {...this.propsToPass}>{this.props.children}</TouchableWithoutFeedback>
    }

    return React.cloneElement(React.Children.only(this.props.children), this.propsToPass)
  }
}

export class Event extends React.Component<IProps, void> {
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