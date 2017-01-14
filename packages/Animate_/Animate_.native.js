// imports {{{

import {
  Animated,
  Easing,
} from 'react-native'
import React from 'react'
import _omit from 'lodash/omit'

// }}}

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

// from https://github.com/oblador/react-native-animatable/blob/master/createAnimation.js
function compareNumbers(a, b) {
  return a - b
}

function notNull(value) {
  return value !== null
}

function parsePosition(value) {
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

function getNonStyleProps( props ) {
  return _omit( props, propsToOmit )
}

export default class Animate_ extends React.Component {

  static defaultProps = {
    autoplay: true,
    easing: 'ease',
    useNativeDriver: true,
  }

  animatedValue = new Animated.Value(0)
  style = {}

  constructor(props) {
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

  //TODO deal with transform/translates
  createInterpolationsStyle = (animation) => {
    // create a simple 0 -> 1 interpolation
    if (animation.from) {
      Object.keys(animation.from).forEach(key => {
        this.style[key] = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [animation.from[key], animation.to[key]],
        })
      })
    }
    // create a more complication 0 ... 1 interpolation using keyframes
    else if(animation[0]) {
      const inputRange = Object.keys(animation).map(parsePosition).filter(notNull)
      inputRange.sort(compareNumbers)

      const stylesInAnimation = new Set()

      inputRange.forEach(frame => {
        Object.keys(animation[frame]).forEach(style => {
          stylesInAnimation.add(style)
        })
      })

      Array.from(stylesInAnimation).forEach(style => {
        this.style[style] = this.animatedValue.interpolate({
          inputRange: inputRange,
          outputRange: inputRange.map(frame => animation[frame][style]),
        })
      })
    }

  }

  animate = (toValue) => {
    this.props.onStart && this.props.onStart()

    Animated.timing(
      this.animatedValue,
      {
        toValue,
        easing: (typeof this.props.easing === 'function') ? this.props.easing : easings[this.props.easing],
        duration: this.props.duration,
        delay: this.props.delay,
        useNativeDriver: this.props.useNativeDrive,
      },
    ).start(this.handleEnd)
  }

  handleEnd = () => {
    this.props.onEnd && this.props.onEnd()

    if (this.props.repeat) {
      this.trigger()
    }
  }

  // Public
  trigger = () => {
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

    var propsToPass = getNonStyleProps( this.props )

    // Style_'s render() runs before Child's, so add its style props back in
    propsToPass.style = { ...this.style, ...Child.props.style }

    // used by child View/Text/ScrollView/Image
    propsToPass.animated = true

    return React.cloneElement( Child, propsToPass )
  }
}
module.exports = Animate_
