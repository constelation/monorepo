import {
  Animated,
  Easing,
} from 'react-native'
import React from 'react'
import _omit from 'lodash/omit'

export interface IProps {
  animation?: Object | 'fadeIn' | 'fadeOut',
  autoplay?: boolean,
  delay?: number,
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternateReverse',
  duration?: number,
  easing?: 'linear' | 'ease' | 'in' | 'out' | 'inOut' | 'inOutQuad',
  repeat?: boolean,
  onStart?: Function,
  onEnd?: Function,
}

const easings = {
  'linear': Easing.linear,
  'ease': Easing.ease,
  'in': Easing.in(Easing.ease),
  'out': Easing.out(Easing.ease),
  'inOut': Easing.inOut(Easing.ease),
  'inOutQuad': Easing.inOut(Easing.quad),
}

const defaultAnimations = {
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

const propsToOmit = [
  'duration',
  'delay',
  'direction',
  'easing',
  'animation',
  'onStart',
  'onEnd',
]

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

// from https://github.com/oblador/react-native-animatable/blob/master/createAnimation.js
function compareNumbers(a: number, b: number) {
  return a - b
}

function notNull(value?: number) {
  return value !== null
}

function parsePosition(value: string) {
  // if (value === 'from') {
  //   return 0
  // }
  // else if (value === 'to') {
  //   return 1
  // }
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

export default class Animate_ extends React.Component<IProps, void> {
  static defaultProps = {
    autoplay: false,
    direction: 'normal',
    easing: 'ease',
  }

  private fromValue: number
  private toValue: number
  private animatedValue: any
  private style: any = {}
  private useNativeDriver = true

  constructor(props: IProps) {
    super()

    // Set up the animated value that'll be used to interpolate and run the animation
    let startingAnimatedValue
    if (props.direction === 'reverse' || props.direction === 'alternateReverse') {
      this.fromValue = 1
      this.toValue = 0
    }
    else {
      this.fromValue = 0
      this.toValue = 1
    }
    this.animatedValue = new Animated.Value(this.fromValue)

    // Build interpolations for each style
    if (typeof props.animation === 'object') {
      this.createInterpolationsStyle(props.animation)
    }
    else if (typeof props.animation === 'string') {
      this.createInterpolationsStyle(defaultAnimations[props.animation])
    }
  }

  componentDidMount() {
    this.props.autoplay && this.animate()
  }

  private validateStyleForNativeDriver = (styleName: string) => {
    if (this.useNativeDriver && !NATIVE_DRIVER_STYLES.hasOwnProperty(styleName)) {
      this.useNativeDriver = false
    }
  }

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

  private createInterpolationsStyle = (animation: any) => {
    // create a simple 0 -> 1 interpolation
    if (animation.from) {
      Object.keys(animation.from).forEach(style => {
        this.validateStyleForNativeDriver(style)

        const interpolatedStyle = this.animatedValue.interpolate({
          inputRange: [this.fromValue, this.toValue],
          outputRange: [animation.from[style], animation.to[style]],
        })

        this.addStyle(style, interpolatedStyle)
      })
    }
    // create a more complication 0 ... 1 interpolation using keyframes
    else if (animation[0]) {
      const inputRange = Object.keys(animation).map(parsePosition).filter(notNull)
      inputRange.sort(compareNumbers)

      if (this.fromValue === 1) {
        // reverse range so it goes 1 ... 0
        inputRange.reverse()
      }

      const stylesInAnimation = new Set()

      inputRange.forEach(frame => {
        Object.keys(animation[frame]).forEach(style => {
          stylesInAnimation.add(style)
        })
      })

      Array.from(stylesInAnimation).forEach(style => {
        this.validateStyleForNativeDriver(style)

        const interpolatedStyle = this.animatedValue.interpolate({
          inputRange: inputRange,
          outputRange: inputRange.map(frame => animation[frame][style]),
        })

        this.addStyle(style, interpolatedStyle)
      })
    }

  }

  private animate = () => {
    this.props.onStart && this.props.onStart()

    const toValue = this.toValue

    Animated.timing(
      this.animatedValue,
      {
        toValue,
        easing: (typeof this.props.easing === 'function') ? this.props.easing : easings[this.props.easing],
        duration: this.props.duration,
        delay: this.props.delay,
        useNativeDriver: this.useNativeDriver,
      },
    ).start(this.handleEnd)

    if (this.props.direction === 'alternate' || this.props.direction === 'alternateReverse') {
      this.toValue = this.fromValue
      this.fromValue = toValue
    }
  }

  private handleEnd = () => {
    this.props.onEnd && this.props.onEnd()

    if (this.props.repeat) {
      this.trigger()
    }
  }

  public trigger = () => {
    // non-alternate animations should be reset before re-animated
    if (this.props.direction === 'normal' || this.props.direction === 'reverse') {
      this.animatedValue.setValue(this.fromValue)
    }

    this.animate()
  }

  render() {
    var Child = React.Children.only(this.props.children)

    var propsToPass = getNonStyleProps(this.props)

    // Style_'s render() runs before Child's, so add its style props back in
    // TODO: merge Child's transform object if it exists
    propsToPass.style = { ...this.style, ...Child.props.style }
    // used by child View/Text/ScrollView/Image
    propsToPass.animated = true

    return React.cloneElement(Child, propsToPass)
  }
}
