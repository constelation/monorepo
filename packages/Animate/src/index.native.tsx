import Animate_, { IProps } from 'constelation-animate_/index.native'
import View from 'constelation-view/index.native'
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
