import Animate_, { IProps } from 'constelation-animate_'
import View from 'constelation-view'
import React from 'react'

export default class Animate extends React.PureComponent<IProps, void> {
  render() {
    const {children, ...props} = this.props

    return (
      <Animate_ {...props}>
        <View>{children}</View>
      </Animate_>
    )
  }
}

