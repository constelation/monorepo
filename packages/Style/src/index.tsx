import Style_, { IProps } from 'constelation-style_'
import View from 'constelation-view'
import React from 'react'

export default class Style extends React.PureComponent<IProps, void> {
  render() {
    const {children, ...props} = this.props

    return (
      <Style_ {...props}>
        <View>{children}</View>
      </Style_>
    )
  }
}

