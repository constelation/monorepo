import Event_, { IProps } from 'constelation-event_/index.native'
import View from 'constelation-view/index.native'
import React from 'react'

export default class Event extends React.PureComponent<IProps, void> {
  render() {
    const {children, ...props} = this.props

    return (
      <Event_ {...props}>
        <View>{children}</View>
      </Event_>
    )
  }
}
