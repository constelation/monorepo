import * as React from 'react'
import * as glamorReact from 'glamor-react'

export interface IProps {
  size: number | string,
}

function getStyleFromProps(props: IProps) {
  const flexBasis = (typeof props.size === 'number')
    ? `${props.size}px`
    : props.size

  return {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis,
  }
}

export default class Space extends React.PureComponent<IProps, void> {
  render() {
    return glamorReact.createElement('div', { css: getStyleFromProps(this.props) })
  }
}

export class SPACE extends React.Component<IProps, void> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return glamorReact.createElement('div', { css: getStyleFromProps(this.props) })
  }
}