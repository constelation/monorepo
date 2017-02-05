import mitt from 'mitt'
import JSON5 from 'json5'
import {
  Animated,
  Easing,
} from 'react-native'
import React from 'react'
import _omit from 'lodash/omit'

export interface IProps {
  /** Keyframes used for interpolating animation */
  animation?: Object | 'fadeIn' | 'fadeOut',

  /** Animate on mount. Default false. */
  autostart?: boolean,

  /** Start the animation after delay (milliseconds). Default 0. */
  delay?: number,

  /** 0 -> 1 | 1 -> 0 | 0 -> 1, 1 -> 0 | 1 -> 0, 0 -> 1 */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternateReverse',

  /** Length of animation (milliseconds). Default 500. */
  duration?: number,

  /**  Easing function to define curve. Default 'inOut' for ios. */
  easing?: 'linear' | 'ease' | 'in' | 'out' | 'inOut' | 'inOutQuad',

  /** Controls "bounciness"/overshoot. Default 7. */
  friction?: number,

  /** Number of times to animate. Default 1. 'infinite' to repeat */
  repeat?: boolean | number,

  /** Controls speed. Default 40. */
  tension?: number,
  useNativeDriver?: boolean,

  /** Event name which will trigger animation to start */
  startEvent?: string,

  /** callback when animation starts */
  onStart?: Function,

  /** Event name fired when animation starts */
  onStartEvent?: string,

  /** callback when animation ends */
  onEnd?: Function,

  /** Event name fired when animation ends */
  onEndEvent?: string,

  style?: any,
}

const EASINGS = {
  'linear': Easing.linear,
  'ease': Easing.ease,
  'in': Easing.in(Easing.ease),
  'out': Easing.out(Easing.ease),
  'inOut': Easing.inOut(Easing.ease),
  'inOutQuad': Easing.inOut(Easing.quad),
}

const DEFAULT_ANIMATIONS = {
  'fadeIn': {
    0: {
      opacity: 0,
    },
    1: {
      opacity: 1,
    },
  },
  'fadeOut': {
    0: {
      opacity: 1,
    },
    1: {
      opacity: 0,
    },
  },
}

/**
 * Styles allowed by the native animated implementation.
 *
 * from https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js#L108
 */
const NATIVE_DRIVER_STYLES = {
  opacity: true,
  translateX: true,
  translateY: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  perspective: true,
  // Other transforms not nativeDriver-capable:
  // skewX, skewY, rotateZ,
}

const TRANSFORM_STYLE_PROPERTIES = [
  'perspective',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'skewX',
  'skewY',
  'translateX',
  'translateY',
]

const TIMING_PROPERTIES = [
  'duration',
  'easing',
  'delay',
]

const SPRING_PROPERTIES = [
  'friction',
  'tension',
]

const propsToOmit = [
  ...TIMING_PROPERTIES,
  ...SPRING_PROPERTIES,
  'animation',
  'autostart',
  'direction',
  'repeat',
  'startEvent',
  'onStart',
  'onStartEvent',
  'onEnd',
  'onEndEvent',
  'style',
  'useNativeDriver'
]

// Used for coordinating animations
const emitter = mitt()
export const emit = emitter.emit

// from https://github.com/oblador/react-native-animatable/blob/master/createAnimation.js
function compareNumbers(a: number, b: number) {
  return a - b
}

function compareNumbersReverse(a: number, b: number) {
  return b - a
}

function notNull(value?: number) {
  return value !== null
}

function parsePosition(value: string) {
  const parsed = parseFloat(value)

  if (isNaN(parsed) || parsed < 0 || parsed > 1) {
    return null
  }
  return parsed
}

function getNonStyleProps(props: IProps): any {
  return _omit(props, propsToOmit)
}

function isTransform(styleName: string): boolean {
  return TRANSFORM_STYLE_PROPERTIES.indexOf(styleName) !== -1
}

function hasTimingProps(props: IProps): boolean {
  return (TIMING_PROPERTIES.some(timingProp => props.hasOwnProperty(timingProp)))
}

function hasSpringProps(props: IProps): boolean {
  return (SPRING_PROPERTIES.some(springProp => props.hasOwnProperty(springProp)))
}

function hasNormalAnimation(direction: string): boolean {
  return direction === 'normal' || direction === 'alternate' || direction === 'alternateReverse'
}

function hasReverseAnimation(direction: string): boolean {
  return direction === 'reverse' || direction === 'alternate' || direction === 'alternateReverse'
}

function isAlternatingDirection(direction: string): boolean {
  return direction === 'alternate' || direction === 'alternateReverse'
}

function isNormalStartingDirection(direction: string): boolean {
  return direction === 'normal' || direction === 'alternate'
}

/**
 * Wrap with outer curlies
 * Wrap keys with quotes since json5 doesn't handle numeric literals as property names
 * see https://github.com/json5/json5/issues/55#issuecomment-277532169
 */
function convertCustomAnimationFormatToJSON5Format(custom: string): string {
  return '{' + custom.replace(/(['"])?([a-z0-9A-Z._]+)(['"])?:/g, '"$2": ') + '}'
}

function buildTimingAnimation(toValue: number, animatedValue: any, props: IProps, context: any) {
  let { duration, delay } = props

  if (__DEV__) {
    // In Dev mode, warn if Spring and Timing props are declared
    if (hasSpringProps(props)) {
      console.warn('You have Timing and Spring props declared. Defaulting to animated.timing(). Spring props are ignored.')
    }

    // check for wrapping animation multiplier
    if (context.timingMultiplier != null) {
      duration = (duration || 500) * context.timingMultiplier

      if (delay) {
        delay = delay * context.timingMultiplier
      }
    }
  }

  return Animated.timing(
    animatedValue,
    {
      toValue,
      duration,
      delay,
      easing: (typeof props.easing === 'function') ? props.easing : EASINGS[props.easing],
      useNativeDriver: props.useNativeDriver,
    }
  )
}

function buildSpringAnimation(toValue: number, animatedValue: any, props: IProps) {
  return Animated.spring(
    animatedValue,
    {
      toValue,
      friction: props.friction,
      tension: props.tension,
    }
  )
}


export default class Animate_ extends React.Component<IProps, void> {
  static contextTypes = {
    timingMultiplier: React.PropTypes.number
  }

  static defaultProps = {
    autostart: false,
    direction: 'normal',
    useNativeDriver: false,
  }

  private startingValue: number
  private animatedValue: any
  private iterationCount: number = 0
  private style: any = {}
  private animation: any
  private animationReverse: any
  private isAnimatingNormal: boolean
  private hasFinishedPreviousAnimation: boolean = false
  // private useNativeDriver = true

  constructor(props: IProps, context: any) {
    super(props)

    this.startingValue = isNormalStartingDirection(props.direction) ? 0 : 1
    this.isAnimatingNormal = this.startingValue === 0
    this.animatedValue = new Animated.Value(this.startingValue)

    this.setAnimations(props, context)
    this.buildKeyframes(props.animation, props.direction)
  }

  componentDidMount() {
    if (this.props.autostart) {
      this.animate()
    }
    else if (this.props.startEvent != null) {
      emitter.on(this.props.startEvent, this.onTriggerEvent)
    }
  }

  componentWillUnmount() {
    // unsubscribe listener if it exists
    if (this.props.startEvent) {
      emitter.off(this.props.startEvent, this.onTriggerEvent)
    }
  }

  componentWillUpdate(nextProps: IProps) {
    if (nextProps.animation !== this.props.animation) {
      this.buildKeyframes(nextProps.animation, nextProps.direction)
    }
    if (nextProps.startEvent !== this.props.startEvent) {
      if (this.props.startEvent != null) {
        emitter.off(this.props.startEvent, this.onTriggerEvent)
      }
      if (nextProps.startEvent != null) {
        emitter.on(nextProps.startEvent, this.onTriggerEvent)
      }
    }
  }

  private setAnimations = (props: IProps, context: any) => {
    if (hasTimingProps(props)) {
      if (hasNormalAnimation(props.direction)) {
        this.animation = buildTimingAnimation(1, this.animatedValue, props, context)
      }

      if (hasReverseAnimation(props.direction)) {
        this.animationReverse = buildTimingAnimation(0, this.animatedValue, props, context)
      }
    }
    // default to Spring if no timing props are passed in
    else {
      // NOTE: can use `delay` prop with Animated.sequence() and Animated.delay() if the need arises
      if (hasNormalAnimation(props.direction)) {
        this.animation = buildSpringAnimation(1, this.animatedValue, props)
      }

      if (hasReverseAnimation(props.direction)) {
        this.animationReverse = buildSpringAnimation(0, this.animatedValue, props)
      }
    }
  }

  private onTriggerEvent = () => {
    this.start()
  }

  // TODO: bring this outside of class
  // private validateStyleForNativeDriver = (styleName: string) => {
  //   if (this.useNativeDriver && !NATIVE_DRIVER_STYLES.hasOwnProperty(styleName)) {
  //     this.useNativeDriver = false
  //   }
  // }

  // TODO: bring this outside of class
  private addStyle = (style: string, interpolatedStyle: Object) => {
    if (isTransform(style)) {
      // If this is a transform style, add it to a transform array
      const transformStyle = { [style]: interpolatedStyle }

      if (Array.isArray(this.style.transform)) {
        this.style.transform.push(transformStyle)
      }
      else {
        this.style.transform = [transformStyle]
      }
    }
    else {
      this.style[style] = interpolatedStyle
    }
  }

  // TODO: bring this outside of class
  private buildKeyframes = (animation: Object | string, direction: string) => {
    const isNormalDirection = isNormalStartingDirection(direction)

    // Build interpolations for each style
    if (typeof animation === 'object') {
      this.setInterpolationsFromKeyframes(animation, isNormalDirection)
    }
    else if (typeof animation === 'string') {
      if (DEFAULT_ANIMATIONS.hasOwnProperty(animation)) {
        this.setInterpolationsFromKeyframes(DEFAULT_ANIMATIONS[animation], isNormalDirection)
      }
      else {
        try {
          const keyFrames = JSON5.parse(convertCustomAnimationFormatToJSON5Format(animation));
          this.setInterpolationsFromKeyframes(keyFrames, isNormalDirection)
        }
        catch (e) {
          console.error('Error parsing your animation. See docs on correct format.', e);
        }
      }
    }
  }

  // TODO: bring this outside of class
  private setInterpolationsFromKeyframes = (keyframes: any, isNormalDirection: boolean) => {
    const inputRange = Object.keys(keyframes).map(parsePosition).filter(notNull)
    inputRange.sort(isNormalStartingDirection ? compareNumbers : compareNumbersReverse)

    const stylesInAnimation = new Set()

    inputRange.forEach(frame => {
      Object.keys(keyframes[frame]).forEach(style => {
        stylesInAnimation.add(style)
      })
    })

    Array.from(stylesInAnimation).forEach(style => {
      // this.validateStyleForNativeDriver(style)

      const interpolatedStyle = this.animatedValue.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(frame => keyframes[frame][style]),
      })

      this.addStyle(style, interpolatedStyle)
    })
  }

  private animate = () => {
    // starting hooks
    this.props.onStart && this.props.onStart()
    if (typeof this.props.onStartEvent === 'string') {
      emitter.emit(this.props.onStartEvent)
    }

    // start animation
    if (this.isAnimatingNormal === true) {
      this.animation.start(this.handleEnd)
    }
    else {
      this.animationReverse.start(this.handleEnd)
    }
  }

  private handleEnd = ({ finished }) => {
    this.hasFinishedPreviousAnimation = finished

    if (finished) {
      this.iterationCount += 1

      if (isAlternatingDirection(this.props.direction)) {
        this.isAnimatingNormal = !this.isAnimatingNormal
      }
    }

    // ending hooks
    this.props.onEnd && this.props.onEnd(finished)
    if (typeof this.props.onEndEvent === 'string') {
      emitter.emit(this.props.onEndEvent)
    }

    // start again if finished and set to repeat
    if (finished && this.props.repeat && (this.props.repeat === true || this.props.repeat > this.iterationCount)) {
      this.start()
    }
  }

  public start = () => {
    // non-alternate animations should be reset before re-animated
    if (this.hasFinishedPreviousAnimation && !isAlternatingDirection(this.props.direction)) {
      this.animatedValue.setValue(this.startingValue)
    }

    this.animate()
  }

  public restart = () => {
    // non-alternate animations should be reset before re-animated
    if (!isAlternatingDirection(this.props.direction)) {
      this.animatedValue.setValue(this.startingValue)
    }

    this.animate()
  }

  public stop = () => {
    // start animation
    if (this.isAnimatingNormal === true) {
      this.animation.start(this.handleEnd)
    }
    else {
      this.animationReverse.start(this.handleEnd)
    }
    this.animation.stop()
  }

  render() {
    var Child = React.Children.only(this.props.children)

    var propsToPass = getNonStyleProps(this.props)

    // Style_'s render() runs before Child's, so add its style props back in
    // TODO: merge Child's transform object if it exists
    propsToPass.style = { ...this.props.style, ...this.style, ...Child.props.style }
    // used by child View/Text/ScrollView/Image
    propsToPass.animated = true

    return React.cloneElement(Child, propsToPass)
  }
}

export interface IConfigProps {
  timingMultiplier: number,
}

export class AnimationConfig extends React.Component<IConfigProps, void> {
  static childContextTypes = {
    timingMultiplier: React.PropTypes.number
  }

  getChildContext() {
    return {
      timingMultiplier: this.props.timingMultiplier,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}