import mitt from 'mitt'
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
  autoplay?: boolean,

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

  /** Repeat animation indefinitely */
  repeat?: boolean,

  /** Controls speed. Default 40. */
  tension?: number,
  useNativeDriver?: boolean,
  onStart?: Function,
  onEnd?: Function,

  /** Event name which will trigger animation to start */
  triggerEvent?: string,

  /** Event name fired when animation starts */
  onStartEvent?: string,

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
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  'fadeOut': {
    from: {
      opacity: 1,
    },
    to: {
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
  'autoplay',
  'direction',
  'onStart',
  'onEnd',
  'repeat',
  'triggerEvent',
  'onStartEvent',
  'onEndEvent',
  'style',
  'useNativeDriver'
]

// Used for coordinating animations
export const emitter = mitt()

// from https://github.com/oblador/react-native-animatable/blob/master/createAnimation.js
function compareNumbers(a: number, b: number) {
  return a - b
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

function buildTimingAnimation(toValue: number, animatedValue: any, props: IProps, context: any) {
  let { duration, delay } = props

  if (__DEV__) {
    // In Dev mode, warn if Spring and Timing props are declared
    if (hasSpringProps(props)) {
      console.warn('You have Timing and Spring props declared. Defaulting to animated.timing(). Spring props are ignored.')
    }

    // check for wrapping animation multiplier
    if (context.timingMultipier != null) {
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
    autoplay: false,
    direction: 'normal',
    useNativeDriver: false,
  }

  private fromValue: number
  private toValue: number
  private animatedValue: any
  private style: any = {}
  private animation: any
  private animationReverse: any
  private isAnimatingNormal: boolean
  private hasFinishedPreviousAnimation: boolean = false
  // private useNativeDriver = true

  constructor(props: IProps, context: any) {
    super()

    this.setFromAndToValues(props.direction)

    this.animatedValue = new Animated.Value(this.fromValue)

    this.setAnimations(props, context)

    this.buildKeyframes(props.animation)

    this.isAnimatingNormal = isNormalStartingDirection(props.direction)
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.animate()
    }
    else if (this.props.triggerEvent) {
      emitter.on(this.props.triggerEvent, this.onTriggerEvent)
    }
  }

  componentWillUnmount() {
    // unsubscribe listener if it exists
    if (this.props.triggerEvent) {
      emitter.off(this.props.triggerEvent, this.onTriggerEvent)
    }
  }

  componentWillUpdate(nextProps: IProps) {
    if (nextProps.animation !== this.props.animation) {
      this.buildKeyframes(nextProps.animation)
    }
    if (nextProps.direction !== this.props.direction) {
      this.setFromAndToValues(nextProps.direction)
    }
    if (nextProps.triggerEvent !== this.props.triggerEvent) {
      emitter.off(this.props.triggerEvent, this.onTriggerEvent)

      if (nextProps.triggerEvent) {
        emitter.on(nextProps.triggerEvent, this.onTriggerEvent)
      }
    }
  }

  private setFromAndToValues = (direction: string) => {
    // Set up the animated value that'll be used to interpolate and run the animation
    if (isNormalStartingDirection(direction)) {
      this.fromValue = 0
      this.toValue = 1
    }
    else {
      this.fromValue = 1
      this.toValue = 0
    }
  }

  private setAnimations = (props: IProps, context: any) => {
    if (hasTimingProps(props)) {
      if (hasNormalAnimation(props.direction)) {
        this.animation = buildTimingAnimation(this.toValue, this.animatedValue, props, context)
      }

      if (hasReverseAnimation(props.direction)) {
        this.animationReverse = buildTimingAnimation(this.fromValue, this.animatedValue, props, context)
      }
    }
    // default to Spring if no timing props are passed in
    else {
      // NOTE: can use `delay` prop with Animated.sequence() and Animated.delay() if the need arises
      if (hasNormalAnimation(props.direction)) {
        this.animation = buildSpringAnimation(this.toValue, this.animatedValue, props)
      }

      if (hasReverseAnimation(props.direction)) {
        this.animationReverse = buildSpringAnimation(this.fromValue, this.animatedValue, props)
      }
    }
  }

  private onTriggerEvent = () => {
    this.animate()
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
  private buildKeyframes = (animation: Object | string) => {
    // Build interpolations for each style
    if (typeof animation === 'object') {
      this.setInterpolationsFromKeyframes(animation)
    }
    else if (typeof animation === 'string') {
      if (DEFAULT_ANIMATIONS.hasOwnProperty(animation)) {
        this.setInterpolationsFromKeyframes(DEFAULT_ANIMATIONS[animation])
      }
      else {
        try {
          const keyFrames = JSON.parse(animation);
          this.setInterpolationsFromKeyframes(keyFrames)
        }
        catch (e) {
          console.error('Error parsing your animation. Make sure it is valid json (double-quotes, no trailing commas)', animation);
        }
      }
    }
  }

  // TODO: bring this outside of class
  private setInterpolationsFromKeyframes = (keyframes: any) => {
    // create a simple 0 -> 1 interpolation
    if (keyframes.from) {
      Object.keys(keyframes.from).forEach(style => {
        // this.validateStyleForNativeDriver(style)

        const interpolatedStyle = this.animatedValue.interpolate({
          inputRange: [this.fromValue, this.toValue],
          outputRange: [keyframes.from[style], keyframes.to[style]],
        })

        this.addStyle(style, interpolatedStyle)
      })
    }
    // create a more complication 0 ... 1 interpolation using keyframes
    else if (keyframes[0]) {
      const inputRange = Object.keys(keyframes).map(parsePosition).filter(notNull)
      inputRange.sort(compareNumbers)

      if (this.fromValue === 1) {
        // reverse range so it goes 1 ... 0
        inputRange.reverse()
      }

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

  private handleEnd = (status: any) => {
    this.props.onEnd && this.props.onEnd(status)

    if (typeof this.props.onEndEvent === 'string') {
      emitter.emit(this.props.onEndEvent)
    }

    this.hasFinishedPreviousAnimation = status.finished

    if (status.finished === true) {
      if (isAlternatingDirection(this.props.direction)) {
        this.isAnimatingNormal = !this.isAnimatingNormal
      }

      if (this.props.repeat) {
        this.start()
      }
    }
  }

  public trigger = () => {
    // non-alternate animations should be reset before re-animated
    if (this.hasFinishedPreviousAnimation && !isAlternatingDirection(this.props.direction)) {
      this.animatedValue.setValue(this.fromValue)
    }

    this.animate()
  }

  public start = () => {
    // non-alternate animations should be reset before re-animated
    if (this.hasFinishedPreviousAnimation && !isAlternatingDirection(this.props.direction)) {
      this.animatedValue.setValue(this.fromValue)
    }

    this.animate()
  }

  public restart = () => {
    // non-alternate animations should be reset before re-animated
    if (!isAlternatingDirection(this.props.direction)) {
      this.animatedValue.setValue(this.fromValue)
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