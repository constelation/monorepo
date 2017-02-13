import Style_, { IProps } from 'constelation-style_/index.native'
import View from 'constelation-view/index.native'
import React from 'react'

export default class Style extends React.PureComponent<IProps, void> {
  render() {
    const {children, ...props} = this.props
    const Child = <View>{children}</View>

    return React.cloneElement(Style_, props, Child)
  }
}
