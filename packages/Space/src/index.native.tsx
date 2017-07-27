import React from 'react'
import ReactNative from 'react-native'

export interface IProps {
  size: number | string,
}

function getStyleFromProps(props: IProps) {
  return {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: props.size,
  }
}

export class Space extends React.PureComponent<IProps, void> {
  render() {
    return <ReactNative.View style={getStyleFromProps(this.props)} />
  }
}

export class SPACE extends React.Component<IProps, void> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return <ReactNative.View style={getStyleFromProps(this.props)} />
  }
}

export default Space
