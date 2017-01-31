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
const STYLES_WHITELIST = {
  opacity: true,
  transform: true,
}

const TRANSFORM_WHITELIST = {
  translateX: true,
  translateY: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  perspective: true,
}

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
  const parsed = parseFloat(value, 10)
  if (isNaN(parsed) || parsed < 0 || parsed > 1) {
    return null
  }
  return parsed
}

function getNonStyleProps(props: IProps): any {
  return _omit(props, propsToOmit)
}

export default class Animate_ extends React.Component<IProps, void> {
  static defaultProps = {
    autoplay: false,
    easing: 'ease',
  }

  private animatedValue = new Animated.Value(0)
  private style = {}
  private useNativeDriver = true

  constructor(props: IProps) {
    super()

    if (typeof props.animation === 'object') {
      this.createInterpolationsStyle(props.animation)
    }
    else if (typeof props.animation === 'string') {
      this.createInterpolationsStyle(defaultAnimations[props.animation])
    }
  }

  componentDidMount() {
    this.props.autoplay && this.animate(1)
  }

  private validStyleForNativeDriver = (styleName: string) => {
    // TODO use transform whitelist
    if (this.useNativeDriver && !STYLES_WHITELIST.hasOwnProperty(key)) {
      this.useNativeDriver = false
    }
  }

  //TODO deal with transform/translates
  private createInterpolationsStyle = (animation: any) => {
    // create a simple 0 -> 1 interpolation
    if (animation.from) {
      Object.keys(animation.from).forEach(key => {
        this.validStyleForNativeDriver(key)

        this.style[key] = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [animation.from[key], animation.to[key]],
        })
      })
    }
    // create a more complication 0 ... 1 interpolation using keyframes
    else if (animation[0]) {
      const inputRange = Object.keys(animation).map(parsePosition).filter(notNull)
      inputRange.sort(compareNumbers)

      const stylesInAnimation = new Set()

      inputRange.forEach(frame => {
        Object.keys(animation[frame]).forEach(style => {
          stylesInAnimation.add(style)
        })
      })

      Array.from(stylesInAnimation).forEach(style => {
        this.validStyleForNativeDriver(style)

        this.style[style] = this.animatedValue.interpolate({
          inputRange: inputRange,
          outputRange: inputRange.map(frame => animation[frame][style]),
        })
      })
    }

  }

  private animate = (toValue) => {
    this.props.onStart && this.props.onStart()

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
  }

  private handleEnd = () => {
    this.props.onEnd && this.props.onEnd()

    if (this.props.repeat) {
      this.trigger()
    }
  }

  public trigger = () => {
    this.animatedValue.setValue(0)
    this.animate(1)
  }

  // Public
  // reverse = () => {
  //   this.animatedValue.setValue(1)
  //   this.animate(0)
  // }

  render() {
    var Child = React.Children.only(this.props.children)

    var propsToPass = getNonStyleProps(this.props)

    // Style_'s render() runs before Child's, so add its style props back in
    propsToPass.style = { ...this.style, ...Child.props.style }

    // used by child View/Text/ScrollView/Image
    propsToPass.animated = true

    return React.cloneElement(Child, propsToPass)
  }
}
