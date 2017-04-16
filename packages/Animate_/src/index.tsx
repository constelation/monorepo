'use strict';

import * as React from 'react'
import * as glamor from 'glamor'
import * as _omit from 'lodash/omit'
import * as _pick from 'lodash/pick'
import * as raf from 'raf'
import { View } from 'constelation-view'

export interface IProps {
  keyframes?: Object,
  duration?: string,
  easing?: string,
  delay?: string,
  direction?: string,
  repeat?: boolean,
  type?: 'fadeIn' | 'fadeOut',
}

const styles = [
  'keyframes',
  'duration',
  'easing',
  'delay',
  'direction',
  'repeat',
  'type'
]

const types = {
  fadeIn: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  fadeOut: {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  }
}

function getAnimationProps(props) {
  return _pick(props, styles)
}

function getNonAnimationProps(props) {
  return _omit(props, styles)
}

function getKeyframes(props) {
  if (props.keyframes) {
    return props.keyframes
  }
  else if (props.type) {
    return types[props.type]
  }
}

export class Animate_ extends React.Component<IProps, void> {
  static defaultProps = {
    duration: '1000ms',
  }

  state = {
    animation: glamor.keyframes(getKeyframes(this.props))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyframes !== this.props.keyframes) {
      this.setState({ animation: glamor.keyframes(nextProps.keyframes) })
    }
  }

  // PUBLIC
  trigger = () => {
    const animation = this.state.animation

    this.setState({ animation: '' }, () => {
      raf(() => {
        this.setState({ animation: animation })
      })
    })
  }

  render() {
    const animationProps = getAnimationProps(this.props)
    const propsToPass = getNonAnimationProps(this.props)

    const Child = React.Children.only(this.props.children)

    // without removing children, this would infinite loop
    delete propsToPass.children

    // var animation = 'x ' + animationProps.duration
    const animation = this.state.animation + ' ' + animationProps.duration

    if (animationProps.easing) {
      animation += ' ' + animationProps.easing
    }

    if (animationProps.delay) {
      animation += ' ' + animationProps.delay
    }

    if (animationProps.direction) {
      animation += ' ' + animationProps.direction
    }

    if (animationProps.repeat === true) {
      animation += ' infinite'
    }
    else if (animationProps.repeat > 0) {
      animation += ' ' + animationProps.repeat
    }

    propsToPass.style = { animation: animation }

    return React.cloneElement(Child, propsToPass)
  }
}

export class Animate extends React.Component<IProps, void> {
  render() {
    const { children, ...props } = this.props

    return (
      <Animate_ {...props}>
        <View>{children}</View>
      </Animate_>
    )
  }
}

export default Animate_